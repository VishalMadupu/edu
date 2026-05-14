import { LoginCredentials, SignupData, AuthResponse, ApiResponse } from './interface';

// Base API URL config - replace with actual environment variable later
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '/api';

export const ClientService = {
  login: async (credentials: LoginCredentials): Promise<ApiResponse<AuthResponse>> => {
    try {
      const response = await fetch(`${API_BASE_URL}/client/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      });
      return await response.json();
    } catch (error) {
      return { success: false, message: 'An error occurred during client login', error };
    }
  },

  signup: async (data: SignupData): Promise<ApiResponse<AuthResponse>> => {
    try {
      const response = await fetch(`${API_BASE_URL}/client/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      return await response.json();
    } catch (error) {
      return { success: false, message: 'An error occurred during client sign up', error };
    }
  },

  logout: async (): Promise<ApiResponse<void>> => {
    try {
      const response = await fetch(`${API_BASE_URL}/client/logout`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
      return await response.json();
    } catch (error) {
      return { success: false, message: 'An error occurred during client logout', error };
    }
  },
  
  getDashboardData: async (): Promise<ApiResponse<any>> => {
    try {
      // Typically requires Authorization header with bearer token
      const response = await fetch(`${API_BASE_URL}/client/dashboard`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
      return await response.json();
    } catch (error) {
      return { success: false, message: 'An error occurred fetching client dashboard', error };
    }
  },
  
  oauthLogin: (provider: 'google' | 'github'): void => {
     // Implement OAuth redirect logic here
     window.location.href = `${API_BASE_URL}/auth/${provider}?role=client`;
  }
};
