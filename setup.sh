#!/bin/bash

# AutoLux Motors - Complete Setup Script
# This script sets up both backend and frontend

echo "🚗 AutoLux Motors - Setup Script"
echo "=================================="
echo ""

# Backend Setup
echo "📦 Setting up Backend..."
cd server
npm install
echo "✓ Backend dependencies installed"
echo ""

# Frontend Setup
echo "📦 Setting up Frontend..."
cd ../client
npm install
echo "✓ Frontend dependencies installed"
echo ""

# Environment Files
echo "🔐 Creating environment files..."
cd ..

if [ ! -f "server/.env" ]; then
  cp server/.env.example server/.env
  echo "⚠️  Created server/.env - Please configure your environment variables"
fi

if [ ! -f "client/.env" ]; then
  cp client/.env.example client/.env
  echo "⚠️  Created client/.env - Please configure your environment variables"
fi

echo ""
echo "✅ Setup complete!"
echo ""
echo "📝 Next steps:"
echo "1. Configure environment variables:"
echo "   - Edit server/.env with your MongoDB, JWT, Email, Cloudinary, and Paystack credentials"
echo "   - Edit client/.env with your API URL and API keys"
echo ""
echo "2. Start the development servers:"
echo "   npm run dev"
echo ""
echo "3. Backend: http://localhost:5000"
echo "4. Frontend: http://localhost:5173"
echo ""
