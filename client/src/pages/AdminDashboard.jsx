import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import apiService from '../config/api.config';
import ADMIN_CONFIG from '../config/admin.config';
import { useAuth } from '../context/AuthContext';
import ContactSubmissions from '../components/admin/ContactSubmissions';
import NewsletterSubscribers from '../components/admin/NewsletterSubscribers';
import PartnerRequestManagement from '../components/admin/PartnerRequestManagement';
import BlogManagement from '../components/admin/BlogManagement';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [activeSection, setActiveSection] = useState('dashboard');
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeUsers: 0,
    newsletterSubscribers: 0,
    totalPartners: 2
  });
  
  const partners = [
    {
      email: 'join@techcorp.com',
      company: 'TechCorp Solutions',
      type: 'technology',
      status: 'Startup',
      website: 'https://techcorp.com',
      joined: '2024-01-15'
    },
    {
      email: 'sarah@marketpro.com',
      company: 'MarketPro Agency',
      type: 'marketing',
      status: 'Startup',
      website: 'https://marketpro.com',
      joined: '2024-01-12'
    }
  ];

  useEffect(() => {
    if (!user) {
      navigate('/admin/login');
      return;
    }
  }, [user, navigate]);

  useEffect(() => {
    const fetchDashboardStats = async () => {
      try {
        setLoading(true);
        const response = await apiService.get(ADMIN_CONFIG.endpoints.dashboardStats);

        if (response.success) {
          setStats(prevStats => ({
            ...prevStats,
            ...response.data
          }));
        }
      } catch (error) {
        console.error('Error fetching dashboard stats:', error);
        if (error.message?.includes('ERR_BLOCKED_BY_CLIENT')) {
          toast.error('Request blocked. Please disable your ad blocker for this site.');
        } else {
          toast.error(error.response?.data?.message || 'Failed to fetch dashboard statistics');
        }
      } finally {
        setLoading(false);
      }
    };

    if (activeSection === 'dashboard') {
      fetchDashboardStats();
    }
  }, [activeSection]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await apiService.get(ADMIN_CONFIG.endpoints.users);

        if (response.success) {
          setUsers(response.data || []);
        }
      } catch (error) {
        console.error('Error fetching users:', error);
        if (error.message?.includes('ERR_BLOCKED_BY_CLIENT')) {
          toast.error('Request blocked. Please disable your ad blocker for this site.');
        } else {
          toast.error(error.response?.data?.message || 'Failed to fetch users');
        }
      } finally {
        setLoading(false);
      }
    };

    if (activeSection === 'users') {
      fetchUsers();
    }
  }, [activeSection]);

  const menuItems = {
    main: [
      { id: 'dashboard', label: 'Dashboard' },
      { id: 'users', label: 'Users' },
      { id: 'blog', label: 'Blog' },
      { id: 'contact', label: 'Contact' },
      { id: 'partner', label: 'Partner' },
      { id: 'newsletter', label: 'Newsletter' }
    ]
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/admin/login');
      toast.success('Logged out successfully');
    } catch (error) {
      console.error('Logout error:', error);
      toast.error('Failed to logout');
    }
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return (
          <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">Dashboard Overview</h1>
            
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold text-gray-600 mb-2">Total Users</h3>
                <p className="text-3xl font-bold text-green-600">{stats.totalUsers}</p>
              </div>
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold text-gray-600 mb-2">Active Users</h3>
                <p className="text-3xl font-bold text-blue-600">{stats.activeUsers}</p>
              </div>
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold text-gray-600 mb-2">Newsletter Subscribers</h3>
                <p className="text-3xl font-bold text-purple-600">{stats.newsletterSubscribers}</p>
              </div>
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold text-gray-600 mb-2">Total Partners</h3>
                <p className="text-3xl font-bold text-orange-600">{stats.totalPartners}</p>
              </div>
            </div>
          </div>
        );
      case 'users':
        return (
          <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">User Management</h1>
            <div className="bg-white rounded-lg shadow">
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-4">Users</h2>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                      <tr>
                        <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Email
                        </th>
                        <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {users.map((user, index) => (
                        <tr key={index}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {user.email}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {user.status}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            <button className="text-gray-600 hover:text-gray-900">...</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        );
      case 'blog':
        return <BlogManagement />;
      case 'contact':
        return <ContactSubmissions />;
      case 'partner':
        return (
          <div className="p-6">
            <h1 className="text-2xl font-bold mb-2">Partner Management</h1>
            <p className="text-gray-600 mb-6">Manage business partnerships and collaborations</p>

            {/* Stats Section */}
            <div className="bg-white rounded-lg p-6 mb-8">
              <h2 className="text-xl font-semibold mb-4">Total Partners</h2>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <h3 className="text-gray-600">Active Partners</h3>
                  <p className="text-2xl font-bold">2</p>
                </div>
                <div>
                  <h3 className="text-gray-600">Pending</h3>
                  <p className="text-2xl font-bold">0</p>
                </div>
                <div>
                  <h3 className="text-gray-600">Technology Partners</h3>
                  <p className="text-2xl font-bold">1</p>
                </div>
              </div>
            </div>

            {/* Partners Table */}
            <div className="bg-white rounded-lg shadow">
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-4">Partners</h2>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                      <tr>
                        <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Partner
                        </th>
                        <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Company
                        </th>
                        <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Type
                        </th>
                        <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Website
                        </th>
                        <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Joined
                        </th>
                        <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {partners.map((partner, index) => (
                        <tr key={index}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {partner.email}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {partner.company}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {partner.type}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {partner.status}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            <a href={partner.website} className="text-blue-600 hover:text-blue-900" target="_blank" rel="noopener noreferrer">
                              Visit
                            </a>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {partner.joined}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            <button className="text-gray-600 hover:text-gray-900">...</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        );
      case 'newsletter':
        return <NewsletterSubscribers />;
      default:
        return null;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-[#2C3E50] text-white">
        <div className="p-6">
          <h1 className="text-2xl font-bold">Admin Panel</h1>
        </div>
        <nav className="mt-6">
          {menuItems.main.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`w-full flex items-center px-6 py-3 text-left ${
                activeSection === item.id
                  ? 'bg-[#34495E] text-white'
                  : 'text-gray-300 hover:bg-[#34495E] hover:text-white'
              }`}
            >
              {item.label}
            </button>
          ))}
          <button
            onClick={handleLogout}
            className="w-full flex items-center px-6 py-3 text-left text-gray-300 hover:bg-[#34495E] hover:text-white mt-4"
          >
            Logout
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
          </div>
        ) : (
          renderContent()
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;