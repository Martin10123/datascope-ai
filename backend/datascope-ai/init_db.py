"""
Script to initialize the database with sample data
Run this after first setup to populate the database
"""
import sys
from sqlalchemy.orm import Session

from database.connection import SessionLocal, init_db
from database.crud import create_user, get_user_by_email
from database.schemas import UserCreate
from database.models import UserRole


def create_default_users(db: Session):
    """Create default users for testing"""
    
    users = [
        {
            "email": "admin@datascope.ai",
            "name": "Admin User",
            "password": "admin123",
            "role": UserRole.ADMIN
        },
        {
            "email": "juan@datascope.ai",
            "name": "Juan Analyst",
            "password": "analyst123",
            "role": UserRole.ANALYST
        },
        {
            "email": "maria@datascope.ai",
            "name": "Maria User",
            "password": "user123",
            "role": UserRole.USER
        }
    ]
    
    for user_data in users:
        # Check if user exists
        existing = get_user_by_email(db, user_data["email"])
        if existing:
            print(f"❌ User {user_data['email']} already exists")
            continue
        
        # Create user
        role = user_data.pop("role")
        user_create = UserCreate(**user_data)
        created_user = create_user(db, user_create, role=role)
        print(f"✅ Created user: {created_user.email} ({created_user.role.value})")


def init_sample_data():
    """Initialize database with sample data"""
    print("🚀 Initializing DataScope AI Database...")
    
    # Initialize database tables
    print("\n📊 Creating database tables...")
    init_db()
    print("✅ Tables created successfully")
    
    # Create session
    db = SessionLocal()
    
    try:
        # Create default users
        print("\n👥 Creating default users...")
        create_default_users(db)
        
        print("\n✅ Database initialization completed!")
        print("\n📝 Default users:")
        print("   - admin@datascope.ai / admin123 (Admin)")
        print("   - juan@datascope.ai / analyst123 (Analyst)")
        print("   - maria@datascope.ai / user123 (User)")
        
    except Exception as e:
        print(f"\n❌ Error during initialization: {e}")
        db.rollback()
        sys.exit(1)
    
    finally:
        db.close()


if __name__ == "__main__":
    init_sample_data()
