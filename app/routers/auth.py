from __future__ import annotations

from email_validator import EmailNotValidError, validate_email
from flask import Blueprint, jsonify, request

from app.dependencies import get_current_user_from_request
from app.services.security import create_access_token, verify_password
from app.services.store import create_user, get_user_by_email, revoke_token

auth_bp = Blueprint("auth", __name__, url_prefix="/auth")


def _user_json(user) -> dict[str, str]:
    return {
        "id": user.id,
        "name": user.name,
        "email": user.email,
        "created_at": user.created_at.isoformat(),
    }


def _validate_email(value: str) -> str:
    try:
        return validate_email(value, check_deliverability=False).normalized
    except EmailNotValidError as exc:
        raise ValueError(str(exc)) from exc


@auth_bp.post("/register")
def register():
    """
    Registrar usuario
    ---
    tags:
      - Auth
    consumes:
      - application/json
    parameters:
      - in: body
        name: body
        required: true
        schema:
          type: object
          required:
            - name
            - email
            - password
          properties:
            name:
              type: string
              example: Juan Perez
            email:
              type: string
              example: juan@example.com
            password:
              type: string
              example: secret123
    responses:
      201:
        description: Usuario registrado
      400:
        description: Datos invalidos
      409:
        description: Email ya existe
    """
    payload = request.get_json(silent=True) or {}
    name = str(payload.get("name", "")).strip()
    email_raw = str(payload.get("email", "")).strip()
    password = str(payload.get("password", ""))

    if len(name) < 2:
        return jsonify({"detail": "Name must have at least 2 characters"}), 400
    if len(password) < 6:
        return jsonify({"detail": "Password must have at least 6 characters"}), 400

    try:
        email = _validate_email(email_raw)
    except ValueError as exc:
        return jsonify({"detail": str(exc)}), 400

    if get_user_by_email(email):
        return jsonify({"detail": "Email already exists"}), 409

    user = create_user(name=name, email=email, password=password)
    token = create_access_token(subject=user.id)

    return (
        jsonify(
            {
                "user": _user_json(user),
                "access_token": token,
                "token_type": "bearer",
            }
        ),
        201,
    )


@auth_bp.post("/login")
def login():
    """
    Iniciar sesion
    ---
    tags:
      - Auth
    consumes:
      - application/json
    parameters:
      - in: body
        name: body
        required: true
        schema:
          type: object
          required:
            - email
            - password
          properties:
            email:
              type: string
              example: juan@example.com
            password:
              type: string
              example: secret123
    responses:
      200:
        description: Login exitoso
      400:
        description: Datos invalidos
      401:
        description: Credenciales invalidas
    """
    payload = request.get_json(silent=True) or {}
    email_raw = str(payload.get("email", "")).strip()
    password = str(payload.get("password", ""))

    if not email_raw or not password:
        return jsonify({"detail": "Email and password are required"}), 400

    try:
        email = _validate_email(email_raw)
    except ValueError:
        return jsonify({"detail": "Invalid credentials"}), 401

    user = get_user_by_email(email)
    if not user or not verify_password(password, user.password_hash):
        return jsonify({"detail": "Invalid credentials"}), 401

    token = create_access_token(subject=user.id)
    return jsonify({"user": _user_json(user), "access_token": token, "token_type": "bearer"})


@auth_bp.get("/me")
def me():
    """
    Perfil actual
    ---
    tags:
      - Auth
    parameters:
      - in: header
        name: Authorization
        required: true
        type: string
        description: Bearer <token>
    responses:
      200:
        description: Usuario autenticado
      401:
        description: Token invalido o faltante
    """
    try:
        user, _, _ = get_current_user_from_request(request)
    except ValueError as exc:
        return jsonify({"detail": str(exc)}), 401

    return jsonify(_user_json(user))


@auth_bp.post("/logout")
def logout():
    """
    Cerrar sesion
    ---
    tags:
      - Auth
    parameters:
      - in: header
        name: Authorization
        required: true
        type: string
        description: Bearer <token>
    responses:
      200:
        description: Sesion cerrada
      401:
        description: Token invalido o faltante
    """
    try:
        _, payload, _ = get_current_user_from_request(request)
    except ValueError as exc:
        return jsonify({"detail": str(exc)}), 401

    jti = payload.get("jti")
    if not jti:
        return jsonify({"detail": "Invalid token"}), 401

    revoke_token(jti)
    return jsonify({"message": "Logged out successfully"})
