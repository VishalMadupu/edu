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

  logout: async (): Promise<ApiResponse<void>> => {
    try {
      const response = await fetch(API_URLS.AUTH.ADMIN.LOGOUT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      });
      
      localStorage.removeItem("admin_token");
      localStorage.removeItem("user_role");
      
      if (!response.ok) {
        return { success: false, message: 'Logout failed' };
      }
      
      return { success: true };
    } catch (error) {
      return { success: false, message: 'An error occurred during admin logout', error };
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

  listStudents: async (token: string): Promise<any[]> => {
    const response = await fetch(API_URLS.ADMIN.STUDENTS, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    if (!response.ok) return [];
    return await response.json();
  },

  listTutors: async (token: string): Promise<any[]> => {
    const response = await fetch(API_URLS.ADMIN.TUTORS, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    if (!response.ok) return [];
    return await response.json();
  },

  listCourses: async (token: string): Promise<any[]> => {
    const response = await fetch(API_URLS.ADMIN.COURSES, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    if (!response.ok) return [];
    return await response.json();
  }
};
