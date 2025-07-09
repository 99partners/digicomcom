import { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../config/api.config';
import { toast } from 'react-toastify';
import { useAuth } from '../context/AuthContext';
import { useAppContext } from '../context/AppContext';
import { 
  LogOut, 
  Star, 
  Crown, 
  Check,
  LayoutDashboard,
  Users,
  Settings,
  FileText,
  Bell,
  HelpCircle,
  BarChart,
  Wallet,
  Mail,
  CheckCircle,
  XCircle,
  User
} from 'lucide-react';

import PartnerUserForm from '../components/partner/PartnerUserForm';

const Partner = () => {
  const [partnerData, setPartnerData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [activeSection, setActiveSection] = useState('dashboard');
  const [showPlans, setShowPlans] = useState(false);
  const [isProfileLoading, setIsProfileLoading] = useState(false);
  const [showUserForm, setShowUserForm] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [hasCreatedRequest, setHasCreatedRequest] = useState(false);
  const [dashboardStats, setDashboardStats] = useState({
    totalOrders: 0,
    revenue: 0,
    activeProducts: 0,
    recentActivity: []
  });
  const navigate = useNavigate();
  const { handleLogout, user, checkAuthStatus } = useAuth();
  const { backendUrl } = useAppContext();

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'create-user', label: 'Create Request', icon: FileText },
    { id: 'customers', label: 'My Requests', icon: Users },
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
        setDashboardStats(response.data.stats);
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
        {/* User Profile Overview */}
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
                <p className="text-2xl font-semibold text-gray-900">{dashboardStats.totalOrders}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-500">Revenue</p>
                <p className="text-2xl font-semibold text-gray-900">₹{dashboardStats.revenue}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-500">Active Products</p>
                <p className="text-2xl font-semibold text-gray-900">{dashboardStats.activeProducts}</p>
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

        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Activity</h2>
          {dashboardStats.recentActivity && dashboardStats.recentActivity.length > 0 ? (
            <div className="space-y-4">
              {dashboardStats.recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center justify-between py-3 border-b last:border-0">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                      <Bell className="w-4 h-4 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                      <p className="text-xs text-gray-500">{activity.timestamp}</p>
                    </div>
                  </div>
                  <span className="text-sm text-gray-500">{activity.status}</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-sm">No recent activity to display</p>
          )}
        </div>
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
    <div className="min-h-screen bg-gray-100">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-white shadow-lg fixed h-full">
          <div className="p-6">
            <h1 className="text-2xl font-bold text-gray-900">Partner Panel</h1>
          </div>
          <nav className="mt-6">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => handleSectionChange(item.id)}
                  className={`w-full flex items-center px-6 py-3 text-sm font-medium transition-colors ${
                    activeSection === item.id
                      ? 'text-green-600 bg-green-50'
                      : 'text-gray-600 hover:text-green-600 hover:bg-green-50'
                  }`}
                >
                  <Icon className="h-5 w-5 mr-3" />
                  {item.label}
                </button>
              );
            })}
            <button
              onClick={onLogout}
              className="w-full flex items-center px-6 py-3 text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
            >
              <LogOut className="h-5 w-5 mr-3" />
              Logout
            </button>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 ml-64 p-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-2xl font-bold text-gray-900">
                Welcome back, {user?.name || 'Partner'}
              </h1>
              <div className="flex items-center space-x-4">
                {!user?.isAccountVerified && (
                  <button
                    onClick={sendVerificationOtp}
                    disabled={isProfileLoading}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isProfileLoading ? 'Sending...' : 'Verify Email'}
                  </button>
                )}
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
            {/* Add other section content here */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Partner;