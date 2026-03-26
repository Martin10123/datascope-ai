from __future__ import annotations

from typing import TypedDict


class UserOut(TypedDict):
    id: str
    name: str
    email: str
    created_at: str


class AuthResponse(TypedDict):
    user: UserOut
    access_token: str
    token_type: str
