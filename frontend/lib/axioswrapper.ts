import axios from 'axios';
import Cookies from 'js-cookie'; // Import js-cookie to retrieve token from cookies

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: 'http://localhost:3011/api',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Make sure credentials (cookies) are sent with the requests
});

// Add a request interceptor to attach the token from cookies
axiosInstance.interceptors.request.use(
  (config) => {
    // Retrieve the token from cookies
    const token = Cookies.get('authToken');

    // If a token exists, set the Authorization header
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    // Handle request error here
    return Promise.reject(error);
  }
);

export default axiosInstance;
