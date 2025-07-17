import { useState, useEffect, useRef } from 'react';
import { 
  FileText, 
  User, 
  Bell, 
  Bookmark, 
  HelpCircle, 
  LogOut,
  Settings,
  Mail,
  Phone,
  PenTool,
  Briefcase
} from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import logo from '../../assets/99digicom.png';
import { useAuth } from '../../context/AuthContext';
import axiosInstance from '../../config/api.config';

const DashboardLayout = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, handleLogout } = useAuth();
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowProfileDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const onLogout = async () => {
    try {
      await axiosInstance.post('/api/auth/logout');
      handleLogout();
      navigate('/', { replace: true });
    } catch (error) {
      console.error('Logout failed:', error);
      handleLogout();
      navigate('/', { replace: true });
    }
  };

  const menuItems = [
     
    { 
      icon: User, 
      label: 'Profile', 
      href: '/dashboard/profile',
      description: 'Manage your account'
    },
    { 
      icon: PenTool, 
      label: 'Create Application', 
      href: '/dashboard/create-application',
      description: 'Submit new service requests'
    },
    { 
      icon: FileText, 
      label: 'Your Applications', 
      href: '/dashboard/my-applications',
      description: 'View your submitted applications'
    },
    { 
      icon: Bell, 
      label: 'Notifications', 
      href: '/dashboard/notifications',
      description: 'View updates and alerts'
    },
    { 
      icon: Bookmark, 
      label: 'Subscriptions', 
      href: '/dashboard/subscriptions',
      description: 'Manage your subscriptions'
    },
    { 
      icon: HelpCircle, 
      label: 'FAQ', 
      href: '/dashboard/faq',
      description: 'Get help and support'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <nav className="bg-white shadow-sm fixed w-full z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-14">
            <div className="flex items-center">
              <img src={logo} alt="Logo" className="h-8 w-auto" />
              <span className="ml-2 text-xl font-semibold text-gray-900">Partners</span>
            </div>
            <div className="flex items-center">
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                  className="flex items-center space-x-3 text-gray-700 hover:text-gray-900 focus:outline-none"
                >
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium text-green-800">
                      {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                    </span>
                  </div>
                  <span className="hidden md:block font-medium">{user?.name}</span>
                </button>

                {showProfileDropdown && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 ring-1 ring-black ring-opacity-5">
                    <div className="px-4 py-2 text-sm text-gray-700">
                      <div className="font-medium">{user?.name}</div>
                      <div className="text-gray-500">{user?.email}</div>
                    </div>
                    <hr className="my-1" />
                    <button
                      onClick={onLogout}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                    >
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Sidebar and Main Content */}
      <div className="flex pt-14">
        {/* Sidebar */}
        <div className="w-64 fixed h-full bg-white shadow-sm border-r border-gray-200">
          <div className="h-full overflow-y-auto">
            <div className="px-3 py-4 space-y-1">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.href;
                return (
                  <button
                    key={item.label}
                    onClick={() => navigate(item.href)}
                    className={`w-full flex items-center px-3 py-2 rounded-lg text-sm ${
                      isActive
                        ? 'bg-green-50 text-green-600'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <Icon className="w-5 h-5 mr-3" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 pl-64">
          <main className="p-6">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout; 