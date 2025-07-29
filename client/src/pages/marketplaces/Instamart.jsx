import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { ArrowUp, ChevronRight, HelpCircle, Shield, Package, CreditCard, User, Building, Check, X, Plus, ArrowLeft } from "lucide-react";
import InstamartLogo from '../../assets/Instamart.png';

const Instamart = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [openCategory, setOpenCategory] = useState(null);
  const [openQuestions, setOpenQuestions] = useState({});

  // Scroll to top on component mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const goBack = () => {
    window.history.back();
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
      title: 'Orders & Delivery',
      faqs: [
        { q: 'How do I cancel or modify an order?', a: 'Cancel or edit your order within the app before it’s dispatched. Once processed, changes aren’t possible via the app—contact in‑app support if needed.' },
        { q: 'What if my order is delayed or missing?', a: 'Use the Swiggy app’s Help section within your order details to report issues. Swiggy handles all such cases through the in-app support—no official phone lines provided.' },
        { q: 'How is a refund handled if there’s an issue?', a: 'If Swiggy, a merchant, or delivery partner causes a cancellation or delivery failure, no penalty is collected and a refund is issued to you.' },
      ]
    },
    {
      title: 'Payments & Account',
      faqs: [
        { q: 'Can I pay outside the Swiggy app or by phone?', a: 'Payments are only accepted via secure in-app methods. You can also contact support only through the app—Swiggy has no official customer care phone number.' },
        { q: 'How do I report account or privacy issues?', a: 'For privacy or data concerns, view Swiggy’s policies. If your account is compromised or a security incident occurs, contact Swiggy via the app or email.' },
      ]
    },
    {
      title: 'Partner Support (For Restaurants & Delivery Partners)',
      faqs: [
        { q: 'I’m a restaurant—how do I update my menu?', a: 'For POS-integrated restaurants: ask your POS partner to submit revisions. For non-POS: use the partner portal, submit a menu copy, and expect approval within ~8 business hours.' },
        { q: 'How and when do restaurant partners receive payment?', a: 'Payments are processed weekly (Wednesdays or Thursdays, depending on the city). Invoices detail charges and payouts.' },
        { q: 'How can delivery partners join with no vehicle?', a: 'You can still become a delivery partner using cycle/e-bike or renting a vehicle. Swiggy can help with vendor connections in some cities.' },
      ]
    },
    {
      title: 'Account Security & Incident Reporting',
      faqs: [
        { q: 'How do I report a security incident or compromised account?', a: 'Immediately email InfoSec@swiggy.in with the relevant details. They will assist promptly.' },
      ]
    },
    {
      title: 'Tiering & Performance (Restaurant-side)',
      faqs: [
        { q: 'What are the partner tiers (e.g. Platinum, Gold)?', a: 'Restaurants are classified based on criteria like order acceptance, cancellations, edits, customer ratings, and GMV. Each tier offers distinct benefits (e.g. discoverability, ad access).' },
        { q: 'How can restaurants improve their tier?', a: 'Improve metrics by accepting orders promptly, marking unavailable items, reducing cancellations, and maintaining high food quality and ratings.' },
      ]
    },
  ];

  return (
    <>
      <Helmet>
        <title>Swiggy Instamart Seller Setup | 99digicom</title>
        <meta name="description" content="Detailed guide for setting up your Swiggy Instamart seller account with requirements, steps, and FAQs." />
      </Helmet>

      {/* Back Button */}
      <button
        onClick={goBack}
        className="fixed top-20 left-10 bg-white text-green-600 p-2 rounded-full shadow-md hover:bg-green-50 transition-colors duration-300 z-50"
        aria-label="Go back"
      >
        <ArrowLeft size={24} />
      </button>

      <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 z-50">
        <div
          className="h-full bg-gradient-to-r from-green-500 to-green-600 transition-all duration-300 ease-out"
          style={{ width: `${scrollProgress}%` }}
        ></div>
      </div>

      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 bg-green-600 text-white p-3 rounded-full shadow-lg hover:bg-green-700 transition-all duration-300 z-40 animate-bounce-slow"
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
              <img src={InstamartLogo} alt="Instamart Logo" className="w-48 h-48 object-contain mb-4" />
              <h1 className="text-3xl font-bold text-gray-900 text-center">Swiggy Instamart Seller Setup</h1>
              <p className="text-green-600 text-center mt-2">Grow your business by joining Instamart</p>
            </div>
          </div>

          <section className="mb-12">
            <div className="bg-white rounded-lg shadow-md p-8 mb-6 border-l-4 border-green-500">
              <div className="flex items-start">
                <div className="mr-6">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <HelpCircle className="h-6 w-6 text-green-600" />
                  </div>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-green-700 mb-2">Overview</h2>
                  <p className="text-gray-700">
                    Swiggy Instamart is a fast-growing grocery delivery platform. Partnering with Instamart gives you access to thousands of customers looking for instant delivery of essentials.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <div className="bg-gradient-to-r from-green-50 to-green-100 border-l-4 border-green-500 p-8 rounded-lg shadow-lg mb-6">
              <div className="flex items-start mb-4">
                <div className="mr-6">
                  <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                    <Check className="h-6 w-6 text-white" />
                  </div>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-green-700 mb-2">Requirements</h2>
                  <p className="text-gray-700 mb-4">You’ll need the following to register as a seller on Instamart:</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {["Business PAN Card", "GST Registration Certificate", "Bank Account Details", "FSSAI License (if applicable)", "Business Address Proof", "Authorized Person ID Proof"].map((item, idx) => (
                  <div key={idx} className="flex items-center bg-white p-3 rounded-lg shadow-sm">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3">
                      <Check className="h-5 w-5 text-green-600" />
                    </div>
                    <span className="font-medium text-gray-800">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="mb-12">
            <div className="text-center mb-10">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2 relative inline-block">
                Step-by-Step Setup Process
                <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-green-500 rounded-full"></span>
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">Follow these steps to onboard as an Instamart seller</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {["Visit the Swiggy Instamart Partner registration page.",
                "Fill out your business details in the application form.",
                "Upload all the necessary documents.",
                "Wait for Swiggy's verification process.",
                "Once approved, access your seller dashboard.",
                "List products with accurate pricing and stock info.",
                "Start fulfilling incoming orders."].map((text, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-2xl shadow-lg p-6 flex items-start hover:scale-105 transition-transform duration-300 hover:shadow-xl"
                >
                  <div className="h-12 w-12 flex items-center justify-center rounded-full bg-gradient-to-r from-green-500 to-green-600 text-white font-bold mr-4">
                    {idx + 1}
                  </div>
                  <div>
                    <p className="text-gray-700">{text}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* FAQ Section with Collapsible Categories */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-center text-green-700 mb-8">Swiggy Instamart FAQs</h2>
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

          <div className="text-center mt-12 mb-8">
            <div className="inline-block bg-gradient-to-r from-green-600 to-green-700 text-white font-bold text-xl py-4 px-8 rounded-full shadow-lg hover:scale-105 transition-transform hover:shadow-xl">
              Need Help With Swiggy Instamart Setup?
            </div>
            <p className="mt-4 text-gray-600">Let our team help you register, onboard, and start selling fast</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Instamart;