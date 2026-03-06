from fastapi import APIRouter, Depends, Query, HTTPException, status
from sqlalchemy.orm import Session
from typing import List

from database.connection import get_db
from database.schemas import (
    CompanyResponse, 
    CompanyDetailResponse,
    CompanyStats,
    CompanyReviewResponse
)
from database.crud import (
    get_companies,
    get_company_by_id,
    get_company_reviews
)
from api.dependencies import get_current_user
from database.models import User


router = APIRouter(prefix="/api/business-reputation", tags=["Business Reputation"])


@router.get("/", response_model=List[CompanyResponse])
async def list_companies(
    skip: int = Query(0, ge=0),
    limit: int = Query(50, ge=1, le=100),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """
    Get list of companies ordered by reputation score
    """
    companies = get_companies(db, skip=skip, limit=limit)
    return [CompanyResponse.model_validate(company) for company in companies]


@router.get("/stats", response_model=CompanyStats)
async def get_statistics(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """
    Get overall statistics for business reputation
    """
    from sqlalchemy import func
    from database.models import Company, CompanyReview
    
    total_companies = db.query(func.count(Company.id)).scalar()
    total_reviews = db.query(func.count(CompanyReview.id)).scalar()
    avg_reputation = db.query(func.avg(Company.reputation_score)).scalar() or 0.0
    
    # Sentiment distribution
    avg_positive = db.query(func.avg(Company.positive_sentiment_ratio)).scalar() or 0.0
    avg_negative = db.query(func.avg(Company.negative_sentiment_ratio)).scalar() or 0.0
    avg_neutral = db.query(func.avg(Company.neutral_sentiment_ratio)).scalar() or 0.0
    
    return CompanyStats(
        total_companies=total_companies,
        total_reviews=total_reviews,
        average_reputation=round(avg_reputation, 2),
        sentiment_distribution={
            "positive": round(avg_positive, 2),
            "negative": round(avg_negative, 2),
            "neutral": round(avg_neutral, 2)
        }
    )


@router.get("/{company_id}", response_model=CompanyDetailResponse)
async def get_company_detail(
    company_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """
    Get detailed information about a specific company including recent reviews
    """
    company = get_company_by_id(db, company_id)
    
    if not company:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Company not found"
        )
    
    # Get recent reviews
    reviews = get_company_reviews(db, company_id, limit=20)
    
    company_dict = CompanyResponse.model_validate(company).model_dump()
    company_dict['recent_reviews'] = [
        CompanyReviewResponse.model_validate(review) for review in reviews
    ]
    
    return CompanyDetailResponse(**company_dict)


@router.get("/{company_id}/reviews", response_model=List[CompanyReviewResponse])
async def get_reviews(
    company_id: int,
    limit: int = Query(50, ge=1, le=200),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """
    Get reviews for a specific company
    """
    company = get_company_by_id(db, company_id)
    
    if not company:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Company not found"
        )
    
    reviews = get_company_reviews(db, company_id, limit=limit)
    return [CompanyReviewResponse.model_validate(review) for review in reviews]
