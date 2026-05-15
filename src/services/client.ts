import { LoginCredentials, SignupData, AuthResponse, ApiResponse } from './interface';
import { API_URLS } from './urls';

export const ClientService = {
  login: async (credentials: LoginCredentials): Promise<ApiResponse<AuthResponse>> => {
    try {
      const response = await fetch(API_URLS.AUTH.CLIENT.LOGIN, {
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
      const response = await fetch(API_URLS.AUTH.CLIENT.SIGNUP, {
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
      const response = await fetch(API_URLS.AUTH.CLIENT.LOGOUT, {
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
      const response = await fetch(API_URLS.DASHBOARD.CLIENT.STATS, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
      return await response.json();
    } catch (error) {
      return { success: false, message: 'An error occurred fetching client dashboard', error };
    }
  },
  
  oauthLogin: (provider: 'google' | 'github'): void => {
     // Backend-driven OAuth: Redirect browser to backend endpoint
     window.location.href = API_URLS.AUTH.CLIENT.OAUTH;
  }
};
