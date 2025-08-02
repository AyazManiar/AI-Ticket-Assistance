import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="navbar">
        <div className="container">
          <div className="navbar-content">
            <Link to="/" className="navbar-brand">
              AI Ticket Assistant
            </Link>
            <div className="navbar-nav">
              <Link to="/login" className="btn btn-outline">
                Login
              </Link>
              <Link to="/signup" className="btn btn-primary">
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container" style={{ padding: '6rem 1.5rem 4rem' }}>
        <div className="text-center mb-6">
          <h1 style={{ fontSize: '3.5rem', fontWeight: '700', marginBottom: '1.5rem', lineHeight: '1.1' }}>
            AI-Powered
            <br />
            <span style={{ color: '#3b82f6' }}>Ticket Management</span>
          </h1>
          <p style={{ fontSize: '1.25rem', color: '#6b7280', maxWidth: '600px', margin: '0 auto 2rem' }}>
            Automatically categorize, prioritize, and assign support tickets with intelligent AI matching. 
            Streamline your support workflow like never before.
          </p>
          <div className="flex gap-4 justify-center">
            <Link to="/signup" className="btn btn-primary" style={{ fontSize: '16px', padding: '16px 32px' }}>
              Start Free Trial
            </Link>
            <Link to="/login" className="btn btn-secondary" style={{ fontSize: '16px', padding: '16px 32px' }}>
              Sign In
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container" style={{ padding: '4rem 1.5rem' }}>
        <div className="text-center mb-6">
          <h2 style={{ marginBottom: '1rem' }}>Intelligent Features</h2>
          <p className="text-muted" style={{ fontSize: '1.1rem' }}>
            Powered by advanced AI to make your support team more efficient
          </p>
        </div>

        <div className="grid grid-3">
          <div className="card text-center">
            <div style={{ 
              width: '60px', 
              height: '60px', 
              background: '#eff6ff', 
              borderRadius: '12px', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              margin: '0 auto 1rem',
              fontSize: '24px'
            }}>
              🤖
            </div>
            <h3 style={{ marginBottom: '1rem' }}>AI Categorization</h3>
            <p className="text-muted">
              Automatically categorize and prioritize tickets using advanced AI analysis of content and context.
            </p>
          </div>

          <div className="card text-center">
            <div style={{ 
              width: '60px', 
              height: '60px', 
              background: '#f0fdf4', 
              borderRadius: '12px', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              margin: '0 auto 1rem',
              fontSize: '24px'
            }}>
              🎯
            </div>
            <h3 style={{ marginBottom: '1rem' }}>Smart Assignment</h3>
            <p className="text-muted">
              Match tickets to the most qualified moderators based on skills and expertise automatically.
            </p>
          </div>

          <div className="card text-center">
            <div style={{ 
              width: '60px', 
              height: '60px', 
              background: '#fef7ff', 
              borderRadius: '12px', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              margin: '0 auto 1rem',
              fontSize: '24px'
            }}>
              ⚡
            </div>
            <h3 style={{ marginBottom: '1rem' }}>Real-time Processing</h3>
            <p className="text-muted">
              Lightning-fast ticket processing with real-time notifications and updates for your team.
            </p>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="container" style={{ padding: '4rem 1.5rem', backgroundColor: '#f8fafc', margin: '4rem auto', borderRadius: '24px' }}>
        <div className="text-center mb-6">
          <h2 style={{ marginBottom: '1rem' }}>How It Works</h2>
          <p className="text-muted" style={{ fontSize: '1.1rem' }}>
            Simple, automated workflow that saves time and improves accuracy
          </p>
        </div>

        <div className="grid grid-2" style={{ gap: '3rem' }}>
          <div className="flex gap-4">
            <div style={{
              width: '40px',
              height: '40px',
              background: '#3b82f6',
              color: 'white',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: '600',
              flexShrink: 0
            }}>
              1
            </div>
            <div>
              <h4 style={{ marginBottom: '0.5rem' }}>Submit Ticket</h4>
              <p className="text-muted">
                Users submit support tickets with descriptions of their issues or requests.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div style={{
              width: '40px',
              height: '40px',
              background: '#3b82f6',
              color: 'white',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: '600',
              flexShrink: 0
            }}>
              2
            </div>
            <div>
              <h4 style={{ marginBottom: '0.5rem' }}>AI Analysis</h4>
              <p className="text-muted">
                Our AI analyzes the ticket content and determines priority, category, and required skills.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div style={{
              width: '40px',
              height: '40px',
              background: '#3b82f6',
              color: 'white',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: '600',
              flexShrink: 0
            }}>
              3
            </div>
            <div>
              <h4 style={{ marginBottom: '0.5rem' }}>Smart Assignment</h4>
              <p className="text-muted">
                Tickets are automatically assigned to the most qualified moderator based on skills match.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div style={{
              width: '40px',
              height: '40px',
              background: '#3b82f6',
              color: 'white',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: '600',
              flexShrink: 0
            }}>
              4
            </div>
            <div>
              <h4 style={{ marginBottom: '0.5rem' }}>Resolution</h4>
              <p className="text-muted">
                Moderators receive AI-generated helpful notes and get to work on resolving the issue.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container text-center" style={{ padding: '4rem 1.5rem 6rem' }}>
        <h2 style={{ marginBottom: '1rem' }}>Ready to Transform Your Support?</h2>
        <p className="text-muted mb-4" style={{ fontSize: '1.1rem', maxWidth: '500px', margin: '0 auto 2rem' }}>
          Join hundreds of teams already using AI to streamline their ticket management workflow.
        </p>
        <Link to="/signup" className="btn btn-primary" style={{ fontSize: '16px', padding: '16px 32px' }}>
          Get Started Today
        </Link>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: '1px solid #f1f5f9', padding: '2rem 0', backgroundColor: '#f8fafc' }}>
        <div className="container">
          <div className="flex justify-between items-center">
            <div className="navbar-brand">AI Ticket Assistant</div>
            <p className="text-muted text-small">
              © 2025 AI Ticket Assistant. Built with intelligence.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
