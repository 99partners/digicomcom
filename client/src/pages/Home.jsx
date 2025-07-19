import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
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
// Import local logos
import amazonLogo from "../assets/Amazon.png";
import flipkartLogo from "../assets/Flipkart.png";
import jiomartLogo from "../assets/Jiomart.png";
import zeptoLogo from "../assets/Zepto.png";
import blinkitLogo from "../assets/Blinkit.png";
import swiggyLogo from "../assets/Swiggy.png";
import zomatoLogo from "../assets/Meesho1.png";

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
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
    } finally {
      setLoading(false);
    }
  };
  const testimonials = [
    {
      quote:
        "ONDC integration was a breeze, and our sales skyrocketed within weeks!",
      author: "Neha Patel",
      role: "Founder, CraftHaven",
      rating: 5,
    },
    {
      quote:
        "Co-branding with a major retailer boosted our brand's reach overnight.",
      author: "Vikram Singh",
      role: "CEO, EcoWear",
      rating: 5,
    },
    {
      quote:
        "Their marketing campaigns tripled our website traffic. Amazing team!",
      author: "Meera Gupta",
      role: "Marketing Lead, PureOrganics",
      rating: 5,
    },
  ];
  const coreServices = [
    {
      icon: Puzzle,
      title: "Seller Account Setup",
      frontText: "Amazon, Flipkart, Meesho",
      backText:
        "We offer end-to-end onboarding, document handling, and account activation across major Indian marketplaces to get you selling fast.",
    },
    {
      icon: ShieldCheck,
      title: "Account Management",
      frontText: "Listings, Orders, SEO",
      backText:
        "We handle cataloging, listing updates, return resolution, performance monitoring, and keyword-rich SEO optimization.",
    },
    {
      icon: Target,
      title: "Advertising & Marketing",
      frontText: "Sponsored Ads, Creatives",
      backText:
        "Our campaigns use keyword targeting, A/B testing, and attractive creatives to improve visibility, clicks, and conversions.",
    },
    {
      icon: Handshake,
      title: "Co‑Branding Solutions",
      frontText: "Influencer Collaborations",
      backText:
        "We connect you with influencers and allied brands for bundled offerings, joint campaigns, and visibility spikes across platforms.",
    },
  ];
  // Logo data array
  const marketplaceLogos = [
    { name: "Amazon", src: amazonLogo, alt: "Amazon Logo" },
    { name: "Flipkart", src: flipkartLogo, alt: "Flipkart Logo" },
    { name: "JioMart", src: jiomartLogo, alt: "JioMart Logo" },
    { name: "Zepto", src: zeptoLogo, alt: "Zepto Logo" },
    { name: "Blinkit", src: blinkitLogo, alt: "Blinkit Logo" },
    { name: "Swiggy", src: swiggyLogo, alt: "Swiggy Logo" },
    { name: "Zomato", src: zomatoLogo, alt: "Zomato Logo" },
  ];
  // Add this with your other state variables
  const [cardsData, setCardsData] = useState([
    {
      id: "ecosystem",
      icon: Puzzle,
      headline: "Seamless Integration, Maximum Reach",
      content:
        "We deeply understand the entire landscape. From Amazon & Flipkart to Meesho, Jiomart, ONDC, Swiggy & Zomato, we provide unified expertise across all major platforms. One partner, infinite possibilities.",
    },
    {
      id: "strategy",
      icon: Target,
      headline: "Platform-First Optimization",
      content:
        "We craft bespoke strategies for each channel's unique algorithms, audience, and best practices. Our Platform Enablement & Account Management services ensure your brand thrives where it matters most.",
    },
    {
      id: "growth",
      icon: LineChart,
      headline: "ROI-Focused Advertising & Marketing",
      content:
        "Your ad spend is an investment. We leverage advanced analytics and platform-specific tools to target precisely, optimize relentlessly, and deliver measurable sales growth and customer acquisition.",
    },
    {
      id: "partnership",
      icon: Handshake,
      headline: "Amplify Reach Through Smart Alliances",
      content:
        "Unlock exponential growth beyond solo efforts. Our Co-Branding Solutions identify and execute win-win partnerships, leveraging combined audiences and credibility to create unique value and enter new markets effectively.",
    },
    {
      id: "brand",
      icon: ShieldCheck,
      headline: "Your Brand, Our Obsession",
      content:
        "We protect and elevate your brand equity. From consistent platform presentation and reputation management to strategic co-branding alignment, we ensure every digital touchpoint strengthens your brand identity and trust.",
    },
    {
      id: "innovation",
      icon: Rocket,
      headline: "Future-Proof Your Digital Presence",
      content:
        "The digital landscape evolves daily. We proactively monitor platform updates, emerging trends, and algorithm shifts, adapting your strategy swiftly to keep you ahead of the curve and capitalize on new opportunities.",
    },
    {
      id: "team",
      icon: Headset,
      headline: "Your Dedicated Growth Squad",
      content:
        "Experience true partnership. You get assigned experts in Account Management, Platform Ops, and Marketing who know your business intimately, provide transparent communication, and act as a seamless extension of your team.",
    },
    {
      id: "results",
      icon: Trophy,
      headline: "We Deliver What Matters: Growth",
      content:
        "Don't just take our word for it. We focus on measurable outcomes: Increased market share, higher conversion rates, reduced customer acquisition costs, stronger brand recall, and scalable revenue growth.",
    },
  ]);
  
  // YouTube Shorts data
  const youtubeShorts = [
    {
      id: "short1",
      title: "Quick E-commerce Tips",
      description: "Learn 3 essential tips for boosting your online sales",
      thumbnail: "https://picsum.photos/seed/ecommerce1/400/800.jpg",
      videoId: "dQw4w9WgXcQ" // Replace with your actual YouTube Short ID
    },
    {
      id: "short2",
      title: "Marketplace Setup Guide",
      description: "Step-by-step guide to setting up on major platforms",
      thumbnail: "https://picsum.photos/seed/ecommerce2/400/800.jpg",
      videoId: "dQw4w9WgXcQ" // Replace with your actual YouTube Short ID
    },
    {
      id: "short3",
      title: "Advertising Strategies",
      description: "Proven advertising techniques for e-commerce success",
      thumbnail: "https://picsum.photos/seed/ecommerce3/400/800.jpg",
      videoId: "dQw4w9WgXcQ" // Replace with your actual YouTube Short ID
    }
  ];

  return (
    <>
      <SEO
        title="Digital Commerce Solutions for Business Growth"
        description="99Digicom helps businesses setup, manage, advertise, and co-brand across top marketplaces. Get expert solutions for e-commerce growth and digital success."
        keywords="digital commerce, e-commerce solutions, marketplace management, ONDC integration, co-branding, digital marketing, online business"
        canonicalUrl="https://99digicom.com"
      />
      <div className="pt-12 sm:pt-16">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-green-50 via-white to-green-50">
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 md:py-24 lg:py-32 text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6 md:mb-8 leading-tight text-gray-900">
              Fuel your{" "}
              <span className="bg-gradient-to-r from-green-700 to-green-400 text-transparent bg-clip-text animate-gradient">
                E‑Commerce
              </span>
              <br /> Growth with <br />
              <span className="bg-gradient-to-r from-green-700 to-green-400 text-transparent bg-clip-text animate-gradient">
                Proven Expertise
              </span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-8 sm:mb-10 md:mb-12 text-gray-600 max-w-2xl sm:max-w-3xl lg:max-w-4xl mx-auto leading-relaxed">
              Setup, Manage, Advertise, and Co-Brand across all Top
              marketplaces.
            </p>
            <div className="flex justify-center">
              <Link
                to="/partnerlogin"
                className="w-full sm:w-auto inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white font-semibold rounded-lg transition-all duration-300 text-sm sm:text-base"
                aria-label="Get Started with 99Digicom"
              >
                Get Started
              </Link>
            </div>
            {/* Logo Scroll Section */}
            <div className="mt-8 sm:mt-12 overflow-hidden pause-on-hover">
              <div className="flex animate-scroll-x">
                {[...marketplaceLogos, ...marketplaceLogos].map(
                  (logo, index) => (
                    <div
                      key={`${logo.name}-${index}`}
                      className="flex-shrink-0 mx-2 xl:mx-3 flex items-center justify-center bg-white p-3 sm:p-4 hover:shadow-lg transition-shadow duration-300"
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
              Our Core Services
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {coreServices.map((service, idx) => {
                const Icon = service.icon;
                const [isFlipped, setIsFlipped] = useState(false);
                const handleMouseEnter = () => {
                  setIsFlipped(true);
                };
                const handleClick = () => {
                  setIsFlipped(false);
                };
                return (
                  <div
                    key={idx}
                    className="relative group h-80 perspective cursor-pointer"
                    role="article"
                    onClick={handleClick}
                    onMouseEnter={handleMouseEnter}
                  >
                    <div
                      className="relative w-full h-full transition-transform duration-700 transform-style-preserve-3d"
                      style={{
                        transform: isFlipped
                          ? "rotateY(180deg)"
                          : "rotateY(0deg)",
                      }}
                    >
                      {/* Front Side */}
                      <div className="absolute w-full h-full backface-hidden bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden">
                        <div className="flex flex-col items-center justify-center h-full px-6 py-8 gap-4 bg-gradient-to-br from-white via-gray-50 to-green-50 hover:from-green-50 hover:to-white transition-all duration-300">
                          <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center shadow transition hover:bg-green-200 transform hover:scale-110">
                            <Icon
                              className="h-6 w-6 text-green-600"
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
                      <div className="absolute w-full h-full backface-hidden bg-white text-gray-800 rounded-xl shadow-xl rotate-y-180 flex items-center justify-center p-6 border">
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
                Our Benfits
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl sm:max-w-3xl lg:max-w-4xl mx-auto leading-relaxed">
                Comprehensive solutions to elevate your eCommerce business
                across all platforms
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
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
                  Why Choose Us?
                </h2>
                <p className="text-base sm:text-lg md:text-xl text-gray-600 leading-relaxed mb-6">
                  We simplify your selling journey with a hassle-free setup
                  process, dedicated support, and years of marketplace
                  expertise. With a proven 90%+ customer retention rate, we
                  ensure sellers not only launch but grow with us.
                </p>
                <p className="text-base sm:text-lg md:text-xl text-gray-600 leading-relaxed">
                  Trust 99digicom to deliver excellence at every stage of your
                  e-commerce growth.
                </p>
              </div>
              <div className="pl-0 md:pl-8 border-t md:border-t-0 md:border-l border-green-200 pt-6 md:pt-0 md:pl-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">
                  Our Commitment to Excellence
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
                        Dedicated Account Manager
                      </h4>
                      <p className="text-sm text-gray-600 mt-1">
                        Personalized support for your business needs
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
                        Platform-Specific Expertise
                      </h4>
                      <p className="text-sm text-gray-600 mt-1">
                        Specialized knowledge across all marketplaces
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
                        Proven Success Rates
                      </h4>
                      <p className="text-sm text-gray-600 mt-1">
                        90%+ customer retention rate
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
                        7-Day Support
                      </h4>
                      <p className="text-sm text-gray-600 mt-1">
                        Responsive assistance whenever you need it
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
                Quick Tips & Tutorials
              </h2>
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 max-w-2xl sm:max-w-3xl lg:max-w-4xl mx-auto leading-relaxed">
                Watch our YouTube Shorts for quick insights on e-commerce success
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
                    <h3 className="text-lg font-semibold text-gray-900">{short.title}</h3>
                    <p className="text-sm text-gray-600 mt-1">{short.description}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="text-center mt-12">
              <a 
                href="https://www.youtube.com/@yourchannel" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 py-3 border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white font-semibold rounded-lg transition-all duration-300"
              >
                View All YouTube Shorts
              </a>
            </div>
          </div>
        </section>
        
        {/* Testimonials Section */}
        <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8 sm:mb-12 md:mb-16">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4 md:mb-6">
                Voices of Success
              </h2>
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 max-w-2xl sm:max-w-3xl lg:max-w-4xl mx-auto leading-relaxed">
                Hear from our partners and customers who've thrived with
                99digicom.com.
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
              Latest Insights
            </h2>
            <p className="text-lg text-gray-600 text-center mb-12">
              Stay ahead with the latest in digital commerce and business growth
              strategies.
            </p>
            {loading ? (
              <div
                className="text-center text-gray-600"
                role="status"
                aria-live="polite"
              >
                Loading blogs...
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
                          {blog.category}
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
                        <span className="mx-2">•</span>
                        <span>{blog.readTime}</span>
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
                        aria-label={`Read more about ${blog.title}`}
                      >
                        Read More
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
            <div className="text-center mt-12">
              <Link
                to="/resources/blogs"
                className="inline-flex items-center justify-center px-6 py-3 border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white font-semibold rounded-lg transition-all duration-300"
                aria-label="View all blog articles"
              >
                View All Articles
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};
export default Home;