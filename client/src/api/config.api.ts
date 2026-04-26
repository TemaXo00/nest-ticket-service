import axios from 'axios';

const ticketApiURL = import.meta.env.VITE_TICKET_SERVICE_URL;
const eventsApiURL = import.meta.env.VITE_EVENTS_SERVICE_URL;

export const ticketApi = axios.create({
  baseURL: ticketApiURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const eventsApi = axios.create({
  baseURL: eventsApiURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

ticketApi.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

eventsApi.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
