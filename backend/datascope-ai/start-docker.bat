@echo off
REM Script de inicio rápido con Docker

echo ====================================
echo   DataScope AI - Docker Quick Start
echo ====================================
echo.

REM Verificar si Docker está instalado
docker --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Docker no está instalado
    echo.
    echo Por favor instala Docker Desktop desde:
    echo https://www.docker.com/products/docker-desktop/
    echo.
    pause
    exit /b 1
)

echo ✓ Docker detectado
echo.

echo Opciones disponibles:
echo.
echo [1] Iniciar solo servicios (PostgreSQL + Redis + pgAdmin)
echo     Recomendado si quieres ejecutar Python localmente
echo.
echo [2] Iniciar todo en Docker (Backend + Servicios)
echo     Todo en contenedores con hot-reload
echo.

set /p choice="Selecciona una opción (1 o 2): "

if "%choice%"=="1" (
    echo.
    echo [Opción 1] Iniciando servicios solamente...
    echo.
    docker-compose up -d
    
    echo.
    echo ====================================
    echo   Servicios iniciados correctamente
    echo ====================================
    echo.
    echo PostgreSQL:  localhost:5432
    echo   Usuario:   postgres
    echo   Password:  postgres
    echo   Database:  datascope_ai
    echo.
    echo pgAdmin:     http://localhost:5050
    echo   Email:     admin@datascope.ai
    echo   Password:  admin123
    echo.
    echo Redis:       localhost:6379
    echo.
    echo ====================================
    echo   Próximos pasos:
    echo ====================================
    echo.
    echo 1. Activar entorno virtual:  venv\Scripts\activate
    echo 2. Inicializar BD:           python init_db.py
    echo 3. Iniciar backend:          python main.py
    echo.
    echo O ejecuta:  uvicorn main:app --reload
    echo.
    
) else if "%choice%"=="2" (
    echo.
    echo [Opción 2] Iniciando todo en Docker...
    echo.
    docker-compose -f docker-compose.dev.yml up -d
    
    echo.
    echo Esperando que los servicios estén listos...
    timeout /t 5 /nobreak >nul
    
    echo.
    echo Inicializando base de datos...
    docker exec datascope-backend python init_db.py
    
    echo.
    echo ====================================
    echo   Aplicación iniciada correctamente
    echo ====================================
    echo.
    echo Backend API:  http://localhost:9000
    echo   Docs:       http://localhost:9000/docs
    echo   Health:     http://localhost:9000/health
    echo.
    echo pgAdmin:      http://localhost:5050
    echo   Email:      admin@datascope.ai
    echo   Password:   admin123
    echo.
    echo PostgreSQL:   localhost:5432
    echo Redis:        localhost:6379
    echo.
    echo ====================================
    echo   Ver logs:
    echo ====================================
    echo.
    echo Ver logs backend:  docker-compose -f docker-compose.dev.yml logs -f backend
    echo Ver todos:         docker-compose -f docker-compose.dev.yml logs -f
    echo.
    
) else (
    echo.
    echo ❌ Opción inválida. Selecciona 1 o 2.
    echo.
    pause
    exit /b 1
)

echo Para detener:
if "%choice%"=="1" (
    echo   docker-compose down
) else (
    echo   docker-compose -f docker-compose.dev.yml down
)
echo.

pause
