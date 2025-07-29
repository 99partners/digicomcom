import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { ArrowUp, ChevronRight, HelpCircle, Shield, Package, CreditCard, User, Building, Check, X } from "lucide-react";

const Instamart = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);

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

  return (
    <>
      <Helmet>
        <title>Swiggy Instamart Seller Setup | 99digicom</title>
        <meta name="description" content="Detailed guide for setting up your Swiggy Instamart seller account with requirements, steps, and FAQs." />
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
                <span className="text-white text-2xl font-bold">S</span>
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Swiggy Instamart Seller Setup</h1>
                <p className="text-green-600">Grow your business by joining Instamart</p>
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

          <section className="mb-12">
            <div className="bg-white rounded-lg shadow-md p-8 border-t-4 border-green-500">
              <div className="flex items-center mb-6">
                <div className="mr-4">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <HelpCircle className="h-6 w-6 text-green-600" />
                  </div>
                </div>
                <h2 className="text-2xl font-bold text-green-700">FAQs</h2>
              </div>
              <div className="space-y-6">
                {[{ q: "Is there a registration fee?", a: "No, it's free to register as a seller on Swiggy Instamart." },
                  { q: "Do I need GST to register?", a: "Yes, GST is mandatory for selling on Instamart." },
                  { q: "How long is the verification process?", a: "Typically 5–7 business days if documents are complete." }
                ].map((faq, idx) => (
                  <div key={idx} className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors">
                    <h3 className="font-semibold text-gray-900 mb-2">{faq.q}</h3>
                    <p className="text-gray-700">{faq.a}</p>
                  </div>
                ))}
              </div>
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