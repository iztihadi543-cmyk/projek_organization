/**
 * API Service
 * Axios instance dengan konfigurasi base URL dan interceptors
 */

import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

// Create axios instance
const api = axios.create({
  baseURL: `${API_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Request interceptor - add auth token
api.interceptors.request.use(
  (config) => {
    // Get token from localStorage
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // Server responded with error
      const { status, data } = error.response;
      
      // Handle 401 Unauthorized
      if (status === 401) {
        // Clear localStorage and redirect to login
        if (typeof window !== 'undefined') {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          
          // Only redirect if not already on login page
          if (!window.location.pathname.includes('/login')) {
            window.location.href = '/login';
          }
        }
      }
      
      return Promise.reject(data);
    }
    
    if (error.request) {
      // Request made but no response
      return Promise.reject({ 
        success: false, 
        message: 'Tidak dapat terhubung ke server. Periksa koneksi internet.' 
      });
    }
    
    return Promise.reject({ 
      success: false, 
      message: error.message 
    });
  }
);

// Helper methods
export const get = (url, params) => api.get(url, { params });
export const post = (url, data) => api.post(url, data);
export const put = (url, data) => api.put(url, data);
export const patch = (url, data) => api.patch(url, data);
export const del = (url) => api.delete(url);

// Upload file with FormData
export const upload = async (url, formData, onProgress) => {
  const response = await axios.post(`${API_URL}${url}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    onUploadProgress: (progressEvent) => {
      const percentCompleted = Math.round(
        (progressEvent.loaded * 100) / progressEvent.total
      );
      if (onProgress) onProgress(percentCompleted);
    },
  });
  
  return response.data;
};

export default api;

