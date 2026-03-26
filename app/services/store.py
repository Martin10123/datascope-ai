from __future__ import annotations

from typing import Optional

from sqlalchemy import select

from app.db import get_session
from app.models import RevokedToken, User
from app.services.security import hash_password


StoredUser = User


def create_user(name: str, email: str, password: str) -> StoredUser:
    normalized_email = email.lower().strip()
    with get_session() as session:
        user = User(
            name=name.strip(),
            email=normalized_email,
            password_hash=hash_password(password),
        )
        session.add(user)
        session.flush()
        session.refresh(user)
        return user


def get_user_by_email(email: str) -> Optional[StoredUser]:
    normalized_email = email.lower().strip()
    with get_session() as session:
        statement = select(User).where(User.email == normalized_email)
        return session.execute(statement).scalar_one_or_none()


def get_user_by_id(user_id: str) -> Optional[StoredUser]:
    with get_session() as session:
        statement = select(User).where(User.id == user_id)
        return session.execute(statement).scalar_one_or_none()


def revoke_token(jti: str) -> None:
    with get_session() as session:
        existing = session.get(RevokedToken, jti)
        if existing:
            return
        session.add(RevokedToken(jti=jti))


def is_token_revoked(jti: str) -> bool:
    with get_session() as session:
        return session.get(RevokedToken, jti) is not None
