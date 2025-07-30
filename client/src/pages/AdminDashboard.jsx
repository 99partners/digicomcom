import { useState, useEffect } from 'react';
import axiosInstance from '../config/api.config';
import { toast } from 'react-toastify';
import { Users, FileText, Phone, UserCheck, LogOut, Mail, CheckCircle, XCircle, Settings, MessageSquare, BookOpen, Handshake, BarChart2, Clock, Bell, User as UserIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import ContactSubmissions from '../components/admin/ContactSubmissions';
import BlogManagement from '../components/admin/BlogManagement';
import BlogForm from '../components/admin/BlogForm';
import UserForm from '../components/admin/UserForm';
import PartnerRequestManagement from '../components/admin/PartnerRequestManagement';
import NotificationManagement from '../components/admin/NotificationManagement';

const AdminDashboard = () => {
    const [stats, setStats] = useState(null);
    const [users, setUsers] = useState([]);
    const [subscribers, setSubscribers] = useState([]);
    const [activeSection, setActiveSection] = useState('users');
    const [isLoading, setIsLoading] = useState(true);
    const [selectedUser, setSelectedUser] = useState(null);
    const [showUserForm, setShowUserForm] = useState(false);
    const [googleUsers, setGoogleUsers] = useState([]);
    const navigate = useNavigate();
    const { handleLogout: authLogout } = useAuth();

    useEffect(() => {
        console.log('AdminDashboard mounted, fetching data...');
        fetchData();
        fetchGoogleUsers();
    }, []);

    const fetchData = async () => {
        try {
            const [statsResponse, usersResponse, subscribersResponse] = await Promise.all([
                axiosInstance.get('/api/admin/dashboard-stats'),
                axiosInstance.get('/api/admin/users'),
                axiosInstance.get('/api/admin/subscribers')
            ]);

            setStats(statsResponse.data.stats);
            setUsers(usersResponse.data.users);
            setSubscribers(subscribersResponse.data.subscribers);
            setIsLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
            toast.error('Failed to fetch data');
            setIsLoading(false);
        }
    };

    const fetchGoogleUsers = async () => {
        try {
            const res = await axiosInstance.get('/api/admin/google-users');
            setGoogleUsers(res.data.data);
        } catch (error) {
            console.error('Error fetching Google users:', error);
            toast.error('Failed to fetch Google users');
        }
    };

    const handleUnsubscribe = async (subscriberId) => {
        try {
            await axiosInstance.delete(`/api/newsletter/${subscriberId}`);
            toast.success('Subscriber removed successfully');
            // Update the subscribers list
            setSubscribers(subscribers.filter(sub => sub._id !== subscriberId));
            // Update the stats
            setStats(prev => ({
                ...prev,
                totalSubscribers: (prev.totalSubscribers || 0) - 1
            }));
        } catch (error) {
            console.error('Error unsubscribing:', error);
            toast.error('Failed to remove subscriber');
        }
    };

    const handleLogout = async () => {
        try {
            // Clear authentication state first
            authLogout();
            
            // Clear admin token from localStorage
            localStorage.removeItem('adminToken');
            
            // Call logout API (this may fail if token is already invalid, but that's okay)
            try {
                await axiosInstance.post('/api/admin/logout');
            } catch (apiError) {
                // API logout failed, but we've already cleared local state
                console.log('Admin logout API call failed, but local logout completed');
            }
            
            // Navigate to admin login page
            navigate('/', { replace: true });
            toast.success('Logged out successfully');
        } catch (error) {
            console.error('Logout error:', error);
            // Even if there's an error, clear local state and redirect
            authLogout();
            localStorage.removeItem('adminToken');
            navigate('/admin/login', { replace: true });
            toast.error('Logout completed with errors');
        }
    };

    const handleEditUser = (user) => {
        setSelectedUser(user);
        setShowUserForm(true);
    };

    const handleCreateUser = () => {
        setSelectedUser(null);
        setShowUserForm(true);
    };

    const handleUserFormSubmit = () => {
        setShowUserForm(false);
        setSelectedUser(null);
        fetchData(); // Refresh the users list
    };

    const handleUserFormCancel = () => {
        setShowUserForm(false);
        setSelectedUser(null);
    };

    const menuItems = [
        { id: 'dashboard', label: 'Dashboard', icon: Users },
        { id: 'users', label: 'Users', icon: UserCheck },
        { id: 'google-users', label: 'Google Users', icon: UserIcon },
        { id: 'newsletter', label: 'Newsletter', icon: Mail },
        { id: 'blogs', label: 'Blog Management', icon: BookOpen },
        { id: 'contacts', label: 'Contact Messages', icon: MessageSquare },
        { id: 'partner-requests', label: 'Partner Requests', icon: Handshake },
        { id: 'notifications', label: 'Notifications', icon: Bell },
    ];

    const contentItems = [
        { id: 'settings', label: 'Settings', icon: Settings },
    ];

    const renderContent = () => {
        switch (activeSection) {
            case 'dashboard':
                return (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                        <div className="bg-white rounded-lg shadow p-6">
                            <h3 className="text-lg font-semibold mb-2">Total Users</h3>
                            <p className="text-3xl font-bold text-green-600">{stats?.totalUsers || 0}</p>
                        </div>
                        <div className="bg-white rounded-lg shadow p-6">
                            <h3 className="text-lg font-semibold mb-2">Newsletter Subscribers</h3>
                            <p className="text-3xl font-bold text-green-600">{stats?.totalSubscribers || 0}</p>
                        </div>
                        <div className="bg-white rounded-lg shadow p-6">
                            <h3 className="text-lg font-semibold mb-2">Active Users</h3>
                            <p className="text-3xl font-bold text-green-600">{stats?.activeUsers || 0}</p>
                        </div>
                    </div>
                );

            case 'blogs':
                return <BlogManagement />;

            case 'users':
                return showUserForm ? (
                    <UserForm 
                        user={selectedUser}
                        onSubmit={handleUserFormSubmit}
                        onCancel={handleUserFormCancel}
                    />
                ) : (
                    <div className="bg-white rounded-lg shadow overflow-hidden">
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-xl font-semibold">User Management</h2>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                                            <th className="px-3 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Platform Enable</th>
                                            <th className="px-3 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">AMS</th>
                                            <th className="px-3 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Marketing Services</th>
                                            <th className="px-3 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Co-branding</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Verified</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {users.map((user) => (
                                            <tr key={user._id}>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm font-medium text-gray-900">{user.name}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-500">{user.email}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-500">{user.phone}</div>
                                                </td>
                                                <td className="px-3 py-4 whitespace-nowrap text-center">
                                                    <span className={`inline-flex items-center justify-center w-8 h-8 text-sm font-semibold rounded-full ${
                                                        user.serviceCounts?.platformEnable > 0 
                                                            ? 'bg-blue-100 text-blue-800' 
                                                            : 'bg-gray-100 text-gray-500'
                                                    }`}>
                                                        {user.serviceCounts?.platformEnable || 0}
                                                    </span>
                                                </td>
                                                <td className="px-3 py-4 whitespace-nowrap text-center">
                                                    <span className={`inline-flex items-center justify-center w-8 h-8 text-sm font-semibold rounded-full ${
                                                        user.serviceCounts?.ams > 0 
                                                            ? 'bg-green-100 text-green-800' 
                                                            : 'bg-gray-100 text-gray-500'
                                                    }`}>
                                                        {user.serviceCounts?.ams || 0}
                                                    </span>
                                                </td>
                                                <td className="px-3 py-4 whitespace-nowrap text-center">
                                                    <span className={`inline-flex items-center justify-center w-8 h-8 text-sm font-semibold rounded-full ${
                                                        user.serviceCounts?.marketing > 0 
                                                            ? 'bg-purple-100 text-purple-800' 
                                                            : 'bg-gray-100 text-gray-500'
                                                    }`}>
                                                        {user.serviceCounts?.marketing || 0}
                                                    </span>
                                                </td>
                                                <td className="px-3 py-4 whitespace-nowrap text-center">
                                                    <span className={`inline-flex items-center justify-center w-8 h-8 text-sm font-semibold rounded-full ${
                                                        user.serviceCounts?.coBranding > 0 
                                                            ? 'bg-orange-100 text-orange-800' 
                                                            : 'bg-gray-100 text-gray-500'
                                                    }`}>
                                                        {user.serviceCounts?.coBranding || 0}
                                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center">
                                                        {user.isAccountVerified ? (
                                                            <CheckCircle className="w-5 h-5 text-green-500" />
                                                        ) : (
                                                            <XCircle className="w-5 h-5 text-red-500" />
                                                        )}
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                );

            case 'newsletter':
                return (
                    <div className="bg-white rounded-lg shadow overflow-hidden">
                        <div className="p-6">
                            <h2 className="text-xl font-semibold mb-4">Newsletter Subscribers</h2>
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subscribed Date</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {subscribers.map((subscriber) => (
                                            <tr key={subscriber._id}>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-900">{subscriber.email}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {new Date(subscriber.subscribedAt).toLocaleDateString()}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    <button 
                                                        className="text-red-600 hover:text-red-900"
                                                        onClick={() => handleUnsubscribe(subscriber._id)}
                                                    >
                                                        Unsubscribe
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                );

            case 'google-users':
                return (
                    <div className="bg-white rounded-lg shadow overflow-hidden">
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-xl font-semibold">Google Users</h2>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Avatar</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Google ID</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {googleUsers.map((user) => (
                                            <tr key={user._id}>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full object-cover" />
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm font-medium text-gray-900">{user.name}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-500">{user.email}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-xs text-gray-400">{user.googleId}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-xs text-gray-400">{new Date(user.createdAt).toLocaleString()}</div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                );

            case 'contacts':
                return <ContactSubmissions />;

            case 'partner-requests':
                return <PartnerRequestManagement />;

            case 'notifications':
                return <NotificationManagement />;

            case 'settings':
                return (
                    <div className="bg-white rounded-lg shadow p-6">
                        <h2 className="text-xl font-semibold mb-4">Settings</h2>
                        <p>Settings content goes here...</p>
                    </div>
                );

            default:
                return null;
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
                {/* Sidebar */}
                <div className="w-64 bg-white shadow-lg min-h-screen fixed left-0 top-0 overflow-y-auto">
                    <div className="p-6">
                        <h1 className="text-2xl font-bold text-gray-800">Admin Panel</h1>
                    </div>
                    <nav className="mt-6">
                        {menuItems.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => setActiveSection(item.id)}
                                className={`w-full flex items-center px-6 py-3 text-left ${
                                    activeSection === item.id
                                        ? 'bg-green-50 text-green-600'
                                        : 'text-gray-500 hover:bg-gray-50'
                                }`}
                            >
                                <item.icon className="w-5 h-5 mr-3" />
                                {item.label}
                            </button>
                        ))}
                        <button
                            onClick={handleLogout}
                            className="w-full flex items-center px-6 py-3 text-left text-red-500 hover:bg-red-50"
                        >
                            <LogOut className="w-5 h-5 mr-3" />
                            Logout
                        </button>
                    </nav>
                </div>

                {/* Main Content */}
                <div className="flex-1 p-8 ml-64">
                    {renderContent()}
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;