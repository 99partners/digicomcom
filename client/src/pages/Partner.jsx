import { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useAppContext } from '../context/AppContext';
import { toast } from 'react-toastify';
import { 
  LogOut, 
  Star, 
  Crown, 
  Check,
  LayoutDashboard,
  Users,
  Settings,
  FileText,
  CreditCard,
  Bell,
  HelpCircle,
  BarChart,
  Wallet,
  Mail,
  CheckCircle,
  XCircle
} from 'lucide-react';
import { getApiUrl } from '../config/api.config';
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
  const { handleLogout, user } = useAuth();
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
      const response = await axios.get(`${backendUrl}/api/user/data`, { withCredentials: true });
      if (response.data.success) {
        setPartnerData(response.data.userData);
      }
    } catch (error) {
      console.error('Error fetching partner data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPartnerData();
  }, [backendUrl]);

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
      const response = await axios.get(getApiUrl('api/partner/has-request'), { withCredentials: true });
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
      const response = await axios.post(getApiUrl('api/auth/logout'));
      if (response.data.success) {
        handleLogout();
        setPartnerData(null);
        navigate('/partnerlogin');
      }
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const sendVerificationOpt = async () => {
    try {
      setIsProfileLoading(true);
      const response = await axios.post(`${backendUrl}/api/auth/send-verify-otp`, {}, { withCredentials: true });
      if (response.data.success) {
        toast.success('Verification OTP sent to your email');
        navigate('/email-verify');
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error sending verification OTP');
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
      const response = await axios.get(getApiUrl('api/partner/dashboard-stats'), { withCredentials: true });
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

    switch (activeSection) {
      case 'dashboard':
        return (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold mb-6">Partner Dashboard</h2>
            
            {/* Account Status Section */}
            <div className="mb-8">
              <h3 className="text-lg font-medium mb-4">Account Status</h3>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center">
                    <Mail className="h-5 w-5 text-gray-400 mr-2" />
                    <span className="text-sm text-gray-600">{user?.email}</span>
                  </div>
                  <div className="flex items-center">
                    {partnerData?.isAccountVerified ? (
                      <>
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                        <span className="text-sm text-green-600">Email Verified</span>
                      </>
                    ) : (
                      <>
                        <XCircle className="h-5 w-5 text-red-500 mr-2" />
                        <span className="text-sm text-red-600">Email Not Verified</span>
                        <button
                          onClick={!isProfileLoading ? sendVerificationOpt : undefined}
                          className="ml-4 px-4 py-1 text-sm bg-red-100 text-red-700 hover:bg-red-200 rounded-full transition-colors disabled:opacity-50"
                          disabled={isProfileLoading}
                        >
                          {isProfileLoading ? 'Sending...' : 'Verify Now'}
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-lg font-medium text-gray-700">Total Orders</h4>
                  <BarChart className="h-6 w-6 text-purple-500" />
                </div>
                <p className="text-3xl font-bold text-gray-900">{dashboardStats.totalOrders}</p>
                <p className="text-sm text-gray-500 mt-2">Total orders processed</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-lg font-medium text-gray-700">Revenue</h4>
                  <Wallet className="h-6 w-6 text-green-500" />
                </div>
                <p className="text-3xl font-bold text-gray-900">₹{dashboardStats.revenue.toLocaleString()}</p>
                <p className="text-sm text-gray-500 mt-2">Total revenue earned</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-lg font-medium text-gray-700">Active Products</h4>
                  <Star className="h-6 w-6 text-yellow-500" />
                </div>
                <p className="text-3xl font-bold text-gray-900">{dashboardStats.activeProducts}</p>
                <p className="text-sm text-gray-500 mt-2">Products in catalog</p>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
              <div className="p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Activity</h3>
                {dashboardStats.recentActivity && dashboardStats.recentActivity.length > 0 ? (
                  <div className="space-y-4">
                    {dashboardStats.recentActivity.map((activity, index) => (
                      <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                        <div className="flex-shrink-0">
                          <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
                            <activity.icon className="h-4 w-4 text-purple-600" />
                          </div>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                          <p className="text-sm text-gray-500">{activity.description}</p>
                          <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-sm">No recent activity to display</p>
                )}
              </div>
            </div>
          </div>
        );

      case 'customers':
        return (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold mb-4">Customer Management</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <tr key={i}>
                      <td className="px-6 py-4 whitespace-nowrap">Customer {i}</td>
                      <td className="px-6 py-4 whitespace-nowrap">customer{i}@example.com</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                          Active
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button className="text-blue-600 hover:text-blue-800">View</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );

      case 'create-user':
        return (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <PartnerUserForm
              user={selectedUser}
              onSubmit={handleUserFormSubmit}
              onCancel={handleUserFormCancel}
            />
          </div>
        );

      case 'settings':
        const currentPlan = subscriptionPlans.find(p => p.id === selectedPlan);
        return (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold mb-6">Account Settings</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-4">Profile Information</h3>
                <div className="grid grid-cols-1 gap-4 max-w-md">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
                      value={user?.name || ''}
                      readOnly
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                      type="email"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
                      value={user?.email || ''}
                      readOnly
                    />
                  </div>
                  <div className="pt-2">
                    <label className="block text-sm font-medium text-gray-700 mb-3">Current Plan</label>
                    {currentPlan ? (
                      <div className="border border-green-200 rounded-lg p-4 bg-green-50">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center">
                            <Crown className="h-5 w-5 text-green-500 mr-2" />
                            <span className="font-medium text-gray-900">{currentPlan.name}</span>
                          </div>
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            Active
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">
                            ₹{currentPlan.price}/month
                          </span>
                          <span className="text-green-600 font-medium">
                            Save {currentPlan.savePercent}%
                          </span>
                        </div>
                      </div>
                    ) : (
                      <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                        <div className="flex items-center text-gray-500">
                          <Crown className="h-5 w-5 mr-2" />
                          <span>No active plan</span>
                        </div>
                        <button
                          onClick={() => {
                            setShowPlans(true);
                            setActiveSection(null);
                          }}
                          className="mt-2 text-sm text-green-600 hover:text-green-700 font-medium"
                        >
                          Choose a plan →
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold">Coming Soon</h2>
            <p className="text-gray-600 mt-2">This section is under development.</p>
          </div>
        );
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-8 h-8 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex">
        {/* Sidebar - Fixed */}
        <div className="w-64 bg-white shadow-lg min-h-screen fixed left-0 top-0">
          <div className="p-6">
            <h1 className="text-2xl font-bold text-gray-800">Partner Panel</h1>
          </div>
          <nav className="mt-6">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleSectionChange(item.id)}
                className={`w-full flex items-center px-6 py-3 text-left ${
                  activeSection === item.id
                    ? 'bg-purple-50 text-purple-600'
                    : 'text-gray-500 hover:bg-gray-50'
                }`}
              >
                <item.icon className="w-5 h-5 mr-3" />
                <span>{item.label}</span>
              </button>
            ))}
            <button
              onClick={onLogout}
              className="w-full flex items-center px-6 py-3 text-left text-red-500 hover:bg-red-50"
            >
              <LogOut className="w-5 h-5 mr-3" />
              Logout
            </button>
          </nav>
        </div>

        {/* Main Content - Adjusted margin for fixed sidebar */}
        <div className="flex-1 ml-64">
          <div className="p-8">
            <div className="max-w-7xl mx-auto">
              {/* Header */}
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">
                    Welcome back, {user?.name}
                  </h1>
                </div>

                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => setShowPlans(!showPlans)}
                    className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
                      showPlans
                        ? 'bg-black text-white'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <Crown className={`h-4 w-4 mr-1.5 ${showPlans ? 'text-white' : 'text-gray-400'}`} />
                    {selectedPlan ? subscriptionPlans.find(p => p.id === selectedPlan)?.name : 'Plans'}
                  </button>
                  {/* Profile Button */}
                  <div className="relative group">
                    <div className="flex items-center justify-center rounded-full bg-black text-white w-8 h-8 cursor-pointer">
                      {user?.name?.[0]?.toUpperCase() || 'U'}
                    </div>
                    <div className="absolute hidden group-hover:block top-0 right-0 z-10 text-black pt-10 rounded">
                      <ul className="list-none m-0 p-2 bg-gray-100 text-sm">
                        {!partnerData?.isAccountVerified && (
                          <li
                            onClick={!isProfileLoading ? sendVerificationOpt : undefined}
                            className={`py-1 px-2 hover:bg-gray-200 cursor-pointer ${isProfileLoading ? 'opacity-50' : ''}`}
                          >
                            {isProfileLoading ? 'Sending OTP...' : 'Verify email'}
                          </li>
                        )}
                        <li
                          onClick={onLogout}
                          className="py-1 px-2 hover:bg-gray-200 cursor-pointer pr-10"
                        >
                          Logout
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                {renderDashboardContent()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Partner;