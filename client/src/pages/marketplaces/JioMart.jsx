import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { ArrowUp, ChevronRight, HelpCircle, Shield, Package, CreditCard, User, Building, Check, X, Plus } from 'lucide-react';
import JiomartLogo from '../../assets/Jiomart.png';

const Jiomart = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [openCategory, setOpenCategory] = useState(null);
  const [openQuestions, setOpenQuestions] = useState({});

  useEffect(() => {
    const handleScroll = () => {
      // Calculate scroll progress
      const totalHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
      
      // Show/hide scroll to top button
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
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
        { q: 'What is JioMart Seller Portal?', a: 'JioMart Seller Portal is a platform that enables you to list and sell your products on JioMart marketplace.' },
        { q: 'How does selling on JioMart work?', a: 'Selling on JioMart is simple. First, list the products you want to sell. Customers see your products and make purchases. You receive a notification to ship the product. After delivery, JioMart will deposit the funds into your bank account after deducting fees.' },
        { q: 'What products can I sell on JioMart?', a: 'You can sell items in categories like groceries, home essentials, electronics, fashion, beauty products, and more. Certain categories may require prior approval.' },
        { q: 'What do I need to register as a seller on JioMart?', a: 'You will need: Your business details, contact details (email and phone), basic business information, tax registration details (PAN and GST), and product details.' },
        { q: 'I don\'t have a website, can I still sell on JioMart?', a: 'Yes, you don\'t need a website to sell on JioMart. Once registered, you\'ll have access to the Seller Portal to list your products.' },
      ]
    },
    {
      title: 'Fees and Charges',
      faqs: [
        { q: 'What are the charges for selling on JioMart?', a: 'JioMart charges a commission fee on each sale. The exact percentage varies by category. Listing products is free.' },
        { q: 'How can I calculate my profitability?', a: 'You can calculate your profits by subtracting the product cost, shipping fees, and JioMart commission from your selling price.' },
        { q: 'How and when do I get paid?', a: 'Payments are typically settled within 7-10 days after delivery. Funds are transferred directly to your registered bank account.' },
      ]
    },
    {
      title: 'Managing your Account',
      faqs: [
        { q: 'How do I list my products on JioMart?', a: 'You can list products individually through the Seller Portal or use bulk upload tools for larger catalogs.' },
        { q: 'How do I manage my orders on JioMart?', a: 'You can view and manage all orders through the "Orders" section in the Seller Portal. Notifications will alert you to new orders.' },
        { q: 'How can I grow my business on JioMart?', a: 'You can grow by optimizing listings, participating in promotions, maintaining high seller ratings, and leveraging JioMart\'s marketing tools.' },
      ]
    },
    {
      title: 'Services',
      faqs: [
        { q: 'Does JioMart offer protection against fraud?', a: 'Yes, JioMart has measures in place to protect sellers against fraudulent orders and payment issues.' },
        { q: 'Can customers leave feedback and why is it important?', a: 'Yes, customers can leave feedback. High ratings are crucial as they influence buyer decisions and your visibility on the platform.' },
        { q: 'Where can I get JioMart branded packaging material?', a: 'You can purchase packaging materials through the Seller Portal or from recommended suppliers listed in the resources section.' },
      ]
    },
  ];

  return (
    <>
      <Helmet>
        <title>JioMart Services | 99digicom</title>
        <meta name="description" content="Step-by-step guide to setting up a JioMart Seller account and selling on JioMart with ease." />
        <meta name="keywords" content="JioMart seller account, JioMart setup, JioMart marketplace, online selling, grocery marketplace" />
      </Helmet>
      
      {/* Scroll Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 z-50">
        <div
          className="h-full bg-gradient-to-r from-green-500 to-green-600 transition-all duration-300 ease-out"
          style={{ width: `${scrollProgress}%` }}
        ></div>
      </div>
      
      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 bg-green-600 text-white p-3 rounded-full shadow-lg hover:bg-green-700 transition-colors duration-300 z-40"
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
              <img src={JiomartLogo} alt="JioMart Logo" className="w-48 h-48 object-contain mb-4" />
              <h1 className="text-3xl font-bold text-gray-900 text-center">JioMart Seller Account Setup</h1>
              <p className="text-green-600 text-center mt-2">Your Gateway to JioMart Marketplace Success</p>
            </div>
          </div>
          
          {/* Overview Section */}
          <section className="mb-12">
            <div className="bg-white rounded-lg shadow-md p-8 mb-6 border-l-4 border-green-500 transform hover:scale-105 transition-transform duration-300">
              <div className="flex items-start">
                <div className="mr-6">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <HelpCircle className="h-6 w-6 text-green-600" />
                  </div>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-green-700 mb-2">Overview</h2>
                  <p className="text-gray-700">
                    Set up a JioMart seller account to sell products online with ease. Our comprehensive guide walks you through every step of the process, from registration to selling your first product.
                  </p>
                </div>
              </div>
            </div>
          </section>
          
          {/* Requirements Section */}
          <section className="mb-12">
            <div className="bg-gradient-to-r from-green-50 to-green-100 border-l-4 border-green-500 p-8 rounded-lg shadow-lg mb-6 transform hover:shadow-xl transition-all duration-300">
              <div className="flex items-start mb-4">
                <div className="mr-6">
                  <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                    <Check className="h-6 w-6 text-white" />
                  </div>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-green-700 mb-2">Requirements</h2>
                  <p className="text-gray-700 mb-4">To create a JioMart Seller account, you'll need the following:</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center bg-white p-3 rounded-lg shadow-sm">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3">
                    <User className="h-5 w-5 text-green-600" />
                  </div>
                  <span className="font-medium text-gray-800">PAN Card</span>
                </div>
                <div className="flex items-center bg-white p-3 rounded-lg shadow-sm">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3">
                    <Shield className="h-5 w-5 text-green-600" />
                  </div>
                  <span className="font-medium text-gray-800">Aadhar Card</span>
                </div>
                <div className="flex items-center bg-white p-3 rounded-lg shadow-sm">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3">
                    <CreditCard className="h-5 w-5 text-green-600" />
                  </div>
                  <span className="font-medium text-gray-800">GST Number</span>
                </div>
                <div className="flex items-center bg-white p-3 rounded-lg shadow-sm">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3">
                    <Building className="h-5 w-5 text-green-600" />
                  </div>
                  <span className="font-medium text-gray-800">Bank Account Details</span>
                </div>
                <div className="flex items-center bg-white p-3 rounded-lg shadow-sm">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3">
                    <Package className="h-5 w-5 text-green-600" />
                  </div>
                  <span className="font-medium text-gray-800">Mobile Number</span>
                </div>
                <div className="flex items-center bg-white p-3 rounded-lg shadow-sm">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3">
                    <User className="h-5 w-5 text-green-600" />
                  </div>
                  <span className="font-medium text-gray-800">Email ID</span>
                </div>
                <div className="flex items-center bg-white p-3 rounded-lg shadow-sm">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3">
                    <Building className="h-5 w-5 text-green-600" />
                  </div>
                  <span className="font-medium text-gray-800">Business Address</span>
                </div>
                <div className="flex items-center bg-white p-3 rounded-lg shadow-sm">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3">
                    <Package className="h-5 w-5 text-green-600" />
                  </div>
                  <span className="font-medium text-gray-800">Product Details & Images</span>
                </div>
              </div>
            </div>
          </section>
          
          {/* Step-by-Step Setup Process */}
          <section className="mb-12">
            <div className="text-center mb-10">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2 relative inline-block">
                Step-by-Step Setup Process
                <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-green-500 rounded-full"></span>
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">Follow these steps to create your JioMart Seller account quickly and easily</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { step: 1, title: "Visit JioMart Partner Portal", details: "Go to the JioMart Seller registration website" },
                { step: 2, title: "Register Using Mobile & Email", details: "Provide your contact details for verification" },
                { step: 3, title: "Complete KYC Process", details: "Upload Aadhar & PAN, verify bank details" },
                { step: 4, title: "Add Business Details", details: "Enter your business information and address" },
                { step: 5, title: "Upload GST & Product Catalog", details: "Provide GST details and upload your product listings" },
                { step: 6, title: "Start Selling After Approval", details: "Begin selling once your account is verified and approved" },
              ].map((step, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl shadow-lg p-6 flex items-start transform hover:scale-105 transition-transform duration-300 hover:shadow-xl"
                >
                  <div className="flex-shrink-0 h-12 w-12 flex items-center justify-center rounded-full bg-gradient-to-r from-green-500 to-green-600 text-white font-bold mr-4">
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
          
          {/* Common Questions Section */}
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
                  {
                    question: "Is there a registration fee?",
                    answer: "Currently, registration on JioMart is free for sellers."
                  },
                  {
                    question: "Do I need GST to sell?",
                    answer: "Yes, GST is mandatory for listing and selling products."
                  },
                  {
                    question: "How long does approval take?",
                    answer: "Generally 2–5 working days after document verification."
                  },
                  {
                    question: "Can I sell without a business entity?",
                    answer: "Yes, individuals can register as sellers, but having a business entity is recommended for scaling."
                  }
                ].map((item, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-4 transform hover:bg-gray-100 transition-colors duration-300">
                    <h3 className="font-semibold text-gray-900 mb-2">{item.question}</h3>
                    <p className="text-gray-700">{item.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
          
          {/* FAQ Section with Collapsible Categories */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-center text-green-700 mb-8">JioMart Seller FAQs</h2>
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
        </div>
      </div>
    </>
  );
};

export default Jiomart;