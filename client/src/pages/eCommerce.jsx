import { useState, useEffect } from "react";
import {
  Megaphone,
  CheckCircle,
  ArrowRight,
  Search,
  BarChart3,
  Star,
  Users,
  Camera,
  ShoppingCart,
} from "lucide-react";
import axios from 'axios';
import { getApiUrl } from '../config/api.config';

export default function ECommerce() {
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
      const response = await axios.post(getApiUrl('api/advertising/submit'), formData);
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
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white">
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center space-x-2 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Megaphone className="h-4 w-4" />
            <span>E-commerce Advertising</span>
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Boost Your Product Visibility on <span className="text-green-600">Amazon, Flipkart & More</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Maximize your reach with performance marketing tailored for e-commerce success.
          </p>
          <a
            href="#get-started"
            className="inline-flex items-center px-8 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors"
          >
            Launch Your Campaign - ₹2,499
            <ArrowRight className="ml-2 h-5 w-5" />
          </a>
        </div>
      </section>

      {/* Why Advertising Matters */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Advertising is a Must</h2>
            <p className="text-lg text-gray-600 max-w-4xl mx-auto">
              In today's competitive e-commerce landscape, visibility is key to driving sales.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow p-6">
              <Search className="h-8 w-8 text-green-600 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">70% of Sales from Ads</h3>
              <p className="text-gray-600 text-sm">Sponsored listings drive over 70% of e-commerce sales.</p>
            </div>
            <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow p-6">
              <BarChart3 className="h-8 w-8 text-green-600 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Better Ad Placement</h3>
              <p className="text-gray-600 text-sm">Improve visibility with strategic ad placements.</p>
            </div>
            <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow p-6">
              <Users className="h-8 w-8 text-green-600 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">High-Intent Buyers</h3>
              <p className="text-gray-600 text-sm">Attract customers ready to buy with targeted campaigns.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Campaign Setup Includes */}
      <section className="py-16 px-4 bg-green-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">What You Get with Campaign Setup</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our advertising services are designed to deliver results from day one.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <CheckCircle className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Keyword Strategy</h4>
                  <p className="text-gray-600 text-sm">Research and target high-performing keywords for your products.</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <CheckCircle className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Sponsored Ad Setup</h4>
                  <p className="text-gray-600 text-sm">Create and launch ads on platforms like Amazon and Flipkart.</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <CheckCircle className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Budget Planning</h4>
                  <p className="text-gray-600 text-sm">Optimize ad spend for maximum ROI.</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <CheckCircle className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">7-Day Optimization</h4>
                  <p className="text-gray-600 text-sm">Monitor and tweak campaigns for better performance.</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <CheckCircle className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Campaign Report</h4>
                  <p className="text-gray-600 text-sm">Detailed metrics including CTR, CPC, and ROAS.</p>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">Add-On Services</h3>
              <div className="space-y-4">
                <div className="border-2 border-green-200 rounded-lg hover:border-green-400 transition-colors p-6">
                  <h4 className="text-lg font-semibold">Monthly Ad Management</h4>
                  <p className="text-sm text-gray-600">₹4,999/month</p>
                  <p className="text-sm text-gray-700 mt-2">Ongoing campaign optimization and reporting.</p>
                </div>
                <div className="border-2 border-green-200 rounded-lg hover:border-green-400 transition-colors p-6">
                  <h4 className="text-lg font-semibold">Creative Banners (Pack of 5)</h4>
                  <p className="text-sm text-gray-600">₹1,999</p>
                  <p className="text-sm text-gray-700 mt-2">Eye-catching banners for your campaigns.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Case Study */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Success Story</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              How We Helped a Home Decor Brand Increase Sales by 180% in 3 Months
            </p>
          </div>
          <div className="bg-green-50 rounded-lg p-6">
            <p className="text-gray-600">
              By leveraging targeted Amazon Sponsored Ads and Flipkart PLA campaigns, we optimized product listings and ran seasonal promotions for a home decor brand. The result? A 180% sales increase in just three months, with a 3x ROAS.
            </p>
          </div>
        </div>
      </section>

      {/* Supported Platforms */}
      <section className="py-16 px-4 bg-green-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Supported Marketplaces</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { name: "Amazon", desc: "World's largest e-commerce platform" },
              { name: "Flipkart", desc: "India's leading e-commerce marketplace" },
              { name: "Meesho", desc: "Social commerce platform" },
              { name: "Jiomart", desc: "Reliance's digital commerce platform" },
              { name: "IndiaMART", desc: "B2B marketplace for Indian businesses" },
              { name: "Snapdeal", desc: "Popular e-commerce platform" },
            ].map((platform, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow text-center p-6">
                <div className="w-12 h-12 bg-green-100 text-green-600 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <ShoppingCart className="h-6 w-6" />
                </div>
                <h4 className="text-lg font-semibold text-gray-900">{platform.name}</h4>
                <p className="text-gray-600 text-sm">{platform.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      
      
    </div>
  );
}