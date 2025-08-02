const API_BASE = 'http://localhost:3000/api';

// Helper function to get auth headers
const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` })
  };
};

// Helper function to handle API responses
const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Something went wrong');
  }
  return response.json();
};

// Auth API
export const authAPI = {
  signup: async (email, password, skills = []) => {
    const response = await fetch(`${API_BASE}/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, skills })
    });
    return handleResponse(response);
  },

  login: async (email, password) => {
    const response = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    return handleResponse(response);
  },

  logout: async () => {
    const response = await fetch(`${API_BASE}/auth/logout`, {
      method: 'POST',
      headers: getAuthHeaders()
    });
    return handleResponse(response);
  },

  updateUser: async (email, role, skills) => {
    const response = await fetch(`${API_BASE}/auth/update-user`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify({ email, role, skills })
    });
    return handleResponse(response);
  },

  getUser: async (email) => {
    const response = await fetch(`${API_BASE}/auth/user`, {
      method: 'GET',
      headers: getAuthHeaders(),
      body: JSON.stringify({ email })
    });
    return handleResponse(response);
  }
};

// Tickets API
export const ticketsAPI = {
  createTicket: async (title, description) => {
    const response = await fetch(`${API_BASE}/tickets/create-ticket`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ title, description })
    });
    return handleResponse(response);
  },

  getTickets: async () => {
    const response = await fetch(`${API_BASE}/tickets/get-tickets`, {
      method: 'GET',
      headers: getAuthHeaders()
    });
    return handleResponse(response);
  },

  getTicket: async (id) => {
    const response = await fetch(`${API_BASE}/tickets/get-ticket/${id}`, {
      method: 'GET',
      headers: getAuthHeaders()
    });
    return handleResponse(response);
  }
};

// User context helper
export const getCurrentUser = () => {
  const token = localStorage.getItem('token');
  const user = localStorage.getItem('user');
  
  if (!token || !user) return null;
  
  try {
    return JSON.parse(user);
  } catch {
    return null;
  }
};

export const setAuthData = (token, user) => {
  localStorage.setItem('token', token);
  localStorage.setItem('user', JSON.stringify(user));
};

export const clearAuthData = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};
