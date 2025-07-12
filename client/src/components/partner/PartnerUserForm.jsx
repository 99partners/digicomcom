// import { useState, useEffect } from 'react';
// import { toast } from 'react-toastify';
// import { useNavigate } from 'react-router-dom';
// import axiosInstance, { getApiUrl } from '../../config/api.config';
// import { useAuth } from '../../context/AuthContext';
// import {
//     Store,
//     CheckCircle,
//     ArrowRight,
//     Building,
//     Package,
//     ShoppingCart,
//     Mail,
//     Phone,
//     User,
//     FileText,
//     Edit2,
// } from 'lucide-react';

// const PartnerUserForm = ({ onSubmit, onCancel }) => {
//     const navigate = useNavigate();
//     const { isAuthenticated, loading } = useAuth();
//     const [submittedRequest, setSubmittedRequest] = useState(null);
//     const [isEditing, setIsEditing] = useState(false);
//     const [userData, setUserData] = useState(null);
//     const [isLoadingUser, setIsLoadingUser] = useState(true);
//     const [formData, setFormData] = useState({
//         serviceType: 'ams',
//         marketplaces: [],
//         serviceAccountNumber: '',
//         hasGST: 'no',
//         gstNumber: '',
//         monthlyOnlineSales: '',
//         marketingServices: {
//             sponsoredAds: false,
//             seasonalCampaigns: false,
//             platformPromotions: false,
//             socialMediaPromotions: false,
//             creativeDesign: false,
//             platformSpecificAds: false
//         },
//         isManufacturer: false,
//         yearEstablished: '',
//         numberOfProducts: '',
//         productUSP: '',
//         productCategory: '',
//         productDescription: '',
//         panNumber: '',
//         additionalNotes: ''
//     });
//     const [isSubmitting, setIsSubmitting] = useState(false);
//     const [gstError, setGstError] = useState('');
//     const [errors, setErrors] = useState({});

//     // Fetch user data
//     useEffect(() => {
//         const fetchUserData = async () => {
//             try {
//                 const response = await axiosInstance.get('/api/user/data');
//                 if (response.data.success) {
//                     setUserData(response.data.userData);
//                 } else {
//                     toast.error('Failed to fetch user data');
//                 }
//             } catch (error) {
//                 console.error('Error fetching user data:', error);
//                 toast.error('Error loading user information');
//             } finally {
//                 setIsLoadingUser(false);
//             }
//         };

//         if (isAuthenticated) {
//             fetchUserData();
//         }
//     }, [isAuthenticated]);

//     // Load the most recent request when component mounts
//     useEffect(() => {
//         const fetchLatestRequest = async () => {
//             try {
//                 const response = await axiosInstance.get('api/partner-requests/my-requests');
//                 if (response.data.success && response.data.data.length > 0) {
//                     const latestRequest = response.data.data[0];
//                     setSubmittedRequest(latestRequest);
//                     if (!isEditing) {
//                         setFormData({
//                             ...latestRequest,
//                             marketingServices: latestRequest.marketingServices || {
//                                 sponsoredAds: false,
//                                 seasonalCampaigns: false,
//                                 platformPromotions: false,
//                                 socialMediaPromotions: false,
//                                 creativeDesign: false,
//                                 platformSpecificAds: false
//                             }
//                         });
//                     }
//                 }
//             } catch (error) {
//                 console.error('Error fetching latest request:', error);
//                 toast.error('Error loading previous request');
//             }
//         };

//         if (isAuthenticated) {
//             fetchLatestRequest();
//         }
//     }, [isAuthenticated]);

//     const serviceTypes = [
//         { id: 'ams', label: 'AMS (Account Management Services)' },
//         { id: 'platform', label: 'Platform Enablement' },
//         { id: 'cobranding', label: 'Co-Branding' },
//         { id: 'marketing', label: 'Marketing' }
//     ];

//     const marketplaceOptions = [
//         'ONDC', 'Amazon', 'Flipkart', 'Meesho', 'JioMart', 'IndiaMART', 'Snapdeal'
//     ];

//     const platformOptions = [
//         'Shopify', 'WooCommerce', 'Magento', 'Custom Solution', 'Other'
//     ];

//     const salesVolumeOptions = [
//         { value: 'less-50k', label: 'Less than ₹50,000' },
//         { value: '50k-2L', label: '₹50,000 – ₹2,00,000' },
//         { value: '2L-5L', label: '₹2,00,000 – ₹5,00,000' },
//         { value: '5L+', label: '₹5,00,000+' }
//     ];

//     const validateGST = (gstNumber) => {
//         // GST format: 2 digits for state code, 10 digits for PAN, 1 digit for entity, 1 digit for check sum
//         const gstRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
//         return gstRegex.test(gstNumber);
//     };

//     const validatePAN = (pan) => {
//         const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
//         return panRegex.test(pan);
//     };

//     const handleChange = (e) => {
//         const { name, value, type, checked } = e.target;
        
//         if (type === 'checkbox') {
//             if (name === 'marketplaces') {
//                 setFormData(prev => ({
//                     ...prev,
//                     [name]: checked 
//                         ? [...prev[name], value]
//                         : prev[name].filter(item => item !== value)
//                 }));
//             } else {
//                 setFormData(prev => ({
//                     ...prev,
//                     [name]: checked
//                 }));
//             }
//         } else if (name === 'gstNumber') {
//             const gstValue = value.toUpperCase();
//             if (gstValue === '' || validateGST(gstValue)) {
//                 setGstError('');
//             } else {
//                 setGstError('Please enter a valid GST number');
//             }
//             setFormData(prev => ({
//                 ...prev,
//                 [name]: gstValue
//             }));
//         } else if (name === 'panNumber') {
//             setFormData(prev => ({
//                 ...prev,
//                 panNumber: value.toUpperCase()
//             }));

//             if (value && !validatePAN(value)) {
//                 setErrors(prev => ({
//                     ...prev,
//                     panNumber: 'Invalid PAN number format. It should be in format: ABCDE1234F'
//                 }));
//             } else {
//                 setErrors(prev => {
//                     const newErrors = { ...prev };
//                     delete newErrors.panNumber;
//                     return newErrors;
//                 });
//             }
//         } else {
//             setFormData(prev => ({
//                 ...prev,
//                 [name]: value
//             }));
//         }
//     };

//     const handleMarketingServiceChange = (service) => {
//         setFormData(prev => ({
//             ...prev,
//             marketingServices: {
//                 ...prev.marketingServices,
//                 [service]: !prev.marketingServices[service]
//             }
//         }));
//     };

//     const renderAMSFields = () => (
//         <>
//             <div className="space-y-4 px-2">
//                 <div className="bg-gradient-to-br from-white to-green-50/50 p-4 rounded-lg border border-green-100/50">
//                     <label className="block text-sm font-medium text-gray-700 mb-3">Marketplaces</label>
//                     <div className="grid grid-cols-2 gap-4">
//                         {marketplaceOptions.map(marketplace => (
//                             <label key={marketplace} className="flex items-center space-x-3 p-3 bg-white/90 rounded-md border border-green-100/50 hover:border-green-500 transition-colors">
//                                 <input
//                                     type="checkbox"
//                                     name="marketplaces"
//                                     value={marketplace}
//                                     checked={formData.marketplaces.includes(marketplace)}
//                                     onChange={handleChange}
//                                     className="w-4 h-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
//                                 />
//                                 <span className="text-sm text-gray-700">{marketplace}</span>
//                             </label>
//                         ))}
//                     </div>
//                 </div>

//                 <div className="bg-gradient-to-br from-white to-green-50/50 p-4 rounded-lg border border-green-100/50">
//                     <label className="block text-sm font-medium text-gray-700 mb-3">Service Account Number</label>
//                     <input
//                         type="text"
//                         name="serviceAccountNumber"
//                         value={formData.serviceAccountNumber}
//                         onChange={handleChange}
//                         placeholder="Enter your service account number"
//                         className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 p-3"
//                     />
//                 </div>

//                 <div className="bg-gradient-to-br from-white to-green-50/50 p-4 rounded-lg border border-green-100/50">
//                     <label className="block text-sm font-medium text-gray-700 mb-3">Do you have GST number?</label>
//                     <div className="flex space-x-6 mb-4">
//                         <label className="flex items-center space-x-3 p-3 bg-white/90 rounded-md border border-green-100/50 hover:border-green-500 transition-colors">
//                             <input
//                                 type="radio"
//                                 name="hasGST"
//                                 value="yes"
//                                 checked={formData.hasGST === 'yes'}
//                                 onChange={handleChange}
//                                 className="w-4 h-4 text-green-600 focus:ring-green-500"
//                             />
//                             <span className="text-sm text-gray-700">Yes</span>
//                         </label>
//                         <label className="flex items-center space-x-3 p-3 bg-white/90 rounded-md border border-green-100/50 hover:border-green-500 transition-colors">
//                             <input
//                                 type="radio"
//                                 name="hasGST"
//                                 value="no"
//                                 checked={formData.hasGST === 'no'}
//                                 onChange={handleChange}
//                                 className="w-4 h-4 text-green-600 focus:ring-green-500"
//                             />
//                             <span className="text-sm text-gray-700">No</span>
//                         </label>
//                     </div>

//                     {formData.hasGST === 'yes' && (
//                         <div className="mt-4">
//                             <label className="block text-sm font-medium text-gray-700 mb-2">GST Number</label>
//                             <input
//                                 type="text"
//                                 name="gstNumber"
//                                 value={formData.gstNumber}
//                                 onChange={handleChange}
//                                 placeholder="Enter your GST number"
//                                 className={`mt-1 block w-full rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 p-3 ${
//                                     gstError ? 'border-red-300 bg-red-50' : 'border-gray-300'
//                                 }`}
//                             />
//                             {gstError && (
//                                 <p className="mt-2 text-sm text-red-600">{gstError}</p>
//                             )}
//                         </div>
//                     )}
//                 </div>

//                 <div className="bg-gradient-to-br from-white to-green-50/50 p-4 rounded-lg border border-green-100/50">
//                     <label className="block text-sm font-medium text-gray-700 mb-3">Monthly Online Sales Volume (Optional)</label>
//                     <select
//                         name="monthlyOnlineSales"
//                         value={formData.monthlyOnlineSales}
//                         onChange={handleChange}
//                         className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 p-3"
//                     >
//                         <option value="">Select sales volume</option>
//                         {salesVolumeOptions.map(option => (
//                             <option key={option.value} value={option.value}>
//                                 {option.label}
//                             </option>
//                         ))}
//                     </select>
//                 </div>
//             </div>
//         </>
//     );

//     const renderPlatformFields = () => (
//         <>
//             <div className="space-y-4 px-2">
//                 <div className="bg-gradient-to-br from-white to-green-50/50 p-4 rounded-lg border border-green-100/50">
//                     <label className="block text-sm font-medium text-gray-700 mb-3">Platform Type</label>
//                     <div className="grid grid-cols-2 gap-4">
//                         {platformOptions.map(platform => (
//                             <label key={platform} className="flex items-center space-x-3 p-3 bg-white/90 rounded-md border border-green-100/50 hover:border-green-500 transition-colors">
//                                 <input
//                                     type="checkbox"
//                                     name="marketplaces"
//                                     value={platform}
//                                     checked={formData.marketplaces.includes(platform)}
//                                     onChange={handleChange}
//                                     className="w-4 h-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
//                                 />
//                                 <span className="text-sm text-gray-700">{platform}</span>
//                             </label>
//                         ))}
//                     </div>
//                 </div>

//                 <div className="bg-gradient-to-br from-white to-green-50/50 p-4 rounded-lg border border-green-100/50">
//                     <label className="block text-sm font-medium text-gray-700 mb-3">Do you have GST number?</label>
//                     <div className="flex space-x-6 mb-4">
//                         <label className="flex items-center space-x-3 p-3 bg-white/90 rounded-md border border-green-100/50 hover:border-green-500 transition-colors">
//                             <input
//                                 type="radio"
//                                 name="hasGST"
//                                 value="yes"
//                                 checked={formData.hasGST === 'yes'}
//                                 onChange={handleChange}
//                                 className="w-4 h-4 text-green-600 focus:ring-green-500"
//                             />
//                             <span className="text-sm text-gray-700">Yes</span>
//                         </label>
//                         <label className="flex items-center space-x-3 p-3 bg-white/90 rounded-md border border-green-100/50 hover:border-green-500 transition-colors">
//                             <input
//                                 type="radio"
//                                 name="hasGST"
//                                 value="no"
//                                 checked={formData.hasGST === 'no'}
//                                 onChange={handleChange}
//                                 className="w-4 h-4 text-green-600 focus:ring-green-500"
//                             />
//                             <span className="text-sm text-gray-700">No</span>
//                         </label>
//                     </div>

//                     {formData.hasGST === 'yes' && (
//                         <div className="mt-4">
//                             <label className="block text-sm font-medium text-gray-700 mb-2">GST Number</label>
//                             <input
//                                 type="text"
//                                 name="gstNumber"
//                                 value={formData.gstNumber}
//                                 onChange={handleChange}
//                                 placeholder="Enter your GST number"
//                                 className={`mt-1 block w-full rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 p-3 ${
//                                     gstError ? 'border-red-300 bg-red-50' : 'border-gray-300'
//                                 }`}
//                             />
//                             {gstError && (
//                                 <p className="mt-2 text-sm text-red-600">{gstError}</p>
//                             )}
//                         </div>
//                     )}
//                 </div>

//                 <div className="bg-gradient-to-br from-white to-green-50/50 p-4 rounded-lg border border-green-100/50">
//                     <label className="block text-sm font-medium text-gray-700 mb-3">Monthly Online Sales Volume (Optional)</label>
//                     <select
//                         name="monthlyOnlineSales"
//                         value={formData.monthlyOnlineSales}
//                         onChange={handleChange}
//                         className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 p-3"
//                     >
//                         <option value="">Select sales volume</option>
//                         {salesVolumeOptions.map(option => (
//                             <option key={option.value} value={option.value}>
//                                 {option.label}
//                             </option>
//                         ))}
//                     </select>
//                 </div>
//             </div>
//         </>
//     );

//     const renderCoBrandingFields = () => (
//         <>
//             <div className="space-y-4 px-2">
//                 <div className="bg-gradient-to-br from-white to-green-50/50 p-4 rounded-lg border border-green-100/50">
//                     <label className="block text-sm font-medium text-gray-700 mb-3">Are you a manufacturer?</label>
//                     <div className="flex items-center mb-4">
//                         <input
//                             type="checkbox"
//                             id="isManufacturer"
//                             checked={formData.isManufacturer}
//                             onChange={(e) => setFormData(prev => ({
//                                 ...prev,
//                                 isManufacturer: e.target.checked
//                             }))}
//                             className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
//                         />
//                         <label htmlFor="isManufacturer" className="ml-2 text-sm font-medium text-gray-900">
//                             Are you a Manufacturer?
//                         </label>
//                     </div>

//                     {formData.isManufacturer && (
//                         <div className="space-y-4">
//                             {/* Year of Establishment */}
//                             <div>
//                                 <label htmlFor="yearEstablished" className="block text-sm font-medium text-gray-700 mb-2">
//                                     Year of Establishment
//                                 </label>
//                                 <input
//                                     type="number"
//                                     id="yearEstablished"
//                                     name="yearEstablished"
//                                     value={formData.yearEstablished}
//                                     onChange={handleChange}
//                                     min="1900"
//                                     max={new Date().getFullYear()}
//                                     className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
//                                     required
//                                 />
//                             </div>

//                             {/* Number of Products */}
//                             <div>
//                                 <label htmlFor="numberOfProducts" className="block text-sm font-medium text-gray-700 mb-2">
//                                     Number of Products
//                                 </label>
//                                 <input
//                                     type="number"
//                                     id="numberOfProducts"
//                                     name="numberOfProducts"
//                                     value={formData.numberOfProducts}
//                                     onChange={handleChange}
//                                     min="1"
//                                     className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
//                                     required
//                                 />
//                             </div>

//                             {/* Product Category */}
//                             <div>
//                                 <label htmlFor="productCategory" className="block text-sm font-medium text-gray-700 mb-2">
//                                     Product Category
//                                 </label>
//                                 <select
//                                     id="productCategory"
//                                     name="productCategory"
//                                     value={formData.productCategory}
//                                     onChange={handleChange}
//                                     className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
//                                     required
//                                 >
//                                     <option value="">Select a category</option>
//                                     <option value="electronics">Electronics</option>
//                                     <option value="fashion">Fashion</option>
//                                     <option value="home">Home & Kitchen</option>
//                                     <option value="beauty">Beauty & Personal Care</option>
//                                     <option value="health">Health & Wellness</option>
//                                     <option value="food">Food & Beverages</option>
//                                     <option value="toys">Toys & Games</option>
//                                     <option value="sports">Sports & Fitness</option>
//                                     <option value="automotive">Automotive</option>
//                                     <option value="other">Other</option>
//                                 </select>
//                             </div>

//                             {/* Product USP */}
//                             <div>
//                                 <label htmlFor="productUSP" className="block text-sm font-medium text-gray-700 mb-2">
//                                     Product USP (Unique Selling Proposition)
//                                 </label>
//                                 <textarea
//                                     id="productUSP"
//                                     name="productUSP"
//                                     value={formData.productUSP}
//                                     onChange={handleChange}
//                                     rows={3}
//                                     className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
//                                     placeholder="What makes your products unique?"
//                                     required
//                                 />
//                             </div>

//                             {/* Product Description */}
//                             <div>
//                                 <label htmlFor="productDescription" className="block text-sm font-medium text-gray-700 mb-2">
//                                     Product Description
//                                 </label>
//                                 <textarea
//                                     id="productDescription"
//                                     name="productDescription"
//                                     value={formData.productDescription}
//                                     onChange={handleChange}
//                                     rows={4}
//                                     className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
//                                     placeholder="Describe your products in detail..."
//                                     required
//                                 />
//                             </div>

//                             {/* PAN Number */}
//                             <div>
//                                 <label htmlFor="panNumber" className="block text-sm font-medium text-gray-700 mb-2">
//                                     PAN Number
//                                 </label>
//                                 <input
//                                     type="text"
//                                     id="panNumber"
//                                     name="panNumber"
//                                     value={formData.panNumber}
//                                     onChange={handleChange}
//                                     className={`mt-1 block w-full rounded-md shadow-sm sm:text-sm ${
//                                         errors.panNumber 
//                                             ? 'border-red-300 focus:border-red-500 focus:ring-red-500' 
//                                             : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
//                                     }`}
//                                     placeholder="ABCDE1234F"
//                                     maxLength={10}
//                                     required
//                                 />
//                                 {errors.panNumber && (
//                                     <p className="mt-1 text-sm text-red-600">{errors.panNumber}</p>
//                                 )}
//                             </div>
//                         </div>
//                     )}
//                 </div>
//             </div>
//         </>
//     );

//     const renderMarketingFields = () => (
//         <>
//             <div className="space-y-4 px-2">
//                 <div className="bg-gradient-to-br from-white to-green-50/50 p-4 rounded-lg border border-green-100/50">
//                     <label className="block text-sm font-medium text-gray-700 mb-3">Select Target Marketplaces</label>
//                     <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//                         {marketplaceOptions.map((marketplace) => (
//                             <div key={marketplace} className="flex items-center p-3 bg-white/90 rounded-md border border-green-100/50">
//                                 <input
//                                     type="checkbox"
//                                     id={`marketplace-${marketplace}`}
//                                     name="marketplaces"
//                                     value={marketplace}
//                                     checked={formData.marketplaces.includes(marketplace)}
//                                     onChange={handleChange}
//                                     className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
//                                 />
//                                 <label htmlFor={`marketplace-${marketplace}`} className="ml-2 text-sm text-gray-700">
//                                     {marketplace}
//                                 </label>
//                             </div>
//                         ))}
//                     </div>
//                 </div>

//                 {/* What We Offer Section */}
//                 <div className="bg-gradient-to-br from-white to-green-50/50 p-4 rounded-lg border border-green-100/50">
//                     <h3 className="text-lg font-medium text-gray-900 mb-4">What We Offer</h3>
                    
//                     {/* Sponsored Ad Campaigns */}
//                     <div className="mb-6">
//                         <div className="flex items-center mb-2">
//                             <input
//                                 type="checkbox"
//                                 id="sponsoredAds"
//                                 checked={formData.marketingServices.sponsoredAds}
//                                 onChange={() => handleMarketingServiceChange('sponsoredAds')}
//                                 className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
//                             />
//                             <label htmlFor="sponsoredAds" className="ml-2 text-sm font-medium text-gray-900">
//                                 Sponsored Ad Campaigns (PPC)
//                             </label>
//                         </div>
//                         <ul className="ml-6 text-sm text-gray-600 space-y-1">
//                             <li>• Create and manage product ads on Amazon, Flipkart, Meesho, Jiomart, and more</li>
//                             <li>• Keyword research and targeting</li>
//                             <li>• Ad budget optimization for maximum ROI</li>
//                             <li>• A/B testing and performance tracking</li>
//                         </ul>
//                     </div>

//                     {/* Seasonal & Festival Campaigns */}
//                     <div className="mb-6">
//                         <div className="flex items-center mb-2">
//                             <input
//                                 type="checkbox"
//                                 id="seasonalCampaigns"
//                                 checked={formData.marketingServices.seasonalCampaigns}
//                                 onChange={() => handleMarketingServiceChange('seasonalCampaigns')}
//                                 className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
//                             />
//                             <label htmlFor="seasonalCampaigns" className="ml-2 text-sm font-medium text-gray-900">
//                                 Seasonal & Festival Campaigns
//                             </label>
//                         </div>
//                         <ul className="ml-6 text-sm text-gray-600 space-y-1">
//                             <li>• Diwali, Holi, Republic Day, New Year, Raksha Bandhan, etc.</li>
//                             <li>• Custom promotions and product bundling</li>
//                             <li>• Sale event calendar planning</li>
//                         </ul>
//                     </div>

//                     {/* Platform-Specific Promotions */}
//                     <div className="mb-6">
//                         <div className="flex items-center mb-2">
//                             <input
//                                 type="checkbox"
//                                 id="platformPromotions"
//                                 checked={formData.marketingServices.platformPromotions}
//                                 onChange={() => handleMarketingServiceChange('platformPromotions')}
//                                 className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
//                             />
//                             <label htmlFor="platformPromotions" className="ml-2 text-sm font-medium text-gray-900">
//                                 Platform-Specific Promotions
//                             </label>
//                         </div>
//                         <ul className="ml-6 text-sm text-gray-600 space-y-1">
//                             <li>• Participation in Lightning Deals, Big Billion Day, Amazon Prime Day, Flipkart Big Savings, etc.</li>
//                             <li>• Exclusive offers and banner placements</li>
//                             <li>• Pricing strategy for offer periods</li>
//                         </ul>
//                     </div>

//                     {/* Social Media & Off-Platform Promotions */}
//                     <div className="mb-6">
//                         <div className="flex items-center mb-2">
//                             <input
//                                 type="checkbox"
//                                 id="socialMediaPromotions"
//                                 checked={formData.marketingServices.socialMediaPromotions}
//                                 onChange={() => handleMarketingServiceChange('socialMediaPromotions')}
//                                 className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
//                             />
//                             <label htmlFor="socialMediaPromotions" className="ml-2 text-sm font-medium text-gray-900">
//                                 Social Media & Off-Platform Promotions
//                             </label>
//                         </div>
//                         <ul className="ml-6 text-sm text-gray-600 space-y-1">
//                             <li>• Targeted ads on Meta (Facebook/Instagram), Google, YouTube</li>
//                             <li>• Influencer collaborations & affiliate campaigns</li>
//                             <li>• Landing pages & conversion tracking</li>
//                         </ul>
//                     </div>

//                     {/* Creative & Content Design */}
//                     <div className="mb-6">
//                         <div className="flex items-center mb-2">
//                             <input
//                                 type="checkbox"
//                                 id="creativeDesign"
//                                 checked={formData.marketingServices.creativeDesign}
//                                 onChange={() => handleMarketingServiceChange('creativeDesign')}
//                                 className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
//                             />
//                             <label htmlFor="creativeDesign" className="ml-2 text-sm font-medium text-gray-900">
//                                 Creative & Content Design
//                             </label>
//                         </div>
//                         <ul className="ml-6 text-sm text-gray-600 space-y-1">
//                             <li>• Ad banners, creatives, product videos, short reels</li>
//                             <li>• Enhanced brand content (A+ Content on Amazon)</li>
//                             <li>• Product infographics and storytelling visuals</li>
//                         </ul>
//                     </div>

//                     {/* Platform-Specific Advertising */}
//                     <div className="mb-6">
//                         <div className="flex items-center mb-2">
//                             <input
//                                 type="checkbox"
//                                 id="platformSpecificAds"
//                                 checked={formData.marketingServices.platformSpecificAds}
//                                 onChange={() => handleMarketingServiceChange('platformSpecificAds')}
//                                 className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
//                             />
//                             <label htmlFor="platformSpecificAds" className="ml-2 text-sm font-medium text-gray-900">
//                                 Platform-Specific Advertising Expertise
//                             </label>
//                         </div>
//                         <ul className="ml-6 text-sm text-gray-600 space-y-1">
//                             <li>• Amazon Ads – Sponsored Products, Sponsored Brands, Brand Store Ads</li>
//                             <li>• Flipkart Ads – Product Listing Ads (PLA), Flipkart Deals, Video Ads</li>
//                             <li>• Meesho Promotions – Flash Sale Strategy, Discount Management</li>
//                             <li>• Jiomart Promotions – Homepage banners, Coupon Offers, Deal Days</li>
//                             <li>• ONDC – Buyer-side visibility campaigns (via partner apps)</li>
//                             <li>• Zomato / Swiggy – Sponsored listings, discount campaigns, and regional targeting</li>
//                         </ul>
//                     </div>

//                     {/* Our Process */}
//                     <div className="mb-6">
//                         <h4 className="text-sm font-medium text-gray-900 mb-2">Our Process</h4>
//                         <ul className="ml-6 text-sm text-gray-600 space-y-1">
//                             <li>• Audit – Analyze your current product listings and ad performance</li>
//                             <li>• Strategy – Define goals (awareness, sales, traffic) and target audience</li>
//                             <li>• Execution – Launch platform and social ads, seasonal campaigns</li>
//                             <li>• Optimization – Weekly monitoring, reporting, and ad refinements</li>
//                             <li>• Scale – Expand to new platforms or regions</li>
//                         </ul>
//                     </div>

//                     {/* Advertising Management Plans */}
//                     <div className="mb-6">
//                         <h4 className="text-sm font-medium text-gray-900 mb-2">Advertising Management Plans</h4>
//                         <div className="ml-6 text-sm text-gray-600">
//                             <p>• Basic Plan - Ideal for new sellers</p>
//                             <p>• Growth Plan - Perfect for scaling brands</p>
//                             <p>• Pro+ Plan - Best for multi-channel sellers</p>
//                             <p className="mt-2 text-xs italic">* Ad spend is billed separately based on platform budgets.</p>
//                         </div>
//                     </div>

//                     {/* Why Choose Us */}
//                     <div className="mb-6">
//                         <h4 className="text-sm font-medium text-gray-900 mb-2">Why Choose 99digicom?</h4>
//                         <ul className="ml-6 text-sm text-gray-600 space-y-1">
//                             <li>• Platform-specific ad specialists</li>
//                             <li>• Weekly performance reports</li>
//                             <li>• Creative support for banners, videos & reels</li>
//                             <li>• Campaigns tailored to your product category</li>
//                         </ul>
//                     </div>
//                 </div>
//             </div>
//         </>
//     );

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setIsSubmitting(true);

//         try {
//             // Validate required fields based on service type
//             if (!formData.serviceType) {
//                 throw new Error('Please select a service type');
//             }

//             // Additional validation based on service type
//             if (formData.serviceType === 'ams' && !formData.marketplaces?.length) {
//                 throw new Error('Please select at least one marketplace');
//             }

//             // Prepare request data
//             const requestData = {
//                 ...formData,
//                 userEmail: userData?.email,
//                 // Remove empty strings and null values
//                 ...Object.fromEntries(
//                     Object.entries(formData).filter(([_, value]) => 
//                         value !== '' && value !== null && 
//                         !(Array.isArray(value) && value.length === 0)
//                     )
//                 )
//             };

//             console.log('Submitting form data:', requestData);
            
//             let response;
//             if (submittedRequest?._id && isEditing) {
//                 // Check if the request is already processed
//                 const checkResponse = await axiosInstance.get(`/api/partner-requests/${submittedRequest._id}`);
//                 if (checkResponse.data.data.status === 'processed') {
//                     toast.error('Cannot update a processed request');
//                     setIsEditing(false);
//                     return;
//                 }
                
//                 response = await axiosInstance.put(`/api/partner-requests/${submittedRequest._id}`, requestData);
//                 console.log('Update response:', response.data);
//                 toast.success('Request updated successfully');
//             } else {
//                 response = await axiosInstance.post('/api/partner-requests', requestData);
//                 console.log('Create response:', response.data);
//                 toast.success('Request created successfully');
//             }
            
//             // Update the submitted request with the new data
//             if (response.data.success) {
//                 setSubmittedRequest(response.data.data);
//                 setIsEditing(false);

//                 // Call onSubmit callback if provided
//                 if (onSubmit) {
//                     onSubmit(response.data.data);
//                 }
//             } else {
//                 throw new Error(response.data.message || 'Failed to save request');
//             }
//         } catch (error) {
//             console.error('Full error details:', error);
//             console.error('Error response:', error.response?.data);
            
//             let errorMessage = process.env.NODE_ENV === 'production'
//                 ? 'Unable to save your request. Please try again or contact support if the issue persists.'
//                 : 'Failed to save request. Please try again.';
            
//             if (error.response) {
//                 if (error.response.status === 400) {
//                     const validationErrors = error.response.data?.errors;
//                     if (validationErrors && validationErrors.length > 0) {
//                         errorMessage = validationErrors.join('\n');
//                     } else if (error.response.data?.message) {
//                         errorMessage = error.response.data.message;
//                     }
//                 } else if (error.response.status === 401) {
//                     errorMessage = 'Please log in again to continue';
//                     navigate('/partnerlogin');
//                 } else if (error.response.status === 403) {
//                     errorMessage = 'You do not have permission to perform this action';
//                 } else if (error.response.status === 500) {
//                     errorMessage = process.env.NODE_ENV === 'production'
//                         ? 'A server error occurred. Our team has been notified and is working on it.'
//                         : error.response.data?.message || 'Server error. Please try again later';
//                     console.error('Server error details:', error.response.data?.error);
//                 }
//             } else if (error.request) {
//                 errorMessage = process.env.NODE_ENV === 'production'
//                     ? 'Unable to connect to the server. Please check your connection and try again.'
//                     : 'No response from server. Please check your connection';
//             } else {
//                 errorMessage = error.message || 'Error preparing request. Please try again';
//             }
            
//             toast.error(errorMessage);
//         } finally {
//             setIsSubmitting(false);
//         }
//     };

//     const handleEdit = () => {
//         setIsEditing(true);
//     };

//     const handleCancel = () => {
//         setIsEditing(false);
//         setFormData({
//             ...submittedRequest,
//             marketingServices: submittedRequest.marketingServices || {
//                 sponsoredAds: false,
//                 seasonalCampaigns: false,
//                 platformPromotions: false,
//                 socialMediaPromotions: false,
//                 creativeDesign: false,
//                 platformSpecificAds: false
//             }
//         });
//     };

//     // Show loading state while checking authentication or loading user data
//     if (loading || isLoadingUser) {
//         return (
//             <div className="min-h-screen bg-gradient-to-br from-green-50 to-white flex items-center justify-center">
//                 <div className="bg-white rounded-lg shadow-lg p-6">
//                     <div className="w-8 h-8 border-4 border-green-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
//                     <p className="text-gray-600 text-sm mt-4">Loading...</p>
//                 </div>
//             </div>
//         );
//     }

//     // Don't render form if not authenticated
//     if (!isAuthenticated) {
//         return null;
//     }

//     // If there's a submitted request and we're not editing, show the details view
//     if (submittedRequest && !isEditing) {
//         return (
//             <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 py-12 px-4">
//                 <div className="max-w-3xl mx-auto">
//                     <div className="bg-white rounded-lg shadow-lg p-8 border border-green-100">
//                         <div className="flex justify-between items-center mb-6">
//                             <h2 className="text-2xl font-bold text-gray-900">Partner Request Details</h2>
//                             <button
//                                 onClick={handleEdit}
//                                 className="inline-flex items-center px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors"
//                             >
//                                 <Edit2 className="w-4 h-4 mr-2" />
//                                 Edit Request
//                             </button>
//                         </div>

//                         <div className="space-y-6">
//                             <div>
//                                 <h3 className="text-lg font-semibold text-gray-900">Service Type</h3>
//                                 <p className="mt-1 text-gray-600 capitalize">{submittedRequest.serviceType}</p>
//                             </div>

//                             {submittedRequest.marketplaces && submittedRequest.marketplaces.length > 0 && (
//                                 <div>
//                                     <h3 className="text-lg font-semibold text-gray-900">Marketplaces</h3>
//                                     <div className="mt-2 flex flex-wrap gap-2">
//                                         {submittedRequest.marketplaces.map((marketplace) => (
//                                             <span
//                                                 key={marketplace}
//                                                 className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm"
//                                             >
//                                                 {marketplace}
//                                             </span>
//                                         ))}
//                                     </div>
//                                 </div>
//                             )}

//                             {submittedRequest.serviceAccountNumber && (
//                                 <div>
//                                     <h3 className="text-lg font-semibold text-gray-900">Service Account Number</h3>
//                                     <p className="mt-1 text-gray-600">{submittedRequest.serviceAccountNumber}</p>
//                                 </div>
//                             )}

//                             <div>
//                                 <h3 className="text-lg font-semibold text-gray-900">GST Status</h3>
//                                 <p className="mt-1 text-gray-600">
//                                     {submittedRequest.hasGST === 'yes' ? (
//                                         <>
//                                             Has GST: {submittedRequest.gstNumber}
//                                         </>
//                                     ) : (
//                                         'No GST'
//                                     )}
//                                 </p>
//                             </div>

//                             {submittedRequest.monthlyOnlineSales && (
//                                 <div>
//                                     <h3 className="text-lg font-semibold text-gray-900">Monthly Online Sales</h3>
//                                     <p className="mt-1 text-gray-600">{submittedRequest.monthlyOnlineSales}</p>
//                                 </div>
//                             )}

//                             {submittedRequest.marketingServices && Object.values(submittedRequest.marketingServices).some(Boolean) && (
//                                 <div>
//                                     <h3 className="text-lg font-semibold text-gray-900">Marketing Services</h3>
//                                     <div className="mt-2 space-y-2">
//                                         {Object.entries(submittedRequest.marketingServices)
//                                             .filter(([_, value]) => value)
//                                             .map(([service]) => (
//                                                 <div key={service} className="flex items-center">
//                                                     <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
//                                                     <span className="text-gray-600">{service.replace(/([A-Z])/g, ' $1').trim()}</span>
//                                                 </div>
//                                             ))}
//                                     </div>
//                                 </div>
//                             )}

//                             {submittedRequest.additionalNotes && (
//                                 <div>
//                                     <h3 className="text-lg font-semibold text-gray-900">Additional Notes</h3>
//                                     <p className="mt-1 text-gray-600">{submittedRequest.additionalNotes}</p>
//                                 </div>
//                             )}

//                             <div className="mt-8 pt-6 border-t border-gray-200">
//                                 <p className="text-sm text-gray-500">
//                                     Request Status: <span className="font-medium capitalize">{submittedRequest.status}</span>
//                                 </p>
//                                 <p className="text-sm text-gray-500 mt-1">
//                                     Submitted: {new Date(submittedRequest.createdAt).toLocaleDateString()}
//                                 </p>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         );
//     }

//     // Render the form for editing or creating
//     return (
//         <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50">
//             {/* Hero Section */}
//             <section className="pt-12 pb-8 px-4">
//                 <div className="max-w-7xl mx-auto text-center">
//                     <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
//                         <Store className="h-4 w-4" />
//                         <span>Partner with 99digicom</span>
//                     </div>
//                     <h1 className="text-4xl font-bold text-gray-900 mb-4">
//                         {isEditing ? 'Edit Your Partner Request' : 'Create Your Partner Request'}
//                     </h1>
//                 </div>
//             </section>

//             {/* Form Section */}
//             <section className="py-8 px-4">
//                 <div className="max-w-3xl mx-auto">
//                     <div className="bg-gradient-to-br from-white via-green-50/30 to-emerald-50/30 backdrop-blur-sm rounded-lg shadow-lg p-8 border border-green-100/50 hover:shadow-xl transition-shadow">
//                         <form onSubmit={handleSubmit} className="space-y-4">
//                             {/* User Information Section */}
//                             <div className="bg-white p-6 rounded-lg shadow-sm border border-green-100 mb-6">
//                                 <h3 className="text-lg font-semibold text-gray-900 mb-4">User Information</h3>
//                                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                                     <div>
//                                         <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
//                                         <div className="flex items-center bg-gray-50 px-4 py-2.5 rounded-md">
//                                             <User className="w-5 h-5 text-gray-400 mr-2" />
//                                             <span className="text-gray-900">{userData?.name || 'N/A'}</span>
//                                         </div>
//                                     </div>
//                                     <div>
//                                         <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
//                                         <div className="flex items-center bg-gray-50 px-4 py-2.5 rounded-md">
//                                             <Mail className="w-5 h-5 text-gray-400 mr-2" />
//                                             <span className="text-gray-900">{userData?.email || 'N/A'}</span>
//                                         </div>
//                                     </div>
//                                     {userData?.phone && (
//                                         <div className="col-span-2">
//                                             <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
//                                             <div className="flex items-center bg-gray-50 px-4 py-2.5 rounded-md">
//                                                 <Phone className="w-5 h-5 text-gray-400 mr-2" />
//                                                 <span className="text-gray-900">{userData.phone}</span>
//                                             </div>
//                                         </div>
//                                     )}
//                                 </div>
//                             </div>

//                             {/* Service Type Selection */}
//                             <div className="bg-gradient-to-br from-white to-green-50/50 p-4 rounded-lg border border-green-100/50">
//                                 <label className="block text-sm font-medium text-gray-700 mb-4">Service Type</label>
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                         {serviceTypes.map((service) => (
//                             <div key={service.id} className="relative">
//                                 <input
//                                     type="radio"
//                                     name="serviceType"
//                                     id={service.id}
//                                     value={service.id}
//                                     checked={formData.serviceType === service.id}
//                                     onChange={handleChange}
//                                     className="peer absolute opacity-0"
//                                     required
//                                 />
//                                 <label
//                                     htmlFor={service.id}
//                                                 className="block p-4 bg-white border-2 rounded-lg cursor-pointer transition-all peer-checked:border-green-600 peer-checked:bg-green-50 hover:bg-gray-50"
//                                 >
//                                     <div className="font-medium text-gray-900">{service.label}</div>
//                                 </label>
//                             </div>
//                         ))}
//                     </div>
//                 </div>

//                             {/* Service-specific fields */}
//                             <div className="mt-4">
//                                 {formData.serviceType === 'ams' && renderAMSFields()}
//                                 {formData.serviceType === 'platform' && renderPlatformFields()}
//                                 {formData.serviceType === 'cobranding' && renderCoBrandingFields()}
//                                 {formData.serviceType === 'marketing' && renderMarketingFields()}
//                             </div>

//                             {/* Additional Notes */}
//                             <div className="bg-gradient-to-br from-white to-green-50/50 p-4 rounded-lg border border-green-100/50">
//                                 <label className="block text-sm font-medium text-gray-700 mb-3">Additional Notes</label>
//                                 <textarea
//                                     name="additionalNotes"
//                                     value={formData.additionalNotes}
//                                     onChange={handleChange}
//                                     rows="4"
//                                     className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-green-600 resize-y"
//                                     placeholder="Any additional information you'd like to share..."
//                                 />
//                             </div>

//                             {/* Form Actions */}
//                             <div className="flex justify-end space-x-4">
//                                 {isEditing && (
//                     <button
//                         type="button"
//                                         onClick={handleCancel}
//                                         className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
//                     >
//                         Cancel
//                     </button>
//                                 )}
//                     <button
//                         type="submit"
//                                     className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-medium rounded-lg hover:from-green-700 hover:to-emerald-700 transition-colors focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
//                                     disabled={isSubmitting || (formData.hasGST === 'yes' && gstError)}
//                                 >
//                                     {isSubmitting ? (
//                                         <>
//                                             <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
//                                             Submitting...
//                                         </>
//                                     ) : (
//                                         <>
//                                             {isEditing ? 'Update Request' : 'Submit Request'}
//                                             <ArrowRight className="ml-2 h-5 w-5" />
//                                         </>
//                                     )}
//                     </button>
//                 </div>
//             </form>
//                     </div>
//                 </div>
//             </section>
//         </div>
//     );
// };

// export default PartnerUserForm; 

import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import mockApiService from '../../config/api.config';
import { useAuth } from '../../context/AuthContext';
import { simulateApiCall } from '../../config/mockData';
import {
    Store,
    CheckCircle,
    ArrowRight,
    Building,
    Package,
    ShoppingCart,
    Mail,
    Phone,
    User,
    FileText,
    Edit2,
} from 'lucide-react';

const mockPartnerRequest = {
    serviceType: 'ams',
    marketplaces: ['Amazon', 'Flipkart'],
    serviceAccountNumber: 'ACC123456',
    hasGST: 'yes',
    gstNumber: '27AADCB2230M1Z3',
    monthlyOnlineSales: '2L-5L',
    marketingServices: {
        sponsoredAds: true,
        seasonalCampaigns: false,
        platformPromotions: true,
        socialMediaPromotions: false,
        creativeDesign: true,
        platformSpecificAds: false
    },
    isManufacturer: true,
    yearEstablished: '2020',
    numberOfProducts: '100',
    productUSP: 'High quality, eco-friendly products',
    productCategory: 'Electronics',
    productDescription: 'Smart home devices and accessories',
    panNumber: 'ABCDE1234F',
    additionalNotes: 'Looking for comprehensive marketplace management'
};

const PartnerUserForm = ({ onSubmit, onCancel }) => {
    const navigate = useNavigate();
    const { isAuthenticated, loading } = useAuth();
    const [submittedRequest, setSubmittedRequest] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [userData, setUserData] = useState(null);
    const [isLoadingUser, setIsLoadingUser] = useState(true);
    const [formData, setFormData] = useState({
        serviceType: 'ams',
        marketplaces: [],
        serviceAccountNumber: '',
        hasGST: 'no',
        gstNumber: '',
        monthlyOnlineSales: '',
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
        additionalNotes: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [gstError, setGstError] = useState('');
    const [errors, setErrors] = useState({});

    // Fetch user data
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await mockApiService.get('/api/user/data');
                if (response.success) {
                    setUserData(response.userData);
                } else {
                    toast.error('Failed to fetch user data');
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
                toast.error('Error loading user information');
            } finally {
                setIsLoadingUser(false);
            }
        };

        if (isAuthenticated) {
            fetchUserData();
        }
    }, [isAuthenticated]);

    // Load the most recent request when component mounts
    useEffect(() => {
        const fetchLatestRequest = async () => {
            try {
                const response = await simulateApiCall({ 
                    success: true, 
                    data: [mockPartnerRequest] 
                });
                if (response.success && response.data.length > 0) {
                    const latestRequest = response.data[0];
                    setSubmittedRequest(latestRequest);
                    if (!isEditing) {
                        setFormData({
                            ...latestRequest,
                            marketingServices: latestRequest.marketingServices || {
                                sponsoredAds: false,
                                seasonalCampaigns: false,
                                platformPromotions: false,
                                socialMediaPromotions: false,
                                creativeDesign: false,
                                platformSpecificAds: false
                            }
                        });
                    }
                }
            } catch (error) {
                console.error('Error fetching latest request:', error);
                toast.error('Error loading previous request');
            }
        };

        if (isAuthenticated) {
            fetchLatestRequest();
        }
    }, [isAuthenticated]);

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
            <div className="space-y-4 px-2">
                <div className="bg-gradient-to-br from-white to-green-50/50 p-4 rounded-lg border border-green-100/50">
                    <label className="block text-sm font-medium text-gray-700 mb-3">Marketplaces</label>
                    <div className="grid grid-cols-2 gap-4">
                        {marketplaceOptions.map(marketplace => (
                            <label key={marketplace} className="flex items-center space-x-3 p-3 bg-white/90 rounded-md border border-green-100/50 hover:border-green-500 transition-colors">
                                <input
                                    type="checkbox"
                                    name="marketplaces"
                                    value={marketplace}
                                    checked={formData.marketplaces.includes(marketplace)}
                                    onChange={handleChange}
                                    className="w-4 h-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
                                />
                                <span className="text-sm text-gray-700">{marketplace}</span>
                            </label>
                        ))}
                    </div>
                </div>

                <div className="bg-gradient-to-br from-white to-green-50/50 p-4 rounded-lg border border-green-100/50">
                    <label className="block text-sm font-medium text-gray-700 mb-3">Service Account Number</label>
                    <input
                        type="text"
                        name="serviceAccountNumber"
                        value={formData.serviceAccountNumber}
                        onChange={handleChange}
                        placeholder="Enter your service account number"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 p-3"
                    />
                </div>

                <div className="bg-gradient-to-br from-white to-green-50/50 p-4 rounded-lg border border-green-100/50">
                    <label className="block text-sm font-medium text-gray-700 mb-3">Do you have GST number?</label>
                    <div className="flex space-x-6 mb-4">
                        <label className="flex items-center space-x-3 p-3 bg-white/90 rounded-md border border-green-100/50 hover:border-green-500 transition-colors">
                            <input
                                type="radio"
                                name="hasGST"
                                value="yes"
                                checked={formData.hasGST === 'yes'}
                                onChange={handleChange}
                                className="w-4 h-4 text-green-600 focus:ring-green-500"
                            />
                            <span className="text-sm text-gray-700">Yes</span>
                        </label>
                        <label className="flex items-center space-x-3 p-3 bg-white/90 rounded-md border border-green-100/50 hover:border-green-500 transition-colors">
                            <input
                                type="radio"
                                name="hasGST"
                                value="no"
                                checked={formData.hasGST === 'no'}
                                onChange={handleChange}
                                className="w-4 h-4 text-green-600 focus:ring-green-500"
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
                                className={`mt-1 block w-full rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 p-3 ${
                                    gstError ? 'border-red-300 bg-red-50' : 'border-gray-300'
                                }`}
                            />
                            {gstError && (
                                <p className="mt-2 text-sm text-red-600">{gstError}</p>
                            )}
                        </div>
                    )}
                </div>

                <div className="bg-gradient-to-br from-white to-green-50/50 p-4 rounded-lg border border-green-100/50">
                    <label className="block text-sm font-medium text-gray-700 mb-3">Monthly Online Sales Volume (Optional)</label>
                    <select
                        name="monthlyOnlineSales"
                        value={formData.monthlyOnlineSales}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 p-3"
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
            <div className="space-y-4 px-2">
                <div className="bg-gradient-to-br from-white to-green-50/50 p-4 rounded-lg border border-green-100/50">
                    <label className="block text-sm font-medium text-gray-700 mb-3">Platform Type</label>
                    <div className="grid grid-cols-2 gap-4">
                        {platformOptions.map(platform => (
                            <label key={platform} className="flex items-center space-x-3 p-3 bg-white/90 rounded-md border border-green-100/50 hover:border-green-500 transition-colors">
                                <input
                                    type="checkbox"
                                    name="marketplaces"
                                    value={platform}
                                    checked={formData.marketplaces.includes(platform)}
                                    onChange={handleChange}
                                    className="w-4 h-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
                                />
                                <span className="text-sm text-gray-700">{platform}</span>
                            </label>
                        ))}
                    </div>
                </div>

                <div className="bg-gradient-to-br from-white to-green-50/50 p-4 rounded-lg border border-green-100/50">
                    <label className="block text-sm font-medium text-gray-700 mb-3">Do you have GST number?</label>
                    <div className="flex space-x-6 mb-4">
                        <label className="flex items-center space-x-3 p-3 bg-white/90 rounded-md border border-green-100/50 hover:border-green-500 transition-colors">
                            <input
                                type="radio"
                                name="hasGST"
                                value="yes"
                                checked={formData.hasGST === 'yes'}
                                onChange={handleChange}
                                className="w-4 h-4 text-green-600 focus:ring-green-500"
                            />
                            <span className="text-sm text-gray-700">Yes</span>
                        </label>
                        <label className="flex items-center space-x-3 p-3 bg-white/90 rounded-md border border-green-100/50 hover:border-green-500 transition-colors">
                            <input
                                type="radio"
                                name="hasGST"
                                value="no"
                                checked={formData.hasGST === 'no'}
                                onChange={handleChange}
                                className="w-4 h-4 text-green-600 focus:ring-green-500"
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
                                className={`mt-1 block w-full rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 p-3 ${
                                    gstError ? 'border-red-300 bg-red-50' : 'border-gray-300'
                                }`}
                            />
                            {gstError && (
                                <p className="mt-2 text-sm text-red-600">{gstError}</p>
                            )}
                        </div>
                    )}
                </div>

                <div className="bg-gradient-to-br from-white to-green-50/50 p-4 rounded-lg border border-green-100/50">
                    <label className="block text-sm font-medium text-gray-700 mb-3">Monthly Online Sales Volume (Optional)</label>
                    <select
                        name="monthlyOnlineSales"
                        value={formData.monthlyOnlineSales}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 p-3"
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
            <div className="space-y-4 px-2">
                <div className="bg-gradient-to-br from-white to-green-50/50 p-4 rounded-lg border border-green-100/50">
                    <label className="block text-sm font-medium text-gray-700 mb-3">Are you a manufacturer?</label>
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
            <div className="space-y-4 px-2">
                <div className="bg-gradient-to-br from-white to-green-50/50 p-4 rounded-lg border border-green-100/50">
                    <label className="block text-sm font-medium text-gray-700 mb-3">Select Target Marketplaces</label>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {marketplaceOptions.map((marketplace) => (
                            <div key={marketplace} className="flex items-center p-3 bg-white/90 rounded-md border border-green-100/50">
                                <input
                                    type="checkbox"
                                    id={`marketplace-${marketplace}`}
                                    name="marketplaces"
                                    value={marketplace}
                                    checked={formData.marketplaces.includes(marketplace)}
                                    onChange={handleChange}
                                    className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                />
                                <label htmlFor={`marketplace-${marketplace}`} className="ml-2 text-sm text-gray-700">
                                    {marketplace}
                                </label>
                            </div>
                        ))}
                    </div>
                </div>

                {/* What We Offer Section */}
                <div className="bg-gradient-to-br from-white to-green-50/50 p-4 rounded-lg border border-green-100/50">
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
                            <li>• Participation in Lightning Deals, Big Billion Day, Amazon Prime Day, Flipkart Big Savings, etc.</li>
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
                            <li>• Zomato / Swiggy – Sponsored listings, discount campaigns, and regional targeting</li>
                        </ul>
                    </div>

                    {/* Our Process */}
                    <div className="mb-6">
                        <h4 className="text-sm font-medium text-gray-900 mb-2">Our Process</h4>
                        <ul className="ml-6 text-sm text-gray-600 space-y-1">
                            <li>• Audit – Analyze your current product listings and ad performance</li>
                            <li>• Strategy – Define goals (awareness, sales, traffic) and target audience</li>
                            <li>• Execution – Launch platform and social ads, seasonal campaigns</li>
                            <li>• Optimization – Weekly monitoring, reporting, and ad refinements</li>
                            <li>• Scale – Expand to new platforms or regions</li>
                        </ul>
                    </div>

                    {/* Advertising Management Plans */}
                    <div className="mb-6">
                        <h4 className="text-sm font-medium text-gray-900 mb-2">Advertising Management Plans</h4>
                        <div className="ml-6 text-sm text-gray-600">
                            <p>• Basic Plan - Ideal for new sellers</p>
                            <p>• Growth Plan - Perfect for scaling brands</p>
                            <p>• Pro+ Plan - Best for multi-channel sellers</p>
                            <p className="mt-2 text-xs italic">* Ad spend is billed separately based on platform budgets.</p>
                        </div>
                    </div>

                    {/* Why Choose Us */}
                    <div className="mb-6">
                        <h4 className="text-sm font-medium text-gray-900 mb-2">Why Choose 99digicom?</h4>
                        <ul className="ml-6 text-sm text-gray-600 space-y-1">
                            <li>• Platform-specific ad specialists</li>
                            <li>• Weekly performance reports</li>
                            <li>• Creative support for banners, videos & reels</li>
                            <li>• Campaigns tailored to your product category</li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            let response;
            const requestData = { ...formData };

            if (submittedRequest?._id && isEditing) {
                // Check if the request is already processed
                const checkResponse = await simulateApiCall({
                    success: true,
                    data: { status: 'pending' }
                });
                
                if (checkResponse.success && checkResponse.data.status === 'processed') {
                    toast.error('Cannot update a processed request');
                    setIsEditing(false);
                    return;
                }
                
                response = await simulateApiCall({
                    success: true,
                    data: { ...mockPartnerRequest, ...requestData }
                });
                console.log('Update response:', response);
                toast.success('Request updated successfully');
            } else {
                response = await simulateApiCall({
                    success: true,
                    data: { ...mockPartnerRequest, ...requestData }
                });
                console.log('Create response:', response);
                toast.success('Request created successfully');
            }
            
            if (response.success) {
                setSubmittedRequest(response.data);
                setIsEditing(false);

                if (onSubmit) {
                    onSubmit(response.data);
                }
            } else {
                throw new Error('Failed to save request');
            }
        } catch (error) {
            console.error('Error saving request:', error);
            toast.error('Failed to save request. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleCancel = () => {
        setIsEditing(false);
        setFormData({
            ...submittedRequest,
            marketingServices: submittedRequest.marketingServices || {
                sponsoredAds: false,
                seasonalCampaigns: false,
                platformPromotions: false,
                socialMediaPromotions: false,
                creativeDesign: false,
                platformSpecificAds: false
            }
        });
    };

    // Show loading state while checking authentication or loading user data
    if (loading || isLoadingUser) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-green-50 to-white flex items-center justify-center">
                <div className="bg-white rounded-lg shadow-lg p-6">
                    <div className="w-8 h-8 border-4 border-green-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
                    <p className="text-gray-600 text-sm mt-4">Loading...</p>
                </div>
            </div>
        );
    }

    // Don't render form if not authenticated
    if (!isAuthenticated) {
        return null;
    }

    // If there's a submitted request and we're not editing, show the details view
    if (submittedRequest && !isEditing) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 py-12 px-4">
                <div className="max-w-3xl mx-auto">
                    <div className="bg-white rounded-lg shadow-lg p-8 border border-green-100">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold text-gray-900">Partner Request Details</h2>
                            <button
                                onClick={handleEdit}
                                className="inline-flex items-center px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors"
                            >
                                <Edit2 className="w-4 h-4 mr-2" />
                                Edit Request
                            </button>
                        </div>

                        <div className="space-y-6">
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900">Service Type</h3>
                                <p className="mt-1 text-gray-600 capitalize">{submittedRequest.serviceType}</p>
                            </div>

                            {submittedRequest.marketplaces && submittedRequest.marketplaces.length > 0 && (
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900">Marketplaces</h3>
                                    <div className="mt-2 flex flex-wrap gap-2">
                                        {submittedRequest.marketplaces.map((marketplace) => (
                                            <span
                                                key={marketplace}
                                                className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm"
                                            >
                                                {marketplace}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {submittedRequest.serviceAccountNumber && (
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900">Service Account Number</h3>
                                    <p className="mt-1 text-gray-600">{submittedRequest.serviceAccountNumber}</p>
                                </div>
                            )}

                            <div>
                                <h3 className="text-lg font-semibold text-gray-900">GST Status</h3>
                                <p className="mt-1 text-gray-600">
                                    {submittedRequest.hasGST === 'yes' ? (
                                        <>
                                            Has GST: {submittedRequest.gstNumber}
                                        </>
                                    ) : (
                                        'No GST'
                                    )}
                                </p>
                            </div>

                            {submittedRequest.monthlyOnlineSales && (
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900">Monthly Online Sales</h3>
                                    <p className="mt-1 text-gray-600">{submittedRequest.monthlyOnlineSales}</p>
                                </div>
                            )}

                            {submittedRequest.marketingServices && Object.values(submittedRequest.marketingServices).some(Boolean) && (
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900">Marketing Services</h3>
                                    <div className="mt-2 space-y-2">
                                        {Object.entries(submittedRequest.marketingServices)
                                            .filter(([_, value]) => value)
                                            .map(([service]) => (
                                                <div key={service} className="flex items-center">
                                                    <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                                                    <span className="text-gray-600">{service.replace(/([A-Z])/g, ' $1').trim()}</span>
                                                </div>
                                            ))}
                                    </div>
                                </div>
                            )}

                            {submittedRequest.additionalNotes && (
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900">Additional Notes</h3>
                                    <p className="mt-1 text-gray-600">{submittedRequest.additionalNotes}</p>
                                </div>
                            )}

                            <div className="mt-8 pt-6 border-t border-gray-200">
                                <p className="text-sm text-gray-500">
                                    Request Status: <span className="font-medium capitalize">{submittedRequest.status}</span>
                                </p>
                                <p className="text-sm text-gray-500 mt-1">
                                    Submitted: {new Date(submittedRequest.createdAt).toLocaleDateString()}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Render the form for editing or creating
    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50">
            {/* Hero Section */}
            <section className="pt-12 pb-8 px-4">
                <div className="max-w-7xl mx-auto text-center">
                    <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
                        <Store className="h-4 w-4" />
                        <span>Partner with 99digicom</span>
                    </div>
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">
                        {isEditing ? 'Edit Your Partner Request' : 'Create Your Partner Request'}
                    </h1>
                </div>
            </section>

            {/* Form Section */}
            <section className="py-8 px-4">
                <div className="max-w-3xl mx-auto">
                    <div className="bg-gradient-to-br from-white via-green-50/30 to-emerald-50/30 backdrop-blur-sm rounded-lg shadow-lg p-8 border border-green-100/50 hover:shadow-xl transition-shadow">
                        <form onSubmit={handleSubmit} className="space-y-4">
                            {/* User Information Section */}
                            <div className="bg-white p-6 rounded-lg shadow-sm border border-green-100 mb-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">User Information</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                                        <div className="flex items-center bg-gray-50 px-4 py-2.5 rounded-md">
                                            <User className="w-5 h-5 text-gray-400 mr-2" />
                                            <span className="text-gray-900">{userData?.name || 'N/A'}</span>
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                                        <div className="flex items-center bg-gray-50 px-4 py-2.5 rounded-md">
                                            <Mail className="w-5 h-5 text-gray-400 mr-2" />
                                            <span className="text-gray-900">{userData?.email || 'N/A'}</span>
                                        </div>
                                    </div>
                                    {userData?.phone && (
                                        <div className="col-span-2">
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                                            <div className="flex items-center bg-gray-50 px-4 py-2.5 rounded-md">
                                                <Phone className="w-5 h-5 text-gray-400 mr-2" />
                                                <span className="text-gray-900">{userData.phone}</span>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Service Type Selection */}
                            <div className="bg-gradient-to-br from-white to-green-50/50 p-4 rounded-lg border border-green-100/50">
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
                                                className="block p-4 bg-white border-2 rounded-lg cursor-pointer transition-all peer-checked:border-green-600 peer-checked:bg-green-50 hover:bg-gray-50"
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
                            <div className="bg-gradient-to-br from-white to-green-50/50 p-4 rounded-lg border border-green-100/50">
                                <label className="block text-sm font-medium text-gray-700 mb-3">Additional Notes</label>
                                <textarea
                                    name="additionalNotes"
                                    value={formData.additionalNotes}
                                    onChange={handleChange}
                                    rows="4"
                                    className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-green-600 resize-y"
                                    placeholder="Any additional information you'd like to share..."
                                />
                            </div>

                            {/* Form Actions */}
                            <div className="flex justify-end space-x-4">
                                {isEditing && (
                    <button
                        type="button"
                                        onClick={handleCancel}
                                        className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                        Cancel
                    </button>
                                )}
                    <button
                        type="submit"
                                    className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-medium rounded-lg hover:from-green-700 hover:to-emerald-700 transition-colors focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                    disabled={isSubmitting || (formData.hasGST === 'yes' && gstError)}
                                >
                                    {isSubmitting ? (
                                        <>
                                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                                            Submitting...
                                        </>
                                    ) : (
                                        <>
                                            {isEditing ? 'Update Request' : 'Submit Request'}
                                            <ArrowRight className="ml-2 h-5 w-5" />
                                        </>
                                    )}
                    </button>
                </div>
            </form>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default PartnerUserForm;