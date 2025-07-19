"use client";

import { useState, useEffect } from "react";
import {
  Handshake,
  CheckCircle,
  ArrowRight,
  Globe,
  TrendingUp,
  Heart,
  Gift,
  Users,
  ShoppingCart,
  Zap,
  Target,
  Share2,
} from "lucide-react";
import { Helmet } from "react-helmet";
import COB1 from "../assets/COB1.png";
import COB2 from "../assets/COB2.png";
import COB3 from "../assets/COB3.png";
import COB4 from "../assets/COB4.png";
import ImageSlider from '../components/ImageSlider';

export default function CoBranding() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [formData, setFormData] = useState({
    brandName: "",
    website: "",
    registeredName: "",
    businessType: "",
    productCategories: [],
    topProducts: "",
    platforms: [],
    salesVolume: "",
    marketingGoals: [],
    targetAudience: "",
    timeline: "",
    instagram: "",
    facebook: "",
    youtube: "",
    additionalNotes: "",
    consent: false,
  });

  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      src: COB1,
      alt: "Niche Product Collaborations illustration",
      title: "Niche Product Collaborations",
      description:
        "Create unique product offerings through strategic partnerships.",
    },
    {
      src: COB2,
      alt: "Shared Loyalty Programs illustration",
      title: "Shared Loyalty Programs",
      description: "Build customer loyalty across complementary brands.",
    },
    {
      src: COB3,
      alt: "Co-branded Storefronts illustration",
      title: "Co-branded Storefronts",
      description: "Create unified digital shopping experiences.",
    },
    {
      src: COB4,
      alt: "Co-created Content illustration",
      title: "Co-created Content",
      description:
        "Develop engaging campaigns that resonate with both audiences.",
    },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/co-branding/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (data.success) {
        alert("Thank you for your application! We will contact you soon.");
        setFormData({
          brandName: "",
          website: "",
          registeredName: "",
          businessType: "",
          productCategories: [],
          topProducts: "",
          platforms: [],
          salesVolume: "",
          marketingGoals: [],
          targetAudience: "",
          timeline: "",
          instagram: "",
          facebook: "",
          youtube: "",
          additionalNotes: "",
          consent: false,
        });
      } else {
        alert("Error submitting application. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error submitting application. Please try again.");
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
      <Helmet>
        <title>Co-Branding Solutions & Brand Collaborations | 99digicom</title>
        <meta
          name="description"
          content="Partner with digital-first brands through our co-branding solutions. Create mutual value, reach wider audiences, and unlock new growth opportunities through strategic brand collaborations."
        />
        <meta
          name="keywords"
          content="co-branding, brand collaboration, marketing partnerships, joint promotions, brand partnerships, digital marketing"
        />
        <link rel="canonical" href="https://99digicom.com/co-branding" />
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "Service",
              "name": "Co-Branding Solutions",
              "provider": {
                "@type": "Organization",
                "name": "99digicom"
              },
              "description": "Strategic brand collaboration and co-marketing services for digital-first brands",
              "serviceType": "Marketing Service",
              "areaServed": "India"
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
              <Handshake className="h-4 w-4" aria-hidden="true" />
              <span>Co-Branding Solutions</span>
            </div>
            <h1
              id="hero-heading"
              className="text-5xl font-bold text-gray-900 mb-6"
            >
              Unlock New Growth Opportunities Through{" "}
              <span className="text-green-600">Brand Collaboration</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Collaborate with our network of digital-first brands to create
              mutual value and reach wider audiences.
            </p>
            <a
              href="#get-started"
              className="inline-flex items-center px-8 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors"
              aria-label="Start your co-branding collaboration"
            >
              Start Collaborating
              <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
            </a>
          </div>
        </section>

        {/* Features Section */}
        <section
          aria-labelledby="features-heading"
          className="py-16 px-4 bg-green-50"
        >
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2
                id="features-heading"
                className="text-3xl font-bold text-gray-900 mb-4"
              >
                Features of Co-Branding Solution
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Our co-branding solution is designed to deliver maximum value
                for your brand.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-8" role="list">
              {[
                {
                  icon: (
                    <Users
                      className="h-8 w-8 text-green-600 mb-4"
                      aria-hidden="true"
                    />
                  ),
                  title: "Shared Customer Bases",
                  description:
                    "Tap into partner audiences and expand your market reach effectively.",
                },
                {
                  icon: (
                    <Zap
                      className="h-8 w-8 text-green-600 mb-4"
                      aria-hidden="true"
                    />
                  ),
                  title: "Joint Promotions",
                  description:
                    "Create bundled products or run festive campaigns together for maximum impact.",
                },
                {
                  icon: (
                    <Globe
                      className="h-8 w-8 text-green-600 mb-4"
                      aria-hidden="true"
                    />
                  ),
                  title: "Cross-platform Exposure",
                  description:
                    "Get visibility across partner marketplaces and marketing channels.",
                },
                {
                  icon: (
                    <Target
                      className="h-8 w-8 text-green-600 mb-4"
                      aria-hidden="true"
                    />
                  ),
                  title: "Mutual Brand Lift",
                  description:
                    "Strengthen trust and relevance through strategic brand associations.",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg p-6"
                  role="listitem"
                >
                  {item.icon}
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {item.title}
                  </h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              ))}
            </div>
            <div className="mt-8 bg-white rounded-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Use Case Example
              </h3>
              <p className="text-gray-600">
                A spiritual brand partnering with an organic food brand to
                launch a "Wellness Hamper" during Diwali, combining wellness
                products with festive treats.
              </p>
            </div>
          </div>
        </section>

        {/* Brand Collaborations Section */}
        <section
          aria-labelledby="collaborations-heading"
          className="py-16 px-4 bg-white"
        >
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2
                id="collaborations-heading"
                className="text-3xl font-bold text-gray-900 mb-4"
              >
                Brand Collaborations & Co-Marketing
              </h2>
              <p className="text-lg text-gray-600 max-w-4xl mx-auto">
                We bring brands together to do more.
              </p>
            </div>
            <ImageSlider slides={steps} />
          </div>
        </section>

        {/* Apply Section */}
        <section className="py-16 px-4 bg-white">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Apply for Co-Branding
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
              Interested in exploring a co-branding opportunity? Fill out our
              quick form to tell us about your brand, target audience, and
              collaboration goals. Our team will get in touch to explore the
              best-fit opportunities for you.
            </p>
            <a
              href="#get-started"
              className="inline-flex items-center px-8 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors"
            >
              Start Application
              <ArrowRight className="ml-2 h-5 w-5" />
            </a>
          </div>
        </section>

        {/* Application Form */}
        <section className="py-16 px-4 bg-green-50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Apply for Co-Branding
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
                Interested in exploring a co-branding opportunity? Fill out our
                quick form to tell us about your brand, target audience, and
                collaboration goals. Our team will get in touch to explore the
                best-fit opportunities for you.
              </p>
              <a
                href="#get-started"
                className="inline-flex items-center px-8 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors"
              >
                Start Application
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </div>
          </div>
        </section>

        {/* Success Story */}
        <section
          aria-labelledby="success-story-heading"
          className="py-16 px-4 bg-green-50"
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
                How a fashion brand grew its reach by 200% with our co-branding
                efforts.
              </p>
            </div>
            <blockquote className="bg-white rounded-lg p-6 shadow-lg">
              <p className="text-gray-600">
                By partnering with 99digicom, a fashion brand featured in our
                co-branded social media campaigns and cross-promotions,
                achieving a 200% increase in brand visibility and a 50% sales
                boost in six months.
              </p>
            </blockquote>
          </div>
        </section>

        {/* Supported Platforms */}
        <section
          aria-labelledby="platforms-heading"
          className="py-16 px-4 bg-white"
        >
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2
                id="platforms-heading"
                className="text-3xl font-bold text-gray-900 mb-4"
              >
                Supported Marketplaces
              </h2>
            </div>
            <div
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
              role="list"
            >
              {[
                { name: "Amazon", desc: "World's largest e-commerce platform" },
                {
                  name: "Flipkart",
                  desc: "India's leading e-commerce marketplace",
                },
                { name: "Meesho", desc: "Social commerce platform" },
                {
                  name: "Jiomart",
                  desc: "Reliance's digital commerce platform",
                },
                {
                  name: "IndiaMART",
                  desc: "B2B marketplace for Indian businesses",
                },
                { name: "Snapdeal", desc: "Popular e-commerce platform" },
              ].map((platform, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow text-center p-6"
                  role="listitem"
                >
                  <div
                    className="w-12 h-12 bg-green-100 text-green-600 rounded-lg flex items-center justify-center mx-auto mb-2"
                    aria-hidden="true"
                  >
                    <ShoppingCart className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {platform.name}
                  </h3>
                  <p className="text-gray-600 text-sm">{platform.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section
          aria-labelledby="benefits-heading"
          className="py-16 px-4 bg-white"
        >
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2
                id="benefits-heading"
                className="text-3xl font-bold text-gray-900 mb-4"
              >
                Benefits of Co-Branding
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Partnering with 99digicom opens new opportunities for your
                brand.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6" role="list">
                {[
                  {
                    icon: (
                      <Globe
                        className="h-6 w-6 text-green-600 mt-1 flex-shrink-0"
                        aria-hidden="true"
                      />
                    ),
                    title: "Expanded Audience",
                    description:
                      "Reach our established customer base across platforms.",
                  },
                  {
                    icon: (
                      <Gift
                        className="h-6 w-6 text-green-600 mt-1 flex-shrink-0"
                        aria-hidden="true"
                      />
                    ),
                    title: "Cross-Promotions",
                    description: "Feature in our campaigns and promotions.",
                  },
                  {
                    icon: (
                      <Users
                        className="h-6 w-6 text-green-600 mt-1 flex-shrink-0"
                        aria-hidden="true"
                      />
                    ),
                    title: "Shared Expertise",
                    description:
                      "Leverage our e-commerce and marketing know-how.",
                  },
                  {
                    icon: (
                      <TrendingUp
                        className="h-6 w-6 text-green-600 mt-1 flex-shrink-0"
                        aria-hidden="true"
                      />
                    ),
                    title: "Cost-Effective Growth",
                    description: "Maximize ROI with shared campaign costs.",
                  },
                ].map((benefit, index) => (
                  <div
                    key={index}
                    className="flex items-start space-x-4"
                    role="listitem"
                  >
                    {benefit.icon}
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">
                        {benefit.title}
                      </h4>
                      <p className="text-gray-600 text-sm">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="bg-green-50 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  How It Works
                </h3>
                <ol className="text-gray-600 text-sm space-y-2" role="list">
                  {[
                    "Submit your application",
                    "We review and align goals",
                    "Launch co-branded campaigns",
                    "Track results together",
                  ].map((step, index) => (
                    <li
                      key={index}
                      className="flex items-center"
                      role="listitem"
                    >
                      <CheckCircle
                        className="h-4 w-4 text-green-600 mr-2"
                        aria-hidden="true"
                      />
                      {step}
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
