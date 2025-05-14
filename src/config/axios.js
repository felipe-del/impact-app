/**
 * axios.js
 * 
 * This file configures the Axios instance for making HTTP requests to the API.
 * It sets the base URL and includes an interceptor to attach the JWT token to the request headers.
 */
import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
})

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('AUTH_TOKEN');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

export default api