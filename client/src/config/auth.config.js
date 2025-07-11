const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5050';

const AUTH_CONFIG = {
  endpoints: {
    adminLogin: `${API_BASE_URL}/api/admin/session/validate`,
    login: `${API_BASE_URL}/api/auth/login`,
    register: `${API_BASE_URL}/api/auth/register`,
    forgotPassword: `${API_BASE_URL}/api/auth/password/reset-request`,
    resetPassword: `${API_BASE_URL}/api/auth/password/update`,
    validateToken: `${API_BASE_URL}/api/auth/status`,
    refreshToken: `${API_BASE_URL}/api/auth/refresh`,
    logout: `${API_BASE_URL}/api/auth/logout`
  },
  headers: {
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
    'Accept': 'application/json',
    'X-Custom-Request': 'system-account'
  },
  adminTokenKey: 'admin_token'
};

export default AUTH_CONFIG; 