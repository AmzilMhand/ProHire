import api from './api';

const AUTH_URL = '/api/auth';

// Create authAPI object with authentication-related methods
const authAPI = {
  // Register a new user
  register: async (userData) => {
    try {
      const response = await api.post(`${AUTH_URL}/register`, userData);
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  // Login a user
  login: async (email, password) => {
    try {
      const response = await api.post(`${AUTH_URL}/login`, { email, password });
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  // Logout the current user
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    return api.get(`${AUTH_URL}/logout`);
  },

  // Get the current user
  getCurrentUser: async () => {
    try {
      const response = await api.get(`${AUTH_URL}/me`);
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  // Request password reset
  forgotPassword: async (email) => {
    try {
      const response = await api.post(`${AUTH_URL}/forgotpassword`, { email });
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  // Reset password with token
  resetPassword: async (token, password) => {
    try {
      const response = await api.put(`${AUTH_URL}/resetpassword/${token}`, { password });
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },
  
  // Verify email
  verifyEmail: async (token) => {
    try {
      const response = await api.get(`${AUTH_URL}/verify-email/${token}`);
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },
  
  // Social login (placeholder - would need to be implemented with OAuth)
  socialLogin: (provider) => {
    // This would typically redirect to a backend OAuth route
    window.location.href = `${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/api/auth/social/${provider}`;
  }
};

// Helper function to handle API errors
const handleApiError = (error) => {
  let errorMessage;
  
  if (error.response) {
    // The request was made and the server responded with a status code
    errorMessage = error.response.data.error || 'An error occurred with the server response';
  } else if (error.request) {
    // The request was made but no response was received
    errorMessage = 'No response received from server. Please check your connection';
  } else {
    // Something happened in setting up the request
    errorMessage = error.message || 'An error occurred while processing your request';
  }
  
  return { message: errorMessage };
};

export default authAPI;