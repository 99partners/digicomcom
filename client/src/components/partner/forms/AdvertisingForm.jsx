import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, ArrowLeftCircle, ArrowRightCircle, CheckCircle2, Target, Brain, BarChart3, Image, Briefcase, Phone } from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';

const AdvertisingForm = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    services: {
      sponsoredAds: false,
      seasonalCampaigns: false,
      platformPromotions: false,
      socialMedia: false,
      creativeDesign: false
    },
    selectedPlan: ''
  });

  // Define form fields configuration
  const formFields = [
    {
      name: 'services',
      label: 'What We Offer',
      type: 'serviceOfferings',
      required: true,
      sections: [
        {
          id: 'sponsoredAds',
          title: 'Sponsored Ad Campaigns (PPC)',
          icon: <Target className="w-5 h-5" />,
          features: [
            'Create and manage product ads on Amazon, Flipkart, Meesho, Jiomart, and more',
            'Keyword research and targeting',
            'Ad budget optimization for maximum ROI',
            'A/B testing and performance tracking'
          ]
        },
        {
          id: 'seasonalCampaigns',
          title: 'Seasonal & Festival Campaigns',
          icon: <CheckCircle2 className="w-5 h-5" />,
          features: [
            'Diwali, Holi, Republic Day, New Year, Raksha Bandhan, etc.',
            'Custom promotions and product bundling',
            'Sale event calendar planning'
          ]
        },
        {
          id: 'platformPromotions',
          title: 'Platform-Specific Promotions',
          icon: <CheckCircle2 className="w-5 h-5" />,
          features: [
            'Participation in Lightning Deals, Big Billion Day, Amazon Prime Day, Flipkart Big Savings, etc.',
            'Exclusive offers and banner placements',
            'Pricing strategy for offer periods'
          ]
        },
        {
          id: 'socialMedia',
          title: 'Social Media & Off-Platform Promotions',
          icon: <CheckCircle2 className="w-5 h-5" />,
          features: [
            'Targeted ads on Meta (Facebook/Instagram), Google, YouTube',
            'Influencer collaborations & affiliate campaigns',
            'Landing pages & conversion tracking'
          ]
        },
        {
          id: 'creativeDesign',
          title: 'Creative & Content Design',
          icon: <CheckCircle2 className="w-5 h-5" />,
          features: [
            'Ad banners, creatives, product videos, short reels',
            'Enhanced brand content (A+ Content on Amazon)',
            'Product infographics and storytelling visuals'
          ]
        }
      ]
    },
    {
      name: 'selectedPlan',
      label: 'Platform-Specific Advertising Expertise',
      type: 'platformSelection',
      required: true,
      platforms: [
        {
          id: 'amazon',
          title: 'Amazon',
          features: [
            'Sponsored Products',
            'Sponsored Brands',
            'Brand Store Ads',
            'A+ Content Optimization'
          ]
        },
        {
          id: 'flipkart',
          title: 'Flipkart',
          features: [
            'Product Listing Ads (PLA)',
            'Brand Store Management',
            'Flipkart Ads Dashboard',
            'Performance Optimization'
          ]
        },
        {
          id: 'meesho',
          title: 'Meesho',
          features: [
            'Catalog Optimization',
            'Sponsored Listings',
            'Flash Sale Strategy',
            'Discount Management'
          ]
        },
        {
          id: 'jiomart',
          title: 'JioMart',
          features: [
            'Homepage Banners',
            'Coupon Offers',
            'Deal Days',
            'Category Promotions'
          ]
        },
        {
          id: 'ondc',
          title: 'ONDC',
          features: [
            'Buyer-side Visibility',
            'Network Integration',
            'Partner App Campaigns',
            'Price Strategy'
          ]
        },
        {
          id: 'zomato',
          title: 'Zomato',
          features: [
            'Sponsored Listings',
            'Discount Campaigns',
            'Regional Targeting',
            'Performance Analytics'
          ]
        }
      ]
    }
  ];

  const handleChange = (e, section = null) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox' && section) {
      setFormData(prev => ({
        ...prev,
        services: {
          ...prev.services,
          [section]: checked
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Only submit if we're on the last step
    if (currentStep !== formFields.length - 1) {
      return;
    }

    // Check if user is authenticated
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    try {
      console.log('Submitting form data:', formData);
      
      const token = localStorage.getItem('authToken');
      const response = await fetch('http://localhost:5050/api/advertising/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        credentials: 'include',
        body: JSON.stringify(formData)
      });

      const responseData = await response.json();
      console.log('Server response:', responseData);

      if (!response.ok) {
        if (response.status === 401) {
          navigate('/login');
          return;
        }
        throw new Error(responseData.message || 'Failed to submit application');
      }

      // If submission is successful, navigate to dashboard
      if (responseData.success) {
        console.log('Form submitted successfully, redirecting to dashboard...');
        navigate('/dashboard', { replace: true });
      } else {
        throw new Error('Failed to store data in database');
      }
    } catch (error) {
      console.error('Error submitting application:', error);
      console.error('Error details:', error.message);
      alert('Failed to submit form. Please try again.');
    }
  };

  const isCurrentFieldValid = () => {
    if (!formFields[currentStep].required) return true;
    
    if (formFields[currentStep].name === 'services') {
      return Object.values(formData.services).some(value => value);
    }
    
    if (formFields[currentStep].name === 'selectedPlan') {
      return !!formData.selectedPlan;
    }
    
    return true;
  };

  const renderField = (field) => {
    switch (field.type) {
      case 'serviceOfferings':
        return (
          <div className="space-y-6">
            {field.sections.map(section => (
              <div key={section.id} className="bg-white rounded-lg p-4 border border-gray-200 hover:border-green-500 transition-colors">
                <label className="flex items-start space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.services[section.id]}
                    onChange={(e) => handleChange(e, section.id)}
                    className="h-4 w-4 mt-1 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                  />
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      {section.icon}
                      <span className="font-medium text-gray-900">{section.title}</span>
                    </div>
                    <ul className="mt-2 space-y-1 text-sm text-gray-600">
                      {section.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center space-x-2">
                          <span>•</span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </label>
              </div>
            ))}
          </div>
        );
      case 'platformSelection':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {field.platforms.map(platform => (
              <div key={platform.id} 
                className={`relative bg-white rounded-lg p-4 border-2 transition-colors cursor-pointer ${
                  formData.selectedPlan === platform.id ? 'border-green-500' : 'border-gray-200 hover:border-green-300'
                }`}
                onClick={() => handleChange({ target: { name: 'selectedPlan', value: platform.id } })}
              >
                <div className="text-lg font-semibold text-gray-900 mb-3">{platform.title}</div>
                <ul className="space-y-2 text-sm">
                  {platform.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center space-x-2">
                      <CheckCircle2 className="w-4 h-4 text-green-500" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex items-center mb-6">
        <button
          onClick={() => navigate('/dashboard/create-application')}
          className="mr-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-gray-600" />
        </button>
        <h1 className="text-2xl font-semibold text-gray-800">Marketing & Advertising Application</h1>
      </div>

      <div className="mb-6">
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-green-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentStep + 1) / formFields.length) * 100}%` }}
          />
        </div>
        <div className="text-sm text-gray-600 mt-2">
          Step {currentStep + 1} of {formFields.length}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
          <div className="mb-4">
            <label className="block text-lg font-medium text-gray-700 mb-4">
              {formFields[currentStep].label}
              {formFields[currentStep].required && <span className="text-red-500 ml-1">*</span>}
            </label>
            {renderField(formFields[currentStep])}
          </div>

          <div className="flex justify-between items-center mt-8">
            <button
              type="button"
              onClick={() => setCurrentStep(prev => prev - 1)}
              className={`px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors flex items-center ${
                currentStep === 0 ? 'invisible' : ''
              }`}
              disabled={currentStep === 0}
            >
              <ArrowLeftCircle className="w-4 h-4 mr-2" />
              Back
            </button>

            {currentStep === formFields.length - 1 ? (
              <button
                type="button"
                onClick={handleSubmit}
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center"
                disabled={!isCurrentFieldValid()}
              >
                <Save className="w-4 h-4 mr-2" />
                Submit Application
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setCurrentStep(prev => prev + 1)}
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center"
                disabled={!isCurrentFieldValid()}
              >
                Next
                <ArrowRightCircle className="w-4 h-4 ml-2" />
              </button>
            )}
          </div>
        </div>
      </form>

      {/* Why Choose Us Section */}
      <div className="mt-8 bg-white rounded-lg p-6 shadow-sm border border-gray-100">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Why Choose 99digicom?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="flex items-center space-x-3">
            <Brain className="w-5 h-5 text-green-600" />
            <span>Platform-specific ad specialists</span>
          </div>
          <div className="flex items-center space-x-3">
            <BarChart3 className="w-5 h-5 text-green-600" />
            <span>Weekly performance reports</span>
          </div>
          <div className="flex items-center space-x-3">
            <Image className="w-5 h-5 text-green-600" />
            <span>Creative support for banners, videos & reels</span>
          </div>
          <div className="flex items-center space-x-3">
            <Briefcase className="w-5 h-5 text-green-600" />
            <span>Campaigns tailored to your product category</span>
          </div>
        </div>

        <div className="mt-6 text-center">
          <div className="flex items-center justify-center space-x-2 text-gray-600">
            <Phone className="w-5 h-5" />
            <span>Ready to Advertise Smarter?</span>
          </div>
          <p className="mt-2 text-gray-600">Let us help you run targeted campaigns that deliver real results.</p>
        </div>
      </div>
    </div>
  );
};

export default AdvertisingForm; 