import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import { ArrowUp, HelpCircle, Check, User, CreditCard, Shield, Building, Package } from "lucide-react";

const ScrollToTop = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) setVisible(true);
      else setVisible(false);
    };
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return visible ? (
    <button
      onClick={scrollToTop}
      className="fixed bottom-8 right-8 bg-green-600 text-white p-3 rounded-full shadow-lg hover:bg-green-700 transition-all duration-300 z-40 animate-bounce-slow"
      aria-label="Scroll to top"
    >
      <ArrowUp size={24} />
    </button>
  ) : null;
};

const ScrollProgress = () => {
  const [scroll, setScroll] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.body.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScroll(progress);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 z-50">
      <div
        className="h-full bg-gradient-to-r from-green-500 to-green-600 transition-all duration-300 ease-out"
        style={{ width: `${scroll}%` }}
      ></div>
    </div>
  );
};

const Zepto = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>Zepto Seller Setup Guide | 99digicom</title>
        <meta
          name="description"
          content="Step-by-step guide for setting up your Zepto seller account. Learn about requirements, process, tips, and FAQs for successful onboarding."
        />
      </Helmet>

      <ScrollProgress />
      <ScrollToTop />

      <div className="min-h-screen pt-20 bg-gradient-to-br from-green-50 via-white to-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="flex items-center justify-center mb-10">
            <div className="bg-white p-4 rounded-xl shadow-md flex items-center">
              <div className="w-16 h-16 bg-green-500 rounded-md flex items-center justify-center mr-4">
                <span className="text-white text-2xl font-bold">Z</span>
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Zepto Seller Account Setup</h1>
                <p className="text-green-600">Join Zepto's fast delivery network</p>
              </div>
            </div>
          </div>

          {/* Overview */}
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
                  <p className="text-gray-700">Zepto is a 10-minute grocery delivery platform focused on ultra-fast delivery. Becoming a Zepto seller helps you tap into a high-demand customer base for everyday essentials.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Requirements */}
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
                  <p className="text-gray-700 mb-4">To become a Zepto seller, you'll need the following:</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[ 
                  { icon: User, text: 'Business PAN Card' },
                  { icon: CreditCard, text: 'Bank Account Details' },
                  { icon: Shield, text: 'GST Certificate' },
                  { icon: Building, text: "Owner's Aadhaar & PAN" },
                  { icon: Package, text: 'FSSAI License (if applicable)' },
                  { icon: User, text: 'Mobile Number and Email ID' },
                ].map(({ icon: Icon, text }, i) => (
                  <div key={i} className="flex items-center bg-white p-3 rounded-lg shadow-sm">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3">
                      <Icon className="h-5 w-5 text-green-600" />
                    </div>
                    <span className="font-medium text-gray-800">{text}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Steps */}
          <section className="mb-12">
            <div className="text-center mb-10">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2 relative inline-block">
                Step-by-Step Setup Process
                <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-green-500 rounded-full"></span>
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">Follow these steps to onboard as a Zepto Seller:</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                'Go to Zepto Partner Onboarding Page.',
                'Fill out the application form with business details.',
                'Upload required documents.',
                'Wait for Zepto representative contact.',
                'Complete contract and training.',
                'Receive dashboard access & set up inventory.',
                'Start accepting and fulfilling orders.'
              ].map((step, index) => (
                <div key={index} className="bg-white rounded-2xl shadow-lg p-6 flex items-start transform hover:scale-105 transition-transform duration-300 hover:shadow-xl">
                  <div className="flex-shrink-0 h-12 w-12 flex items-center justify-center rounded-full bg-gradient-to-r from-green-500 to-green-600 text-white font-bold mr-4">
                    {index + 1}
                  </div>
                  <div>
                    <p className="text-gray-600">{step}</p>
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
                <h2 className="text-2xl font-bold text-green-700">Frequently Asked Questions</h2>
              </div>
              <div className="space-y-6">
                {[
                  { q: 'Do I need to own a store?', a: 'No, but you must have a storage location and be able to fulfill local deliveries quickly.' },
                  { q: 'How long is the onboarding process?', a: 'Usually takes 5–10 business days depending on documentation and location.' },
                  { q: 'Is there a cost to join?', a: 'There is no upfront cost. Zepto may charge a commission per order.' },
                ].map((item, i) => (
                  <div key={i} className="bg-gray-50 rounded-lg p-4 transform hover:bg-gray-100 transition-colors duration-300">
                    <h3 className="font-semibold text-gray-900 mb-2">{item.q}</h3>
                    <p className="text-gray-700">{item.a}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Call to Action */}
          <div className="text-center mt-12 mb-8">
            <div className="inline-block bg-gradient-to-r from-green-600 to-green-700 text-white font-bold text-xl py-4 px-8 rounded-full shadow-lg transform hover:scale-105 transition-transform duration-300 hover:shadow-xl">
              Need Help With Zepto Seller Setup?
            </div>
            <p className="mt-4 text-gray-600">We assist with documentation, onboarding, and inventory setup for Zepto sellers.</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Zepto;
