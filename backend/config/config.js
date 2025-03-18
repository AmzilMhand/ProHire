const dotenv = require('dotenv');

// Load env vars
dotenv.config();

module.exports = {
  nodeEnv: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 5000,
  mongoUri: process.env.MONGO_URI || 'mongodb://localhost:27017/prohire',
  jwtSecret: process.env.JWT_SECRET || 'your_secret_key_change_in_production',
  jwtExpire: process.env.JWT_EXPIRE || '30d',
  frontendUrl: process.env.FRONTEND_URL || 'http://localhost:3000',
  
  // Email configuration
  emailService: process.env.EMAIL_SERVICE || 'gmail',
  emailUsername: process.env.EMAIL_USERNAME,
  emailPassword: process.env.EMAIL_PASSWORD,
  emailFrom: process.env.EMAIL_FROM || 'noreply@prohire.com',
  
  // Social authentication
  socialAuth: {
    facebook: {
      clientId: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET,
      callbackURL: '/api/auth/social/facebook/callback'
    },
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: '/api/auth/social/google/callback'
    },
    linkedin: {
      clientId: process.env.LINKEDIN_CLIENT_ID,
      clientSecret: process.env.LINKEDIN_CLIENT_SECRET,
      callbackURL: '/api/auth/social/linkedin/callback'
    }
  }
};