import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Search, Filter, ChevronDown, RefreshCcw, ExternalLink } from 'lucide-react';
import { getApiUrl } from '../../config/api.config';

const CoBrandingSubmissions = () => {
    const [applications, setApplications] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [filter, setFilter] = useState('all');

    useEffect(() => {
        fetchApplications();
    }, []);

    const fetchApplications = async () => {
        try {
            const response = await axios.get(getApiUrl('api/co-branding/applications'), {
                withCredentials: true
            });
            setApplications(response.data.data);
            setIsLoading(false);
        } catch (error) {
            console.error('Error fetching applications:', error);
            toast.error('Failed to fetch co-branding applications');
            setIsLoading(false);
        }
    };

    const filteredApplications = applications.filter(app => {
        const matchesSearch = searchTerm === '' || 
            app.brandName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            app.businessType.toLowerCase().includes(searchTerm.toLowerCase()) ||
            app.productCategories.some(cat => cat.toLowerCase().includes(searchTerm.toLowerCase()));
        return matchesSearch;
    });

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-32">
                <div className="w-8 h-8 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold text-gray-800">Co-Branding Applications</h2>
                <button 
                    onClick={fetchApplications}
                    className="flex items-center gap-2 px-4 py-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100"
                >
                    <RefreshCcw className="h-4 w-4" />
                    Refresh
                </button>
            </div>

            {/* Search */}
            <div className="flex flex-wrap gap-4 mb-6">
                <div className="flex-1 min-w-[200px]">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search by brand name, business type, or categories..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        />
                    </div>
                </div>
            </div>

            {/* Applications List */}
            <div className="space-y-4">
                {filteredApplications.length === 0 ? (
                    <p className="text-center text-gray-500 py-8">No applications found</p>
                ) : (
                    filteredApplications.map((app) => (
                        <div key={app._id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                            <div className="flex flex-wrap gap-4 justify-between items-start">
                                <div className="flex-1">
                                    <div className="flex items-center gap-3">
                                        <h3 className="text-lg font-semibold text-gray-800">{app.brandName}</h3>
                                        {app.website && (
                                            <a 
                                                href={app.website}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-green-600 hover:text-green-800 flex items-center gap-1 text-sm"
                                            >
                                                Visit Website
                                                <ExternalLink className="h-4 w-4" />
                                            </a>
                                        )}
                                    </div>

                                    {/* Business Details */}
                                    <div className="mt-2 space-y-1 text-sm text-gray-600">
                                        <p>
                                            <span className="font-medium">Business Type:</span>{' '}
                                            {app.businessType.charAt(0).toUpperCase() + app.businessType.slice(1)}
                                        </p>
                                        {app.registeredName && (
                                            <p>
                                                <span className="font-medium">Registered Name:</span>{' '}
                                                {app.registeredName}
                                            </p>
                                        )}
                                    </div>

                                    {/* Categories and Marketing Goals */}
                                    <div className="mt-4 space-y-3">
                                        <div>
                                            <p className="font-medium text-sm text-gray-700">Product Categories:</p>
                                            <div className="flex flex-wrap gap-2 mt-1">
                                                {app.productCategories.map((category, idx) => (
                                                    <span key={idx} className="px-2 py-1 bg-green-50 text-green-600 rounded text-xs">
                                                        {category}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                        <div>
                                            <p className="font-medium text-sm text-gray-700">Marketing Goals:</p>
                                            <div className="flex flex-wrap gap-2 mt-1">
                                                {app.marketingGoals.map((goal, idx) => (
                                                    <span key={idx} className="px-2 py-1 bg-blue-50 text-blue-600 rounded text-xs">
                                                        {goal}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Target Audience and Sales Volume */}
                                    <div className="mt-4 space-y-2">
                                        <p className="text-sm">
                                            <span className="font-medium">Target Audience:</span>{' '}
                                            {app.targetAudience}
                                        </p>
                                        {app.salesVolume && (
                                            <p className="text-sm">
                                                <span className="font-medium">Sales Volume:</span>{' '}
                                                {app.salesVolume === 'less-50k' ? 'Less than ₹50,000' :
                                                 app.salesVolume === '50k-2l' ? '₹50,000 – ₹2,00,000' :
                                                 app.salesVolume === '2l-5l' ? '₹2,00,000 – ₹5,00,000' :
                                                 app.salesVolume === '5l-plus' ? '₹5,00,000+' : app.salesVolume}
                                            </p>
                                        )}
                                    </div>

                                    {/* Social Media */}
                                    {app.socialMedia && (Object.values(app.socialMedia).some(val => val)) && (
                                        <div className="mt-4">
                                            <p className="font-medium text-sm text-gray-700">Social Media:</p>
                                            <div className="mt-1 space-y-1">
                                                {app.socialMedia.instagram && (
                                                    <a href={`https://instagram.com/${app.socialMedia.instagram.replace('@', '')}`}
                                                       target="_blank"
                                                       rel="noopener noreferrer"
                                                       className="block text-sm text-green-600 hover:text-green-800">
                                                        Instagram: {app.socialMedia.instagram}
                                                    </a>
                                                )}
                                                {app.socialMedia.facebook && (
                                                    <a href={app.socialMedia.facebook}
                                                       target="_blank"
                                                       rel="noopener noreferrer"
                                                       className="block text-sm text-green-600 hover:text-green-800">
                                                        Facebook Page
                                                    </a>
                                                )}
                                                {app.socialMedia.youtube && (
                                                    <a href={app.socialMedia.youtube}
                                                       target="_blank"
                                                       rel="noopener noreferrer"
                                                       className="block text-sm text-green-600 hover:text-green-800">
                                                        YouTube Channel
                                                    </a>
                                                )}
                                            </div>
                                        </div>
                                    )}

                                    {/* Additional Notes */}
                                    {app.additionalNotes && (
                                        <div className="mt-4">
                                            <p className="font-medium text-sm text-gray-700">Additional Notes:</p>
                                            <p className="mt-1 text-sm text-gray-600">{app.additionalNotes}</p>
                                        </div>
                                    )}
                                </div>

                                {/* Submission Info */}
                                <div className="min-w-[200px] text-right">
                                    <p className="text-xs text-gray-500">
                                        Submitted: {new Date(app.submittedAt).toLocaleDateString()}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default CoBrandingSubmissions; 