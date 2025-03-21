const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const errorMiddleware = require('./middleware/error');

// Import routes
const authRoutes = require('./routes/authRoutes');
const socialAuthRoutes = require('./routes/socialAuthRoutes');
const jobRoutes = require('./routes/jobRoutes');
const aiRoutes = require('./routes/aiRoutes');

// Create Express app
const app = express();

// Body parser with increased limit for AI responses
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true, limit: '1mb' }));

// Cookie parser
app.use(cookieParser());

// CORS configuration
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:5050'],  // Frontend and backend ports
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-API-KEY'],
  credentials: false  // Disable for now to simplify connection
}));

// Set security headers
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" },
  crossOriginEmbedderPolicy: false
}));

// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
  // Log all incoming requests
  app.use((req, res, next) => {
    console.log('Incoming request:', {
      method: req.method,
      url: req.url,
      headers: req.headers,
      body: req.body
    });
    next();
  });
}

// Mount routes
app.use('/api/auth', authRoutes);
app.use('/api/auth/social', socialAuthRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/ai', aiRoutes);

// Test route to verify server is running
app.get('/test', (req, res) => {
  res.json({ message: 'Backend server is running' });
});

// Home route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to ProHire API' });
});

// Error handling middleware
app.use(errorMiddleware);

module.exports = app;