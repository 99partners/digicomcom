"use client";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
  Plus,
} from "lucide-react";
import axios from "axios";
import { getApiUrl } from "../config/api.config";
import { Helmet } from "react-helmet";
import AM1 from "../assets/A&M1.png";
import AM2 from "../assets/A&M2.png";
import AM3 from "../assets/A&M3.png";
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
import ImageSlider from '../components/ImageSlider';

export default function AdvertisingMarketing() {
  const navigate = useNavigate();
  const [currentLogoIndex, setCurrentLogoIndex] = useState(0);
  const [activeMarketplace, setActiveMarketplace] = useState("amazon");

  const logos = [
    { src: amazonLogo, alt: "Amazon logo" },
    { src: flipkartLogo, alt: "Flipkart logo" },
    { src: snapdealLogo, alt: "Snapdeal logo" },
    { src: jiomartLogo, alt: "JioMart logo" },
    { src: meeshoLogo, alt: "Meesho logo" },
    { src: bigbasketLogo, alt: "BigBasket logo" },
  ];

  const isAuthenticated = () => {
    const token = localStorage.getItem('authToken') || sessionStorage.getItem('authToken');
    return !!token;
  };

  const handleGetStarted = () => {
    if (isAuthenticated()) {
      navigate('/dashboard');
    } else {
      navigate('/partnerlogin');
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

  const marketplaces = {
    amazon: {
      name: "Amazon",
      logo: amazonLogo,
      href: "/partners/marketplaces/amazon",
      services: [
        "Sponsored Ads (PPC campaigns) setup & management",
        "Amazon Prime Day/Seasonal promotions management",
        "Enhanced Brand Content (EBC) for better visibility",
      ],
      category: "ecommerce"
    },
    flipkart: {
      name: "Flipkart",
      logo: flipkartLogo,
      href: "/partners/marketplaces/flipkart",
      services: [
        "Flipkart Ads (PPC campaigns, Smart Ads) management",
        "Promotions and discount strategy for visibility",
        "Flipkart Seller Hub analytics and insights for growth",
      ],
      category: "ecommerce"
    },
    meesho: {
      name: "Meesho",
      logo: meeshoLogo,
      href: "/partners/marketplaces/meesho",
      services: [
        "Social media integration and influencer marketing",
        "Meesho Boost campaigns for higher reach",
        "Targeted sales during Meesho's seasonal campaigns",
      ],
      category: "ecommerce"
    },
    snapdeal: {
      name: "Snapdeal",
      logo: snapdealLogo,
      href: "/partners/marketplaces/snapdeal",
      services: [
        "Snapdeal Ads campaigns setup and management",
        "Participation in Snapdeal's 'Srinivasa Sale' & other promotions",
        "Dynamic pricing and offers management to boost sales",
      ],
      category: "ecommerce"
    },
    jiomart: {
      name: "JioMart",
      logo: jiomartLogo,
      href: "/partners/marketplaces/jiomart",
      services: [
        "Co-branded marketing initiatives (Jio partner promotions)",
        "JioMart-specific advertising and promotional activities",
        "Engaging with Jio ecosystem users for broader reach",
      ],
      category: "quick-commerce"
    },
    instamart: {
      name: "Instamart",
      logo: instamartLogo,
      href: "/partners/marketplaces/instamart",
      services: [
        "Flash sales, promotional discounts, and marketing campaigns",
        "Boosting high-demand products with Instamart promotions",
        "Cross-platform visibility with Flipkart's and Instamart's collaboration",
      ],
      category: "quick-commerce"
    },
    bigbasket: {
      name: "BigBasket",
      logo: bigbasketLogo,
      href: "/partners/marketplaces/bigbasket",
      services: [
        "BigBasket Ads and campaigns for featured products",
        "Promotions tied to BigBasket's seasonal events and offers",
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
      src: AM1,
      alt: "70% of Sales from Ads illustration",
      title: "70% of Sales from Ads",
      description: "Sponsored listings drive over 70% of e-commerce sales.",
    },
    {
      src: AM2,
      alt: "Better Ad Placement illustration",
      title: "Better Ad Placement",
      description:
        "Improve visibility with strategic ad placements on platforms like Amazon, Flipkart, and more.",
    },
    {
      src: AM3,
      alt: "High-Intent Buyers illustration",
      title: "High-Intent Buyers",
      description:
        "Attract customers who are ready to buy, using targeted campaigns to focus on high-conversion keywords and ads aimed at active shoppers.",
    },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        getApiUrl("api/advertising/submit"),
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
      <Helmet>
        <title>E-commerce Advertising & Marketing Services | 99Digicom</title>
        <meta
          name="description"
          content="Boost your product visibility on Amazon, Flipkart & more with our performance marketing services. Get started with campaign setup from ₹4,999. Drive more sales today!"
        />
        <meta
          name="keywords"
          content="e-commerce advertising, amazon marketing, flipkart advertising, product marketing, digital marketing, performance marketing"
        />
        <link
          rel="canonical"
          href="https://99digicom.com/services/advertising_marketing"
        />
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "Service",
              "name": "E-commerce Advertising Services",
              "provider": {
                "@type": "Organization",
                "name": "99digicom"
              },
              "description": "Performance marketing services for e-commerce platforms including Amazon, Flipkart, and more",
              "offers": {
                "@type": "Offer",
                "price": "4999",
                "priceCurrency": "INR"
              }
            }
          `}
        </script>
      </Helmet>
      <main className="min-h-screen bg-gradient-to-br from-green-50 to-white">
        {/* Hero Section */}
        <section aria-labelledby="hero-heading" className="pt-24 pb-16 px-4">
          <div className="max-w-7xl mx-auto text-center">
            <div
              className="inline-flex items-center space-x-2 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium mb-6"
              role="text"
            >
              <Megaphone className="h-4 w-4" aria-hidden="true" />
              <span>Advertising & Marketing</span>
            </div>
            <h1
              id="hero-heading"
              className="text-5xl font-bold text-gray-900 mb-6 flex flex-col items-center justify-center"
            >
              <span className="flex items-center flex-wrap justify-center">
                <span className="text-green-600 mr-2">Grow</span> Your Online Store with
              </span>
              <div className="mt-4">
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
              Maximise your reach with performance marketing tailored for e-commerce success.
            </p>
            <button
              onClick={handleGetStarted}
              className="inline-flex items-center px-8 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors flex items-center space-x-2"
              aria-label="Launch your campaign starting at ₹4,999"
            >
              <span>Get Started</span>
              <ArrowRight className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </section>
        <style jsx>{`
          @keyframes fadeIn {
            0% { opacity: 0; transform: translateY(10px); }
            100% { opacity: 1; transform: translateY(0); }
          }
          .animate-fadeIn {
            animation: fadeIn 0.5s ease-in-out;
          }
        `}</style>
        {/* What's Included - Marketplaces Section */}
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
                Choose from our wide range of marketplace integrations for tailored advertising services
              </p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Left Column - E-commerce Platforms */}
              <div className="lg:col-span-2 bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <ShoppingCart className="h-5 w-5 mr-2 text-green-600" />
                  E-commerce
                </h3>
                <div className="space-y-2">
                  {ecommerceMarketplaces.map(({ key, name, logo }) => (
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
              {/* Center Column - Content */}
              <div className="lg:col-span-8 bg-white rounded-lg shadow-md overflow-hidden">
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
                      {marketplaces[activeMarketplace].services.map((service, index) => (
                        <div
                          key={index}
                          className="flex items-center space-x-3 p-4 rounded-lg bg-gray-50 hover:bg-green-50 transition-colors"
                        >
                          <CheckCircle className="h-6 w-6 text-green-600" />
                          <span className="text-gray-700 text-lg">{service}</span>
                        </div>
                      ))}
                    </div>
                    <div className="mt-8 flex justify-center">
                      <button
                        onClick={() => navigate(marketplaces[activeMarketplace].href)}
                        className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2 text-lg font-medium"
                      >
                        <span>Learn more about {marketplaces[activeMarketplace].name}</span>
                        <ArrowRight className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
              {/* Right Column - Quick Commerce Platforms */}
              <div className="lg:col-span-2 bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <Megaphone className="h-5 w-5 mr-2 text-green-600" />
                  Quick Commerce
                </h3>
                <div className="space-y-2">
                  {quickCommerceMarketplaces.map(({ key, name, logo }) => (
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
          </div>
        </section>
        {/* What's Included Section */}
        <section className="py-16 px-4 bg-white" aria-labelledby="whats-included-heading">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 id="whats-included-heading" className="text-3xl font-bold text-green-700 mb-4">
                What's Included
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Advertising & Marketing Services help sellers grow their presence, attract customers, and increase sales through targeted marketing efforts.
              </p>
            </div>
            <div className="max-w-4xl mx-auto grid gap-8 md:grid-cols-2">
              <div className="bg-green-50 border-l-4 border-green-500 rounded-xl shadow-sm p-6 flex flex-col h-full">
                <div className="flex items-center mb-3">
                  <BarChart3 className="h-7 w-7 text-green-600 mr-3 flex-shrink-0" />
                  <span className="font-semibold text-lg text-gray-900">
                    Paid Advertising Campaigns
                  </span>
                </div>
                <ul className="list-disc ml-7 text-gray-700 space-y-1 text-base">
                  <li>Setting up and managing PPC campaigns on platforms like Amazon Ads, Flipkart Ads, and Google Ads.</li>
                  <li>Performance-driven campaigns with ROI tracking (e.g., Sponsored Products, Brand Ads).</li>
                </ul>
              </div>
              <div className="bg-green-50 border-l-4 border-green-500 rounded-xl shadow-sm p-6 flex flex-col h-full">
                <div className="flex items-center mb-3">
                  <Users className="h-7 w-7 text-green-600 mr-3 flex-shrink-0" />
                  <span className="font-semibold text-lg text-gray-900">
                    Social Media Marketing & Influencer Collaborations
                  </span>
                </div>
                <ul className="list-disc ml-7 text-gray-700 space-y-1 text-base">
                  <li>Creating promotional content for social media (Instagram, Facebook, Twitter, etc.).</li>
                  <li>Collaborating with influencers to drive brand awareness and customer acquisition.</li>
                  <li>Running seasonal social media campaigns (e.g., festive promotions).</li>
                </ul>
              </div>
              <div className="bg-green-50 border-l-4 border-green-500 rounded-xl shadow-sm p-6 flex flex-col h-full">
                <div className="flex items-center mb-3">
                  <Star className="h-7 w-7 text-green-600 mr-3 flex-shrink-0" />
                  <span className="font-semibold text-lg text-gray-900">
                    A+ Content & Brand Store Management
                  </span>
                </div>
                <ul className="list-disc ml-7 text-gray-700 space-y-1 text-base">
                  <li>Creating enhanced brand content (A+ Content) to improve product listings and conversions on Amazon and Flipkart.</li>
                  <li>Optimizing brand stores with better visuals and stories to attract more customers.</li>
                </ul>
              </div>
              <div className="bg-green-50 border-l-4 border-green-500 rounded-xl shadow-sm p-6 flex flex-col h-full">
                <div className="flex items-center mb-3">
                  <ShoppingCart className="h-7 w-7 text-green-600 mr-3 flex-shrink-0" />
                  <span className="font-semibold text-lg text-gray-900">
                    Promotions & Discounts Management
                  </span>
                </div>
                <ul className="list-disc ml-7 text-gray-700 space-y-1 text-base">
                  <li>Running platform-specific promotions (discounts, coupons, flash sales).</li>
                  <li>Managing bundle offers and special deals to increase cart value.</li>
                </ul>
              </div>
              <div className="bg-green-50 border-l-4 border-green-500 rounded-xl shadow-sm p-6 flex flex-col h-full">
                <div className="flex items-center mb-3">
                  <ArrowRight className="h-7 w-7 text-green-600 mr-3 flex-shrink-0" />
                  <span className="font-semibold text-lg text-gray-900">
                    Market Expansion Support
                  </span>
                </div>
                <ul className="list-disc ml-7 text-gray-700 space-y-1 text-base">
                  <li>Guidance on expanding to other platforms or international markets.</li>
                  <li>Multi-platform strategy planning for higher visibility and sales.</li>
                </ul>
              </div>
              <div className="bg-green-50 border-l-4 border-green-500 rounded-xl shadow-sm p-6 flex flex-col h-full">
                <div className="flex items-center mb-3">
                  <CheckCircle className="h-7 w-7 text-green-600 mr-3 flex-shrink-0" />
                  <span className="font-semibold text-lg text-gray-900">
                    Review Management & Reputation Building
                  </span>
                </div>
                <ul className="list-disc ml-7 text-gray-700 space-y-1 text-base">
                  <li>Monitoring and responding to reviews.</li>
                  <li>Encouraging positive reviews through customer engagement campaigns</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
        {/* Why Advertising Matters */}
        <section
          aria-labelledby="why-advertising-heading"
          className="py-16 px-4 bg-white"
        >
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2
                id="why-advertising-heading"
                className="text-3xl font-bold text-gray-900 mb-4"
              >
                Why Advertising is a Must
              </h2>
              <p className="text-lg text-gray-600 max-w-4xl mx-auto">
                In today's competitive e-commerce landscape, visibility is key
                to driving sales. If your product isn't visible, it's likely to
                be overlooked. Optimised advertising ensures you stand out in
                crowded marketplaces.
              </p>
            </div>
            <ImageSlider slides={steps} />
          </div>
        </section>
        {/* Campaign Setup Includes */}
        <section aria-labelledby="campaign-setup-heading" className="py-16 px-4 bg-green-50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 id="campaign-setup-heading" className="text-3xl font-bold text-gray-900 mb-4">
                What You Get with Campaign Setup
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Our advertising services are designed to deliver results from day one, helping you scale faster and maximise your return on investment (ROI).
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  icon: Search,
                  title: "Keyword Research & Campaign Setup",
                  description: "We identify high-converting keywords and launch structured PPC campaigns across multiple platforms to drive traffic and sales.",
                },
                {
                  icon: BarChart3,
                  title: "Daily Bid & Budget Optimisation",
                  description: "We continuously adjust bids and budgets to maximise ROI while keeping your Advertising Cost of Sale (ACoS) under control.",
                },
                {
                  icon: Star,
                  title: "Negative Keyword Management",
                  description: "We eliminate underperforming search terms, reducing wasted ad spend and improving campaign efficiency.",
                },
                {
                  icon: Users,
                  title: "ASIN & Category Targeting",
                  description: "By targeting competitor products and relevant categories, we enhance product visibility and capture more targeted traffic.",
                },
                {
                  icon: Camera,
                  title: "Product Listing Creation & Optimisation",
                  description: "We craft SEO-friendly titles, bullet points, and descriptions with carefully researched keywords to boost organic visibility and improve conversion rates.",
                },
                {
                  icon: ShoppingCart,
                  title: "Inventory & Order Management",
                  description: "We help manage stock levels to prevent out-of-stock situations and ensure timely order processing for a seamless customer experience.",
                },
                {
                  icon: Search,
                  title: "Amazon SEO & Keyword Ranking",
                  description: "We optimise backend search terms and regularly update keywords to enhance organic rankings and increase product traffic.",
                },
                {
                  icon: Users,
                  title: "Customer Support & Feedback Handling",
                  description: "Our team helps you respond to buyer inquiries, resolve issues, manage returns, and improve seller ratings by addressing negative feedback effectively.",
                },
                {
                  icon: CheckCircle,
                  title: "Account Health & Policy Compliance",
                  description: "We ensure your account remains in good standing by monitoring metrics, resolving performance notifications, and keeping you compliant with Amazon's policies to avoid suspension.",
                },
              ].map((service, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 p-6 group"
                >
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="p-2 bg-green-100 rounded-lg group-hover:bg-green-200 transition-colors">
                      <service.icon className="h-6 w-6 text-green-600" />
                    </div>
                    <h3 className="font-semibold text-gray-900">{service.title}</h3>
                  </div>
                  <p className="text-gray-600 text-sm">{service.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        {/* Success Story */}
        <section
          aria-labelledby="success-story-heading"
          className="py-16 px-4 bg-white"
        >
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2
                id="success-story-heading"
                className="text-3xl font-bold text-gray-900 mb-4"
              >
                Success Story
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                How We Helped a Home Decor Brand Increase Sales by 180% in 3
                Months
              </p>
            </div>
            <div className="bg-green-50 rounded-lg p-8">
              <p className="text-gray-700 mb-6">
                We partnered with a home decor brand to enhance its product
                visibility through targeted Amazon Sponsored Ads and Flipkart PLA
                campaigns. By optimising product listings and running
                seasonal promotions, we helped the brand achieve:
              </p>
              <ul className="space-y-4 mb-6">
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-3" />
                  <span>180% sales increase in 3 months</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-3" />
                  <span>3x Return on Ad Spend (ROAS)</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-3" />
                  <span>
                    Enhanced product positioning through strategic keyword
                    targeting
                  </span>
                </li>
              </ul>
              <p className="text-gray-700">
                Our approach helped the brand grow rapidly by boosting
                visibility on key platforms, leading to increased customer
                engagement and sales.
              </p>
            </div>
          </div>
        </section>
        {/* FAQs with Expandable Sections */}
        <section className="py-16 px-4 bg-green-50">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">FAQs</h2>
            <div className="space-y-4">
              {[
                {
                  question: "What is PPC Advertising?",
                  answer: "Pay-Per-Click (PPC) advertising involves paying for ad placements that appear in search results or on e-commerce sites. You only pay when a user clicks on the ad, which helps you control costs while driving relevant traffic.",
                },
                {
                  question: "How do you optimise my product listings?",
                  answer: "We research the best keywords, optimise your product titles, bullet points, and descriptions, and ensure your listings are fully optimised for both Amazon's algorithm and customer searches.",
                },
                {
                  question: "How do I track the success of my campaigns?",
                  answer: "We provide detailed performance reports, including key metrics like click-through rates (CTR), conversion rates, and return on ad spend (ROAS), along with actionable insights.",
                },
              ].map((faq, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <button
                    onClick={() => {
                      const element = document.getElementById(`faq-${index}`);
                      element.classList.toggle('h-0');
                      element.classList.toggle('h-auto');
                      element.classList.toggle('py-4');
                    }}
                    className="w-full px-6 py-4 text-left bg-white hover:bg-gray-50 flex items-center justify-between"
                  >
                    <span className="font-semibold text-gray-900">{faq.question}</span>
                    <Plus className="h-5 w-5 text-green-600 transform transition-transform" />
                  </button>
                  <div
                    id={`faq-${index}`}
                    className="h-0 overflow-hidden transition-all duration-300"
                  >
                    <p className="px-6 text-gray-600">{faq.answer}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}