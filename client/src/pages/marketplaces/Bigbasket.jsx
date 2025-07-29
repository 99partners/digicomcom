import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { ArrowUp, ChevronRight, HelpCircle, Shield, Package, CreditCard, User, Building, Check, Plus, X, ArrowLeft } from 'lucide-react';
import BigBasketLogo from '../../assets/BigBasket.png';

const Bigbasket = () => {
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

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
      title: 'Account & Login',
      faqs: [
        { q: 'Can I have multiple family members register with the same address?', a: 'Yes. Up to three users can register with unique email and mobile numbers using the same delivery address. You can also order to different cities under one account.' },
        { q: 'How do I reset my password?', a: 'Use the “Forgot Password” link on the login page. You’ll receive an email with a reset link. If issues persist, contact customer support.' },
      ]
    },
    {
      title: 'Payments & Wallet',
      faqs: [
        { q: 'What payment methods are accepted on BigBasket?', a: 'BigBasket accepts cash on delivery (COD), credit/debit cards (Visa, Master, RuPay), and Paytm Food Wallet (for food items).' },
        { q: 'What happens if items aren\'t delivered but I\'ve paid?', a: 'You’ll receive a credit note (store credit) to your account. You can request refund to your card by contacting customer support.' },
        { q: 'Where do I enter coupon/voucher codes?', a: 'On the payment page during checkout, there is a field to enter coupon or e‑voucher codes. Discounts are applied automatically.' },
        { q: 'Does bigbasket Wallet expire?', a: 'No. Wallet balance does not have an expiry; you can use it until it’s fully spent.' },
      ]
    },
    {
      title: 'Delivery & Charges',
      faqs: [
        { q: 'Is there a minimum order value for delivery?', a: 'No, there’s no minimum order requirement to place an order.' },
        { q: 'What are the delivery charges?', a: 'Typically, orders below ₹600 incur ₹50 charge; orders ₹600–₹1,000 have ₹10 charge (Mumbai ₹15); above ₹1,000 delivery is free. Charges vary by location; details are shown at checkout.' },
        { q: 'Do you offer same-day delivery?', a: 'Yes—when orders are placed before 12 PM, same-day evening slots are available in select metros (e.g. Bengaluru, Mumbai, Delhi‑NCR, Chennai, Hyderabad, Pune).' },
      ]
    },
    {
      title: 'Orders & Returns',
      faqs: [
        { q: 'Can I change or cancel an order?', a: 'You may cancel or modify the order before the slot cut-off (e.g. before 12 PM for same‑day slots). After that, changes are not permitted online—contact support for assistance.' },
        { q: 'What if some items are out of stock?', a: 'You’ll receive an email/SMS listing unavailable items before delivery. If less is delivered than billed or you find missing items within 48 hours, report them to customer support.' },
        { q: 'What is the return policy?', a: 'BigBasket has a “5‑day no questions asked” return window (for eligible items). Damaged, expired, or incorrect items can be returned; refund initiated once they reach the warehouse.' },
      ]
    },
    {
      title: 'Gifting, Promotions & Other Queries',
      faqs: [
        { q: 'Can I place a gift order with a message?', a: 'Yes. Add the recipient’s address and optional message when placing the order. Custom gift combos come in decorative packaging.' },
        { q: 'What’s the return policy for gift items?', a: 'Perishable gifts: return/exchange within 48 hours. Non-perishable: up to 7 days. Policies vary by product type.' },
        { q: 'How do I get support or give feedback?', a: 'Customer service is available daily from 6 AM–10 PM via phone at 1860-123-1000 or email at customerservice@bigbasket.com. Feedback and quality complaints are welcome.' },
      ]
    },
  ];

  return (
    <>
      <Helmet>
        <title>Bigbasket Seller Setup | 99digicom</title>
        <meta name="description" content="Guide to set up Bigbasket Seller account: steps, requirements, and FAQs." />
        <meta name="keywords" content="Bigbasket seller account, Bigbasket onboarding, Bigbasket seller setup" />
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
              <img src={BigBasketLogo} alt="BigBasket Logo" className="w-48 h-48 object-contain mb-4" />
              <h1 className="text-3xl font-bold text-gray-900 text-center">Bigbasket Seller Account Setup</h1>
              <p className="text-green-600 text-center mt-2">Start selling your products on Bigbasket easily</p>
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
                    Bigbasket is one of India's leading online grocery platforms. Registering as a seller allows you to showcase your grocery or FMCG products to a wide customer base.
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
                  <p className="text-gray-700 mb-4">What you'll need to become a Bigbasket Seller:</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { icon: User, text: 'GST Certificate' },
                  { icon: Building, text: 'FSSAI License (for food items)' },
                  { icon: CreditCard, text: 'Cancelled Cheque or Bank Details' },
                  { icon: Shield, text: 'PAN Card' },
                  { icon: Package, text: 'Product Catalog with Prices' },
                  { icon: User, text: 'Business or Individual ID Proof' }
                ].map((req, i) => (
                  <div key={i} className="flex items-center bg-white p-3 rounded-lg shadow-sm">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3">
                      <req.icon className="h-5 w-5 text-green-600" />
                    </div>
                    <span className="font-medium text-gray-800">{req.text}</span>
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
              <p className="text-gray-600 max-w-2xl mx-auto">Follow these steps to join Bigbasket as a seller</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { step: 1, title: "Visit Bigbasket Seller Page", details: "Go to partners.bigbasket.com" },
                { step: 2, title: "Register Your Details", details: "Fill in your business and personal details" },
                { step: 3, title: "Upload Required Documents", details: "GST, PAN, Bank details, etc." },
                { step: 4, title: "Catalog Your Products", details: "List the products you want to sell with pricing" },
                { step: 5, title: "Verification", details: "Bigbasket will verify your documents and business" },
                { step: 6, title: "Start Selling", details: "Once approved, your products will go live" }
              ].map((step, index) => (
                <div key={index} className="bg-white rounded-2xl shadow-lg p-6 flex items-start hover:scale-105 transition-transform duration-300">
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
                  { question: "Is there a registration fee?", answer: "No registration fee; fees apply per transaction." },
                  { question: "Do I need to own a warehouse?", answer: "No, but having your own fulfillment process helps." },
                  { question: "Is FSSAI mandatory?", answer: "Yes, if you’re selling food or beverages." },
                  { question: "How long does approval take?", answer: "Usually 3-5 business days after document submission." }
                ].map((item, i) => (
                  <div key={i} className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100">
                    <h3 className="font-semibold text-gray-900 mb-2">{item.question}</h3>
                    <p className="text-gray-700">{item.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* FAQ Section with Collapsible Categories */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-center text-green-700 mb-8">BigBasket FAQs</h2>
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
            <div className="inline-block bg-gradient-to-r from-green-600 to-green-700 text-white font-bold text-xl py-4 px-8 rounded-full shadow-lg hover:scale-105 transition-transform duration-300">
              Ready to Start Selling on Bigbasket?
            </div>
            <p className="mt-4 text-gray-600">Let 99digicom help you register and grow your Bigbasket presence</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Bigbasket;