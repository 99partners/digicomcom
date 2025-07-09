import { mockData, simulateApiCall } from './mockData';

// Mock API service
const mockApiService = {
  get: async (endpoint) => {
    switch (endpoint) {
      case '/api/user/data':
        return simulateApiCall({ success: true, userData: mockData.auth.user });
      case '/api/admin/dashboard-stats':
        return simulateApiCall({ success: true, stats: mockData.dashboardStats });
      case '/api/admin/contacts':
        return simulateApiCall({ success: true, data: mockData.contacts });
      case '/api/admin/users':
        return simulateApiCall({ success: true, users: mockData.auth.users });
      case '/api/partner/dashboard-stats':
        return simulateApiCall({ success: true, stats: mockData.dashboardStats });
      default:
        return simulateApiCall({ success: true, data: [] });
    }
  },
  post: async (endpoint, data) => {
    switch (endpoint) {
      case '/api/auth/login':
        return simulateApiCall({ 
          success: true, 
          token: 'mock-token',
          user: mockData.auth.user 
        });
      case '/api/auth/register':
        return simulateApiCall({ 
          success: true, 
          token: 'mock-token',
          user: { ...mockData.auth.user, ...data } 
        });
      case '/api/contact/submit':
        return simulateApiCall({ success: true, message: 'Contact form submitted successfully' });
      default:
        return simulateApiCall({ success: true, data: data });
    }
  },
  put: async (endpoint, data) => {
    return simulateApiCall({ success: true, data: data });
  },
  delete: async (endpoint) => {
    return simulateApiCall({ success: true, message: 'Deleted successfully' });
  }
};

export default mockApiService;