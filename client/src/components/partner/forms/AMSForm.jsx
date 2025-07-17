import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, ArrowLeftCircle, ArrowRightCircle, CheckCircle2, ShoppingCart, CreditCard, Clock, Calculator, Check, AlertCircle, Info } from 'lucide-react';
<<<<<<< HEAD
import SuccessMessage from '../../SuccessMessage';
=======
import axiosInstance from '../../../config/api.config';
>>>>>>> 9e852ac275fe25ea994824843117cb13eca600be

const AMSForm = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    platformEnabled: '', // 'yes' or 'no'
    selectedMarketplaces: [],
    serviceAccountNumber: '',
    hasGST: '',
    gstNumber: '',
    monthlySales: '',
    paymentOption: '' // 'guide' or 'payment'
  });
  const [showSuccess, setShowSuccess] = useState(false);

  const PLATFORM_ENABLEMENT_FEE = 4999;
  const PRICE_PER_MARKETPLACE = 4999;

  // Marketplace options with descriptions (from Platform Enablement)
  const marketplaceOptions = [
    { 
      value: 'ondc', 
      label: 'ONDC',
      description: 'Open Network for Digital Commerce - India\'s unified digital marketplace',
      icon: '🌐'
    },
    { 
      value: 'amazon', 
      label: 'Amazon',
      description: 'World\'s largest e-commerce platform with global reach',
      icon: '📦'
    },
    { 
      value: 'flipkart', 
      label: 'Flipkart',
      description: 'India\'s leading e-commerce marketplace',
      icon: '🛒'
    },
    { 
      value: 'meesho', 
      label: 'Meesho',
      description: 'Social commerce platform for resellers',
      icon: '👥'
    },
    { 
      value: 'jiomart', 
      label: 'JioMart',
      description: 'Reliance\'s digital marketplace with extensive reach',
      icon: '🏪'
    },
    { 
      value: 'indiamart', 
      label: 'IndiaMart',
      description: 'India\'s largest B2B marketplace',
      icon: '🏭'
    },
    { 
      value: 'snapdeal', 
      label: 'Snapdeal',
      description: 'Value-focused marketplace for budget-conscious shoppers',
      icon: '💰'
    }
  ];

  // Monthly sales options as cards (from Platform Enablement)
  const monthlySalesOptions = [
    { 
      value: 'less_50k', 
      label: 'Less than ₹50,000',
      description: 'Starting businesses or small scale operations',
      icon: '🌱'
    },
    { 
      value: '50k_2L', 
      label: '₹50,000 - ₹2,00,000',
      description: 'Growing businesses with steady sales',
      icon: '📈'
    },
    { 
      value: '2L_5L', 
      label: '₹2,00,000 - ₹5,00,000',
      description: 'Established businesses with strong revenue',
      icon: '💼'
    },
    { 
      value: 'above_5L', 
      label: '₹5,00,000+',
      description: 'Large scale operations with high volume',
      icon: '🚀'
    }
  ];

  const validateGSTNumber = (gstNumber) => {
    const gstRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
    return gstRegex.test(gstNumber);
  };

  // Calculate total price
  const calculateTotalPrice = () => {
    const marketplaceFee = formData.selectedMarketplaces.length * PRICE_PER_MARKETPLACE;
    const platformFee = formData.platformEnabled === 'no' ? PLATFORM_ENABLEMENT_FEE : 0;
    return marketplaceFee + platformFee;
  };

  // Calculate marketplace fee only
  const calculateMarketplaceFee = () => {
    return formData.selectedMarketplaces.length * PRICE_PER_MARKETPLACE;
  };

  // Calculate platform enablement fee only
  const calculatePlatformFee = () => {
    return formData.platformEnabled === 'no' ? PLATFORM_ENABLEMENT_FEE : 0;
  };

  // Handle platform enabled selection
  const handlePlatformEnabledChange = (value) => {
    setFormData(prev => ({
      ...prev,
      platformEnabled: value
    }));
  };

  // Handle marketplace selection
  const handleMarketplaceSelection = (marketplace) => {
    setFormData(prev => ({
      ...prev,
      selectedMarketplaces: prev.selectedMarketplaces.includes(marketplace)
        ? prev.selectedMarketplaces.filter(m => m !== marketplace)
        : [...prev.selectedMarketplaces, marketplace]
    }));
  };

  // Handle GST change with auto-redirect logic
  const handleGSTChange = (value) => {
    setFormData(prev => ({
      ...prev,
      hasGST: value,
      gstNumber: value === 'no' ? '' : prev.gstNumber
    }));
    
    // Auto-redirect to next step if GST is "No"
    if (value === 'no') {
      setTimeout(() => {
        setCurrentStep(4); // Step 5 (0-indexed)
      }, 500);
    }
  };

  // Handle monthly sales selection
  const handleMonthlySalesSelection = (value) => {
    setFormData(prev => ({
      ...prev,
      monthlySales: value
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Prevent submission if not on final step
    if (currentStep !== 5) {
      console.log('Form submission blocked - not on final step. Current step:', currentStep);
      return;
    }
    
    // Ensure payment option is selected
    if (!formData.paymentOption) {
      console.log('Form submission blocked - no payment option selected');
      alert('Please select a payment option before submitting.');
      return;
    }

    // Ensure at least one marketplace is selected
    if (formData.selectedMarketplaces.length === 0) {
      console.log('Form submission blocked - no marketplaces selected');
      alert('Please select at least one marketplace before submitting.');
      return;
    }

    try {
      console.log('Submitting AMS form data:', formData);
      
      const submitData = {
        platformEnabled: formData.platformEnabled,
        marketplaces: formData.selectedMarketplaces.reduce((acc, marketplace) => {
          acc[marketplace] = true;
          return acc;
        }, {}),
        serviceAccountNumber: formData.serviceAccountNumber,
        hasGST: formData.hasGST,
        gstNumber: formData.gstNumber,
        monthlySales: formData.monthlySales,
        totalAmount: calculateTotalPrice(),
        paymentOption: formData.paymentOption
      };

      const response = await axiosInstance.post('/api/ams/submit', submitData);
      console.log('Server response:', response.data);

      if (response.data.success) {
        console.log('Form submitted successfully');
        setShowSuccess(true);
      } else {
        throw new Error('Failed to store data in database');
      }
    } catch (error) {
      console.error('Error submitting AMS application:', error);
      alert('Failed to submit form. Please try again.');
    }
  };

  const handleNext = () => {
    console.log('handleNext called, currentStep:', currentStep);
    if (currentStep < 5) {
      console.log('Moving to next step:', currentStep + 1);
      setCurrentStep(prev => prev + 1);
    } else {
      console.log('Already at last step, cannot go further');
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const isCurrentStepValid = () => {
    let isValid = false;
    switch (currentStep) {
      case 0: // Platform enabled check
        isValid = formData.platformEnabled !== '';
        break;
      case 1: // Marketplace selection (required for all users)
        isValid = formData.selectedMarketplaces.length > 0;
        break;
      case 2: // Service account number
        isValid = formData.serviceAccountNumber.trim() !== '';
        break;
      case 3: // GST Information
        if (!formData.hasGST) {
          isValid = false;
        } else if (formData.hasGST === 'yes') {
          isValid = validateGSTNumber(formData.gstNumber);
        } else {
          isValid = true;
        }
        break;
      case 4: // Monthly sales
        isValid = true; // Optional field - always valid
        break;
      case 5: // Payment (required for all users)
        isValid = formData.paymentOption !== '' && formData.paymentOption !== undefined;
        break;
      default:
        isValid = true;
    }
    console.log(`Step ${currentStep} validation:`, isValid, 'formData:', formData);
    return isValid;
  };

  const handleSuccessClose = () => {
    setShowSuccess(false);
    navigate('/dashboard/my-applications', { replace: true });
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Platform Enablement Status</h2>
              <p className="text-gray-600">Do you already have platform enablement services?</p>
            </div>

            <div className="max-w-md mx-auto space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => handlePlatformEnabledChange('yes')}
                  className={`p-6 rounded-lg border-2 transition-all ${
                    formData.platformEnabled === 'yes'
                      ? 'border-green-500 bg-green-50 text-green-700'
                      : 'border-gray-200 hover:border-green-300'
                  }`}
                >
                  <Check className="w-8 h-8 mx-auto mb-3" />
                  <span className="font-medium block">Yes</span>
                  <span className="text-sm text-gray-600 mt-1 block">Already enabled</span>
                </button>
                <button
                  type="button"
                  onClick={() => handlePlatformEnabledChange('no')}
                  className={`p-6 rounded-lg border-2 transition-all ${
                    formData.platformEnabled === 'no'
                      ? 'border-green-500 bg-green-50 text-green-700'
                      : 'border-gray-200 hover:border-green-300'
                  }`}
                >
                  <span className="block w-8 h-8 mx-auto mb-3 text-3xl">✕</span>
                  <span className="font-medium block">No</span>
                  <span className="text-sm text-gray-600 mt-1 block">Need enablement</span>
                </button>
              </div>

              {formData.platformEnabled === 'no' && (
                <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                  <div className="flex items-center">
                    <AlertCircle className="w-5 h-5 text-yellow-600 mr-2" />
                    <span className="text-yellow-800 text-sm">
                      Platform enablement fee of ₹{PLATFORM_ENABLEMENT_FEE.toLocaleString()} will be added to your application.
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        );

      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Select Your Target Marketplaces</h2>
              <p className="text-gray-600">Choose the platforms where you want to sell your products</p>
              <div className="mt-4 p-4 bg-green-50 rounded-lg border border-green-200">
                <div className="flex items-center justify-center space-x-2">
                  <Calculator className="w-5 h-5 text-green-600" />
                  <span className="text-green-800 font-medium">₹{PRICE_PER_MARKETPLACE.toLocaleString()} per marketplace</span>
                </div>
                {formData.selectedMarketplaces.length > 0 && (
                  <div className="mt-2 text-center">
                    <span className="text-lg font-bold text-green-700">
                      Marketplace Total: ₹{calculateMarketplaceFee().toLocaleString()}
                    </span>
                    <span className="text-sm text-green-600 ml-2">
                      ({formData.selectedMarketplaces.length} marketplace{formData.selectedMarketplaces.length > 1 ? 's' : ''})
                    </span>
                  </div>
                )}
                {formData.platformEnabled === 'no' && (
                  <div className="mt-2 text-center">
                    <span className="text-sm text-yellow-700">
                      + Platform Enablement Fee: ₹{PLATFORM_ENABLEMENT_FEE.toLocaleString()}
                    </span>
                  </div>
                )}
                {formData.selectedMarketplaces.length > 0 && (
                  <div className="mt-2 text-center border-t pt-2">
                    <span className="text-xl font-bold text-green-800">
                      Total: ₹{calculateTotalPrice().toLocaleString()}
                    </span>
                  </div>
                )}
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {marketplaceOptions.map(option => (
                <div 
                  key={option.value}
                  className={`relative bg-white rounded-lg p-6 border-2 transition-all duration-200 cursor-pointer hover:shadow-lg ${
                    formData.selectedMarketplaces.includes(option.value)
                      ? 'border-green-500 shadow-md bg-green-50' 
                      : 'border-gray-200 hover:border-green-300'
                  }`}
                  onClick={() => handleMarketplaceSelection(option.value)}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="text-2xl">{option.icon}</div>
                    {formData.selectedMarketplaces.includes(option.value) && (
                      <CheckCircle2 className="w-6 h-6 text-green-500" />
                    )}
                  </div>
                   <h3 className="text-lg font-semibold text-gray-900 mb-2">{option.label}</h3>
                   <p className="text-sm text-gray-600 mb-3">{option.description}</p>
                   <div className="text-sm font-medium text-green-600">
                     ₹{PRICE_PER_MARKETPLACE.toLocaleString()}
                   </div>
                 </div>
               ))}
             </div>
           </div>
         );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Service Account Information</h2>
              <p className="text-gray-600">Please provide your service account number</p>
            </div>

            <div className="max-w-md mx-auto">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Service Account Number
                <span className="text-red-500 ml-1">*</span>
              </label>
              <input
                type="text"
                name="serviceAccountNumber"
                value={formData.serviceAccountNumber}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Enter your service account number"
                required
              />
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">GST Information</h2>
              <p className="text-gray-600">Please provide your GST registration details</p>
            </div>

            <div className="max-w-md mx-auto space-y-6">
              <div className="space-y-4">
                <label className="block text-sm font-medium text-gray-700">
                  Do you have GST registration?
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => handleGSTChange('yes')}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      formData.hasGST === 'yes'
                        ? 'border-green-500 bg-green-50 text-green-700'
                        : 'border-gray-200 hover:border-green-300'
                    }`}
                  >
                    <Check className="w-5 h-5 mx-auto mb-2" />
                    <span className="font-medium">Yes</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleGSTChange('no')}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      formData.hasGST === 'no'
                        ? 'border-green-500 bg-green-50 text-green-700'
                        : 'border-gray-200 hover:border-green-300'
                    }`}
                  >
                    <span className="block w-5 h-5 mx-auto mb-2 text-2xl">✕</span>
                    <span className="font-medium">No</span>
                  </button>
                </div>
              </div>

              {formData.hasGST === 'yes' && (
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    GST Number
                    <span className="text-red-500 ml-1">*</span>
                  </label>
                  <input
                    type="text"
                    name="gstNumber"
                    value={formData.gstNumber}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                      formData.gstNumber && !validateGSTNumber(formData.gstNumber)
                        ? 'border-red-500'
                        : 'border-gray-300'
                    }`}
                    placeholder="Enter your GST number (e.g., 22AAAAA0000A1Z5)"
                  />
                  {formData.gstNumber && !validateGSTNumber(formData.gstNumber) && (
                    <p className="mt-1 text-sm text-red-500 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      Please enter a valid GST number
                    </p>
                  )}
                </div>
              )}

              {formData.hasGST === 'no' && (
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex items-center">
                    <Info className="w-5 h-5 text-blue-600 mr-2" />
                    <span className="text-blue-800 text-sm">
                      Redirecting to next step since GST registration is not required...
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Monthly Sales Volume</h2>
              <p className="text-gray-600">Select your current monthly online sales volume (Optional)</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
              {monthlySalesOptions.map(option => (
                <div 
                  key={option.value}
                  className={`relative bg-white rounded-lg p-6 border-2 transition-all duration-200 cursor-pointer hover:shadow-lg ${
                    formData.monthlySales === option.value
                      ? 'border-green-500 shadow-md bg-green-50' 
                      : 'border-gray-200 hover:border-green-300'
                  }`}
                  onClick={() => handleMonthlySalesSelection(option.value)}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="text-2xl">{option.icon}</div>
                    {formData.monthlySales === option.value && (
                      <CheckCircle2 className="w-6 h-6 text-green-500" />
                    )}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{option.label}</h3>
                  <p className="text-sm text-gray-600">{option.description}</p>
                </div>
              ))}
            </div>

            <div className="text-center mt-6">
              {/* <button
                type="button"
                onClick={() => handleMonthlySalesSelection('')}
                className={`px-6 py-2 rounded-lg border-2 transition-all ${
                  formData.monthlySales === ''
                    ? 'border-green-500 bg-green-50 text-green-700'
                    : 'border-gray-200 hover:border-green-300'
                }`}
              >
                Skip this step
              </button> */}
            </div>
          </div>
        );

      case 5:
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
                  <span className="text-gray-600">Selected Marketplaces:</span>
                  <span className="font-medium">{formData.selectedMarketplaces.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Price per marketplace:</span>
                  <span className="font-medium">₹{PRICE_PER_MARKETPLACE.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Marketplace Total:</span>
                  <span className="font-medium">₹{calculateMarketplaceFee().toLocaleString()}</span>
                </div>
                {formData.platformEnabled === 'no' && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Platform Enablement Fee:</span>
                    <span className="font-medium">₹{PLATFORM_ENABLEMENT_FEE.toLocaleString()}</span>
                  </div>
                )}
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
                    console.log('Direct Payment option selected');
                    setFormData(prev => ({ ...prev, paymentOption: 'payment' }));
                  }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <CreditCard className="w-8 h-8 text-green-600" />
                    {formData.paymentOption === 'payment' && (
                      <CheckCircle2 className="w-6 h-6 text-green-500" />
                    )}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Direct Payment</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Proceed directly to payment and get instant confirmation of your application.
                  </p>
                  <div className="bg-green-50 p-3 rounded-lg">
                    <p className="text-xs text-green-800">
                      ✓ Instant payment processing<br/>
                      ✓ Immediate confirmation<br/>
                      ✓ Faster application processing
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
      case 0: return 'Platform Status';
      case 1: return 'Select Marketplaces';
      case 2: return 'Service Account';
      case 3: return 'GST Information';
      case 4: return 'Sales Volume';
      case 5: return 'Payment & Confirmation';
      default: return '';
    }
  };

  // No steps should be skipped now
  const shouldSkipStep = (step) => {
    return false;
  };

  const getNextStep = () => {
    let nextStep = currentStep + 1;
    while (nextStep <= 5 && shouldSkipStep(nextStep)) {
      nextStep++;
    }
    return nextStep;
  };

  const getPreviousStep = () => {
    let prevStep = currentStep - 1;
    while (prevStep >= 0 && shouldSkipStep(prevStep)) {
      prevStep--;
    }
    return prevStep;
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
        <h1 className="text-2xl font-semibold text-gray-800">AMS Application</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6" noValidate>
        {/* Progress indicator */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-600">
              Step {currentStep + 1} of 6 - {getStepTitle()}
            </span>
            <span className="text-sm font-medium text-gray-600">
              {Math.round(((currentStep + 1) / 6) * 100)}% Complete
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-green-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentStep + 1) / 6) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Step content */}
        <div className="min-h-[400px]">
          {renderStep()}
        </div>

        {/* Navigation buttons */}
        <div className="flex justify-between items-center pt-6 border-t">
          <button
            type="button"
            onClick={() => setCurrentStep(getPreviousStep())}
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

          {currentStep < 5 ? (
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                console.log('Next button clicked, currentStep:', currentStep, 'isValid:', isCurrentStepValid());
                if (isCurrentStepValid()) {
                  const nextStep = getNextStep();
                  if (nextStep <= 5) {
                    setCurrentStep(nextStep);
                  }
                } else {
                  console.log('Cannot proceed - current step validation failed');
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
              onClick={(e) => {
                console.log('Submit button clicked, currentStep:', currentStep, 'isValid:', isCurrentStepValid());
                if (!isCurrentStepValid()) {
                  e.preventDefault();
                  console.log('Submit blocked - validation failed');
                }
              }}
            >
              <Save className="w-5 h-5 mr-2" />
              Submit Application
            </button>
          )}
        </div>
      </form>

      {/* Success Message */}
      {showSuccess && (
        <SuccessMessage
          message="Your Account Management Services application has been submitted successfully! Our team will review your application and contact you soon."
          onClose={handleSuccessClose}
          redirectPath="/dashboard/my-applications"
        />
      )}
    </div>
  );
};

export default AMSForm; 