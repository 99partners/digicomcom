import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Store,
  CheckCircle,
  ArrowRight,
  FileText,
  Package,
  Building,
  Shield,
  ShoppingCart,
} from "lucide-react";
import axios from "axios";
import { getApiUrl } from "../config/api.config";
import SEO from "../components/SEO";
import PE1 from "../assets/PE1.png";
import PE2 from "../assets/PE2.png";
import PE3 from "../assets/PE3.png";
import PE4 from "../assets/PE4.png";
import amazonLogo from "../assets/Amazon.png";
import flipkartLogo from "../assets/Flipkart.png";
import ondcLogo from "../assets/ONDC1.png";
import jiomartLogo from "../assets/Jiomart.png";
import meeshoLogo from "../assets/Meesho1.png";
import indiamartLogo from "../assets/Indiamart.png";
import snapdealLogo from "../assets/Snapdeal.png";
import ImageSlider from "../components/ImageSlider";
import instamartLogo from "../assets/Instamart.png";
import bigbasketLogo from "../assets/BigBasket.png";
import blinkitLogo from "../assets/Blinkit.png";
import zeptoLogo from "../assets/Zepto.png";

export default function PlatformEnablement() {
  const navigate = useNavigate();
  const [activeMarketplace, setActiveMarketplace] = useState("amazon");
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

  const isAuthenticated = () => {
    const token =
      localStorage.getItem("authToken") || sessionStorage.getItem("authToken");
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
  }, []);

  // New useEffect to set default marketplace based on category
  useEffect(() => {
    if (activeCategory === "ecommerce") {
      setActiveMarketplace("amazon");
    } else if (activeCategory === "quick-commerce") {
      setActiveMarketplace("jiomart");
    }
  }, [activeCategory]);

  const marketplaces = {
    amazon: {
      name: "Amazon",
      logo: amazonLogo,
      href: "/partners/marketplaces/amazon",
      services: [
        "Account registration & KYC compliance",
        "Product listing optimization for Amazon SEO",
        "Amazon Brand Registry assistance",
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
        "Jiomart seller registration & onboarding",
        "Product catalog listing and categorization",
        "Packaging & delivery integration with Jiomart",
      ],
      category: "quick-commerce",
    },
    meesho: {
      name: "Meesho",
      logo: meeshoLogo,
      href: "/partners/marketplaces/meesho",
      services: [
        "Meesho onboarding process & GST validation",
        "Product photography and listing optimization for Meesho",
        "Meesho catalog expansion (for resellers & brands)",
      ],
      category: "ecommerce",
    },
    snapdeal: {
      name: "Snapdeal",
      logo: snapdealLogo,
      href: "/partners/marketplaces/snapdeal",
      services: [
        "Snapdeal seller registration & product listing",
        "Integration with Snapdeal's payment & shipping systems",
        "Catalog optimization based on Snapdeal policies",
      ],
      category: "ecommerce",
    },
    blinkit: {
      name: "Blinkit",
      logo: blinkitLogo,
      href: "/partners/marketplaces/blinkit",
      services: [
        "Blinkit seller registration & store setup",
        "Product catalog listing (grocery, FMCG products)",
        "Blinkit's delivery zone & logistics integration",
      ],
      category: "quick-commerce",
    },
    instamart: {
      name: "Instamart",
      logo: instamartLogo,
      href: "/partners/marketplaces/instamart",
      services: [
        "Onboarding on Instamart (through partners like Flipkart)",
        "Listing products, pricing, and description optimization",
        "Integration with Instamart's logistics & payment systems",
      ],
      category: "quick-commerce",
    },
    zepto: {
      name: "Zepto",
      logo: zeptoLogo,
      href: "/partners/marketplaces/zepto",
      services: [
        "Zepto seller registration and onboarding support",
        "Product upload with categorization for fast delivery",
        "Integration with Zepto's delivery systems for quick turnaround",
      ],
      category: "quick-commerce",
    },
    bigbasket: {
      name: "BigBasket",
      logo: bigbasketLogo,
      href: "/partners/marketplaces/bigbasket",
      services: [
        "Bigbasket seller registration & platform setup",
        "Grocery product catalog setup (packaging, pricing, bulk uploads)",
        "Integration with Bigbasket's payment and logistics systems",
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
    {
      src: PE1,
      alt: "Hassle-Free Setup Process illustration",
      title: "Hassle-Free Setup Process",
      description: "Seamless onboarding on top platforms.",
    },
    {
      src: PE2,
      alt: "Quick Turnaround illustration",
      title: "Quick Turnaround",
      description: "Get live in 3–5 days.",
    },
    {
      src: PE3,
      alt: "Expert Support illustration",
      title: "Expert Support",
      description: "Guidance for documentation and approvals.",
    },
    {
      src: PE4,
      alt: "Avoid Mistakes illustration",
      title: "Avoid Mistakes",
      description: "Prevent common seller errors.",
    },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        getApiUrl("api/platform-enable/submit"),
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

  const handlePrev = () => {
    setCurrentStep((prev) => (prev > 0 ? prev - 1 : 3));
  };

  const handleNext = () => {
    setCurrentStep((prev) => (prev < 3 ? prev + 1 : 0));
  };

  return (
    <>
      <SEO
        title="Launch Your Online Store - Marketplace Setup Services | 99Digicom"
        description="Get expert help to launch your online store on Amazon, Flipkart & more marketplaces. Start selling online with hassle-free setup and support from 99Digicom."
        keywords="launch online store, seller account setup, amazon seller, flipkart seller, online store setup, e-commerce launch, marketplace integration"
        canonicalUrl="https://99digicom.com/services/launch"
      />
      <main className="min-h-screen bg-gradient-to-br from-green-50 to-white">
        {/* Hero Section */}
        <section className="pt-24 pb-16 px-4" aria-labelledby="hero-heading">
          <div className="max-w-7xl mx-auto text-center">
            <div className="inline-flex items-center space-x-2 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Store className="h-4 w-4" aria-hidden="true" />
              <span>Seller Account Setup</span>
            </div>
            <h1
              id="hero-heading"
              className="text-5xl font-bold text-gray-900 mb-6 flex flex-col items-center justify-center"
            >
              <span className="flex items-center flex-wrap justify-center">
                <span className="text-green-600 mr-2">Launch</span> Your Online
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
              Start your e-commerce journey with our expert platform enablement
              services.
            </p>
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
                Choose from our wide range of marketplace integrations for
                tailored store setup services
              </p>
            </div>

            {/* Three-column layout */}
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
                          navigate(marketplaces[activeMarketplace].href)
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

              {/* Right Column - Quick Commerce Platforms */}
              <div className="lg:col-span-2 bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <Package className="h-5 w-5 mr-2 text-green-600" />
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
        <section
          className="py-16 px-4 bg-white"
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
                Registration & Platform Enablement Services help new sellers get
                set up and ready to sell across multiple marketplaces.
              </p>
            </div>
            <div className="max-w-4xl mx-auto grid gap-8 md:grid-cols-2">
              <div className="bg-green-50 border-l-4 border-green-500 rounded-xl shadow-sm p-6 flex flex-col h-full">
                <div className="flex items-center mb-3">
                  <FileText className="h-7 w-7 text-green-600 mr-3 flex-shrink-0" />
                  <span className="font-semibold text-lg text-gray-900">
                    Account Registration & Onboarding
                  </span>
                </div>
                <ul className="list-disc ml-7 text-gray-700 space-y-1 text-base">
                  <li>
                    Create and register seller accounts across multiple
                    platforms (Amazon, Flipkart, Jiomart, Meesho, etc.)
                  </li>
                  <li>
                    Help with KYC and compliance documentation (GST, PAN, bank
                    details).
                  </li>
                  <li>Platform-specific tax and payment setup.</li>
                </ul>
              </div>
              <div className="bg-green-50 border-l-4 border-green-500 rounded-xl shadow-sm p-6 flex flex-col h-full">
                <div className="flex items-center mb-3">
                  <Package className="h-7 w-7 text-green-600 mr-3 flex-shrink-0" />
                  <span className="font-semibold text-lg text-gray-900">
                    Product Catalog Setup
                  </span>
                </div>
                <ul className="list-disc ml-7 text-gray-700 space-y-1 text-base">
                  <li>Bulk product listing upload (CSV/Excel templates)</li>
                  <li>
                    Optimizing product titles, descriptions, and images for
                    better visibility.
                  </li>
                  <li>
                    Creating categories and adding variations (size, color,
                    etc.).
                  </li>
                </ul>
              </div>
              <div className="bg-green-50 border-l-4 border-green-500 rounded-xl shadow-sm p-6 flex flex-col h-full">
                <div className="flex items-center mb-3">
                  <Store className="h-7 w-7 text-green-600 mr-3 flex-shrink-0" />
                  <span className="font-semibold text-lg text-gray-900">
                    Brand Store Creation
                  </span>
                </div>
                <ul className="list-disc ml-7 text-gray-700 space-y-1 text-base">
                  <li>
                    Setting up your branded storefront on platforms like Amazon
                    and Flipkart.
                  </li>
                  <li>
                    Uploading brand story, banners, and images to make your
                    store attractive.
                  </li>
                </ul>
              </div>
              <div className="bg-green-50 border-l-4 border-green-500 rounded-xl shadow-sm p-6 flex flex-col h-full">
                <div className="flex items-center mb-3">
                  <Building className="h-7 w-7 text-green-600 mr-3 flex-shrink-0" />
                  <span className="font-semibold text-lg text-gray-900">
                    Platform-Specific Integration
                  </span>
                </div>
                <ul className="list-disc ml-7 text-gray-700 space-y-1 text-base">
                  <li>
                    Connecting your account with required third-party tools
                    (e.g., logistics, payment systems).
                  </li>
                  <li>
                    Product and inventory syncing with platform APIs (e.g.,
                    Amazon Seller Central, Flipkart Seller Hub).
                  </li>
                </ul>
              </div>
              <div className="bg-green-50 border-l-4 border-green-500 rounded-xl shadow-sm p-6 flex flex-col h-full">
                <div className="flex items-center mb-3">
                  <Shield className="h-7 w-7 text-green-600 mr-3 flex-shrink-0" />
                  <span className="font-semibold text-lg text-gray-900">
                    Listing Optimization
                  </span>
                </div>
                <ul className="list-disc ml-7 text-gray-700 space-y-1 text-base">
                  <li>
                    SEO-focused product descriptions to improve search
                    visibility.
                  </li>
                  <li>Image and content alignment with platform guidelines.</li>
                </ul>
              </div>
              <div className="bg-green-50 border-l-4 border-green-500 rounded-xl shadow-sm p-6 flex flex-col h-full">
                <div className="flex items-center mb-3">
                  <CheckCircle className="h-7 w-7 text-green-600 mr-3 flex-shrink-0" />
                  <span className="font-semibold text-lg text-gray-900">
                    Go-Live Support
                  </span>
                </div>
                <ul className="list-disc ml-7 text-gray-700 space-y-1 text-base">
                  <li>Step-by-step assistance to go live on marketplaces.</li>
                  <li>
                    Final checks to ensure everything is working (products,
                    pricing, stock levels)
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section
          className="py-16 px-4 bg-white"
          aria-labelledby="why-choose-heading"
        >
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2
                id="why-choose-heading"
                className="text-3xl font-bold text-gray-900 mb-4"
              >
                Why Choose 99digicom for Account Setup?
              </h2>
              <p className="text-lg text-gray-600 max-w-4xl mx-auto">
                Start selling online quickly and confidently with our expert
                support.
              </p>
            </div>
            <ImageSlider slides={steps} />
          </div>
        </section>

        {/* Client Testimonials */}
        <section
          className="py-16 px-4 bg-green-50"
          aria-labelledby="testimonials-heading"
        >
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2
                id="testimonials-heading"
                className="text-3xl font-bold text-gray-900 mb-4"
              >
                Client Testimonials
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Hear from small business owners who launched successfully with
                us.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-6" role="list">
              {[
                {
                  quote:
                    "99digicom made our Amazon store setup a breeze. We were live in just 4 days!",
                  author: "Priya S.",
                  company: "EcoTrendy Crafts",
                },
                {
                  quote:
                    "Their team handled all our documentation and approvals, saving us weeks of hassle.",
                  author: "Rajesh K.",
                  company: "HomeVibe Decor",
                },
              ].map((testimonial, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg shadow-lg p-6"
                  role="listitem"
                >
                  <blockquote>
                    <p className="text-gray-600 italic">{testimonial.quote}</p>
                    <footer className="text-gray-900 font-semibold mt-4">
                      - {testimonial.author}, {testimonial.company}
                    </footer>
                  </blockquote>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
