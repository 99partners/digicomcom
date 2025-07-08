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
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white">
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center space-x-2 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Settings className="h-4 w-4" />
            <span>Seller Account Management</span>
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            We Manage. <span className="text-green-600">You Sell.</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Let us handle daily operations, listings, and reports so you can focus on business.
          </p>
          <a
            href="#get-started"
            className="inline-flex items-center px-8 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors"
          >
            Start at ₹4,999/month
            <ArrowRight className="ml-2 h-5 w-5" />
          </a>
        </div>
      </section>

      {/* Key Benefits */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Key Benefits</h2>
            <p className="text-lg text-gray-600 max-w-4xl mx-auto">
              Optimize your e-commerce operations with our comprehensive management services.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex items-start space-x-4 p-6 bg-green-50 rounded-lg">
              <CheckCircle className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Hassle-Free Management</h4>
                <p className="text-gray-600 text-sm">Effortless order and inventory management.</p>
              </div>
            </div>
            <div className="flex items-start space-x-4 p-6 bg-green-50 rounded-lg">
              <CheckCircle className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Timely Updates</h4>
                <p className="text-gray-600 text-sm">Keep your product listings fresh and competitive.</p>
              </div>
            </div>
            <div className="flex items-start space-x-4 p-6 bg-green-50 rounded-lg">
              <CheckCircle className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Performance-Driven Support</h4>
                <p className="text-gray-600 text-sm">Data-backed strategies to boost sales.</p>
              </div>
            </div>
            <div className="flex items-start space-x-4 p-6 bg-green-50 rounded-lg">
              <CheckCircle className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Dedicated Coordination</h4>
                <p className="text-gray-600 text-sm">Stay connected via WhatsApp for real-time updates.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Included */}
      <section className="py-16 px-4 bg-green-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Monthly Service Includes</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Comprehensive support to keep your store active and profitable.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <Search className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Up to 50 SKUs/month</h4>
                  <p className="text-gray-600 text-sm">Manage listings for up to 50 products.</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <Headphones className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Order & Return Handling</h4>
                  <p className="text-gray-600 text-sm">Seamless management of orders and returns.</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <BarChart3 className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Inventory & Price Sync</h4>
                  <p className="text-gray-600 text-sm">Real-time updates for stock and pricing.</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <Search className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Keyword Optimization (Basic SEO)</h4>
                  <p className="text-gray-600 text-sm">Improve visibility with optimized listings.</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <PieChart className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Monthly Sales Reports</h4>
                  <p className="text-gray-600 text-sm">Actionable insights to track performance.</p>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">Optional Add-Ons</h3>
              <div className="space-y-4">
                <div className="border-2 border-green-200 rounded-lg hover:border-green-400 transition-colors p-6">
                  <h4 className="text-lg font-semibold">Additional 50 SKUs</h4>
                  <p className="text-sm text-gray-600">₹999</p>
                  <p className="text-sm text-gray-700 mt-2">Manage up to 100 SKUs per month.</p>
                </div>
                <div className="border-2 border-green-200 rounded-lg hover:border-green-400 transition-colors p-6">
                  <h4 className="text-lg font-semibold">Dedicated Account Manager</h4>
                  <p className="text-sm text-gray-600">₹1,999/month</p>
                  <p className="text-sm text-gray-700 mt-2">Personalized support for your business.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Success Story */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Success Story</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              A kitchenware brand scaled 180% in 3 months with 99digicom's management support.
            </p>
          </div>
          <div className="bg-green-50 rounded-lg p-6">
            <p className="text-gray-600">
              By streamlining inventory, optimizing listings, and handling orders efficiently, we helped a kitchenware brand achieve a 180% sales increase in just three months.
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