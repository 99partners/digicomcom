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
  ChevronRight,
  Plus,
  X
} from 'lucide-react';
import BlinkitLogo from '../../assets/Blinkit.png';

const Blinkit = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [openCategory, setOpenCategory] = useState(null);
  const [openQuestions, setOpenQuestions] = useState({});

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

  const handleToggle = (idx) => {
    setOpenCategory(openCategory === idx ? null : idx);
  };
  const handleQuestionToggle = (catIdx, qIdx) => {
    setOpenQuestions((prev) => ({
      ...prev,
      [catIdx]: prev[catIdx] === qIdx ? null : qIdx
    }));
  };
  const faqCategories = [
    {
      title: 'General',
      faqs: [
        { q: 'What is Blinkit and what products do they offer?', a: 'Blinkit is India’s hyper-local delivery service (formerly Grofers), delivering over 7,000 products including groceries, fresh produce, bakery items, meat & seafood, personal care, baby care, electronics, snacks and more.' },
        { q: 'In which cities does Blinkit operate?', a: 'Blinkit is available in over 100 cities across India—including Ahmedabad, Bengaluru, Delhi, Mumbai, Kolkata, Chennai, Lucknow, Vadodara, Jaipur, Bhavnagar and more.' },
      ]
    },
    {
      title: 'Delivery',
      faqs: [
        { q: 'How does Blinkit deliver within 10 minutes?', a: 'Blinkit uses dense networks of micro warehouses (partner stores) across every ~2 km to pick, pack, and dispatch orders within 2 minutes after checkout, achieving delivery typically within 10 minutes.' },
        { q: 'Does Blinkit charge for delivery?', a: 'Delivery charges vary by store and location; fees are displayed at checkout before confirming your order.' },
        { q: 'Can I change the delivery address after placing an order?', a: 'Currently, changing delivery address post-order placement is not supported via the app. You may cancel if needed before processing begins.' },
        { q: 'Does Blinkit deliver during the night?', a: 'Night-time delivery (12 AM–6 AM) is available in select areas in cities like Delhi, Mumbai, Bengaluru, Chandigarh, Jalandhar, Ludhiana, Ghaziabad, and others.' },
      ]
    },
    {
      title: 'Product Coverage',
      faqs: [
        { q: 'Does Blinkit deliver sensitive items like sanitary pads or condoms?', a: 'Yes—orders of condoms and sanitary pads are delivered across all operating cities, in discreet packaging to ensure privacy.' },
        { q: 'Can I order ice creams or frozen items?', a: 'Yes—blinkit delivers ice creams and frozen desserts from brands like Amul, Kwality Walls, NIC etc., in almost all cities served.' },
      ]
    },
    {
      title: 'Safety & Operations',
      faqs: [
        { q: 'Are delivery partners\' safety considered in their operational model?', a: 'Yes—Blinkit prioritises safety. Delivery partners cover approx. 2 km per order at an average speed of ~18 km/h using optimized routing and dense hyper-local clusters.' },
      ]
    },
  ];

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
          {/* Header Section with Logo */}
          <div className="flex flex-col items-center justify-center mb-10">
            <div className="bg-white p-6 rounded-xl shadow-md flex flex-col items-center">
              <img src={BlinkitLogo} alt="Blinkit Logo" className="w-48 h-48 object-contain mb-4" />
              <h1 className="text-3xl font-bold text-gray-900 text-center">Blinkit Seller Account Setup</h1>
              <p className="text-green-600 text-center mt-2">Your Gateway to Hyperlocal Delivery Success</p>
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

          {/* FAQ Section with Collapsible Categories */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-center text-green-700 mb-8">Blinkit FAQs</h2>
            <div className="max-w-3xl mx-auto space-y-4">
              {faqCategories.map((cat, idx) => (
                <div key={cat.title} className="bg-white rounded-lg shadow-md">
                  <button
                    className="w-full flex items-center justify-between px-6 py-4 text-left focus:outline-none focus:ring-2 focus:ring-green-500"
                    onClick={() => handleToggle(idx)}
                    aria-expanded={openCategory === idx}
                  >
                    <span className="text-xl font-semibold text-green-700">{cat.title}</span>
                    <span className="ml-4">
                      {openCategory === idx ? <X className="w-6 h-6 text-green-600" /> : <Plus className="w-6 h-6 text-green-600" />}
                    </span>
                  </button>
                  {openCategory === idx && (
                    <div className="px-6 pb-4">
                      {cat.faqs.map((faq, qIdx) => (
                        <div key={qIdx} className="mb-2 border-b last:border-b-0">
                          <button
                            className="w-full flex items-center justify-between py-3 text-left focus:outline-none"
                            onClick={() => handleQuestionToggle(idx, qIdx)}
                            aria-expanded={openQuestions[idx] === qIdx}
                          >
                            <span className="font-medium text-gray-900">{faq.q}</span>
                            <span className="ml-2">
                              {openQuestions[idx] === qIdx ? <X className="w-5 h-5 text-green-600" /> : <Plus className="w-5 h-5 text-green-600" />}
                            </span>
                          </button>
                          {openQuestions[idx] === qIdx && (
                            <div className="pb-3 pl-2 pr-2">
                              <p className="text-gray-700 whitespace-pre-line">{faq.a}</p>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
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
