"use client";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
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
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [currentLogoIndex, setCurrentLogoIndex] = useState(0);
  const [activeMarketplace, setActiveMarketplace] = useState("amazon");

  const logos = [
    { src: amazonLogo, alt: t('home.logos.amazon.alt') },
    { src: flipkartLogo, alt: t('home.logos.flipkart.alt') },
    { src: snapdealLogo, alt: t('home.logos.snapdeal.alt') },
    { src: jiomartLogo, alt: t('home.logos.jiomart.alt') },
    { src: meeshoLogo, alt: t('home.logos.meesho.alt') },
    { src: bigbasketLogo, alt: t('home.logos.bigbasket.alt') },
  ];

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": t('advertisingMarketing.seo.title'),
    "description": t('advertisingMarketing.seo.description'),
    "provider": { "@type": "Organization", "name": "99digicom" },
    "serviceType": t('advertisingMarketing.seo.title'),
    "url": "https://99digicom.com/services/advertising_marketing"
  };

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

  // Use translated marketplaces/services
  const marketplaces = {
    amazon: {
      name: "Amazon",
      logo: amazonLogo,
      href: "/partners/marketplaces/amazon",
      services: t('advertisingMarketing.whatsIncluded.services', { returnObjects: true }),
      category: "ecommerce"
    },
    flipkart: {
      name: "Flipkart",
      logo: flipkartLogo,
      href: "/partners/marketplaces/flipkart",
      services: t('advertisingMarketing.whatsIncluded.services', { returnObjects: true }),
      category: "ecommerce"
    },
    meesho: {
      name: "Meesho",
      logo: meeshoLogo,
      href: "/partners/marketplaces/meesho",
      services: t('advertisingMarketing.whatsIncluded.services', { returnObjects: true }),
      category: "ecommerce"
    },
    snapdeal: {
      name: "Snapdeal",
      logo: snapdealLogo,
      href: "/partners/marketplaces/snapdeal",
      services: t('advertisingMarketing.whatsIncluded.services', { returnObjects: true }),
      category: "ecommerce"
    },
    jiomart: {
      name: "JioMart",
      logo: jiomartLogo,
      href: "/partners/marketplaces/jiomart",
      services: t('advertisingMarketing.whatsIncluded.services', { returnObjects: true }),
      category: "quick-commerce"
    },
    instamart: {
      name: "Instamart",
      logo: instamartLogo,
      href: "/partners/marketplaces/instamart",
      services: t('advertisingMarketing.whatsIncluded.services', { returnObjects: true }),
      category: "quick-commerce"
    },
    bigbasket: {
      name: "BigBasket",
      logo: bigbasketLogo,
      href: "/partners/marketplaces/bigbasket",
      services: t('advertisingMarketing.whatsIncluded.services', { returnObjects: true }),
      category: "quick-commerce"
    },
    blinkit: {
      name: "Blinkit",
      logo: blinkitLogo,
      href: "/partners/marketplaces/blinkit",
      services: t('advertisingMarketing.whatsIncluded.services', { returnObjects: true }),
      category: "quick-commerce"
    },
    zepto: {
      name: "Zepto",
      logo: zeptoLogo,
      href: "/partners/marketplaces/zepto",
      services: t('advertisingMarketing.whatsIncluded.services', { returnObjects: true }),
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
      alt: t('advertisingMarketing.whatsIncluded.services.0'),
      title: t('advertisingMarketing.whatsIncluded.services.0'),
      description: t('advertisingMarketing.whatsIncluded.services.0'),
    },
    {
      src: AM2,
      alt: t('advertisingMarketing.whatsIncluded.services.1'),
      title: t('advertisingMarketing.whatsIncluded.services.1'),
      description: t('advertisingMarketing.whatsIncluded.services.1'),
    },
    {
      src: AM3,
      alt: t('advertisingMarketing.whatsIncluded.services.2'),
      title: t('advertisingMarketing.whatsIncluded.services.2'),
      description: t('advertisingMarketing.whatsIncluded.services.2'),
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
        <title>{t('advertisingMarketing.seo.title')}</title>
        <meta name="description" content={t('advertisingMarketing.seo.description')} />
        <meta name="keywords" content={t('advertisingMarketing.seo.keywords')} />
        <link rel="canonical" href="https://99digicom.com/services/advertising_marketing" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="robots" content="noindex, nofollow" />
        <meta name="googlebot" content="noindex, nofollow" />
        <meta property="og:type" content="service" />
        <meta property="og:title" content={t('advertisingMarketing.seo.title')} />
        <meta property="og:description" content={t('advertisingMarketing.seo.description')} />
        <meta property="og:image" content="https://99digicom.com/og-image.jpg" />
        <meta property="og:url" content="https://99digicom.com/services/advertising_marketing" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={t('advertisingMarketing.seo.title')} />
        <meta name="twitter:description" content={t('advertisingMarketing.seo.description')} />
        <meta name="twitter:image" content="https://99digicom.com/og-image.jpg" />
        <script type="application/ld+json">{JSON.stringify(serviceSchema)}</script>
      </Helmet>
      <main className="min-h-screen bg-gradient-to-br from-green-50 to-white">
        {/* Hero Section */}
        <section className="pt-24 pb-16 px-4">
          <div className="max-w-7xl mx-auto text-center">
            <div className="inline-flex items-center space-x-2 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Megaphone className="h-4 w-4" />
              <span>{t('advertisingMarketing.hero.badge')}</span>
            </div>
            <h1 className="text-5xl font-bold text-gray-900 mb-6 flex flex-col items-center justify-center">
              <span className="flex items-center flex-wrap justify-center">
                <span className="text-green-600 mr-2">{t('advertisingMarketing.hero.title')}</span>
              </span>
              <div className="mt-4">
                <img
                  src={logos[currentLogoIndex].src}
                  alt={logos[currentLogoIndex].alt}
                  className="h-12 w-auto object-contain animate-fadeIn"
                  loading="lazy"
                />
              </div>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              {t('advertisingMarketing.hero.subtitle')}
            </p>
            <button
              onClick={handleGetStarted}
              className="inline-flex items-center px-8 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors flex items-center space-x-2"
            >
              <span>{t('advertisingMarketing.hero.getStarted')}</span>
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </section>
        {/* Marketplaces Section */}
        <section className="py-16 px-4 bg-green-50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                {t('advertisingMarketing.marketplaces.heading')}
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-12">
                {t('advertisingMarketing.marketplaces.description')}
              </p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Left Column - E-commerce Platforms */}
              <div className="lg:col-span-2 bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <ShoppingCart className="h-5 w-5 mr-2 text-green-600" />
                  {t('advertisingMarketing.marketplaces.ecommerce')}
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
                          alt={name}
                          className="h-8 w-8 object-contain"
                          loading="lazy"
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
                          alt={marketplaces[activeMarketplace].name}
                          className="h-24 w-auto object-contain max-w-[280px]"
                          loading="lazy"
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
                        <span>{t('advertisingMarketing.marketplaces.learnMore', { name: marketplaces[activeMarketplace].name })}</span>
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
                  {t('advertisingMarketing.marketplaces.quickCommerce')}
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
                          alt={name}
                          className="h-8 w-8 object-contain"
                          loading="lazy"
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
        <section className="py-16 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-green-700 mb-4">
                {t('advertisingMarketing.whatsIncluded.heading')}
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                {t('advertisingMarketing.whatsIncluded.description')}
              </p>
            </div>
            <div className="max-w-4xl mx-auto grid gap-8 md:grid-cols-2">
              {t('advertisingMarketing.whatsIncluded.services', { returnObjects: true }).map((service, idx) => (
                <div key={idx} className="bg-green-50 border-l-4 border-green-500 rounded-xl shadow-sm p-6 flex flex-col h-full">
                  <div className="flex items-center mb-3">
                    <CheckCircle className="h-7 w-7 text-green-600 mr-3 flex-shrink-0" />
                    <span className="font-semibold text-lg text-gray-900">{service}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        {/* Why Advertising Matters */}
        <section className="py-16 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                {t('advertisingMarketing.whyAdvertising.heading')}
              </h2>
              <p className="text-lg text-gray-600 max-w-4xl mx-auto">
                {t('advertisingMarketing.whyAdvertising.description')}
              </p>
            </div>
            <ImageSlider slides={steps} />
          </div>
        </section>
        {/* Campaign Setup Includes */}
        <section className="py-16 px-4 bg-green-50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                {t('advertisingMarketing.campaignSetup.heading')}
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                {t('advertisingMarketing.campaignSetup.description')}
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {t('advertisingMarketing.campaignSetup.services', { returnObjects: true }).map((service, idx) => (
                <div key={idx} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 p-6 group">
                  <div className="flex items-center space-x-3 mb-4">
                    <CheckCircle className="h-6 w-6 text-green-600" />
                    <h3 className="font-semibold text-gray-900">{service}</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        {/* Success Story */}
        <section className="py-16 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                {t('advertisingMarketing.successStory.heading')}
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                {t('advertisingMarketing.successStory.description')}
              </p>
            </div>
            <div className="bg-green-50 rounded-lg p-8">
              <ul className="space-y-4 mb-6">
                {t('advertisingMarketing.successStory.results', { returnObjects: true }).map((result, idx) => (
                  <li key={idx} className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-3" />
                    <span>{result}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
        {/* FAQs with Expandable Sections */}
        <section className="py-16 px-4 bg-green-50">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">FAQs</h2>
            <div className="space-y-4">
              {t('advertisingMarketing.faqs', { returnObjects: true }).map((faq, idx) => (
                <div key={idx} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <button
                    onClick={() => {
                      const element = document.getElementById(`faq-${idx}`);
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
                    id={`faq-${idx}`}
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

// hello