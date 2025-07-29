import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { ArrowUp, ChevronRight, HelpCircle, Shield, Package, CreditCard, User, Building, Check, X, Plus } from 'lucide-react';
import AmazonLogo from '../../assets/Amazon.png';

const Amazon = () => {
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
        { q: 'What is Sell on Amazon or SOA?', a: 'Sell on Amazon is a program that enables you to list and sell your product on Amazon.in.' },
        { q: 'How does selling on Amazon.in work?', a: 'Selling on Amazon.in is easy. First you list the products that you want to sell on Amazon.in marketplace. Customer sees your product and makes a purchase. You will receive a notification to ship the product. You deliver the product to the customer and confirm shipment or let Amazon fulfill the order for you through FBA or Easy ship. Amazon will deposit the funds into your bank account after deducting our fees.' },
        { q: 'What products can I sell on Amazon.in?', a: 'You can sell items in the following categories:\n\nApparel, Automotive, Baby Products, Batteries, Beauty, Books, Consumables, Consumer Electronics (including Cameras and Video Games - Consoles), Digital Accessories (including Mobile Accessories, Electronics Accessories and PC Accessories), Groceries, Home, Jewelery, Kitchen, Luggage, Mobile Phones, Movies, Musical Instruments, Office and Stationary, Personal Care Appliances, Personal Computers, Pet Supplies, Software, Shoes and Handbags, Tablets, Toys, Video games (consoles and games) and Watches.\n\nPlease note that certain categories are restricted and require prior approval before you can start selling.' },
        { q: 'What do I need to register as a seller on Amazon.in?', a: 'Please click here to register to sell on Amazon.in\nYou will need the following information to register:\nYour business details\nYour contact details - email and phone number\nBasic information about your business\nTax Registration Details (PAN and GST). GST Details are mandatory if you are listing taxable goods and need to be provided at the time of registration' },
        { q: 'I don’t have a website, can I still sell on Amazon.in?', a: 'You don\'t need a website to start selling on Amazon.in marketplace. Once you complete registration, you will have access to our Seller Central platform using which you can list your products for sale on amazon.in.' },
        { q: 'Who takes care of shipping?', a: 'This depends on which fulfillment option you use to deliver your products. With FBA & Easy Ship, Amazon will handle the delivery of products to customers (and returns). When you choose Self-ship, you will deliver the products yourself where you can use third party courier services or your own delivery associates (for Local Shops)\nCompare Fulfillment Options' },
        { q: 'Who takes care of packaging? If I take care of packaging, where do I get the packaging material from?', a: 'Packaging depends on your which fulfillment option you use to deliver your products. With FBA, we take care of packaging your product in a delivery box. With Easy Ship and Self Ship, you will have to take care of packaging, and you can purchase Amazon packaging material.\nCompare Fulfillment Options' },
        { q: 'If I list my products using Sell on Amazon, will the customer know that he or she is purchasing from me on Amazon.in marketplace?', a: 'We will clearly indicate on our product detail pages and offer listing pages that the product is sold by you and the invoice will carry your name.' },
        { q: 'What is a Offer Display?', a: 'Offer Display is a white box on the right side of the product detail page where customers can add products for purchase. Only seller with excellent metrics and performance can avail the Offer Display.' },
        { q: 'What is Prime badge?', a: 'Prime Badge is offered to Prime Sellers who enjoy special services by subscribing to Fulfillment by Amazon (FBA), Local Shops on Amazon, or Seller Flex. A Prime Badge helps you seamlessly store and ship your products and sell your products on Prime Day. Find out more about the benefits of Prime Badge here.' },
      ]
    },
    {
      title: 'Fees and Charges',
      faqs: [
        { q: 'What are the charges for selling on Amazon.in?', a: 'We charge you when you get an order. Listing on Amazon.in is free. Refer to Pricing for more details.' },
        { q: 'What are different fees that Amazon.in charges?', a: 'Click here to know the different types of fees applicable for an Amazon Seller.' },
        { q: 'How can I calculate profitability?', a: 'You can calculate the approximate fees per products using our calculator here. By deducting your cost price, you can assess your profitability and which fulfillment channel is right for which of your products.' },
        { q: 'Can I cancel my account?', a: 'You can stop selling at any time. If you have availed any paid Amazon services, contact seller support from the bottom any Seller Central page to get them removed.' },
        { q: 'How and when do I get paid?', a: 'You are eligible to get paid for the order 7 days after the order is delivered. Amazon.in ensures payment for your sales (minus the Amazon Seller fees) is deposited securely into your bank account every 7 days, including your Pay on Delivery orders.' },
      ]
    },
    {
      title: 'Managing your Account',
      faqs: [
        { q: 'How do I list my products on Amazon.in?', a: 'You can use our Web-based interface to list products one at a time, or excel-based inventory files to list your products in bulk. The procedure and information required will vary depending on whether your products are already in the Amazon.in catalogue. Once you complete your registration for selling on Amazon, you will be guided on the steps needed to list your products. Learn more about the listing process here.\nPlease note that currently it is mandatory to have ISBN/bar codes to list on Amazon. If you are a manufacturer or do not have these, you can request for an exception by contacting seller support through your Seller Central account. Some product categories might require additional information to list your products.' },
        { q: 'How can I list a product that does not have barcodes?', a: 'If the product you sell does not have a barcode or a Global Trade Item Number (GTIN), you can request a GTIN exemption to sell your products on Amazon. Once we have reviewed and approved your application, you will be able to list your products.' },
        { q: 'How do I manage my orders on Amazon.in?', a: 'You can view your orders and manage them through “Manage Order” inside Seller Central (you will have access to sellercentral.amazon.in after your complete registration). If you are using Fulfilment by Amazon, your orders will be fulfilled and shipped by Amazon. If you are using Easy Ship, you can pack your orders and schedule pickup for our team through your Seller Central account. If you choose to store and deliver your products on your own, you need to pack and ship products to customers and then confirm to the customer about the shipment through your Seller Central account.' },
        { q: 'Are there requirements for my category?', a: 'To know more about different documentation requirements for different categories, click here.' },
        { q: 'How can I grow my business on Amazon.in?', a: 'Click here to know how you can grow your business.' },
        { q: 'I want to opt for Easy Ship but I don’t have packaging material?', a: 'Whether you use Amazon\'s delivery service (Easy Ship) or ship through 3rd party carriers, you can purchase Amazon packaging material to wrap your products. Choose from polybags, corrugated boxes and Amazon sealing tape based on your packaging needs. Once you are registered as a seller, you will find links to purchase in the Seller Central Help sections\n(You can also use your own packaging material).' },
      ]
    },
    {
      title: 'Services',
      faqs: [
        { q: 'Does Amazon.in offer protection against fraud?', a: 'Yes. Amazon helps you protect against fraudulent orders placed on your products and payment fraud.' },
        { q: 'Can customers leave feedback and why is customer feedback important?', a: 'Yes. Customers can leave feedback. Maintaining a high feedback rating is a critical factor for success on Amazon.in. It’s the best way for customers to identify you as a trustworthy seller. Your rating appears on the Offer Listing Page and is one of the first things that customers see. In other marketplaces, we have observed that customers are more likely to purchase products from sellers with higher ratings. Your feedback rating is a key metric used by Amazon.in to measure your performance.' },
        { q: 'I\'m having trouble during registration. Can I get some help?', a: 'If you are stuck during registration, you can get help in our Registration Guide\nOnce you are registered Amazon seller, you can also contact seller support once you complete your registration through your Seller Central account. Once you are logged in, use the "Help" button on the top right find a variety of help options. If you cannot find an answer to your question, click "Get Support" to get in-person support.' },
        { q: 'What do I need to register as a seller on Amazon.in?', a: 'You will need the following information to register:\nYour business details.\nYour contact details - email and phone number.\nBasic information about your business.\nTax Registration Details (PAN and GST). GST Details are mandatory if you are listing taxable goods and need to be provided at the time of registration.\nTo start your registration click here' },
        { q: 'Do I need GST number to sell on Amazon.in?', a: 'Yes. If you are listing taxable goods, GST details are required to sell online. You need to provide GST number to Amazon at the time of registration. However, if you are selling only GST exempted categories, then this may not be required. Note that if you start selling any taxable goods you need to register for GST as per GST laws and provide your GST number to Amazon.' },
        { q: 'Can I get help for capturing images and creating digital catalogs as per Amazon guidelines?', a: 'We have 3rd party providers who are trained on Amazon’s imaging and cataloging guidelines and can assist you in creating high impact listings. They also have preferential rates and offers for Amazon sellers. You can contact them anytime through your Seller Central account once you complete registration.' },
        { q: 'Where can I get Amazon branded packaging material?', a: 'Your packaging requirements depend on your chosen fulfillment option. You can also search for Amazon branded packaging material on Amazon.in and select the appropriate packaging material according to your packaging requirements.' },
      ]
    },
  ];

  return (
    <>
      <Helmet>
        <title>Amazon Services | 99digicom</title>
        <meta name="description" content="Comprehensive Amazon marketplace services including account management, brand store, listing optimization, and advertising." />
        <meta name="keywords" content="Amazon seller account, Amazon setup, Amazon marketplace, Amazon FBA, Amazon seller central" />
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
              <img src={AmazonLogo} alt="Amazon Logo" className="w-48 h-48 object-contain mb-4" />
              <h1 className="text-3xl font-bold text-gray-900 text-center">Amazon Seller Account Setup</h1>
              <p className="text-green-600 text-center mt-2">Your Gateway to Amazon Marketplace Success</p>
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
                    Set up an Amazon Seller account to sell on the world's largest online marketplace. Our comprehensive guide walks you through every step of the process, from initial registration to optimizing your listings for maximum sales.
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
                  <p className="text-gray-700 mb-4">To create an Amazon Seller account, you'll need the following:</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center bg-white p-3 rounded-lg shadow-sm">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3">
                    <User className="h-5 w-5 text-green-600" />
                  </div>
                  <span className="font-medium text-gray-800">Business Email Address</span>
                </div>
                <div className="flex items-center bg-white p-3 rounded-lg shadow-sm">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3">
                    <CreditCard className="h-5 w-5 text-green-600" />
                  </div>
                  <span className="font-medium text-gray-800">Bank Account Information</span>
                </div>
                <div className="flex items-center bg-white p-3 rounded-lg shadow-sm">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3">
                    <Shield className="h-5 w-5 text-green-600" />
                  </div>
                  <span className="font-medium text-gray-800">Government-Issued ID</span>
                </div>
                <div className="flex items-center bg-white p-3 rounded-lg shadow-sm">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3">
                    <Building className="h-5 w-5 text-green-600" />
                  </div>
                  <span className="font-medium text-gray-800">Business Details (if applicable)</span>
                </div>
                <div className="flex items-center bg-white p-3 rounded-lg shadow-sm">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3">
                    <Package className="h-5 w-5 text-green-600" />
                  </div>
                  <span className="font-medium text-gray-800">Credit Card</span>
                </div>
                <div className="flex items-center bg-white p-3 rounded-lg shadow-sm">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3">
                    <span className="font-bold text-green-600">18+</span>
                  </div>
                  <span className="font-medium text-gray-800">Age Requirement: 18+</span>
                </div>
              </div>

              <div className="mt-4 text-center">
                <a
                  href="https://sellercentral.amazon.com/gp/help/external/200405020"
                  className="inline-flex items-center text-green-700 hover:text-green-900 font-medium transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Check Amazon's list of supported countries
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
              <p className="text-gray-600 max-w-2xl mx-auto">Follow these steps to create your Amazon Seller account quickly and easily</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { step: 1, title: "Visit Amazon Seller Sign-Up Page", details: "Go to sellercentral.amazon.com" },
                { step: 2, title: "Choose a Selling Plan", details: "Individual: $0.99/item or Professional: $39.99/month" },
                { step: 3, title: "Enter Business Information", details: "Location, type, and contact details" },
                { step: 4, title: "Provide Billing Information", details: "Bank account and credit card details" },
                { step: 5, title: "Verify Your Identity", details: "Upload ID, video call, or postcard verification" },
                { step: 6, title: "Set Up Your Store", details: "Choose store name, add logo and policies" },
                { step: 7, title: "Add Products", details: "Match existing listings or create new ones" },
                { step: 8, title: "Configure Seller Central", details: "Enable 2FA and set up notifications" }
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
                    question: "Is it free to set up?",
                    answer: "Account creation is free; fees apply per sale or with the Professional plan ($39.99/month)."
                  },
                  {
                    question: "Can I sell internationally?",
                    answer: "Yes, with a U.S. account or by creating separate regional accounts for different marketplaces."
                  },
                  {
                    question: "Do I need a business entity?",
                    answer: "No, you can start as an individual seller, but registering a business is recommended for scaling."
                  },
                  {
                    question: "How long does verification take?",
                    answer: "Identity verification typically takes 24-48 hours, but can vary depending on your country and verification method."
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
            <h2 className="text-3xl font-bold text-center text-green-700 mb-8">Amazon Seller FAQs</h2>
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

export default Amazon;