// API configuration for different environments
import axios from 'axios';

// Determine the base URL for API calls
const getBaseURL = () => {
  // In development, use the proxy (localhost:5000)
  if (process.env.NODE_ENV === 'development') {
    return '';
  }
  
  // In production, use your deployed backend URL
  // Choose one of these options:
  
  // Option 1: If you deploy to Heroku
  // return 'https://your-app-name.herokuapp.com';
  
  // Option 2: If you deploy to Railway
  // return 'https://your-app-name.railway.app';
  
  // Option 3: If you deploy to Render
  return 'https://availability-calendar-1.onrender.com';
  
  // Option 4: If you deploy to Vercel
  // return 'https://your-app-name.vercel.app';
  
  // Option 5: If you deploy to Netlify (with serverless functions)
  // return 'https://your-app-name.netlify.app';
  
  // Option 6: If you deploy to DigitalOcean App Platform
  // return 'https://your-app-name.ondigitalocean.app';
  
  // For now, return empty string to use relative paths
  // You'll need to update this with your actual backend URL
  // return '';
};

// Create axios instance with base URL
const api = axios.create({
  baseURL: getBaseURL(),
  timeout: 10000,
});

// Add request interceptor for error handling
api.interceptors.request.use(
  (config) => {
    // You can add auth headers here if needed
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

export default api; 