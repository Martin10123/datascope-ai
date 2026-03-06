from fastapi import APIRouter, Depends, Query, HTTPException, status
from sqlalchemy.orm import Session
from typing import List

from database.connection import get_db
from database.schemas import (
    ViralProductResponse,
    ViralProductDetailResponse,
    ViralProductStats,
    ProductPriceHistoryResponse
)
from database.crud import (
    get_products,
    get_product_by_id,
    get_trending_products,
    get_price_history
)
from api.dependencies import get_current_user
from database.models import User


router = APIRouter(prefix="/api/viral-products", tags=["Viral Products"])


@router.get("/", response_model=List[ViralProductResponse])
async def list_products(
    skip: int = Query(0, ge=0),
    limit: int = Query(50, ge=1, le=100),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """
    Get list of viral products ordered by virality score
    """
    products = get_products(db, skip=skip, limit=limit)
    return [ViralProductResponse.model_validate(product) for product in products]


@router.get("/trending", response_model=List[ViralProductResponse])
async def get_trending(
    limit: int = Query(20, ge=1, le=50),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """
    Get currently trending viral products
    """
    products = get_trending_products(db, limit=limit)
    return [ViralProductResponse.model_validate(product) for product in products]


@router.get("/stats", response_model=ViralProductStats)
async def get_statistics(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """
    Get overall statistics for viral products
    """
    from sqlalchemy import func
    from database.models import ViralProduct
    
    total = db.query(func.count(ViralProduct.id)).scalar()
    trending = db.query(func.count(ViralProduct.id))\
        .filter(ViralProduct.is_trending == True)\
        .scalar()
    
    avg_virality = db.query(func.avg(ViralProduct.virality_score)).scalar() or 0.0
    
    # Top categories
    categories = db.query(
        ViralProduct.category,
        func.count(ViralProduct.id).label('count')
    ).filter(ViralProduct.category.isnot(None))\
     .group_by(ViralProduct.category)\
     .all()
    
    return ViralProductStats(
        total_products=total,
        trending_count=trending,
        average_virality_score=round(avg_virality, 2),
        top_categories=[{"category": cat, "count": count} for cat, count in categories]
    )


@router.get("/{product_id}", response_model=ViralProductDetailResponse)
async def get_product_detail(
    product_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """
    Get detailed information about a specific product including price history
    """
    product = get_product_by_id(db, product_id)
    
    if not product:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Product not found"
        )
    
    # Get price history
    price_hist = get_price_history(db, product_id, limit=30)
    
    product_dict = ViralProductResponse.model_validate(product).model_dump()
    product_dict['price_history'] = [
        ProductPriceHistoryResponse.model_validate(ph) for ph in price_hist
    ]
    
    return ViralProductDetailResponse(**product_dict)


@router.get("/{product_id}/price-history", response_model=List[ProductPriceHistoryResponse])
async def get_product_price_history(
    product_id: int,
    limit: int = Query(30, ge=1, le=90),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """
    Get price history for a specific product
    """
    product = get_product_by_id(db, product_id)
    
    if not product:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Product not found"
        )
    
    price_hist = get_price_history(db, product_id, limit=limit)
    return [ProductPriceHistoryResponse.model_validate(ph) for ph in price_hist]
