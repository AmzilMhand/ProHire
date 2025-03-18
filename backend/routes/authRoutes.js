const express = require('express');
const {
  register,
  login,
  logout,
  getMe
} = require('../controllers/authController');

const {
  forgotPassword,
  resetPassword
} = require('../controllers/forgotPasswordController');

const { protect } = require('../middleware/auth');

const router = express.Router();

// Auth routes
router.post('/register', register);
router.post('/login', login);
router.get('/logout', logout);
router.get('/me', protect, getMe);

// Password reset routes
router.post('/forgotpassword', forgotPassword);
router.put('/resetpassword/:resettoken', resetPassword);

module.exports = router;