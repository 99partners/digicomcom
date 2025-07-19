import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Bell, 
    CheckCircle, 
    AlertCircle, 
    Info, 
    Package, 
    Settings,
    Calendar,
    Clock,
    Star,
    AlertTriangle,
    ExternalLink,
    RefreshCw
} from 'lucide-react';
import axiosInstance from '../../config/api.config';
import { toast } from 'react-toastify';

const Notifications = () => {
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all');
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        fetchNotifications();
    }, [page, filter]);

    // Auto-refresh notifications every 30 seconds to show scheduled notifications
    useEffect(() => {
        const interval = setInterval(() => {
            fetchNotifications();
        }, 30000);

        return () => clearInterval(interval);
    }, [page, filter]);

    const fetchNotifications = async () => {
        try {
            setLoading(true);
            const unreadOnly = filter === 'unread';
            const response = await axiosInstance.get(`/api/notifications/user?page=${page}&limit=10&unreadOnly=${unreadOnly}`);
            
            if (response.data.success) {
                setNotifications(response.data.data);
                setTotalPages(response.data.pagination.totalPages);
            }
        } catch (error) {
            console.error('Error fetching notifications:', error);
            toast.error('Failed to load notifications');
        } finally {
            setLoading(false);
        }
    };

    const markAsRead = async (notificationId) => {
        try {
            await axiosInstance.patch(`/api/notifications/${notificationId}/read`);
            // Update local state
            setNotifications(notifications.map(notif =>
                notif._id === notificationId ? { ...notif, readBy: [{ userId: 'current-user', readAt: new Date() }] } : notif
            ));
        } catch (error) {
            console.error('Error marking notification as read:', error);
            toast.error('Failed to mark notification as read');
        }
    };

    const getIcon = (type) => {
        switch (type) {
            case 'success':
                return <CheckCircle className="w-5 h-5 text-green-600" />;
            case 'warning':
                return <AlertTriangle className="w-5 h-5 text-yellow-600" />;
            case 'error':
                return <AlertCircle className="w-5 h-5 text-red-600" />;
            case 'info':
            default:
                return <Info className="w-5 h-5 text-blue-600" />;
        }
    };

    const getCategoryIcon = (category) => {
        switch (category) {
            case 'account':
                return <Settings className="w-4 h-4" />;
            case 'billing':
                return <Star className="w-4 h-4" />;
            case 'marketing':
                return <Package className="w-4 h-4" />;
            case 'system':
                return <Settings className="w-4 h-4" />;
            case 'feature':
                return <Star className="w-4 h-4" />;
            case 'general':
            default:
                return <Info className="w-4 h-4" />;
        }
    };

    const formatTimestamp = (timestamp) => {
        const date = new Date(timestamp);
        const now = new Date();
        const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
        
        if (diffInHours < 1) {
            return 'Just now';
        } else if (diffInHours < 24) {
            return `${diffInHours} hours ago`;
        } else {
            return date.toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });
        }
    };

    const isUnread = (notification) => {
        return !notification.readBy || notification.readBy.length === 0;
    };

    const getPriorityColor = (priority) => {
        switch (priority) {
            case 'high':
                return 'border-l-red-500';
            case 'medium':
                return 'border-l-yellow-500';
            case 'low':
            default:
                return 'border-l-blue-500';
        }
    };

    const filteredNotifications = filter === 'all' 
        ? notifications 
        : notifications.filter(n => isUnread(n));

    if (loading && notifications.length === 0) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 py-8">
                <div className="max-w-4xl mx-auto px-4">
                    <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-green-100">
                        <div className="bg-gradient-to-r from-green-600 to-green-700 px-6 py-4">
                            <div className="flex items-center space-x-2">
                                <Bell className="w-6 h-6 text-white" />
                                <h1 className="text-2xl font-bold text-white">Notifications</h1>
                            </div>
                        </div>
                        <div className="flex items-center justify-center py-12">
                            <div className="w-8 h-8 border-4 border-green-600 border-t-transparent rounded-full animate-spin"></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 py-8">
            <div className="max-w-4xl mx-auto px-4">
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-green-100">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-green-600 to-green-700 px-6 py-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                                <Bell className="w-6 h-6 text-white" />
                                <h1 className="text-2xl font-bold text-white">Notifications</h1>
                            </div>
                            <div className="flex items-center space-x-2">
                                <button
                                    onClick={() => setFilter('all')}
                                    className={`px-3 py-1 rounded-full text-sm transition-colors ${
                                        filter === 'all'
                                            ? 'bg-white text-green-700'
                                            : 'bg-green-500 bg-opacity-30 text-white hover:bg-opacity-50'
                                    }`}
                                >
                                    All
                                </button>
                                <button
                                    onClick={() => setFilter('unread')}
                                    className={`px-3 py-1 rounded-full text-sm transition-colors ${
                                        filter === 'unread'
                                            ? 'bg-white text-green-700'
                                            : 'bg-green-500 bg-opacity-30 text-white hover:bg-opacity-50'
                                    }`}
                                >
                                    Unread
                                </button>
                                <button
                                    onClick={fetchNotifications}
                                    className="p-2 bg-green-500 bg-opacity-30 text-white rounded-full hover:bg-opacity-50 transition-colors"
                                    title="Refresh"
                                >
                                    <RefreshCw className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Notifications List */}
                    <div className="divide-y divide-green-100">
                        {loading ? (
                            <div className="flex items-center justify-center py-8">
                                <div className="w-6 h-6 border-4 border-green-600 border-t-transparent rounded-full animate-spin"></div>
                            </div>
                        ) : filteredNotifications.length === 0 ? (
                            <div className="text-center py-12">
                                <Bell className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                                <h3 className="text-lg font-medium text-gray-900 mb-2">
                                    {filter === 'unread' ? 'No unread notifications' : 'No notifications'}
                                </h3>
                                <p className="text-gray-500">
                                    {filter === 'unread' 
                                        ? 'All caught up! Check back later for new updates.' 
                                        : 'You\'ll see notifications here when they arrive.'}
                                </p>
                            </div>
                        ) : (
                            <AnimatePresence>
                                {filteredNotifications.map((notification) => (
                                    <motion.div
                                        key={notification._id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        className={`p-6 hover:bg-green-50 transition-colors border-l-4 ${
                                            getPriorityColor(notification.priority)
                                        } ${
                                            isUnread(notification) ? 'bg-green-50' : 'bg-white'
                                        }`}
                                    >
                                        <div className="flex items-start space-x-4">
                                            <div className="flex-shrink-0">
                                                {getIcon(notification.type)}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center justify-between">
                                                    <p className="text-sm font-medium text-gray-900">
                                                        {notification.title}
                                                    </p>
                                                    <div className="flex items-center space-x-2">
                                                        <span className="flex items-center text-xs text-gray-500">
                                                            <Clock className="w-3 h-3 mr-1" />
                                                            {formatTimestamp(notification.createdAt)}
                                                        </span>
                                                    </div>
                                                </div>
                                                <p className="mt-1 text-sm text-gray-600">
                                                    {notification.message}
                                                </p>
                                                <div className="mt-2 flex items-center justify-between">
                                                    <div className="flex items-center space-x-2">
                                                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                                            {getCategoryIcon(notification.category)}
                                                            <span className="ml-1">{notification.category}</span>
                                                        </span>
                                                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                                                            notification.priority === 'high' ? 'bg-red-100 text-red-800' :
                                                            notification.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                                                            'bg-gray-100 text-gray-800'
                                                        }`}>
                                                            {notification.priority}
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        {notification.metadata?.actionUrl && notification.metadata?.actionText && (
                                                            <a
                                                                href={notification.metadata.actionUrl}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="inline-flex items-center text-xs text-green-600 hover:text-green-700"
                                                            >
                                                                {notification.metadata.actionText}
                                                                <ExternalLink className="w-3 h-3 ml-1" />
                                                            </a>
                                                        )}
                                                        {isUnread(notification) && (
                                                            <button
                                                                onClick={() => markAsRead(notification._id)}
                                                                className="text-xs text-green-600 hover:text-green-700"
                                                            >
                                                                Mark as read
                                                            </button>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        )}
                    </div>

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="px-6 py-4 border-t border-green-100 bg-gray-50">
                            <div className="flex items-center justify-between">
                                <p className="text-sm text-gray-700">
                                    Page {page} of {totalPages}
                                </p>
                                <div className="flex space-x-2">
                                    <button
                                        onClick={() => setPage(page - 1)}
                                        disabled={page === 1}
                                        className="px-3 py-1 text-sm border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
                                    >
                                        Previous
                                    </button>
                                    <button
                                        onClick={() => setPage(page + 1)}
                                        disabled={page === totalPages}
                                        className="px-3 py-1 text-sm border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
                                    >
                                        Next
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Notifications; 