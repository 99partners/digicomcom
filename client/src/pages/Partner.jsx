import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import axiosInstance from '../config/api.config';
import {
  User,
  Mail,
  LogOut,
  Bell,
  Crown,
  Star,
  Wallet,
  BarChart,
  ArrowRight,
  Clock
} from 'lucide-react';
import PartnerUserForm from '../components/partner/PartnerUserForm';
import { toast } from 'react-toastify';

const Partner = () => {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [isProfileLoading, setIsProfileLoading] = useState(false);
  const [hasCreatedRequest, setHasCreatedRequest] = useState(false);
  const navigate = useNavigate();
  const { partnerData, dashboardStats } = useAppContext();

  useEffect(() => {
    const checkPartnerRequest = async () => {
      try {
        const response = await axiosInstance.get('/api/user/partner/has-request');
        setHasCreatedRequest(response.data.hasRequest);
      } catch (error) {
        console.error('Error checking partner request:', error);
        // If there's an error, we'll assume they haven't created a request
        setHasCreatedRequest(false);
      }
    };

    checkPartnerRequest();
  }, []);

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart },
    { id: 'create-user', label: 'Create Request', icon: User }
  ];

  const handleSectionChange = (sectionId) => {
    setActiveSection(sectionId);
  };

  const onLogout = () => {
    // Handle logout logic
    navigate('/partnerlogin');
  };

  const sendVerificationOtp = async () => {
    setIsProfileLoading(true);
    try {
      // Add your verification logic here
      toast.success('Verification email sent successfully');
    } catch (error) {
      toast.error('Failed to send verification email');
    } finally {
      setIsProfileLoading(false);
    }
  };

  const handleUserFormSubmit = async (formData) => {
    // Handle form submission
    setHasCreatedRequest(true);
    setActiveSection('dashboard');
  };

  const handleUserFormCancel = () => {
    setActiveSection('dashboard');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 w-64 bg-white border-r border-gray-200 z-30">
        <div className="flex flex-col h-full">
          {/* Logo/Brand Section */}
          <div className="p-4 border-b border-gray-200">
            <h1 className="text-xl font-bold text-green-600">Partner Dashboard</h1>
          </div>

          {/* Menu Items */}
          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            {menuItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => handleSectionChange(item.id)}
                  disabled={!hasCreatedRequest && item.id !== 'create-user'}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                    activeSection === item.id
                      ? 'bg-green-50 text-green-600'
                      : 'text-gray-600 hover:bg-gray-50'
                  } ${
                    !hasCreatedRequest && item.id !== 'create-user'
                      ? 'opacity-50 cursor-not-allowed'
                      : ''
                  }`}
                >
                  <IconComponent className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* User Profile Section */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                <User className="w-6 h-6 text-green-600" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {partnerData?.name || 'Partner'}
                </p>
                <p className="text-xs text-gray-500 truncate">{partnerData?.email}</p>
              </div>
            </div>
            <button
              onClick={onLogout}
              className="mt-4 w-full flex items-center justify-center space-x-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="ml-64 p-8">
        {/* Content Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">
            {menuItems.find(item => item.id === activeSection)?.label || 'Dashboard'}
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Welcome back, {partnerData?.name || 'Partner'}
          </p>
        </div>

        {/* Main Content Area */}
        <div className="space-y-6">
          {activeSection === 'dashboard' && (
            <>
              {/* Stats Overview */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Total Orders</p>
                      <p className="mt-2 text-3xl font-bold text-gray-900">{dashboardStats.totalOrders}</p>
                    </div>
                    <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center">
                      <BarChart className="w-6 h-6 text-green-600" />
                    </div>
                  </div>
                  <div className="mt-4 flex items-center text-sm text-gray-500">
                    <ArrowRight className="w-4 h-4 mr-1" />
                    <span>View details</span>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Revenue</p>
                      <p className="mt-2 text-3xl font-bold text-gray-900">₹{dashboardStats.revenue}</p>
                    </div>
                    <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center">
                      <Wallet className="w-6 h-6 text-blue-600" />
                    </div>
                  </div>
                  <div className="mt-4 flex items-center text-sm text-gray-500">
                    <ArrowRight className="w-4 h-4 mr-1" />
                    <span>View details</span>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Active Products</p>
                      <p className="mt-2 text-3xl font-bold text-gray-900">{dashboardStats.activeProducts}</p>
                    </div>
                    <div className="w-12 h-12 bg-purple-50 rounded-full flex items-center justify-center">
                      <Star className="w-6 h-6 text-purple-600" />
                    </div>
                  </div>
                  <div className="mt-4 flex items-center text-sm text-gray-500">
                    <ArrowRight className="w-4 h-4 mr-1" />
                    <span>View details</span>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Account Age</p>
                      <p className="mt-2 text-3xl font-bold text-gray-900">
                        {partnerData?.createdAt ? 
                          `${Math.floor((new Date() - new Date(partnerData.createdAt)) / (1000 * 60 * 60 * 24))}d` 
                          : '0d'}
                      </p>
                    </div>
                    <div className="w-12 h-12 bg-yellow-50 rounded-full flex items-center justify-center">
                      <Clock className="w-6 h-6 text-yellow-600" />
                    </div>
                  </div>
                  <div className="mt-4 flex items-center text-sm text-gray-500">
                    <ArrowRight className="w-4 h-4 mr-1" />
                    <span>View details</span>
                  </div>
                </div>
              </div>

              {/* Profile Overview */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-semibold text-gray-900">Profile Overview</h2>
                    {!partnerData?.isAccountVerified && (
                      <button
                        onClick={sendVerificationOtp}
                        disabled={isProfileLoading}
                        className="inline-flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-lg transition-colors"
                      >
                        {isProfileLoading ? (
                          <span className="flex items-center">
                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Verifying...
                          </span>
                        ) : (
                          <>
                            <Mail className="w-4 h-4 mr-2" />
                            Verify Email
                          </>
                        )}
                      </button>
                    )}
                  </div>

                  <div className="space-y-6">
                    <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                      <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                        <User className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Full Name</p>
                        <p className="font-medium text-gray-900">{partnerData?.name || 'Not provided'}</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                        <Mail className="w-5 h-5 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-500">Email</p>
                        <div className="flex items-center justify-between">
                          <p className="font-medium text-gray-900">{partnerData?.email}</p>
                          {partnerData?.isAccountVerified ? (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              Verified
                            </span>
                          ) : (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                              Unverified
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                      <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                        <Crown className="w-5 h-5 text-purple-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Account Status</p>
                        <p className="font-medium text-gray-900">
                          {partnerData?.isAccountVerified ? 'Verified Account' : 'Pending Verification'}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-6">Recent Activity</h2>
                  {dashboardStats.recentActivity && dashboardStats.recentActivity.length > 0 ? (
                    <div className="space-y-4">
                      {dashboardStats.recentActivity.map((activity, index) => (
                        <div key={index} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                          <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                            <Bell className="w-5 h-5 text-green-600" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                {activity.status}
                              </span>
                            </div>
                            <p className="text-xs text-gray-500 mt-1">{activity.timestamp}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <Bell className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-500 text-sm">No recent activity to display</p>
                    </div>
                  )}
                </div>
              </div>
            </>
          )}

          {activeSection === 'create-user' && (
            <div className="bg-white rounded-xl shadow-sm">
              <PartnerUserForm onSubmit={handleUserFormSubmit} onCancel={handleUserFormCancel} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Partner;