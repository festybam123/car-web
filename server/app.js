import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import 'express-async-errors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { existsSync } from 'fs';

// Import routes
import authRoutes from './routes/auth.routes.js';
import carRoutes from './routes/car.routes.js';
import bookingRoutes from './routes/booking.routes.js';
import publicRoutes from './routes/public.routes.js';
import supportRoutes from './routes/support.routes.js';
import careersRoutes from './routes/careers.routes.js';
import wishlistRoutes from './routes/wishlist.routes.js';
import reviewRoutes from './routes/review.routes.js';
import paymentRoutes from './routes/payment.routes.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Serve static files (images) from public/images first, then dist/images as fallback
const publicImagesPath = path.join(__dirname, '..', 'client', 'public', 'images')
const distImagesPath = path.join(__dirname, '..', 'client', 'dist', 'images')
const publicImagesStatic = express.static(publicImagesPath, {
  setHeaders: (res, filepath) => {
    if (filepath.endsWith('.jpg') || filepath.endsWith('.jpeg')) {
      res.setHeader('Content-Type', 'image/jpeg');
    }
  }
})
const distImagesStatic = express.static(distImagesPath)

app.use('/images', (req, res, next) => {
  publicImagesStatic(req, res, (err) => {
    if (!err && !res.headersSent) return
    distImagesStatic(req, res, next)
  })
})

// Middleware
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.'
});

app.use('/api/', limiter);
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Health check
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'Server is running' });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/cars', carRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api', publicRoutes);
app.use('/api/support', supportRoutes);
app.use('/api/careers', careersRoutes);
app.use('/api/wishlist', wishlistRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/payments', paymentRoutes);

// Serve built frontend in production
const distPath = path.join(__dirname, '..', 'client', 'dist');
if (existsSync(distPath)) {
  app.use(express.static(distPath));
}

// SPA fallback - serve index.html for all non-API routes
app.get('*', (req, res) => {
  if (existsSync(path.join(distPath, 'index.html'))) {
    res.sendFile(path.join(distPath, 'index.html'));
  } else {
    res.status(404).json({
      success: false,
      message: 'Frontend not built. Run npm run build first.'
    });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

export default app;
