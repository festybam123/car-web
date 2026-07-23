import app from './app.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI;

// MongoDB Connection
mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('✓ MongoDB connected successfully');
  })
  .catch((err) => {
    console.error('✗ MongoDB connection error:', err);
    console.warn('Continuing without database connection. Some features may fail until MONGODB_URI is configured.');
  });

// Server Startup with retry if port is in use
let server

async function startServer(port, attempts = 0) {
  try {
    server = app.listen(port, () => {
      console.log(`🚗 festybam Motors Server running on port ${port}`);
      console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
    });

    server.on('error', async (err) => {
      if (err.code === 'EADDRINUSE') {
        console.warn(`Port ${port} in use, trying ${port + 1}...`)
        if (attempts < 5) {
          await startServer(port + 1, attempts + 1)
        } else {
          console.error('Could not find open port to start the server.')
          process.exit(1)
        }
      } else {
        console.error('Server error:', err)
        process.exit(1)
      }
    })
  } catch (err) {
    if (err.code === 'EADDRINUSE' && attempts < 5) {
      console.warn(`Port ${port} in use, retrying with ${port + 1}`)
      return startServer(port + 1, attempts + 1)
    }
    console.error('Failed to start server:', err)
    process.exit(1)
  }
}

startServer(Number(PORT) || 5000)

// Graceful Shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server');
  if (server) {
    server.close(() => {
      console.log('HTTP server closed');
      mongoose.connection.close();
      process.exit(0);
    });
  } else {
    process.exit(0);
  }
});
