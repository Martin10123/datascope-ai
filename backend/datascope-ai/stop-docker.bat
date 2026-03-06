@echo off
REM Script para detener servicios Docker

echo ====================================
echo   DataScope AI - Detener Servicios
echo ====================================
echo.

echo ¿Qué deseas hacer?
echo.
echo [1] Detener servicios (mantiene datos)
echo [2] Detener y eliminar volúmenes (BORRA TODOS LOS DATOS)
echo [3] Solo ver estado de los servicios
echo [4] Cancelar
echo.

set /p choice="Selecciona una opción (1-4): "

if "%choice%"=="1" (
    echo.
    echo Deteniendo servicios...
    docker-compose down
    docker-compose -f docker-compose.dev.yml down
    echo.
    echo ✓ Servicios detenidos correctamente
    echo   Los datos se mantienen en los volúmenes
    echo.
    
) else if "%choice%"=="2" (
    echo.
    echo ⚠️  ADVERTENCIA: Esto eliminará TODOS los datos de la base de datos!
    echo.
    set /p confirm="¿Estás seguro? (S/N): "
    
    if /i "%confirm%"=="S" (
        echo.
        echo Deteniendo y eliminando volúmenes...
        docker-compose down -v
        docker-compose -f docker-compose.dev.yml down -v
        echo.
        echo ✓ Servicios detenidos y datos eliminados
        echo.
    ) else (
        echo.
        echo ❌ Operación cancelada
        echo.
    )
    
) else if "%choice%"=="3" (
    echo.
    echo Estado de los servicios:
    echo.
    docker-compose ps
    echo.
    
) else if "%choice%"=="4" (
    echo.
    echo Operación cancelada
    echo.
    
) else (
    echo.
    echo ❌ Opción inválida
    echo.
)

pause
