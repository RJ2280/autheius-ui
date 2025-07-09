import axios from 'axios';

// Use the VITE_API_URL from your .env file, or default to the correct backend port.
const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

// Create a pre-configured instance of axios.
const apiClient = axios.create({
  baseURL: `${BASE_URL}/api`, // All requests will now be correctly prefixed with /api
});

export default apiClient;

