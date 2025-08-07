"use client";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  Settings,
  ArrowRight,
  Search,
  BarChart3,
  Headphones,
  PieChart,
  CheckCircle,
  ShoppingCart,
} from "lucide-react";
import axios from "axios";
import { getApiUrl } from "../config/api.config";
import SEO from "../components/SEO";
import ImageSlider from "../components/ImageSlider";
import AMS1 from "../assets/AMS1.png";
import AMS2 from "../assets/AMS2.png";
import AMS3 from "../assets/AMS3.png";
import AMS4 from "../assets/AMS4.png";
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
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [currentLogoIndex, setCurrentLogoIndex] = useState(0);
  const [activeMarketplace, setActiveMarketplace] = useState("amazon");
  
  // Define the logos array
  const logos = [
    { src: amazonLogo, alt: "Amazon logo" },
    { src: flipkartLogo, alt: "Flipkart logo" },
    { src: snapdealLogo, alt: "Snapdeal logo" },
    { src: jiomartLogo, alt: "JioMart logo" },
    { src: meeshoLogo, alt: "Meesho logo" },
    { src: bigbasketLogo, alt: "BigBasket logo" },
  ];

  const isAuthenticated = () => {
    const token = localStorage.getItem("authToken") || sessionStorage.getItem("authToken");
    return !!token;
  };

  const handleGetStarted = () => {
    if (isAuthenticated()) {
      navigate("/dashboard");
    } else {
      navigate("/partnerlogin");
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    const interval = setInterval(() => {
      setCurrentLogoIndex((prevIndex) => (prevIndex + 1) % logos.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [logos.length]);

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

  const marketplaces = {
    amazon: {
      name: t("ams.marketplaces.ecommerceAmazon"),
      logo: amazonLogo,
      href: "/partners/marketplaces/amazon",
      services: t("ams.marketplaces.amazon.services", { returnObjects: true }),
      category: "ecommerce",
    },
    flipkart: {
      name: t("ams.marketplaces.ecommerceFlipkart"),
      logo: flipkartLogo,
      href: "/partners/marketplaces/flipkart",
      services: t("ams.marketplaces.flipkart.services", { returnObjects: true }),
      category: "ecommerce",
    },
    jiomart: {
      name: t("ams.marketplaces.quickCommerceJiomart"),
      logo: jiomartLogo,
      href: "/partners/marketplaces/jiomart",
      services: t("ams.marketplaces.jiomart.services", { returnObjects: true }),
      category: "quick-commerce",
    },
    meesho: {
      name: t("ams.marketplaces.ecommerceMeesho"),
      logo: meeshoLogo,
      href: "/partners/marketplaces/meesho",
      services: t("ams.marketplaces.meesho.services", { returnObjects: true }),
      category: "ecommerce",
    },
    snapdeal: {
      name: t("ams.marketplaces.ecommerceSnapdeal"),
      logo: snapdealLogo,
      href: "/partners/marketplaces/snapdeal",
      services: t("ams.marketplaces.snapdeal.services", { returnObjects: true }),
      category: "ecommerce",
    },
    instamart: {
      name: t("ams.marketplaces.quickCommerceInstamart"),
      logo: instamartLogo,
      href: "/partners/marketplaces/instamart",
      services: t("ams.marketplaces.instamart.services", { returnObjects: true }),
      category: "quick-commerce",
    },
    bigbasket: {
      name: t("ams.marketplaces.quickCommerceBigbasket"),
      logo: bigbasketLogo,
      href: "/partners/marketplaces/bigbasket",
      services: t("ams.marketplaces.bigbasket.services", { returnObjects: true }),
      category: "quick-commerce",
    },
    blinkit: {
      name: t("ams.marketplaces.quickCommerceBlinkit"),
      logo: blinkitLogo,
      href: "/partners/marketplaces/blinkit",
      services: t("ams.marketplaces.blinkit.services", { returnObjects: true }),
      category: "quick-commerce",
    },
    zepto: {
      name: t("ams.marketplaces.quickCommerceZepto"),
      logo: zeptoLogo,
      href: "/partners/marketplaces/zepto",
      services: t("ams.marketplaces.zepto.services", { returnObjects: true }),
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
      alt: "Hassle-Free Management illustration",
      title: "Hassle-Free Management",
      description: "Effortless order and inventory management.",
    },
    {
      src: AMS2,
      alt: "Timely Updates illustration",
      title: "Timely Updates",
      description: "Keep your product listings fresh and competitive.",
    },
    {
      src: AMS3,
      alt: "Performance-Driven Support illustration",
      title: "Performance-Driven Support",
      description: "Data-backed strategies to boost sales.",
    },
    {
      src: AMS4,
      alt: "Dedicated Coordination illustration",
      title: "Dedicated Coordination",
      description: "Stay connected via WhatsApp for real-time updates.",
    },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(getApiUrl("api/ams/submit"), formData);
      const data = await response.data;
      if (data.success) {
        alert("Thank you for your submission! Our team will contact you shortly.");
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
        title={t('ams.seo.title')}
        description={t('ams.seo.description')}
        keywords={t('ams.seo.keywords')}
        canonicalUrl="https://99digicom.com/services/ams"
      />
      <main className="min-h-screen bg-gradient-to-br from-green-50 to-white">
        {/* Hero Section */}
        <section className="pt-24 pb-16 px-4" aria-labelledby="hero-heading">
          <div className="max-w-7xl mx-auto text-center">
            <div className="inline-flex items-center space-x-2 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Settings className="h-4 w-4" aria-hidden="true" />
              <span>{t('ams.hero.badge')}</span>
            </div>
            <h1
              id="hero-heading"
              className="text-5xl font-bold text-gray-900 mb-6 flex flex-col items-center justify-center"
            >
              <span className="flex items-center flex-wrap justify-center">
                <span className="text-green-600 mr-2">{t('ams.hero.title1')}</span> {t('ams.hero.title2')}
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
              {t('ams.hero.subtitle')}
            </p>
            <button
              onClick={handleGetStarted}
              className="inline-flex items-center px-8 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors flex items-center space-x-2"
              aria-label={t('ams.hero.getStartedAriaLabel')}
            >
              <span>{t('ams.hero.getStarted')}</span>
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
        {/* Marketplace Panel Section */}
        <section className="py-16 px-4 bg-green-50" aria-labelledby="marketplaces-heading">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 id="marketplaces-heading" className="text-3xl font-bold text-gray-900 mb-4">
                {t('ams.marketplaces.heading')}
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-12">
                {t('ams.marketplaces.description')}
              </p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Left Column - E-commerce Platforms */}
              <div className="lg:col-span-2 bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <ShoppingCart className="h-5 w-5 mr-2 text-green-600" />
                  {t('ams.marketplaces.ecommerce')}
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
                  <PieChart className="h-5 w-5 mr-2 text-green-600" />
                  {t('ams.marketplaces.quickCommerce')}
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
        {/* Services Included */}
        <section className="py-16 px-4 bg-green-50" aria-labelledby="whats-included-heading">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 id="whats-included-heading" className="text-3xl font-bold text-green-700 mb-4">
                {t('ams.whatsIncluded.heading')}
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                {t('ams.whatsIncluded.description')}
              </p>
            </div>
            <div className="max-w-4xl mx-auto grid gap-8 md:grid-cols-2">
              <div className="bg-white border-l-4 border-green-500 rounded-xl shadow-sm p-6 flex flex-col h-full">
                <div className="flex items-center mb-3">
                  <Settings className="h-7 w-7 text-green-600 mr-3 flex-shrink-0" />
                  <span className="font-semibold text-lg text-gray-900">{t('ams.whatsIncluded.services.productListing.title')}</span>
                </div>
                <ul className="list-disc ml-7 text-gray-700 space-y-1 text-base">
                  {t('ams.whatsIncluded.services.productListing.items', { returnObjects: true }).map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
              <div className="bg-white border-l-4 border-green-500 rounded-xl shadow-sm p-6 flex flex-col h-full">
                <div className="flex items-center mb-3">
                  <ShoppingCart className="h-7 w-7 text-green-600 mr-3 flex-shrink-0" />
                  <span className="font-semibold text-lg text-gray-900">{t('ams.whatsIncluded.services.inventoryManagement.title')}</span>
                </div>
                <ul className="list-disc ml-7 text-gray-700 space-y-1 text-base">
                  {t('ams.whatsIncluded.services.inventoryManagement.items', { returnObjects: true }).map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
              <div className="bg-white border-l-4 border-green-500 rounded-xl shadow-sm p-6 flex flex-col h-full">
                <div className="flex items-center mb-3">
                  <BarChart3 className="h-7 w-7 text-green-600 mr-3 flex-shrink-0" />
                  <span className="font-semibold text-lg text-gray-900">{t('ams.whatsIncluded.services.orderProcessing.title')}</span>
                </div>
                <ul className="list-disc ml-7 text-gray-700 space-y-1 text-base">
                  {t('ams.whatsIncluded.services.orderProcessing.items', { returnObjects: true }).map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
              <div className="bg-white border-l-4 border-green-500 rounded-xl shadow-sm p-6 flex flex-col h-full">
                <div className="flex items-center mb-3">
                  <Headphones className="h-7 w-7 text-green-600 mr-3 flex-shrink-0" />
                  <span className="font-semibold text-lg text-gray-900">{t('ams.whatsIncluded.services.customerService.title')}</span>
                </div>
                <ul className="list-disc ml-7 text-gray-700 space-y-1 text-base">
                  {t('ams.whatsIncluded.services.customerService.items', { returnObjects: true }).map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
              <div className="bg-white border-l-4 border-green-500 rounded-xl shadow-sm p-6 flex flex-col h-full">
                <div className="flex items-center mb-3">
                  <PieChart className="h-7 w-7 text-green-600 mr-3 flex-shrink-0" />
                  <span className="font-semibold text-lg text-gray-900">{t('ams.whatsIncluded.services.performanceMonitoring.title')}</span>
                </div>
                <ul className="list-disc ml-7 text-gray-700 space-y-1 text-base">
                  {t('ams.whatsIncluded.services.performanceMonitoring.items', { returnObjects: true }).map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
              <div className="bg-white border-l-4 border-green-500 rounded-xl shadow-sm p-6 flex flex-col h-full">
                <div className="flex items-center mb-3">
                  <CheckCircle className="h-7 w-7 text-green-600 mr-3 flex-shrink-0" />
                  <span className="font-semibold text-lg text-gray-900">{t('ams.whatsIncluded.services.compliance.title')}</span>
                </div>
                <ul className="list-disc ml-7 text-gray-700 space-y-1 text-base">
                  {t('ams.whatsIncluded.services.compliance.items', { returnObjects: true }).map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
        {/* Key Benefits */}
        <section className="py-16 px-4 bg-white" aria-labelledby="benefits-heading">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 id="benefits-heading" className="text-3xl font-bold text-gray-900 mb-4">
                {t('ams.benefits.heading')}
              </h2>
              <p className="text-lg text-gray-600 max-w-4xl mx-auto">
                {t('ams.benefits.description')}
              </p>
            </div>
            <ImageSlider slides={steps} />
          </div>
        </section>
        {/* Success Story */}
        <section className="py-16 px-4 bg-white" aria-labelledby="success-heading">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 id="success-heading" className="text-3xl font-bold text-gray-900 mb-4">
                {t('ams.successStory.heading')}
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                {t('ams.successStory.description')}
              </p>
            </div>
            <div className="bg-green-50 rounded-lg p-6">
              <blockquote>
                <p className="text-gray-600">
                  {t('ams.successStory.quote')}
                </p>
              </blockquote>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}