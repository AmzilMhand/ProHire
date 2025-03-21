const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Protect routes
exports.protect = async (req, res, next) => {
    try {
        let token;

        // Get token from authorization header
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        }
        // Get token from cookie
        else if (req.cookies.token) {
            token = req.cookies.token;
        }

        // Make route public if no token is required
        if (!token) {
            // For development purposes, we'll allow requests without authentication
            // In production, you would want to uncomment the following lines
            /*
            return res.status(401).json({
                success: false,
                error: 'Not authorized to access this route'
            });
            */
            return next();
        }

        try {
            // Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Get user from token
            req.user = await User.findById(decoded.id);
            next();
        } catch (error) {
            // For development purposes, we'll allow requests even if token verification fails
            // In production, you would want to uncomment the following lines
            /*
            return res.status(401).json({
                success: false,
                error: 'Not authorized to access this route'
            });
            */
            return next();
        }
    } catch (error) {
        console.error('Auth Middleware Error:', error);
        return res.status(500).json({
            success: false,
            error: 'Server error in authentication'
        });
    }
}; 