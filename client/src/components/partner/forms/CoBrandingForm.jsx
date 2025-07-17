import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, ArrowLeftCircle, ArrowRightCircle } from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';
import SuccessMessage from '../../SuccessMessage';

import axiosInstance from '../../../config/api.config';


const CoBrandingForm = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    isManufacturer: false,
    establishmentYear: '',
    companyName: '',
    numberOfProducts: '',
    productCategories: [],
    productUSP: '',
    productDescription: '',
    panNumber: ''
  });
  const [showSuccess, setShowSuccess] = useState(false);

  const validatePAN = (pan) => {
    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
    return panRegex.test(pan);
  };

  // Define form fields configuration
  const formFields = [
    {
      step: 1,
      title: 'Basic Information',
      fields: [
        {
          name: 'isManufacturer',
          label: 'Are you a Manufacturer?',
          type: 'checkbox',
          required: true
        },
        {
          name: 'establishmentYear',
          label: 'Year of Establishment',
          type: 'number',
          required: true,
          min: 1900,
          max: new Date().getFullYear(),
          showIf: (data) => data.isManufacturer
        },
        {
          name: 'companyName',
          label: 'Company Name',
          type: 'text',
          required: true,
          showIf: (data) => data.isManufacturer && data.establishmentYear
        }
      ]
    },
    {
      step: 2,
      title: 'Product Information',
      fields: [
        {
          name: 'numberOfProducts',
          label: 'Number of Products',
          type: 'number',
          required: true,
          min: 1
        },
        {
          name: 'productCategories',
          label: 'Product Categories',
          type: 'multiselect',
          required: true,
          options: [
            { value: 'electronics', label: 'Electronics' },
            { value: 'fashion', label: 'Fashion & Apparel' },
            { value: 'home', label: 'Home & Living' },
            { value: 'beauty', label: 'Beauty & Personal Care' },
            { value: 'food', label: 'Food & Beverages' },
            { value: 'health', label: 'Health & Wellness' },
            { value: 'other', label: 'Other' }
          ]
        }
      ]
    },
    {
      step: 3,
      title: 'Product Details',
      fields: [
        {
          name: 'productUSP',
          label: 'Product USP',
          type: 'textarea',
          required: true,
          placeholder: 'What makes your products unique?'
        },
        {
          name: 'productDescription',
          label: 'Product Description',
          type: 'textarea',
          required: true,
          placeholder: 'Describe your key products and their features'
        }
      ]
    },
    {
      step: 4,
      title: 'Business Information',
      fields: [
        {
          name: 'panNumber',
          label: 'PAN Number',
          type: 'text',
          required: true,
          placeholder: 'Enter PAN number (e.g., ABCDE1234F)'
        }
      ]
    }
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox') {
      setFormData(prev => ({
        ...prev,
        [name]: checked
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleMultiSelect = (name, value) => {
    setFormData(prev => ({
      ...prev,
      [name]: prev[name].includes(value)
        ? prev[name].filter(item => item !== value)
        : [...prev[name], value]
    }));
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
      
      const response = await axiosInstance.post('/api/co-branding/submit', formData);
      console.log('Server response:', response.data);

      if (response.data.success) {
        console.log('Form submitted successfully');
        setShowSuccess(true);
      } else {
        throw new Error('Failed to store data in database');
      }
    } catch (error) {
      console.error('Error submitting application:', error);
      alert('Failed to submit form. Please try again.');
    }
  };

  const handleSuccessClose = () => {
    setShowSuccess(false);
    navigate('/dashboard/my-applications', { replace: true });
  };

  const isCurrentFieldValid = () => {
    const currentFields = formFields[currentStep].fields;
    return currentFields.every(field => {
      if (!field.required) return true;
      if (field.showIf && !field.showIf(formData)) return true;
      
      if (field.type === 'multiselect') {
        return formData[field.name].length > 0;
      }
      
      if (field.name === 'panNumber') {
        return validatePAN(formData[field.name]);
      }
      
      if (field.name === 'establishmentYear') {
        const year = parseInt(formData[field.name]);
        return year >= 1900 && year <= new Date().getFullYear();
      }
      
      return !!formData[field.name];
    });
  };

  const renderField = (field) => {
    if (field.showIf && !field.showIf(formData)) return null;

    switch (field.type) {
      case 'checkbox':
        return (
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              name={field.name}
              checked={formData[field.name]}
              onChange={handleChange}
              className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
              required={field.required}
            />
            <span className="text-gray-700">{field.label}</span>
          </label>
        );
      case 'number':
        return (
          <input
            type="number"
            name={field.name}
            value={formData[field.name]}
            onChange={handleChange}
            min={field.min}
            max={field.max}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            required={field.required}
            placeholder={field.placeholder}
          />
        );
      case 'multiselect':
        return (
          <div className="space-y-2">
            {field.options.map(option => (
              <label key={option.value} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={formData[field.name].includes(option.value)}
                  onChange={() => handleMultiSelect(field.name, option.value)}
                  className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                />
                <span className="text-gray-700">{option.label}</span>
              </label>
            ))}
          </div>
        );
      case 'select':
        return (
          <select
            name={field.name}
            value={formData[field.name]}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            required={field.required}
          >
            {field.options.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );
      case 'textarea':
        return (
          <textarea
            name={field.name}
            value={formData[field.name]}
            onChange={handleChange}
            rows={4}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            required={field.required}
            placeholder={field.placeholder}
          />
        );
      default:
        return (
          <input
            type="text"
            name={field.name}
            value={formData[field.name]}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            required={field.required}
            placeholder={field.placeholder}
          />
        );
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex items-center mb-6">
        <button
          onClick={() => navigate('/dashboard/create-application')}
          className="mr-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-gray-600" />
        </button>
        <h1 className="text-2xl font-semibold text-gray-800">Co-Branding Application</h1>
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
            <h2 className="text-xl font-medium text-gray-800 mb-4">
              {formFields[currentStep].title}
            </h2>
            <div className="space-y-6">
              {formFields[currentStep].fields.map((field, index) => (
                <div key={field.name} className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    {field.label}
                    {field.required && <span className="text-red-500 ml-1">*</span>}
                  </label>
                  {renderField(field)}
                  {field.name === 'panNumber' && formData[field.name] && !validatePAN(formData[field.name]) && (
                    <p className="mt-1 text-sm text-red-600">
                      Please enter a valid PAN number (e.g., ABCDE1234F)
                    </p>
                  )}
                  {field.name === 'establishmentYear' && formData[field.name] && 
                    (formData[field.name] < 1900 || formData[field.name] > new Date().getFullYear()) && (
                    <p className="mt-1 text-sm text-red-600">
                      Please enter a valid year between 1900 and {new Date().getFullYear()}
                    </p>
                  )}
                </div>
              ))}
            </div>
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
                type="submit"
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

      {/* Success Message */}
      {showSuccess && (
        <SuccessMessage
          message="Your Co-Branding Partnership application has been submitted successfully! Our team will review your application and contact you soon."
          onClose={handleSuccessClose}
          redirectPath="/dashboard/my-applications"
        />
      )}
    </div>
  );
};

export default CoBrandingForm; 