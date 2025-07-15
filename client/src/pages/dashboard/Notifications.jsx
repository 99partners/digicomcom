import React, { useState } from 'react';
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
    Star
} from 'lucide-react';

const Notifications = () => {
    const [notifications, setNotifications] = useState([
        {
            id: 1,
            type: 'success',
            title: 'Application Approved',
            message: 'Your platform enablement application has been approved. You can now access all features.',
            timestamp: '2024-03-10T10:30:00',
            read: false,
            category: 'account'
        },
        {
            id: 2,
            type: 'info',
            title: 'New Feature Available',
            message: 'Try our new co-branding tools to enhance your marketplace presence.',
            timestamp: '2024-03-09T15:45:00',
            read: true,
            category: 'feature'
        },
        {
            id: 3,
            type: 'warning',
            title: 'Plan Expiring Soon',
            message: 'Your current plan will expire in 7 days. Renew now to avoid service interruption.',
            timestamp: '2024-03-08T09:15:00',
            read: false,
            category: 'billing'
        },
        {
            id: 4,
            type: 'success',
            title: 'Campaign Performance',
            message: 'Your recent marketing campaign exceeded target metrics by 25%.',
            timestamp: '2024-03-07T14:20:00',
            read: true,
            category: 'marketing'
        },
        {
            id: 5,
            type: 'info',
            title: 'Platform Update',
            message: 'New ONDC integration features will be available next week.',
            timestamp: '2024-03-06T11:00:00',
            read: false,
            category: 'system'
        }
    ]);

    const [filter, setFilter] = useState('all');

    const getIcon = (type) => {
        switch (type) {
            case 'success':
                return <CheckCircle className="w-5 h-5 text-green-600" />;
            case 'warning':
                return <AlertCircle className="w-5 h-5 text-yellow-600" />;
            case 'info':
                return <Info className="w-5 h-5 text-blue-600" />;
            default:
                return <Bell className="w-5 h-5 text-gray-600" />;
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
            default:
                return <Info className="w-4 h-4" />;
        }
    };

    const formatTimestamp = (timestamp) => {
        const date = new Date(timestamp);
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const markAsRead = (id) => {
        setNotifications(notifications.map(notif =>
            notif.id === id ? { ...notif, read: true } : notif
        ));
    };

    const filteredNotifications = filter === 'all' 
        ? notifications 
        : notifications.filter(n => !n.read);

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
                                    className={`px-3 py-1 rounded-full text-sm ${
                                        filter === 'all'
                                            ? 'bg-white text-green-700'
                                            : 'bg-green-500 bg-opacity-30 text-white'
                                    }`}
                                >
                                    All
                                </button>
                                <button
                                    onClick={() => setFilter('unread')}
                                    className={`px-3 py-1 rounded-full text-sm ${
                                        filter === 'unread'
                                            ? 'bg-white text-green-700'
                                            : 'bg-green-500 bg-opacity-30 text-white'
                                    }`}
                                >
                                    Unread
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Notifications List */}
                    <div className="divide-y divide-green-100">
                        <AnimatePresence>
                            {filteredNotifications.map((notification) => (
                                <motion.div
                                    key={notification.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    className={`p-4 hover:bg-green-50 transition-colors ${
                                        !notification.read ? 'bg-green-50' : 'bg-white'
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
                                                        {formatTimestamp(notification.timestamp)}
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
                                                </div>
                                                {!notification.read && (
                                                    <button
                                                        onClick={() => markAsRead(notification.id)}
                                                        className="text-xs text-green-600 hover:text-green-700"
                                                    >
                                                        Mark as read
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Notifications; 