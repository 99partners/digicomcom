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
  CheckCircle,
} from "lucide-react";
import axios from 'axios';
import { getApiUrl } from '../config/api.config';
import SEO from '../components/SEO';
import ImageSlider from '../components/ImageSlider';
import AMS1 from '../assets/AMS1.png';
import AMS2 from '../assets/AMS2.png'; 
import AMS3 from '../assets/AMS3.png';
import AMS4 from '../assets/AMS4.png';
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
        "Account Management",
        "Brand Store",
        "Listing and Cataloging",
        "A+ Listing",
        "Advertising",
        "Glowroad Account Management",
      ],
      category: "ecommerce"
    },
    flipkart: {
      name: "Flipkart",
      logo: flipkartLogo,
      href: "/partners/marketplaces/flipkart",
      services: [
        "Account Management",
        "Shopsy Integration",
        "Listing and Cataloging",
        "Advertising",
      ],
      category: "ecommerce"
    },
    ondc: {
      name: "ONDC",
      logo: ondcLogo,
      href: "/partners/marketplaces/ondc",
      services: [
        "Account Management",
        "Listing and Cataloging",
        "Network Integration",
      ],
      category: "ecommerce"
    },
    jiomart: {
      name: "JioMart",
      logo: jiomartLogo,
      href: "/partners/marketplaces/jiomart",
      services: ["Account Management", "Listing and Cataloging", "Advertising"],
      category: "quick-commerce"
    },
    meesho: {
      name: "Meesho",
      logo: meeshoLogo,
      href: "/partners/marketplaces/meesho",
      services: ["Account Management", "Listing and Cataloging", "Advertising"],
      category: "ecommerce"
    },
    snapdeal: {
      name: "Snapdeal",
      logo: snapdealLogo,
      href: "/partners/marketplaces/snapdeal",
      services: [
        "Account Management",
        "Catalog Management",
        "Order Processing",
        "Performance Marketing",
        "Analytics & Reporting",
        "Competitor Analysis",
      ],
      category: "ecommerce"
    },
    instamart: {
      name: "Instamart",
      logo: instamartLogo,
      href: "/partners/marketplaces/instamart",
      services: [
        "Flash sales, promotional discounts, and marketing campaigns",
        "Boosting high-demand products with Instamart promotions",
        "Cross-platform visibility with Flipkart’s and Instamart’s collaboration",
      ],
      category: "quick-commerce"
    },
    bigbasket: {
      name: "BigBasket",
      logo: bigbasketLogo,
      href: "/partners/marketplaces/bigbasket",
      services: [
        "Bigbasket Ads and campaigns for featured products",
        "Promotions tied to Bigbasket’s seasonal events and offers",
        "Cross-selling and bundling strategies for grocery packages",
      ],
      category: "quick-commerce"
    },
    blinkit: {
      name: "Blinkit",
      logo: blinkitLogo,
      href: "/partners/marketplaces/blinkit",
      services: [
        "Blinkit Ads (promotions within Blinkit app)",
        "Collaborative marketing campaigns for local areas",
        "Special offers and deals during peak hours for better visibility",
      ],
      category: "quick-commerce"
    },
    zepto: {
      name: "Zepto",
      logo: zeptoLogo,
      href: "/partners/marketplaces/zepto",
      services: [
        "Zepto's targeted marketing campaigns to drive demand",
        "Promotional partnerships for high-priority products",
        "Collaborations with local influencers to enhance reach",
      ],
      category: "quick-commerce"
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
      description: "Effortless order and inventory management."
    },
    { 
      src: AMS2, 
      alt: "Step 2: Timely Updates illustration",
      title: "Timely Updates",
      description: "Keep your product listings fresh and competitive."
    },
    { 
      src: AMS3, 
      alt: "Step 3: Performance-Driven Support illustration",
      title: "Performance-Driven Support",
      description: "Data-backed strategies to boost sales."
    },
    { 
      src: AMS4, 
      alt: "Step 4: Dedicated Coordination illustration",
      title: "Dedicated Coordination",
      description: "Stay connected via WhatsApp for real-time updates."
    }
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
              className="text-5xl font-bold text-gray-900 mb-6 flex items-center justify-center flex-wrap"
            >
              <span className="text-green-600 mr-2">Manage</span> Your Online Store on
              <div className="ml-4">
                <img
                  src={logos[currentLogoIndex].src}
                  alt={logos[currentLogoIndex].alt}
                  className="h-12 w-auto object-contain animate-fadeIn"
                  onError={(e) => {
                    console.error(`Failed to load ${logos[currentLogoIndex].alt}`);
                    e.target.src = "/assets/fallback.png";
                  }}
                />
              </div>
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
                Choose from our wide range of marketplace integrations for tailored management services
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
                    {activeCategory === "ecommerce" ? "E-commerce Platforms" : "Quick Commerce Platforms"}
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
                              console.error(`Failed to load ${marketplaces[activeMarketplace].name} logo`);
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
                            alert(`Learn more about ${marketplaces[activeMarketplace].name}`)
                          }
                          className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2 text-lg font-medium"
                        >
                          <span>
                            Learn more about {marketplaces[activeMarketplace].name}
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
            <ImageSlider slides={steps} />
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