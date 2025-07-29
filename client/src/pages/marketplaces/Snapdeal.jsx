import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { ArrowUp, ChevronRight, HelpCircle, Package, CreditCard, User, Building, Check, ShoppingBag, X, Plus } from 'lucide-react';
import SnapdealLogo from '../../assets/Snapdeal.png';

const Snapdeal = () => {
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
      title: 'Order Tracking & Delivery',
      faqs: [
        { q: 'How do I track my order?', a: 'Visit My Orders in your account and click Track Order for real-time status.\nm.snapdeal.com' },
        { q: 'Why is my order delayed?', a: 'We’ll notify you via email or SMS with the new expected delivery date. Track details are available on your account.\nm.snapdeal.com' },
        { q: 'Are there any shipping charges?', a: 'No—Snapdeal does not charge for shipping or delivery.\ngethuman.com' },
        { q: 'Can I choose a courier partner?', a: 'Not currently. We’ll inform you about the delivery partner post-dispatch.\nm.snapdeal.com' },
      ]
    },
    {
      title: 'Cancellation & Replacement',
      faqs: [
        { q: 'How do I cancel before shipping?', a: 'Go to My Orders, click Cancel next to the order, select your reason, and submit—only cancelable before dispatch.\nm.snapdeal.com' },
        { q: 'Can I request a replacement?', a: 'Yes. Within 7 days of delivery, use Return/Replace in My Orders and choose replacement.\nm.snapdeal.com' },
        { q: 'Why would Snapdeal cancel my order?', a: 'Possible reasons include out-of-stock items or pricing errors. In such cases, you\'ll be notified and refunded.\nm.snapdeal.com\ntechulator.com' },
      ]
    },
    {
      title: 'Returns & Refunds',
      faqs: [
        { q: 'What are Snapdeal’s return policies?', a: 'Snapdeal offers a 7‑day no‑questions‑asked return/replacement policy. Most unused and original items are eligible.\nSnapdeal.com\nm.snapdeal.com\ngethuman.com' },
        { q: 'Are any items not eligible for return?', a: 'Yes—innerwear, lingerie, used or washed items, opened electronics, and combo items typically cannot be returned.\nm.snapdeal.com' },
        { q: 'How and when do I get my refund?', a: 'After product inspection (within about 2 days), refunds for prepaid orders go back immediately to your card. For COD refunds, they often credit via NEFT within ~2 hours. Banks may take 7–10 business days.\nm.snapdeal.com' },
        { q: 'Do I need to pay return shipping?', a: 'No—for most returns, Snapdeal arranges reverse pickup at no cost. If reverse-pickup isn\'t available, charges are refunded as SD Cash.\nm.snapdeal.com\ntechulator.com' },
      ]
    },
    {
      title: 'Payments & SD Cash',
      faqs: [
        { q: 'What payment methods are accepted?', a: 'Snapdeal accepts Credit/Debit Cards, Net banking, Cash on Delivery (COD), EMI, E‑Gift Vouchers, and Snapdeal Cash (SD Cash).\nm.snapdeal.com' },
        { q: 'What is SD Cash and does it expire?', a: 'SD Cash is store credit for Snapdeal. It expires 6 months after being credited.\nen.wikipedia.org\nm.snapdeal.com\nSnapdeal.com' },
        { q: 'Can I use both cash and EMI in one purchase?', a: 'No—you must choose either COD or EMI; each order uses only one payment method.\nGoogle Play\nm.snapdeal.com\ntechulator.com' },
        { q: 'What happens if a transaction fails but amount is deducted?', a: 'Raise a ticket via the Contact Us form with details. If payment hasn\'t reached Snapdeal, it will be refunded.\nm.snapdeal.com' },
      ]
    },
    {
      title: 'Account & Login',
      faqs: [
        { q: 'Do I need to create an account to shop?', a: 'No—you can shop as a guest. However, registered users get access to order tracking, SD Cash balance, wishlist, and personalized features.\nm.snapdeal.com' },
        { q: 'Facing login issues or forgot password?', a: 'Use the Forgot Password link on sign-in page. Ensure cookies are enabled. If problems persist, try again after 30 minutes.\nm.snapdeal.com' },
        { q: 'Is my personal data safe with Snapdeal?', a: 'Yes. Snapdeal uses strict security protocols, does not sell your data, and only collects information needed for order fulfillment.' },
      ]
    },
  ];

  return (
    <>
      <Helmet>
        <title>Snapdeal Services | 99digicom</title>
        <meta name="description" content="Complete Snapdeal marketplace services including account management, listing optimization, and marketing solutions." />
        <meta name="keywords" content="Snapdeal seller account, Snapdeal setup, Snapdeal marketplace, online selling, e-commerce platform" />
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

      <div className="min-h-screen pt-20 bg-gradient-to-br from-green-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header Section with Logo */}
          <div className="flex flex-col items-center justify-center mb-10">
            <div className="bg-white p-6 rounded-xl shadow-md flex flex-col items-center">
              <img src={SnapdealLogo} alt="Snapdeal Logo" className="w-48 h-48 object-contain mb-4" />
              <h1 className="text-3xl font-bold text-gray-900 text-center">Snapdeal Seller Account Setup</h1>
              <p className="text-green-600 text-center mt-2">Your Gateway to India's Growing E-commerce Platform</p>
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
                    Snapdeal offers over 30 million products across 800+ categories. No initial registration fees for over 300,000 sellers. Our comprehensive guide walks you through every step of registering and optimizing your store on India's growing e-commerce platform.
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
                  <p className="text-gray-700 mb-4">To create a Snapdeal Seller account, you'll need the following:</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center bg-white p-3 rounded-lg shadow-sm">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3">
                    <ShoppingBag className="h-5 w-5 text-green-600" />
                  </div>
                  <span className="font-medium text-gray-800">GSTIN (for taxable products)</span>
                </div>
                <div className="flex items-center bg-white p-3 rounded-lg shadow-sm">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3">
                    <User className="h-5 w-5 text-green-600" />
                  </div>
                  <span className="font-medium text-gray-800">PAN Card</span>
                </div>
                <div className="flex items-center bg-white p-3 rounded-lg shadow-sm">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3">
                    <CreditCard className="h-5 w-5 text-green-600" />
                  </div>
                  <span className="font-medium text-gray-800">Bank Account</span>
                </div>
                <div className="flex items-center bg-white p-3 rounded-lg shadow-sm">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3">
                    <Building className="h-5 w-5 text-green-600" />
                  </div>
                  <span className="font-medium text-gray-800">Business Documents</span>
                </div>
                <div className="flex items-center bg-white p-3 rounded-lg shadow-sm">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3">
                    <Package className="h-5 w-5 text-green-600" />
                  </div>
                  <span className="font-medium text-gray-800">Address Proof</span>
                </div>
                <div className="flex items-center bg-white p-3 rounded-lg shadow-sm">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3">
                    <User className="h-5 w-5 text-green-600" />
                  </div>
                  <span className="font-medium text-gray-800">Identity Proof</span>
                </div>
              </div>
              
              <div className="mt-4 text-center">
                <a 
                  href="https://seller.snapdeal.com" 
                  className="inline-flex items-center text-green-700 hover:text-green-900 font-medium transition-colors"
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  Visit Snapdeal Seller Portal
                  <ChevronRight className="ml-1 h-4 w-4" />
                </a>
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
              <p className="text-gray-600 max-w-2xl mx-auto">Follow these steps to create your Snapdeal Seller account quickly and easily</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { step: 1, title: "Visit the Snapdeal Seller Portal", details: "Go to seller.snapdeal.com" },
                { step: 2, title: "Initiate Registration", details: "Click on 'Register Now'" },
                { step: 3, title: "Provide Business Details", details: "Enter company information" },
                { step: 4, title: "Upload Required Documents", details: "PAN, GST, and business proof" },
                { step: 5, title: "Sign the Snapdeal Partnership Agreement", details: "Review and accept terms" },
                { step: 6, title: "Set Up Your Store and List Products", details: "Add store details and products" },
                { step: 7, title: "Enable Account Security", details: "Set up two-factor authentication" },
                { step: 8, title: "Explore Snapdeal Tools", details: "Familiarize with dashboard features" }
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
                    question: "Is registration free?", 
                    answer: "Yes, registration is completely free." 
                  },
                  { 
                    question: "Is GSTIN mandatory?", 
                    answer: "Yes for taxable products, optional otherwise." 
                  },
                  { 
                    question: "How long does verification take?", 
                    answer: "2-5 business days for document verification." 
                  },
                  { 
                    question: "Can individuals sell?", 
                    answer: "Yes, both individuals and businesses can sell." 
                  },
                  { 
                    question: "Does Snapdeal handle logistics?", 
                    answer: "Yes, Snapdeal offers integrated logistics solutions." 
                  },
                  { 
                    question: "Can I import listings from other platforms?", 
                    answer: "Yes, through third-party tools or manual entry." 
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

          {/* Resources & Notes Section */}
          <section className="mb-12">
            <div className="bg-green-100 rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-bold text-green-700 mb-4">Resources</h2>
              <ul className="list-disc ml-6 text-gray-700 space-y-2">
                <li><a href="https://seller.snapdeal.com" className="text-green-700 underline" target="_blank" rel="noopener noreferrer">Snapdeal Seller Portal</a></li>
                <li>Snapdeal Seller Zone App</li>
                <li><a href="https://seller.snapdeal.com/seller-help-center" className="text-green-700 underline" target="_blank" rel="noopener noreferrer">Snapdeal Seller Help Center</a></li>
                <li>Snapdeal Seller Support</li>
                <li>Third-party services: Shiprocket, Logibricks, ClearTax, Touchstone Infotech</li>
              </ul>
              <h2 className="text-2xl font-bold text-green-700 mt-8 mb-4">Notes</h2>
              <ul className="list-disc ml-6 text-gray-700 space-y-2">
                <li>Low commission rates (4-20%) with no upfront fees.</li>
                <li>Ideal for small businesses with wide reach.</li>
                <li>Review policies regularly.</li>
                <li>Plan logins around maintenance schedules.</li>
              </ul>
              <p className="text-gray-700 mt-4">By following these steps and leveraging Snapdeal's tools, you can establish a successful online business. <b>Start your Snapdeal selling journey today!</b></p>
            </div>
          </section>

          {/* Call to Action */}
          <div className="text-center mt-12 mb-8">
            <div className="inline-block bg-gradient-to-r from-green-600 to-green-700 text-white font-bold text-xl py-4 px-8 rounded-full shadow-lg transform hover:scale-105 transition-transform duration-300 hover:shadow-xl">
              Ready to Start Selling on Snapdeal?
            </div>
            <p className="mt-4 text-gray-600">Our team of Snapdeal experts can help you set up and optimize your account</p>
          </div>

          {/* FAQ Section with Collapsible Categories */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-center text-green-700 mb-8">Snapdeal FAQs</h2>
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

export default Snapdeal;