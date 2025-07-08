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
            Collaborate With Us to <span className="text-green-600">Reach New Audiences</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Join hands with 99digicom and be part of high-visibility campaigns.
          </p>
          <a
            href="#get-started"
            className="inline-flex items-center px-8 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors"
          >
            Explore Plans from ₹24,999/year
            <ArrowRight className="ml-2 h-5 w-5" />
          </a>
        </div>
      </section>

      {/* Why Co-Branding */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Co-Branding with 99digicom?</h2>
            <p className="text-lg text-gray-600 max-w-4xl mx-auto">
              Amplify your brand through strategic partnerships that deliver results.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow p-6">
              <Globe className="h-8 w-8 text-green-600 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Wider Reach</h3>
              <p className="text-gray-600 text-sm">Tap into our network to reach new audiences.</p>
            </div>
            <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow p-6">
              <TrendingUp className="h-8 w-8 text-green-600 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Increased Sales</h3>
              <p className="text-gray-600 text-sm">Boost revenue with co-branded campaigns.</p>
            </div>
            <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow p-6">
              <Heart className="h-8 w-8 text-green-600 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Build Trust</h3>
              <p className="text-gray-600 text-sm">Leverage our reputation for credibility.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Co-Branding Plans */}
      <section className="py-16 px-4 bg-green-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Co-Branding Plans</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Choose a plan that fits your brand’s goals and budget.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow-lg p-6 text-center">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Basic</h3>
              <p className="text-2xl font-bold text-green-600 mb-4">₹24,999/year</p>
              <ul className="text-gray-600 text-sm space-y-2 mb-6">
                <li className="flex items-center justify-center">
                  <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                  Co-branded social media posts
                </li>
                <li className="flex items-center justify-center">
                  <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                  1 co-branded campaign
                </li>
                <li className="flex items-center justify-center">
                  <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                  Basic analytics report
                </li>
              </ul>
              <a
                href="#get-started"
                className="inline-flex items-center px-6 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors"
              >
                Choose Basic
              </a>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6 text-center border-2 border-green-400">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Growth</h3>
              <p className="text-2xl font-bold text-green-600 mb-4">₹49,999/year</p>
              <ul className="text-gray-600 text-sm space-y-2 mb-6">
                <li className="flex items-center justify-center">
                  <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                  Everything in Basic
                </li>
                <li className="flex items-center justify-center">
                  <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                  3 co-branded campaigns
                </li>
                <li className="flex items-center justify-center">
                  <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                  Dedicated campaign manager
                </li>
                <li className="flex items-center justify-center">
                  <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                  Detailed analytics report
                </li>
              </ul>
              <a
                href="#get-started"
                className="inline-flex items-center px-6 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors"
              >
                Choose Growth
              </a>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6 text-center">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Premium</h3>
              <p className="text-2xl font-bold text-green-600 mb-4">₹99,999/year</p>
              <ul className="text-gray-600 text-sm space-y-2 mb-6">
                <li className="flex items-center justify-center">
                  <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                  Everything in Growth
                </li>
                <li className="flex items-center justify-center">
                  <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                  5 co-branded campaigns
                </li>
                <li className="flex items-center justify-center">
                  <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                  Custom creative assets
                </li>
                <li className="flex items-center justify-center">
                  <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                  Priority support
                </li>
              </ul>
              <a
                href="#get-started"
                className="inline-flex items-center px-6 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors"
              >
                Choose Premium
              </a>
            </div>
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