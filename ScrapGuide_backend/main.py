from __future__ import annotations

from flasgger import Swagger
from flask import Flask, jsonify
from flask_cors import CORS

from app.db import init_db
from app.routers.auth import auth_bp
from app.routers.analyzer import analyzer_bp

app = Flask(__name__)

swagger_template = {
    "swagger": "2.0",
    "info": {
        "title": "ScrapGuide API",
        "description": "API para autenticacion JWT y analisis de scraping de ScrapGuide.",
        "version": "0.1.0",
    },
    "schemes": ["http"],
}

Swagger(app, template=swagger_template)

CORS(
    app,
    resources={r"/*": {"origins": ["http://localhost:5173", "http://localhost:5174", "http://127.0.0.1:5173", "http://127.0.0.1:5174"]}},
    supports_credentials=True,
)

app.register_blueprint(auth_bp)
app.register_blueprint(analyzer_bp)

# Ensure required tables exist in PostgreSQL.
init_db()


@app.get("/health")
def health() -> tuple[dict[str, str], int]:
    return jsonify({"status": "ok"}), 200


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8000, debug=True)
