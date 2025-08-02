import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authAPI, setAuthData } from '../services/api';
import loginIllustration from '../assets/illustration/illustrate.jpeg';
import '../styles/auth.css';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError(''); // Clear error when user starts typing
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await authAPI.login(formData.email, formData.password);
      setAuthData(response.token, response.user);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-layout">
        {/* Illustration Side */}
        <div className="auth-illustration">
          <div className="illustration-content">
            <img src={loginIllustration} alt="Login illustration" className="illustration-image" />
            <div className="illustration-text">
              <h2>Welcome back to AI Ticket Assistant</h2>
              <p>Login to access your Smart Ticket Management dashboard</p>
            </div>
          </div>
        </div>

        {/* Form Side */}
        <div className="auth-form-side">
          <div className="auth-container">
            <div className="auth-header">
              <Link to="/" className="auth-brand">
                AI Ticket Assistant
              </Link>
              <h1>Welcome back</h1>
              <p className="text-muted">Sign in to your account to continue</p>
            </div>

        <form onSubmit={handleSubmit} className="auth-form">
          {error && (
            <div className="error-message">
              {error}
            </div>
          )}

          <div className="form-group">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="form-input"
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="form-input"
              placeholder="Enter your password"
              required
            />
          </div>

          <button 
            type="submit" 
            className="btn btn-primary auth-submit"
            disabled={loading}
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

            <div className="auth-footer">
              <p>
                Don't have an account?{' '}
                <Link to="/signup" className="auth-link">Sign up</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;