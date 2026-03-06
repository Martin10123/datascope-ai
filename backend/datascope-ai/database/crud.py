"""
CRUD operations for database models
"""
from sqlalchemy.orm import Session
from sqlalchemy import desc, func
from typing import List, Optional
from datetime import datetime

from database.models import (
    User, Technology, TechnologyMetric,
    Company, CompanyReview, CompanyReputation,
    ViralProduct, ProductPriceHistory, ProductViralityMetric,
    ScrapingJob, UserRole, TrendDirection, SentimentType
)
from database.schemas import UserCreate, TechnologyCreate, CompanyCreate, ViralProductCreate
from core.security import get_password_hash


# ==================== USER CRUD ====================

def get_user_by_email(db: Session, email: str) -> Optional[User]:
    """Get user by email"""
    return db.query(User).filter(User.email == email).first()


def get_user_by_id(db: Session, user_id: int) -> Optional[User]:
    """Get user by ID"""
    return db.query(User).filter(User.id == user_id).first()


def create_user(db: Session, user: UserCreate, role: UserRole = UserRole.USER) -> User:
    """Create a new user"""
    hashed_password = get_password_hash(user.password)
    
    db_user = User(
        email=user.email,
        name=user.name,
        hashed_password=hashed_password,
        role=role,
        avatar=f"https://ui-avatars.com/api/?name={user.name.replace(' ', '+')}&background=random&color=fff"
    )
    
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user


def get_users(db: Session, skip: int = 0, limit: int = 100) -> List[User]:
    """Get all users"""
    return db.query(User).offset(skip).limit(limit).all()


# ==================== TECHNOLOGY CRUD ====================

def get_technology_by_name(db: Session, name: str) -> Optional[Technology]:
    """Get technology by name"""
    return db.query(Technology).filter(Technology.name == name).first()


def get_technology_by_id(db: Session, tech_id: int) -> Optional[Technology]:
    """Get technology by ID"""
    return db.query(Technology).filter(Technology.id == tech_id).first()


def create_technology(db: Session, tech: TechnologyCreate) -> Technology:
    """Create a new technology"""
    db_tech = Technology(**tech.model_dump())
    db.add(db_tech)
    db.commit()
    db.refresh(db_tech)
    return db_tech


def get_technologies(
    db: Session, 
    category: Optional[str] = None,
    skip: int = 0, 
    limit: int = 100
) -> List[Technology]:
    """Get all technologies with optional filtering"""
    query = db.query(Technology)
    
    if category:
        query = query.filter(Technology.category == category)
    
    return query.order_by(desc(Technology.popularity_score)).offset(skip).limit(limit).all()


def get_trending_technologies(db: Session, limit: int = 10) -> List[Technology]:
    """Get trending technologies (highest growth rate)"""
    return db.query(Technology)\
        .filter(Technology.trend_direction == TrendDirection.UP)\
        .order_by(desc(Technology.growth_rate))\
        .limit(limit)\
        .all()


def update_technology_metrics(db: Session, tech_id: int, metrics: dict) -> Technology:
    """Update technology metrics"""
    tech = get_technology_by_id(db, tech_id)
    if not tech:
        return None
    
    for key, value in metrics.items():
        setattr(tech, key, value)
    
    tech.updated_at = datetime.utcnow()
    
    # Create historical record
    metric_record = TechnologyMetric(
        technology_id=tech_id,
        popularity_score=tech.popularity_score,
        github_stars=tech.github_stars,
        stackoverflow_questions=tech.stackoverflow_questions,
        reddit_mentions=tech.reddit_mentions
    )
    db.add(metric_record)
    
    db.commit()
    db.refresh(tech)
    return tech


# ==================== COMPANY CRUD ====================

def get_company_by_name(db: Session, name: str) -> Optional[Company]:
    """Get company by name"""
    return db.query(Company).filter(Company.name == name).first()


def get_company_by_id(db: Session, company_id: int) -> Optional[Company]:
    """Get company by ID"""
    return db.query(Company).filter(Company.id == company_id).first()


def create_company(db: Session, company: CompanyCreate) -> Company:
    """Create a new company"""
    db_company = Company(**company.model_dump())
    db.add(db_company)
    db.commit()
    db.refresh(db_company)
    return db_company


def get_companies(db: Session, skip: int = 0, limit: int = 100) -> List[Company]:
    """Get all companies"""
    return db.query(Company)\
        .order_by(desc(Company.reputation_score))\
        .offset(skip)\
        .limit(limit)\
        .all()


def create_company_review(db: Session, company_id: int, review_data: dict) -> CompanyReview:
    """Create a company review"""
    review = CompanyReview(company_id=company_id, **review_data)
    db.add(review)
    db.commit()
    db.refresh(review)
    return review


def get_company_reviews(db: Session, company_id: int, limit: int = 50) -> List[CompanyReview]:
    """Get reviews for a company"""
    return db.query(CompanyReview)\
        .filter(CompanyReview.company_id == company_id)\
        .order_by(desc(CompanyReview.created_at))\
        .limit(limit)\
        .all()


# ==================== VIRAL PRODUCT CRUD ====================

def get_product_by_id(db: Session, product_id: int) -> Optional[ViralProduct]:
    """Get product by ID"""
    return db.query(ViralProduct).filter(ViralProduct.id == product_id).first()


def create_product(db: Session, product: ViralProductCreate) -> ViralProduct:
    """Create a new viral product"""
    db_product = ViralProduct(**product.model_dump())
    db.add(db_product)
    db.commit()
    db.refresh(db_product)
    return db_product


def get_products(db: Session, skip: int = 0, limit: int = 100) -> List[ViralProduct]:
    """Get all products"""
    return db.query(ViralProduct)\
        .order_by(desc(ViralProduct.virality_score))\
        .offset(skip)\
        .limit(limit)\
        .all()


def get_trending_products(db: Session, limit: int = 20) -> List[ViralProduct]:
    """Get trending products"""
    return db.query(ViralProduct)\
        .filter(ViralProduct.is_trending == True)\
        .order_by(desc(ViralProduct.virality_score))\
        .limit(limit)\
        .all()


def add_price_history(db: Session, product_id: int, price: float, source: str, currency: str = "USD") -> ProductPriceHistory:
    """Add price history record"""
    price_record = ProductPriceHistory(
        product_id=product_id,
        price=price,
        source=source,
        currency=currency
    )
    db.add(price_record)
    db.commit()
    db.refresh(price_record)
    return price_record


def get_price_history(db: Session, product_id: int, limit: int = 30) -> List[ProductPriceHistory]:
    """Get price history for a product"""
    return db.query(ProductPriceHistory)\
        .filter(ProductPriceHistory.product_id == product_id)\
        .order_by(desc(ProductPriceHistory.recorded_at))\
        .limit(limit)\
        .all()


# ==================== SCRAPING JOB CRUD ====================

def create_scraping_job(db: Session, job_type: str) -> ScrapingJob:
    """Create a new scraping job"""
    job = ScrapingJob(job_type=job_type)
    db.add(job)
    db.commit()
    db.refresh(job)
    return job


def update_scraping_job(db: Session, job_id: int, update_data: dict) -> ScrapingJob:
    """Update scraping job"""
    job = db.query(ScrapingJob).filter(ScrapingJob.id == job_id).first()
    if not job:
        return None
    
    for key, value in update_data.items():
        setattr(job, key, value)
    
    db.commit()
    db.refresh(job)
    return job
