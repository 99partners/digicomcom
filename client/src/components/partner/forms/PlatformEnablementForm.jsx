import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, ArrowLeftCircle, ArrowRightCircle, CheckCircle2 } from 'lucide-react';

const PlatformEnablementForm = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    marketplaces: {
      ondc: false,
      amazon: false,
      flipkart: false,
      meesho: false,
      jiomart: false,
      indiamart: false,
      snapdeal: false
    },
    hasGST: '',
    gstNumber: '',
    monthlySales: ''
  });

  const validateGSTNumber = (gstNumber) => {
    const gstRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
    return gstRegex.test(gstNumber);
  };

  // Define form fields configuration
  const formFields = [
    {
      name: 'marketplaces',
      label: 'Select Your Target Marketplaces',
      type: 'checkboxGroup',
      required: true,
      options: [
        { 
          value: 'ondc', 
          label: 'ONDC',
          description: 'Open Network for Digital Commerce'
        },
        { 
          value: 'amazon', 
          label: 'Amazon',
          description: 'India\'s largest e-commerce platform'
        },
        { 
          value: 'flipkart', 
          label: 'Flipkart',
          description: 'Leading Indian marketplace'
        },
        { 
          value: 'meesho', 
          label: 'Meesho',
          description: 'Social commerce platform'
        },
        { 
          value: 'jiomart', 
          label: 'JioMart',
          description: 'Reliance\'s digital marketplace'
        },
        { 
          value: 'indiamart', 
          label: 'IndiaMart',
          description: 'B2B marketplace leader'
        },
        { 
          value: 'snapdeal', 
          label: 'Snapdeal',
          description: 'Value-focused marketplace'
        }
      ]
    },
    {
      name: 'gstInfo',
      label: 'GST Information',
      type: 'gstGroup',
      required: true
    },
    {
      name: 'monthlySales',
      label: 'Monthly Online Sales Volume (Optional)',
      type: 'select',
      required: false,
      options: [
        { value: '', label: 'Select monthly sales volume' },
        { value: 'less_50k', label: 'Less than ₹50,000' },
        { value: '50k_2L', label: '₹50,000 – ₹2,00,000' },
        { value: '2L_5L', label: '₹2,00,000 – ₹5,00,000' },
        { value: 'above_5L', label: '₹5,00,000+' }
      ]
    }
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox') {
      const marketplace = e.target.value;
      setFormData(prev => ({
        ...prev,
        marketplaces: {
          ...prev.marketplaces,
          [marketplace]: checked
        }
      }));
    } else if (name === 'hasGST' && value === 'no') {
      setFormData(prev => ({
        ...prev,
        hasGST: value,
        gstNumber: ''
      }));
    } else if (name === 'monthlySales') {
      setFormData(prev => ({
        ...prev,
        monthlySales: value || '' // Ensure empty string if no value
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

    try {
      console.log('Submitting form data:', formData);
      
      const response = await fetch('http://localhost:5050/api/platform-ams/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(formData)
      });

      const responseData = await response.json();
      console.log('Server response:', responseData);

      if (!response.ok) {
        throw new Error(responseData.message || 'Failed to submit application');
      }

      // Only navigate if data was successfully stored
      if (responseData.success) {
        console.log('Form submitted successfully');
        // Ensure we wait for the navigation
        await navigate('/dashboard');
      } else {
        throw new Error('Failed to store data in database');
      }
    } catch (error) {
      console.error('Error submitting application:', error);
      console.error('Error details:', error.message);
      alert('Failed to submit form. Please try again.');
    }
  };

  const handleNext = () => {
    if (currentStep < formFields.length - 1) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const isLastStep = currentStep === formFields.length - 1;
  const currentField = formFields[currentStep];

  const isCurrentFieldValid = () => {
    if (!currentField.required) return true;
    
    if (currentField.name === 'marketplaces') {
      return Object.values(formData.marketplaces).some(value => value);
    }
    
    if (currentField.name === 'gstInfo') {
      if (!formData.hasGST) return false;
      if (formData.hasGST === 'yes') {
        return validateGSTNumber(formData.gstNumber);
      }
      return true;
    }
    
    return !!formData[currentField.name];
  };

  const renderField = () => {
    switch (currentField.type) {
      case 'checkboxGroup':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {currentField.options.map(option => (
              <div 
                key={option.value}
                className={`relative bg-white rounded-lg p-6 border-2 transition-colors hover:shadow-md ${
                  formData.marketplaces[option.value] 
                    ? 'border-green-500 shadow-md' 
                    : 'border-gray-200 hover:border-green-300'
                }`}
              >
                <label className="flex flex-col cursor-pointer">
                  <div className="flex items-center mb-4">
                    <input
                      type="checkbox"
                      value={option.value}
                      checked={formData.marketplaces[option.value]}
                      onChange={handleChange}
                      className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                    />
                    <span className="ml-3 text-lg font-medium text-gray-900">{option.label}</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{option.description}</p>
                </label>
              </div>
            ))}
          </div>
        );
      case 'gstGroup':
        return (
          <div className="space-y-4">
            <div className="space-y-3">
              <div className="font-medium text-gray-700 mb-2">Do you have GST number?</div>
              <div className="flex space-x-4">
                <label className="flex items-center space-x-3">
                  <input
                    type="radio"
                    name="hasGST"
                    value="yes"
                    checked={formData.hasGST === 'yes'}
                    onChange={handleChange}
                    className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300"
                  />
                  <span className="text-gray-700">Yes</span>
                </label>
                <label className="flex items-center space-x-3">
                  <input
                    type="radio"
                    name="hasGST"
                    value="no"
                    checked={formData.hasGST === 'no'}
                    onChange={handleChange}
                    className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300"
                  />
                  <span className="text-gray-700">No</span>
                </label>
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
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                    formData.gstNumber && !validateGSTNumber(formData.gstNumber)
                      ? 'border-red-500'
                      : 'border-gray-300'
                  }`}
                  required={formData.hasGST === 'yes'}
                  placeholder="Enter your GST number"
                />
                {formData.gstNumber && !validateGSTNumber(formData.gstNumber) && (
                  <p className="mt-1 text-sm text-red-500">Please enter a valid GST number</p>
                )}
              </div>
            )}
          </div>
        );
      case 'select':
        return (
          <select
            name={currentField.name}
            value={formData[currentField.name]}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            required={currentField.required}
          >
            {currentField.options.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
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
        <h1 className="text-2xl font-semibold text-gray-800">Platform Enablement Application</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          {/* Progress indicator */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-600">
                Step {currentStep + 1} of {formFields.length}
              </span>
              <span className="text-sm font-medium text-gray-600">
                {Math.round(((currentStep + 1) / formFields.length) * 100)}% Complete
              </span>
          </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-green-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentStep + 1) / formFields.length) * 100}%` }}
              ></div>
          </div>
          </div>

          {/* Current field */}
          <div className="transition-opacity duration-300">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              {currentField.label}
              {currentField.required && currentField.type !== 'gstGroup' && <span className="text-red-500 ml-1">*</span>}
            </label>
            {renderField()}
          </div>
        </div>

        <div className="flex justify-between items-center mt-8">
          <button
            type="button"
            onClick={handleBack}
            className={`px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors flex items-center ${
              currentStep === 0 ? 'invisible' : ''
            }`}
          >
            <ArrowLeftCircle className="w-4 h-4 mr-2" />
            Back
          </button>
          
          {isLastStep ? (
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
              onClick={handleNext}
              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center"
              disabled={!isCurrentFieldValid()}
            >
              Next
              <ArrowRightCircle className="w-4 h-4 ml-2" />
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default PlatformEnablementForm; 