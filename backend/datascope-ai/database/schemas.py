from datetime import datetime
from pydantic import BaseModel, EmailStr, Field, validator
from typing import Optional, List
from database.models import UserRole, TrendDirection, SentimentType


# ==================== USER SCHEMAS ====================

class UserBase(BaseModel):
    email: EmailStr
    name: str = Field(..., min_length=2, max_length=255)


class UserCreate(UserBase):
    password: str = Field(..., min_length=6, max_length=100)


class UserLogin(BaseModel):
    email: EmailStr
    password: str


class UserResponse(UserBase):
    id: int
    role: UserRole
    avatar: Optional[str] = None
    is_active: bool
    created_at: datetime
    
    class Config:
        from_attributes = True


class TokenResponse(BaseModel):
    access_token: str
    refresh_token: str
    token_type: str = "bearer"
    user: UserResponse


# ==================== TECH TRENDS SCHEMAS ====================

class TechnologyBase(BaseModel):
    name: str = Field(..., max_length=255)
    category: str = Field(..., max_length=100)
    description: Optional[str] = None
    website_url: Optional[str] = None
    github_url: Optional[str] = None


class TechnologyCreate(TechnologyBase):
    pass


class TechnologyResponse(TechnologyBase):
    id: int
    logo_url: Optional[str] = None
    popularity_score: float
    growth_rate: float
    trend_direction: TrendDirection
    
    github_stars: int
    github_forks: int
    github_issues: int
    
    stackoverflow_questions: int
    stackoverflow_tag_count: int
    
    reddit_mentions: int
    reddit_sentiment: float
    
    created_at: datetime
    updated_at: datetime
    
    class Config:
        from_attributes = True


class TechnologyStats(BaseModel):
    """Overall statistics for tech trends dashboard"""
    total_technologies: int
    trending_count: int
    average_growth_rate: float
    top_categories: List[dict]


# ==================== BUSINESS REPUTATION SCHEMAS ====================

class CompanyBase(BaseModel):
    name: str = Field(..., max_length=255)
    industry: Optional[str] = None
    website_url: Optional[str] = None


class CompanyCreate(CompanyBase):
    pass


class CompanyReviewResponse(BaseModel):
    id: int
    source: str
    title: Optional[str] = None
    content: str
    rating: Optional[float] = None
    sentiment: Optional[SentimentType] = None
    sentiment_score: Optional[float] = None
    author_role: Optional[str] = None
    review_date: Optional[datetime] = None
    created_at: datetime
    
    class Config:
        from_attributes = True


class CompanyResponse(CompanyBase):
    id: int
    logo_url: Optional[str] = None
    description: Optional[str] = None
    
    reputation_score: float
    overall_rating: float
    total_reviews: int
    
    positive_sentiment_ratio: float
    negative_sentiment_ratio: float
    neutral_sentiment_ratio: float
    
    glassdoor_rating: Optional[float] = None
    trustpilot_rating: Optional[float] = None
    
    created_at: datetime
    updated_at: datetime
    
    class Config:
        from_attributes = True


class CompanyDetailResponse(CompanyResponse):
    """Company with recent reviews"""
    recent_reviews: List[CompanyReviewResponse] = []


class CompanyStats(BaseModel):
    """Overall statistics for business reputation dashboard"""
    total_companies: int
    total_reviews: int
    average_reputation: float
    sentiment_distribution: dict


# ==================== VIRAL PRODUCTS SCHEMAS ====================

class ViralProductBase(BaseModel):
    name: str = Field(..., max_length=500)
    category: Optional[str] = None
    description: Optional[str] = None


class ViralProductCreate(ViralProductBase):
    amazon_url: Optional[str] = None
    aliexpress_url: Optional[str] = None


class ProductPriceHistoryResponse(BaseModel):
    id: int
    price: float
    currency: str
    source: str
    recorded_at: datetime
    
    class Config:
        from_attributes = True


class ViralProductResponse(ViralProductBase):
    id: int
    image_url: Optional[str] = None
    
    current_price: Optional[float] = None
    original_price: Optional[float] = None
    currency: str
    discount_percentage: Optional[float] = None
    
    virality_score: float
    trend_velocity: float
    
    amazon_rating: Optional[float] = None
    amazon_reviews_count: int
    amazon_sales_rank: Optional[int] = None
    
    tiktok_mentions: int
    tiktok_views: int
    
    is_trending: bool
    trend_started_at: Optional[datetime] = None
    
    created_at: datetime
    updated_at: datetime
    
    class Config:
        from_attributes = True


class ViralProductDetailResponse(ViralProductResponse):
    """Product with price history"""
    price_history: List[ProductPriceHistoryResponse] = []


class ViralProductStats(BaseModel):
    """Overall statistics for viral products dashboard"""
    total_products: int
    trending_count: int
    average_virality_score: float
    top_categories: List[dict]


# ==================== COMMON SCHEMAS ====================

class MessageResponse(BaseModel):
    """Generic message response"""
    message: str
    detail: Optional[str] = None


class PaginatedResponse(BaseModel):
    """Paginated response wrapper"""
    items: List[dict]
    total: int
    page: int
    page_size: int
    total_pages: int
