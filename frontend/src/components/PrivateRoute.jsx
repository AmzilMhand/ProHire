import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PrivateRoute = ({ children, requiredRole }) => {
  const { currentUser, loading, isAuthenticated, hasRole } = useAuth();
  
  // Show loading spinner if still checking authentication
  if (loading) {
    return <div className="loading-spinner">Loading...</div>;
  }
  
  // Check authentication
  if (!isAuthenticated()) {
    // Redirect to appropriate login based on role
    if (requiredRole === 'candidate') {
      return <Navigate to="/candidate/auth" />;
    } else if (requiredRole === 'recruiter') {
      return <Navigate to="/recruiter/auth" />;
    }
    // Default fallback
    return <Navigate to="/" />;
  }
  
  // If role is required, check if user has role
  if (requiredRole && !hasRole(requiredRole)) {
    // Redirect based on user's actual role
    if (currentUser.role === 'candidate') {
      return <Navigate to="/candidate/dashboard" />;
    } else if (currentUser.role === 'recruiter') {
      return <Navigate to="/recruiter/dashboard" />;
    }
    // Fallback to home if role doesn't match expected routes
    return <Navigate to="/" />;
  }
  
  // User is authenticated and has required role
  return children;
};

export default PrivateRoute;