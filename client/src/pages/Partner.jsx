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
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900">Partner Dashboard</h2>
          
          {/* Account Status Section */}
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Status</h3>
            <div className="flex items-center space-x-4 bg-gray-50 p-4 rounded-lg">
              <div className="flex-1">
                {user?.isAccountVerified ? (
                  <div className="flex items-center text-green-600">
                    <CheckCircle className="h-5 w-5 mr-2" />
                    <span>Email Verified</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-red-600">
                      <XCircle className="h-5 w-5 mr-2" />
                      <span>Email Not Verified</span>
                    </div>
                    <button
                      onClick={sendVerificationOtp}
                      disabled={isProfileLoading}
                      className="ml-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isProfileLoading ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                          Sending...
                        </>
                      ) : (
                        'Verify Now'
                      )}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Profile Section */}
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Profile</h3>
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                {user?.profileImage ? (
                  <img
                    src={user.profileImage}
                    alt="Profile"
                    className="h-16 w-16 rounded-full object-cover border-2 border-green-500"
                  />
                ) : (
                  <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center">
                    <User className="h-8 w-8 text-green-600" />
                  </div>
                )}
              </div>
              <div className="flex-1">
                <h4 className="text-lg font-medium text-gray-900">{user?.name || 'Partner'}</h4>
                <p className="text-sm text-gray-500">{user?.email}</p>
                {user?.phone && (
                  <p className="text-sm text-gray-500">{user.phone}</p>
                )}
              </div>
            </div>
          </div>

          {/* Stats Section */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-medium text-gray-500">Total Orders</h4>
                <BarChart className="h-5 w-5 text-gray-400" />
              </div>
              <p className="mt-2 text-2xl font-semibold text-gray-900">{dashboardStats.totalOrders}</p>
              <p className="text-sm text-gray-500">Total orders processed</p>
            </div>

            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-medium text-gray-500">Revenue</h4>
                <Wallet className="h-5 w-5 text-gray-400" />
              </div>
              <p className="mt-2 text-2xl font-semibold text-gray-900">₹{dashboardStats.revenue}</p>
              <p className="text-sm text-gray-500">Total revenue earned</p>
            </div>

            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-medium text-gray-500">Active Products</h4>
                <Star className="h-5 w-5 text-gray-400" />
              </div>
              <p className="mt-2 text-2xl font-semibold text-gray-900">{dashboardStats.activeProducts}</p>
              <p className="text-sm text-gray-500">Products in catalog</p>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
            {dashboardStats.recentActivity.length > 0 ? (
              <div className="space-y-4">
                {dashboardStats.recentActivity.map((activity, index) => (
                  <div key={index} className="bg-white p-4 rounded-lg border border-gray-200">
                    <p className="text-sm text-gray-900">{activity.description}</p>
                    <p className="text-xs text-gray-500 mt-1">{activity.date}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500">No recent activity to display</p>
            )}
          </div>
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