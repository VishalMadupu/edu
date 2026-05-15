export interface LoginCredentials {
  email: string;
  password?: string;
}

export interface SignupData {
  email: string;
  password?: string;
  confirmPassword?: string;
  name?: string;
  username?: string;
}

export interface AuthUser {
  id: string;
  email: string;
  role: 'client' | 'provider' | 'admin';
  name?: string;
  avatarUrl?: string;
}

export interface AuthResponse {
  access_token: string;
  token_type: string;
  user: AuthUser;
}

export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
  error?: any;
}
