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
        marketplaces: user?.marketplaces || [],
        serviceAccountNumber: user?.serviceAccountNumber || '',
        hasGST: user?.hasGST || 'no',
        gstNumber: user?.gstNumber || '',
        monthlyOnlineSales: user?.monthlyOnlineSales || '',
        marketingServices: {
            sponsoredAds: false,
            seasonalCampaigns: false,
            platformPromotions: false,
            socialMediaPromotions: false,
            creativeDesign: false,
            platformSpecificAds: false
        },
        isManufacturer: false,
        yearEstablished: '',
        numberOfProducts: '',
        productUSP: '',
        productCategory: '',
        productDescription: '',
        panNumber: '',
        additionalNotes: user?.additionalNotes || ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [gstError, setGstError] = useState('');
    const [errors, setErrors] = useState({});

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
        'ONDC', 'Amazon', 'Flipkart', 'Meesho', 'JioMart', 'IndiaMART', 'Snapdeal'
    ];

    const platformOptions = [
        'Shopify', 'WooCommerce', 'Magento', 'Custom Solution', 'Other'
    ];

    const salesVolumeOptions = [
        { value: 'less-50k', label: 'Less than ₹50,000' },
        { value: '50k-2L', label: '₹50,000 – ₹2,00,000' },
        { value: '2L-5L', label: '₹2,00,000 – ₹5,00,000' },
        { value: '5L+', label: '₹5,00,000+' }
    ];

    const validateGST = (gstNumber) => {
        // GST format: 2 digits for state code, 10 digits for PAN, 1 digit for entity, 1 digit for check sum
        const gstRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
        return gstRegex.test(gstNumber);
    };

    const validatePAN = (pan) => {
        const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
        return panRegex.test(pan);
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        
        if (type === 'checkbox') {
            if (name === 'marketplaces') {
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
        } else if (name === 'gstNumber') {
            const gstValue = value.toUpperCase();
            if (gstValue === '' || validateGST(gstValue)) {
                setGstError('');
            } else {
                setGstError('Please enter a valid GST number');
            }
            setFormData(prev => ({
                ...prev,
                [name]: gstValue
            }));
        } else if (name === 'panNumber') {
            setFormData(prev => ({
                ...prev,
                panNumber: value.toUpperCase()
            }));

            if (value && !validatePAN(value)) {
                setErrors(prev => ({
                    ...prev,
                    panNumber: 'Invalid PAN number format. It should be in format: ABCDE1234F'
                }));
            } else {
                setErrors(prev => {
                    const newErrors = { ...prev };
                    delete newErrors.panNumber;
                    return newErrors;
                });
            }
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    const handleMarketingServiceChange = (service) => {
        setFormData(prev => ({
            ...prev,
            marketingServices: {
                ...prev.marketingServices,
                [service]: !prev.marketingServices[service]
            }
        }));
    };

    const renderAMSFields = () => (
        <>
            <div className="space-y-4 px-4">
                <div className="bg-gray-50 p-6 rounded-lg">
                    <label className="block text-sm font-medium text-gray-700 mb-4">Marketplaces</label>
                    <div className="grid grid-cols-2 gap-4">
                        {marketplaceOptions.map(marketplace => (
                            <label key={marketplace} className="flex items-center space-x-3 p-3 bg-white rounded-md border border-gray-200 hover:border-purple-500 transition-colors">
                                <input
                                    type="checkbox"
                                    name="marketplaces"
                                    value={marketplace}
                                    checked={formData.marketplaces.includes(marketplace)}
                                    onChange={handleChange}
                                    className="w-4 h-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                                />
                                <span className="text-sm text-gray-700">{marketplace}</span>
                            </label>
                        ))}
                    </div>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg">
                    <label className="block text-sm font-medium text-gray-700 mb-4">Service Account Number</label>
                    <input
                        type="text"
                        name="serviceAccountNumber"
                        value={formData.serviceAccountNumber}
                        onChange={handleChange}
                        placeholder="Enter your service account number"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 p-3"
                    />
                </div>

                <div className="bg-gray-50 p-6 rounded-lg">
                    <label className="block text-sm font-medium text-gray-700 mb-4">Do you have GST number?</label>
                    <div className="flex space-x-6 mb-4">
                        <label className="flex items-center space-x-3 p-3 bg-white rounded-md border border-gray-200 hover:border-purple-500 transition-colors">
                            <input
                                type="radio"
                                name="hasGST"
                                value="yes"
                                checked={formData.hasGST === 'yes'}
                                onChange={handleChange}
                                className="w-4 h-4 text-purple-600 focus:ring-purple-500"
                            />
                            <span className="text-sm text-gray-700">Yes</span>
                        </label>
                        <label className="flex items-center space-x-3 p-3 bg-white rounded-md border border-gray-200 hover:border-purple-500 transition-colors">
                            <input
                                type="radio"
                                name="hasGST"
                                value="no"
                                checked={formData.hasGST === 'no'}
                                onChange={handleChange}
                                className="w-4 h-4 text-purple-600 focus:ring-purple-500"
                            />
                            <span className="text-sm text-gray-700">No</span>
                        </label>
                    </div>

                    {formData.hasGST === 'yes' && (
                        <div className="mt-4">
                            <label className="block text-sm font-medium text-gray-700 mb-2">GST Number</label>
                            <input
                                type="text"
                                name="gstNumber"
                                value={formData.gstNumber}
                                onChange={handleChange}
                                placeholder="Enter your GST number"
                                className={`mt-1 block w-full rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 p-3 ${
                                    gstError ? 'border-red-300 bg-red-50' : 'border-gray-300'
                                }`}
                            />
                            {gstError && (
                                <p className="mt-2 text-sm text-red-600">{gstError}</p>
                            )}
                        </div>
                    )}
                </div>

                <div className="bg-gray-50 p-6 rounded-lg">
                    <label className="block text-sm font-medium text-gray-700 mb-4">Monthly Online Sales Volume (Optional)</label>
                    <select
                        name="monthlyOnlineSales"
                        value={formData.monthlyOnlineSales}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 p-3"
                    >
                        <option value="">Select sales volume</option>
                        {salesVolumeOptions.map(option => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
        </>
    );

    const renderPlatformFields = () => (
        <>
            <div className="space-y-4 px-4">
                <div className="bg-gray-50 p-6 rounded-lg">
                    <label className="block text-sm font-medium text-gray-700 mb-4">Marketplaces</label>
                    <div className="grid grid-cols-2 gap-4">
                        {marketplaceOptions.map(marketplace => (
                            <label key={marketplace} className="flex items-center space-x-3 p-3 bg-white rounded-md border border-gray-200 hover:border-purple-500 transition-colors">
                                <input
                                    type="checkbox"
                                    name="marketplaces"
                                    value={marketplace}
                                    checked={formData.marketplaces.includes(marketplace)}
                                    onChange={handleChange}
                                    className="w-4 h-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                                />
                                <span className="text-sm text-gray-700">{marketplace}</span>
                            </label>
                        ))}
                    </div>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg">
                    <label className="block text-sm font-medium text-gray-700 mb-4">Do you have GST number?</label>
                    <div className="flex space-x-6 mb-4">
                        <label className="flex items-center space-x-3 p-3 bg-white rounded-md border border-gray-200 hover:border-purple-500 transition-colors">
                            <input
                                type="radio"
                                name="hasGST"
                                value="yes"
                                checked={formData.hasGST === 'yes'}
                                onChange={handleChange}
                                className="w-4 h-4 text-purple-600 focus:ring-purple-500"
                            />
                            <span className="text-sm text-gray-700">Yes</span>
                        </label>
                        <label className="flex items-center space-x-3 p-3 bg-white rounded-md border border-gray-200 hover:border-purple-500 transition-colors">
                            <input
                                type="radio"
                                name="hasGST"
                                value="no"
                                checked={formData.hasGST === 'no'}
                                onChange={handleChange}
                                className="w-4 h-4 text-purple-600 focus:ring-purple-500"
                            />
                            <span className="text-sm text-gray-700">No</span>
                        </label>
                    </div>

                    {formData.hasGST === 'yes' && (
                        <div className="mt-4">
                            <label className="block text-sm font-medium text-gray-700 mb-2">GST Number</label>
                            <input
                                type="text"
                                name="gstNumber"
                                value={formData.gstNumber}
                                onChange={handleChange}
                                placeholder="Enter your GST number"
                                className={`mt-1 block w-full rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 p-3 ${
                                    gstError ? 'border-red-300 bg-red-50' : 'border-gray-300'
                                }`}
                            />
                            {gstError && (
                                <p className="mt-2 text-sm text-red-600">{gstError}</p>
                            )}
                        </div>
                    )}
                </div>

                <div className="bg-gray-50 p-6 rounded-lg">
                    <label className="block text-sm font-medium text-gray-700 mb-4">Monthly Online Sales Volume (Optional)</label>
                    <select
                        name="monthlyOnlineSales"
                        value={formData.monthlyOnlineSales}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 p-3"
                    >
                        <option value="">Select sales volume</option>
                        {salesVolumeOptions.map(option => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
        </>
    );

    const renderCoBrandingFields = () => (
        <>
            <div className="space-y-4 px-4">
                {/* Manufacturer Checkbox */}
                <div className="bg-gray-50 p-6 rounded-lg">
                    <div className="flex items-center mb-4">
                        <input
                            type="checkbox"
                            id="isManufacturer"
                            checked={formData.isManufacturer}
                            onChange={(e) => setFormData(prev => ({
                                ...prev,
                                isManufacturer: e.target.checked
                            }))}
                            className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                        <label htmlFor="isManufacturer" className="ml-2 text-sm font-medium text-gray-900">
                            Are you a Manufacturer?
                        </label>
                    </div>

                    {formData.isManufacturer && (
                        <div className="space-y-4">
                            {/* Year of Establishment */}
                            <div>
                                <label htmlFor="yearEstablished" className="block text-sm font-medium text-gray-700 mb-2">
                                    Year of Establishment
                                </label>
                                <input
                                    type="number"
                                    id="yearEstablished"
                                    name="yearEstablished"
                                    value={formData.yearEstablished}
                                    onChange={handleChange}
                                    min="1900"
                                    max={new Date().getFullYear()}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                    required
                                />
                            </div>

                            {/* Number of Products */}
                            <div>
                                <label htmlFor="numberOfProducts" className="block text-sm font-medium text-gray-700 mb-2">
                                    Number of Products
                                </label>
                                <input
                                    type="number"
                                    id="numberOfProducts"
                                    name="numberOfProducts"
                                    value={formData.numberOfProducts}
                                    onChange={handleChange}
                                    min="1"
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                    required
                                />
                            </div>

                            {/* Product Category */}
                            <div>
                                <label htmlFor="productCategory" className="block text-sm font-medium text-gray-700 mb-2">
                                    Product Category
                                </label>
                                <select
                                    id="productCategory"
                                    name="productCategory"
                                    value={formData.productCategory}
                                    onChange={handleChange}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                    required
                                >
                                    <option value="">Select a category</option>
                                    <option value="electronics">Electronics</option>
                                    <option value="fashion">Fashion</option>
                                    <option value="home">Home & Kitchen</option>
                                    <option value="beauty">Beauty & Personal Care</option>
                                    <option value="health">Health & Wellness</option>
                                    <option value="food">Food & Beverages</option>
                                    <option value="toys">Toys & Games</option>
                                    <option value="sports">Sports & Fitness</option>
                                    <option value="automotive">Automotive</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>

                            {/* Product USP */}
                            <div>
                                <label htmlFor="productUSP" className="block text-sm font-medium text-gray-700 mb-2">
                                    Product USP (Unique Selling Proposition)
                                </label>
                                <textarea
                                    id="productUSP"
                                    name="productUSP"
                                    value={formData.productUSP}
                                    onChange={handleChange}
                                    rows={3}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                    placeholder="What makes your products unique?"
                                    required
                                />
                            </div>

                            {/* Product Description */}
                            <div>
                                <label htmlFor="productDescription" className="block text-sm font-medium text-gray-700 mb-2">
                                    Product Description
                                </label>
                                <textarea
                                    id="productDescription"
                                    name="productDescription"
                                    value={formData.productDescription}
                                    onChange={handleChange}
                                    rows={4}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                    placeholder="Describe your products in detail..."
                                    required
                                />
                            </div>

                            {/* PAN Number */}
                            <div>
                                <label htmlFor="panNumber" className="block text-sm font-medium text-gray-700 mb-2">
                                    PAN Number
                                </label>
                                <input
                                    type="text"
                                    id="panNumber"
                                    name="panNumber"
                                    value={formData.panNumber}
                                    onChange={handleChange}
                                    className={`mt-1 block w-full rounded-md shadow-sm sm:text-sm ${
                                        errors.panNumber 
                                            ? 'border-red-300 focus:border-red-500 focus:ring-red-500' 
                                            : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
                                    }`}
                                    placeholder="ABCDE1234F"
                                    maxLength={10}
                                    required
                                />
                                {errors.panNumber && (
                                    <p className="mt-1 text-sm text-red-600">{errors.panNumber}</p>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );

    const renderMarketingFields = () => (
        <>
            <div className="space-y-4 px-4">
                {/* Marketplaces Section */}
                <div className="bg-gray-50 p-6 rounded-lg">
                    <label className="block text-sm font-medium text-gray-700 mb-4">Marketplaces</label>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {['ONDC', 'Amazon', 'Flipkart', 'Meesho', 'JioMart', 'IndiaMART', 'Snapdeal'].map((marketplace) => (
                            <div key={marketplace} className="flex items-center">
                                <input
                                    type="checkbox"
                                    id={`marketplace-${marketplace}`}
                                    name="marketplaces"
                                    value={marketplace}
                                    checked={formData.marketplaces.includes(marketplace)}
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        setFormData(prev => ({
                                            ...prev,
                                            marketplaces: e.target.checked
                                                ? [...prev.marketplaces, value]
                                                : prev.marketplaces.filter(m => m !== value)
                                        }));
                                    }}
                                    className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                />
                                <label htmlFor={`marketplace-${marketplace}`} className="ml-2 text-sm text-gray-700">
                                    {marketplace}
                                </label>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Marketing Services Section */}
                <div className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">What We Offer</h3>
                    
                    {/* Sponsored Ad Campaigns */}
                    <div className="mb-6">
                        <div className="flex items-center mb-2">
                            <input
                                type="checkbox"
                                id="sponsoredAds"
                                checked={formData.marketingServices.sponsoredAds}
                                onChange={() => handleMarketingServiceChange('sponsoredAds')}
                                className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                            />
                            <label htmlFor="sponsoredAds" className="ml-2 text-sm font-medium text-gray-900">
                                Sponsored Ad Campaigns (PPC)
                            </label>
                        </div>
                        <ul className="ml-6 text-sm text-gray-600 space-y-1">
                            <li>• Create and manage product ads on Amazon, Flipkart, Meesho, Jiomart, and more</li>
                            <li>• Keyword research and targeting</li>
                            <li>• Ad budget optimization for maximum ROI</li>
                            <li>• A/B testing and performance tracking</li>
                        </ul>
                    </div>

                    {/* Seasonal & Festival Campaigns */}
                    <div className="mb-6">
                        <div className="flex items-center mb-2">
                            <input
                                type="checkbox"
                                id="seasonalCampaigns"
                                checked={formData.marketingServices.seasonalCampaigns}
                                onChange={() => handleMarketingServiceChange('seasonalCampaigns')}
                                className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                            />
                            <label htmlFor="seasonalCampaigns" className="ml-2 text-sm font-medium text-gray-900">
                                Seasonal & Festival Campaigns
                            </label>
                        </div>
                        <ul className="ml-6 text-sm text-gray-600 space-y-1">
                            <li>• Diwali, Holi, Republic Day, New Year, Raksha Bandhan, etc.</li>
                            <li>• Custom promotions and product bundling</li>
                            <li>• Sale event calendar planning</li>
                        </ul>
                    </div>

                    {/* Platform-Specific Promotions */}
                    <div className="mb-6">
                        <div className="flex items-center mb-2">
                            <input
                                type="checkbox"
                                id="platformPromotions"
                                checked={formData.marketingServices.platformPromotions}
                                onChange={() => handleMarketingServiceChange('platformPromotions')}
                                className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                            />
                            <label htmlFor="platformPromotions" className="ml-2 text-sm font-medium text-gray-900">
                                Platform-Specific Promotions
                            </label>
                        </div>
                        <ul className="ml-6 text-sm text-gray-600 space-y-1">
                            <li>• Participation in Lightning Deals, Big Billion Day, Amazon Prime Day, etc.</li>
                            <li>• Exclusive offers and banner placements</li>
                            <li>• Pricing strategy for offer periods</li>
                        </ul>
                    </div>

                    {/* Social Media & Off-Platform Promotions */}
                    <div className="mb-6">
                        <div className="flex items-center mb-2">
                            <input
                                type="checkbox"
                                id="socialMediaPromotions"
                                checked={formData.marketingServices.socialMediaPromotions}
                                onChange={() => handleMarketingServiceChange('socialMediaPromotions')}
                                className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                            />
                            <label htmlFor="socialMediaPromotions" className="ml-2 text-sm font-medium text-gray-900">
                                Social Media & Off-Platform Promotions
                            </label>
                        </div>
                        <ul className="ml-6 text-sm text-gray-600 space-y-1">
                            <li>• Targeted ads on Meta (Facebook/Instagram), Google, YouTube</li>
                            <li>• Influencer collaborations & affiliate campaigns</li>
                            <li>• Landing pages & conversion tracking</li>
                        </ul>
                    </div>

                    {/* Creative & Content Design */}
                    <div className="mb-6">
                        <div className="flex items-center mb-2">
                            <input
                                type="checkbox"
                                id="creativeDesign"
                                checked={formData.marketingServices.creativeDesign}
                                onChange={() => handleMarketingServiceChange('creativeDesign')}
                                className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                            />
                            <label htmlFor="creativeDesign" className="ml-2 text-sm font-medium text-gray-900">
                                Creative & Content Design
                            </label>
                        </div>
                        <ul className="ml-6 text-sm text-gray-600 space-y-1">
                            <li>• Ad banners, creatives, product videos, short reels</li>
                            <li>• Enhanced brand content (A+ Content on Amazon)</li>
                            <li>• Product infographics and storytelling visuals</li>
                        </ul>
                    </div>

                    {/* Platform-Specific Advertising */}
                    <div className="mb-6">
                        <div className="flex items-center mb-2">
                            <input
                                type="checkbox"
                                id="platformSpecificAds"
                                checked={formData.marketingServices.platformSpecificAds}
                                onChange={() => handleMarketingServiceChange('platformSpecificAds')}
                                className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                            />
                            <label htmlFor="platformSpecificAds" className="ml-2 text-sm font-medium text-gray-900">
                                Platform-Specific Advertising Expertise
                            </label>
                        </div>
                        <ul className="ml-6 text-sm text-gray-600 space-y-1">
                            <li>• Amazon Ads – Sponsored Products, Sponsored Brands, Brand Store Ads</li>
                            <li>• Flipkart Ads – Product Listing Ads (PLA), Flipkart Deals, Video Ads</li>
                            <li>• Meesho Promotions – Flash Sale Strategy, Discount Management</li>
                            <li>• Jiomart Promotions – Homepage banners, Coupon Offers, Deal Days</li>
                            <li>• ONDC – Buyer-side visibility campaigns (via partner apps)</li>
                        </ul>
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
        <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-semibold mb-6">{user ? 'Edit Request' : 'Create Request'}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="bg-gray-50 p-6 rounded-lg">
                    <label className="block text-sm font-medium text-gray-700 mb-4">Service Type</label>
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
                                    className="block p-4 bg-white border-2 rounded-lg cursor-pointer transition-all peer-checked:border-purple-500 peer-checked:bg-purple-50 hover:bg-gray-50"
                                >
                                    <div className="font-medium text-gray-900">{service.label}</div>
                                </label>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Service-specific fields */}
                <div className="mt-4">
                    {formData.serviceType === 'ams' && renderAMSFields()}
                    {formData.serviceType === 'platform' && renderPlatformFields()}
                    {formData.serviceType === 'cobranding' && renderCoBrandingFields()}
                    {formData.serviceType === 'marketing' && renderMarketingFields()}
                </div>

                {/* Additional Notes */}
                <div className="bg-gray-50 p-6 rounded-lg">
                    <label className="block text-sm font-medium text-gray-700 mb-4">Additional Notes</label>
                    <textarea
                        name="additionalNotes"
                        value={formData.additionalNotes}
                        onChange={handleChange}
                        rows="4"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 p-3"
                        placeholder="Any additional information you'd like to share..."
                    />
                </div>

                <div className="flex justify-end space-x-4 mt-4 pt-4 border-t">
                    <button
                        type="button"
                        onClick={onCancel}
                        className="px-6 py-3 border-2 border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
                        disabled={isSubmitting}
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="px-6 py-3 border-2 border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={isSubmitting || (formData.hasGST === 'yes' && gstError)}
                    >
                        {isSubmitting ? 'Submitting...' : (user ? 'Update' : 'Create')}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default PartnerUserForm; 