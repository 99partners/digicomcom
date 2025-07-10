import { useState } from 'react';
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
  ChevronDown
} from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

const DashboardLayout = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    { icon: Home, label: 'Dashboard', href: '/dashboard' },
    { icon: Briefcase, label: 'Partnership Opportunities', href: '/dashboard/opportunities' },
    { icon: FileText, label: 'Your Applications', href: '/dashboard/applications' },
    { icon: User, label: 'Profile', href: '/dashboard/profile' },
    { icon: Bell, label: 'Notifications', href: '/dashboard/notifications' },
    { icon: Bookmark, label: 'Subscriptions', href: '/dashboard/subscriptions' },
    { icon: HelpCircle, label: 'FAQ', href: '/dashboard/faq' },
    { icon: Library, label: 'Resource Library', href: '#', external: true },
    { icon: Laptop, label: 'Learning Platform', href: '#', external: true },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg flex flex-col">
        {/* Menu Items */}
        <div className="flex-grow p-4 space-y-2">
          {menuItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={(e) => {
                if (!item.external) {
                  e.preventDefault();
                  navigate(item.href);
                }
              }}
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-sm ${
                location.pathname === item.href
                  ? 'bg-green-50 text-green-700'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <item.icon size={20} />
              <span>{item.label}</span>
              {item.external && <ExternalLink size={16} className="ml-auto" />}
            </a>
          ))}
        </div>

        {/* User Management (Footer) */}
        <div className="p-4 border-t">
          <a
            href="/dashboard/users"
            onClick={(e) => {
              e.preventDefault();
              navigate('/dashboard/users');
            }}
            className="flex items-center space-x-3 px-4 py-3 rounded-lg text-sm text-gray-600 hover:bg-gray-50"
          >
            <Users size={20} />
            <span>User Management</span>
          </a>
        </div>

        {/* Country Switcher */}
        <div className="p-4 border-t">
          <button className="flex items-center space-x-3 px-4 py-3 w-full rounded-lg text-sm text-gray-600 hover:bg-gray-50">
            <Globe size={20} />
            <span>Brazil</span>
            <ChevronDown size={16} className="ml-auto" />
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Navbar */}
        <div className="h-16 bg-white shadow-sm flex items-center justify-between px-8">
          <div className="flex items-center space-x-8">
            <h1 className="text-xl font-semibold text-gray-800">Go Green</h1>
            <span className="text-sm text-gray-500">Last updated: 2024-03-15</span>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-sm text-green-700">EA</span>
              </div>
              <span className="text-sm text-gray-600">Elizabeth - Administrator</span>
            </div>
            <button 
              onClick={() => navigate('/dashboard/profile')}
              className="flex items-center space-x-2 px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50"
            >
              <Edit size={16} />
              <span className="text-sm">Edit Profile</span>
            </button>
          </div>
        </div>

        {/* Page Content */}
        <div className="flex-1 overflow-auto p-8">
          {children}
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout; 