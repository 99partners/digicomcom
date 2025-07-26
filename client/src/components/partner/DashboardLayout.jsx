import { useState, useEffect, useRef } from 'react';
import { 
  FileText, 
  User, 
  Bell, 
  Bookmark, 
  HelpCircle, 
  LogOut,
  Settings,
  PenTool,
  ChevronRight,
  Shield,
  Menu,
  X,
  ArrowLeft
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
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [sidebarOpenMobile, setSidebarOpenMobile] = useState(false);
  const dropdownRef = useRef(null);
  const autoCollapseTimerRef = useRef(null);

  // Auto-collapse configuration
  const AUTO_COLLAPSE_DELAY = 10000; // 10 seconds

  // Start auto-collapse timer
  const startAutoCollapseTimer = () => {
    if (autoCollapseTimerRef.current) {
      clearTimeout(autoCollapseTimerRef.current);
    }
    if (!sidebarCollapsed) {
      autoCollapseTimerRef.current = setTimeout(() => {
        setSidebarCollapsed(true);
      }, AUTO_COLLAPSE_DELAY);
    }
  };

  // Reset auto-collapse timer
  const resetAutoCollapseTimer = () => {
    if (autoCollapseTimerRef.current) {
      clearTimeout(autoCollapseTimerRef.current);
    }
    startAutoCollapseTimer();
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowProfileDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Auto-collapse effect
  useEffect(() => {
    if (!sidebarCollapsed) {
      startAutoCollapseTimer();
    }
    return () => {
      if (autoCollapseTimerRef.current) {
        clearTimeout(autoCollapseTimerRef.current);
      }
    };
  }, [sidebarCollapsed]);

  // Close sidebar on route change (mobile)
  useEffect(() => {
    setSidebarOpenMobile(false);
  }, [location.pathname]);

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

  const handleNavigation = (href) => {
    navigate(href);
    setSidebarCollapsed(true);
    setSidebarOpenMobile(false);
  };

  const toggleSidebar = () => {
    // On mobile, open overlay sidebar
    if (window.innerWidth < 1024) {
      setSidebarOpenMobile(!sidebarOpenMobile);
    } else {
      setSidebarCollapsed(!sidebarCollapsed);
      if (sidebarCollapsed) {
        startAutoCollapseTimer();
      }
    }
  };

  const handleSidebarInteraction = () => {
    if (!sidebarCollapsed) {
      resetAutoCollapseTimer();
    }
  };

  const menuSections = [
    {
      title: 'Applications',
      items: [
        { icon: PenTool, label: 'Create Application', href: '/dashboard/create-application', description: 'Submit new service requests' },
        { icon: FileText, label: 'My Applications', href: '/dashboard/my-applications', description: 'View your submitted applications' }
      ]
    },
    {
      title: 'Account',
      items: [
        { icon: User, label: 'Profile', href: '/dashboard/profile', description: 'Manage your account' },
        { icon: Bell, label: 'Notifications', href: '/dashboard/notifications', description: 'View updates and alerts' },
        { icon: Bookmark, label: 'Subscriptions', href: '/dashboard/subscriptions', description: 'Manage your subscriptions' },
        { icon: Settings, label: 'Settings', href: '/dashboard/settings', description: 'Account settings' }
      ]
    },
    {
      title: 'Support',
      items: [
        { icon: HelpCircle, label: 'FAQ', href: '/dashboard/faq', description: 'Get help and support' }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
<nav className="bg-white shadow-sm fixed w-full z-20 border-b border-gray-200">
  <div className="w-full px-4 sm:px-6 lg:px-8">
    <div className="flex justify-between items-center h-16">
      {/* Left: Logo and Navigation Buttons */}
      <div className="flex items-center space-x-2">
        <button
          onClick={toggleSidebar}
          className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
          aria-label="Toggle sidebar"
        >
          {sidebarCollapsed || sidebarOpenMobile ? <Menu className="w-5 h-5" /> : <X className="w-5 h-5" />}
        </button>
        <button
          onClick={() => navigate(-1)}
          className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
          title="Go Back"
          aria-label="Go Back"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <img src={logo} alt="Logo" className="h-8 w-auto" />
        <span className="ml-2 sm:ml-3 text-lg sm:text-xl font-semibold text-gray-900">Partner Portal</span>
      </div>

      {/* Right: Notifications and Profile */}
      <div className="flex items-center space-x-2 sm:space-x-4">
        <button 
          onClick={() => navigate('/dashboard/notifications')}
          className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
          aria-label="Notifications"
        >
          <Bell className="w-5 h-5" />
        </button>
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setShowProfileDropdown(!showProfileDropdown)}
            className="flex items-center space-x-2 sm:space-x-3 text-gray-700 hover:text-gray-900 focus:outline-none p-2 rounded-lg hover:bg-gray-100"
            aria-label="Profile menu"
          >
            <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
              <span className="text-sm font-bold text-white">
                {user?.name?.charAt(0)?.toUpperCase() || 'U'}
              </span>
            </div>
            <span className="hidden md:block font-bold">{user?.name}</span>
          </button>
          {showProfileDropdown && (
            <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg py-2 ring-1 ring-black ring-opacity-5 z-50">
              <div className="px-4 py-3 border-b border-gray-100">
                <div className="font-bold text-gray-900">{user?.name}</div>
                <div className="text-sm font-medium text-gray-600">{user?.email}</div>
              </div>
              <button
                onClick={() => handleNavigation('/dashboard/profile')}
                className="w-full text-left px-4 py-2 text-sm font-bold text-gray-700 hover:bg-gray-50 flex items-center"
              >
                <User className="w-4 h-4 mr-3" />
                View profile
              </button>
              <button
                onClick={() => handleNavigation('/dashboard/settings')}
                className="w-full text-left px-4 py-2 text-sm font-bold text-gray-700 hover:bg-gray-50 flex items-center"
              >
                <Settings className="w-4 h-4 mr-3" />
                Settings
              </button>
              <div className="border-t border-gray-100 my-1"></div>
              <button
                onClick={onLogout}
                className="w-full text-left px-4 py-2 text-sm font-bold text-red-600 hover:bg-red-50 flex items-center"
              >
                <LogOut className="w-4 h-4 mr-3" />
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
      <div className="flex pt-16">
        {/* Sidebar for desktop and overlay for mobile */}
        {/* Desktop sidebar */}
        <div 
          className={`
            hidden lg:block fixed h-full bg-gray-50 shadow-sm border-r border-gray-300 transition-all duration-300 ease-in-out
            ${sidebarCollapsed ? 'w-16' : 'w-72'}
          `}
          onMouseEnter={handleSidebarInteraction}
          onMouseMove={handleSidebarInteraction}
          onClick={handleSidebarInteraction}
        >
          <div className="h-full overflow-hidden flex flex-col">
            {/* User Profile Section - Hide when collapsed */}
            {!sidebarCollapsed && (
              <div className="flex-shrink-0 p-4 border-b border-gray-300">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center">
                    <span className="text-sm font-bold text-white">
                      {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-bold text-gray-900 truncate">
                      {user?.name}
                    </h3>
                    <p className="text-xs font-medium text-gray-600 truncate">
                      {user?.email}
                    </p>
                    <p className="text-xs font-bold text-green-800 mt-0.5">
                      Partner Account
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Sections */}
            <div className={`flex-1 py-3 space-y-4 ${sidebarCollapsed ? 'px-2' : 'px-3'} overflow-hidden`}>
              {menuSections.map((section) => (
                <div key={section.title}>
                  {!sidebarCollapsed && (
                    <h4 className="px-3 text-xs font-bold text-gray-600 uppercase tracking-wider mb-2">
                      {section.title}
                    </h4>
                  )}
                  <div className="space-y-0.5">
                    {section.items.map((item) => {
                      const Icon = item.icon;
                      const isActive = location.pathname === item.href;
                      return (
                        <div key={item.label} className="relative group">
                          <button
                            onClick={() => handleNavigation(item.href)}
                            className={`w-full group flex items-center text-sm font-bold rounded-lg transition-colors ${
                              sidebarCollapsed ? 'p-2.5 justify-center' : 'px-3 py-2'
                            } ${
                              isActive
                                ? 'bg-green-100 text-green-800 border-r-4 border-green-800'
                                : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                            }`}
                          >
                            <Icon className={`w-5 h-5 ${
                              sidebarCollapsed ? '' : 'mr-3'
                            } ${
                              isActive ? 'text-green-700' : 'text-gray-600 group-hover:text-gray-700'
                            }`} />
                            {!sidebarCollapsed && (
                              <>
                                <span className="flex-1 text-left">{item.label}</span>
                                {isActive && (
                                  <ChevronRight className="w-4 h-4 text-green-700" />
                                )}
                              </>
                            )}
                          </button>
                          {/* Tooltip for collapsed state only */}
                          {sidebarCollapsed && (
                            <div className="absolute left-full top-1/2 transform -translate-y-1/2 ml-4 px-4 py-2.5 bg-gray-900 text-white text-sm font-bold rounded-xl shadow-2xl opacity-0 group-hover:opacity-100 group-hover:scale-100 scale-95 transition-all duration-300 ease-out pointer-events-none whitespace-nowrap z-[60] border-2 border-gray-700">
                              <span className="text-white font-extrabold">{item.label}</span>
                              <div className="absolute right-full top-1/2 transform -translate-y-1/2 w-0 h-0 border-t-[6px] border-b-[6px] border-r-[8px] border-transparent border-r-gray-900"></div>
                              <div className="absolute inset-0 bg-gray-800 rounded-xl -z-10 blur-sm"></div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            {/* Footer */}
            {!sidebarCollapsed && (
              <div className="flex-shrink-0 p-3 border-t border-gray-300 bg-gray-50">
                <div className="flex items-center space-x-2 text-xs font-bold text-gray-700">
                  <Shield className="w-3 h-3" />
                  <span>Secure Portal</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Mobile sidebar overlay */}
        <div
          className={`
            fixed inset-0 z-40 bg-black bg-opacity-40 transition-opacity duration-300
            ${sidebarOpenMobile ? 'block lg:hidden' : 'hidden'}
          `}
          onClick={() => setSidebarOpenMobile(false)}
        />
        <div
          className={`
            fixed top-0 left-0 h-full bg-gray-50 shadow-lg border-r border-gray-300 z-50 transition-transform duration-300
            w-64 max-w-full
            ${sidebarOpenMobile ? 'translate-x-0' : '-translate-x-full'}
            lg:hidden
          `}
          onClick={handleSidebarInteraction}
        >
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <div className="flex items-center space-x-2">
                <img src={logo} alt="Logo" className="h-8 w-auto" />
                <span className="text-lg font-semibold text-gray-900">Partner Portal</span>
              </div>
              <button
                onClick={() => setSidebarOpenMobile(false)}
                className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
                aria-label="Close sidebar"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto py-3 px-3 space-y-4">
              {menuSections.map((section) => (
                <div key={section.title}>
                  <h4 className="px-3 text-xs font-bold text-gray-600 uppercase tracking-wider mb-2">
                    {section.title}
                  </h4>
                  <div className="space-y-0.5">
                    {section.items.map((item) => {
                      const Icon = item.icon;
                      const isActive = location.pathname === item.href;
                      return (
                        <button
                          key={item.label}
                          onClick={() => handleNavigation(item.href)}
                          className={`w-full flex items-center text-sm font-bold rounded-lg transition-colors px-3 py-2 ${
                            isActive
                              ? 'bg-green-100 text-green-800 border-r-4 border-green-800'
                              : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                          }`}
                        >
                          <Icon className="w-5 h-5 mr-3" />
                          <span className="flex-1 text-left">{item.label}</span>
                          {isActive && <ChevronRight className="w-4 h-4 text-green-700" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
            <div className="flex-shrink-0 p-3 border-t border-gray-300 bg-gray-50">
              <div className="flex items-center space-x-2 text-xs font-bold text-gray-700">
                <Shield className="w-3 h-3" />
                <span>Secure Portal</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className={`
          flex-1 transition-all duration-300 ease-in-out
          pt-4 pb-8 w-full
          ${sidebarOpenMobile ? 'overflow-hidden' : ''}
          ${sidebarCollapsed ? 'pl-0 lg:pl-16' : 'pl-0 lg:pl-72'}
        `}>
          <main className="p-2 sm:p-4 md:p-6 max-w-7xl mx-auto">{children}</main>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;