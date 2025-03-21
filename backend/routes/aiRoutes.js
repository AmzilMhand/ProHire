const express = require('express');
const router = express.Router();
const { generateJobDescription } = require('../controllers/aiController');

// Debug route to test if AI routes are accessible
router.get('/test', (req, res) => {
  res.json({ message: 'AI routes are working' });
});

// Debug route to match the path that's failing
router.get('/generate-description', (req, res) => {
  res.json({ message: 'This endpoint requires a POST request, not GET' });
});

// Main route for generating descriptions
router.post('/generate-description', generateJobDescription);

module.exports = router; 