import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import {
  ArrowUp,
  ChevronRight,
  HelpCircle,
  Package,
  CreditCard,
  User,
  Building,
  Check,
  ShoppingBag,
  X,
  Plus,
} from "lucide-react";
import MeeshoLogo from "../../assets/Meesho1.png";

const Meesho = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [openCategory, setOpenCategory] = useState(null);
  const [openQuestions, setOpenQuestions] = useState({});

  useEffect(() => {
    const handleScroll = () => {
      // Calculate scroll progress
      const totalHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);

      // Show/hide scroll to top button
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleToggle = (idx) => {
    setOpenCategory(openCategory === idx ? null : idx);
  };
  const handleQuestionToggle = (catIdx, qIdx) => {
    setOpenQuestions((prev) => ({
      ...prev,
      [catIdx]: prev[catIdx] === qIdx ? null : qIdx,
    }));
  };
  const faqCategories = [
    {
      title: "General",
      faqs: [
        {
          q: "Do I need a GSTIN to start selling on Meesho?",
          a: "No, you can sell without a GSTIN if you are selling within your own state. However, having a GSTIN is required for interstate sales and access to certain features like Ads.",
        },
        {
          q: "How do I start selling on Meesho?",
          a: "Sign up on supplier.meesho.com, upload your product catalogues, and start receiving orders. Meesho handles shipping and delivers to customers for you.",
        },
        {
          q: "What kind of products can I sell on Meesho?",
          a: "You can sell a wide range of products including fashion, home decor, beauty, electronics accessories, and more. However, prohibited products like alcohol, tobacco, or counterfeit goods are not allowed.",
        },
        {
          q: "How long does it take for my catalog to go live after uploading?",
          a: "It usually takes around 72 hours for your catalog to be reviewed and become live on the platform.",
        },
      ],
    },
    {
      title: "Fees and Charges",
      faqs: [
        {
          q: "Does Meesho charge commission on my sales?",
          a: "No, Meesho charges 0% commission on all products, meaning you keep 100% of your profit.",
        },
        {
          q: "Are there any hidden charges?",
          a: "No, there are no hidden charges. You only pay for shipping, which is clearly mentioned for each order.",
        },
        {
          q: "When will I receive payment for my orders?",
          a: "You will receive your payment directly into your bank account 7 days after the order is delivered, including COD orders.",
        },
        {
          q: "Are there penalties for order cancellations or late dispatch?",
          a: "Yes, Meesho may apply penalties if you frequently cancel orders or delay dispatch. This affects your seller rating and visibility on the platform.",
        },
      ],
    },
    {
      title: "Managing Your Account",
      faqs: [
        {
          q: "How do I change my bank account or address on Meesho?",
          a: 'Log into the Supplier Panel, go to the "Account Settings" section, and update your bank details or pickup address. You may need to verify the new details before changes are applied.',
        },
        {
          q: "Can I cancel an order if I am out of stock?",
          a: "Yes, but frequent cancellations can impact your performance score. It's recommended to keep your inventory updated to avoid such issues.",
        },
        {
          q: "How do I track my orders?",
          a: "You can track order status in real-time through the “Orders” tab in the Supplier Panel. Details like shipping, pickup, and delivery are all available.",
        },
        {
          q: "How do I manage my product listings or inventory?",
          a: "You can upload, update, or delete product catalogs directly from the Supplier Panel. Inventory status can also be edited as needed.",
        },
      ],
    },
    {
      title: "Services",
      faqs: [
        {
          q: "What kind of support is available for Meesho sellers?",
          a: "Meesho provides 24/7 seller support through email, chat, and a dedicated help section in the Supplier Panel. Sellers can raise tickets for any technical, order, or payment-related issues.",
        },
        {
          q: "Are there tools to help me grow my sales on Meesho?",
          a: "Yes, Meesho offers tools like price recommendations, business insights, ad services (for GST sellers), and a Quality Dashboard to help sellers improve performance and increase sales.",
        },
        {
          q: "Can I access training material to learn how to sell effectively?",
          a: "Yes, Meesho has a Learning Hub with video tutorials and step-by-step guides for everything from registration to shipping and managing returns.",
        },
      ],
    },
  ];

  return (
    <>
      <Helmet>
        <title>Meesho Services | 99digicom</title>
        <meta
          name="description"
          content="Complete Meesho marketplace services including account management, listing optimization, and advertising."
        />
        <meta
          name="keywords"
          content="Meesho seller account, Meesho setup, Meesho marketplace, social commerce, online selling"
        />
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
              <img
                src={MeeshoLogo}
                alt="Meesho Logo"
                className="w-48 h-48 object-contain mb-4"
              />
              <h1 className="text-3xl font-bold text-gray-900 text-center">
                Meesho Seller Account Setup
              </h1>
              <p className="text-green-600 text-center mt-2">
                Your Gateway to India's Social Commerce Platform
              </p>
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
                  <h2 className="text-2xl font-bold text-green-700 mb-2">
                    Overview
                  </h2>
                  <p className="text-gray-700">
                    Meesho empowers sellers with over 100 million users. Offers
                    zero commission fees and social media integration. Our
                    comprehensive guide walks you through every step of
                    registering and optimizing your store on India's leading
                    social commerce platform.
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
                  <h2 className="text-2xl font-bold text-green-700 mb-2">
                    Requirements
                  </h2>
                  <p className="text-gray-700 mb-4">
                    To create a Meesho Seller account, you'll need the
                    following:
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center bg-white p-3 rounded-lg shadow-sm">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3">
                    <ShoppingBag className="h-5 w-5 text-green-600" />
                  </div>
                  <span className="font-medium text-gray-800">
                    Active Mobile Number
                  </span>
                </div>
                <div className="flex items-center bg-white p-3 rounded-lg shadow-sm">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3">
                    <User className="h-5 w-5 text-green-600" />
                  </div>
                  <span className="font-medium text-gray-800">
                    Email Address
                  </span>
                </div>
                <div className="flex items-center bg-white p-3 rounded-lg shadow-sm">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3">
                    <CreditCard className="h-5 w-5 text-green-600" />
                  </div>
                  <span className="font-medium text-gray-800">
                    GSTIN (for taxable products)
                  </span>
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
                  <span className="font-medium text-gray-800">
                    Bank Account
                  </span>
                </div>
                <div className="flex items-center bg-white p-3 rounded-lg shadow-sm">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3">
                    <Building className="h-5 w-5 text-green-600" />
                  </div>
                  <span className="font-medium text-gray-800">
                    Business Details
                  </span>
                </div>
                <div className="flex items-center bg-white p-3 rounded-lg shadow-sm">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3">
                    <Package className="h-5 w-5 text-green-600" />
                  </div>
                  <span className="font-medium text-gray-800">
                    Address Proof
                  </span>
                </div>
                <div className="flex items-center bg-white p-3 rounded-lg shadow-sm">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3">
                    <ShoppingBag className="h-5 w-5 text-green-600" />
                  </div>
                  <span className="font-medium text-gray-800">
                    Product Information
                  </span>
                </div>
              </div>

              <div className="mt-4 text-center">
                <a
                  href="https://supplier.meesho.com"
                  className="inline-flex items-center text-green-700 hover:text-green-900 font-medium transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Visit Meesho Supplier Portal
                  <ChevronRight className="ml-1 h-4 w-4" />
                </a>
              </div>
            </div>
          </section>

          {/* FAQ Section with Collapsible Categories */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-center text-green-700 mb-8">
              Meesho Seller FAQs
            </h2>
            <div className="max-w-3xl mx-auto space-y-4">
              {faqCategories.map((cat, idx) => (
                <div key={cat.title} className="bg-white rounded-lg shadow-md">
                  <button
                    className="w-full flex items-center justify-between px-6 py-4 text-left focus:outline-none focus:ring-2 focus:ring-green-500"
                    onClick={() => handleToggle(idx)}
                    aria-expanded={openCategory === idx}
                  >
                    <span className="text-xl font-semibold text-green-700">
                      {cat.title}
                    </span>
                    <span className="ml-4">
                      {openCategory === idx ? (
                        <X className="w-6 h-6 text-green-600" />
                      ) : (
                        <Plus className="w-6 h-6 text-green-600" />
                      )}
                    </span>
                  </button>
                  {openCategory === idx && (
                    <div className="px-6 pb-4">
                      {cat.faqs.map((faq, qIdx) => (
                        <div
                          key={qIdx}
                          className="mb-2 border-b last:border-b-0"
                        >
                          <button
                            className="w-full flex items-center justify-between py-3 text-left focus:outline-none"
                            onClick={() => handleQuestionToggle(idx, qIdx)}
                            aria-expanded={openQuestions[idx] === qIdx}
                          >
                            <span className="font-medium text-gray-900">
                              {faq.q}
                            </span>
                            <span className="ml-2">
                              {openQuestions[idx] === qIdx ? (
                                <X className="w-5 h-5 text-green-600" />
                              ) : (
                                <Plus className="w-5 h-5 text-green-600" />
                              )}
                            </span>
                          </button>
                          {openQuestions[idx] === qIdx && (
                            <div className="pb-3 pl-2 pr-2">
                              <p className="text-gray-700 whitespace-pre-line">
                                {faq.a}
                              </p>
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

          {/* Resources & Notes Section */}
          <section className="mb-12">
            <div className="bg-green-100 rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-bold text-green-700 mb-4">
                Resources
              </h2>
              <ul className="list-disc ml-6 text-gray-700 space-y-2">
                <li>
                  <a
                    href="https://supplier.meesho.com"
                    className="text-green-700 underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Meesho Supplier Portal
                  </a>
                </li>
                <li>Meesho Supplier App</li>
                <li>
                  <a
                    href="mailto:seller@meesho.com"
                    className="text-green-700 underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Meesho Seller Support
                  </a>{" "}
                  or in-app chat
                </li>
                <li>
                  Third-party resources: Seller Rocket, Unicommerce, ClearTax
                </li>
              </ul>
              <h2 className="text-2xl font-bold text-green-700 mt-8 mb-4">
                Notes
              </h2>
              <ul className="list-disc ml-6 text-gray-700 space-y-2">
                <li>Zero-commission model requires strategic pricing.</li>
                <li>Ideal for social media-savvy sellers.</li>
                <li>Review policies regularly.</li>
                <li>Leverage WhatsApp and social platforms.</li>
              </ul>
              <p className="text-gray-700 mt-4">
                By following these steps and leveraging Meesho's tools, you can
                build a successful online business.{" "}
                <b>Start your Meesho selling journey today!</b>
              </p>
            </div>
          </section>

          {/* Call to Action */}
          <div className="text-center mt-12 mb-8">
            <div className="inline-block bg-gradient-to-r from-green-600 to-green-700 text-white font-bold text-xl py-4 px-8 rounded-full shadow-lg transform hover:scale-105 transition-transform duration-300 hover:shadow-xl">
              Ready to Start Selling on Meesho?
            </div>
            <p className="mt-4 text-gray-600">
              Our team of Meesho experts can help you set up and optimize your
              account
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Meesho;
