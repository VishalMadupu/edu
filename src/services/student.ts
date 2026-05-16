import { LoginCredentials, SignupData, AuthResponse, ApiResponse } from './interface';
import { API_URLS } from './urls';

export const StudentService = {
  login: async (credentials: LoginCredentials): Promise<ApiResponse<AuthResponse>> => {
    try {
      const response = await fetch(API_URLS.AUTH.STUDENT.LOGIN, {
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
      return { success: false, message: 'An error occurred during student login', error };
    }
  },

  signup: async (data: SignupData): Promise<ApiResponse<AuthResponse>> => {
    try {
      const response = await fetch(API_URLS.AUTH.STUDENT.SIGNUP, {
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
      return { success: false, message: 'An error occurred during student sign up', error };
    }
  },

  logout: async (): Promise<ApiResponse<void>> => {
    try {
      const response = await fetch(API_URLS.AUTH.STUDENT.LOGOUT, {
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
      return { success: false, message: 'An error occurred during student logout', error };
    }
  },
  
  getDashboardData: async (): Promise<ApiResponse<any>> => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(API_URLS.DASHBOARD.STUDENT.STATS, {
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
      return { success: false, message: 'An error occurred fetching student dashboard', error };
    }
  },
  
  oauthLogin: (provider: 'google' | 'github', mode: 'login' | 'signup' = 'login'): void => {
    // Direct browser navigation ensures the session cookie (with OAuth state)
    // is properly set on the backend domain — fetch() doesn't work cross-origin.
    window.location.href = `${API_URLS.AUTH.STUDENT.OAUTH}?mode=${mode}`;
  }
};
