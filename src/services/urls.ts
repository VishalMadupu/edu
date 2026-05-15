export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

export const API_URLS = {
  // Authentication Endpoints
  AUTH: {
    CLIENT: {
      LOGIN: `${API_BASE_URL}/auth/client/login`,
      SIGNUP: `${API_BASE_URL}/auth/client/signup`,
      LOGOUT: `${API_BASE_URL}/auth/client/logout`,
      OAUTH: `${API_BASE_URL}/auth/client/oauth`,
      OAUTH_URL: `${API_BASE_URL}/auth/client/oauth-url`,
    },
    PROVIDER: {
      LOGIN: `${API_BASE_URL}/auth/provider/login`,
      SIGNUP: `${API_BASE_URL}/auth/provider/signup`,
      LOGOUT: `${API_BASE_URL}/auth/provider/logout`,
      OAUTH: `${API_BASE_URL}/auth/provider/oauth`,
      OAUTH_URL: `${API_BASE_URL}/auth/provider/oauth-url`,
    },
    ADMIN: {
      LOGIN: `${API_BASE_URL}/auth/admin/login`,
      SIGNUP: `${API_BASE_URL}/auth/admin/signup`,
      LOGOUT: `${API_BASE_URL}/auth/admin/logout`,
    },
    VERIFY_TOKEN: `${API_BASE_URL}/auth/verify`,
  },

  // Admin Endpoints
  ADMIN: {
    STATS: `${API_BASE_URL}/admin/stats`,
    CLIENTS: `${API_BASE_URL}/admin/clients`,
    PROVIDERS: `${API_BASE_URL}/admin/providers`,
    PROJECTS: `${API_BASE_URL}/admin/projects`,
  },

  // User Profile Endpoints
  USER: {
    PROFILE: `${API_BASE_URL}/users/profile`,
    UPDATE_PROFILE: `${API_BASE_URL}/users/profile/update`,
    CHANGE_PASSWORD: `${API_BASE_URL}/users/change-password`,
    SETTINGS: `${API_BASE_URL}/users/settings`,
  },

  // Dashboard Endpoints
  DASHBOARD: {
    CLIENT: {
      STATS: `${API_BASE_URL}/dashboard/client/stats`,
      RECENT_ACTIVITY: `${API_BASE_URL}/dashboard/client/activity`,
    },
    PROVIDER: {
      STATS: `${API_BASE_URL}/dashboard/provider/stats`,
      RECENT_ACTIVITY: `${API_BASE_URL}/dashboard/provider/activity`,
    },
  },

  // Projects & Services (For the dynamic platform)
  PLATFORM: {
    PROJECTS: {
      LIST: `${API_BASE_URL}/projects`,
      CREATE: `${API_BASE_URL}/projects/create`,
      DETAILS: (id: string) => `${API_BASE_URL}/projects/${id}`,
      UPDATE: (id: string) => `${API_BASE_URL}/projects/${id}/update`,
      DELETE: (id: string) => `${API_BASE_URL}/projects/${id}/delete`,
    },
    SERVICES: {
      LIST: `${API_BASE_URL}/services`,
      CREATE: `${API_BASE_URL}/services/create`,
      DETAILS: (id: string) => `${API_BASE_URL}/services/${id}`,
    },
    MESSAGES: {
      LIST: `${API_BASE_URL}/messages`,
      SEND: `${API_BASE_URL}/messages/send`,
      CONVERSATION: (id: string) => `${API_BASE_URL}/messages/${id}`,
    },
  },
};
