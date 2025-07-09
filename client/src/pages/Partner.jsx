import { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../config/api.config';
import { toast } from 'react-toastify';
import { useAuth } from '../context/AuthContext';
import { useAppContext } from '../context/AppContext';
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

const Partner = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('dashboard');
  const [partnerData, setPartnerData] = useState(null);
  const [showUserForm, setShowUserForm] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [hasCreatedRequest, setHasCreatedRequest] = useState(false);
  const [isProfileLoading, setIsProfileLoading] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [showPlans, setShowPlans] = useState(false);
  // Add new states for My Requests
  const [requests, setRequests] = useState([]);
  const [isRequestsLoading, setIsRequestsLoading] = useState(false);

  const navigate = useNavigate();
  const { handleLogout, user, checkAuthStatus } = useAuth();
  const { backendUrl } = useAppContext();

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'create-user', label: 'Create Request', icon: FileText },
    { id: 'my-requests', label: 'My Requests', icon: Users },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'settings', label: 'Settings', icon: Settings },
    { id: 'support', label: 'Support', icon: HelpCircle },
  ];

  const subscriptionPlans = [
    {
      id: 'single',
      name: 'Single',
      description: 'A great solution for beginners',
      price: '89.00',
      originalPrice: '399.00',
      savePercent: 78,
      renewalPrice: '289.00',
      features: [
        'Basic features',
        'Up to 10 products',
        'Basic analytics',
        'Email support'
      ]
    },
    {
      id: 'premium',
      name: 'Premium',
      description: 'Everything you need to create your website.',
      price: '139.00',
      originalPrice: '599.00',
      savePercent: 77,
      renewalPrice: '449.00',
      features: [
        'All Single features',
        'Up to 100 products',
        'Advanced analytics',
        'Priority support',
        'Custom domain'
      ]
    },
    {
      id: 'business',
      name: 'Business',
      description: 'Level up with more power and enhanced features.',
      price: '229.00',
      originalPrice: '699.00',
      savePercent: 67,
      renewalPrice: '649.00',
      features: [
        'All Premium features',
        'Unlimited products',
        'Advanced reporting',
        '24/7 support',
        'Multiple domains'
      ]
    },
    {
      id: 'cloud-startup',
      name: 'Cloud Startup',
      description: 'Enjoy optimised performance & guaranteed resources.',
      price: '599.00',
      originalPrice: '1,699.00',
      savePercent: 65,
      renewalPrice: '1,599.00',
      features: [
        'All Business features',
        'Dedicated resources',
        'Custom solutions',
        'Enterprise support',
        'SLA guarantee'
      ]
    }
  ];

  const fetchPartnerData = async () => {
    try {
      const response = await axiosInstance.get('/api/user/data');
      if (response.data.success) {
        setPartnerData(response.data.userData);
      }
    } catch (error) {
      console.error('Error fetching partner data:', error);
      if (error.response?.status === 401) {
        navigate('/partnerlogin');
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPartnerData();
  }, []);

  useEffect(() => {
    if (user) {
      setPartnerData(prevData => ({
        ...prevData,
        ...user
      }));
    }
  }, [user]);

  useEffect(() => {
    checkExistingRequest();
  }, []);

  const checkExistingRequest = async () => {
    try {
      const response = await axiosInstance.get('/api/partner/has-request');
      setHasCreatedRequest(response.data.hasRequest);
      if (!response.data.hasRequest) {
        setActiveSection('create-user');
      } else {
        setActiveSection('dashboard');
      }
    } catch (error) {
      console.error('Error checking request status:', error);
    }
  };

  const handleSectionChange = (sectionId) => {
    setActiveSection(sectionId);
  };

  const onLogout = async () => {
    try {
      const response = await axiosInstance.post('/api/auth/logout');
      if (response.data.success) {
        handleLogout();
        setPartnerData(null);
        navigate('/partnerlogin');
      }
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const sendVerificationOtp = async () => {
    try {
      setIsProfileLoading(true);
      const response = await axiosInstance.post('/api/auth/send-verify-otp');
      if (response.data.success) {
        toast.success('Verification code sent to your email');
        navigate('/email-verify');
      } else {
        toast.error(response.data.message || 'Failed to send verification code');
      }
    } catch (error) {
      console.error('Verification error:', error);
      toast.error(error.response?.data?.message || 'Error sending verification code');
    } finally {
      setIsProfileLoading(false);
    }
  };

  const handleSubscribe = (planId) => {
    setSelectedPlan(planId);
    console.log(`Subscribing to ${planId} plan`);
  };

  const handleUserFormSubmit = async () => {
    setShowUserForm(false);
    setSelectedUser(null);
    setHasCreatedRequest(true);
    toast.success('Request created successfully! You can now access other sections.');
    await fetchPartnerData();
  };

  const handleUserFormCancel = () => {
    setShowUserForm(false);
    setSelectedUser(null);
  };

  const fetchDashboardStats = async () => {
    try {
      const response = await axiosInstance.get('/api/partner/dashboard-stats');
      if (response.data.success) {
        // setDashboardStats(response.data.stats); // This state was removed, so this line is removed
      }
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
      toast.error('Failed to load dashboard statistics');
    }
  };

  useEffect(() => {
    if (hasCreatedRequest && activeSection === 'dashboard') {
      fetchDashboardStats();
    }
  }, [hasCreatedRequest, activeSection]);

  useEffect(() => {
    if (activeSection === 'my-requests') {
      fetchRequests();
    }
  }, [activeSection]);

  const fetchRequests = async () => {
    try {
      setIsRequestsLoading(true);
      const response = await axiosInstance.get('/api/partner/my-requests');
      if (response.data.success) {
        setRequests(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching requests:', error);
      if (error.response?.status === 401) {
        toast.error('Please log in again');
        navigate('/partnerlogin');
      } else {
        toast.error('Failed to load requests');
      }
    } finally {
      setIsRequestsLoading(false);
    }
  };

  const handleViewDetails = (request) => {
    setSelectedUser(request);
    setShowUserForm(true);
    setActiveSection('create-user');
  };

  const renderDashboardContent = () => {
    if (showPlans) {
      return (
        <div className="space-y-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Pick your perfect plan</h2>
              <p className="text-gray-600">Choose the best plan for your business needs</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {subscriptionPlans.map((plan) => (
                <div
                  key={plan.id}
                  className={`relative bg-white rounded-lg border-2 transition-all ${
                    selectedPlan === plan.id
                      ? 'border-purple-500 shadow-lg'
                      : 'border-gray-200 hover:border-purple-300'
                  } ${plan.id === 'premium' ? 'relative' : ''}`}
                >
                  {plan.id === 'premium' && (
                    <div className="absolute -top-4 left-0 right-0">
                      <div className="bg-purple-500 text-white text-sm font-medium py-1 px-4 rounded-full mx-auto w-max">
                        MOST POPULAR
                      </div>
                    </div>
                  )}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                    <p className="text-gray-600 text-sm mb-4">{plan.description}</p>

                    <div className="mb-4">
                      <div className="flex items-center gap-2">
                        <span className="inline-block px-3 py-1 bg-purple-100 text-purple-800 text-xs font-semibold rounded-full">
                          SAVE {plan.savePercent}%
                        </span>
                        <span className="text-gray-500 text-sm line-through">₹{plan.originalPrice}</span>
                      </div>
                      <div className="flex items-baseline mt-2">
                        <span className="text-4xl font-bold">₹{plan.price}</span>
                        <span className="text-gray-600 ml-1">/mo</span>
                      </div>
                      <div className="text-purple-600 text-sm mt-1">+3 months free</div>
                    </div>

                    <button
                      onClick={() => handleSubscribe(plan.id)}
                      className={`w-full py-3 rounded-lg text-center transition-colors mb-4 ${
                        selectedPlan === plan.id
                          ? 'bg-purple-100 text-purple-700 border-2 border-purple-500'
                          : 'bg-white text-purple-600 border-2 border-purple-500 hover:bg-purple-50'
                      }`}
                    >
                      Choose plan
                    </button>

                    <div className="text-gray-500 text-sm text-center">
                      Renews at ₹{plan.renewalPrice}/mo for a year. Cancel anytime
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="space-y-6">
        {/* User Profile Card */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Profile Overview</h2>
            {!partnerData?.isAccountVerified && (
              <button
                onClick={sendVerificationOtp}
                disabled={isProfileLoading}
                className="inline-flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-md"
              >
                {isProfileLoading ? (
                  <>Loading...</>
                ) : (
                  <>
                    <Mail className="w-4 h-4 mr-2" />
                    Verify Email
                  </>
                )}
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* User Details */}
            <div className="space-y-4">
              <div className="flex items-start space-x-4">
                <User className="w-5 h-5 text-gray-500 mt-1" />
                <div>
                  <p className="text-sm text-gray-500">Full Name</p>
                  <p className="font-medium text-gray-900">{partnerData?.name || 'Not provided'}</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <Mail className="w-5 h-5 text-gray-500 mt-1" />
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <div className="flex items-center space-x-2">
                    <p className="font-medium text-gray-900">{partnerData?.email}</p>
                    {partnerData?.isAccountVerified ? (
                      <CheckCircle className="w-4 h-4 text-green-500" />
                    ) : (
                      <XCircle className="w-4 h-4 text-red-500" />
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <Crown className="w-5 h-5 text-gray-500 mt-1" />
                <div>
                  <p className="text-sm text-gray-500">Account Status</p>
                  <p className="font-medium text-gray-900">
                    {partnerData?.isAccountVerified ? 'Verified Account' : 'Pending Verification'}
                  </p>
                </div>
              </div>
            </div>

            {/* Account Statistics */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-500">Total Orders</p>
                <p className="text-2xl font-semibold text-gray-900">{/* dashboardStats.totalOrders */}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-500">Revenue</p>
                <p className="text-2xl font-semibold text-gray-900">₹{/* dashboardStats.revenue */}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-500">Active Products</p>
                <p className="text-2xl font-semibold text-gray-900">{/* dashboardStats.activeProducts */}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-500">Account Age</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {partnerData?.createdAt ?
                    `${Math.floor((new Date() - new Date(partnerData.createdAt)) / (1000 * 60 * 60 * 24))} days`
                    : '0 days'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Orders</p>
                <p className="text-2xl font-semibold">0</p>
              </div>
              <BarChart className="w-8 h-8 text-green-500" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Revenue</p>
                <p className="text-2xl font-semibold">₹0</p>
              </div>
              <Wallet className="w-8 h-8 text-green-500" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Active Products</p>
                <p className="text-2xl font-semibold">0</p>
              </div>
              <Star className="w-8 h-8 text-green-500" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Verification Status</p>
                <p className="text-2xl font-semibold text-green-600">
                  {partnerData?.isAccountVerified ? 'Verified' : 'Pending'}
                </p>
              </div>
              {partnerData?.isAccountVerified ? (
                <CheckCircle className="w-8 h-8 text-green-500" />
              ) : (
                <XCircle className="w-8 h-8 text-yellow-500" />
              )}
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
          <p className="text-gray-500 text-sm">No recent activity to display</p>
        </div>
      </div>
    );
  };

  const renderMyRequests = () => {
    if (isRequestsLoading) {
      return (
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500"></div>
        </div>
      );
    }

    return (
      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-900">My Requests</h2>
            <button
              onClick={() => setActiveSection('create-user')}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700"
            >
              <Plus className="w-4 h-4 mr-2" />
              New Request
            </button>
          </div>
        </div>

        {requests.length === 0 ? (
          <div className="text-center py-8">
            <div className="mb-4">
              <FileText className="w-12 h-12 text-gray-400 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900">No requests yet</h3>
            <p className="mt-1 text-sm text-gray-500">Create your first request to get started</p>
            <button
              onClick={() => setActiveSection('create-user')}
              className="mt-4 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700"
            >
              <Plus className="w-4 h-4 mr-2" />
              Create Request
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Service Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Created At
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Last Updated
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {requests.map((request) => (
                  <tr key={request._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="capitalize">{request.serviceType}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        request.status === 'processed' 
                          ? 'bg-green-100 text-green-800'
                          : request.status === 'pending'
                          ? 'bg-yellow-100 text-yellow-800'
                          : request.status === 'rejected'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {request.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(request.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(request.updatedAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => handleViewDetails(request)}
                        className="inline-flex items-center text-green-600 hover:text-green-900 transition-colors duration-200"
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="w-8 h-8 border-4 border-green-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 w-64 bg-white border-r border-gray-200 z-30">
        <div className="flex flex-col h-full">
          {/* Logo/Brand Section */}
          <div className="p-4 border-b border-gray-200">
            <h1 className="text-xl font-bold text-green-600">Partner Dashboard</h1>
          </div>
          <nav className="mt-6">
            {menuItems.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => handleSectionChange(id)}
                className={`w-full flex items-center px-6 py-3 text-sm font-medium transition-colors ${
                  activeSection === id
                    ? 'text-green-600 bg-green-50'
                    : 'text-gray-600 hover:text-green-600 hover:bg-green-50'
                }`}
              >
                <Icon className="h-5 w-5 mr-3" />
                {label}
              </button>
            ))}
            <button
              onClick={onLogout}
              className="w-full flex items-center px-6 py-3 text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
            >
              <LogOut className="h-5 w-5 mr-3" />
              Logout
            </button>

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


            {/* Render active section content */}
            {activeSection === 'dashboard' && renderDashboardContent()}
            {activeSection === 'create-user' && (
              <PartnerUserForm
                user={selectedUser}
                onSubmit={handleUserFormSubmit}
                onCancel={handleUserFormCancel}
              />
            )}
            {activeSection === 'my-requests' && renderMyRequests()}

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

          {/* Add other sections as needed */}
        </div>
      </div>
    </div>
  );
};

export default Partner;