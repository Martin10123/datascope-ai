@echo off
REM Script de inicio rápido para DataScope AI Backend

echo ====================================
echo   DataScope AI - Backend Setup
echo ====================================
echo.

REM Verificar si existe el entorno virtual
if not exist "venv\" (
    echo [1/4] Creando entorno virtual...
    python -m venv venv
    echo ✓ Entorno virtual creado
) else (
    echo [1/4] Entorno virtual ya existe
)

echo.
echo [2/4] Activando entorno virtual...
call venv\Scripts\activate

echo.
echo [3/4] Instalando dependencias...
pip install -r requirements.txt

echo.
echo [4/4] Configuración completada
echo.
echo ====================================
echo   Próximos pasos:
echo ====================================
echo.
echo 1. Asegúrate de tener PostgreSQL instalado y corriendo
echo 2. Crea la base de datos: CREATE DATABASE datascope_ai;
echo 3. Inicializa la BD: python init_db.py
echo 4. Inicia el servidor: python main.py
echo.
echo O ejecuta directamente: uvicorn main:app --reload
echo.
echo Documentación API: http://localhost:9000/docs
echo.

pause
