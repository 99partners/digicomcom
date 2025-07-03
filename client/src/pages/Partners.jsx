"use client"

import { Link } from "react-router-dom"
import {
  Users,
  TrendingUp,
  Globe,
  Headphones,
  CheckCircle,
  ArrowRight,
  DollarSign,
  Calendar,
  Star
} from "lucide-react"

const Partners = () => {
  const benefits = [
    {
      icon: Globe,
      title: "Multi-Platform Presence",
      description: "Sell on ONDC, Amazon, Flipkart, Meesho, Jiomart, Swiggy & Zomato — all through one simplified process."
    },
    {
      icon: Users,
      title: "End-to-End Support",
      description: "We handle setup, cataloging, fulfillment, and returns — so you can focus on growth."
    },
    {
      icon: TrendingUp,
      title: "Strategic Co-Branding",
      description: "Collaborate on joint promotions and bundle campaigns with complementary brands."
    },
    {
      icon: Headphones,
      title: "Performance Marketing Expertise",
      description: "Data-driven ads across e-commerce & social platforms with ROI-focused strategies."
    },
    {
      icon: Calendar,
      title: "Fast Onboarding",
      description: "Launch in 3–7 business days with our expert guidance and platform coordination."
    },
    {
      icon: CheckCircle,
      title: "Affordable, Transparent Pricing",
      description: "Startup-friendly rates, no hidden fees, and no long-term lock-ins."
    },
    {
      icon: Star,
      title: "Analytics & Insights",
      description: "Sales reports, ad metrics & platform data — all to guide smarter decisions."
    },
    {
      icon: DollarSign,
      title: "Dedicated Partner Success Team",
      description: "Get a relationship manager for ongoing support, campaign planning, and growth reviews."
    }
  ]

  const onboardingSteps = [
    {
      step: "1",
      title: "Fill the Partner Interest Form",
      description: "Tell us about your brand, products, and goals."
    },
    {
      step: "2",
      title: "Consultation & Category Assessment",
      description: "We analyze your business & recommend the best platforms."
    },
    {
      step: "3",
      title: "Documentation & Seller Account Setup",
      description: "We assist with GST, FSSAI, bank details & account creation."
    },
    {
      step: "4",
      title: "Catalog, Content & Pricing",
      description: "We help with listings, visuals, pricing, and shipping settings."
    },
    {
      step: "5",
      title: "Go Live & Start Selling",
      description: "Launch your store, receive support, and start fulfilling orders."
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white">
      {/* Hero */}
      <section className="pt-24 pb-16 px-4 bg-white text-center">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Why Partner with <span className="text-green-600">99digicom.com</span>?
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            We don't just offer a platform — we build partnerships. Empower your brand with visibility, support, and scale.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center px-8 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors"
          >
            Become a Partner Today
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 px-4 bg-green-50">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Benefits of Collaboration</h2>
          <p className="text-lg text-gray-600 mb-10">We simplify selling, boost your visibility, and fuel your growth.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon
              return (
                <div key={index} className="flex items-start space-x-4 p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                  <Icon className="h-6 w-6 text-green-600 mt-1" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{benefit.title}</h3>
                    <p className="text-gray-600 text-sm">{benefit.description}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Onboarding Process */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Partner Onboarding</h2>
          <p className="text-lg text-gray-600 mb-12">Start your journey with 99digicom in 5 easy steps</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {onboardingSteps.map((step, index) => (
              <div key={index} className="bg-green-50 p-6 rounded-lg shadow-lg text-center">
                <div className="w-12 h-12 bg-green-600 text-white font-bold flex items-center justify-center rounded-full mx-auto mb-4">
                  {step.step}
                </div>
                <h3 className="text-lg font-semibold text-gray-900">{step.title}</h3>
                <p className="text-sm text-gray-600 mt-2">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Commitments CTA */}
      <section className="py-16 px-4 bg-green-50 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">What We Expect from Our Partners</h2>
          <p className="text-lg text-gray-600 mb-6">Collaboration works best when both sides bring clarity and commitment.</p>
          <ul className="text-left text-sm text-gray-700 space-y-2 mx-auto max-w-2xl">
            <li>✅ Submit valid business documents like GST, PAN, FSSAI, etc.</li>
            <li>✅ Provide accurate product info and approve listings on time</li>
            <li>✅ Ensure product authenticity and comply with marketplace rules</li>
            <li>✅ Pack and dispatch orders promptly or coordinate with us for fulfillment</li>
            <li>✅ Prioritize customer satisfaction with good packaging and communication</li>
            <li>✅ (Optional) Participate in joint promotions and marketing campaigns</li>
          </ul>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Transparent Pricing</h2>
          <p className="text-lg text-gray-600 mb-10">No hidden costs. No long-term lock-ins.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="border rounded-lg p-6 shadow">
              <h3 className="font-semibold text-xl mb-2">One-Time Onboarding Fee</h3>
              <p className="text-green-600 font-bold text-2xl">From ₹4,999</p>
              <p className="text-sm text-gray-600 mt-2">Account setup, listing, dashboard access</p>
            </div>
            <div className="border rounded-lg p-6 shadow">
              <h3 className="font-semibold text-xl mb-2">Monthly Management</h3>
              <p className="text-green-600 font-bold text-2xl">From ₹3,500/mo</p>
              <p className="text-sm text-gray-600 mt-2">Platform support, updates, growth monitoring</p>
            </div>
            <div className="border rounded-lg p-6 shadow">
              <h3 className="font-semibold text-xl mb-2">Ad Budget (Optional)</h3>
              <p className="text-green-600 font-bold text-lg">Flexible</p>
              <p className="text-sm text-gray-600 mt-2">Customizable per campaign goals</p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 px-4 bg-green-50 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Let’s Grow, Together</h2>
          <p className="text-lg text-gray-700 mb-8">At 99digicom, we believe in shared success. Join us to build India’s most trusted digital commerce ecosystem.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-medium"
            >
              Apply to Become a Partner
            </Link>
            <Link
              to="/services"
              className="border border-green-600 text-green-600 hover:bg-green-600 hover:text-white px-8 py-3 rounded-lg font-medium"
            >
              Schedule a Free Consultation
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Partners
