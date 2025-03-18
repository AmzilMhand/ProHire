const express = require('express');
const {
  socialLogin,
  socialLoginCallback
} = require('../controllers/socialAuthController');

const router = express.Router();

// Social login routes
router.get('/:provider', socialLogin);
router.get('/:provider/callback', socialLoginCallback);

module.exports = router;