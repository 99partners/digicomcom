import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { ArrowUp, ChevronRight, HelpCircle, Shield, Package, CreditCard, User, Building, Check } from 'lucide-react';

const Bigbasket = () => {
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
        <title>Bigbasket Seller Setup | 99digicom</title>
        <meta name="description" content="Guide to set up Bigbasket Seller account: steps, requirements, and FAQs." />
        <meta name="keywords" content="Bigbasket seller account, Bigbasket onboarding, Bigbasket seller setup" />
      </Helmet>

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
          <div className="flex items-center justify-center mb-10">
            <div className="bg-white p-4 rounded-xl shadow-md flex items-center">
              <div className="w-16 h-16 bg-green-600 rounded-md flex items-center justify-center mr-4">
                <span className="text-white text-2xl font-bold">B</span>
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Bigbasket Seller Account Setup</h1>
                <p className="text-green-600">Start selling your products on Bigbasket easily</p>
              </div>
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