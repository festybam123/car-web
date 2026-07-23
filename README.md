# festybam Motors - Car Dealership MERN Stack

A production-ready, full-stack car dealership and marketplace platform built with the MERN stack (MongoDB, Express, React, Node.js).

## 🎯 Features

### Core Features
- **Browse Cars**: Advanced filtering (brand, price, fuel type, transmission, year)
- **Car Details**: Complete specifications, gallery, reviews, and test drive booking
- **Authentication**: JWT-based login/registration with role-based access
- **Test Drive Booking**: Calendar-based booking system with confirmation emails
- **Wishlist**: Save favorite cars for later
- **User Dashboard**: View bookings, profile, and saved cars
- **Dealer Dashboard**: Manage inventory, orders, and bookings
- **Admin Dashboard**: Full control over users, dealers, cars, and payments

### Advanced Features
- **Payment Integration**: Paystack payment gateway with verification
- **Image Management**: Cloudinary integration for car images
- **Email Notifications**: Nodemailer for booking and payment confirmations
- **Search & Filtering**: Advanced search with multiple filters
- **Responsive Design**: Mobile-first, fully responsive UI
- **Dark Mode**: Built-in dark/light theme toggle
- **Performance**: Optimized with pagination, lazy loading, and caching

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI framework
- **Vite** - Lightning-fast build tool
- **Tailwind CSS** - Utility-first CSS
- **React Router** - Client-side routing
- **Framer Motion** - Smooth animations
- **Zustand** - State management
- **Axios** - HTTP client
- **React Hook Form** - Form management
- **React Query** - Data fetching

### Backend
- **Node.js & Express.js** - Server framework
- **MongoDB & Mongoose** - Database
- **JWT** - Authentication
- **Bcrypt** - Password hashing
- **Nodemailer** - Email service
- **Cloudinary** - Image hosting
- **Paystack** - Payment processing
- **Helmet** - Security headers
- **CORS** - Cross-origin handling

### Deployment
- **Frontend**: Vercel
- **Backend**: Render
- **Database**: MongoDB Atlas

## 📋 Prerequisites

- Node.js 14+ and npm/yarn
- MongoDB Atlas account
- Cloudinary account
- Paystack account (for payments)
- Email provider (Gmail with app password recommended)

## 🚀 Installation

### 1. Clone the Repository
```bash
git clone <repository-url>
cd festybam-motors
```

### 2. Backend Setup

```bash
cd server

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Configure your environment variables
# Edit .env and add:
# - MONGODB_URI
# - JWT_SECRET
# - Email credentials
# - Cloudinary details
# - Paystack keys

# Start the server
npm run dev
```

**Backend runs on**: http://localhost:5000

### 3. Frontend Setup

```bash
cd client

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Configure your frontend environment variables
# Edit .env and add:
# - VITE_API_URL=http://localhost:5000
# - VITE_PAYSTACK_PUBLIC_KEY
# - VITE_CLOUDINARY_CLOUD_NAME

# Start the development server
npm run dev
```

**Frontend runs on**: http://localhost:5173

## 📁 Project Structure

```
festybam-motors/
├── server/
│   ├── config/          # Database configuration
│   ├── controllers/      # Route controllers
│   ├── middleware/       # Auth, validation middleware
│   ├── models/           # MongoDB schemas
│   ├── routes/           # API routes
│   ├── services/         # Business logic (email, payment)
│   ├── utils/            # Helper functions
│   ├── validators/       # Input validation
│   ├── app.js            # Express app setup
│   ├── server.js         # Server entry point
│   ├── package.json
│   └── .env.example
│
├── client/
│   ├── src/
│   │   ├── components/   # Reusable components
│   │   ├── pages/        # Page components
│   │   ├── services/     # API service calls
│   │   ├── context/      # Global state (Zustand)
│   │   ├── hooks/        # Custom React hooks
│   │   ├── styles/       # Global styles
│   │   ├── utils/        # Helper utilities
│   │   ├── App.jsx       # Main app component
│   │   └── main.jsx      # React entry point
│   ├── public/           # Static assets
│   ├── index.html        # HTML template
│   ├── vite.config.js    # Vite configuration
│   ├── tailwind.config.js
│   ├── package.json
│   └── .env.example
│
└── .github/
    └── copilot-instructions.md
```

## 🔑 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user
- `POST /api/auth/logout` - User logout

### Cars
- `GET /api/cars` - Get all cars with filters
- `GET /api/cars/featured` - Get featured cars
- `GET /api/cars/:id` - Get car details
- `POST /api/cars` - Create car (Dealer/Admin)
- `PUT /api/cars/:id` - Update car
- `DELETE /api/cars/:id` - Delete car

### Bookings
- `POST /api/bookings` - Create booking
- `GET /api/bookings` - Get user's bookings
- `GET /api/bookings/:id` - Get booking details
- `PUT /api/bookings/:id` - Update booking
- `PATCH /api/bookings/:id/cancel` - Cancel booking

### Payments
- `POST /api/payments/initialize` - Initialize payment
- `POST /api/payments/verify` - Verify payment
- `POST /api/payments/webhook` - Paystack webhook

### Reviews
- `POST /api/reviews` - Create review
- `GET /api/reviews/car/:carId` - Get car reviews
- `PUT /api/reviews/:id` - Update review
- `DELETE /api/reviews/:id` - Delete review

### Wishlist
- `POST /api/wishlist` - Add to wishlist
- `GET /api/wishlist` - Get user's wishlist
- `DELETE /api/wishlist/:carId` - Remove from wishlist

## 🔐 Environment Variables

### Server `.env`
```
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb+srv://...
JWT_SECRET=your_secret_key
EMAIL_USER=your@email.com
EMAIL_PASSWORD=app_password
CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...
PAYSTACK_SECRET_KEY=...
PAYSTACK_PUBLIC_KEY=...
FRONTEND_URL=http://localhost:5173
```

### Client `.env`
```
VITE_API_URL=http://localhost:5000
VITE_PAYSTACK_PUBLIC_KEY=...
VITE_CLOUDINARY_CLOUD_NAME=...
VITE_GOOGLE_MAPS_API_KEY=...
```

## 🚢 Deployment

### Deploy Backend to Render

1. Push your code to GitHub
2. Connect your GitHub repo to Render
3. Create a new Web Service
4. Set the start command: `npm start`
5. Add environment variables
6. Deploy

### Deploy Frontend to Vercel

1. Connect your GitHub repo to Vercel
2. Set build command: `npm run build`
3. Set output directory: `dist`
4. Add environment variables
5. Deploy

### Setup MongoDB Atlas

1. Create a MongoDB Atlas cluster
2. Create a database user
3. Whitelist your IP
4. Copy the connection string to `.env`

## 📖 Database Schema

### Collections
- **Users** - Customer, dealer, and admin accounts
- **Cars** - Vehicle listings with specifications
- **Bookings** - Test drive and inspection bookings
- **Payments** - Payment records and transactions
- **Reviews** - Car reviews and ratings
- **Wishlist** - User saved cars
- **Blogs** - Blog posts and articles
- **Messages** - Contact form submissions

## 🎨 Design Features

- **Premium aesthetic** inspired by Mercedes-Benz, BMW, Tesla
- **Color scheme**: Black, white, gold with dark gray accents
- **Mobile-first responsive design**
- **Smooth animations** with Framer Motion
- **Dark/Light mode support**
- **Accessibility optimized**
- **SEO-friendly**

## 🔒 Security Features

- JWT authentication
- Password hashing with bcrypt
- Input validation and sanitization
- CORS enabled
- Rate limiting
- Helmet security headers
- Protected API routes
- Role-based access control

## 🧪 Testing

### Run Tests
```bash
cd server
npm test

cd ../client
npm run test
```

## 📊 Performance Optimizations

- Code splitting with Vite
- Image lazy loading
- Database indexing
- Pagination
- Caching strategies
- Minified production builds
- CDN integration (Cloudinary)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License - see the LICENSE file for details.

## 👨‍💼 Author

**festybam Motors Team**
- Website: https://festybam-motors.com
- Email: contact@festybam-motors.com

## 🆘 Support

For support, email support@festybam-motors.com or open an issue in the repository.

## 🗺️ Roadmap

- [ ] Mobile app (React Native)
- [ ] AI-powered car recommendations
- [ ] Video tours for cars
- [ ] Live chat support
- [ ] Car insurance integration
- [ ] Trade-in valuation
- [ ] Extended analytics dashboard
- [ ] SMS notifications
- [ ] Multi-language support

## 📞 Contact

- **Email**: contact@festybam-motors.com
- **Phone**: +234 XXX XXX XXXX
- **Address**: Lagos, Nigeria
- **Website**: https://festybam-motors.com

---

**Happy coding! 🚗💨**
