"use client";

import { useState, useEffect } from "react";
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
import indiamartLogo from "../assets/Indiamart.png";
import snapdealLogo from "../assets/Snapdeal.png";
import ImageSlider from '../components/ImageSlider';

export default function AdvertisingMarketing() {
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

  const handlePrev = () => {
    setCurrentStep((prev) => (prev > 0 ? prev - 1 : 2));
  };

  const handleNext = () => {
    setCurrentStep((prev) => (prev < 2 ? prev + 1 : 0));
  };

  return (
    <>
      <Helmet>
        <title>E-commerce Advertising & Marketing Services | 99digicom</title>
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
              className="text-5xl font-bold text-gray-900 mb-6"
            >
              Boost Your Product Visibility on{" "}
              <span className="text-green-600">Amazon, Flipkart & More</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Maximise your reach with performance marketing tailored for
              e-commerce success.
            </p>
            <a
              href="#get-started"
              className="inline-flex items-center px-8 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors"
              aria-label="Launch your campaign starting at ₹4,999"
            >
              Launch Your Campaign - ₹4,999
              <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
            </a>
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
                visibility through targeted Amazon Sponsored Ads and Flipkart
                PLA campaigns. By optimising product listings and running
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

        {/* Supported Platforms */}
        <section aria-labelledby="platforms-heading" className="py-16 px-4 bg-green-50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 id="platforms-heading" className="text-3xl font-bold text-gray-900 mb-4">
                Supported Marketplaces
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                We optimise campaigns across various leading marketplaces to ensure maximum exposure for your products.
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              {[
                {
                  
                  logo: amazonLogo,
                  desc: "World's largest e-commerce platform with millions of daily shoppers.",
                },
                {

                  logo: flipkartLogo,
                  desc: "India's leading e-commerce marketplace, offering extensive reach within India.",
                },
                {
                  
                  logo: meeshoLogo,
                  desc: "A growing social commerce platform focusing on direct-to-consumer selling via social media channels.",
                },
                {
                  
                  logo: jiomartLogo,
                  desc: "Reliance's digital commerce platform, catering to a wide range of consumer goods.",
                },
                {
                  
                  logo: indiamartLogo,
                  desc: "A B2B marketplace providing access to bulk buyers and a large network of suppliers.",
                },
                {
                  
                  logo: snapdealLogo,
                  desc: "A popular e-commerce platform that serves millions of buyers across India.",
                },
              ].map((platform, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl overflow-hidden transform hover:-translate-y-1 transition-all duration-300 shadow-md hover:shadow-xl"
                >
                  <div className="bg-green-600 h-2" />
                  <div className="p-6">
                    <div className="flex items-center space-x-3 mb-4">
                      <img
                        src={platform.logo}
                        alt={`${platform.name} logo`}
                        className="h-10 w-auto object-contain"
                        onError={(e) => {
                          console.error(`Failed to load ${platform.name} logo`);
                          e.target.src = "/assets/fallback.png";
                        }}
                      />
                      <h3 className="text-xl font-semibold text-gray-900">{platform.name}</h3>
                    </div>
                    <p className="text-gray-600 text-sm">{platform.desc}</p>
                  </div>
                </div>
              ))}
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
