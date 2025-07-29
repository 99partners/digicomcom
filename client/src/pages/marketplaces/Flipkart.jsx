import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { ArrowUp, ChevronRight, HelpCircle, Package, CreditCard, User, Building, Check, ShoppingBag, X, Plus } from 'lucide-react';
import FlipkartLogo from '../../assets/Flipkart.png';

const Flipkart = () => {
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
        { q: 'Why should I sell on Flipkart?', a: 'Flipkart is a trusted and leading e-commerce platform with over 45 crore+ customers across 19000+ pin codes in India. By selling on Flipkart, you gain access to a vast customer base and India\'s largest shopping festival, The Big Billion Days, along with other major shopping events. The cost of doing business on Flipkart is also low, providing a lucrative opportunity for sellers.' },
        { q: 'How does selling on Flipkart.com work?', a: 'Selling on Flipkart.com is a simple process. Create an account with your GSTIN, valid mobile number, email ID, bank account, and address details. List your products on the platform and manage orders. You can choose to pack and ship the products yourself or utilise Flipkart\'s Fulfilment by Flipkart (FBF) service for hassle-free logistics management. Payments are disbursed within 7* days from the date of product dispatch.' },
        { q: 'What is the minimum listing quantity to sell on Flipkart.com?', a: 'To start selling on Flipkart.com, you only need a minimum of 1 product to list. However, it is recommended to have more products to leverage the wide customer reach and trust of millions of Flipkart users.' },
        { q: 'What products can I sell on Flipkart.com?', a: 'Flipkart.com offers a wide range of categories for sellers to choose from, including clothing, electronics, jewellery, home furnishings, books, mobiles, beauty products, kitchenware, and many more. However, some categories may require prior quality approval before going live on the platform.' },
        { q: 'What do I need to register to sell on Flipkart.com?', a: 'To register and sell products on Flipkart.com, you will need the following details:\nBusiness information\nContact details (email ID and phone number)\nTax registration details, such as GSTIN (mandatory for taxable products) and PAN (mandatory for Book Sellers)' },
        { q: 'I don\'t have a website; can I still sell on Flipkart.com?', a: 'Absolutely! You can sell on Flipkart.com without having a website. Once registered, you will gain access to the Flipkart Seller Hub, where you can list your products and start selling. Please note that Flipkart charges a small fee when your product is sold.' },
        { q: 'What is FAssured?', a: 'FAssured by Flipkart is a special reliability program that offers additional visibility to your products. It includes extra quality checks and ensures faster delivery within 2-4 days. Having the FAssured tag guarantees more orders, increased visibility, faster delivery, and higher quality standards. By obtaining the FAssured badge, you can achieve better revenue and build trust with customers.' },
        { q: 'Can I offer both products and services on Flipkart.com?', a: 'Currently, Flipkart allows sellers to offer only physical products for sale on the platform. However, as a third-party service provider, you can offer specific services to Flipkart sellers to assist them in growing their businesses.' },
      ]
    },
    {
      title: 'Fees & Charges',
      faqs: [
        { q: 'Who decides the price of my products?', a: 'As a seller on Flipkart.com, you have full control over the pricing of your products. You can set the price based on your business strategy and the market dynamics. The seller dashboard also provides analysis and recommendations to help you determine the optimal price for your products.' },
        { q: 'What are the charges for selling on Flipkart.com?', a: 'Flipkart.com does not charge any fees for listing your products on its platform. However, upon a successful sale, there is a small marketplace fee applicable as a percentage of the selling price. You can refer to the Flipkart Seller Fee details for more information.' },
        { q: 'Will I get charged for listing products on Flipkart.com?', a: 'No, there are no charges for listing your products on Flipkart.com. Listing your products is free of cost.' },
        { q: 'How and when do I get paid?', a: 'Once your product is picked up and successfully delivered to the customer, you will receive payment within as fast as 7* days. Payments are securely and regularly transferred directly to your registered bank account after deducting the relevant Flipkart fees.' },
      ]
    },
    {
      title: 'Managing Your Account',
      faqs: [
        { q: 'How do I list my products on Flipkart.com?', a: 'To list your products on Flipkart.com, you need to follow these steps:\nObtain brand approval from Flipkart\'s Brand Regulation Team.\nChoose the appropriate category for your product\nProvide detailed product information such as size, model, colour, brand, etc.\nIf you need any assistance or guidance, you can always reach out to the Flipkart Seller Support Team' },
        { q: 'How do I manage my orders on Flipkart.com?', a: 'Managing orders on Flipkart.com is convenient with our seller dashboard. You have three options:\nPack and ship the orders yourself using your preferred packaging, marking them as \'ready to dispatch\' within the given timeline. Our logistics partner will pick up the orders and deliver them to customers.\nUse Fulfilment by Flipkart (FBF) service, where Flipkart handles the packaging and shipping for you.' },
        { q: 'What do I need to list my products on Flipkart.com?', a: 'To list products on Flipkart.com, you need to provide product details, set competitive prices, include high-quality images, manage your inventory, and provide accurate shipping information.' },
        { q: 'Can I get help with catalogue development (product images, descriptions, etc.)?', a: 'Yes, Flipkart offers dedicated catalogue services to help sellers enhance their product images and descriptions. You can opt for Premium Catalog Services to ensure maximum visibility and customer trust. Additionally, the IGNITE program provides image editing and product cataloguing services at an affordable price, giving your business a kickstart.' },
      ]
    },
    {
      title: 'Services',
      faqs: [
        { q: 'Do you offer protection against fraud?', a: 'Yes, Flipkart.com provides protection against fraud through the Seller Protection Fund (SPF) program. Sellers are eligible for monetary compensation for orders where the returned products have been damaged or missing.' },
        { q: 'Can customers leave feedback and why is customer feedback important?', a: 'Yes, customers can leave feedback and ratings for the products they purchase. Customer feedback is important as it helps build trust and credibility for the seller. Positive feedback and high ratings enhance the seller\'s reputation, attracting more customers and increasing sales. It also provides valuable insights for sellers to improve their products and services.' },
        { q: 'Do I need GST to sell on Flipkart?', a: 'Yes, sellers are required to have GST registration to sell products on Flipkart. For most categories, a regular GSTIN is mandatory. However, for the "Only Books" category, PAN (Permanent Account Number) is mandatory.' },
        { q: 'I am having trouble during registration. Can I get some help?', a: 'If you are facing any issues during the registration process, please provide your details in the form at the end of this section. Our team will promptly assist you with your registration.' },
      ]
    },
    {
      title: 'Fulfillment by Flipkart (FBF)',
      faqs: [
        { q: 'What is Fulfilment by Flipkart (FBF)?', a: 'Fulfilment by Flipkart (FBF) is an exclusive program where Flipkart stores, packs, and delivers your products to customers. It also handles customer service and returns. It offers a hassle-free way to manage your inventory and ensure timely delivery and customer satisfaction.' },
        { q: 'How does FBF work?', a: 'Once you register for FBF, you send your products to Flipkart\'s Fulfilment Centers. Flipkart stores and manages your inventory. When an order is placed, Flipkart packs and ships the products to the customer. Flipkart also handles returns and provides quality assurance.' },
        { q: 'Do I need a minimum number of items to avail FBF?', a: 'No, there is no minimum requirement. You can avail FBF for any number of items, ranging from one to multiple items, across various categories.' },
        { q: 'What are the benefits of FBF?', a: 'By using FBF, you can enjoy the following benefits:\nQuality assurance and trusted customer experience\nNo need to invest in storage infrastructure\nNo impact on seller service metrics\nFaster procurement and delivery for higher customer satisfaction' },
      ]
    },
    {
      title: 'Shopsy by Flipkart',
      faqs: [
        { q: 'What is Shopsy by Flipkart?', a: 'Shopsy by Flipkart is a new selling platform that allows sellers to sell products at a low commission. It is among the fastest-growing marketplaces with 200 Mn+ users shopping through the app. The platform allows sellers to extend their reach to a wide network of budget-friendly customers across the country who are looking out for affordable products.' },
        { q: 'What are the benefits of selling on Shopsy?', a: 'Easy listing - No professional photo shoot required and sellers can upload tabletop and hanger images of their products clicked with mobile phones\nSimple fee structure - The fee structure is easy and simple to understand and provides with one of the lowest cost of doing business\nAccess to Flipkart’s logistics network - Get assured hassle-free pick-up and delivery of products through 900+ pick-up hubs\nOne of the fastest growing marketplaces in India with over 200 Mn+ users' },
      ]
    },
  ];

  return (
    <>
      <Helmet>
        <title>Flipkart Services | 99digicom</title>
        <meta name="description" content="Complete Flipkart marketplace services including account management, Shopsy, listing optimization, and advertising." />
        <meta name="keywords" content="Flipkart seller account, Flipkart setup, Flipkart marketplace, Shopsy, Flipkart seller central" />
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
              <img src={FlipkartLogo} alt="Flipkart Logo" className="w-48 h-48 object-contain mb-4" />
              <h1 className="text-3xl font-bold text-gray-900 text-center">Flipkart Seller Account Setup</h1>
              <p className="text-green-600 text-center mt-2">Your Gateway to India's Largest Marketplace</p>
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
                    Selling on Flipkart provides access to over 300 million users. Our comprehensive guide walks you through every step of creating a seller account and setting up your store on India's leading e-commerce platform.
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
                  <p className="text-gray-700 mb-4">To create a Flipkart Seller account, you'll need the following:</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center bg-white p-3 rounded-lg shadow-sm">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3">
                    <ShoppingBag className="h-5 w-5 text-green-600" />
                  </div>
                  <span className="font-medium text-gray-800">Valid GSTIN</span>
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
                  <span className="font-medium text-gray-800">Business Registration</span>
                </div>
                <div className="flex items-center bg-white p-3 rounded-lg shadow-sm">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3">
                    <User className="h-5 w-5 text-green-600" />
                  </div>
                  <span className="font-medium text-gray-800">ID and Address Proof</span>
                </div>
                <div className="flex items-center bg-white p-3 rounded-lg shadow-sm">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3">
                    <Package className="h-5 w-5 text-green-600" />
                  </div>
                  <span className="font-medium text-gray-800">Pickup Address</span>
                </div>
              </div>
              
              <div className="mt-4 text-center">
                <a 
                  href="https://seller.flipkart.com" 
                  className="inline-flex items-center text-green-700 hover:text-green-900 font-medium transition-colors"
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  Visit Flipkart Seller Hub
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
              <p className="text-gray-600 max-w-2xl mx-auto">Follow these steps to create your Flipkart Seller account quickly and easily</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { step: 1, title: "Visit the Flipkart Seller Hub", details: "Go to seller.flipkart.com" },
                { step: 2, title: "Enter Business Information", details: "Location, type, and contact details" },
                { step: 3, title: "Verify Your Account", details: "Upload documents and complete KYC" },
                { step: 4, title: "Set Up Your Seller Profile", details: "Business details and bank information" },
                { step: 5, title: "List Your First Product", details: "Add product details and images" },
                { step: 6, title: "Agree to Terms", details: "Review and accept seller agreement" },
                { step: 7, title: "Explore Seller Hub Features", details: "Dashboard, analytics, and tools" },
                { step: 8, title: "Start Selling", details: "Launch your products and manage orders" }
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
                    question: "Is GSTIN mandatory?", 
                    answer: "Required for most products, except for exempt categories like books." 
                  },
                  { 
                    question: "Are there listing fees?", 
                    answer: "No, only commissions on sales, which vary by category (typically 5-25%)." 
                  },
                  { 
                    question: "Can individuals sell?", 
                    answer: "Yes, as sole proprietorship with appropriate documentation." 
                  },
                  { 
                    question: "How long does verification take?", 
                    answer: "Account creation is quick, but document verification typically takes 3-5 business days." 
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
                <li><a href="https://seller.flipkart.com" className="text-green-700 underline" target="_blank" rel="noopener noreferrer">Flipkart Seller Hub</a></li>
                <li>Flipkart Seller Hub Mobile App</li>
                <li><a href="https://seller.flipkart.com/support" className="text-green-700 underline" target="_blank" rel="noopener noreferrer">Flipkart Help Center</a></li>
                <li>Third-party resources: Unicommerce, RevBoosters, ClearTax</li>
              </ul>
              <h2 className="text-2xl font-bold text-green-700 mt-8 mb-4">Important Notes</h2>
              <ul className="list-disc ml-6 text-gray-700 space-y-2">
                <li>High commission fees (up to 50%) and return costs may impact profits.</li>
                <li>Ensure compliance with Flipkart's policies and catalog guidelines.</li>
                <li>Confirm eligibility for GST-exempt products to optimize pricing.</li>
              </ul>
              <p className="text-gray-700 mt-4">By following these steps and leveraging Flipkart's tools, you can establish a successful online business. <b>Start your selling journey today!</b></p>
            </div>
          </section>

          {/* Call to Action */}
          <div className="text-center mt-12 mb-8">
            <div className="inline-block bg-gradient-to-r from-green-600 to-green-700 text-white font-bold text-xl py-4 px-8 rounded-full shadow-lg transform hover:scale-105 transition-transform duration-300 hover:shadow-xl">
              Ready to Start Selling on Flipkart?
            </div>
            <p className="mt-4 text-gray-600">Our team of Flipkart experts can help you set up and optimize your account</p>
          </div>

          {/* FAQ Section with Collapsible Categories */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-center text-green-700 mb-8">Flipkart Seller FAQs</h2>
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

export default Flipkart;