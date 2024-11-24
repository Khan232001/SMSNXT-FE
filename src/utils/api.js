import axios from 'axios';

// Set the base URL of your backend API
const API_URL = 'http://localhost:5000/api'; // Update this to your production API URL

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
