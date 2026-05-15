import { API_URLS } from './urls';
import { AuthResponse, LoginCredentials, ApiResponse } from './interface';

export const adminService = {
  login: async (credentials: LoginCredentials): Promise<ApiResponse<AuthResponse>> => {
    try {
      const response = await fetch(API_URLS.AUTH.ADMIN.LOGIN, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        return { success: false, message: data.detail || 'Admin login failed', error: data };
      }
      
      return { success: true, data };
    } catch (error) {
      return { success: false, message: 'An error occurred during admin login', error };
    }
  },

  signup: async (data: any): Promise<ApiResponse<any>> => {
    try {
      const response = await fetch(API_URLS.AUTH.ADMIN.SIGNUP, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      
      const responseData = await response.json();
      
      if (!response.ok) {
        return { success: false, message: responseData.detail || 'Admin signup failed', error: responseData };
      }
      
      return { success: true, data: responseData };
    } catch (error) {
      return { success: false, message: 'An error occurred during admin signup', error };
    }
  },

  updatePassword: async (token: string, data: any): Promise<ApiResponse<void>> => {
    try {
      const response = await fetch(API_URLS.USER.CHANGE_PASSWORD, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data),
      });
      
      const responseData = await response.json();
      
      if (!response.ok) {
        return { success: false, message: responseData.detail || 'Password update failed', error: responseData };
      }
      
      return { success: true };
    } catch (error) {
      return { success: false, message: 'An error occurred during password update', error };
    }
  },

  getStats: async (token: string): Promise<any> => {
    const response = await fetch(API_URLS.ADMIN.STATS, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch admin stats');
    }

    return await response.json();
  },

  listClients: async (token: string): Promise<any[]> => {
    const response = await fetch(API_URLS.ADMIN.CLIENTS, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    if (!response.ok) return [];
    return await response.json();
  },

  listProviders: async (token: string): Promise<any[]> => {
    const response = await fetch(API_URLS.ADMIN.PROVIDERS, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    if (!response.ok) return [];
    return await response.json();
  },

  listProjects: async (token: string): Promise<any[]> => {
    const response = await fetch(API_URLS.ADMIN.PROJECTS, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    if (!response.ok) return [];
    return await response.json();
  }
};
