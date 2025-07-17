import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, ArrowLeftCircle, ArrowRightCircle, CheckCircle2, Target, Brain, BarChart3, Image, Briefcase, Phone, CreditCard, Clock, DollarSign, Calculator } from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';
import SuccessMessage from '../../SuccessMessage';

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
    selectedPlan: '',
    paymentOption: ''
  });
  const [showSuccess, setShowSuccess] = useState(false);

  const PRICE_PER_MARKETPLACE = 4999;

  // Calculate total price based on selected services
  const calculateTotalPrice = () => {
    const selectedServicesCount = Object.values(formData.services).filter(Boolean).length;
    return selectedServicesCount * PRICE_PER_MARKETPLACE;
  };

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
    
    // Prevent submission if not on final step
    if (currentStep !== 2) {
      console.log('Form submission blocked - not on final step. Current step:', currentStep);
      return;
    }
    
    // Ensure payment option is selected
    if (!formData.paymentOption) {
      console.log('Form submission blocked - no payment option selected');
      alert('Please select a payment option before submitting.');
      return;
    }

    // Check if user is authenticated
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    try {
      console.log('Submitting form data:', formData);
      
      const submitData = {
        services: formData.services,
        selectedPlan: formData.selectedPlan,
        totalAmount: calculateTotalPrice(),
        paymentOption: formData.paymentOption
      };
      
      const token = localStorage.getItem('authToken');
      const response = await fetch('http://localhost:5050/api/advertising/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        credentials: 'include',
        body: JSON.stringify(submitData)
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

      // If submission is successful, show success message
      if (responseData.success) {
        console.log('Form submitted successfully, showing success message...');
        setShowSuccess(true);
      } else {
        throw new Error('Failed to store data in database');
      }
    } catch (error) {
      console.error('Error submitting application:', error);
      console.error('Error details:', error.message);
      alert('Failed to submit form. Please try again.');
    }
  };

  const isCurrentStepValid = () => {
    switch (currentStep) {
      case 0: // Service offerings
        return Object.values(formData.services).some(value => value);
      case 1: // Platform selection
        return formData.selectedPlan !== '';
      case 2: // Payment
        return formData.paymentOption !== '';
      default:
        return true;
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        // Original Step 1: "What We Offer"
        const serviceOfferings = [
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
        ];

        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">What We Offer</h2>
              <p className="text-gray-600">Select the advertising services you need</p>
            </div>

            {/* Pricing Display */}
            {Object.values(formData.services).some(Boolean) && (
              <div className="max-w-md mx-auto bg-green-50 rounded-lg border-2 border-green-200 p-4 mb-6">
                <div className="text-center">
                  <div className="text-sm text-green-700 mb-1">Selected: {Object.values(formData.services).filter(Boolean).length} service(s)</div>
                  <div className="text-2xl font-bold text-green-600">₹{calculateTotalPrice().toLocaleString()}</div>
                  <div className="text-xs text-green-600">₹{PRICE_PER_MARKETPLACE.toLocaleString()} per service</div>
                </div>
              </div>
            )}

            <div className="space-y-6">
              {serviceOfferings.map(section => (
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
          </div>
        );

      case 1:
        // Original Step 2: "Platform-Specific Advertising Expertise"
        const platforms = [
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
        ];

        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Platform-Specific Advertising Expertise</h2>
              <p className="text-gray-600">Choose your preferred platform specialization</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {platforms.map(platform => (
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
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Payment & Next Steps</h2>
              <p className="text-gray-600">Choose how you'd like to proceed with your application</p>
            </div>

            {/* Order Summary */}
            <div className="max-w-md mx-auto bg-white rounded-lg border-2 border-gray-200 p-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Selected Services:</span>
                  <span className="font-medium">{Object.values(formData.services).filter(Boolean).length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Price per service:</span>
                  <span className="font-medium">₹{PRICE_PER_MARKETPLACE.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Platform Expertise:</span>
                  <span className="font-medium text-sm">{formData.selectedPlan || 'Not selected'}</span>
                </div>
                <div className="border-t pt-3">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total Amount:</span>
                    <span className="text-green-600">₹{calculateTotalPrice().toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Options */}
            <div className="max-w-2xl mx-auto">
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Choose Payment Option</h3>
                <p className="text-sm text-gray-600">Select how you'd like to proceed with payment</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div 
                  className={`bg-white rounded-lg p-6 border-2 transition-all duration-200 cursor-pointer hover:shadow-lg ${
                    formData.paymentOption === 'guide'
                      ? 'border-green-500 shadow-md bg-green-50' 
                      : 'border-gray-200 hover:border-green-300'
                  }`}
                  onClick={() => {
                    console.log('Payment Guide option selected');
                    setFormData(prev => ({ ...prev, paymentOption: 'guide' }));
                  }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <Clock className="w-8 h-8 text-blue-600" />
                    {formData.paymentOption === 'guide' && (
                      <CheckCircle2 className="w-6 h-6 text-green-500" />
                    )}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Payment Guide</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    We'll guide you through the payment process and you have 24 hours to complete the payment.
                  </p>
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <p className="text-xs text-blue-800">
                      ✓ Step-by-step payment instructions<br/>
                      ✓ 24-hour payment window<br/>
                      ✓ Dedicated support assistance
                    </p>
                  </div>
                </div>

                <div 
                  className={`bg-white rounded-lg p-6 border-2 transition-all duration-200 cursor-pointer hover:shadow-lg ${
                    formData.paymentOption === 'payment'
                      ? 'border-green-500 shadow-md bg-green-50' 
                      : 'border-gray-200 hover:border-green-300'
                  }`}
                  onClick={() => {
                    console.log('Immediate Payment option selected');
                    setFormData(prev => ({ ...prev, paymentOption: 'payment' }));
                  }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <CreditCard className="w-8 h-8 text-green-600" />
                    {formData.paymentOption === 'payment' && (
                      <CheckCircle2 className="w-6 h-6 text-green-500" />
                    )}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Immediate Payment</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Pay now and get instant access to our advertising services.
                  </p>
                  <div className="bg-green-50 p-3 rounded-lg">
                    <p className="text-xs text-green-800">
                      ✓ Instant service activation<br/>
                      ✓ Priority support<br/>
                      ✓ Secure payment gateway
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const getStepTitle = () => {
    switch (currentStep) {
      case 0: return 'What We Offer';
      case 1: return 'Platform Expertise';
      case 2: return 'Payment & Confirmation';
      default: return '';
    }
  };

  const handleSuccessClose = () => {
    setShowSuccess(false);
    navigate('/dashboard/my-applications', { replace: true });
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

      {/* Progress indicator */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-600">
            Step {currentStep + 1} of 3 - {getStepTitle()}
          </span>
          <span className="text-sm font-medium text-gray-600">
            {Math.round(((currentStep + 1) / 3) * 100)}% Complete
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-green-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentStep + 1) / 3) * 100}%` }}
          />
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Step content */}
        <div className="min-h-[400px]">
          {renderStep()}
        </div>

        {/* Navigation buttons */}
        <div className="flex justify-between items-center pt-6 border-t">
          <button
            type="button"
            onClick={() => setCurrentStep(prev => prev - 1)}
            disabled={currentStep === 0}
            className={`flex items-center px-6 py-3 rounded-lg font-medium transition-colors ${
              currentStep === 0
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            <ArrowLeftCircle className="w-5 h-5 mr-2" />
            Back
          </button>

          {currentStep < 2 ? (
            <button
              type="button"
              onClick={() => {
                if (isCurrentStepValid()) {
                  setCurrentStep(prev => prev + 1);
                }
              }}
              disabled={!isCurrentStepValid()}
              className={`flex items-center px-6 py-3 rounded-lg font-medium transition-colors ${
                isCurrentStepValid()
                  ? 'bg-green-600 text-white hover:bg-green-700'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              Next
              <ArrowRightCircle className="w-5 h-5 ml-2" />
            </button>
          ) : (
            <button
              type="submit"
              disabled={!isCurrentStepValid()}
              className={`flex items-center px-6 py-3 rounded-lg font-medium transition-colors ${
                isCurrentStepValid()
                  ? 'bg-green-600 text-white hover:bg-green-700'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              <Save className="w-5 h-5 mr-2" />
              Submit Application
            </button>
          )}
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

      {/* Success Message */}
      {showSuccess && (
        <SuccessMessage
          message="Your marketing & advertising application has been submitted successfully! Our team will review your application and contact you soon."
          onClose={handleSuccessClose}
          redirectPath="/dashboard/my-applications"
        />
      )}
    </div>
  );
};

export default AdvertisingForm; 