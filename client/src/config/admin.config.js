const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5050';

const ADMIN_CONFIG = {
  endpoints: {
    dashboardStats: `${API_BASE_URL}/api/admin/dashboard-stats`,
    users: `${API_BASE_URL}/api/admin/users`,
    partners: `${API_BASE_URL}/api/admin/partners`,
    newsletter: `${API_BASE_URL}/api/admin/newsletter`,
    contact: `${API_BASE_URL}/api/admin/contact`,
    blog: `${API_BASE_URL}/api/admin/blog`
  }
};

export default ADMIN_CONFIG; 