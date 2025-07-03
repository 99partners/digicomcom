"use client"

import { useState } from "react"
import {
  Handshake,
  Target,
  Users,
  Megaphone,
  Gift,
  TrendingUp,
  CheckCircle,
  ArrowRight,
  Heart,
  Zap,
  Globe,
  BarChart3,
  Package,
  Calendar,
  Mail,
  Phone,
  ExternalLink,
} from "lucide-react"

import { useEffect } from "react";
const CoBranding = () => {
  // Scroll to top on component mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
// The rest of the component is below
}
export default CoBrandingPage;
function CoBrandingPage() {
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
  })

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await fetch('/api/co-branding/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
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
  }

  const handleCheckboxChange = (field, value, checked) => {
    setFormData((prev) => ({
      ...prev,
      [field]: checked ? [...prev[field], value] : prev[field].filter((item) => item !== value),
    }))
  }

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white">
      <section className="pt-24 pb-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center space-x-2 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Handshake className="h-4 w-4" />
            <span>Co-Branding Solutions</span>
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Grow faster, <span className="text-green-600">together.</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Unlock powerful growth opportunities through strategic brand collaborations and co-marketing campaigns.
          </p>
        </div>
      </section>

      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">🤝 What is Brand Collaboration?</h2>
            <p className="text-lg text-gray-600 max-w-4xl mx-auto">
              Brand collaboration is when two or more complementary brands come together to co-create campaigns, offers,
              and experiences that benefit both businesses. At 99digicom, we bring together brands that align in
              audience, values, or product offerings to amplify marketing efforts and boost visibility.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-green-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">🎯 How We Help You Collaborate</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We match your brand with the right partners and manage the co-marketing journey from idea to execution.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow p-6">
              <Target className="h-8 w-8 text-green-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Brand Matching & Partnership Planning</h3>
              <p className="text-gray-600">
                Identify synergy-based collaboration opportunities based on target audience and product fit.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow p-6">
              <Megaphone className="h-8 w-8 text-green-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Co-Branded Campaigns</h3>
              <p className="text-gray-600">
                Run joint digital campaigns across social media, marketplaces, and owned channels.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow p-6">
              <Package className="h-8 w-8 text-green-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Bundled Product Promotions</h3>
              <p className="text-gray-600">
                Create exclusive combo packs (e.g., organic food + spiritual products) to drive higher cart value.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow p-6">
              <Users className="h-8 w-8 text-green-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Influencer-Led Collaborations</h3>
              <p className="text-gray-600">Share influencer costs and audiences with partner brands to maximize ROI.</p>
            </div>

            <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow p-6">
              <Calendar className="h-8 w-8 text-green-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Thematic & Seasonal Marketing</h3>
              <p className="text-gray-600">
                Diwali, Holi, New Year, Raksha Bandhan, Independence Day — collaborate during high-traffic events.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">🌟 Benefits of Co-Marketing with 99digicom</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Globe, title: "Wider Reach", desc: "Access new customer segments through partner audiences" },
              {
                icon: TrendingUp,
                title: "Shared Marketing Costs",
                desc: "Split campaign expenses and increase effectiveness",
              },
              { icon: Zap, title: "Creative Innovation", desc: "Co-create fresh, engaging content and offers" },
              { icon: BarChart3, title: "Higher Sales", desc: "Bundled and cross-promoted products convert better" },
              { icon: Heart, title: "Increased Brand Trust", desc: "Leverage the goodwill of complementary brands" },
            ].map((benefit, index) => (
              <div
                key={index}
                className="flex items-start space-x-4 p-6 rounded-lg bg-green-50 hover:bg-green-100 transition-colors"
              >
                <benefit.icon className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                  <p className="text-gray-600 text-sm">{benefit.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-green-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">👥 Who Should Collaborate?</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              "D2C and niche brands looking to grow visibility",
              "Wellness, spiritual, organic, handmade, fashion, and lifestyle brands",
              "Sellers on ONDC, Amazon, Flipkart, Jiomart, etc. wanting joint promotions",
              "Businesses with an existing customer base looking to co-sell or co-create content",
            ].map((item, index) => (
              <div key={index} className="flex items-center space-x-3">
                <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                <p className="text-gray-700">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">🧩 Example Collaborations</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Organic Tea + Handmade Mugs", subtitle: "Wellness Hamper Campaign" },
              { title: "Spiritual Products + Books", subtitle: '"Mindfulness Kit" for Diwali' },
              { title: "Festive Combo", subtitle: "Fashion Accessories + Eco-Friendly Gifts" },
              { title: "Zomato/Swiggy Tie-Up", subtitle: "Food + Festival Kits featuring partner brands" },
            ].map((example, index) => (
              <div
                key={index}
                className="bg-white border-2 border-green-200 hover:border-green-400 transition-colors rounded-lg p-6"
              >
                <Gift className="h-8 w-8 text-green-600 mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{example.title}</h3>
                <p className="text-gray-600 text-sm">{example.subtitle}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-green-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">🌟 Key Features of Our Co-Branding Solution</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Multiply your marketing power, share your success. Our co-branding solution is designed to help brands
              collaborate efficiently, expand their reach, and create memorable customer experiences — without bearing
              the full cost alone.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {[
              {
                number: "1️⃣",
                title: "Shared Audience Access",
                points: [
                  "Tap into the customer base of your co-branding partner",
                  "Reach new demographics that already trust your collaborator",
                  "Build awareness in new regions or customer segments",
                ],
              },
              {
                number: "2️⃣",
                title: "Joint Marketing Campaigns",
                points: [
                  "Run co-branded promotions across social media, email, marketplaces, and more",
                  "Benefit from combined budgets for greater reach",
                  "Cross-promote through newsletters and influencer partnerships",
                ],
              },
              {
                number: "3️⃣",
                title: "Customized Offer Creation",
                points: [
                  "Develop bundled offers tailored to festive seasons or themes",
                  "Create exclusive product combos for higher conversions",
                  "Design co-branded gift packs for special events",
                ],
              },
              {
                number: "4️⃣",
                title: "Performance Tracking & Optimization",
                points: [
                  "Monitor campaign performance with detailed analytics",
                  "Optimize promotions based on real-time data",
                  "Measure ROI and customer acquisition metrics",
                ],
              },
            ].map((feature, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <span className="text-2xl">{feature.number}</span>
                  <h3 className="text-lg font-semibold text-gray-900">{feature.title}</h3>
                </div>
                <ul className="space-y-2 text-gray-600">
                  {feature.points.map((point, idx) => (
                    <li key={idx} className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">💰 Co-Branding Plans</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Choose a plan that fits your collaboration goals and budget.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="border-2 border-green-200 rounded-lg hover:border-green-400 transition-colors">
              <div className="p-6 text-center">
                <h4 className="text-xl font-semibold">Collaborate</h4>
                <p className="text-sm text-gray-600">Start with co-branding</p>
                <div className="text-2xl font-bold text-green-600 mt-2">₹9,999/year</div>
                <ul className="space-y-2 text-sm text-gray-600 mt-4">
                  <li className="flex items-center justify-center"><CheckCircle className="h-4 w-4 text-green-600 mr-2" /> 1 Brand Collaboration</li>
                  <li className="flex items-center justify-center"><CheckCircle className="h-4 w-4 text-green-600 mr-2" /> Limited Cross-Promotion on 99digicom.com</li>
                  <li className="flex items-center justify-center"><CheckCircle className="h-4 w-4 text-green-600 mr-2" /> Email Support</li>
                </ul>
                <p className="text-xs text-gray-500 mt-4">*Additional features like co-branded packaging available as add-ons</p>
              </div>
            </div>
            <div className="border-2 border-green-400 rounded-lg relative">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-green-600 text-white px-4 py-1 rounded-full text-sm font-medium">Popular</span>
              </div>
              <div className="p-6 text-center">
                <h4 className="text-xl font-semibold">Boost</h4>
                <p className="text-sm text-gray-600">Scale your collaborations</p>
                <div className="text-2xl font-bold text-green-600 mt-2">₹24,999/year</div>
                <ul className="space-y-2 text-sm text-gray-600 mt-4">
                  <li className="flex items-center justify-center"><CheckCircle className="h-4 w-4 text-green-600 mr-2" /> 3 Brand Collaborations</li>
                  <li className="flex items-center justify-center"><CheckCircle className="h-4 w-4 text-green-600 mr-2" /> 1 Joint Campaign / Quarter</li>
                  <li className="flex items-center justify-center"><CheckCircle className="h-4 w-4 text-green-600 mr-2" /> Standard Cross-Promotion on 99digicom.com</li>
                  <li className="flex items-center justify-center"><CheckCircle className="h-4 w-4 text-green-600 mr-2" /> Custom Landing Page</li>
                  <li className="flex items-center justify-center"><CheckCircle className="h-4 w-4 text-green-600 mr-2" /> Quarterly Review & Strategy</li>
                  <li className="flex items-center justify-center"><CheckCircle className="h-4 w-4 text-green-600 mr-2" /> Email + Chat Support</li>
                </ul>
                <p className="text-xs text-gray-500 mt-4">*Co-branded packaging available as add-on</p>
              </div>
            </div>
            <div className="border-2 border-green-200 rounded-lg hover:border-green-400 transition-colors">
              <div className="p-6 text-center">
                <h4 className="text-xl font-semibold">Premium Collab</h4>
                <p className="text-sm text-gray-600">Maximize your reach</p>
                <div className="text-2xl font-bold text-green-600 mt-2">₹59,999/year</div>
                <ul className="space-y-2 text-sm text-gray-600 mt-4">
                  <li className="flex items-center justify-center"><CheckCircle className="h-4 w-4 text-green-600 mr-2" /> Unlimited Brand Collaborations</li>
                  <li className="flex items-center justify-center"><CheckCircle className="h-4 w-4 text-green-600 mr-2" /> Monthly Joint Campaigns</li>
                  <li className="flex items-center justify-center"><CheckCircle className="h-4 w-4 text-green-600 mr-2" /> Co-Branded Packaging Design</li>
                  <li className="flex items-center justify-center"><CheckCircle className="h-4 w-4 text-green-600 mr-2" /> Featured Cross-Promotion on 99digicom.com</li>
                  <li className="flex items-center justify-center"><CheckCircle className="h-4 w-4 text-green-600 mr-2" /> Custom Landing Page</li>
                  <li className="flex items-center justify-center"><CheckCircle className="h-4 w-4 text-green-600 mr-2" /> Quarterly Review & Strategy</li>
                  <li className="flex items-center justify-center"><CheckCircle className="h-4 w-4 text-green-600 mr-2" /> Dedicated Manager</li>
                </ul>
                <p className="text-xs text-gray-500 mt-4">*All features included</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">📝 Apply for Co-Branding</h2>
            <p className="text-lg text-gray-600">
              Ready to explore collaboration opportunities? Fill out the form below to get started.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-xl p-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Business Details */}
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <span className="mr-2">🧾</span> Business Details
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Brand Name *</label>
                    <input
                      type="text"
                      value={formData.brandName}
                      onChange={(e) => handleInputChange("brandName", e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Website / Online Store Link (Optional)</label>
                    <input
                      type="url"
                      value={formData.website}
                      onChange={(e) => handleInputChange("website", e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Registered Business Name (Optional)
                    </label>
                    <input
                      type="text"
                      value={formData.registeredName}
                      onChange={(e) => handleInputChange("registeredName", e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Business Type *</label>
                    <select
                      value={formData.businessType}
                      onChange={(e) => handleInputChange("businessType", e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      required
                    >
                      <option value="">Select business type</option>
                      <option value="individual">Individual Seller</option>
                      <option value="pvt-ltd">Private Limited Company</option>
                      <option value="partnership">Partnership</option>
                      <option value="llp">LLP</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Product Details */}
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <span className="mr-2">📦</span> Product Details
                </h3>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Product Categories (Select all that apply) *
                    </label>
                    <div className="grid md:grid-cols-2 gap-3">
                      {[
                        "Organic & Natural Products",
                        "Spiritual Products",
                        "Handmade & Artisan Goods",
                        "Fashion & Lifestyle",
                        "Food & Beverages",
                        "Home & Living",
                        "Beauty & Personal Care",
                        "Other",
                      ].map((category) => (
                        <div key={category} className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            id={category}
                            checked={formData.productCategories.includes(category)}
                            onChange={(e) => handleCheckboxChange("productCategories", category, e.target.checked)}
                            className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                          />
                          <label htmlFor={category} className="text-sm text-gray-700">
                            {category}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Top 3 Selling Products (Optional)</label>
                    <textarea
                      value={formData.topProducts}
                      onChange={(e) => handleInputChange("topProducts", e.target.value)}
                      placeholder="List your top 3 selling products..."
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    />
                  </div>
                </div>
              </div>

              {/* Market Presence */}
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <span className="mr-2">📈</span> Market Presence
                </h3>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      E-commerce Platforms You Sell On *
                    </label>
                    <div className="grid md:grid-cols-2 gap-3">
                      {[
                        "Digicom",
                        "ONDC",
                        "Amazon",
                        "Flipkart",
                        "Meesho",
                        "Jiomart",
                        "Zomato",
                        "Swiggy",
                        "Own Website",
                        "Other",
                      ].map((platform) => (
                        <div key={platform} className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            id={platform}
                            checked={formData.platforms.includes(platform)}
                            onChange={(e) => handleCheckboxChange("platforms", platform, e.target.checked)}
                            className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                          />
                          <label htmlFor={platform} className="text-sm text-gray-700">
                            {platform}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Monthly Online Sales Volume (Optional)
                    </label>
                    <select
                      value={formData.salesVolume}
                      onChange={(e) => handleInputChange("salesVolume", e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    >
                      <option value="">Select sales volume</option>
                      <option value="less-50k">Less than ₹50,000</option>
                      <option value="50k-2l">₹50,000 – ₹2,00,000</option>
                      <option value="2l-5l">₹2,00,000 – ₹5,00,000</option>
                      <option value="5l-plus">₹5,00,000+</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Marketing Goals */}
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <span className="mr-2">📊</span> Marketing Goals
                </h3>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      What are you looking for in a co-branding collaboration? *
                    </label>
                    <div className="grid md:grid-cols-2 gap-3">
                      {[
                        "Cross-promotion on social media",
                        "Co-branded gift packs / combos",
                        "Joint festival campaigns",
                        "Influencer-led promotions",
                        "Co-branded packaging",
                        "Custom landing page",
                        "Other",
                      ].map((goal) => (
                        <div key={goal} className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            id={goal}
                            checked={formData.marketingGoals.includes(goal)}
                            onChange={(e) => handleCheckboxChange("marketingGoals", goal, e.target.checked)}
                            className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                          />
                          <label htmlFor={goal} className="text-sm text-gray-700">
                            {goal}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Target Audience *</label>
                      <input
                        type="text"
                        value={formData.targetAudience}
                        onChange={(e) => handleInputChange("targetAudience", e.target.value)}
                        placeholder="e.g., Urban millennials, wellness-focused women, spiritual seekers"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <span className="mr-2">📱</span> Social Media Presence (Optional)
                </h3>
                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Instagram Handle</label>
                    <input
                      type="text"
                      value={formData.instagram}
                      onChange={(e) => handleInputChange("instagram", e.target.value)}
                      placeholder="@yourbrand"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Facebook Page</label>
                    <input
                      type="text"
                      value={formData.facebook}
                      onChange={(e) => handleInputChange("facebook", e.target.value)}
                      placeholder="Facebook page URL"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">YouTube Channel</label>
                    <input
                      type="text"
                      value={formData.youtube}
                      onChange={(e) => handleInputChange("youtube", e.target.value)}
                      placeholder="YouTube channel URL"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    />
                  </div>
                </div>
              </div>

              {/* Additional Notes */}
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <span className="mr-2">💬</span> Additional Notes or Specific Ideas
                </h3>
                <textarea
                  value={formData.additionalNotes}
                  onChange={(e) => handleInputChange("additionalNotes", e.target.value)}
                  placeholder='E.g., "We want to launch a wellness gift pack for Diwali with a complementary brand."'
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                />
              </div>

              {/* Consent */}
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="consent"
                  checked={formData.consent}
                  onChange={(e) => handleInputChange("consent", e.target.checked)}
                  className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                  required
                />
                <label htmlFor="consent" className="text-sm text-gray-700">
                  I agree to be contacted by 99digicom's team for co-branding opportunities. *
                </label>
              </div>

              {/* Submit */}
              <div className="text-center">
                <button
                  type="submit"
                  className="inline-flex items-center px-8 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors"
                >
                  Submit Application
                  <ArrowRight className="ml-2 h-5 w-5" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  )
}