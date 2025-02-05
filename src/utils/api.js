// import axios from 'axios';

// // Set the base URL of your backend API
// const API_URL = 'http://localhost:3000/api'; // Update this to your production API URL

// const api = axios.create({
//   baseURL: API_URL,
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

// export default api;

import axios from 'axios';

// Set the base URL dynamically based on the environment
const API_URL = process.env.REACT_APP_API_URL;

const api = axios.create({
  baseURL: API_URL, 
  headers: {
    'Content-Type': 'application/json',
  },
});



// Add a request interceptor to include the token in headers
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add a response interceptor for centralized error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle specific status codes
    if (error.response && error.response.status === 401) {
      alert('Session expired. Please log in again.');
      localStorage.removeItem('token');
      window.location.href = '/login'; // Redirect to login page
    } else {
      console.error(error.response?.data?.message || error.message);
    }
    return Promise.reject(error);
  }
);

// Reusable API functions
export const login = async (email, password) => {
  return api.post('/login', { email, password });
};

export const fetchUser = async () => {
  return api.get('/user');
};

export const updateUser = async (userData) => {
  return api.put('/user', userData);
};

export const signup = async (userData) => {
  return api.post('/signup', userData);
};


// Export the configured API instance as default
export default api;
