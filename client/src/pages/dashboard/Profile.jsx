import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { motion } from 'framer-motion';
import { 
    Mail, 
    Phone, 
    User, 
    Crown, 
    CheckCircle, 
    Calendar,
    MapPin,
    Building,
    Globe,
    Shield,
    Edit
} from 'lucide-react';

const Profile = () => {
    const { user } = useAuth();

    const formatDate = (date) => {
        if (!date) return 'N/A';
        return new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const ProfileSection = ({ title, children }) => (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-sm overflow-hidden"
        >
            <div className="px-6 py-4 bg-gradient-to-r from-green-50 to-emerald-50 border-b border-green-100">
                <h2 className="text-lg font-semibold text-green-800">{title}</h2>
            </div>
            <div className="p-6">{children}</div>
        </motion.div>
    );

    const InfoItem = ({ icon: Icon, label, value, verified }) => (
        <motion.div 
            whileHover={{ scale: 1.01 }}
            className="flex items-start space-x-3 p-3 rounded-lg hover:bg-green-50/50 transition-all duration-200"
        >
            <div className="flex-shrink-0">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-100 to-emerald-100 flex items-center justify-center">
                    <Icon className="h-5 w-5 text-green-600" />
                </div>
            </div>
            <div className="flex-1">
                <p className="text-sm font-medium text-gray-500">{label}</p>
                <div className="flex items-center mt-1">
                    <p className="text-base text-gray-700">{value || 'Not provided'}</p>
                    {verified && (
                        <span className="ml-2 flex items-center text-green-600 text-sm">
                            <CheckCircle size={14} className="mr-1" />
                            Verified
                        </span>
                    )}
                </div>
            </div>
        </motion.div>
    );

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50/50 py-8">
            <div className="max-w-7xl mx-auto px-4">
                {/* Profile Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-2xl shadow-sm overflow-hidden mb-8"
                >
                    <div className="bg-gradient-to-r from-green-100 to-emerald-100 px-8 py-10 relative">
                        <div className="relative z-10 flex items-center justify-between">
                            <div className="flex items-center">
                                <motion.div 
                                    whileHover={{ scale: 1.05 }}
                                    className="relative group"
                                >
                                    <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-md">
                                        <span className="text-3xl font-bold text-green-600">
                                            {user?.name?.charAt(0) || 'U'}
                                        </span>
                                    </div>
                                    <button className="absolute bottom-0 right-0 bg-white rounded-full p-2 shadow-md opacity-0 group-hover:opacity-100 transition-opacity">
                                        <Edit size={16} className="text-green-600" />
                                    </button>
                                </motion.div>
                                <div className="ml-6">
                                    <h1 className="text-3xl font-bold text-gray-800 mb-2">
                                        {user?.name || 'Partner'}
                                    </h1>
                                    <div className="flex items-center space-x-4">
                                        <span className="px-3 py-1 bg-white/80 rounded-full text-green-700 text-sm flex items-center">
                                            <Crown size={16} className="mr-1" />
                                            {user?.plan || 'Free Plan'}
                                        </span>
                                        <span className="px-3 py-1 bg-white/80 rounded-full text-green-700 text-sm flex items-center">
                                            <Calendar size={16} className="mr-1" />
                                            Joined {formatDate(user?.createdAt)}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                className="px-4 py-2 bg-white text-green-700 rounded-lg shadow-sm hover:shadow transition-all duration-200"
                            >
                                Edit Profile
                            </motion.button>
                        </div>
                    </div>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-8">
                        {/* Contact Information */}
                        <ProfileSection title="Contact Information">
                            <div className="space-y-4">
                                <InfoItem
                                    icon={Mail}
                                    label="Email Address"
                                    value={user?.email}
                                    verified={user?.emailVerified}
                                />
                                <InfoItem
                                    icon={Phone}
                                    label="Phone Number"
                                    value={user?.phone}
                                />
                            </div>
                        </ProfileSection>

                        {/* Account Information */}
                        <ProfileSection title="Account Information">
                            <div className="space-y-4">
                                <InfoItem
                                    icon={Shield}
                                    label="Account Status"
                                    value="Active"
                                />
                                <InfoItem
                                    icon={Crown}
                                    label="Subscription Plan"
                                    value={user?.plan || 'Free Plan'}
                                />
                                <InfoItem
                                    icon={Calendar}
                                    label="Member Since"
                                    value={formatDate(user?.createdAt)}
                                />
                            </div>
                        </ProfileSection>
                    </div>

                    <div className="space-y-8">
                        {/* Business Information */}
                        <ProfileSection title="Business Information">
                            <div className="space-y-4">
                                <InfoItem
                                    icon={Building}
                                    label="Company Name"
                                    value={user?.companyName}
                                />
                                <InfoItem
                                    icon={Globe}
                                    label="Website"
                                    value={user?.website}
                                />
                                <InfoItem
                                    icon={MapPin}
                                    label="Location"
                                    value={user?.location}
                                />
                            </div>
                        </ProfileSection>

                        {/* Additional Section for Future Use */}
                        <ProfileSection title="Preferences">
                            <div className="space-y-4">
                                <InfoItem
                                    icon={User}
                                    label="Language"
                                    value="English"
                                />
                                <InfoItem
                                    icon={Globe}
                                    label="Time Zone"
                                    value="UTC+05:30"
                                />
                            </div>
                        </ProfileSection>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile; 