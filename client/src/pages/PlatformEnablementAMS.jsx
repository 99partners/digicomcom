import { useState } from "react";
import {
  Store,
  Settings,
  Megaphone,
  CheckCircle,
  ArrowRight,
  Heart,
  Zap,
  Globe,
  BarChart3,
  Package,
  Calendar,
  Mail,
  Phone,
  ExternalLink,
  Target,
  Users,
  ShoppingCart,
  TrendingUp,
  FileText,
  Shield,
  Headphones,
  Search,
  DollarSign,
  Star,
  Clock,
  Award,
  PlayCircle,
  Camera,
  PieChart,
  Truck,
  CreditCard,
  Building,
  ImageIcon,
  MousePointer,
  TrendingDown,
  Layers,
  Eye,
} from "lucide-react";

import { useEffect } from "react";
import axios from "axios";
import { getApiUrl } from "../config/api.config";

// Scroll to top on component mount
export default function PlatformEnablementAMS() {
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
  const [activeTab, setActiveTab] = useState("ondc");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        getApiUrl("api/platform-ams/submit"),
        formData
      );

      const data = await response.data;

      if (data.success) {
        alert(
          "Thank you for your submission! Our team will contact you shortly."
        );
        // Reset form
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
        alert("Error submitting form: " + data.message);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Error submitting form. Please try again.");
    }
  };

  const handleCheckboxChange = (field, value, checked) => {
    setFormData((prev) => ({
      ...prev,
      [field]: checked
        ? [...prev[field], value]
        : prev[field].filter((item) => item !== value),
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
            <Store className="h-4 w-4" />
            <span>Platform Enablement & AMS</span>
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Launch, scale, and <span className="text-green-600">optimize</span>{" "}
            your digital commerce journey.
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Helping businesses launch, scale, and optimize their digital
            commerce journey with comprehensive platform enablement and account
            management services.
          </p>
        </div>
      </section>

      {/* What We Do */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              🚀 What is Platform Enablement & AMS?
            </h2>
            <p className="text-lg text-gray-600 max-w-4xl mx-auto">
              Platform Enablement & AMS (Account Management Services) is a
              comprehensive solution that helps businesses launch, manage, and
              optimize their presence across digital marketplaces. We handle
              everything from initial setup to ongoing operations, allowing you
              to focus on your core business while we drive your digital
              commerce success.
            </p>
          </div>
        </div>
      </section>

      {/* Our Three Core Services */}
      <section className="py-16 px-4 bg-green-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              🎯 Our Three Core Services
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              From setup to scale, we provide end-to-end support for your
              digital commerce journey.
            </p>
          </div>
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow p-6">
              <Store className="h-8 w-8 text-green-600 mb-4 mx-auto" />
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Setting Up a Seller Account
              </h3>
              <p className="text-gray-600">
                Start your e-commerce journey with ease. We assist with document
                verification, product approvals, and platform compliance.
              </p>
              <div className="mt-4 bg-green-50 p-3 rounded-lg">
                <p className="text-green-800 font-semibold text-sm">Benefit:</p>
                <p className="text-green-700 text-sm">
                  Go live in days, not weeks — with expert help every step of
                  the way.
                </p>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow p-6">
              <Settings className="h-8 w-8 text-green-600 mb-4 mx-auto" />
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Ecommerce Seller Account Management
              </h3>
              <p className="text-gray-600">
                Stay focused on your products—we'll handle listing optimization,
                inventory, orders, and analytics.
              </p>
              <div className="mt-4 bg-green-50 p-3 rounded-lg">
                <p className="text-green-800 font-semibold text-sm">Benefit:</p>
                <p className="text-green-700 text-sm">
                  Consistent performance, fewer errors, and better customer
                  experiences.
                </p>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow p-6">
              <Megaphone className="h-8 w-8 text-green-600 mb-4 mx-auto" />
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                eCommerce Advertising & Marketing
              </h3>
              <p className="text-gray-600">
                Drive sales with strategic campaigns across platforms, social
                media, and influencer partnerships.
              </p>
              <div className="mt-4 bg-green-50 p-3 rounded-lg">
                <p className="text-green-800 font-semibold text-sm">Benefit:</p>
                <p className="text-green-700 text-sm">
                  Turn views into conversions and shoppers into loyal customers.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Detailed Service 1: Setting Up a Seller Account */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              🛍️ Setting Up a Seller Account
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Start selling online—quickly, correctly, and confidently.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">
                🔍 What We Do
              </h3>
              <p className="text-gray-600 mb-6">
                Whether you're new to digital commerce or expanding to new
                platforms, we make seller account setup fast, smooth, and
                compliant. Our experts help you register, configure, and get
                ready to sell across multiple marketplaces — so you can focus on
                growing your business.
              </p>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <FileText className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">
                      Account Registration & Documentation
                    </h4>
                    <p className="text-gray-600 text-sm">
                      Guidance through KYC, GST, bank details, and
                      platform-specific requirements.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <Package className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">
                      Category & Product Approval
                    </h4>
                    <p className="text-gray-600 text-sm">
                      Ensure your products are approved for listing in the
                      correct categories.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <Building className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">
                      Profile Setup & Store Branding
                    </h4>
                    <p className="text-gray-600 text-sm">
                      Logo, brand story, banners, and more — all aligned with
                      your brand identity.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <Truck className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">
                      Shipping & Payment Configuration
                    </h4>
                    <p className="text-gray-600 text-sm">
                      Set up shipping preferences, logistics partners, and
                      payment options.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <Shield className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">
                      Platform Compliance Support
                    </h4>
                    <p className="text-gray-600 text-sm">
                      Ensure your listings and operations meet marketplace
                      policies and tax requirements.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">
                📋 Seller Account Setup Packages
              </h3>
              <div className="space-y-4">
                <div className="border-2 border-green-200 rounded-lg hover:border-green-400 transition-colors">
                  <div className="p-6">
                    <h4 className="text-lg font-semibold">Starter</h4>
                    <p className="text-sm text-gray-600">Any 1 Platform</p>
                    <p className="text-sm text-gray-600 mt-2">
                      Turnaround Time: 3 Business Days
                    </p>
                    <p className="text-sm text-gray-700">
                      Perfect for new sellers looking to start on one platform
                    </p>
                  </div>
                </div>
                <div className="border-2 border-green-200 rounded-lg hover:border-green-400 transition-colors">
                  <div className="p-6">
                    <h4 className="text-lg font-semibold">Multi-Channel</h4>
                    <p className="text-sm text-gray-600">Up to 3 Platforms</p>
                    <p className="text-sm text-gray-600 mt-2">
                      Turnaround Time: 5 Business Days
                    </p>
                    <p className="text-sm text-gray-700">
                      Ideal for businesses ready to expand across multiple
                      channels
                    </p>
                  </div>
                </div>
                <div className="border-2 border-green-200 rounded-lg hover:border-green-400 transition-colors">
                  <div className="p-6">
                    <h4 className="text-lg font-semibold">All-In-One</h4>
                    <p className="text-sm text-gray-600">
                      All Major Platforms (up to 6)
                    </p>
                    <p className="text-sm text-gray-600 mt-2">
                      Turnaround Time: 7 Business Days
                    </p>
                    <p className="text-sm text-gray-700">
                      Complete marketplace presence for maximum reach
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-8">
                <h4 className="font-semibold text-gray-900 mb-4">
                  🚀 Why Set Up with 99digicom?
                </h4>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                    <span className="text-gray-700 text-sm">
                      Expert guidance across platforms
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                    <span className="text-gray-700 text-sm">
                      Go live within 3–5 business days
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                    <span className="text-gray-700 text-sm">
                      100% documentation and compliance support
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                    <span className="text-gray-700 text-sm">
                      Customized onboarding based on product type and business
                      model
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Detailed Service 2: Account Management */}
      <section className="py-16 px-4 bg-green-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              🔧 Ecommerce Seller Account Management
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Stay focused on your products — we'll handle the rest.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 mb-12">
            <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow p-6">
              <Search className="h-8 w-8 text-green-600 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Product Listing Optimization
              </h3>
              <p className="text-gray-600 text-sm">
                Titles, descriptions, images, keywords — all tailored for better
                visibility and higher conversions.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow p-6">
              <BarChart3 className="h-8 w-8 text-green-600 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Inventory & Pricing Updates
              </h3>
              <p className="text-gray-600 text-sm">
                Real-time sync of stock and competitive pricing strategies.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow p-6">
              <Headphones className="h-8 w-8 text-green-600 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Order & Return Management
              </h3>
              <p className="text-gray-600 text-sm">
                Seamless handling of orders, return requests, and customer
                queries.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow p-6">
              <PieChart className="h-8 w-8 text-green-600 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Performance Reporting & Analytics
              </h3>
              <p className="text-gray-600 text-sm">
                Actionable insights to improve listings, pricing, and marketing
                ROI.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow p-6">
              <Mail className="h-8 w-8 text-green-600 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Ongoing Platform Communication
              </h3>
              <p className="text-gray-600 text-sm">
                We manage all communications with platforms — from alerts to
                dispute resolutions.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow p-6">
              <Award className="h-8 w-8 text-green-600 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Why Choose 99digicom AMS?
              </h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-600 mr-2" />{" "}
                  Dedicated account manager
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-600 mr-2" />{" "}
                  Reduced operational burden
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-600 mr-2" /> Faster
                  issue resolution
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-600 mr-2" />{" "}
                  Improved sales performance
                </li>
              </ul>
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
              🛒 Supported Platforms
            </h3>
            <div className="w-full">
              <ul className="grid grid-cols-7 border-b border-gray-200">
                {[
                  "ondc",
                  "amazon",
                  "flipkart",
                  "meesho",
                  "jiomart",
                  "zomato",
                  "swiggy",
                ].map((platform) => (
                  <li key={platform}>
                    <button
                      className={`px-4 py-2 text-sm font-medium ${
                        activeTab === platform
                          ? "border-b-2 border-green-600 text-green-600"
                          : "text-gray-600 hover:text-green-600"
                      }`}
                      onClick={() => setActiveTab(platform)}
                    >
                      {platform.charAt(0).toUpperCase() + platform.slice(1)}
                    </button>
                  </li>
                ))}
              </ul>
              <div className="mt-6">
                {activeTab === "ondc" && (
                  <div className="bg-white rounded-lg shadow-lg p-6">
                    <h4 className="text-lg font-semibold flex items-center space-x-2">
                      <div className="w-3 h-3 bg-green-600 rounded-full"></div>
                      <span>ONDC</span>
                    </h4>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-green-600 mr-2" />{" "}
                        Seller account setup and integration with ONDC gateway
                        partners
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-green-600 mr-2" />{" "}
                        Product cataloging according to ONDC schema
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-green-600 mr-2" />{" "}
                        Buyer-side app promotions and partner alignment
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-green-600 mr-2" />{" "}
                        Order & fulfillment handling via ONDC-compliant
                        logistics
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-green-600 mr-2" />{" "}
                        ONDC compliance updates and billing support
                      </li>
                    </ul>
                  </div>
                )}
                {activeTab === "amazon" && (
                  <div className="bg-white rounded-lg shadow-lg p-6">
                    <h4 className="text-lg font-semibold flex items-center space-x-2">
                      <div className="w-3 h-3 bg-green-600 rounded-full"></div>
                      <span>Amazon</span>
                    </h4>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-green-600 mr-2" />{" "}
                        A+ Content creation and Brand Registry support
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-green-600 mr-2" />{" "}
                        Lightning Deals, Coupons & Promotions setup
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-green-600 mr-2" />{" "}
                        Buy Box win strategy & pricing intelligence
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-green-600 mr-2" />{" "}
                        Account health monitoring and issue resolution
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-green-600 mr-2" />{" "}
                        Sponsored Ads optimization
                      </li>
                    </ul>
                  </div>
                )}
                {activeTab === "flipkart" && (
                  <div className="bg-white rounded-lg shadow-lg p-6">
                    <h4 className="text-lg font-semibold flex items-center space-x-2">
                      <div className="w-3 h-3 bg-green-600 rounded-full"></div>
                      <span>Flipkart</span>
                    </h4>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-green-600 mr-2" />{" "}
                        Flipkart Seller Hub onboarding and optimization
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-green-600 mr-2" />{" "}
                        Listing quality improvement and keyword targeting
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-green-600 mr-2" />{" "}
                        Flipkart Ads (PLA) campaign management
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-green-600 mr-2" />{" "}
                        Return handling and performance dashboard reviews
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-green-600 mr-2" />{" "}
                        Seller rating improvement strategies
                      </li>
                    </ul>
                  </div>
                )}
                {activeTab === "meesho" && (
                  <div className="bg-white rounded-lg shadow-lg p-6">
                    <h4 className="text-lg font-semibold flex items-center space-x-2">
                      <div className="w-3 h-3 bg-green-600 rounded-full"></div>
                      <span>Meesho</span>
                    </h4>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-green-600 mr-2" />{" "}
                        Simple and fast product uploads via Meesho Panel
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-green-600 mr-2" />{" "}
                        Pricing & bulk inventory updates
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-green-600 mr-2" />{" "}
                        Performance-based growth recommendations
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-green-600 mr-2" />{" "}
                        Daily sales reporting and return coordination
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-green-600 mr-2" />{" "}
                        Promotions during high-sale events (Festive Sales, etc.)
                      </li>
                    </ul>
                  </div>
                )}
                {activeTab === "jiomart" && (
                  <div className="bg-white rounded-lg shadow-lg p-6">
                    <h4 className="text-lg font-semibold flex items-center space-x-2">
                      <div className="w-3 h-3 bg-green-600 rounded-full"></div>
                      <span>Jiomart</span>
                    </h4>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-green-600 mr-2" />{" "}
                        Jiomart Seller Portal listing assistance
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-green-600 mr-2" />{" "}
                        Fulfillment coordination for Jio Retail model
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-green-600 mr-2" />{" "}
                        Category approval and compliance handling
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-green-600 mr-2" />{" "}
                        Marketing banners and discount offers setup
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-green-600 mr-2" />{" "}
                        Sales analytics and optimization recommendations
                      </li>
                    </ul>
                  </div>
                )}
                {activeTab === "zomato" && (
                  <div className="bg-white rounded-lg shadow-lg p-6">
                    <h4 className="text-lg font-semibold flex items-center space-x-2">
                      <div className="w-3 h-3 bg-green-600 rounded-full"></div>
                      <span>Zomato</span>
                    </h4>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-green-600 mr-2" />{" "}
                        Menu management & daily updates
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-green-600 mr-2" />{" "}
                        Pricing optimization for combos and add-ons
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-green-600 mr-2" />{" "}
                        Order flow support with POS integration (if required)
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-green-600 mr-2" />{" "}
                        Promotions & campaign coordination with Zomato team
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-green-600 mr-2" />{" "}
                        Analytics for order trends, ratings, and delivery issues
                      </li>
                    </ul>
                  </div>
                )}
                {activeTab === "swiggy" && (
                  <div className="bg-white rounded-lg shadow-lg p-6">
                    <h4 className="text-lg font-semibold flex items-center space-x-2">
                      <div className="w-3 h-3 bg-green-600 rounded-full"></div>
                      <span>Swiggy</span>
                    </h4>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-green-600 mr-2" />{" "}
                        Swiggy Partner Onboarding & Menu Optimization
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-green-600 mr-2" />{" "}
                        Commission negotiation and partner support
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-green-600 mr-2" />{" "}
                        Inventory sync and delivery time optimization
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-green-600 mr-2" />{" "}
                        Participation in "Swiggy One" and "Instamart"
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-green-600 mr-2" />{" "}
                        Weekly performance reviews and return handling
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Detailed Service 3: Advertising & Marketing */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              📈 eCommerce Advertising & Marketing
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Get discovered. Drive traffic. Boost conversions.
            </p>
            <p className="text-gray-600 mt-4">
              In today's competitive online marketplace, just being listed isn't
              enough — you need visibility and strategy. Our eCommerce
              Advertising & Marketing services are built to help sellers
              increase traffic, improve visibility, and grow revenue across
              major e-commerce platforms.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 mb-12">
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">
                📈 What We Offer
              </h3>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <MousePointer className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">
                      ✅ Sponsored Ad Campaigns (PPC)
                    </h4>
                    <ul className="text-gray-600 text-sm space-y-1">
                      <li className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-green-600 mr-2" />{" "}
                        Create and manage product ads on Amazon, Flipkart,
                        Meesho, Jiomart, and more
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-green-600 mr-2" />{" "}
                        Keyword research and targeting
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-green-600 mr-2" />{" "}
                        Ad budget optimization for maximum ROI
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-green-600 mr-2" />{" "}
                        A/B testing and performance tracking
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <Calendar className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">
                      ✅ Seasonal & Festival Campaigns
                    </h4>
                    <ul className="text-gray-600 text-sm space-y-1">
                      <li className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-green-600 mr-2" />{" "}
                        Diwali, Holi, Republic Day, New Year, Raksha Bandhan,
                        etc.
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-green-600 mr-2" />{" "}
                        Custom promotions and product bundling
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-green-600 mr-2" />{" "}
                        Sale event calendar planning
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <Star className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">
                      ✅ Platform-Specific Promotions
                    </h4>
                    <ul className="text-gray-600 text-sm space-y-1">
                      <li className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-green-600 mr-2" />{" "}
                        Participation in Lightning Deals, Big Billion Day,
                        Amazon Prime Day, Flipkart Big Savings, etc.
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-green-600 mr-2" />{" "}
                        Exclusive offers and banner placements
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-green-600 mr-2" />{" "}
                        Pricing strategy for offer periods
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <Users className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">
                      ✅ Social Media & Off-Platform Promotions
                    </h4>
                    <ul className="text-gray-600 text-sm space-y-1">
                      <li className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-green-600 mr-2" />{" "}
                        Targeted ads on Meta (Facebook/Instagram), Google,
                        YouTube
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-green-600 mr-2" />{" "}
                        Influencer collaborations & affiliate campaigns
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-green-600 mr-2" />{" "}
                        Landing pages & conversion tracking
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <Camera className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">
                      ✅ Creative & Content Design
                    </h4>
                    <ul className="text-gray-600 text-sm space-y-1">
                      <li className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-green-600 mr-2" />{" "}
                        Ad banners, creatives, product videos, short reels
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-green-600 mr-2" />{" "}
                        Enhanced brand content (A+ Content on Amazon)
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-green-600 mr-2" />{" "}
                        Product infographics and storytelling visuals
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">
                🎯 Our Process
              </h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-4 p-4 bg-green-50 rounded-lg">
                  <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                    1
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Audit</h4>
                    <p className="text-gray-600 text-sm">
                      Analyze your current product listings and ad performance
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-4 p-4 bg-green-50 rounded-lg">
                  <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                    2
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Strategy</h4>
                    <p className="text-gray-600 text-sm">
                      Define goals (awareness, sales, traffic) and target
                      audience
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-4 p-4 bg-green-50 rounded-lg">
                  <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                    3
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Execution</h4>
                    <p className="text-gray-600 text-sm">
                      Launch platform and social ads, seasonal campaigns
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-4 p-4 bg-green-50 rounded-lg">
                  <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                    4
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      Optimization
                    </h4>
                    <p className="text-gray-600 text-sm">
                      Weekly monitoring, reporting, and ad refinements
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-4 p-4 bg-green-50 rounded-lg">
                  <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                    5
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Scale</h4>
                    <p className="text-gray-600 text-sm">
                      Expand to new platforms or regions
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-8">
                <h4 className="font-semibold text-gray-900 mb-4">
                  🚀 Why Choose 99digicom?
                </h4>
                <div className="space-y-2">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                    <span className="text-gray-700 text-sm">
                      Platform-specific ad specialists
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                    <span className="text-gray-700 text-sm">
                      Weekly performance reports
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                    <span className="text-gray-700 text-sm">
                      Creative support for banners, videos & reels
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                    <span className="text-gray-700 text-sm">
                      Campaigns tailored to your product category
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-12">
            <h3 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
              🔍 Platform-Specific Advertising Expertise
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow p-6">
                <h4 className="text-lg font-semibold flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-600 rounded-full"></div>
                  <span>Amazon Ads</span>
                </h4>
                <p className="text-sm text-gray-600">
                  Sponsored Products, Sponsored Brands, Brand Store Ads
                </p>
              </div>
              <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow p-6">
                <h4 className="text-lg font-semibold flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-600 rounded-full"></div>
                  <span>Flipkart Ads</span>
                </h4>
                <p className="text-sm text-gray-600">
                  Product Listing Ads (PLA), Flipkart Deals, Video Ads
                </p>
              </div>
              <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow p-6">
                <h4 className="text-lg font-semibold flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-600 rounded-full"></div>
                  <span>Meesho Promotions</span>
                </h4>
                <p className="text-sm text-gray-600">
                  Flash Sale Strategy, Discount Management
                </p>
              </div>
              <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow p-6">
                <h4 className="text-lg font-semibold flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-600 rounded-full"></div>
                  <span>Jiomart Promotions</span>
                </h4>
                <p className="text-sm text-gray-600">
                  Homepage banners, Coupon Offers, Deal Days
                </p>
              </div>
              <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow p-6">
                <h4 className="text-lg font-semibold flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-600 rounded-full"></div>
                  <span>ONDC</span>
                </h4>
                <p className="text-sm text-gray-600">
                  Buyer-side visibility campaigns (via partner apps)
                </p>
              </div>
              <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow p-6">
                <h4 className="text-lg font-semibold flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-600 rounded-full"></div>
                  <span>Zomato / Swiggy</span>
                </h4>
                <p className="text-sm text-gray-600">
                  Sponsored listings, discount campaigns, and regional targeting
                </p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
              💰 Platform Enablement & AMS Plans
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="border-2 border-green-200 rounded-lg hover:border-green-400 transition-colors">
                <div className="p-6 text-center">
                  <h4 className="text-xl font-semibold">Starter</h4>
                  <p className="text-sm text-gray-600">Ideal for new sellers</p>
                  <div className="text-2xl font-bold text-green-600 mt-2">
                    ₹3,500/month
                  </div>
                  <p className="text-sm text-gray-600 mt-2">
                    + ₹4,999 one-time setup
                  </p>
                  <ul className="space-y-2 text-sm text-gray-600 mt-4">
                    <li className="flex items-center justify-center">
                      <CheckCircle className="h-4 w-4 text-green-600 mr-2" />{" "}
                      Seller Account Setup
                    </li>
                    <li className="flex items-center justify-center">
                      <CheckCircle className="h-4 w-4 text-green-600 mr-2" /> Up
                      to 20 SKUs
                    </li>
                    <li className="flex items-center justify-center">
                      <CheckCircle className="h-4 w-4 text-green-600 mr-2" />{" "}
                      Email Support
                    </li>
                    <li className="flex items-center justify-center">
                      <CheckCircle className="h-4 w-4 text-green-600 mr-2" />{" "}
                      Basic Order & Inventory Management
                    </li>
                    <li className="flex items-center justify-center">
                      <CheckCircle className="h-4 w-4 text-green-600 mr-2" />{" "}
                      Marketing Campaigns (Add-on)
                    </li>
                  </ul>
                  <p className="text-xs text-gray-500 mt-4">
                    *Ad spend billed separately based on platform budgets
                  </p>
                </div>
              </div>
              <div className="border-2 border-green-400 rounded-lg relative">
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-green-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                    Popular
                  </span>
                </div>
                <div className="p-6 text-center">
                  <h4 className="text-xl font-semibold">Growth</h4>
                  <p className="text-sm text-gray-600">Scaling brands</p>
                  <div className="text-2xl font-bold text-green-600 mt-2">
                    ₹9,500/month
                  </div>
                  <p className="text-sm text-gray-600 mt-2">Setup Included</p>
                  <ul className="space-y-2 text-sm text-gray-600 mt-4">
                    <li className="flex items-center justify-center">
                      <CheckCircle className="h-4 w-4 text-green-600 mr-2" />{" "}
                      Seller Account Setup
                    </li>
                    <li className="flex items-center justify-center">
                      <CheckCircle className="h-4 w-4 text-green-600 mr-2" /> Up
                      to 100 SKUs
                    </li>
                    <li className="flex items-center justify-center">
                      <CheckCircle className="h-4 w-4 text-green-600 mr-2" />{" "}
                      Email + Chat Support
                    </li>
                    <li className="flex items-center justify-center">
                      <CheckCircle className="h-4 w-4 text-green-600 mr-2" />{" "}
                      Advanced Order & Inventory Management
                    </li>
                    <li className="flex items-center justify-center">
                      <CheckCircle className="h-4 w-4 text-green-600 mr-2" /> 1
                      Campaign / Month
                    </li>
                  </ul>
                  <p className="text-xs text-gray-500 mt-4">
                    *Ad spend billed separately based on platform budgets
                  </p>
                </div>
              </div>
              <div className="border-2 border-green-200 rounded-lg hover:border-green-400 transition-colors">
                <div className="p-6 text-center">
                  <h4 className="text-xl font-semibold">Enterprise</h4>
                  <p className="text-sm text-gray-600">Multi-channel sellers</p>
                  <div className="text-2xl font-bold text-green-600 mt-2">
                    ₹24,000/month
                  </div>
                  <p className="text-sm text-gray-600 mt-2">Setup Included</p>
                  <ul className="space-y-2 text-sm text-gray-600 mt-4">
                    <li className="flex items-center justify-center">
                      <CheckCircle className="h-4 w-4 text-green-600 mr-2" />{" "}
                      Seller Account Setup
                    </li>
                    <li className="flex items-center justify-center">
                      <CheckCircle className="h-4 w-4 text-green-600 mr-2" />{" "}
                      Unlimited SKUs
                    </li>
                    <li className="flex items-center justify-center">
                      <CheckCircle className="h-4 w-4 text-green-600 mr-2" />{" "}
                      Dedicated Manager
                    </li>
                    <li className="flex items-center justify-center">
                      <CheckCircle className="h-4 w-4 text-green-600 mr-2" />{" "}
                      Advanced Order & Inventory Management + Reports
                    </li>
                    <li className="flex items-center justify-center">
                      <CheckCircle className="h-4 w-4 text-green-600 mr-2" /> 4
                      Campaigns / Month
                    </li>
                  </ul>
                  <p className="text-xs text-gray-500 mt-4">
                    *Ad spend billed separately based on platform budgets
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Supported Platforms */}
      <section className="py-16 px-4 bg-green-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              🏪 Supported Marketplaces
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: "ONDC", desc: "Open Network for Digital Commerce" },
              { name: "Amazon", desc: "World's largest e-commerce platform" },
              {
                name: "Flipkart",
                desc: "India's leading e-commerce marketplace",
              },
              { name: "Meesho", desc: "Social commerce platform" },
              { name: "Jiomart", desc: "Reliance's digital commerce platform" },
              { name: "Zomato", desc: "Food delivery and restaurant platform" },
              { name: "Swiggy", desc: "Food delivery and quick commerce" },
              { name: "Others", desc: "Custom platforms available on request" },
            ].map((platform, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow text-center p-6"
              >
                <div className="w-12 h-12 bg-green-100 text-green-600 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <ShoppingCart className="h-6 w-6" />
                </div>
                <h4 className="text-lg font-semibold text-gray-900">
                  {platform.name}
                </h4>
                <p className="text-gray-600 text-sm">{platform.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Application Form */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              📝 Get Started with Platform Enablement & AMS
            </h2>
            <p className="text-lg text-gray-600">
              Ready to launch or optimize your digital commerce presence? Fill
              out the form below to get started.
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-xl p-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <span className="mr-2">🏢</span> Business Information
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Business Name *
                    </label>
                    <input
                      type="text"
                      value={formData.businessName}
                      onChange={(e) =>
                        handleInputChange("businessName", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Contact Person *
                    </label>
                    <input
                      type="text"
                      value={formData.contactPerson}
                      onChange={(e) =>
                        handleInputChange("contactPerson", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        handleInputChange("email", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) =>
                        handleInputChange("phone", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Website (Optional)
                    </label>
                    <input
                      type="url"
                      value={formData.website}
                      onChange={(e) =>
                        handleInputChange("website", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Business Type *
                    </label>
                    <select
                      value={formData.businessType}
                      onChange={(e) =>
                        handleInputChange("businessType", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      required
                    >
                      <option value="">Select business type</option>
                      <option value="individual">Individual Seller</option>
                      <option value="pvt-ltd">Private Limited Company</option>
                      <option value="partnership">Partnership</option>
                      <option value="llp">LLP</option>
                      <option value="startup">Startup</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <span className="mr-2">🎯</span> Services Needed
                </h3>
                <div className="grid md:grid-cols-2 gap-3">
                  {[
                    "Setting Up Seller Account",
                    "Account Management Services (AMS)",
                    "eCommerce Advertising & Marketing",
                    "Product Listing Optimization",
                    "Inventory Management",
                    "Order & Return Management",
                    "Performance Analytics",
                    "Platform Compliance Support",
                  ].map((service) => (
                    <div key={service} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id={service}
                        checked={formData.servicesNeeded.includes(service)}
                        onChange={(e) =>
                          handleCheckboxChange(
                            "servicesNeeded",
                            service,
                            e.target.checked
                          )
                        }
                        className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                      />
                      <label
                        htmlFor={service}
                        className="text-sm text-gray-700"
                      >
                        {service}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <span className="mr-2">🛒</span> Platforms of Interest
                </h3>
                <div className="grid md:grid-cols-2 gap-3">
                  {[
                    "ONDC",
                    "Amazon",
                    "Flipkart",
                    "Meesho",
                    "Jiomart",
                    "Zomato",
                    "Swiggy",
                    "Myntra",
                    "Nykaa",
                    "Custom Website",
                    "Other",
                  ].map((platform) => (
                    <div key={platform} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id={platform}
                        checked={formData.platforms.includes(platform)}
                        onChange={(e) =>
                          handleCheckboxChange(
                            "platforms",
                            platform,
                            e.target.checked
                          )
                        }
                        className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                      />
                      <label
                        htmlFor={platform}
                        className="text-sm text-gray-700"
                      >
                        {platform}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Current Monthly Sales Volume
                  </label>
                  <select
                    value={formData.currentSalesVolume}
                    onChange={(e) =>
                      handleInputChange("currentSalesVolume", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  >
                    <option value="">Select sales volume</option>
                    <option value="0">Just starting</option>
                    <option value="less-1l">Less than ₹1,00,000</option>
                    <option value="1l-5l">₹1,00,000 – ₹5,00,000</option>
                    <option value="5l-10l">₹5,00,000 – ₹10,00,000</option>
                    <option value="10l-plus">₹10,00,000+</option>
                  </select>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <span className="mr-2">💬</span> Additional Notes or
                  Requirements
                </h3>
                <textarea
                  value={formData.additionalNotes}
                  onChange={(e) =>
                    handleInputChange("additionalNotes", e.target.value)
                  }
                  placeholder="Tell us about your specific needs, challenges, or goals..."
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                />
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="consent"
                  checked={formData.consent}
                  onChange={(e) =>
                    handleInputChange("consent", e.target.checked)
                  }
                  className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                  required
                />
                <label htmlFor="consent" className="text-sm text-gray-700">
                  I agree to be contacted by 99digicom's team for platform
                  enablement and AMS services. *
                </label>
              </div>

              <div className="text-center">
                <button
                  type="submit"
                  className="inline-flex items-center px-8 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors"
                >
                  Submit Application
                  <ArrowRight className="ml-2 h-5 w-5" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
