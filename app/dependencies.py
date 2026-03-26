from __future__ import annotations

from typing import Any

from flask import Request

from app.services.security import decode_access_token
from app.services.store import StoredUser, get_user_by_id, is_token_revoked


def get_current_user_from_request(request: Request) -> tuple[StoredUser, dict[str, Any], str]:
    auth_header = request.headers.get("Authorization", "")
    if not auth_header.lower().startswith("bearer "):
        raise ValueError("Missing bearer token")

    token = auth_header.split(" ", 1)[1].strip()
    payload = decode_access_token(token)

    if payload.get("type") != "access":
        raise ValueError("Invalid token type")

    jti = payload.get("jti")
    if not jti or is_token_revoked(jti):
        raise ValueError("Token revoked")

    user_id = payload.get("sub")
    if not user_id:
        raise ValueError("Invalid token payload")

    user = get_user_by_id(user_id)
    if not user:
        raise ValueError("User not found")

    return user, payload, token
