import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import authAPI from '../../services/authAPI';
import './VerifyEmail.css';

const VerifyEmail = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState({
    loading: true,
    success: false,
    message: 'Verifying your email...'
  });

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const response = await authAPI.verifyEmail(token);
        
        // Set success status
        setStatus({
          loading: false,
          success: true,
          message: 'Your email has been verified successfully!'
        });

        // Store token and user info if provided
        if (response.token) {
          localStorage.setItem('token', response.token);
        }
        
        if (response.user) {
          localStorage.setItem('user', JSON.stringify(response.user));
          
          // Redirect to appropriate dashboard after short delay
          setTimeout(() => {
            navigate(`/${response.user.role}/dashboard`);
          }, 3000);
        }
      } catch (error) {
        setStatus({
          loading: false,
          success: false,
          message: error.message || 'Email verification failed. The link may be invalid or expired.'
        });
      }
    };

    verifyEmail();
  }, [token, navigate]);

  return (
    <div className="verify-email-container">
      <div className="verify-email-card">
        <div className="verify-email-content">
          <div className={`status-icon ${status.success ? 'success' : status.loading ? 'loading' : 'error'}`}>
            {status.loading ? (
              <div className="loading-spinner"></div>
            ) : status.success ? (
              <span className="check-icon">✓</span>
            ) : (
              <span className="error-icon">✕</span>
            )}
          </div>
          
          <h2>{status.loading ? 'Verifying Email' : (status.success ? 'Email Verified' : 'Verification Failed')}</h2>
          <p>{status.message}</p>
          
          {status.success ? (
            <p className="redirect-message">You will be redirected to your dashboard shortly...</p>
          ) : !status.loading && (
            <button 
              className="action-button"
              onClick={() => navigate('/')}
            >
              Return to Home
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;