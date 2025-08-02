import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authAPI, setAuthData } from '../services/api';
import signupIllustration from '../assets/illustration/illustrate2.jpg';
import '../styles/auth.css';

const COMMON_SKILLS = [
  'JavaScript', 'React', 'Node.js', 'Python', 'MongoDB', 'SQL',
  'HTML/CSS', 'TypeScript', 'Express.js', 'Git', 'AWS', 'Docker',
  'REST APIs', 'GraphQL', 'Vue.js', 'Angular', 'PHP', 'Java',
  'C#', 'DevOps', 'Linux', 'Firebase', 'Redux', 'Next.js'
];

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    skills: []
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSkillToggle = (skill) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter(s => s !== skill)
        : [...prev.skills, skill]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      setLoading(false);
      return;
    }

    try {
      const response = await authAPI.signup(formData.email, formData.password, formData.skills);
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
            <img src={signupIllustration} alt="Signup illustration" className="illustration-image" />
            <div className="illustration-text">
              <h2>Sign-up to get started</h2>
              <p>Create your account to quickly solve your problems</p>
            </div>
          </div>
        </div>

        {/* Form Side */}
        <div className="auth-form-side">
          <div className="auth-container signup-container">
            <div className="auth-header">
              <Link to="/" className="auth-brand">
                AI Ticket Assistant
              </Link>
              <h1>Create your account</h1>
              <p className="text-muted">Join thousands of teams using AI for support</p>
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
              placeholder="Create a password"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="form-input"
              placeholder="Confirm your password"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">
              Your Skills (Optional)
              <span className="text-muted text-xs ml-1">Help us assign relevant tickets to you</span>
            </label>
            <div className="skills-grid">
              {COMMON_SKILLS.map(skill => (
                <button
                  key={skill}
                  type="button"
                  onClick={() => handleSkillToggle(skill)}
                  className={`skill-tag ${formData.skills.includes(skill) ? 'selected' : ''}`}
                >
                  {skill}
                </button>
              ))}
            </div>
            {formData.skills.length > 0 && (
              <div className="selected-skills">
                <span className="text-sm text-muted">
                  Selected: {formData.skills.join(', ')}
                </span>
              </div>
            )}
          </div>

          <button 
            type="submit" 
            className="btn btn-primary auth-submit"
            disabled={loading}
          >
            {loading ? 'Creating account...' : 'Create Account'}
          </button>
        </form>

            <div className="auth-footer">
              <p>
                Already have an account?{' '}
                <Link to="/login" className="auth-link">Sign in</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;