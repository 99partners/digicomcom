"use client"

import { useState, useEffect } from "react";
import {
  Settings,
  CheckCircle,
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

  return (
    <>
      <SEO
        title="Account Management Services (AMS) - Grow Your E-commerce Business | 99Digicom"
        description="Let us handle your daily e-commerce operations, listings, and reports. Professional account management services for Amazon, Flipkart & more marketplaces."
        keywords="account management services, e-commerce management, marketplace management, amazon seller management, flipkart seller management, inventory management, order management"
        canonicalUrl="https://99digicom.com/services/ams"
      />
      <main className="min-h-screen bg-gradient-to-br from-green-50 to-white">
        {/* AMS Form Section */}
        {/* <section id="get-started" className="pt-24 pb-16 px-4">
          <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Complete Your AMS Request</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Business Name</label>
                  <input
                    type="text"
                    value={formData.businessName}
                    onChange={(e) => handleInputChange("businessName", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Contact Person</label>
                  <input
                    type="text"
                    value={formData.contactPerson}
                    onChange={(e) => handleInputChange("contactPerson", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Website</label>
                <input
                  type="url"
                  value={formData.website}
                  onChange={(e) => handleInputChange("website", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="https://"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Business Type</label>
                <select
                  value={formData.businessType}
                  onChange={(e) => handleInputChange("businessType", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                >
                  <option value="">Select Business Type</option>
                  <option value="manufacturer">Manufacturer</option>
                  <option value="retailer">Retailer</option>
                  <option value="wholesaler">Wholesaler</option>
                  <option value="distributor">Distributor</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Product Categories</label>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    "Electronics",
                    "Fashion",
                    "Home & Kitchen",
                    "Beauty & Personal Care",
                    "Toys & Games",
                    "Sports & Fitness",
                    "Books & Media",
                    "Other"
                  ].map((category) => (
                    <label key={category} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={formData.productCategories.includes(category)}
                        onChange={(e) => handleCheckboxChange("productCategories", category, e.target.checked)}
                        className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                      />
                      <span className="text-sm text-gray-700">{category}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Top Products (comma-separated)</label>
                <textarea
                  value={formData.topProducts}
                  onChange={(e) => handleInputChange("topProducts", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  rows="3"
                  placeholder="Product 1, Product 2, Product 3"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Current Monthly Sales Volume</label>
                <select
                  value={formData.currentSalesVolume}
                  onChange={(e) => handleInputChange("currentSalesVolume", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                >
                  <option value="">Select Sales Volume</option>
                  <option value="0-1L">₹0 - ₹1 Lakh</option>
                  <option value="1L-5L">₹1 Lakh - ₹5 Lakh</option>
                  <option value="5L-10L">₹5 Lakh - ₹10 Lakh</option>
                  <option value="10L+">Above ₹10 Lakh</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Target Monthly Sales Volume</label>
                <select
                  value={formData.targetSalesVolume}
                  onChange={(e) => handleInputChange("targetSalesVolume", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                >
                  <option value="">Select Target Volume</option>
                  <option value="1L-5L">₹1 Lakh - ₹5 Lakh</option>
                  <option value="5L-10L">₹5 Lakh - ₹10 Lakh</option>
                  <option value="10L-25L">₹10 Lakh - ₹25 Lakh</option>
                  <option value="25L+">Above ₹25 Lakh</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Additional Notes</label>
                <textarea
                  value={formData.additionalNotes}
                  onChange={(e) => handleInputChange("additionalNotes", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  rows="4"
                  placeholder="Any specific requirements or questions..."
                />
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={formData.consent}
                  onChange={(e) => handleInputChange("consent", e.target.checked)}
                  className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                  required
                />
                <label className="text-sm text-gray-700">
                  I agree to be contacted about my AMS request
                </label>
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-6 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors"
                >
                  Submit AMS Request
                </button>
              </div>
            </form>
          </div>
        </section> */}

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

        {/* Key Benefits */}
        <section className="py-16 px-4 bg-white" aria-labelledby="benefits-heading">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 id="benefits-heading" className="text-3xl font-bold text-gray-900 mb-4">Key Benefits</h2>
              <p className="text-lg text-gray-600 max-w-4xl mx-auto">
                Optimize your e-commerce operations with our comprehensive management services.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-6" role="list">
              {[
                {
                  title: "Hassle-Free Management",
                  description: "Effortless order and inventory management."
                },
                {
                  title: "Timely Updates",
                  description: "Keep your product listings fresh and competitive."
                },
                {
                  title: "Performance-Driven Support",
                  description: "Data-backed strategies to boost sales."
                },
                {
                  title: "Dedicated Coordination",
                  description: "Stay connected via WhatsApp for real-time updates."
                }
              ].map((benefit, index) => (
                <div 
                  key={index} 
                  className="flex items-start space-x-4 p-6 bg-green-50 rounded-lg"
                  role="listitem"
                >
                  <CheckCircle className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" aria-hidden="true" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                    <p className="text-gray-600 text-sm">{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>
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

        {/* Supported Platforms */}
        <section className="py-16 px-4 bg-green-50" aria-labelledby="platforms-heading">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 id="platforms-heading" className="text-3xl font-bold text-gray-900 mb-4">Supported Marketplaces</h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6" role="list">
              {[
                { name: "Amazon", desc: "World's largest e-commerce platform" },
                { name: "Flipkart", desc: "India's leading e-commerce marketplace" },
                { name: "Meesho", desc: "Social commerce platform" },
                { name: "Jiomart", desc: "Reliance's digital commerce platform" },
                { name: "IndiaMART", desc: "B2B marketplace for Indian businesses" },
                { name: "Snapdeal", desc: "Popular e-commerce platform" },
              ].map((platform, index) => (
                <div 
                  key={index} 
                  className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow text-center p-6"
                  role="listitem"
                >
                  <div className="w-12 h-12 bg-green-100 text-green-600 rounded-lg flex items-center justify-center mx-auto mb-2">
                    <ShoppingCart className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">{platform.name}</h3>
                  <p className="text-gray-600 text-sm">{platform.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}