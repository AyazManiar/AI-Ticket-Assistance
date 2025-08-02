import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ticketsAPI, getCurrentUser, clearAuthData } from '../services/api';
import '../styles/dashboard.css';

const Tickets = () => {
  const navigate = useNavigate();
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newTicket, setNewTicket] = useState({ title: '', description: '' });
  const [creating, setCreating] = useState(false);
  
  const user = getCurrentUser();

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    try {
      const response = await ticketsAPI.getTickets();
      setTickets(response.tickets);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTicket = async (e) => {
    e.preventDefault();
    if (!newTicket.title.trim() || !newTicket.description.trim()) return;

    setCreating(true);
    try {
      await ticketsAPI.createTicket(newTicket.title, newTicket.description);
      setNewTicket({ title: '', description: '' });
      setShowCreateForm(false);
      fetchTickets(); // Refresh the list
    } catch (err) {
      setError(err.message);
    } finally {
      setCreating(false);
    }
  };

  const handleLogout = () => {
    clearAuthData();
    navigate('/');
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading tickets...</p>
      </div>
    );
  }

  return (
    <div className="dashboard">
      {/* Navigation */}
      <nav className="nav">
        <div className="container">
          <div className="nav-content">
            <Link to="/" className="nav-brand">
              AI Ticket Assistant
            </Link>
            <div className="nav-links">
              <span className="nav-user">
                {user?.email} ({user?.role})
              </span>
              {user?.role === 'admin' && (
                <Link to="/admin" className="nav-link">Admin</Link>
              )}
              <button onClick={handleLogout} className="btn btn-outline btn-sm">
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="container">
        {/* Header */}
        <div className="dashboard-header">
          <div>
            <h1>Support Tickets</h1>
            <p className="text-muted">
              {user?.role === 'user' 
                ? 'Track your support requests and their status' 
                : 'Manage and resolve support tickets'
              }
            </p>
          </div>
          {user?.role === 'user' && (
            <button
              onClick={() => setShowCreateForm(true)}
              className="btn btn-primary"
            >
              Create Ticket
            </button>
          )}
        </div>

        {/* Error Message */}
        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        {/* Create Ticket Form */}
        {showCreateForm && (
          <div className="modal-overlay">
            <div className="modal">
              <div className="modal-header">
                <h2>Create New Ticket</h2>
                <button
                  onClick={() => setShowCreateForm(false)}
                  className="modal-close"
                >
                  ×
                </button>
              </div>
              <form onSubmit={handleCreateTicket} className="modal-body">
                <div className="form-group">
                  <label className="form-label">Title</label>
                  <input
                    type="text"
                    value={newTicket.title}
                    onChange={(e) => setNewTicket({ ...newTicket, title: e.target.value })}
                    className="form-input"
                    placeholder="Brief description of the issue"
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Description</label>
                  <textarea
                    value={newTicket.description}
                    onChange={(e) => setNewTicket({ ...newTicket, description: e.target.value })}
                    className="form-textarea"
                    placeholder="Detailed description of the issue, including steps to reproduce if applicable"
                    required
                  />
                </div>
                <div className="modal-actions">
                  <button
                    type="button"
                    onClick={() => setShowCreateForm(false)}
                    className="btn btn-secondary"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={creating}
                  >
                    {creating ? 'Creating...' : 'Create Ticket'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Tickets List */}
        <div className="tickets-section">
          {tickets.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">🎫</div>
              <h3>No tickets yet</h3>
              <p className="text-muted">
                {user?.role === 'user' 
                  ? 'Create your first ticket to get started' 
                  : 'No tickets have been created yet'
                }
              </p>
              {user?.role === 'user' && (
                <button
                  onClick={() => setShowCreateForm(true)}
                  className="btn btn-primary mt-4"
                >
                  Create Your First Ticket
                </button>
              )}
            </div>
          ) : (
            <div className="tickets-grid">
              {tickets.map(ticket => (
                <Link
                  key={ticket._id}
                  to={`/ticket/${ticket._id}`}
                  className="ticket-card"
                >
                  <div className="ticket-header">
                    <h3 className="ticket-title">{ticket.title}</h3>
                    <div className="ticket-badges">
                      <span className={`status-badge status-${ticket.status.toLowerCase().replace('_', '-')}`}>
                        {ticket.status.replace('_', ' ')}
                      </span>
                      {ticket.priority && (
                        <span className={`status-badge priority-${ticket.priority.toLowerCase()}`}>
                          {ticket.priority}
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <p className="ticket-description">
                    {ticket.description.length > 150 
                      ? ticket.description.substring(0, 150) + '...'
                      : ticket.description
                    }
                  </p>
                  
                  <div className="ticket-meta">
                    {ticket.createdBy && user?.role !== 'user' && (
                      <span className="ticket-creator">
                        By: {ticket.createdBy.email}
                      </span>
                    )}
                    <span className="ticket-date">
                      {formatDate(ticket.createdAt)}
                    </span>
                  </div>
                  
                  {ticket.relatedSkills && ticket.relatedSkills.length > 0 && (
                    <div className="ticket-skills">
                      {ticket.relatedSkills.slice(0, 3).map(skill => (
                        <span key={skill} className="skill-tag-sm">
                          {skill}
                        </span>
                      ))}
                      {ticket.relatedSkills.length > 3 && (
                        <span className="skill-tag-sm">
                          +{ticket.relatedSkills.length - 3} more
                        </span>
                      )}
                    </div>
                  )}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Tickets;