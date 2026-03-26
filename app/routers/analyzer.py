from __future__ import annotations

from flask import Blueprint, jsonify, request

from app.dependencies import get_current_user_from_request
from app.services.robots_analyzer import analyze_url
from app.services.html_inspector import inspect_url, extract_from_url

analyzer_bp = Blueprint("analyzer", __name__, url_prefix="/analyzer")


@analyzer_bp.post("/analyze")
def analyze():
    """
    Analizar URL (robots.txt)
    ---
    tags:
      - Analyzer
    consumes:
      - application/json
    parameters:
      - in: header
        name: Authorization
        required: true
        type: string
        description: "Bearer <token>"
      - in: body
        name: body
        required: true
        schema:
          type: object
          required:
            - url
          properties:
            url:
              type: string
              example: wikipedia.org
    responses:
      200:
        description: Resultado del análisis
      400:
        description: URL requerida
      401:
        description: No autorizado
      500:
        description: Error al analizar
    """
    try:
        get_current_user_from_request(request)
    except ValueError as exc:
        return jsonify({"detail": str(exc)}), 401

    payload = request.get_json(silent=True) or {}
    url = str(payload.get("url", "")).strip()

    if not url:
        return jsonify({"detail": "URL is required"}), 400

    try:
        result = analyze_url(url)
        return jsonify(result), 200
    except Exception as exc:
        return jsonify({"detail": f"Analysis failed: {exc}"}), 500


@analyzer_bp.post("/inspect")
def inspect():
    """
    Inspeccionar HTML de una URL
    ---
    tags:
      - Analyzer
    consumes:
      - application/json
    parameters:
      - in: header
        name: Authorization
        required: true
        type: string
        description: "Bearer <token>"
      - in: body
        name: body
        required: true
        schema:
          type: object
          required:
            - url
          properties:
            url:
              type: string
              example: wikipedia.org
    responses:
      200:
        description: Secciones scrapeables detectadas
      400:
        description: URL requerida
      401:
        description: No autorizado
      500:
        description: Error al inspeccionar
    """
    try:
        get_current_user_from_request(request)
    except ValueError as exc:
        return jsonify({"detail": str(exc)}), 401

    payload = request.get_json(silent=True) or {}
    url = str(payload.get("url", "")).strip()

    if not url:
        return jsonify({"detail": "URL is required"}), 400

    try:
        result = inspect_url(url)
        return jsonify(result), 200
    except Exception as exc:
        return jsonify({"detail": f"Inspection failed: {exc}"}), 500


@analyzer_bp.post("/extract")
def extract():
    """
    Extraer datos de secciones seleccionadas
    ---
    tags:
      - Analyzer
    consumes:
      - application/json
    parameters:
      - in: header
        name: Authorization
        required: true
        type: string
        description: "Bearer <token>"
      - in: body
        name: body
        required: true
        schema:
          type: object
          required:
            - url
            - sections
          properties:
            url:
              type: string
              example: wikipedia.org
            sections:
              type: array
              items:
                type: object
    responses:
      200:
        description: Datos extraídos por sección
      400:
        description: URL o secciones requeridas
      401:
        description: No autorizado
      500:
        description: Error al extraer
    """
    try:
        get_current_user_from_request(request)
    except ValueError as exc:
        return jsonify({"detail": str(exc)}), 401

    payload = request.get_json(silent=True) or {}
    url = str(payload.get("url", "")).strip()
    sections = payload.get("sections", [])

    if not url:
        return jsonify({"detail": "URL is required"}), 400
    if not isinstance(sections, list) or not sections:
        return jsonify({"detail": "sections must be a non-empty list"}), 400

    try:
        results = extract_from_url(url, sections)
        return jsonify(results), 200
    except Exception as exc:
        return jsonify({"detail": f"Extraction failed: {exc}"}), 500
