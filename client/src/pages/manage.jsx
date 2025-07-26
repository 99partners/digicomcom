"use client";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Added this import
import {
  Settings,
  ArrowRight,
  Search,
  BarChart3,
  Headphones,
  PieChart,
  Mail,
  ShoppingCart,
  CheckCircle,
} from "lucide-react";
import axios from "axios";
import { getApiUrl } from "../config/api.config";
import SEO from "../components/SEO";
import ImageSlider from "../components/ImageSlider";
import AMS1 from "../assets/AMS1.png";
import AMS2 from "../assets/AMS2.png";
import AMS3 from "../assets/AMS3.png";
import AMS4 from "../assets/AMS4.png";
// Add these imports for marketplace logos
import amazonLogo from "../assets/Amazon.png";
import flipkartLogo from "../assets/Flipkart.png";
import ondcLogo from "../assets/ONDC1.png";
import jiomartLogo from "../assets/Jiomart.png";
import meeshoLogo from "../assets/Meesho1.png";
import snapdealLogo from "../assets/Snapdeal.png";
import instamartLogo from "../assets/Instamart.png";
import bigbasketLogo from "../assets/BigBasket.png";
import blinkitLogo from "../assets/Blinkit.png";
import zeptoLogo from "../assets/Zepto.png";
export default function AccountManagementServices() {
  const navigate = useNavigate();
  const [currentLogoIndex, setCurrentLogoIndex] = useState(0);
  const [activeCategory, setActiveCategory] = useState("ecommerce");
  const logos = [
    { src: amazonLogo, alt: "Amazon logo" },
    { src: flipkartLogo, alt: "Flipkart logo" },
    { src: snapdealLogo, alt: "Snapdeal logo" },
    { src: jiomartLogo, alt: "JioMart logo" },
    { src: meeshoLogo, alt: "Meesho logo" },
    { src: bigbasketLogo, alt: "BigBasket logo" },
  ];
  
  // Add authentication check function
  const isAuthenticated = () => {
    // Check if token exists in localStorage or sessionStorage
    const token = localStorage.getItem('authToken') || sessionStorage.getItem('authToken');
    return !!token;
  };
  
  // Handle Get Started button click
  const handleGetStarted = () => {
    if (isAuthenticated()) {
      navigate('/dashboard'); // Redirect to dashboard if authenticated
    } else {
      navigate('/partnerlogin'); // Redirect to login if not authenticated
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    const interval = setInterval(() => {
      setCurrentLogoIndex((prevIndex) => (prevIndex + 1) % logos.length);
    }, 2000);
    return () => clearInterval(interval);
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
  const [activeMarketplace, setActiveMarketplace] = useState("amazon"); // Set amazon as default
  const marketplaces = {
    amazon: {
      name: "Amazon",
      logo: amazonLogo,
      href: "/partners/marketplaces/amazon",
      services: [
        "Inventory and order management",
        "Performance metrics tracking (A+ content, reviews, sales)",
        "Account health monitoring and suspension management",
      ],
      category: "ecommerce",
    },
    flipkart: {
      name: "Flipkart",
      logo: flipkartLogo,
      href: "/partners/marketplaces/flipkart",
      services: [
        "Flipkart seller registration & tax setup",
        "Product upload with Flipkart-specific attributes",
        "Flipkart SmartBuy program support",
      ],
      category: "ecommerce",
    },
    jiomart: {
      name: "JioMart",
      logo: jiomartLogo,
      href: "/partners/marketplaces/jiomart",
      services: [
        "Regular inventory updates & stock tracking",
        "Order processing and return management",
        "Managing promotional listings and offers",
      ],
      category: "quick-commerce",
    },
    meesho: {
      name: "Meesho",
      logo: meeshoLogo,
      href: "/partners/marketplaces/meesho",
      services: [
        "Inventory & order management for resellers and brands",
        "Handling Meesho's discounting policies and pricing",
        "Return and refund management through Meesho's system",
      ],
      category: "ecommerce",
    },
    snapdeal: {
      name: "Snapdeal",
      logo: snapdealLogo,
      href: "/partners/marketplaces/snapdeal",
      services: [
        "Seller dashboard management (orders, stock, returns)",
        "Customer service support and order resolution",
        "Monitoring seller performance metrics on Snapdeal",
      ],
      category: "ecommerce",
    },
    instamart: {
      name: "Instamart",
      logo: instamartLogo,
      href: "/partners/marketplaces/instamart",
      services: [
        "Real-time inventory tracking and product updates",
        "Efficient order and return management",
        "Customer feedback monitoring for better service",
      ],
      category: "quick-commerce",
    },
    bigbasket: {
      name: "BigBasket",
      logo: bigbasketLogo,
      href: "/partners/marketplaces/bigbasket",
      services: [
        "Inventory tracking for grocery and FMCG products",
        "Efficient order processing and customer service support",
        "Handling seasonal fluctuations (festive sales) in demand",
      ],
      category: "quick-commerce",
    },
    blinkit: {
      name: "Blinkit",
      logo: blinkitLogo,
      href: "/partners/marketplaces/blinkit",
      services: [
        "Real-time order management & customer communication",
        "Inventory and stock alerts for perishable goods",
        "Order fulfillment & last-mile delivery optimization",
      ],
      category: "quick-commerce",
    },
    zepto: {
      name: "Zepto",
      logo: zeptoLogo,
      href: "/partners/marketplaces/zepto",
      services: [
        "Real-time stock and inventory management for perishable goods",
        "Order fulfillment, packing, and dispatching to Zepto hubs",
        "Managing product ratings and customer interactions",
      ],
      category: "quick-commerce",
    },
  };
  const ecommerceMarketplaces = Object.entries(marketplaces)
    .filter(([_, marketplace]) => marketplace.category === "ecommerce")
    .map(([key, marketplace]) => ({ key, ...marketplace }));
  const quickCommerceMarketplaces = Object.entries(marketplaces)
    .filter(([_, marketplace]) => marketplace.category === "quick-commerce")
    .map(([key, marketplace]) => ({ key, ...marketplace }));
  const steps = [
    {
      src: AMS1,
      alt: "Step 1: Hassle-Free Management illustration",
      title: "Hassle-Free Management",
      description: "Effortless order and inventory management.",
    },
    {
      src: AMS2,
      alt: "Step 2: Timely Updates illustration",
      title: "Timely Updates",
      description: "Keep your product listings fresh and competitive.",
    },
    {
      src: AMS3,
      alt: "Step 3: Performance-Driven Support illustration",
      title: "Performance-Driven Support",
      description: "Data-backed strategies to boost sales.",
    },
    {
      src: AMS4,
      alt: "Step 4: Dedicated Coordination illustration",
      title: "Dedicated Coordination",
      description: "Stay connected via WhatsApp for real-time updates.",
    },
  ];
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        getApiUrl("api/ams/submit"),
        formData
      );
      const data = await response.data;
      if (data.success) {
        alert(
          "Thank you for your submission! Our team will contact you shortly."
        );
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
            <h1
              id="hero-heading"
              className="text-5xl font-bold text-gray-900 mb-6 flex flex-col items-center justify-center"
            >
              <span className="flex items-center flex-wrap justify-center">
                <span className="text-green-600 mr-2">Manage</span> Your Online
                Store on
              </span>
              <div className="mt-4">
                <img
                  src={logos[currentLogoIndex].src}
                  alt={logos[currentLogoIndex].alt}
                  className="h-12 w-auto object-contain animate-fadeIn"
                  onError={(e) => {
                    console.error(
                      `Failed to load ${logos[currentLogoIndex].alt}`
                    );
                    e.target.src = "/assets/fallback.png";
                  }}
                />
              </div>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Let us handle daily operations, listings, and reports so you can
              focus on business.
            </p>
            {/* MODIFIED: Added onClick handler to the Get Started button */}
            <button
              onClick={handleGetStarted}
              className="inline-flex items-center px-8 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors flex items-center space-x-2"
              aria-label="Start with account management services"
            >
              <span>Get Started</span>
              <ArrowRight className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </section>
        <style jsx>{`
          @keyframes fadeIn {
            0% {
              opacity: 0;
              transform: translateY(10px);
            }
            100% {
              opacity: 1;
              transform: translateY(0);
            }
          }
          .animate-fadeIn {
            animation: fadeIn 0.5s ease-in-out;
          }
        `}</style>
        {/* Marketplace Panel Section (copied from platformEnable.jsx) */}
        <section
          className="py-16 px-4 bg-green-50"
          aria-labelledby="marketplaces-heading"
        >
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2
                id="marketplaces-heading"
                className="text-3xl font-bold text-gray-900 mb-4"
              >
                Supported Marketplaces
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-12">
                Choose from our wide range of marketplace integrations for
                tailored management services
              </p>
            </div>
            {/* Category Tabs */}
            <div className="flex justify-center mb-8">
              <div className="inline-flex rounded-md shadow-sm">
                <button
                  onClick={() => setActiveCategory("ecommerce")}
                  className={`px-4 py-2 text-sm font-medium rounded-l-lg ${
                    activeCategory === "ecommerce"
                      ? "bg-green-600 text-white"
                      : "bg-white text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  E-commerce
                </button>
                <button
                  onClick={() => setActiveCategory("quick-commerce")}
                  className={`px-4 py-2 text-sm font-medium rounded-r-lg ${
                    activeCategory === "quick-commerce"
                      ? "bg-green-600 text-white"
                      : "bg-white text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  Quick Commerce
                </button>
              </div>
            </div>
            {/* Marketplace List and Details */}
            <div className="grid md:grid-cols-12 gap-8">
              {/* Left Sidebar - Marketplace List */}
              <div className="md:col-span-3">
                <div className="bg-white rounded-lg shadow-md p-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    {activeCategory === "ecommerce"
                      ? "E-commerce Platforms"
                      : "Quick Commerce Platforms"}
                  </h3>
                  <div className="space-y-2">
                    {activeCategory === "ecommerce"
                      ? ecommerceMarketplaces.map(({ key, name, logo }) => (
                          <div
                            key={key}
                            className={`p-3 rounded-lg cursor-pointer transition-all duration-200 ${
                              activeMarketplace === key
                                ? "bg-green-100 text-green-700"
                                : "hover:bg-green-50 hover:text-green-600"
                            }`}
                            onMouseEnter={() => setActiveMarketplace(key)}
                          >
                            <div className="flex items-center space-x-3">
                              <img
                                src={logo}
                                alt={`${name} logo`}
                                className="h-8 w-8 object-contain"
                                onError={(e) => {
                                  console.error(`Failed to load ${name} logo`);
                                  e.target.src = "/assets/fallback.png";
                                }}
                              />
                              <span className="font-medium">{name}</span>
                            </div>
                          </div>
                        ))
                      : quickCommerceMarketplaces.map(({ key, name, logo }) => (
                          <div
                            key={key}
                            className={`p-3 rounded-lg cursor-pointer transition-all duration-200 ${
                              activeMarketplace === key
                                ? "bg-green-100 text-green-700"
                                : "hover:bg-green-50 hover:text-green-600"
                            }`}
                            onMouseEnter={() => setActiveMarketplace(key)}
                          >
                            <div className="flex items-center space-x-3">
                              <img
                                src={logo}
                                alt={`${name} logo`}
                                className="h-8 w-8 object-contain"
                                onError={(e) => {
                                  console.error(`Failed to load ${name} logo`);
                                  e.target.src = "/assets/fallback.png";
                                }}
                              />
                              <span className="font-medium">{name}</span>
                            </div>
                          </div>
                        ))}
                  </div>
                </div>
              </div>
              {/* Right Content - Marketplace Details */}
              <div className="md:col-span-9">
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                  {activeMarketplace && marketplaces[activeMarketplace] && (
                    <div className="p-8">
                      <div className="flex items-center justify-between mb-8">
                        <div className="flex-1 flex justify-center">
                          <img
                            src={marketplaces[activeMarketplace].logo}
                            alt={`${marketplaces[activeMarketplace].name} logo`}
                            className="h-24 w-auto object-contain max-w-[280px]"
                            onError={(e) => {
                              console.error(
                                `Failed to load ${marketplaces[activeMarketplace].name} logo`
                              );
                              e.target.src = "/assets/fallback.png";
                            }}
                          />
                        </div>
                      </div>
                      <div className="grid md:grid-cols-2 gap-6">
                        {marketplaces[activeMarketplace].services.map(
                          (service, index) => (
                            <div
                              key={index}
                              className="flex items-center space-x-3 p-4 rounded-lg bg-gray-50 hover:bg-green-50 transition-colors"
                            >
                              <CheckCircle className="h-6 w-6 text-green-600" />
                              <span className="text-gray-700 text-lg">
                                {service}
                              </span>
                            </div>
                          )
                        )}
                      </div>
                      <div className="mt-8 flex justify-center">
                        <button
                          onClick={() =>
                            alert(
                              `Learn more about ${marketplaces[activeMarketplace].name}`
                            )
                          }
                          className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2 text-lg font-medium"
                        >
                          <span>
                            Learn more about{" "}
                            {marketplaces[activeMarketplace].name}
                          </span>
                          <ArrowRight className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Services Included */}
        <section
          className="py-16 px-4 bg-green-50"
          aria-labelledby="whats-included-heading"
        >
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2
                id="whats-included-heading"
                className="text-3xl font-bold text-green-700 mb-4"
              >
                What's Included
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Account Management Services (AMS) help sellers manage their
                accounts and day-to-day operations across marketplaces.
              </p>
            </div>
            <div className="max-w-4xl mx-auto grid gap-8 md:grid-cols-2">
              {/* Card 1 */}
              <div className="bg-white border-l-4 border-green-500 rounded-xl shadow-sm p-6 flex flex-col h-full">
                <div className="flex items-center mb-3">
                  <Settings className="h-7 w-7 text-green-600 mr-3 flex-shrink-0" />
                  <span className="font-semibold text-lg text-gray-900">
                    Product Listing Maintenance
                  </span>
                </div>
                <ul className="list-disc ml-7 text-gray-700 space-y-1 text-base">
                  <li>
                    Regular updates to product listings (price changes, stock
                    updates, new variants).
                  </li>
                  <li>
                    Optimization of product content to keep up with marketplace
                    changes.
                  </li>
                </ul>
              </div>
              {/* Card 2 */}
              <div className="bg-white border-l-4 border-green-500 rounded-xl shadow-sm p-6 flex flex-col h-full">
                <div className="flex items-center mb-3">
                  <ShoppingCart className="h-7 w-7 text-green-600 mr-3 flex-shrink-0" />
                  <span className="font-semibold text-lg text-gray-900">
                    Inventory & Stock Management
                  </span>
                </div>
                <ul className="list-disc ml-7 text-gray-700 space-y-1 text-base">
                  <li>
                    Monitoring inventory levels to avoid out-of-stock issues.
                  </li>
                  <li>Proactive stock alerts for timely restocking.</li>
                  <li>Syncing inventory across platforms.</li>
                </ul>
              </div>
              {/* Card 3 */}
              <div className="bg-white border-l-4 border-green-500 rounded-xl shadow-sm p-6 flex flex-col h-full">
                <div className="flex items-center mb-3">
                  <BarChart3 className="h-7 w-7 text-green-600 mr-3 flex-shrink-0" />
                  <span className="font-semibold text-lg text-gray-900">
                    Order Processing & Return Management
                  </span>
                </div>
                <ul className="list-disc ml-7 text-gray-700 space-y-1 text-base">
                  <li>
                    Handling order processing (packing, dispatch) for smooth
                    fulfillment.
                  </li>
                  <li>
                    Managing returns, exchanges, and refunds according to
                    platform policies.
                  </li>
                </ul>
              </div>
              {/* Card 4 */}
              <div className="bg-white border-l-4 border-green-500 rounded-xl shadow-sm p-6 flex flex-col h-full">
                <div className="flex items-center mb-3">
                  <Headphones className="h-7 w-7 text-green-600 mr-3 flex-shrink-0" />
                  <span className="font-semibold text-lg text-gray-900">
                    Customer Service Management
                  </span>
                </div>
                <ul className="list-disc ml-7 text-gray-700 space-y-1 text-base">
                  <li>
                    Responding to customer queries and issues in a timely
                    manner.
                  </li>
                  <li>
                    Handling product feedback and customer complaints to
                    maintain a good seller rating.
                  </li>
                </ul>
              </div>
              {/* Card 5 */}
              <div className="bg-white border-l-4 border-green-500 rounded-xl shadow-sm p-6 flex flex-col h-full">
                <div className="flex items-center mb-3">
                  <PieChart className="h-7 w-7 text-green-600 mr-3 flex-shrink-0" />
                  <span className="font-semibold text-lg text-gray-900">
                    Performance Monitoring & Reporting
                  </span>
                </div>
                <ul className="list-disc ml-7 text-gray-700 space-y-1 text-base">
                  <li>
                    Tracking performance metrics (sales, returns, reviews,
                    customer ratings).
                  </li>
                  <li>
                    Monthly reports to help sellers track growth and identify
                    areas for improvement.
                  </li>
                  <li>
                    Handling account health issues (suspensions, penalties,
                    etc.).
                  </li>
                </ul>
              </div>
              {/* Card 6 */}
              <div className="bg-white border-l-4 border-green-500 rounded-xl shadow-sm p-6 flex flex-col h-full">
                <div className="flex items-center mb-3">
                  <CheckCircle className="h-7 w-7 text-green-600 mr-3 flex-shrink-0" />
                  <span className="font-semibold text-lg text-gray-900">
                    Compliance & Policy Monitoring
                  </span>
                </div>
                <ul className="list-disc ml-7 text-gray-700 space-y-1 text-base">
                  <li>
                    Ensuring compliance with platform policies to avoid
                    penalties.
                  </li>
                  <li>
                    Updating product listings according to platform-specific
                    requirements
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
        {/* Key Benefits */}
        <section
          className="py-16 px-4 bg-white"
          aria-labelledby="benefits-heading"
        >
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2
                id="benefits-heading"
                className="text-3xl font-bold text-gray-900 mb-4"
              >
                Key Benefits
              </h2>
              <p className="text-lg text-gray-600 max-w-4xl mx-auto">
                Optimize your e-commerce operations with our comprehensive
                management services.
              </p>
            </div>
            <ImageSlider slides={steps} />
          </div>
        </section>
        {/* Success Story */}
        <section
          className="py-16 px-4 bg-white"
          aria-labelledby="success-heading"
        >
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2
                id="success-heading"
                className="text-3xl font-bold text-gray-900 mb-4"
              >
                Success Story
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                A kitchenware brand scaled 180% in 3 months with 99digicom's
                management support.
              </p>
            </div>
            <div className="bg-green-50 rounded-lg p-6">
              <blockquote>
                <p className="text-gray-600">
                  By streamlining inventory, optimizing listings, and handling
                  orders efficiently, we helped a kitchenware brand achieve a
                  180% sales increase in just three months.
                </p>
              </blockquote>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}