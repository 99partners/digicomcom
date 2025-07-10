import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../../config/api.config';

const ServiceForm = () => {
  const { serviceType } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showGSTInput, setShowGSTInput] = useState(false);
  const [isManufacturer, setIsManufacturer] = useState(false);
  const [activeTab, setActiveTab] = useState('amazon');

  const [formData, setFormData] = useState({
    serviceType: '',
    marketplaces: [],
    serviceAccountNumber: '',
    hasGST: '',
    gstNumber: '',
    salesVolume: '',
    marketingServices: [],
    yearEstablished: '',
    numberOfProducts: '',
    productUSP: '',
    category: '',
    description: '',
    panNumber: ''
  });

  const marketplaceOptions = [
    'ondc',
    'amazon',
    'flipkart',
    'meesho',
    'jiomart',
    'indiamart',
    'snapdeal'
  ];

  const salesVolumeOptions = [
    'Less than ₹50,000',
    '₹50,000 – ₹2,00,000',
    '₹2,00,000 – ₹5,00,000',
    '₹5,00,000+'
  ];

  const marketingServiceOptions = [
    'Sponsored Ad Campaigns (PPC)',
    'Seasonal & Festival Campaigns',
    'Platform-Specific Promotions',
    'Social Media & Off-Platform Promotions',
    'Creative & Content Design'
  ];

  const platformExpertise = {
    amazon: 'Expert in Amazon PPC, A+ Content, and Brand Store optimization',
    flipkart: 'Specialized in Flipkart ads and brand promotion strategies',
    meesho: 'Focused on Meesho catalog optimization and visibility',
    jiomart: 'JioMart platform expertise and growth strategies',
    ondc: 'ONDC network integration and optimization',
    zomato: 'Food delivery platform optimization and promotions'
  };

  useEffect(() => {
    const serviceTypeMap = {
      'platform': 'Platform Enablement',
      'ams': 'Account Management Services (AMS)',
      'marketing': 'Marketing Services',
      'cobranding': 'Co-Branding Partnership'
    };
    
    const mappedServiceType = serviceTypeMap[serviceType];
    if (!mappedServiceType) {
      navigate('/dashboard/create-application');
      return;
    }
    
    setFormData(prev => ({
      ...prev,
      serviceType: mappedServiceType
    }));
  }, [serviceType, navigate]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox') {
      if (name === 'marketplaces') {
        const updatedMarketplaces = checked
          ? [...formData.marketplaces, value]
          : formData.marketplaces.filter(item => item !== value);
        setFormData(prev => ({ ...prev, marketplaces: updatedMarketplaces }));
      } else if (name === 'marketingServices') {
        const updatedServices = checked
          ? [...formData.marketingServices, value]
          : formData.marketingServices.filter(item => item !== value);
        setFormData(prev => ({ ...prev, marketingServices: updatedServices }));
      } else if (name === 'isManufacturer') {
        setIsManufacturer(checked);
      }
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }

    // Handle GST radio button
    if (name === 'hasGST') {
      setShowGSTInput(value === 'yes');
      if (value === 'no') {
        setFormData(prev => ({ ...prev, gstNumber: '' }));
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      console.log('Submitting form data:', formData);
      const response = await api.post('/api/applications', formData);
      console.log('Server response:', response.data);
      toast.success('Application submitted successfully!');
      navigate('/dashboard/');
    } catch (error) {
      console.error('Submission error details:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
        config: {
          url: error.config?.url,
          method: error.config?.method,
          headers: error.config?.headers
        }
      });
      
      toast.error(error.response?.data?.message || 'Error submitting application');
      navigate('/dashboard/');
    } finally {
      setLoading(false);
    }
  };

  const renderPlatformEnablementFields = () => (
    <div className="space-y-6">
      {/* 1. Marketplace Selection */}
      <div className="space-y-4">
        <label className="block text-lg font-medium">Select Marketplaces</label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {marketplaceOptions.map(marketplace => (
            <label key={marketplace} className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="marketplaces"
                value={marketplace}
                checked={formData.marketplaces.includes(marketplace)}
                onChange={handleInputChange}
                className="form-checkbox"
              />
              <span className="capitalize">{marketplace}</span>
            </label>
          ))}
        </div>
      </div>

      {/* 2. GST Section */}
      <div className="space-y-4">
        <label className="block text-lg font-medium">Do you have a GST number?</label>
        <div className="flex space-x-4">
          <label className="inline-flex items-center">
            <input
              type="radio"
              name="hasGST"
              value="yes"
              checked={formData.hasGST === 'yes'}
              onChange={handleInputChange}
              className="form-radio"
            />
            <span className="ml-2">Yes</span>
          </label>
          <label className="inline-flex items-center">
            <input
              type="radio"
              name="hasGST"
              value="no"
              checked={formData.hasGST === 'no'}
              onChange={handleInputChange}
              className="form-radio"
            />
            <span className="ml-2">No</span>
          </label>
        </div>
      </div>

      {showGSTInput && (
        <div>
          <label className="block text-lg font-medium">GST Number</label>
          <input
            type="text"
            name="gstNumber"
            value={formData.gstNumber}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
            placeholder="Enter GST Number"
          />
        </div>
      )}

      {/* 3. Sales Volume */}
      <div>
        <label className="block text-lg font-medium">Monthly Online Sales Volume (Optional)</label>
        <select
          name="salesVolume"
          value={formData.salesVolume}
          onChange={handleInputChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
        >
          <option value="">Select Sales Volume</option>
          {salesVolumeOptions.map(option => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
      </div>
    </div>
  );

  const renderAMSFields = () => (
    <div className="space-y-6">
      {/* 1. Marketplace Selection */}
      <div className="space-y-4">
        <label className="block text-lg font-medium">Select Marketplaces</label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {marketplaceOptions.map(marketplace => (
            <label key={marketplace} className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="marketplaces"
                value={marketplace}
                checked={formData.marketplaces.includes(marketplace)}
                onChange={handleInputChange}
                className="form-checkbox"
              />
              <span className="capitalize">{marketplace}</span>
            </label>
          ))}
        </div>
      </div>

      {/* 2. Service Account Number */}
      <div>
        <label className="block text-lg font-medium">Service Account Number</label>
        <input
          type="text"
          name="serviceAccountNumber"
          value={formData.serviceAccountNumber}
          onChange={handleInputChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
        />
      </div>

      {/* 3. GST Section */}
      <div className="space-y-4">
        <label className="block text-lg font-medium">Do you have a GST number?</label>
        <div className="flex space-x-4">
          <label className="inline-flex items-center">
            <input
              type="radio"
              name="hasGST"
              value="yes"
              checked={formData.hasGST === 'yes'}
              onChange={handleInputChange}
              className="form-radio"
            />
            <span className="ml-2">Yes</span>
          </label>
          <label className="inline-flex items-center">
            <input
              type="radio"
              name="hasGST"
              value="no"
              checked={formData.hasGST === 'no'}
              onChange={handleInputChange}
              className="form-radio"
            />
            <span className="ml-2">No</span>
          </label>
        </div>
      </div>

      {showGSTInput && (
        <div>
          <label className="block text-lg font-medium">GST Number</label>
          <input
            type="text"
            name="gstNumber"
            value={formData.gstNumber}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
            placeholder="Enter GST Number"
          />
        </div>
      )}

      {/* 4. Sales Volume */}
      <div>
        <label className="block text-lg font-medium">Monthly Online Sales Volume (Optional)</label>
        <select
          name="salesVolume"
          value={formData.salesVolume}
          onChange={handleInputChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
        >
          <option value="">Select Sales Volume</option>
          {salesVolumeOptions.map(option => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
      </div>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <form onSubmit={handleSubmit} className="space-y-6 bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold mb-6">
          {formData.serviceType} Application
        </h2>

        {/* Render fields based on service type */}
        {formData.serviceType === 'Platform Enablement' && renderPlatformEnablementFields()}
        {formData.serviceType === 'Account Management Services (AMS)' && renderAMSFields()}
        {formData.serviceType === 'Marketing Services' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-medium mb-4">What We Offer</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {marketingServiceOptions.map(service => (
                  <label key={service} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      name="marketingServices"
                      value={service}
                      checked={formData.marketingServices.includes(service)}
                      onChange={handleInputChange}
                      className="form-checkbox"
                    />
                    <span>{service}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xl font-medium mb-4">Platform-Specific Advertising Expertise</h3>
              <div className="border rounded-lg">
                <div className="flex border-b">
                  {Object.keys(platformExpertise).map(platform => (
                    <button
                      key={platform}
                      type="button"
                      onClick={() => setActiveTab(platform)}
                      className={`px-4 py-2 ${activeTab === platform ? 'bg-green-50 text-green-600 border-b-2 border-green-500' : ''}`}
                    >
                      {platform.charAt(0).toUpperCase() + platform.slice(1)}
                    </button>
                  ))}
                </div>
                <div className="p-4">
                  {platformExpertise[activeTab]}
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-medium mb-4">Our Process</h3>
              <p className="text-gray-600">
                We follow a systematic approach to maximize your marketing success through careful planning,
                execution, and optimization of campaigns across all chosen platforms.
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-medium mb-4">Why Choose 99digicom?</h3>
              <p className="text-gray-600">
                With our expertise across multiple platforms and proven track record of successful campaigns,
                we deliver measurable results and sustainable growth for your business.
              </p>
            </div>

            <div className="flex space-x-4">
              <button
                type="button"
                className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                onClick={() => toast.info('Booking system coming soon!')}
              >
                Book a Free Ad Audit
              </button>
              <button
                type="button"
                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                onClick={() => toast.info('Quote system coming soon!')}
              >
                Get a Quote
              </button>
            </div>
          </div>
        )}

        {/* Co-Branding Specific Fields */}
        {formData.serviceType === 'Co-Branding Partnership' && (
          <div className="space-y-6">
            <div>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name="isManufacturer"
                  checked={isManufacturer}
                  onChange={handleInputChange}
                  className="form-checkbox"
                />
                <span>Are you a Manufacturer?</span>
              </label>
            </div>

            <div>
              <label className="block text-lg font-medium">Year of Establishment</label>
              <select
                name="yearEstablished"
                value={formData.yearEstablished}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
              >
                <option value="">Select Year</option>
                {Array.from({ length: 50 }, (_, i) => new Date().getFullYear() - i).map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
            </div>

            {isManufacturer && (
              <>
                <div>
                  <label className="block text-lg font-medium">Number of Products</label>
                  <input
                    type="number"
                    name="numberOfProducts"
                    value={formData.numberOfProducts}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                    min="1"
                  />
                </div>

                <div>
                  <label className="block text-lg font-medium">Product USP</label>
                  <textarea
                    name="productUSP"
                    value={formData.productUSP}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                    rows="3"
                  />
                </div>

                <div>
                  <label className="block text-lg font-medium">Category</label>
                  <input
                    type="text"
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                  />
                </div>

                <div>
                  <label className="block text-lg font-medium">Description</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                    rows="4"
                  />
                </div>

                <div>
                  <label className="block text-lg font-medium">PAN Number</label>
                  <input
                    type="text"
                    name="panNumber"
                    value={formData.panNumber}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                    placeholder="ABCDE1234F"
                  />
                </div>
              </>
            )}
          </div>
        )}

        <div className="pt-6">
          <button
            type="submit"
            disabled={loading}
            className="w-full px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:bg-gray-400"
          >
            {loading ? 'Submitting...' : 'Submit Application'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ServiceForm; 