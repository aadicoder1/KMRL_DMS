import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000",
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Handle FormData vs JSON content types
api.interceptors.request.use((config) => {
  if (config.data instanceof FormData) {
    delete config.headers['Content-Type']; // let browser set it with boundary
  } else {
    config.headers['Content-Type'] = 'application/json';
  }
  return config;
});

// Response error handler
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      console.error('API Error:', error.response.status, error.response.data);
    } else if (error.request) {
      console.error('No response received - is the backend running?');
    } else {
      console.error('Request error:', error.message);
    }
    return Promise.reject(error);
  }
);

export default api;




/*// src/api/api.js
import axios from "axios";

const api = axios.create({
  // baseURL: "https://51.20.32.249/", // Fixed: removed double slash
  baseURL: "https://lyricalcoder-sih.hf.space/", // Fixed: removed double slash
  timeout: 30000, // 30 seconds timeout

  baseURL: "http://51.20.32.249/", // change to your FastAPI base URL
  headers: {
    "Content-Type": "application/json",
  },
});

// Add request interceptor to handle different content types
api.interceptors.request.use((config) => {
  // For FormData (file uploads), let axios set the Content-Type automatically
  if (config.data instanceof FormData) {
    delete config.headers['Content-Type'];
  } else {
    // For regular JSON requests
    config.headers['Content-Type'] = 'application/json';
  }
  return config;
});

// Add response interceptor for better error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error);
    
    if (error.response) {
      // Server responded with error status
      console.error('Error Response:', error.response.data);
      console.error('Error Status:', error.response.status);
    } else if (error.request) {
      // Request was made but no response received
      console.error('No response received:', error.request);
    } else {
      // Something else happened
      console.error('Error message:', error.message);
    }
    
    return Promise.reject(error);
  }
);

export default api;
*/