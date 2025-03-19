import React, { createContext, useContext, useState, useEffect } from 'react';
import authAPI from '../services/authAPI';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
    
  }, []);

  const login = async (email, password) => {
    const data = await authAPI.login(email, password);
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
    setUser(data.user);
    return data;
  };

  const register = async (userData) => {
    const data = await authAPI.register(userData);
    return data;
  };

  const logout = (redirectToHome = true) => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    if (redirectToHome) {
      // We'll handle navigation in the components
    }
  };

  // Add isAuthenticated function
  const isAuthenticated = () => {
    return !!user;
  };

  // Add hasRole function
  const hasRole = (role) => {
    return user && user.role === role;
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      loading, 
      login, 
      register, 
      logout,
      isAuthenticated,
      hasRole,
      currentUser: user
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);