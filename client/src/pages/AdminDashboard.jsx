import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Users, FileText, Phone, UserCheck, LogOut, Mail, CheckCircle, XCircle, Settings, Handshake, MessageSquare, BookOpen } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import AMSSubmissions from '../components/admin/AMSSubmissions';
import CoBrandingSubmissions from '../components/admin/CoBrandingSubmissions';
import ContactSubmissions from '../components/admin/ContactSubmissions';
import BlogManagement from '../components/admin/BlogManagement';
import BlogForm from '../components/admin/BlogForm';
import UserForm from '../components/admin/UserForm';
import { getApiUrl } from '../config/api.config';

const AdminDashboard = () => {
    const [stats, setStats] = useState(null);
    const [users, setUsers] = useState([]);
    const [subscribers, setSubscribers] = useState([]);
    const [activeSection, setActiveSection] = useState('users');
    const [isLoading, setIsLoading] = useState(true);
    const [selectedUser, setSelectedUser] = useState(null);
    const [showUserForm, setShowUserForm] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const [statsResponse, usersResponse, subscribersResponse] = await Promise.all([
                axios.get(getApiUrl('api/admin/dashboard-stats')),
                axios.get(getApiUrl('api/admin/users')),
                axios.get(getApiUrl('api/admin/subscribers'))
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

    const handleUnsubscribe = async (subscriberId) => {
        try {
            await axios.delete(getApiUrl(`api/newsletter/${subscriberId}`));
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
            await axios.post(getApiUrl('api/admin/logout'));
            navigate('/admin/login');
        } catch (error) {
            toast.error('Logout failed');
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
        { id: 'newsletter', label: 'Newsletter', icon: Mail },
        { id: 'blogs', label: 'Blog Management', icon: BookOpen },
        { id: 'ams', label: 'AMS Submissions', icon: FileText },
        { id: 'co-branding', label: 'Co-Branding', icon: Handshake },
        { id: 'contacts', label: 'Contact Messages', icon: MessageSquare },
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
                                <button
                                    onClick={handleCreateUser}
                                    className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                                >
                                    Add New User
                                </button>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Verified</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
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
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                                        user.isAccountVerified ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                                    }`}>
                                                        {user.isAccountVerified ? 'Verified' : 'Not Verified'}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    <button 
                                                        onClick={() => handleEditUser(user)}
                                                        className="text-blue-600 hover:text-blue-900 mr-3"
                                                    >
                                                        Edit
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

            case 'ams':
                return <AMSSubmissions />;

            case 'co-branding':
                return <CoBrandingSubmissions />;

            case 'contacts':
                return <ContactSubmissions />;

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
                <div className="w-64 bg-white shadow-lg min-h-screen">
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
                <div className="flex-1 p-8">
                    {renderContent()}
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;