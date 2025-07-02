import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Users, FileText, Phone, UserCheck, LogOut } from 'lucide-react';

const AdminDashboard = () => {
    const [stats, setStats] = useState(null);
    const [activeSection, setActiveSection] = useState('dashboard');
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        fetchDashboardStats();
    }, []);

    const fetchDashboardStats = async () => {
        try {
            const response = await axios.get(
                'http://localhost:5050/api/admin/dashboard-stats',
                { withCredentials: true }
            );

            if (response.data.success) {
                setStats(response.data.stats);
            }
        } catch (error) {
            if (error.response?.status === 401) {
                navigate('/admin/login');
            }
            toast.error('Failed to fetch dashboard stats');
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
        { id: 'users', label: 'Users', icon: Users }
    ];

    const contentItems = [
        { id: 'blog', label: 'Blog', icon: FileText },
        { id: 'contact', label: 'Contact', icon: Phone },
        { id: 'partner', label: 'Partner', icon: UserCheck }
    ];

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
                        <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
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
                    <div className="mb-8">
                        <h2 className="text-lg font-semibold text-gray-700 mb-4">
                            Welcome back! Here's the latest data from your admin panel.
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
                </main>
            </div>
        </div>
    );
};

export default AdminDashboard; 