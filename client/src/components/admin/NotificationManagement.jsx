import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import axiosInstance from '../../config/api.config';
import { 
    Bell, 
    Plus, 
    Edit2, 
    Trash2, 
    Eye, 
    EyeOff, 
    Users, 
    Calendar, 
    AlertCircle,
    CheckCircle,
    Info,
    AlertTriangle,
    X,
    Save,
    Search,
    Filter,
    MoreHorizontal
} from 'lucide-react';

const NotificationManagement = () => {
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editingNotification, setEditingNotification] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterType, setFilterType] = useState('all');
    const [filterCategory, setFilterCategory] = useState('all');
    const [stats, setStats] = useState({});

    // Form state
    const [formData, setFormData] = useState({
        title: '',
        message: '',
        type: 'info',
        category: 'general',
        priority: 'medium',
        targetAudience: 'all',
        scheduledAt: '',
        expiresAt: '',
        metadata: {
            actionUrl: '',
            actionText: ''
        }
    });

    const notificationTypes = [
        { value: 'info', label: 'Info', icon: Info, color: 'text-blue-600' },
        { value: 'success', label: 'Success', icon: CheckCircle, color: 'text-green-600' },
        { value: 'warning', label: 'Warning', icon: AlertTriangle, color: 'text-yellow-600' },
        { value: 'error', label: 'Error', icon: AlertCircle, color: 'text-red-600' }
    ];

    const categories = [
        { value: 'general', label: 'General' },
        { value: 'system', label: 'System' },
        { value: 'account', label: 'Account' },
        { value: 'billing', label: 'Billing' },
        { value: 'marketing', label: 'Marketing' },
        { value: 'feature', label: 'Feature' }
    ];

    const priorities = [
        { value: 'low', label: 'Low', color: 'bg-gray-100 text-gray-800' },
        { value: 'medium', label: 'Medium', color: 'bg-blue-100 text-blue-800' },
        { value: 'high', label: 'High', color: 'bg-red-100 text-red-800' }
    ];

    const targetAudiences = [
        { value: 'all', label: 'All Users' },
        { value: 'partners', label: 'Partners Only' },
        { value: 'customers', label: 'Customers Only' }
    ];

    useEffect(() => {
        fetchNotifications();
        fetchStats();
    }, []);

    const fetchNotifications = async () => {
        try {
            setLoading(true);
            const response = await axiosInstance.get('/api/admin/notifications');
            if (response.data.success) {
                setNotifications(response.data.data);
            }
        } catch (error) {
            console.error('Error fetching notifications:', error);
            toast.error('Failed to fetch notifications');
        } finally {
            setLoading(false);
        }
    };

    const fetchStats = async () => {
        try {
            const response = await axiosInstance.get('/api/admin/notifications/stats');
            if (response.data.success) {
                setStats(response.data.data);
            }
        } catch (error) {
            console.error('Error fetching stats:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const url = editingNotification 
                ? `/api/admin/notifications/${editingNotification._id}`
                : '/api/admin/notifications';
            
            const method = editingNotification ? 'put' : 'post';
            
            const response = await axiosInstance[method](url, formData);
            
            if (response.data.success) {
                toast.success(editingNotification ? 'Notification updated successfully' : 'Notification created successfully');
                setShowForm(false);
                setEditingNotification(null);
                resetForm();
                fetchNotifications();
                fetchStats();
            }
        } catch (error) {
            console.error('Error saving notification:', error);
            toast.error('Failed to save notification');
        }
    };

    const handleEdit = (notification) => {
        setEditingNotification(notification);
        setFormData({
            title: notification.title,
            message: notification.message,
            type: notification.type,
            category: notification.category,
            priority: notification.priority,
            targetAudience: notification.targetAudience,
            scheduledAt: notification.scheduledAt ? new Date(notification.scheduledAt).toISOString().slice(0, 16) : '',
            expiresAt: notification.expiresAt ? new Date(notification.expiresAt).toISOString().slice(0, 16) : '',
            metadata: {
                actionUrl: notification.metadata?.actionUrl || '',
                actionText: notification.metadata?.actionText || ''
            }
        });
        setShowForm(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this notification?')) {
            try {
                await axiosInstance.delete(`/api/admin/notifications/${id}`);
                toast.success('Notification deleted successfully');
                fetchNotifications();
                fetchStats();
            } catch (error) {
                console.error('Error deleting notification:', error);
                toast.error('Failed to delete notification');
            }
        }
    };

    const handleToggleStatus = async (id) => {
        try {
            const response = await axiosInstance.patch(`/api/admin/notifications/${id}/toggle-status`);
            if (response.data.success) {
                toast.success(response.data.message);
                fetchNotifications();
            }
        } catch (error) {
            console.error('Error toggling status:', error);
            toast.error('Failed to toggle notification status');
        }
    };

    const resetForm = () => {
        setFormData({
            title: '',
            message: '',
            type: 'info',
            category: 'general',
            priority: 'medium',
            targetAudience: 'all',
            scheduledAt: '',
            expiresAt: '',
            metadata: {
                actionUrl: '',
                actionText: ''
            }
        });
    };

    const filteredNotifications = notifications.filter(notification => {
        const matchesSearch = notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            notification.message.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesType = filterType === 'all' || notification.type === filterType;
        const matchesCategory = filterCategory === 'all' || notification.category === filterCategory;
        
        return matchesSearch && matchesType && matchesCategory;
    });

    const getTypeIcon = (type) => {
        const typeConfig = notificationTypes.find(t => t.value === type);
        const Icon = typeConfig?.icon || Info;
        return <Icon className={`w-4 h-4 ${typeConfig?.color || 'text-gray-600'}`} />;
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center py-12">
                <div className="w-8 h-8 border-4 border-green-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">Notification Management</h2>
                    <p className="text-gray-600">Create and manage system notifications</p>
                </div>
                <button
                    onClick={() => {
                        setShowForm(true);
                        setEditingNotification(null);
                        resetForm();
                    }}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
                >
                    <Plus className="w-4 h-4 mr-2" />
                    Create Notification
                </button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-center">
                        <div className="p-2 bg-blue-100 rounded-lg">
                            <Bell className="w-6 h-6 text-blue-600" />
                        </div>
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-600">Total</p>
                            <p className="text-2xl font-bold text-gray-900">{stats.total || 0}</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-center">
                        <div className="p-2 bg-green-100 rounded-lg">
                            <CheckCircle className="w-6 h-6 text-green-600" />
                        </div>
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-600">Active</p>
                            <p className="text-2xl font-bold text-gray-900">{stats.active || 0}</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-center">
                        <div className="p-2 bg-gray-100 rounded-lg">
                            <EyeOff className="w-6 h-6 text-gray-600" />
                        </div>
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-600">Inactive</p>
                            <p className="text-2xl font-bold text-gray-900">{stats.inactive || 0}</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-center">
                        <div className="p-2 bg-purple-100 rounded-lg">
                            <Users className="w-6 h-6 text-purple-600" />
                        </div>
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-600">This Month</p>
                            <p className="text-2xl font-bold text-gray-900">{notifications.filter(n => 
                                new Date(n.createdAt).getMonth() === new Date().getMonth()
                            ).length}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-lg shadow p-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                            <input
                                type="text"
                                placeholder="Search notifications..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10 w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
                        <select
                            value={filterType}
                            onChange={(e) => setFilterType(e.target.value)}
                            className="w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                        >
                            <option value="all">All Types</option>
                            {notificationTypes.map(type => (
                                <option key={type.value} value={type.value}>{type.label}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                        <select
                            value={filterCategory}
                            onChange={(e) => setFilterCategory(e.target.value)}
                            className="w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                        >
                            <option value="all">All Categories</option>
                            {categories.map(category => (
                                <option key={category.value} value={category.value}>{category.label}</option>
                            ))}
                        </select>
                    </div>
                    <div className="flex items-end">
                        <button
                            onClick={() => {
                                setSearchTerm('');
                                setFilterType('all');
                                setFilterCategory('all');
                            }}
                            className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                        >
                            Clear Filters
                        </button>
                    </div>
                </div>
            </div>

            {/* Notifications List */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200">
                    <h3 className="text-lg font-medium text-gray-900">
                        Notifications ({filteredNotifications.length})
                    </h3>
                </div>
                <div className="divide-y divide-gray-200">
                    {filteredNotifications.length === 0 ? (
                        <div className="px-6 py-12 text-center">
                            <Bell className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                            <p className="text-gray-500">No notifications found</p>
                        </div>
                    ) : (
                        filteredNotifications.map((notification) => (
                            <div key={notification._id} className="px-6 py-4 hover:bg-gray-50">
                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        <div className="flex items-center space-x-3 mb-2">
                                            {getTypeIcon(notification.type)}
                                            <h4 className="text-sm font-medium text-gray-900">
                                                {notification.title}
                                            </h4>
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                                priorities.find(p => p.value === notification.priority)?.color || 'bg-gray-100 text-gray-800'
                                            }`}>
                                                {notification.priority}
                                            </span>
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                                notification.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                                            }`}>
                                                {notification.isActive ? 'Active' : 'Inactive'}
                                            </span>
                                        </div>
                                        <p className="text-sm text-gray-600 mb-2">{notification.message}</p>
                                        <div className="flex items-center space-x-4 text-xs text-gray-500">
                                            <span>Category: {notification.category}</span>
                                            <span>Target: {notification.targetAudience}</span>
                                            <span>Created: {new Date(notification.createdAt).toLocaleDateString()}</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-2 ml-4">
                                        <button
                                            onClick={() => handleToggleStatus(notification._id)}
                                            className={`p-2 rounded-md text-sm font-medium ${
                                                notification.isActive
                                                    ? 'text-gray-600 hover:bg-gray-100'
                                                    : 'text-green-600 hover:bg-green-50'
                                            }`}
                                            title={notification.isActive ? 'Deactivate' : 'Activate'}
                                        >
                                            {notification.isActive ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                        </button>
                                        <button
                                            onClick={() => handleEdit(notification)}
                                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-md"
                                            title="Edit"
                                        >
                                            <Edit2 className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(notification._id)}
                                            className="p-2 text-red-600 hover:bg-red-50 rounded-md"
                                            title="Delete"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* Create/Edit Form Modal */}
            {showForm && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
                    <div className="relative top-20 mx-auto p-5 border w-full max-w-2xl shadow-lg rounded-md bg-white">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-medium text-gray-900">
                                {editingNotification ? 'Edit Notification' : 'Create New Notification'}
                            </h3>
                            <button
                                onClick={() => {
                                    setShowForm(false);
                                    setEditingNotification(null);
                                    resetForm();
                                }}
                                className="text-gray-400 hover:text-gray-600"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Title *
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.title}
                                        onChange={(e) => setFormData({...formData, title: e.target.value})}
                                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Type
                                    </label>
                                    <select
                                        value={formData.type}
                                        onChange={(e) => setFormData({...formData, type: e.target.value})}
                                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                                    >
                                        {notificationTypes.map(type => (
                                            <option key={type.value} value={type.value}>{type.label}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Message *
                                </label>
                                <textarea
                                    required
                                    rows={3}
                                    value={formData.message}
                                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Category
                                    </label>
                                    <select
                                        value={formData.category}
                                        onChange={(e) => setFormData({...formData, category: e.target.value})}
                                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                                    >
                                        {categories.map(category => (
                                            <option key={category.value} value={category.value}>{category.label}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Priority
                                    </label>
                                    <select
                                        value={formData.priority}
                                        onChange={(e) => setFormData({...formData, priority: e.target.value})}
                                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                                    >
                                        {priorities.map(priority => (
                                            <option key={priority.value} value={priority.value}>{priority.label}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Target Audience
                                    </label>
                                    <select
                                        value={formData.targetAudience}
                                        onChange={(e) => setFormData({...formData, targetAudience: e.target.value})}
                                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                                    >
                                        {targetAudiences.map(audience => (
                                            <option key={audience.value} value={audience.value}>{audience.label}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Scheduled At
                                    </label>
                                    <input
                                        type="datetime-local"
                                        value={formData.scheduledAt}
                                        onChange={(e) => setFormData({...formData, scheduledAt: e.target.value})}
                                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Expires At
                                    </label>
                                    <input
                                        type="datetime-local"
                                        value={formData.expiresAt}
                                        onChange={(e) => setFormData({...formData, expiresAt: e.target.value})}
                                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Action URL
                                    </label>
                                    <input
                                        type="url"
                                        value={formData.metadata.actionUrl}
                                        onChange={(e) => setFormData({
                                            ...formData, 
                                            metadata: {...formData.metadata, actionUrl: e.target.value}
                                        })}
                                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Action Text
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.metadata.actionText}
                                        onChange={(e) => setFormData({
                                            ...formData, 
                                            metadata: {...formData.metadata, actionText: e.target.value}
                                        })}
                                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                                    />
                                </div>
                            </div>

                            <div className="flex items-center justify-end space-x-3 pt-4">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setShowForm(false);
                                        setEditingNotification(null);
                                        resetForm();
                                    }}
                                    className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
                                >
                                    <Save className="w-4 h-4 mr-2" />
                                    {editingNotification ? 'Update' : 'Create'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default NotificationManagement; 