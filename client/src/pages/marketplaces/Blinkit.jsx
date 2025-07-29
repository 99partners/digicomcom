import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import {
  ArrowUp,
  HelpCircle,
  Shield,
  Package,
  CreditCard,
  User,
  Building,
  Check,
  ChevronRight
} from 'lucide-react';

const Blinkit = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <Helmet>
        <title>Blinkit Services | 99digicom</title>
        <meta
          name="description"
          content="Step-by-step Blinkit seller account setup guide. Register, verify, and list your products for hyperlocal delivery success."
        />
        <meta
          name="keywords"
          content="Blinkit seller, Blinkit setup, Blinkit partner, local delivery, grocery eCommerce"
        />
      </Helmet>

      {/* Scroll Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 z-50">
        <div
          className="h-full bg-gradient-to-r from-green-500 to-green-600"
          style={{ width: `${scrollProgress}%` }}
        ></div>
      </div>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 bg-green-600 text-white p-3 rounded-full shadow-lg hover:bg-green-700 transition z-40 animate-bounce-slow"
          aria-label="Scroll to top"
        >
          <ArrowUp size={24} />
        </button>
      )}

      <div className="min-h-screen pt-20 bg-gradient-to-br from-green-50 via-white to-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="flex items-center justify-center mb-10">
            <div className="bg-white p-4 rounded-xl shadow-md flex items-center">
              <div className="w-16 h-16 bg-yellow-500 rounded-md flex items-center justify-center mr-4">
                <span className="text-white text-2xl font-bold">B</span>
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Blinkit Seller Account Setup</h1>
                <p className="text-green-600">Your Fast Track to Hyperlocal Delivery</p>
              </div>
            </div>
          </div>

          {/* Overview */}
          <section className="mb-12">
            <div className="bg-white rounded-lg shadow-md p-8 border-l-4 border-green-500 hover:scale-105 transition duration-300">
              <div className="flex items-start">
                <div className="mr-6">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <HelpCircle className="h-6 w-6 text-green-600" />
                  </div>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-green-700 mb-2">Overview</h2>
                  <p className="text-gray-700">
                    Become a Blinkit partner and deliver your products to thousands of customers nearby. This guide helps you set up your Blinkit seller account from start to finish.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Requirements */}
          <section className="mb-12">
            <div className="bg-gradient-to-r from-green-50 to-green-100 border-l-4 border-green-500 p-8 rounded-lg shadow-lg hover:shadow-xl transition duration-300">
              <div className="flex items-start mb-4">
                <div className="mr-6">
                  <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                    <Check className="h-6 w-6 text-white" />
                  </div>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-green-700 mb-2">Requirements</h2>
                  <p className="text-gray-700 mb-4">You’ll need the following to register as a Blinkit Seller:</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { icon: <User className="h-5 w-5 text-green-600" />, label: 'Valid Business Email' },
                  { icon: <CreditCard className="h-5 w-5 text-green-600" />, label: 'Active Bank Account' },
                  { icon: <Shield className="h-5 w-5 text-green-600" />, label: 'GST Number (for taxable goods)' },
                  { icon: <Building className="h-5 w-5 text-green-600" />, label: 'Store/Business Address' },
                  { icon: <Package className="h-5 w-5 text-green-600" />, label: 'Inventory Ready to Ship' },
                  { icon: <span className="font-bold text-green-600">18+</span>, label: 'Age: 18 or above' }
                ].map((req, index) => (
                  <div key={index} className="flex items-center bg-white p-3 rounded-lg shadow-sm">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3">
                      {req.icon}
                    </div>
                    <span className="font-medium text-gray-800">{req.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Step-by-Step */}
          <section className="mb-12">
            <div className="text-center mb-10">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2 relative inline-block">
                Step-by-Step Setup Process
                <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-green-500 rounded-full"></span>
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Here’s how to become a Blinkit Seller step by step
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { step: 1, title: 'Visit Blinkit Seller Portal', details: 'Go to seller.blinkit.com to begin.' },
                { step: 2, title: 'Register Your Business', details: 'Fill in your email, phone, and location.' },
                { step: 3, title: 'Add Store Details', details: 'Add address, categories, and service radius.' },
                { step: 4, title: 'Upload Documents', details: 'GST, PAN, address proof, and photos.' },
                { step: 5, title: 'Verification Process', details: 'Verification takes 2–5 days.' },
                { step: 6, title: 'Setup Listings', details: 'Add items, pricing, and availability.' },
                { step: 7, title: 'Go Live', details: 'Start receiving orders on the Blinkit app.' },
                { step: 8, title: 'Start Delivering', details: 'Fulfill via Blinkit or your own logistics.' }
              ].map((step, index) => (
                <div key={index} className="bg-white rounded-2xl shadow-lg p-6 flex items-start hover:scale-105 transition duration-300 hover:shadow-xl">
                  <div className="h-12 w-12 flex items-center justify-center rounded-full bg-gradient-to-r from-green-500 to-green-600 text-white font-bold mr-4">
                    {step.step}
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-gray-900 mb-1">{step.title}</h3>
                    <p className="text-gray-600">{step.details}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* FAQ */}
          <section className="mb-12">
            <div className="bg-white rounded-lg shadow-md p-8 border-t-4 border-green-500">
              <div className="flex items-center mb-6">
                <div className="mr-4">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <HelpCircle className="h-6 w-6 text-green-600" />
                  </div>
                </div>
                <h2 className="text-2xl font-bold text-green-700">Common Questions</h2>
              </div>
              <div className="space-y-6">
                {[
                  { question: 'Is there a fee to join?', answer: 'Blinkit doesn’t charge a joining fee, but commissions apply.' },
                  { question: 'Do I need GST?', answer: 'Yes, GST is mandatory if your products are taxable.' },
                  { question: 'Can I manage my delivery?', answer: 'Yes, you can self-deliver or use Blinkit’s logistics.' },
                  { question: 'How long does onboarding take?', answer: 'Usually 2–5 business days after verification.' }
                ].map((item, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition">
                    <h3 className="font-semibold text-gray-900 mb-2">{item.question}</h3>
                    <p className="text-gray-700">{item.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* CTA */}
          <div className="text-center mt-12 mb-8">
            <div className="inline-block bg-gradient-to-r from-green-600 to-green-700 text-white font-bold text-xl py-4 px-8 rounded-full shadow-lg hover:scale-105 transition">
              Ready to Join Blinkit?
            </div>
            <p className="mt-4 text-gray-600">
              Our team can assist with registration and fast onboarding
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Blinkit;
