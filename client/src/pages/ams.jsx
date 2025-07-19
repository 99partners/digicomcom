"use client";

import { useState, useEffect } from "react";
import {
  Settings,
  ArrowRight,
  Search,
  BarChart3,
  Headphones,
  PieChart,
  Mail,
  ShoppingCart,
} from "lucide-react";
import axios from 'axios';
import { getApiUrl } from '../config/api.config';
import SEO from '../components/SEO';
import AMS1 from '../assets/AMS1.png';
import AMS2 from '../assets/AMS2.png'; 
import AMS3 from '../assets/AMS3.png';
import AMS4 from '../assets/AMS4.png';

export default function AccountManagementServices() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [formData, setFormData] = useState({
    businessName: "",
    contactPerson: "",
    email: "",
    phone: "",
    website: "",
    businessType: "",
    productCategories: [],
    topProducts: "",
    platforms: [],
    currentSalesVolume: "",
    targetSalesVolume: "",
    servicesNeeded: [],
    marketingGoals: [],
    targetAudience: "",
    timeline: "",
    additionalNotes: "",
    consent: false,
  });

  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    { src: AMS1, alt: "Hassle-Free Management illustration", title: "Hassle-Free Management", description: "Effortless order and inventory management." },
    { src: AMS2, alt: "Timely Updates illustration", title: "Timely Updates", description: "Keep your product listings fresh and competitive." },
    { src: AMS3, alt: "Performance-Driven Support illustration", title: "Performance-Driven Support", description: "Data-backed strategies to boost sales." },
    { src: AMS4, alt: "Dedicated Coordination illustration", title: "Dedicated Coordination", description: "Stay connected via WhatsApp for real-time updates." },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(getApiUrl('api/ams/submit'), formData);
      const data = await response.data;
      if (data.success) {
        alert('Thank you for your submission! Our team will contact you shortly.');
        setFormData({
          businessName: "",
          contactPerson: "",
          email: "",
          phone: "",
          website: "",
          businessType: "",
          productCategories: [],
          topProducts: "",
          platforms: [],
          currentSalesVolume: "",
          targetSalesVolume: "",
          servicesNeeded: [],
          marketingGoals: [],
          targetAudience: "",
          timeline: "",
          additionalNotes: "",
          consent: false,
        });
      } else {
        alert('Error submitting form: ' + data.message);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Error submitting form. Please try again.');
    }
  };

  const handleCheckboxChange = (field, value, checked) => {
    setFormData((prev) => ({
      ...prev,
      [field]: checked ? [...prev[field], value] : prev[field].filter((item) => item !== value),
    }));
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handlePrev = () => {
    setCurrentStep((prev) => (prev > 0 ? prev - 1 : 3));
  };

  const handleNext = () => {
    setCurrentStep((prev) => (prev < 3 ? prev + 1 : 0));
  };

  return (
    <>
      <SEO
        title="Account Management Services (AMS) - Grow Your E-commerce Business | 99Digicom"
        description="Let us handle your daily e-commerce operations, listings, and reports. Professional account management services for Amazon, Flipkart & more marketplaces."
        keywords="account management services, e-commerce management, marketplace management, amazon seller management, flipkart seller management, inventory management, order management"
        canonicalUrl="https://99digicom.com/services/ams"
      />
      <main className="min-h-screen bg-gradient-to-br from-green-50 to-white">
        {/* Hero Section */}
        <section className="pt-24 pb-16 px-4" aria-labelledby="hero-heading">
          <div className="max-w-7xl mx-auto text-center">
            <div className="inline-flex items-center space-x-2 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Settings className="h-4 w-4" aria-hidden="true" />
              <span>Seller Account Management</span>
            </div>
            <h1 id="hero-heading" className="text-5xl font-bold text-gray-900 mb-6">
              We Manage. <span className="text-green-600">You Sell.</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Let us handle daily operations, listings, and reports so you can focus on business.
            </p>
            <a
              href="#get-started"
              className="inline-flex items-center px-8 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors"
              aria-label="Start with account management services"
            >
              Start at ₹4,999/month
              <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
            </a>
          </div>
        </section>

{/* Services Included */}
        <section className="py-16 px-4 bg-green-50" aria-labelledby="services-heading">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 id="services-heading" className="text-3xl font-bold text-gray-900 mb-4">Monthly Service Includes</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Comprehensive support to keep your store active and profitable.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6" role="list">
                {[
                  {
                    icon: Search,
                    title: "Up to 50 SKUs/month",
                    description: "Manage listings for up to 50 products."
                  },
                  {
                    icon: Headphones,
                    title: "Order & Return Handling",
                    description: "Seamless management of orders and returns."
                  },
                  {
                    icon: BarChart3,
                    title: "Inventory & Price Sync",
                    description: "Real-time updates for stock and pricing."
                  },
                  {
                    icon: Search,
                    title: "Keyword Optimization (Basic SEO)",
                    description: "Improve visibility with optimized listings."
                  },
                  {
                    icon: PieChart,
                    title: "Monthly Sales Reports",
                    description: "Actionable insights to track performance."
                  }
                ].map((service, index) => (
                  <div 
                    key={index} 
                    className="flex items-start space-x-4"
                    role="listitem"
                  >
                    <service.icon className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" aria-hidden="true" />
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">{service.title}</h3>
                      <p className="text-gray-600 text-sm">{service.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-6">Optional Add-Ons</h3>
                <div className="space-y-4" role="list">
                  {[
                    {
                      title: "Additional 50 SKUs",
                      price: "₹999",
                      description: "Manage up to 100 SKUs per month."
                    },
                    {
                      title: "Dedicated Account Manager",
                      price: "₹1,999/month",
                      description: "Personalized support for your business."
                    }
                  ].map((addon, index) => (
                    <div 
                      key={index}
                      className="border-2 border-green-200 rounded-lg hover:border-green-400 transition-colors p-6"
                      role="listitem"
                    >
                      <h4 className="text-lg font-semibold">{addon.title}</h4>
                      <p className="text-sm text-gray-600">{addon.price}</p>
                      <p className="text-sm text-gray-700 mt-2">{addon.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Key Benefits */}
        <section className="py-16 px-4 bg-white" aria-labelledby="benefits-heading">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 id="benefits-heading" className="text-3xl font-bold text-gray-900 mb-4">Key Benefits</h2>
              <p className="text-lg text-gray-600 max-w-4xl mx-auto">
                Optimize your e-commerce operations with our comprehensive management services.
              </p>
            </div>
            <div className="relative overflow-hidden w-full h-[400px]">
              <button
                onClick={handlePrev}
                className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-green-600 text-white p-2 rounded-full hover:bg-green-700 transition-colors z-10"
                aria-label="Previous benefit"
              >
                <ArrowRight className="h-6 w-6 rotate-180" />
              </button>
              <div className="flex justify-center items-center h-full space-x-4">
                {steps.map((step, index) => {
                  const isCenter = index === currentStep;
                  const isLeft = index === (currentStep - 1 + 4) % 4;
                  const isRight = index === (currentStep + 1) % 4;
                  return (
                    <div
                      key={index}
                      className={`relative rounded-lg shadow-md transition-all duration-500 ${
                        isCenter ? "w-96 h-96 z-20" : isLeft || isRight ? "w-48 h-48 scale-75 z-10" : "w-0 h-0 opacity-0"
                      }`}
                    >
                      <img
                        src={step.src}
                        alt={step.alt}
                        className="w-full h-full object-cover rounded-lg"
                        onError={(e) => {
                          console.error(`Failed to load image: ${step.src}`);
                          e.target.src = "/assets/fallback.png"; // Ensure fallback.png exists in public/assets/
                        }}
                      />
                      {isCenter && (
                        <div className="absolute bottom-4 left-4 right-4 bg-white bg-opacity-90 p-2 rounded text-center">
                          <h3 className="text-lg font-semibold text-gray-900">{step.title}</h3>
                          <p className="text-gray-600 text-sm">{step.description}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
              <button
                onClick={handleNext}
                className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-green-600 text-white p-2 rounded-full hover:bg-green-700 transition-colors z-10"
                aria-label="Next benefit"
              >
                <ArrowRight className="h-6 w-6" />
              </button>
            </div>
          </div>
        </section>

        
        {/* Success Story */}
        <section className="py-16 px-4 bg-white" aria-labelledby="success-heading">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 id="success-heading" className="text-3xl font-bold text-gray-900 mb-4">Success Story</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                A kitchenware brand scaled 180% in 3 months with 99digicom's management support.
              </p>
            </div>
            <div className="bg-green-50 rounded-lg p-6">
              <blockquote>
                <p className="text-gray-600">
                  By streamlining inventory, optimizing listings, and handling orders efficiently, we helped a kitchenware brand achieve a 180% sales increase in just three months.
                </p>
              </blockquote>
            </div>
          </div>
        </section>

        
      </main>
    </>
  );
}
