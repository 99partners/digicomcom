import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Users, FileText, Phone, UserCheck, LogOut, Mail, CheckCircle, XCircle } from 'lucide-react';

const AdminDashboard = () => {
    const [stats, setStats] = useState(null);
    const [users, setUsers] = useState([]);
    const [subscribers, setSubscribers] = useState([]);
    const [activeSection, setActiveSection] = useState('dashboard');
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const [statsRes, usersRes, subscribersRes] = await Promise.all([
                axios.get('http://localhost:5050/api/admin/dashboard-stats', { withCredentials: true }),
                axios.get('http://localhost:5050/api/admin/users', { withCredentials: true }),
                axios.get('http://localhost:5050/api/admin/subscribers', { withCredentials: true })
            ]);

            if (statsRes.data.success) {
                setStats(statsRes.data.stats);
            }
            if (usersRes.data.success) {
                setUsers(usersRes.data.users);
            }
            if (subscribersRes.data.success) {
                setSubscribers(subscribersRes.data.subscribers);
            }
        } catch (error) {
            if (error.response?.status === 401) {
                navigate('/admin/login');
            }
            toast.error('Failed to fetch data');
        } finally {
            setIsLoading(false);
        }
    };

    const handleLogout = async () => {
        try {
            await axios.post(
                'http://localhost:5050/api/admin/logout',
                {},
                { withCredentials: true }
            );
            navigate('/admin/login');
        } catch (error) {
            toast.error('Logout failed');
        }
    };

    const menuItems = [
        { id: 'dashboard', label: 'Dashboard', icon: Users },
        { id: 'users', label: 'Users', icon: Users },
        { id: 'subscribers', label: 'Subscribers', icon: Mail }
    ];

    const contentItems = [
        { id: 'blog', label: 'Blog', icon: FileText },
        { id: 'contact', label: 'Contact', icon: Phone },
        { id: 'partner', label: 'Partner', icon: UserCheck }
    ];

    const renderContent = () => {
        switch (activeSection) {
            case 'users':
                return (
                    <div className="bg-white rounded-lg shadow-sm p-6">
                        <h2 className="text-xl font-semibold mb-6">Registered Users</h2>
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Joined Date</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {users.map((user) => (
                                        <tr key={user._id}>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                {user.name}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {user.email}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {user.isAccountVerified ? (
                                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                                        <CheckCircle className="w-4 h-4 mr-1" />
                                                        Verified
                                                    </span>
                                                ) : (
                                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                                                        <XCircle className="w-4 h-4 mr-1" />
                                                        Pending
                                                    </span>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {new Date(user.createdAt).toLocaleDateString()}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                );

            case 'subscribers':
                return (
                    <div className="space-y-8">
                        <div className="bg-blue-50/50 rounded-lg p-6 mb-8 border border-blue-100">
                            <h3 className="text-lg font-semibold text-gray-800 mb-2">Total Subscribers</h3>
                            <p className="text-3xl font-bold text-gray-900">{subscribers.length}</p>
                        </div>

                        <div className="bg-white rounded-lg shadow-sm p-6">
                            <h2 className="text-xl font-semibold mb-6">Newsletter Subscribers</h2>
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {subscribers.map((subscriber) => (
                                            <tr key={subscriber._id}>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                    <div className="flex items-center">
                                                        <Mail className="w-4 h-4 mr-2 text-gray-400" />
                                                        {subscriber.email}
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

            case 'dashboard':
                return (
                    <>
                        <div className="mb-8">
                            <h2 className="text-lg font-semibold text-gray-700 mb-4">
                                Welcome back! Here's the latest data from your admin panel.
                            </h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                            <div className="bg-blue-50 rounded-lg p-6">
                                <h3 className="text-lg font-semibold text-gray-800 mb-4">Total Users</h3>
                                <p className="text-3xl font-bold text-gray-900">{stats?.totalUsers || 0}</p>
                            </div>

                            <div className="bg-yellow-50 rounded-lg p-6">
                                <h3 className="text-lg font-semibold text-gray-800 mb-4">Total Subscribers</h3>
                                <p className="text-3xl font-bold text-gray-900">{stats?.totalSubscribers || 0}</p>
                            </div>

                            <div className="bg-teal-50 rounded-lg p-6">
                                <h3 className="text-lg font-semibold text-gray-800 mb-4">Total Blogs</h3>
                                <p className="text-3xl font-bold text-gray-900">{stats?.totalBlogs || 0}</p>
                            </div>

                            <div className="bg-orange-50 rounded-lg p-6">
                                <h3 className="text-lg font-semibold text-gray-800 mb-4">Total Partners</h3>
                                <p className="text-3xl font-bold text-gray-900">{stats?.totalPartners || 0}</p>
                            </div>
                        </div>
                    </>
                );

            default:
                return (
                    <div className="bg-white rounded-lg shadow-sm p-6">
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
        <div className="flex h-screen bg-gray-50">
            {/* Sidebar */}
            <div className="w-64 bg-[#1a1c23] text-white">
                <div className="p-4 border-b border-gray-700">
                    <h1 className="text-xl font-bold">Admin Panel</h1>
                </div>

                <div className="p-4">
                    <div className="mb-8">
                        <h2 className="text-xs uppercase tracking-wide text-gray-400 mb-2">MAIN MENU</h2>
                        <nav className="space-y-1">
                            {menuItems.map((item) => (
                                <button
                                    key={item.id}
                                    onClick={() => setActiveSection(item.id)}
                                    className={`w-full flex items-center px-4 py-2 text-sm rounded-lg transition-colors ${
                                        activeSection === item.id
                                            ? 'bg-green-500 text-white'
                                            : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                                    }`}
                                >
                                    <item.icon className="h-5 w-5 mr-3" />
                                    {item.label}
                                </button>
                            ))}
                        </nav>
                    </div>

                    <div>
                        <h2 className="text-xs uppercase tracking-wide text-gray-400 mb-2">CONTENT MANAGEMENT</h2>
                        <nav className="space-y-1">
                            {contentItems.map((item) => (
                                <button
                                    key={item.id}
                                    onClick={() => setActiveSection(item.id)}
                                    className={`w-full flex items-center px-4 py-2 text-sm rounded-lg transition-colors ${
                                        activeSection === item.id
                                            ? 'bg-green-500 text-white'
                                            : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                                    }`}
                                >
                                    <item.icon className="h-5 w-5 mr-3" />
                                    {item.label}
                                </button>
                            ))}
                        </nav>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 overflow-auto">
                <header className="bg-white shadow-sm">
                    <div className="flex justify-between items-center px-8 py-4">
                        <h1 className="text-2xl font-semibold text-gray-900">{activeSection.charAt(0).toUpperCase() + activeSection.slice(1)}</h1>
                        <button
                            onClick={handleLogout}
                            className="flex items-center px-4 py-2 text-sm text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors"
                        >
                            <LogOut className="h-4 w-4 mr-2" />
                            Logout
                        </button>
                    </div>
                </header>

                <main className="p-8">
                    {renderContent()}
                </main>
            </div>
        </div>
    );
};

export default AdminDashboard; 