from datetime import datetime
from sqlalchemy import Column, Integer, String, Float, Boolean, DateTime, Text, ForeignKey, Enum as SQLEnum
from sqlalchemy.orm import relationship
import enum
from database.connection import Base


# ==================== ENUMS ====================

class UserRole(str, enum.Enum):
    ADMIN = "admin"
    ANALYST = "analyst"
    USER = "user"


class TrendDirection(str, enum.Enum):
    UP = "up"
    DOWN = "down"
    STABLE = "stable"


class SentimentType(str, enum.Enum):
    POSITIVE = "positive"
    NEGATIVE = "negative"
    NEUTRAL = "neutral"


class ScrapingStatus(str, enum.Enum):
    PENDING = "pending"
    IN_PROGRESS = "in_progress"
    COMPLETED = "completed"
    FAILED = "failed"


# ==================== USER MODELS ====================

class User(Base):
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String(255), unique=True, index=True, nullable=False)
    name = Column(String(255), nullable=False)
    hashed_password = Column(String(255), nullable=False)
    role = Column(SQLEnum(UserRole), default=UserRole.USER, nullable=False)
    avatar = Column(String(500), nullable=True)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)


# ==================== TECH TRENDS MODELS ====================

class Technology(Base):
    __tablename__ = "technologies"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), unique=True, index=True, nullable=False)
    category = Column(String(100), nullable=False)  # Frontend Framework, Backend, etc.
    description = Column(Text, nullable=True)
    website_url = Column(String(500), nullable=True)
    github_url = Column(String(500), nullable=True)
    logo_url = Column(String(500), nullable=True)
    
    # Metrics
    popularity_score = Column(Float, default=0.0)  # 0-100
    growth_rate = Column(Float, default=0.0)  # Percentage
    trend_direction = Column(SQLEnum(TrendDirection), default=TrendDirection.STABLE)
    
    # GitHub stats
    github_stars = Column(Integer, default=0)
    github_forks = Column(Integer, default=0)
    github_issues = Column(Integer, default=0)
    github_contributors = Column(Integer, default=0)
    
    # Stack Overflow stats
    stackoverflow_questions = Column(Integer, default=0)
    stackoverflow_tag_count = Column(Integer, default=0)
    
    # Reddit mentions
    reddit_mentions = Column(Integer, default=0)
    reddit_sentiment = Column(Float, default=0.0)  # -1 to 1
    
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relationships
    metrics_history = relationship("TechnologyMetric", back_populates="technology")


class TechnologyMetric(Base):
    """Historical metrics for tracking technology trends over time"""
    __tablename__ = "technology_metrics"
    
    id = Column(Integer, primary_key=True, index=True)
    technology_id = Column(Integer, ForeignKey("technologies.id"), nullable=False)
    
    # Metrics snapshot
    popularity_score = Column(Float, default=0.0)
    github_stars = Column(Integer, default=0)
    stackoverflow_questions = Column(Integer, default=0)
    reddit_mentions = Column(Integer, default=0)
    
    recorded_at = Column(DateTime, default=datetime.utcnow, index=True)
    
    # Relationships
    technology = relationship("Technology", back_populates="metrics_history")


# ==================== BUSINESS REPUTATION MODELS ====================

class Company(Base):
    __tablename__ = "companies"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), unique=True, index=True, nullable=False)
    industry = Column(String(100), nullable=True)
    website_url = Column(String(500), nullable=True)
    logo_url = Column(String(500), nullable=True)
    description = Column(Text, nullable=True)
    
    # Reputation metrics
    reputation_score = Column(Float, default=0.0)  # 0-100
    overall_rating = Column(Float, default=0.0)  # 1-5
    total_reviews = Column(Integer, default=0)
    
    # Sentiment analysis
    positive_sentiment_ratio = Column(Float, default=0.0)  # 0-1
    negative_sentiment_ratio = Column(Float, default=0.0)  # 0-1
    neutral_sentiment_ratio = Column(Float, default=0.0)  # 0-1
    
    # Glassdoor specific
    glassdoor_rating = Column(Float, nullable=True)
    glassdoor_url = Column(String(500), nullable=True)
    
    # Trustpilot specific
    trustpilot_rating = Column(Float, nullable=True)
    trustpilot_url = Column(String(500), nullable=True)
    
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relationships
    reviews = relationship("CompanyReview", back_populates="company")
    reputation_history = relationship("CompanyReputation", back_populates="company")


class CompanyReview(Base):
    """Individual reviews from employees or customers"""
    __tablename__ = "company_reviews"
    
    id = Column(Integer, primary_key=True, index=True)
    company_id = Column(Integer, ForeignKey("companies.id"), nullable=False)
    
    source = Column(String(50), nullable=False)  # glassdoor, trustpilot
    source_review_id = Column(String(255), nullable=True)  # External ID
    
    # Review content
    title = Column(String(500), nullable=True)
    content = Column(Text, nullable=False)
    rating = Column(Float, nullable=True)  # 1-5
    
    # Sentiment analysis
    sentiment = Column(SQLEnum(SentimentType), nullable=True)
    sentiment_score = Column(Float, nullable=True)  # -1 to 1
    
    # Metadata
    author_role = Column(String(100), nullable=True)  # e.g., "Current Employee"
    review_date = Column(DateTime, nullable=True)
    
    created_at = Column(DateTime, default=datetime.utcnow)
    
    # Relationships
    company = relationship("Company", back_populates="reviews")


class CompanyReputation(Base):
    """Historical reputation tracking"""
    __tablename__ = "company_reputation"
    
    id = Column(Integer, primary_key=True, index=True)
    company_id = Column(Integer, ForeignKey("companies.id"), nullable=False)
    
    reputation_score = Column(Float, default=0.0)
    overall_rating = Column(Float, default=0.0)
    total_reviews = Column(Integer, default=0)
    positive_ratio = Column(Float, default=0.0)
    
    recorded_at = Column(DateTime, default=datetime.utcnow, index=True)
    
    # Relationships
    company = relationship("Company", back_populates="reputation_history")


# ==================== VIRAL PRODUCTS MODELS ====================

class ViralProduct(Base):
    __tablename__ = "viral_products"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(500), nullable=False)
    category = Column(String(100), nullable=True)
    description = Column(Text, nullable=True)
    
    # Product URLs
    amazon_url = Column(String(1000), nullable=True)
    amazon_product_id = Column(String(255), nullable=True, index=True)
    aliexpress_url = Column(String(1000), nullable=True)
    aliexpress_product_id = Column(String(255), nullable=True, index=True)
    
    # Images
    image_url = Column(String(1000), nullable=True)
    
    # Pricing
    current_price = Column(Float, nullable=True)
    original_price = Column(Float, nullable=True)
    currency = Column(String(10), default="USD")
    discount_percentage = Column(Float, nullable=True)
    
    # Virality metrics
    virality_score = Column(Float, default=0.0)  # 0-100
    trend_velocity = Column(Float, default=0.0)  # Rate of growth
    
    # Amazon metrics
    amazon_rating = Column(Float, nullable=True)
    amazon_reviews_count = Column(Integer, default=0)
    amazon_sales_rank = Column(Integer, nullable=True)
    
    # TikTok metrics
    tiktok_mentions = Column(Integer, default=0)
    tiktok_views = Column(Integer, default=0)
    tiktok_hashtags = Column(Text, nullable=True)  # JSON array as text
    
    is_trending = Column(Boolean, default=False)
    trend_started_at = Column(DateTime, nullable=True)
    
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relationships
    price_history = relationship("ProductPriceHistory", back_populates="product")
    virality_history = relationship("ProductViralityMetric", back_populates="product")


class ProductPriceHistory(Base):
    """Track price changes over time"""
    __tablename__ = "product_price_history"
    
    id = Column(Integer, primary_key=True, index=True)
    product_id = Column(Integer, ForeignKey("viral_products.id"), nullable=False)
    
    price = Column(Float, nullable=False)
    currency = Column(String(10), default="USD")
    source = Column(String(50), nullable=False)  # amazon, aliexpress
    
    recorded_at = Column(DateTime, default=datetime.utcnow, index=True)
    
    # Relationships
    product = relationship("ViralProduct", back_populates="price_history")


class ProductViralityMetric(Base):
    """Track virality metrics over time"""
    __tablename__ = "product_virality_metrics"
    
    id = Column(Integer, primary_key=True, index=True)
    product_id = Column(Integer, ForeignKey("viral_products.id"), nullable=False)
    
    virality_score = Column(Float, default=0.0)
    tiktok_mentions = Column(Integer, default=0)
    amazon_sales_rank = Column(Integer, nullable=True)
    
    recorded_at = Column(DateTime, default=datetime.utcnow, index=True)
    
    # Relationships
    product = relationship("ViralProduct", back_populates="virality_history")


# ==================== SCRAPING LOGS ====================

class ScrapingJob(Base):
    """Track scraping job execution"""
    __tablename__ = "scraping_jobs"
    
    id = Column(Integer, primary_key=True, index=True)
    job_type = Column(String(100), nullable=False)  # github, reddit, glassdoor, etc.
    status = Column(SQLEnum(ScrapingStatus), default=ScrapingStatus.PENDING)
    
    started_at = Column(DateTime, nullable=True)
    completed_at = Column(DateTime, nullable=True)
    
    items_scraped = Column(Integer, default=0)
    errors_count = Column(Integer, default=0)
    error_message = Column(Text, nullable=True)
    
    created_at = Column(DateTime, default=datetime.utcnow)
