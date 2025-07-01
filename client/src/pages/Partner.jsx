import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
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
  Wallet
} from 'lucide-react';

const Partner = () => {
  const [partnerData, setPartnerData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [activeSection, setActiveSection] = useState('dashboard');
  const [showPlans, setShowPlans] = useState(false);
  const navigate = useNavigate();
  const { handleLogout, user } = useAuth();

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'customers', label: 'Customers', icon: Users },
    { id: 'transactions', label: 'Transactions', icon: CreditCard },
    { id: 'reports', label: 'Reports', icon: FileText },
    { id: 'analytics', label: 'Analytics', icon: BarChart },
    { id: 'wallet', label: 'Wallet', icon: Wallet },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'settings', label: 'Settings', icon: Settings },
    { id: 'support', label: 'Support', icon: HelpCircle },
  ];

  const subscriptionPlans = [
    {
      id: 'basic',
      name: 'Single',
      price: '₹999',
      originalPrice: '₹4,499',
      savePercent: '78',
      icon: Star,
      color: 'text-green-500',
      description: 'A great solution for beginners',
      features: [
        '1 website',
        'Managed hosting for WordPress',
        'Free 7-day Horizons trial',
        '10 GB SSD storage',
        'Basic API access',
        'Standard support'
      ]
    },
    {
      id: 'pro',
      name: 'Premium',
      price: '₹2,499',
      originalPrice: '₹10,999',
      savePercent: '77',
      icon: Star,
      color: 'text-green-500',
      description: 'Everything you need to create your website',
      features: [
        '25 websites',
        'Managed hosting for WordPress',
        'Free 7-day Horizons trial',
        '25 GB SSD storage',
        'Advanced API access',
        'Priority support'
      ]
    },
    {
      id: 'enterprise',
      name: 'Business',
      price: '₹4,999',
      originalPrice: '₹14,999',
      savePercent: '67',
      icon: Crown,
      color: 'text-green-500',
      description: 'Level up with more power and enhanced features',
      features: [
        '50 websites',
        'Managed hosting for WordPress',
        'Free 7-day Horizons trial',
        '50 GB NVMe storage',
        'Full API access',
        'Dedicated support team'
      ]
    }
  ];

  useEffect(() => {
    const fetchPartnerData = async () => {
      try {
        const response = await axios.get('http://localhost:5050/api/user/profile', {
          withCredentials: true
        });
        
        if (response.data.success) {
          setPartnerData(response.data.user);
        }
      } catch (error) {
        console.error('Error fetching partner data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPartnerData();
  }, []);

  const onLogout = () => {
    handleLogout();
    navigate('/partnerlogin');
  };

  const handleSubscribe = (planId) => {
    setSelectedPlan(planId);
    // Here you would typically integrate with a payment gateway
    console.log(`Subscribing to ${planId} plan`);
  };

  const renderDashboardContent = () => {
    if (showPlans) {
      return (
        <div className="space-y-8">
          {/* Plans Section */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Pick your perfect plan</h2>
              <p className="text-gray-600">Choose the best plan for your business needs</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {subscriptionPlans.map((plan) => (
                <div
                  key={plan.id}
                  className={`relative bg-white rounded-lg border-2 transition-all cursor-pointer ${
                    selectedPlan === plan.id
                      ? 'border-green-500 shadow-lg'
                      : 'border-gray-200 hover:border-green-300'
                  }`}
                  onClick={() => handleSubscribe(plan.id)}
                >
                  {selectedPlan === plan.id && (
                    <div className="absolute -top-3 -right-3">
                      <div className="bg-green-500 text-white p-1 rounded-full">
                        <Check className="h-4 w-4" />
                      </div>
                    </div>
                  )}
                  <div className="p-6">
                    <h4 className="text-xl font-bold text-gray-900 mb-2">{plan.name}</h4>
                    <p className="text-gray-600 text-sm mb-4">{plan.description}</p>
                    <div className="flex items-baseline mb-4">
                      <span className="text-3xl font-bold text-gray-900">₹{plan.price}</span>
                      <span className="text-gray-500 ml-2">/mo</span>
                    </div>
                    <div className="flex items-center space-x-2 mb-4">
                      <span className="inline-block px-2 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded">
                        SAVE {plan.savePercent}%
                      </span>
                      <span className="text-gray-500 text-sm line-through">{plan.originalPrice}/mo</span>
                    </div>
                    <button
                      className={`w-full py-2 px-4 rounded-md text-sm font-medium mb-4 ${
                        selectedPlan === plan.id
                          ? 'bg-green-100 text-green-700'
                          : 'bg-green-500 text-white hover:bg-green-600'
                      }`}
                    >
                      {selectedPlan === plan.id ? 'Current Plan' : 'Choose Plan'}
                    </button>
                    <div className="space-y-2">
                      {plan.features.map((feature, index) => (
                        <div key={index} className="flex items-center text-sm text-gray-600">
                          <Check className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                          <span>{feature}</span>
                        </div>
                      ))}
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
          <div className="space-y-8">
            {/* Stats Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Total Revenue</h3>
                <p className="text-3xl font-bold text-green-600">₹45,250</p>
                <p className="text-sm text-gray-500 mt-2">+12.5% from last month</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Total Customers</h3>
                <p className="text-3xl font-bold text-blue-600">156</p>
                <p className="text-sm text-gray-500 mt-2">+8 new this month</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Success Rate</h3>
                <p className="text-3xl font-bold text-purple-600">98.5%</p>
                <p className="text-sm text-gray-500 mt-2">+2.3% from last month</p>
              </div>
            </div>

            {/* Activity Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Transactions</h3>
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-center justify-between border-b pb-2">
                      <div>
                        <p className="font-medium">Transaction #{i}</p>
                        <p className="text-sm text-gray-500">2 hours ago</p>
                      </div>
                      <p className="text-green-600 font-medium">+₹1,200</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Activities</h3>
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-center space-x-3 border-b pb-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <div>
                        <p className="font-medium">New customer signed up</p>
                        <p className="text-sm text-gray-500">3 hours ago</p>
                      </div>
                    </div>
                  ))}
                </div>
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

      case 'settings':
        return (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold mb-6">Account Settings</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-4">Profile Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      value={user?.name || ''}
                      readOnly
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                      type="email"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      value={user?.email || ''}
                      readOnly
                    />
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-4">Security</h3>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                  Change Password
                </button>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-4">Notifications</h3>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input type="checkbox" className="form-checkbox h-4 w-4 text-blue-600" />
                    <span className="ml-2">Email notifications</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="form-checkbox h-4 w-4 text-blue-600" />
                    <span className="ml-2">SMS notifications</span>
                  </label>
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
    <div className="min-h-screen bg-gray-50 flex">
      {/* Left Sidebar - Navigation */}
      <div className="w-64 bg-white shadow-lg">
        <div className="p-4 border-b">
          <h2 className="text-xl font-bold text-gray-800">Partner Portal</h2>
        </div>
        <nav className="p-4">
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => {
                    setActiveSection(item.id);
                    setShowPlans(false);
                  }}
                  className={`w-full flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                    activeSection === item.id && !showPlans
                      ? 'bg-green-50 text-green-700'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <div className="mb-8">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {showPlans ? 'Subscription Plans' : menuItems.find(item => item.id === activeSection)?.label || 'Dashboard'}
              </h1>
              <p className="text-gray-600">Welcome back, {user?.name}!</p>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => {
                  setShowPlans(!showPlans);
                  if (!showPlans) {
                    setActiveSection(null);
                  }
                }}
                className={`inline-flex items-center px-4 py-2 border rounded-md shadow-sm text-sm font-medium transition-colors ${
                  showPlans
                    ? 'border-green-500 bg-green-50 text-green-700'
                    : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Crown className={`h-4 w-4 mr-2 ${showPlans ? 'text-green-500' : 'text-gray-400'}`} />
                {selectedPlan ? subscriptionPlans.find(p => p.id === selectedPlan)?.name : 'Plans'}
              </button>
              <button
                onClick={onLogout}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </button>
            </div>
          </div>
        </div>

        {renderDashboardContent()}
      </div>
    </div>
  );
};

export default Partner; 