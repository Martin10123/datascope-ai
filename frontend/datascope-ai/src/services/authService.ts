import axios from 'axios';
import type { LoginCredentials, RegisterData, AuthResponse } from '../types/auth.types';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

export const authService = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const response = await axios.post(`${API_URL}/auth/login`, credentials);
    return response.data;
  },

  register: async (data: RegisterData): Promise<AuthResponse> => {
    const response = await axios.post(`${API_URL}/auth/register`, data);
    return response.data;
  },

  logout: async (): Promise<void> => {
    await axios.post(`${API_URL}/auth/logout`);
  },

  refreshToken: async (refreshToken: string): Promise<string> => {
    const response = await axios.post(`${API_URL}/auth/refresh`, { refreshToken });
    return response.data.token;
  },
};
