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
      title: 'Registration & Account',
      faqs: [
        { 
          q: 'How do I register on JioMart?', 
          a: 'Click Sign In at the top-right, fill in your details, verify via OTP sent to your mobile, and you\'re ready to shop.' 
        },
        { 
          q: 'Do I need to register to shop?', 
          a: 'Yes. Browsing is possible, but you must register or log in during checkout.' 
        }
      ]
    },
    {
      title: 'Ordering',
      faqs: [
        { 
          q: 'How can I search for products?', 
          a: 'Use the site\'s search bar or navigate category pages.' 
        },
        { 
          q: 'How do I know if a product is in stock?', 
          a: 'Add items to your cart and enter your delivery PIN code—the site will then show availability based on that address.' 
        },
        { 
          q: 'Can I modify my order after placing it?', 
          a: 'No modifications once placed. But you can cancel before dispatch or initiate a return after delivery.' 
        }
      ]
    },
    {
      title: 'Payment',
      faqs: [
        { 
          q: 'What payment methods does JioMart accept?', 
          a: 'UPI, credit/debit cards, net banking, e-wallets, meal cards, Pay Later, and Cash on Delivery.' 
        },
        { 
          q: 'Can I change my payment method after placing the order?', 
          a: 'No, once an order is placed, the payment option cannot be changed.' 
        },
        { 
          q: 'When will I receive a refund?', 
          a: 'Refunds can take up to 7 working days, depending on the payment method. COD refunds are credited to your JioMart wallet.' 
        }
      ]
    },
    {
      title: 'Delivery & Charges',
      faqs: [
        { 
          q: 'Are delivery fees applicable?', 
          a: 'Orders below ₹250 (in selected categories) incur a ₹40 fee; orders above ₹250 are free. New users get the first three orders delivery-free.' 
        },
        { 
          q: 'Does JioMart deliver to my area?', 
          a: 'Delivery availability is shown automatically based on your entered PIN code.' 
        }
      ]
    },
    {
      title: 'Returns & Cancellation',
      faqs: [
        { 
          q: 'How do I cancel an order?', 
          a: 'Cancel via My Orders before dispatch. After dispatch, contact Customer Support (you may still reject delivery). Cancellation of items like flowers or cakes may not be allowed.' 
        },
        { 
          q: 'How do returns and refunds work?', 
          a: 'Returns must be requested within the permitted window and product eligibility. You can raise a return request via the Help section under My Orders, and may need to provide photos or videos. Refunds are processed after verification.' 
        }
      ]
    },
    {
      title: 'Contact & Support',
      faqs: [
        { 
          q: 'How can I contact JioMart for help?', 
          a: 'Reach support via WhatsApp 70003 70003 or call 1800 890 1222, available every day from 8:00 AM to 8:00 PM. You can also email at customer.support@jiomart.com' 
        }
      ]
    }
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