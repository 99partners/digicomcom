import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import axiosInstance, { getApiUrl } from '../../config/api.config';
import { useAuth } from '../../context/AuthContext';

const PartnerUserForm = ({ user, onSubmit, onCancel }) => {
    const navigate = useNavigate();
    const { isAuthenticated, loading } = useAuth();
    const [formData, setFormData] = useState({
        serviceType: user?.serviceType || 'ams',
        companyName: user?.companyName || '',
        businessType: user?.businessType || '',
        website: user?.website || '',
        marketplaces: user?.marketplaces || [],
        monthlyOrders: user?.monthlyOrders || '',
        monthlyRevenue: user?.monthlyRevenue || '',
        productCategories: user?.productCategories || [],
        marketingBudget: user?.marketingBudget || '',
        targetAudience: user?.targetAudience || '',
        brandGuidelines: user?.brandGuidelines || false,
        platformPreference: user?.platformPreference || [],
        integrationNeeds: user?.integrationNeeds || [],
        additionalNotes: user?.additionalNotes || ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        // Redirect to login if not authenticated
        if (!loading && !isAuthenticated) {
            toast.error('Please login to create a request');
            navigate('/partnerlogin');
        }
    }, [isAuthenticated, loading, navigate]);

    const serviceTypes = [
        { id: 'ams', label: 'AMS (Account Management Services)' },
        { id: 'platform', label: 'Platform Enablement' },
        { id: 'cobranding', label: 'Co-Branding' },
        { id: 'marketing', label: 'Marketing' }
    ];

    const marketplaceOptions = [
        'Amazon', 'Flipkart', 'Meesho', 'JioMart', 'Other'
    ];

    const businessTypes = [
        'Manufacturer', 'Retailer', 'Wholesaler', 'Brand Owner', 'Distributor', 'Other'
    ];

    const platformOptions = [
        'Shopify', 'WooCommerce', 'Magento', 'Custom Solution', 'Other'
    ];

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        
        if (type === 'checkbox') {
            if (name === 'marketplaces' || name === 'productCategories' || name === 'platformPreference' || name === 'integrationNeeds') {
                setFormData(prev => ({
                    ...prev,
                    [name]: checked 
                        ? [...prev[name], value]
                        : prev[name].filter(item => item !== value)
                }));
            } else {
                setFormData(prev => ({
                    ...prev,
                    [name]: checked
                }));
            }
        } else {
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        }
    };

    const renderAMSFields = () => (
        <>
            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Marketplaces</label>
                    <div className="grid grid-cols-2 gap-2">
                        {marketplaceOptions.map(marketplace => (
                            <label key={marketplace} className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    name="marketplaces"
                                    value={marketplace}
                                    checked={formData.marketplaces.includes(marketplace)}
                                    onChange={handleChange}
                                    className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                                />
                                <span className="text-sm text-gray-700">{marketplace}</span>
                            </label>
                        ))}
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Monthly Orders</label>
                    <select
                        name="monthlyOrders"
                        value={formData.monthlyOrders}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                    >
                        <option value="">Select range</option>
                        <option value="0-100">0-100</option>
                        <option value="101-500">101-500</option>
                        <option value="501-1000">501-1000</option>
                        <option value="1000+">1000+</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Monthly Revenue (INR)</label>
                    <select
                        name="monthlyRevenue"
                        value={formData.monthlyRevenue}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                    >
                        <option value="">Select range</option>
                        <option value="0-1L">0-1L</option>
                        <option value="1L-5L">1L-5L</option>
                        <option value="5L-10L">5L-10L</option>
                        <option value="10L+">10L+</option>
                    </select>
                </div>
            </div>
        </>
    );

    const renderPlatformFields = () => (
        <>
            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Current Platform</label>
                    <div className="grid grid-cols-2 gap-2">
                        {platformOptions.map(platform => (
                            <label key={platform} className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    name="platformPreference"
                                    value={platform}
                                    checked={formData.platformPreference.includes(platform)}
                                    onChange={handleChange}
                                    className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                                />
                                <span className="text-sm text-gray-700">{platform}</span>
                            </label>
                        ))}
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Integration Needs</label>
                    <div className="grid grid-cols-2 gap-2">
                        {['ERP', 'CRM', 'Accounting', 'Inventory', 'Shipping', 'Payment Gateway'].map(integration => (
                            <label key={integration} className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    name="integrationNeeds"
                                    value={integration}
                                    checked={formData.integrationNeeds.includes(integration)}
                                    onChange={handleChange}
                                    className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                                />
                                <span className="text-sm text-gray-700">{integration}</span>
                            </label>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );

    const renderCoBrandingFields = () => (
        <>
            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Brand Guidelines Available</label>
                    <label className="flex items-center space-x-2">
                        <input
                            type="checkbox"
                            name="brandGuidelines"
                            checked={formData.brandGuidelines}
                            onChange={handleChange}
                            className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                        />
                        <span className="text-sm text-gray-700">Yes, we have brand guidelines</span>
                    </label>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Target Audience</label>
                    <textarea
                        name="targetAudience"
                        value={formData.targetAudience}
                        onChange={handleChange}
                        rows="3"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                        placeholder="Describe your target audience"
                    />
                </div>
            </div>
        </>
    );

    const renderMarketingFields = () => (
        <>
            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Marketing Budget (Monthly)</label>
                    <select
                        name="marketingBudget"
                        value={formData.marketingBudget}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                    >
                        <option value="">Select budget range</option>
                        <option value="0-50K">0-50K</option>
                        <option value="50K-1L">50K-1L</option>
                        <option value="1L-5L">1L-5L</option>
                        <option value="5L+">5L+</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Product Categories</label>
                    <div className="grid grid-cols-2 gap-2">
                        {['Electronics', 'Fashion', 'Home & Kitchen', 'Beauty', 'Health', 'Other'].map(category => (
                            <label key={category} className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    name="productCategories"
                                    value={category}
                                    checked={formData.productCategories.includes(category)}
                                    onChange={handleChange}
                                    className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                                />
                                <span className="text-sm text-gray-700">{category}</span>
                            </label>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Check authentication before submitting
        if (!isAuthenticated) {
            toast.error('Please login to create a request');
            navigate('/partnerlogin');
            return;
        }

        if (isSubmitting) return;

        setIsSubmitting(true);
        try {
            console.log('Submitting form data:', formData);
            
            let response;
            if (user?._id) {
                response = await axiosInstance.put(`api/partner/users/${user._id}`, formData);
                console.log('Update response:', response.data);
                toast.success('Request updated successfully');
            } else {
                response = await axiosInstance.post('api/partner/users', formData);
                console.log('Create response:', response.data);
                toast.success('Request created successfully');
            }
            
            // Redirect based on service type
            if (formData.serviceType === 'ams') {
                navigate('/ams');
            } else {
            onSubmit();
            }
        } catch (error) {
            console.error('Full error details:', error);
            console.error('Error response:', error.response?.data);
            
            let errorMessage = 'Failed to save request. Please try again.';
            
            if (error.response) {
                if (error.response.status === 400) {
                    errorMessage = error.response.data?.message || 'Invalid request data';
                } else if (error.response.status === 401) {
                    errorMessage = 'Please log in again to continue';
                    navigate('/partnerlogin');
                } else if (error.response.status === 403) {
                    errorMessage = 'You do not have permission to perform this action';
                } else if (error.response.status === 500) {
                    errorMessage = 'Server error. Please try again later';
                }
            } else if (error.request) {
                errorMessage = 'No response from server. Please check your connection';
            } else {
                errorMessage = 'Error preparing request. Please try again';
            }
            
            toast.error(errorMessage);
        } finally {
            setIsSubmitting(false);
        }
    };

    // Show loading state while checking authentication
    if (loading) {
        return (
            <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center justify-center">
                    <div className="w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
            </div>
        );
    }

    // Don't render form if not authenticated
    if (!isAuthenticated) {
        return null;
    }

    return (
        <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">{user ? 'Edit Request' : 'Create Request'}</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Common Fields */}
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Company Name</label>
                        <input
                            type="text"
                            name="companyName"
                            value={formData.companyName}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Business Type</label>
                        <select
                            name="businessType"
                            value={formData.businessType}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                        >
                            <option value="">Select business type</option>
                            {businessTypes.map(type => (
                                <option key={type} value={type}>{type}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Website</label>
                        <input
                            type="url"
                            name="website"
                            value={formData.website}
                            onChange={handleChange}
                            placeholder="https://"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Service Type</label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {serviceTypes.map((service) => (
                            <div key={service.id} className="relative">
                                <input
                                    type="radio"
                                    name="serviceType"
                                    id={service.id}
                                    value={service.id}
                                    checked={formData.serviceType === service.id}
                                    onChange={handleChange}
                                    className="peer absolute opacity-0"
                                    required
                                />
                                <label
                                    htmlFor={service.id}
                                    className="block p-4 bg-white border rounded-lg cursor-pointer transition-colors peer-checked:border-purple-500 peer-checked:bg-purple-50 hover:bg-gray-50"
                                >
                                    <div className="font-medium text-gray-900">{service.label}</div>
                                </label>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Service-specific fields */}
                <div className="mt-6 border-t pt-6">
                    {formData.serviceType === 'ams' && renderAMSFields()}
                    {formData.serviceType === 'platform' && renderPlatformFields()}
                    {formData.serviceType === 'cobranding' && renderCoBrandingFields()}
                    {formData.serviceType === 'marketing' && renderMarketingFields()}
                </div>

                {/* Additional Notes */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Additional Notes</label>
                    <textarea
                        name="additionalNotes"
                        value={formData.additionalNotes}
                        onChange={handleChange}
                        rows="4"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                        placeholder="Any additional information you'd like to share..."
                    />
                </div>

                <div className="flex justify-end space-x-3 mt-6">
                    <button
                        type="button"
                        onClick={onCancel}
                        className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                        disabled={isSubmitting}
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Submitting...' : (user ? 'Update' : 'Create')}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default PartnerUserForm; 