from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from typing import List, Optional

from database.connection import get_db
from database.schemas import TechnologyResponse, TechnologyStats
from database.crud import (
    get_technologies, 
    get_technology_by_id,
    get_trending_technologies
)
from api.dependencies import get_current_user
from database.models import User


router = APIRouter(prefix="/api/tech-trends", tags=["Tech Trends"])


@router.get("/", response_model=List[TechnologyResponse])
async def list_technologies(
    category: Optional[str] = Query(None, description="Filter by category"),
    skip: int = Query(0, ge=0),
    limit: int = Query(50, ge=1, le=100),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """
    Get list of technologies with optional category filter
    """
    technologies = get_technologies(db, category=category, skip=skip, limit=limit)
    return [TechnologyResponse.model_validate(tech) for tech in technologies]


@router.get("/trending", response_model=List[TechnologyResponse])
async def get_trending(
    limit: int = Query(10, ge=1, le=50),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """
    Get trending technologies (highest growth rate)
    """
    technologies = get_trending_technologies(db, limit=limit)
    return [TechnologyResponse.model_validate(tech) for tech in technologies]


@router.get("/stats", response_model=TechnologyStats)
async def get_statistics(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """
    Get overall statistics for tech trends
    """
    from sqlalchemy import func
    from database.models import Technology, TrendDirection
    
    total = db.query(func.count(Technology.id)).scalar()
    trending = db.query(func.count(Technology.id))\
        .filter(Technology.trend_direction == TrendDirection.UP)\
        .scalar()
    
    avg_growth = db.query(func.avg(Technology.growth_rate)).scalar() or 0.0
    
    # Top categories
    categories = db.query(
        Technology.category,
        func.count(Technology.id).label('count')
    ).group_by(Technology.category).all()
    
    return TechnologyStats(
        total_technologies=total,
        trending_count=trending,
        average_growth_rate=round(avg_growth, 2),
        top_categories=[{"category": cat, "count": count} for cat, count in categories]
    )


@router.get("/{tech_id}", response_model=TechnologyResponse)
async def get_technology_detail(
    tech_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """
    Get detailed information about a specific technology
    """
    from fastapi import HTTPException, status
    
    technology = get_technology_by_id(db, tech_id)
    
    if not technology:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Technology not found"
        )
    
    return TechnologyResponse.model_validate(technology)
