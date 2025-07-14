import { useState, useEffect, useRef } from 'react';
import { 
  ExternalLink, 
  Bell, 
  Home, 
  Briefcase, 
  FileText, 
  User, 
  BookOpen, 
  Bookmark, 
  HelpCircle, 
  Library, 
  Laptop, 
  Users,
  Globe,
  Edit,
  ChevronDown,
  LogOut,
  Settings,
  Mail,
  Phone,
  Crown
} from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import logo from '../../assets/99digicom.png';
import { useAuth } from '../../context/AuthContext';

const DashboardLayout = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const [showPlanDropdown, setShowPlanDropdown] = useState(false);
  const planDropdownRef = useRef(null);


  // Add debugging log
  useEffect(() => {
    console.log('Current user data:', user);
  }, [user]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowProfileDropdown(false);
      }
      if (planDropdownRef.current && !planDropdownRef.current.contains(event.target)) {
        setShowPlanDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const getInitials = (name) => {
    return name
      ? name
          .split(' ')
          .map(word => word[0])
          .join('')
          .toUpperCase()
      : 'U';
  };

  const formatDate = (dateString) => {
    return dateString ? new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }) : '';
  };

  const menuItems = [
    { icon: Edit, label: 'Create Application', href: '/dashboard/create-application' },
    { icon: FileText, label: 'Your Applications', href: '/dashboard/applications' },
    { icon: Briefcase, label: 'Partnership Opportunities', href: '/dashboard/opportunities' },
    { icon: User, label: 'Profile', href: '/dashboard/profile' },
    { icon: Bell, label: 'Notifications', href: '/dashboard/notifications' },
    { icon: Bookmark, label: 'Subscriptions', href: '/dashboard/subscriptions' },
    { icon: HelpCircle, label: 'FAQ', href: '/dashboard/faq' },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Top Navbar */}
      <div className="h-14 bg-green-100 shadow-sm flex items-center justify-between px-4 fixed top-0 right-0 left-0 z-10">
        <div className="flex items-center gap-3">
          <img src={logo} alt="DigiCom Logo" className="h-14 object-contain" />

          <img src={logo} alt="DigiCom Logo" className="h-14 object-contain" />

          <span className="text-green-500 font-semibold text-2xl mb-1 ">Partners</span>
        </div>

        {/* Right Side: Plan and Profile */}
        <div className="flex items-center space-x-4">
          {/* Plan Button with Dropdown */}
          {user && (
            <div className="relative" ref={planDropdownRef}>
              <button
                onClick={() => setShowPlanDropdown(!showPlanDropdown)}
                className="flex items-center space-x-2 px-4 py-2 bg-green-50 hover:bg-green-100 transition-colors duration-200 rounded-lg"
              >
                <Crown size={16} className="text-green-600" />
                <span className="text-sm font-medium text-green-700">{user?.plan || 'Premium'}</span>
                <ChevronDown 
                  size={16} 
                  className={`text-green-600 transition-transform duration-200 ${showPlanDropdown ? 'transform rotate-180' : ''}`} 
                />
              </button>

              {/* Plan Dropdown */}
              {showPlanDropdown && (
                <div className="absolute top-full right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-100 py-2 z-50">
                  <div className="px-4 py-2 border-b border-gray-100">
                    <h3 className="text-sm font-semibold text-gray-900">Current Plan</h3>
                  </div>
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-900">{user?.plan || 'Premium'}</span>
                      <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">Active</span>
                    </div>
                    <p className="text-xs text-gray-500 mb-4">Access to all premium features and priority support</p>
                    <button 
                      onClick={() => navigate('/dashboard/billing')}
                      className="w-full text-sm bg-green-50 hover:bg-green-100 text-green-700 py-2 px-4 rounded-md transition-colors duration-200"
                    >
                      Manage Subscription
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Profile Section */}
          <div className="relative" ref={dropdownRef}>
            {user && (
              <>
                <button 
                  onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                  className="w-9 h-9 rounded-full bg-green-200 flex items-center justify-center hover:bg-green-300 transition-colors duration-200"
                >
                  <span className="text-sm font-medium text-green-800">{getInitials(user.name)}</span>
                </button>

                {/* Profile Dropdown */}
                {showProfileDropdown && (
                  <div className="absolute right-0 top-full mt-2 w-72 bg-white rounded-lg shadow-lg border border-gray-100 py-2 z-50">
                    {/* Profile Header */}
                    <div className="px-4 py-3 border-b border-gray-100">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-green-200 rounded-full flex items-center justify-center">
                          <span className="text-lg text-green-800">{getInitials(user.name)}</span>
                        </div>
                        <div className="flex flex-col">
                          <span className="font-medium text-gray-900">{user.name}</span>
                        </div>
                      </div>
                    </div>

                    {/* Contact Info */}
                    <div className="px-4 py-2 border-b border-gray-100">
                      <div className="flex items-center space-x-3 py-2">
                        <Mail size={16} className="text-gray-400" />
                        <span className="text-sm text-gray-600">{user.email}</span>
                      </div>
                      {user.phone && (
                        <div className="flex items-center space-x-3 py-2">
                          <Phone size={16} className="text-gray-400" />
                          <span className="text-sm text-gray-600">{user.phone}</span>
                        </div>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="px-2 py-2">
                      <button 
                        onClick={handleLogout}
                        className="w-full flex items-center space-x-3 px-2 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md"
                      >
                        <LogOut size={16} />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg flex flex-col fixed left-0 top-14 h-[calc(100vh-3.5rem)] overflow-y-auto">
        {/* Menu Items */}
        <div className="flex-grow p-4 space-y-2">
          {menuItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={(e) => {
                e.preventDefault();
                navigate(item.href);
              }}
              className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors duration-200 ${
                location.pathname === item.href
                  ? 'bg-green-50 text-green-700'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <item.icon size={18} />
              <span className="text-sm font-medium">{item.label}</span>
            </a>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 ml-64 mt-14 p-6">
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout; 