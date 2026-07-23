@echo off
REM AutoLux Motors - Complete Setup Script for Windows

echo.
echo 🚗 AutoLux Motors - Setup Script
echo ==================================
echo.

REM Backend Setup
echo 📦 Setting up Backend...
cd server
call npm install
echo ✓ Backend dependencies installed
echo.

REM Frontend Setup
echo 📦 Setting up Frontend...
cd ..\client
call npm install
echo ✓ Frontend dependencies installed
echo.

REM Environment Files
echo 🔐 Creating environment files...
cd ..

if not exist "server\.env" (
  copy server\.env.example server\.env
  echo ⚠️  Created server\.env - Please configure your environment variables
)

if not exist "client\.env" (
  copy client\.env.example client\.env
  echo ⚠️  Created client\.env - Please configure your environment variables
)

echo.
echo ✅ Setup complete!
echo.
echo 📝 Next steps:
echo 1. Configure environment variables:
echo    - Edit server\.env with your MongoDB, JWT, Email, Cloudinary, and Paystack credentials
echo    - Edit client\.env with your API URL and API keys
echo.
echo 2. Start the development servers:
echo    npm run dev
echo.
echo 3. Backend: http://localhost:5000
echo 4. Frontend: http://localhost:5173
echo.
pause
