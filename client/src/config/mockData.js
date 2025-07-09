// Mock data for frontend development
export const mockData = {
  // User authentication
  auth: {
    user: {
      id: "1",
      name: "Demo User",
      email: "demo@example.com",
      role: "user"
    },
    admin: {
      id: "admin1",
      name: "Admin User",
      email: "admin@example.com",
      role: "admin"
    }
  },

  // Dashboard stats
  dashboardStats: {
    totalUsers: 150,
    totalOrders: 1250,
    revenue: 75000,
    activeProducts: 45,
    recentActivity: [
      { id: 1, type: "order", description: "New order received", date: new Date() },
      { id: 2, type: "user", description: "New user registered", date: new Date() }
    ]
  },

  // Contact submissions
  contacts: [
    {
      id: "1",
      name: "John Doe",
      email: "john@example.com",
      phone: "1234567890",
      message: "Sample contact message",
      createdAt: new Date()
    }
  ],

  // Blog posts
  blogs: [
    {
      id: "1",
      title: "Sample Blog Post",
      content: "This is a sample blog post content",
      author: "Demo Author",
      createdAt: new Date()
    }
  ],

  // Partner requests
  partnerRequests: [
    {
      id: "1",
      businessName: "Sample Business",
      contactPerson: "Jane Smith",
      email: "jane@example.com",
      status: "pending",
      createdAt: new Date()
    }
  ]
};

// Helper function to simulate API delay
export const simulateApiCall = async (data, delay = 500) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true, data });
    }, delay);
  });
}; 