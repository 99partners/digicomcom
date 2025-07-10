const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5050';

const AUTH_CONFIG = {
  endpoints: {
    login: `${API_BASE_URL}/api/v1/p/verify/session`,
    register: `${API_BASE_URL}/api/v1/p/verify/user/create`,
    forgotPassword: `${API_BASE_URL}/api/v1/p/verify/user/reset-credentials`,
    resetPassword: `${API_BASE_URL}/api/v1/p/verify/user/update-credentials`,
    validateToken: `${API_BASE_URL}/api/v1/p/verify/user/validate`,
    refreshToken: `${API_BASE_URL}/api/v1/p/verify/session/refresh`,
    logout: `${API_BASE_URL}/api/v1/p/verify/session/end`
  },
  headers: {
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
    'Accept': 'application/json',
    'X-Custom-Header': 'verification-request'
  }
};

export default AUTH_CONFIG; 