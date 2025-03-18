import React, { useState } from 'react';
import { FaFacebookF, FaGoogle, FaLinkedinIn, FaTimes, FaSpinner } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import authAPI from '../../services/authAPI';
import './CandidateAuth.css'; 

const CandidateAuth = () => {
  const [signIn, setSignIn] = useState(true);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();
  const { login, register } = useAuth();

  // Handle social login redirect
  const handleSocialLogin = (provider) => {
    authAPI.socialLogin(provider);
  };

  // Handle input changes
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
    setSuccessMessage('');
  };

  // Handle form submission (login/signup)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccessMessage('');

    try {
      if (signIn) {
        // Login
        await login(formData.email, formData.password);
        navigate('/candidate/dashboard');
      } else {
        // Register
        await register({ ...formData, role: 'candidate' });
        // Don't navigate to dashboard after registration
        setSignIn(true); // Switch to sign-in panel
        setError(''); // Clear any errors
        // Reset form data
        setFormData({ ...formData, name: '', password: '' });
        // Show success message in the page
        setSuccessMessage('Registration successful! Please sign in to access your account.');
      }
    } catch (err) {
      setError(err.message || (signIn ? 'Login failed. Please check your credentials.' : 'Registration failed. Please try again.'));
    } finally {
      setLoading(false);
    }
  };

  // Handle forgot password
  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await authAPI.forgotPassword(formData.email);
      setSuccessMessage('Password reset instructions sent to your email!');
      setShowForgotPassword(false);
      setFormData({ ...formData, email: '' });
    } catch (err) {
      setError(err.message || 'Failed to send reset instructions. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`container ${signIn ? '' : 'right-panel-active'}`}>
      {/* Forgot Password Modal */}
      {showForgotPassword && (
        <div className="modal-overlay" onClick={() => setShowForgotPassword(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-button" onClick={() => setShowForgotPassword(false)}>
              <FaTimes />
            </button>
            <h2>Reset Your Password</h2>
            <p>Enter your registered email address</p>
            <form onSubmit={handleForgotPassword}>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
              {error && <div className="error-message">{error}</div>}
              {successMessage && <div className="success-message">{successMessage}</div>}
              <div className="modal-actions">
                <button type="button" className="cancel-btn" onClick={() => setShowForgotPassword(false)}>
                  Cancel
                </button>
                <button type="submit" className="submit-btn" disabled={loading}>
                  {loading ? <FaSpinner className="spinner" /> : 'Send Reset Link'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Sign Up Container */}
      <div className="form-container sign-up-container">
        <form className="form" onSubmit={handleSubmit}>
          <h1 className="title">Candidate Sign Up</h1>
          <div className="social-icons">
            <button 
              type="button"
              className="social-icon"
              onClick={() => handleSocialLogin('facebook')}
            >
              <FaFacebookF />
            </button>
            <button 
              type="button"
              className="social-icon"
              onClick={() => handleSocialLogin('google')}
            >
              <FaGoogle />
            </button>
            <button 
              type="button"
              className="social-icon"
              onClick={() => handleSocialLogin('linkedin')}
            >
              <FaLinkedinIn />
            </button>
          </div>
          <span className="divider">or register with your email</span>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            className="input"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="input"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Create Password"
            className="input"
            value={formData.password}
            onChange={handleInputChange}
            minLength="8"
            required
          />
          {error && !signIn && <div className="error-message">{error}</div>}
          <button className="button" type="submit" disabled={loading}>
            {loading ? <FaSpinner className="spinner" /> : 'Create Account'}
          </button>
        </form>
      </div>

      {/* Sign In Container */}
      <div className="form-container sign-in-container">
        <form className="form" onSubmit={handleSubmit}>
          <h1 className="title">Candidate Sign In</h1>
          <div className="social-icons">
            <button 
              type="button"
              className="social-icon"
              onClick={() => handleSocialLogin('facebook')}
            >
              <FaFacebookF />
            </button>
            <button 
              type="button"
              className="social-icon"
              onClick={() => handleSocialLogin('google')}
            >
              <FaGoogle />
            </button>
            <button 
              type="button"
              className="social-icon"
              onClick={() => handleSocialLogin('linkedin')}
            >
              <FaLinkedinIn />
            </button>
          </div>
          <span className="divider">or sign in with your email</span>
          {successMessage && <div className="success-message">{successMessage}</div>}
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="input"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="input"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
          <a href="#" className="anchor" onClick={(e) => {
            e.preventDefault();
            setShowForgotPassword(true);
          }}>
            Forgot Password?
          </a>
          {error && signIn && <div className="error-message">{error}</div>}
          <button className="button" type="submit" disabled={loading}>
            {loading ? <FaSpinner className="spinner" /> : 'Access Account'}
          </button>
        </form>
      </div>

      {/* Overlay Container */}
      <div className="overlay-container">
        <div className="overlay">
          <div className="overlay-panel left-overlay-panel">
            <h1 className="title">Welcome Back!</h1>
            <p className="paragraph">
              Access your job applications and career resources
            </p>
            <button className="ghost-button" onClick={() => setSignIn(true)}>
              Access Account
            </button>
          </div>
          <div className="overlay-panel right-overlay-panel">
            <h1 className="title">New to ProHire?</h1>
            <p className="paragraph">
              Register to discover exciting job opportunities
            </p>
            <button className="ghost-button" onClick={() => setSignIn(false)}>
              Begin Registration
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CandidateAuth;