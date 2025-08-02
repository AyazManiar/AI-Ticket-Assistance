import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/landing.css';

const Landing = () => {
  return (
    <div className="landing-page">
      {/* Navigation */}
      <nav className="nav">
        <div className="container">
          <div className="nav-content">
            <Link to="/" className="nav-brand">
              AI Ticket Assistant
            </Link>
            <div className="nav-links">
              <Link to="/login" className="nav-link">Login</Link>
              <Link to="/signup" className="btn btn-primary">Get Started</Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">
              Smart Ticket Management
              <br />
              <span className="hero-highlight">Powered by AI</span>
            </h1>
            <p className="hero-description">
              Automatically categorize, prioritize, and assign support tickets to the most qualified moderators. 
              Let artificial intelligence streamline your support workflow.
            </p>
            <div className="hero-actions">
              <Link to="/signup" className="btn btn-primary btn-lg">
                Sign Up to get started
              </Link>
              <Link to="/login" className="btn btn-outline btn-lg">
                Log In
              </Link>
            </div>
          </div>
          <div className="hero-visual">
            <div className="demo-card">
              <div className="demo-header">
                <div className="demo-dots">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
                <span className="demo-title">AI Analysis</span>
              </div>
              <div className="demo-content">
                <div className="demo-ticket">
                  <div className="demo-field">
                    <strong>Issue:</strong> React component not rendering
                  </div>
                  <div className="demo-analysis">
                    <div className="analysis-item">
                      <span className="analysis-label">Priority:</span>
                      <span className="priority-medium">Medium</span>
                    </div>
                    <div className="analysis-item">
                      <span className="analysis-label">Skills:</span>
                      <span className="skills-list">React, JavaScript</span>
                    </div>
                    <div className="analysis-item">
                      <span className="analysis-label">Assigned:</span>
                      <span className="assigned-user">@ayaz.dev</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="container">
          <div className="features-header">
            <h2>Why Choose AI Ticket Assistant?</h2>
            <p>Built for modern support teams who value efficiency and intelligence.</p>
          </div>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🤖</div>
              <h3>AI-Powered Analysis</h3>
              <p>Automatically analyze ticket content to determine priority and required skills.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🎯</div>
              <h3>Smart Assignment</h3>
              <p>Match tickets to the most qualified moderators based on their expertise.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">⚡</div>
              <h3>Real-time Processing</h3>
              <p>Background processing ensures tickets are handled instantly without delays.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📧</div>
              <h3>Automated Notifications</h3>
              <p>Keep everyone informed with automatic email updates on ticket status.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">👥</div>
              <h3>Role-Based Access</h3>
              <p>Secure system with different access levels for users, moderators, and admins.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📊</div>
              <h3>Insightful Notes</h3>
              <p>AI generates helpful technical notes to speed up issue resolution.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <p className="footer-text">
              Made with <span className="heart">❤️</span> by Ayaz
            </p>
            <div className="footer-links">
              <a 
                href="https://www.linkedin.com/in/ayazmaniar" 
                target="_blank" 
                rel="noopener noreferrer"
                className="footer-link"
                title="LinkedIn"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a 
                href="mailto:maniarayaz01@gmail.com" 
                className="footer-link"
                title="Email"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-.904.732-1.636 1.636-1.636h1.379L12 11.64l8.985-7.819h1.379c.904 0 1.636.732 1.636 1.636z"/>
                </svg>
              </a>
              <a 
                href="https://github.com/AyazManiar" 
                target="_blank" 
                rel="noopener noreferrer"
                className="footer-link"
                title="GitHub"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
};

export default Landing;
