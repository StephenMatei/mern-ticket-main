import axios from 'axios';

// Use backend API from .env (fallback to localhost)
const API_URL = `${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/tickets/`;

// Create new ticket (token optional)
const createTicket = async (ticketData, token) => {
  const config = token
    ? { headers: { Authorization: `Bearer ${token}` } }
    : {}; // no Authorization header for guests

  const response = await axios.post(API_URL, ticketData, config);
  return response.data;
};

// Get user tickets (requires token)
const getTickets = async (token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const response = await axios.get(API_URL, config);
  return response.data;
};

// Get user ticket (requires token)
const getTicket = async (ticketId, token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const response = await axios.get(API_URL + ticketId, config);
  return response.data;
};

// Close ticket (requires token)
const closeTicket = async (ticketId, token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const response = await axios.put(
    API_URL + ticketId,
    { status: 'closed' },
    config
  );
  return response.data;
};

const ticketService = {
  createTicket,
  getTickets,
  getTicket,
  closeTicket,
};

export default ticketService;
