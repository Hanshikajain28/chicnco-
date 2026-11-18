import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Interceptor for Auth token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('chicnco_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  let sessionId = localStorage.getItem('chicnco_session_id');
  if (!sessionId) {
    sessionId = 'session_' + Math.random().toString(36).substring(2, 15);
    localStorage.setItem('chicnco_session_id', sessionId);
  }
  config.headers['x-session-id'] = sessionId;
  return config;
});

export default api;

