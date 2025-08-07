import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  Puzzle,
  Target,
  LineChart,
  Handshake,
  ShieldCheck,
  Rocket,
  Headset,
  Trophy,
  Star,
  Calendar,
  ArrowRight,
  Play,
} from "lucide-react";
import axios from "axios";
import { getApiUrl } from "../config/api.config";
import SEO from "../components/SEO";
import Countdown from "../components/Countdown";
// Import local logos
import amazonLogo from "../assets/Amazon.png";
import flipkartLogo from "../assets/Flipkart.png";
import jiomartLogo from "../assets/Jiomart.png";
import zeptoLogo from "../assets/Zepto.png";
import blinkitLogo from "../assets/Blinkit.png";
import swiggyLogo from "../assets/Swiggy.png";
import zomatoLogo from "../assets/Meesho1.png";

const Home = () => {
  const { t } = useTranslation();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchLatestBlogs();
  }, []);

  const fetchLatestBlogs = async () => {
    try {
      const response = await axios.get(getApiUrl("api/blogs"));
      if (response.data.success) {
        setBlogs(response.data.data.slice(0, 3)); // Get only the latest 3 blogs
      }
    } catch (error) {
      console.error("Error fetching blogs:", error);
      setError(t("home.latestBlogs.error"));
    } finally {
      setLoading(false);
    }
  };

  // Check if user is authenticated
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

  const testimonials = [
    {
      quote: t("home.testimonials.first.quote"),
      author: t("home.testimonials.first.author"),
      role: t("home.testimonials.first.role"),
      rating: 5,
    },
    {
      quote: t("home.testimonials.second.quote"),
      author: t("home.testimonials.second.author"),
      role: t("home.testimonials.second.role"),
      rating: 5,
    },
    {
      quote: t("home.testimonials.third.quote"),
      author: t("home.testimonials.third.author"),
      role: t("home.testimonials.third.role"),
      rating: 5,
    },
  ];

  const coreServices = [
    {
      icon: Puzzle,
      title: t("home.services.sellerSetup.title"),
      frontText: t("home.services.sellerSetup.frontText"),
      backText: t("home.services.sellerSetup.backText"),
    },
    {
      icon: ShieldCheck,
      title: t("home.services.accountManagement.title"),
      frontText: t("home.services.accountManagement.frontText"),
      backText: t("home.services.accountManagement.backText"),
    },
    {
      icon: Target,
      title: t("home.services.advertising.title"),
      frontText: t("home.services.advertising.frontText"),
      backText: t("home.services.advertising.backText"),
    },
    {
      icon: Handshake,
      title: t("home.services.cobranding.title"),
      frontText: t("home.services.cobranding.frontText"),
      backText: t("home.services.cobranding.backText"),
    },
  ];

  const marketplaceLogos = [
    {
      id: "amazon",
      name: t("home.logos.amazon.name"),
      src: amazonLogo,
      alt: t("home.logos.amazon.alt")
    },
    {
      id: "flipkart",
      name: t("home.logos.flipkart.name"),
      src: flipkartLogo,
      alt: t("home.logos.flipkart.alt")
    },
    {
      id: "jiomart",
      name: t("home.logos.jiomart.name"),
      src: jiomartLogo,
      alt: t("home.logos.jiomart.alt")
    },
    {
      id: "zepto",
      name: t("home.logos.zepto.name"),
      src: zeptoLogo,
      alt: t("home.logos.zepto.alt")
    },
    {
      id: "blinkit",
      name: t("home.logos.blinkit.name"),
      src: blinkitLogo,
      alt: t("home.logos.blinkit.alt")
    },
    {
      id: "swiggy",
      name: t("home.logos.swiggy.name"),
      src: swiggyLogo,
      alt: t("home.logos.swiggy.alt")
    },
    {
      id: "zomato",
      name: t("home.logos.zomato.name"),
      src: zomatoLogo,
      alt: t("home.logos.zomato.alt")
    }
  ];

  const cardsData = [
    {
      id: "ecosystem",
      icon: Puzzle,
      headline: t("home.features.ecosystem.headline"),
      content: t("home.features.ecosystem.content")
    },
    {
      id: "strategy",
      icon: Target,
      headline: t("home.features.strategy.headline"),
      content: t("home.features.strategy.content")
    },
    {
      id: "growth",
      icon: LineChart,
      headline: t("home.features.growth.headline"),
      content: t("home.features.growth.content")
    },
    {
      id: "partnership",
      icon: Handshake,
      headline: t("home.features.partnership.headline"),
      content: t("home.features.partnership.content")
    },
    {
      id: "brand",
      icon: ShieldCheck,
      headline: t("home.features.brand.headline"),
      content: t("home.features.brand.content")
    },
    {
      id: "innovation",
      icon: Rocket,
      headline: t("home.features.innovation.headline"),
      content: t("home.features.innovation.content")
    },
    {
      id: "team",
      icon: Headset,
      headline: t("home.features.team.headline"),
      content: t("home.features.team.content")
    },
    {
      id: "results",
      icon: Trophy,
      headline: t("home.features.results.headline"),
      content: t("home.features.results.content")
    }
  ];

  const youtubeShorts = [
    {
      id: "first",
      title: t("home.shorts.first.title"),
      description: t("home.shorts.first.description"),
      videoId: "dQw4w9WgXcQ" // Replace with your actual YouTube Short ID
    },
    {
      id: "second",
      title: t("home.shorts.second.title"),
      description: t("home.shorts.second.description"),
      videoId: "dQw4w9WgXcQ" // Replace with your actual YouTube Short ID
    },
    {
      id: "third",
      title: t("home.shorts.third.title"),
      description: t("home.shorts.third.description"),
      videoId: "dQw4w9WgXcQ" // Replace with your actual YouTube Short ID
    }
  ];

  return (
    <>
      <SEO
        title={t("home.seo.title")}
        description={t("home.seo.description")}
        keywords={t("home.seo.keywords")}
        canonicalUrl="https://99digicom.com"
      />
      <Countdown />
      <div className="pt-12 sm:pt-8">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-green-50 via-white to-green-50">
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 md:py-24 lg:py-32 text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6 md:mb-8 leading-tight text-gray-900">
              {t("home.hero.title1")}{" "}
              <span className="bg-gradient-to-r from-green-700 to-green-400 text-transparent bg-clip-text animate-gradient">
                {t("home.hero.title2")}
              </span>
              <br /> {t("home.hero.title3")} <br />
              <span className="bg-gradient-to-r from-green-700 to-green-400 text-transparent bg-clip-text animate-gradient">
                {t("home.hero.title4")}
              </span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-8 sm:mb-10 md:mb-12 text-gray-600 max-w-2xl sm:max-w-3xl lg:max-w-4xl mx-auto leading-relaxed">
              {t("home.hero.subtitle")}
            </p>
            <div className="flex justify-center">
              <button
                onClick={handleGetStarted}
                className="w-full sm:w-auto inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white font-semibold rounded-lg transition-all duration-300 text-sm sm:text-base"
                aria-label={t("home.hero.getStartedAriaLabel")}
              >
                {t("home.hero.getStarted")}
              </button>
            </div>
            {/* Logo Scroll Section */}
            <div className="mt-8 sm:mt-12 overflow-hidden pause-on-hover">
              <div className="flex animate-scroll-x">
                {[...marketplaceLogos, ...marketplaceLogos].map(
                  (logo, index) => (
                    <div
                      key={`${logo.name}-${index}`}
                      className="flex-shrink-0 mx-2 xl:mx-3 flex items-center justify-center p-3 sm:p-4 hover:shadow-lg transition-shadow duration-300"
                    >
                      <img
                        src={logo.src}
                        alt={logo.alt}
                        className="h-24 w-24 sm:h-32 sm:w-32 object-contain"
                        loading="lazy"
                      />
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        </section>
        {/* Core Services Section */}
        <section
  className="py-16 bg-green-50"
  aria-labelledby="services-heading"
>
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <h2
      id="services-heading"
      className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4 text-center"
    >
      {t("home.services.heading")}
    </h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
      {coreServices.map((service, idx) => {
        const Icon = service.icon;
        const [isFlipped, setIsFlipped] = useState(false);
        
        const handleMouseEnter = () => {
          setIsFlipped(true);
        };
        
        const handleMouseLeave = () => {
          setIsFlipped(false);
        };
        
        const handleClick = () => {
          // Add any click functionality here
          console.log(`Clicked on ${service.title}`);
        };
        
        return (
          <div
            key={idx}
            className="relative group h-80 perspective cursor-pointer"
            role="article"
            onClick={handleClick}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <div
              className={`relative w-full h-full transition-transform duration-700 ease-in-out transform-style-preserve-3d ${
                isFlipped ? 'rotate-y-180' : 'rotate-y-0'
              }`}
            >
              {/* Front Side */}
              <div className="absolute w-full h-full backface-hidden bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden transition-all duration-300 hover:shadow-xl">
                <div className="flex flex-col items-center justify-center h-full px-6 py-8 gap-4 bg-gradient-to-br from-white via-gray-50 to-green-50 hover:from-green-50 hover:to-white">
                  <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center shadow-md transition-transform duration-300 group-hover:scale-110 hover:bg-green-200 animate-float">
                    <Icon
                      className="h-8 w-8 text-green-600"
                      aria-hidden="true"
                    />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">
                    {service.title}
                  </h3>
                  <p className="text-sm text-gray-600 text-center">
                    {service.frontText}
                  </p>
                </div>
              </div>
              {/* Back Side */}
              <div className="absolute w-full h-full backface-hidden bg-white text-gray-800 rounded-xl shadow-lg rotate-y-180 flex flex-col items-center justify-center p-6 border border-green-200 transition-all duration-300 hover:shadow-xl">
                <p className="text-sm sm:text-base text-center leading-relaxed">
                  {service.backText}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  </div>
</section>
        {/* Benefits Section */}
        <section className="py-12 bg-white overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4">
                {t("home.benefits.heading")}
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl sm:max-w-3xl lg:max-w-4xl mx-auto leading-relaxed">
                {t("home.benefits.description")}
              </p>
            </div>
            <div className="relative">
              <div className="overflow-hidden">
                <div className="flex animate-scroll-x pause-on-hover">
                  {/* Duplicate cards for continuous scrolling */}
                  {[...cardsData, ...cardsData].map((card, index) => (
                    <div
                      key={`${card.id}-${index}`}
                      className="flex-shrink-0 w-full sm:w-80 md:w-96 lg:w-1/4 p-4"
                    >
                      <div className="bg-gradient-to-br from-green-50 to-white rounded-xl shadow-lg p-6 h-full border border-gray-100 hover:shadow-xl transition-all duration-300">
                        <div className="flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4 mx-auto">
                          <card.icon
                            className="h-8 w-8 text-green-600"
                            aria-hidden="true"
                          />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 text-center mb-3">
                          {card.headline}
                        </h3>
                        <p className="text-gray-600 text-center text-sm">
                          {card.content}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Why Choose Us */}
        <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-gradient-to-r from-green-50 to-white">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="pr-0 md:pr-8">
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4">
                {t("home.why.heading")}
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-gray-600 leading-relaxed mb-6">
                {t("home.why.description")}
              </p>
              </div>
              <div className="pl-0 md:pl-8 border-t md:border-t-0 md:border-l border-green-200 pt-6 md:pt-0 md:pl-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">
                {t("home.why.commitment.heading")}
              </h3>
                <ul className="space-y-6">
                  <li className="flex items-start group">
                    <div className="flex-shrink-0 mt-1">
                      <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center transition-all duration-300 group-hover:bg-green-200">
                        <svg
                          className="w-3 h-3 text-green-600"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                    </div>
                    <div className="ml-4">
                      <h4 className="text-lg font-medium text-gray-900">
                        {t("home.why.commitment.setup.title")}
                      </h4>
                      <p className="text-sm text-gray-600 mt-1">
                        {t("home.why.commitment.setup.description")}
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start group">
                    <div className="flex-shrink-0 mt-1">
                      <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center transition-all duration-300 group-hover:bg-green-200">
                        <svg
                          className="w-3 h-3 text-green-600"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                    </div>
                    <div className="ml-4">
                      <h4 className="text-lg font-medium text-gray-900">
                        {t("home.why.commitment.support.title")}
                      </h4>
                      <p className="text-sm text-gray-600 mt-1">
                        {t("home.why.commitment.support.description")}
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start group">
                    <div className="flex-shrink-0 mt-1">
                      <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center transition-all duration-300 group-hover:bg-green-200">
                        <svg
                          className="w-3 h-3 text-green-600"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                    </div>
                    <div className="ml-4">
                      <h4 className="text-lg font-medium text-gray-900">
                        {t("home.why.commitment.expertise.title")}
                      </h4>
                      <p className="text-sm text-gray-600 mt-1">
                        {t("home.why.commitment.expertise.description")}
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start group">
                    <div className="flex-shrink-0 mt-1">
                      <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center transition-all duration-300 group-hover:bg-green-200">
                        <svg
                          className="w-3 h-3 text-green-600"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                    </div>
                    <div className="ml-4">
                      <h4 className="text-lg font-medium text-gray-900">
                        {t("home.why.commitment.retention.title")}
                      </h4>
                      <p className="text-sm text-gray-600 mt-1">
                        {t("home.why.commitment.retention.description")}
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
        {/* YouTube Shorts Section - NEW */}
        <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8 sm:mb-12 md:mb-16">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4 md:mb-6">
                {t("home.shorts.heading")}
              </h2>
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 max-w-2xl sm:max-w-3xl lg:max-w-4xl mx-auto leading-relaxed">
                {t("home.shorts.description")}
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {youtubeShorts.map((short) => (
                <div key={short.id} className="relative group">
                  <div className="relative aspect-[9/16] overflow-hidden rounded-xl shadow-lg">
                    <img
                      src={short.thumbnail}
                      alt={short.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                      <div className="w-16 h-16 rounded-full bg-white bg-opacity-80 flex items-center justify-center transform transition-transform duration-300 group-hover:scale-110">
                        <Play className="h-8 w-8 text-green-600" />
                      </div>
                    </div>
                  </div>
                  <div className="mt-4">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {short.title}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">
                      {short.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        {/* Testimonials Section */}
        <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8 sm:mb-12 md:mb-16">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4 md:mb-6">
                {t("home.testimonials.heading")}
              </h2>
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 max-w-2xl sm:max-w-3xl lg:max-w-4xl mx-auto leading-relaxed">
                {t("home.testimonials.description")}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className="bg-white p-4 sm:p-6 md:p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 border-t-4 border-green-500 group"
                >
                  <div className="flex items-center mb-3 sm:mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-4 w-4 sm:h-5 sm:w-5 text-amber-400 fill-current"
                      />
                    ))}
                  </div>
                  <blockquote className="text-sm sm:text-base md:text-lg text-gray-600 italic mb-4 sm:mb-6 leading-relaxed">
                    "{testimonial.quote}"
                  </blockquote>
                  <div>
                    <p className="text-sm sm:text-base font-semibold text-gray-900">
                      {testimonial.author}
                    </p>
                    <p className="text-xs sm:text-sm text-gray-500">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        {/* Latest Blogs Section */}
        <section
          className="py-16 px-4 bg-gradient-to-br from-green-50 to-white"
          aria-labelledby="blogs-heading"
        >
          <div className="max-w-7xl mx-auto">
            <h2
              id="blogs-heading"
              className="text-3xl font-bold text-gray-900 mb-4 text-center"
            >
              {t("home.latestBlogs.heading")}
            </h2>
            <p className="text-lg text-gray-600 text-center mb-12">
              {t("home.latestBlogs.description")}
            </p>
            {loading ? (
              <div
                className="text-center text-gray-600"
                role="status"
                aria-live="polite"
              >
                {t("home.latestBlogs.loadingText")}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {blogs.map((blog) => (
                  <article
                    key={blog._id}
                    className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow"
                    itemScope
                    itemType="http://schema.org/BlogPosting"
                  >
                    <div className="relative">
                      <img
                        src={blog.image || "/placeholder.svg"}
                        alt={blog.title}
                        className="w-full h-48 object-cover rounded-t-lg"
                        loading="lazy"
                        itemProp="image"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-semibold">
                          {t(`home.latestBlogs.categories.${blog.category}`)}
                        </span>
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center text-sm text-gray-600 mb-3">
                        <Calendar
                          className="h-4 w-4 text-green-600 mr-1"
                          aria-hidden="true"
                        />
                        <time
                          itemProp="datePublished"
                          dateTime={blog.createdAt}
                        >
                          {new Date(blog.createdAt).toLocaleDateString()}
                        </time>
                        <span className="mx-2">{t("home.latestBlogs.separator")}</span>
                        <span>{t("home.latestBlogs.readTime", { time: blog.readTime })}</span>
                      </div>
                      <h3
                        className="text-xl font-semibold text-gray-900 mb-3"
                        itemProp="headline"
                      >
                        {blog.title}
                      </h3>
                      <p
                        className="text-gray-600 text-sm mb-4"
                        itemProp="description"
                      >
                        {blog.excerpt}
                      </p>
                      <Link
                        to={`/resources/blogs/${blog._id}`}
                        className="inline-flex items-center text-green-600 hover:text-green-800 font-medium transition-colors"
                        aria-label={t("home.latestBlogs.readMoreAriaLabel", {
                            title: blog.title,
                          })}
                        >
                          {t("home.latestBlogs.readMoreText")}
                        <ArrowRight
                          className="ml-1 h-4 w-4"
                          aria-hidden="true"
                        />
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </section>
      </div>
    </>
  );
};

export default Home;
