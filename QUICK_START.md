# festybam Motors - Quick Start Guide

## 🚀 Get Started in 5 Minutes

### Prerequisites
- Node.js 14+ installed
- npm or yarn package manager
- Git (optional, for version control)

### 1️⃣ Clone/Download the Project
```bash
cd festybam-motors
```

### 2️⃣ Run Setup Script

**On Windows:**
```bash
setup.bat
```

**On Mac/Linux:**
```bash
bash setup.sh
```

This will:
- ✓ Install all dependencies
- ✓ Create `.env` files
- ✓ Show next steps

### 3️⃣ Configure Environment Variables

**Edit `server/.env`:**
```
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/festybam_motors
JWT_SECRET=your_super_secret_key_here
```

**Edit `client/.env`:**
```
VITE_API_URL=http://localhost:5000
```

### 4️⃣ Start the Development Servers

```bash
npm run dev
```

This starts both:
- 📱 **Frontend**: http://localhost:5173
- 🔧 **Backend**: http://localhost:5000

### 5️⃣ Create Test Data (Optional)

```bash
npm run seed
```

This adds sample cars and test users:
- **Admin**: admin@festybam.com / Admin123!
- **Dealer**: dealer@festybam.com / Dealer123!
- **Customer**: customer@festybam.com / Customer123!

---

## 📂 Project Structure

```
festybam-motors/
├── server/           # Backend API
├── client/           # React frontend
├── .github/          # GitHub configuration
├── README.md         # Full documentation
└── DEPLOYMENT_GUIDE.md
```

---

## 🔑 Key Features to Try

1. **Browse Cars**: Visit http://localhost:5173/cars
2. **View Car Details**: Click on any car
3. **Sign Up**: Create a new account
4. **Book Test Drive**: From car details page
5. **Dashboard**: Access your profile and bookings

---

## 🛠️ Useful Commands

```bash
# Start both servers
npm run dev

# Start only backend
npm run dev:server

# Start only frontend
npm run dev:client

# Build for production
npm run build

# Seed database with test data
npm run seed

# Run tests (if configured)
npm test
```

---

## 📚 Documentation

- **Full Setup**: See [README.md](./README.md)
- **Deployment**: See [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)
- **API Docs**: Check `server/routes/` for endpoints
- **Component Docs**: Check `client/src/components/` for React components

---

## 🆘 Common Issues

### Port Already in Use
```bash
# On Windows
netstat -ano | findstr :5000

# On Mac/Linux
lsof -i :5000
```

### MongoDB Connection Failed
- Check MongoDB Atlas connection string
- Verify IP is whitelisted
- Ensure database user credentials are correct

### Frontend Can't Connect to Backend
- Check backend is running: http://localhost:5000/api/health
- Verify `VITE_API_URL` in `client/.env`
- Check browser console for CORS errors

---

## 📖 Next Steps

1. ✅ Complete setup
2. 📖 Read full [README.md](./README.md)
3. 🚀 Configure deployment: [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)
4. 🎨 Customize styling in `client/src/styles/`
5. 📦 Deploy to production

---

## 💡 Tips

- Use [Postman](https://postman.com) to test API endpoints
- Use browser DevTools to debug frontend
- Check server logs for backend errors
- Monitor MongoDB Atlas for database issues

---

## 🤝 Need Help?

1. Check the documentation files
2. Review error messages carefully
3. Check browser console and server logs
4. Open an issue on GitHub

---

**Happy coding! 🚗✨**
