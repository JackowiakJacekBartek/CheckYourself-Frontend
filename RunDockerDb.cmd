@echo off

docker version >nul 2>&1
if %errorlevel% neq 0 (
  echo An error occured. Check that Docker is running.
  pause
  exit /b
)

docker-compose up
pause
