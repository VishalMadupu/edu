export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

export const API_URLS = {
  // Authentication Endpoints
  AUTH: {
    STUDENT: {
      LOGIN: `${API_BASE_URL}/auth/student/login`,
      SIGNUP: `${API_BASE_URL}/auth/student/signup`,
      LOGOUT: `${API_BASE_URL}/auth/student/logout`,
      OAUTH: `${API_BASE_URL}/auth/student/oauth`,
      OAUTH_URL: `${API_BASE_URL}/auth/student/oauth-url`,
    },
    TUTOR: {
      LOGIN: `${API_BASE_URL}/auth/tutor/login`,
      SIGNUP: `${API_BASE_URL}/auth/tutor/signup`,
      LOGOUT: `${API_BASE_URL}/auth/tutor/logout`,
      OAUTH: `${API_BASE_URL}/auth/tutor/oauth`,
      OAUTH_URL: `${API_BASE_URL}/auth/tutor/oauth-url`,
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
    STUDENTS: `${API_BASE_URL}/admin/students`,
    TUTORS: `${API_BASE_URL}/admin/tutors`,
    COURSES: `${API_BASE_URL}/admin/courses`,
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
    STUDENT: {
      STATS: `${API_BASE_URL}/dashboard/student/stats`,
      RECENT_ACTIVITY: `${API_BASE_URL}/dashboard/student/activity`,
    },
    TUTOR: {
      STATS: `${API_BASE_URL}/dashboard/tutor/stats`,
      RECENT_ACTIVITY: `${API_BASE_URL}/dashboard/tutor/activity`,
    },
  },

  // Platform Endpoints (Courses & Videos)
  PLATFORM: {
    COURSES: {
      LIST: `${API_BASE_URL}/courses`,
      CREATE: `${API_BASE_URL}/courses/create`,
      DETAILS: (id: string) => `${API_BASE_URL}/courses/${id}`,
      UPDATE: (id: string) => `${API_BASE_URL}/courses/${id}/update`,
      DELETE: (id: string) => `${API_BASE_URL}/courses/${id}/delete`,
      FREE: `${API_BASE_URL}/courses/free`,
      PAID: `${API_BASE_URL}/courses/paid`,
      BY_CATEGORY: (category: string) => `${API_BASE_URL}/courses/category/${category}`,
    },
    VIDEOS: {
      UPLOAD: `${API_BASE_URL}/videos/upload`,
      YOUTUBE: `${API_BASE_URL}/videos/youtube`,
      DETAILS: (id: string) => `${API_BASE_URL}/videos/${id}`,
      DELETE: (id: string) => `${API_BASE_URL}/videos/${id}`,
    },
    ENROLLMENTS: {
      CREATE: `${API_BASE_URL}/enrollments/create`,
      STUDENT: (id: string) => `${API_BASE_URL}/enrollments/student/${id}`,
    },
    PROGRESS: {
      UPDATE: `${API_BASE_URL}/progress/update`,
      STUDENT: (id: string) => `${API_BASE_URL}/progress/${id}`,
    },
    TUTORS: {
      LIST: `${API_BASE_URL}/tutors`,
      DETAILS: (id: string) => `${API_BASE_URL}/tutors/${id}`,
      COURSES: (id: string) => `${API_BASE_URL}/tutors/${id}/courses`,
    },
    MESSAGES: {
      LIST: `${API_BASE_URL}/messages`,
      SEND: `${API_BASE_URL}/messages/send`,
      CONVERSATION: (id: string) => `${API_BASE_URL}/messages/${id}`,
    },
  },
};
