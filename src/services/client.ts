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
      
      const data = await response.json();
      
      if (!response.ok) {
        return { success: false, message: data.detail || 'Login failed', error: data };
      }
      
      return { success: true, data };
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
      
      const responseData = await response.json();
      
      if (!response.ok) {
        return { success: false, message: responseData.detail || 'Signup failed', error: responseData };
      }
      
      return { success: true, data: responseData };
    } catch (error) {
      return { success: false, message: 'An error occurred during client sign up', error };
    }
  },

  logout: async (): Promise<ApiResponse<void>> => {
    try {
      const response = await fetch(API_URLS.AUTH.CLIENT.LOGOUT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include', // Ensure session cookies are cleared
      });
      
      localStorage.removeItem("token");
      localStorage.removeItem("user_role");
      
      if (!response.ok) {
        return { success: false, message: 'Logout failed' };
      }
      
      return { success: true };
    } catch (error) {
      return { success: false, message: 'An error occurred during client logout', error };
    }
  },
  
  getDashboardData: async (): Promise<ApiResponse<any>> => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(API_URLS.DASHBOARD.CLIENT.STATS, {
        method: 'GET',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        return { success: false, message: data.detail || 'Failed to fetch dashboard data', error: data };
      }
      
      return { success: true, data };
    } catch (error) {
      return { success: false, message: 'An error occurred fetching client dashboard', error };
    }
  },
  
  oauthLogin: async (provider: 'google' | 'github'): Promise<void> => {
    try {
      const response = await fetch(API_URLS.AUTH.CLIENT.OAUTH_URL, {
        method: 'GET',
        credentials: 'include', // Important for session cookies
      });
      const data = await response.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        console.error("Failed to get OAuth URL");
      }
    } catch (error) {
      console.error("Error during OAuth login initiation:", error);
    }
  }
};
