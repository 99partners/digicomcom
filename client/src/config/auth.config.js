const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5050';

const AUTH_CONFIG = {
  endpoints: {
    login: `${API_BASE_URL}/api/system/account/login`,
    register: `${API_BASE_URL}/api/system/account/register`,
    forgotPassword: `${API_BASE_URL}/api/system/account/password/reset-request`,
    resetPassword: `${API_BASE_URL}/api/system/account/password/update`,
    validateToken: `${API_BASE_URL}/api/system/account/status`,
    refreshToken: `${API_BASE_URL}/api/system/account/refresh`,
    logout: `${API_BASE_URL}/api/system/account/logout`
  },
  headers: {
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
    'Accept': 'application/json',
    'X-Custom-Request': 'system-account'
  }
};

export default AUTH_CONFIG; 