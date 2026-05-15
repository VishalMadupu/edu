import { API_URLS } from './urls';
import { AuthResponse, LoginCredentials, ApiResponse } from './interface';

export const adminService = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    // In a real app, this would use fetch or axios to call API_URLS.AUTH.ADMIN.LOGIN
    // Using FormData as expected by OAuth2PasswordRequestForm in backend
    const formData = new FormData();
    formData.append('username', credentials.email); // Backend expects username (which we use email for in some cases)
    formData.append('password', credentials.password || '');

    const response = await fetch(API_URLS.AUTH.ADMIN.LOGIN, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Admin login failed');
    }

    const data = await response.json();
    // Assuming backend returns { access_token: string, token_type: string }
    return {
      token: data.access_token,
      user: {
        id: 'admin-id',
        email: credentials.email,
        role: 'admin',
        name: 'Super Admin',
      }
    };
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
    return await response.json();
  },

  listProviders: async (token: string): Promise<any[]> => {
    const response = await fetch(API_URLS.ADMIN.PROVIDERS, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return await response.json();
  },

  listProjects: async (token: string): Promise<any[]> => {
    const response = await fetch(API_URLS.ADMIN.PROJECTS, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return await response.json();
  }
};
