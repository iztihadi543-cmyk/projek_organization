/**
 * Auth Service
 * Layanan autentikasi untuk login, logout, dan manajemen user
 */

import api, { post, get, put } from './api';

// Save token to localStorage
const saveToken = (token) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('token', token);
  }
};

// Save user to localStorage
const saveUser = (user) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('user', JSON.stringify(user));
  }
};

// Get user from localStorage
const getUser = () => {
  if (typeof window !== 'undefined') {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }
  return null;
};

// Get token from localStorage
const getToken = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('token');
  }
  return null;
};

// Check if user is logged in
const isAuthenticated = () => {
  const token = getToken();
  const user = getUser();
  return !!(token && user);
};

// Check if user has specific role
const hasRole = (role) => {
  const user = getUser();
  return user?.role === role;
};

// Check if user is admin
const isAdmin = () => hasRole('admin');

// Check if user is editor or admin
const isEditor = () => {
  const user = getUser();
  return user?.role === 'admin' || user?.role === 'editor';
};

/**
 * Login user
 */
export const login = async (email, password) => {
  const response = await post('/auth/login', { email, password });
  
  if (response.success) {
    saveToken(response.data.token);
    saveUser(response.data.user);
  }
  
  return response;
};

/**
 * Register new user
 */
export const register = async (userData) => {
  const response = await post('/auth/register', userData);
  
  if (response.success) {
    saveToken(response.data.token);
    saveUser(response.data.user);
  }
  
  return response;
};

/**
 * Get current user profile
 */
export const getProfile = async () => {
  const response = await get('/auth/me');
  return response;
};

/**
 * Update user profile
 */
export const updateProfile = async (userData) => {
  const response = await put('/auth/profile', userData);
  
  if (response.success) {
    saveUser(response.data);
  }
  
  return response;
};

/**
 * Change password
 */
export const changePassword = async (currentPassword, newPassword) => {
  return await put('/auth/password', { currentPassword, newPassword });
};

/**
 * Logout user
 */
export const logout = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/';
  }
};

export default {
  login,
  register,
  getProfile,
  updateProfile,
  changePassword,
  logout,
  getUser,
  getToken,
  isAuthenticated,
  hasRole,
  isAdmin,
  isEditor,
};

