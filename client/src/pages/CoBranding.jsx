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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/co-branding/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (data.success) {
        alert('Thank you for your application! We will contact you soon.');
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
        alert('Error submitting application. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error submitting application. Please try again.');
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
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white">
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center space-x-2 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Handshake className="h-4 w-4" />
            <span>Co-Branding Solutions</span>
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Unlock New Growth Opportunities Through <span className="text-green-600">Brand Collaboration</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Collaborate with our network of digital-first brands to create mutual value and reach wider audiences.
          </p>
          <a
            href="#get-started"
            className="inline-flex items-center px-8 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors"
          >
            Start Collaborating
            <ArrowRight className="ml-2 h-5 w-5" />
          </a>
        </div>
      </section>

      {/* Brand Collaborations Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Brand Collaborations & Co-Marketing</h2>
            <p className="text-lg text-gray-600 max-w-4xl mx-auto">
              We bring brands together to do more.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow p-6">
              <Gift className="h-8 w-8 text-green-600 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Niche Product Collaborations</h3>
              <p className="text-gray-600 text-sm">Create unique product offerings through strategic partnerships.</p>
            </div>
            <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow p-6">
              <Users className="h-8 w-8 text-green-600 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Shared Loyalty Programs</h3>
              <p className="text-gray-600 text-sm">Build customer loyalty across complementary brands.</p>
            </div>
            <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow p-6">
              <ShoppingCart className="h-8 w-8 text-green-600 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Co-branded Storefronts</h3>
              <p className="text-gray-600 text-sm">Create unified digital shopping experiences.</p>
            </div>
            <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow p-6">
              <Share2 className="h-8 w-8 text-green-600 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Co-created Content</h3>
              <p className="text-gray-600 text-sm">Develop engaging campaigns that resonate with both audiences.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-green-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Features of Co-Branding Solution</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our co-branding solution is designed to deliver maximum value for your brand.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg p-6">
              <Users className="h-8 w-8 text-green-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Shared Customer Bases</h3>
              <p className="text-gray-600">Tap into partner audiences and expand your market reach effectively.</p>
            </div>
            <div className="bg-white rounded-lg p-6">
              <Zap className="h-8 w-8 text-green-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Joint Promotions</h3>
              <p className="text-gray-600">Create bundled products or run festive campaigns together for maximum impact.</p>
            </div>
            <div className="bg-white rounded-lg p-6">
              <Globe className="h-8 w-8 text-green-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Cross-platform Exposure</h3>
              <p className="text-gray-600">Get visibility across partner marketplaces and marketing channels.</p>
            </div>
            <div className="bg-white rounded-lg p-6">
              <Target className="h-8 w-8 text-green-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Mutual Brand Lift</h3>
              <p className="text-gray-600">Strengthen trust and relevance through strategic brand associations.</p>
            </div>
          </div>
          <div className="mt-8 bg-white rounded-lg p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Use Case Example</h3>
            <p className="text-gray-600">
              A spiritual brand partnering with an organic food brand to launch a "Wellness Hamper" during Diwali, combining wellness products with festive treats.
            </p>
          </div>
        </div>
      </section>

      {/* Apply Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Apply for Co-Branding</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
            Interested in exploring a co-branding opportunity? Fill out our quick form to tell us about your brand, target audience, and collaboration goals. Our team will get in touch to explore the best-fit opportunities for you.
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
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Apply for Co-Branding</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
              Interested in exploring a co-branding opportunity? Fill out our quick form to tell us about your brand, target audience, and collaboration goals. Our team will get in touch to explore the best-fit opportunities for you.
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

      {/* Benefits */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Benefits of Co-Branding</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Partnering with 99digicom opens new opportunities for your brand.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <Globe className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Expanded Audience</h4>
                  <p className="text-gray-600 text-sm">Reach our established customer base across platforms.</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <Gift className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Cross-Promotions</h4>
                  <p className="text-gray-600 text-sm">Feature in our campaigns and promotions.</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <Users className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Shared Expertise</h4>
                  <p className="text-gray-600 text-sm">Leverage our e-commerce and marketing know-how.</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <TrendingUp className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Cost-Effective Growth</h4>
                  <p className="text-gray-600 text-sm">Maximize ROI with shared campaign costs.</p>
                </div>
              </div>
            </div>
            <div className="bg-green-50 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">How It Works</h3>
              <ol className="text-gray-600 text-sm space-y-2">
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                  Submit your application
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                  We review and align goals
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                  Launch co-branded campaigns
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                  Track results together
                </li>
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* Success Story */}
      <section className="py-16 px-4 bg-green-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Success Story</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              How a fashion brand grew its reach by 200% with our co-branding efforts.
            </p>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-lg">
            <p className="text-gray-600">
              By partnering with 99digicom, a fashion brand featured in our co-branded social media campaigns and cross-promotions, achieving a 200% increase in brand visibility and a 50% sales boost in six months.
            </p>
          </div>
        </div>
      </section>

      {/* Supported Platforms */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Supported Marketplaces</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { name: "Amazon", desc: "World's largest e-commerce platform" },
              { name: "Flipkart", desc: "India's leading e-commerce marketplace" },
              { name: "Meesho", desc: "Social commerce platform" },
              { name: "Jiomart", desc: "Reliance's digital commerce platform" },
              { name: "IndiaMART", desc: "B2B marketplace for Indian businesses" },
              { name: "Snapdeal", desc: "Popular e-commerce platform" },
            ].map((platform, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow text-center p-6">
                <div className="w-12 h-12 bg-green-100 text-green-600 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <ShoppingCart className="h-6 w-6" />
                </div>
                <h4 className="text-lg font-semibold text-gray-900">{platform.name}</h4>
                <p className="text-gray-600 text-sm">{platform.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

     
    </div>
  );
}