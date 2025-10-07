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
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet";

export default function PlatformEnablement() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [activeMarketplace, setActiveMarketplace] = useState("amazon");
  const [currentLogoIndex, setCurrentLogoIndex] = useState(0);
  const [activeCategory, setActiveCategory] = useState("ecommerce");
  const logos = [
    { src: amazonLogo, alt: t("platformEnablement.marketplaces.ecommerce.services.amazon.name") },
    { src: flipkartLogo, alt: t("platformEnablement.marketplaces.ecommerce.services.flipkart.name") },
    { src: snapdealLogo, alt: t("platformEnablement.marketplaces.ecommerce.services.snapdeal.name") },
    { src: jiomartLogo, alt: t("platformEnablement.marketplaces.quickCommerce.services.jiomart.name") },
    { src: meeshoLogo, alt: t("platformEnablement.marketplaces.ecommerce.services.meesho.name") },
    { src: bigbasketLogo, alt: t("platformEnablement.marketplaces.quickCommerce.services.bigbasket.name") },
  ];

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": t("platformEnablement.seo.title"),
    "description": t("platformEnablement.seo.description"),
    "provider": {
      "@type": "Organization",
      "name": "99digicom"
    },
    "serviceType": t("platformEnablement.seo.title"),
    "url": "https://99digicom.com/services/launch",
    "areaServed": "IN"
  };

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

  useEffect(() => {
    if (activeCategory === "ecommerce") {
      setActiveMarketplace("amazon");
    } else if (activeCategory === "quick-commerce") {
      setActiveMarketplace("jiomart");
    }
  }, [activeCategory]);

  const marketplaces = {
    amazon: {
      name: t("platformEnablement.marketplaces.ecommerce.services.amazon.name"),
      logo: amazonLogo,
      href: "/partners/marketplaces/amazon",
      services: t("platformEnablement.marketplaces.ecommerce.services.amazon.services", { returnObjects: true }),
      category: "ecommerce",
    },
    flipkart: {
      name: t("platformEnablement.marketplaces.ecommerce.services.flipkart.name"),
      logo: flipkartLogo,
      href: "/partners/marketplaces/flipkart",
      services: t("platformEnablement.marketplaces.ecommerce.services.flipkart.services", { returnObjects: true }),
      category: "ecommerce",
    },
    jiomart: {
      name: t("platformEnablement.marketplaces.quickCommerce.services.jiomart.name"),
      logo: jiomartLogo,
      href: "/partners/marketplaces/jiomart",
      services: t("platformEnablement.marketplaces.quickCommerce.services.jiomart.services", { returnObjects: true }),
      category: "quick-commerce",
    },
    meesho: {
      name: t("platformEnablement.marketplaces.ecommerce.services.meesho.name"),
      logo: meeshoLogo,
      href: "/partners/marketplaces/meesho",
      services: t("platformEnablement.marketplaces.ecommerce.services.meesho.services", { returnObjects: true }),
      category: "ecommerce",
    },
    snapdeal: {
      name: t("platformEnablement.marketplaces.ecommerce.services.snapdeal.name"),
      logo: snapdealLogo,
      href: "/partners/marketplaces/snapdeal",
      services: t("platformEnablement.marketplaces.ecommerce.services.snapdeal.services", { returnObjects: true }),
      category: "ecommerce",
    },
    blinkit: {
      name: t("platformEnablement.marketplaces.quickCommerce.services.blinkit.name"),
      logo: blinkitLogo,
      href: "/partners/marketplaces/blinkit",
      services: t("platformEnablement.marketplaces.quickCommerce.services.blinkit.services", { returnObjects: true }),
      category: "quick-commerce",
    },
    instamart: {
      name: "Instamart",
      logo: instamartLogo,
      href: "/partners/marketplaces/instamart",
      services: [
        t("platformEnablement.form.servicesOptions.accountSetup"),
        t("platformEnablement.form.servicesOptions.productListing"),
        t("platformEnablement.form.servicesOptions.logistics"),
      ],
      category: "quick-commerce",
    },
    zepto: {
      name: t("platformEnablement.marketplaces.quickCommerce.services.zepto.name"),
      logo: zeptoLogo,
      href: "/partners/marketplaces/zepto",
      services: t("platformEnablement.marketplaces.quickCommerce.services.zepto.services", { returnObjects: true }),
      category: "quick-commerce",
    },
    bigbasket: {
      name: t("platformEnablement.marketplaces.quickCommerce.services.bigbasket.name"),
      logo: bigbasketLogo,
      href: "/partners/marketplaces/bigbasket",
      services: t("platformEnablement.marketplaces.quickCommerce.services.bigbasket.services", { returnObjects: true }),
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
      alt: t("platformEnablement.whyChooseUs.steps.0.title"),
      title: t("platformEnablement.whyChooseUs.steps.0.title"),
      description: t("platformEnablement.whyChooseUs.steps.0.description"),
    },
    {
      src: PE2,
      alt: t("platformEnablement.whyChooseUs.steps.1.title"),
      title: t("platformEnablement.whyChooseUs.steps.1.title"),
      description: t("platformEnablement.whyChooseUs.steps.1.description"),
    },
    {
      src: PE3,
      alt: t("platformEnablement.whyChooseUs.steps.2.title"),
      title: t("platformEnablement.whyChooseUs.steps.2.title"),
      description: t("platformEnablement.whyChooseUs.steps.2.description"),
    },
    {
      src: PE4,
      alt: t("platformEnablement.whyChooseUs.steps.3.title"),
      title: t("platformEnablement.whyChooseUs.steps.3.title"),
      description: t("platformEnablement.whyChooseUs.steps.3.description"),
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
          t("platformEnablement.form.submitSuccess")
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
        alert(t("platformEnablement.form.submitError") + data.message);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert(t("platformEnablement.form.submitErrorGeneric"));
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
        title={t("platformEnablement.seo.title")}
        description={t("platformEnablement.seo.description")}
        keywords={t("platformEnablement.seo.keywords")}
        canonicalUrl="https://99digicom.com/services/launch"
      />
      <Helmet>
        
        <script type="application/ld+json">{JSON.stringify(serviceSchema)}</script>
      </Helmet>

      <main className="min-h-screen bg-gradient-to-br from-green-50 to-white">
        {/* Hero Section */}
        <section className="pt-24 pb-16 px-4" aria-labelledby="hero-heading">
          <div className="max-w-7xl mx-auto text-center">
            <div className="inline-flex items-center space-x-2 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Store className="h-4 w-4" aria-hidden="true" />
              <span>{t("platformEnablement.hero.sellerAccount")}</span>
            </div>
            <h1
              id="hero-heading"
              className="text-5xl font-bold text-gray-900 mb-6 flex flex-col items-center justify-center"
            >
              <span className="flex items-center flex-wrap justify-center">
                <span className="text-green-600 mr-2">{t("platformEnablement.hero.title1")}</span> {t("platformEnablement.hero.title2")} {t("platformEnablement.hero.title3")}
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
              {t("platformEnablement.hero.subtitle")}
            </p>
            <button
              onClick={handleGetStarted}
              className="inline-flex items-center px-8 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors flex items-center space-x-2"
              aria-label={t("platformEnablement.hero.getStarted")}
            >
              <span>{t("platformEnablement.hero.getStarted")}</span>
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
                {t("platformEnablement.marketplaces.heading")}
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-12">
                {t("platformEnablement.marketplaces.description")}
              </p>
            </div>

            {/* Three-column layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Left Column - E-commerce Platforms */}
              <div className="lg:col-span-2 bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <ShoppingCart className="h-5 w-5 mr-2 text-green-600" />
                  {t("platformEnablement.marketplaces.ecommerce.title")}
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
                          {t("platformEnablement.marketplaces.learnMore", { 
                            name: marketplaces[activeMarketplace].name 
                          })}
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
                  {t("platformEnablement.marketplaces.quickCommerce.title")}
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
                {t("platformEnablement.whatsIncluded.heading")}
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                {t("platformEnablement.whatsIncluded.description")}
              </p>
            </div>
            <div className="max-w-4xl mx-auto grid gap-8 md:grid-cols-2">
              <div className="bg-green-50 border-l-4 border-green-500 rounded-xl shadow-sm p-6 flex flex-col h-full">
                <div className="flex items-center mb-3">
                  <FileText className="h-7 w-7 text-green-600 mr-3 flex-shrink-0" />
                  <span className="font-semibold text-lg text-gray-900">
                    {t("platformEnablement.whatsIncluded.services.accountRegistration.title")}
                  </span>
                </div>
                <ul className="list-disc ml-7 text-gray-700 space-y-1 text-base">
                  {t("platformEnablement.whatsIncluded.services.accountRegistration.items", { returnObjects: true }).map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
              <div className="bg-green-50 border-l-4 border-green-500 rounded-xl shadow-sm p-6 flex flex-col h-full">
                <div className="flex items-center mb-3">
                  <Package className="h-7 w-7 text-green-600 mr-3 flex-shrink-0" />
                  <span className="font-semibold text-lg text-gray-900">
                    {t("platformEnablement.whatsIncluded.services.productCatalog.title")}
                  </span>
                </div>
                <ul className="list-disc ml-7 text-gray-700 space-y-1 text-base">
                  {t("platformEnablement.whatsIncluded.services.productCatalog.items", { returnObjects: true }).map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
              <div className="bg-green-50 border-l-4 border-green-500 rounded-xl shadow-sm p-6 flex flex-col h-full">
                <div className="flex items-center mb-3">
                  <Store className="h-7 w-7 text-green-600 mr-3 flex-shrink-0" />
                  <span className="font-semibold text-lg text-gray-900">
                    {t("platformEnablement.whatsIncluded.services.brandStore.title")}
                  </span>
                </div>
                <ul className="list-disc ml-7 text-gray-700 space-y-1 text-base">
                  {t("platformEnablement.whatsIncluded.services.brandStore.items", { returnObjects: true }).map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
              <div className="bg-green-50 border-l-4 border-green-500 rounded-xl shadow-sm p-6 flex flex-col h-full">
                <div className="flex items-center mb-3">
                  <Building className="h-7 w-7 text-green-600 mr-3 flex-shrink-0" />
                  <span className="font-semibold text-lg text-gray-900">
                    {t("platformEnablement.whatsIncluded.services.platformIntegration.title")}
                  </span>
                </div>
                <ul className="list-disc ml-7 text-gray-700 space-y-1 text-base">
                  {t("platformEnablement.whatsIncluded.services.platformIntegration.items", { returnObjects: true }).map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
              <div className="bg-green-50 border-l-4 border-green-500 rounded-xl shadow-sm p-6 flex flex-col h-full">
                <div className="flex items-center mb-3">
                  <Shield className="h-7 w-7 text-green-600 mr-3 flex-shrink-0" />
                  <span className="font-semibold text-lg text-gray-900">
                    {t("platformEnablement.whatsIncluded.services.listingOptimization.title")}
                  </span>
                </div>
                <ul className="list-disc ml-7 text-gray-700 space-y-1 text-base">
                  {t("platformEnablement.whatsIncluded.services.listingOptimization.items", { returnObjects: true }).map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
              <div className="bg-green-50 border-l-4 border-green-500 rounded-xl shadow-sm p-6 flex flex-col h-full">
                <div className="flex items-center mb-3">
                  <CheckCircle className="h-7 w-7 text-green-600 mr-3 flex-shrink-0" />
                  <span className="font-semibold text-lg text-gray-900">
                    {t("platformEnablement.whatsIncluded.services.goLiveSupport.title")}
                  </span>
                </div>
                <ul className="list-disc ml-7 text-gray-700 space-y-1 text-base">
                  {t("platformEnablement.whatsIncluded.services.goLiveSupport.items", { returnObjects: true }).map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
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
                {t("platformEnablement.whyChooseUs.heading")}
              </h2>
              <p className="text-lg text-gray-600 max-w-4xl mx-auto">
                {t("platformEnablement.whyChooseUs.description")}
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
                {t("platformEnablement.testimonials.heading")}
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                {t("platformEnablement.testimonials.description")}
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-6" role="list">
              {t("platformEnablement.testimonials.items", { returnObjects: true }).map((testimonial, index) => (
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