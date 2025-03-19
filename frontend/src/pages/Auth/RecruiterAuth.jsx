import React, { useEffect, useState } from 'react';
import { FaFacebookF, FaGoogle, FaLinkedinIn, FaTimes, FaSpinner } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import authAPI from '../../services/authAPI';
import './RecruiterAuth.css';

const RecruiterAuth = () => {
  const { isAuthenticated, currentUser } = useAuth();

  const [signIn, setSignIn] = useState(true);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();
  const { login, register } = useAuth();

  const handleSocialLogin = (provider) => {
    authAPI.socialLogin(provider);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
    setSuccessMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccessMessage('');

    try {
      if (signIn) {
        await login(formData.email, formData.password);
        navigate('/recruiter/dashboard');
      } else {
        await register({ ...formData, role: 'recruiter' });
        // Don't navigate to dashboard after registration
        setSignIn(true); // Switch to sign-in panel
        setError(''); // Clear any errors
        // Reset form data
        setFormData({ name: '', email: '', password: '' });
        // Show success message in the page
        setSuccessMessage('Registration successful! Please sign in to access your account.');
      }
    } catch (err) {
      setError(err.message || (signIn ? 'Login failed. Please check your credentials.' : 'Registration failed. Please try again.'));
    } finally {
      setLoading(false);
    }
  };

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
  useEffect(() => {
    if (isAuthenticated()) {
      navigate(currentUser.role === 'recruiter' 
        ? '/recruiter/dashboard' 
        : '/candidate/dashboard'
      );
    }
  }, [isAuthenticated, currentUser, navigate]);
  return (
    <div className='auth-cantainer'>
            <Link to={"/"} className="Home-Logo"> ProHire</Link>
      
    <div className={`container ${signIn ? '' : 'right-panel-active'}`}>
      {/* Forgot Password Modal */}
      {showForgotPassword && (
        <div className="modal-overlay" onClick={() => setShowForgotPassword(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-button" onClick={() => setShowForgotPassword(false)}>
              <FaTimes />
            </button>
            <h2>Reset Your Password</h2>
            <p>Enter your registered work email address</p>
            <form onSubmit={handleForgotPassword}>
              <input
                type="email"
                name="email"
                placeholder="Work Email"
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
          <h1 className="title">Recruiter Sign Up</h1>
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
          <span className="divider">or register with your corporate email</span>
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
            placeholder="Work Email"
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
          {successMessage && <div className="success-message">{successMessage}</div>}
          <button className="button" type="submit" disabled={loading}>
            {loading ? <FaSpinner className="spinner" /> : 'Create Account'}
          </button>
        </form>
      </div>

      {/* Sign In Container */}
      <div className="form-container sign-in-container">
        <form className="form" onSubmit={handleSubmit}>
          <h1 className="title">Recruiter Sign In</h1>
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
          <span className="divider">or sign in with your corporate email</span>
          {successMessage && <div className="success-message">{successMessage}</div>}
          <input
            type="email"
            name="email"
            placeholder="Work Email"
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
          {error && signIn && <div className="error-message">{error}</div>}
          <button className="anchor" onClick={(e) => {
            e.preventDefault();
            setShowForgotPassword(true);
          }}>
            Forgot Password?
          </button>
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
              Access your talent network and advanced hiring analytics
            </p>
            <button className="ghost-button" onClick={() => setSignIn(true)}>
              Access Account
            </button>
            <span className='im-not'> <Link to={"/candidate/auth"}>I'm not a Recruiter</Link></span>

          </div>
          <div className="overlay-panel right-overlay-panel">
            <h1 className="title">New to ProHire?</h1>
            <p className="paragraph">
              Register your organization to begin candidate management
            </p>
            <button className="ghost-button" onClick={() => setSignIn(false)}>
              Begin Registration
            </button>
            
            <span className='im-not'> <Link to={"/candidate/auth"}>I'm not a Recruiter</Link></span>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default RecruiterAuth;