import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const GuestRoute = ({ children }) => {
  const { isAuthenticated, currentUser } = useAuth();
  const location = useLocation();

  if (isAuthenticated()) {
    // Redirect to appropriate dashboard based on role
    const redirectPath = currentUser.role === 'recruiter'
      ? '/recruiter/dashboard'
      : '/candidate/dashboard';
      
    return <Navigate to={redirectPath} state={{ from: location }} replace />;
  }

  return children;
};

export default GuestRoute;