// import React from 'react';
// import { Helmet } from 'react-helmet';

// const Amazon = () => {
//   return (
//     <>
//       <Helmet>
//         <title>Amazon Services | 99digicom</title>
//         <meta name="description" content="Comprehensive Amazon marketplace services including account management, brand store, listing optimization, and advertising." />
//       </Helmet>
//       <div className="min-h-screen pt-20 bg-gradient-to-br from-green-50 to-white">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <h1 className="text-4xl font-bold text-gray-900 mb-8">Amazon Seller Account Setup Guide</h1>
//           {/* Overview Section */}
//           <section className="mb-12">
//             <div className="bg-white rounded-lg shadow-md p-8 mb-6">
//               <h2 className="text-2xl font-bold text-green-700 mb-2">Overview</h2>
//               <p className="text-gray-700">
//                 Set up an Amazon Seller account to sell on a major online marketplace.
//               </p>
//             </div>
//           </section>
//           {/* Requirements Section */}
//           <section className="mb-12">
//             <div className="bg-green-50 border-l-4 border-green-400 p-8 rounded-lg shadow mb-6">
//               <h2 className="text-2xl font-bold text-green-700 mb-2">Requirements</h2>
//               <ul className="list-disc ml-6 text-gray-700 space-y-2">
//                 <li><b>Business Email Address</b></li>
//                 <li><b>Bank Account Information</b></li>
//                 <li><b>Phone Number</b></li>
//                 <li><b>Tax Information</b></li>
//                 <li><b>Government-Issued ID</b></li>
//                 <li><b>Credit Card</b></li>
//                 <li><b>Business Details</b> (if applicable)</li>
//                 <li><b>Age Requirement:</b> 18+</li>
//                 <li><b>Supported Country</b> (<a href="https://sellercentral.amazon.com/gp/help/external/200405020" className="text-green-700 underline" target="_blank" rel="noopener noreferrer">Check Amazon’s list</a>)</li>
//               </ul>
//             </div>
//           </section>
//           {/* Step-by-Step Setup Process */}
//           <section className="mb-12">
//             <div className="text-center mb-10">
//               <h2 className="text-2xl font-bold text-gray-900 mb-2">Step-by-Step Setup Process</h2>
//             </div>
//             <div className="flex justify-center">
//               <ol className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full max-w-4xl">
//                 <li className="bg-white rounded-2xl shadow-lg p-8 flex items-start w-full">
//                   <span className="flex-shrink-0 h-12 w-12 flex items-center justify-center rounded-full bg-green-100 text-green-700 font-bold mr-6 text-xl">1</span>
//                   <div className="flex-1">
//                     <span className="font-semibold text-gray-900">Visit the Amazon Seller Sign-Up Page</span>
//                   </div>
//                 </li>
//                 <li className="bg-white rounded-2xl shadow-lg p-8 flex items-start w-full">
//                   <span className="flex-shrink-0 h-12 w-12 flex items-center justify-center rounded-full bg-green-100 text-green-700 font-bold mr-6 text-xl">2</span>
//                   <div className="flex-1">
//                     <span className="font-semibold text-gray-900">Choose a Selling Plan</span>
//                     <ul className="list-disc ml-6 text-gray-600">
//                       <li><b>Individual Plan:</b> $0.99/item</li>
//                       <li><b>Professional Plan:</b> $39.99/month</li>
//                     </ul>
//                   </div>
//                 </li>
//                 <li className="bg-white rounded-2xl shadow-lg p-8 flex items-start w-full">
//                   <span className="flex-shrink-0 h-12 w-12 flex items-center justify-center rounded-full bg-green-100 text-green-700 font-bold mr-6 text-xl">3</span>
//                   <div className="flex-1">
//                     <span className="font-semibold text-gray-900">Enter Business Information</span>
//                     <ul className="list-disc ml-6 text-gray-600">
//                       <li><b>Business Location</b></li>
//                       <li><b>Business Type</b></li>
//                       <li><b>Primary Contact</b></li>
//                     </ul>
//                   </div>
//                 </li>
//                 <li className="bg-white rounded-2xl shadow-lg p-8 flex items-start w-full">
//                   <span className="flex-shrink-0 h-12 w-12 flex items-center justify-center rounded-full bg-green-100 text-green-700 font-bold mr-6 text-xl">4</span>
//                   <div className="flex-1">
//                     <span className="font-semibold text-gray-900">Provide Billing and Tax Information</span>
//                     <ul className="list-disc ml-6 text-gray-600">
//                       <li>Bank Account</li>
//                       <li>Credit Card</li>
//                       <li>Tax Details</li>
//                     </ul>
//                   </div>
//                 </li>
//                 <li className="bg-white rounded-2xl shadow-lg p-8 flex items-start w-full">
//                   <span className="flex-shrink-0 h-12 w-12 flex items-center justify-center rounded-full bg-green-100 text-green-700 font-bold mr-6 text-xl">5</span>
//                   <div className="flex-1">
//                     <span className="font-semibold text-gray-900">Verify Your Identity</span>
//                     <ul className="list-disc ml-6 text-gray-600">
//                       <li>Upload ID</li>
//                       <li>Video Call (if required)</li>
//                       <li>Postcard Verification (for businesses)</li>
//                     </ul>
//                   </div>
//                 </li>
//                 <li className="bg-white rounded-2xl shadow-lg p-8 flex items-start w-full">
//                   <span className="flex-shrink-0 h-12 w-12 flex items-center justify-center rounded-full bg-green-100 text-green-700 font-bold mr-6 text-xl">6</span>
//                   <div className="flex-1">
//                     <span className="font-semibold text-gray-900">Set Up Your Store</span>
//                     <ul className="list-disc ml-6 text-gray-600">
//                       <li>Choose Store Name</li>
//                       <li>Add Description, Logo, Policies</li>
//                     </ul>
//                   </div>
//                 </li>
//                 <li className="bg-white rounded-2xl shadow-lg p-8 flex items-start w-full">
//                   <span className="flex-shrink-0 h-12 w-12 flex items-center justify-center rounded-full bg-green-100 text-green-700 font-bold mr-6 text-xl">7</span>
//                   <div className="flex-1">
//                     <span className="font-semibold text-gray-900">Add Products to Your Inventory</span>
//                     <ul className="list-disc ml-6 text-gray-600">
//                       <li>Match or Create Listings</li>
//                       <li>Optimize with Keywords</li>
//                     </ul>
//                   </div>
//                 </li>
//                 <li className="bg-white rounded-2xl shadow-lg p-8 flex items-start w-full">
//                   <span className="flex-shrink-0 h-12 w-12 flex items-center justify-center rounded-full bg-green-100 text-green-700 font-bold mr-6 text-xl">8</span>
//                   <div className="flex-1">
//                     <span className="font-semibold text-gray-900">Configure Seller Central</span>
//                     <ul className="list-disc ml-6 text-gray-600">
//                       <li>Manage Listings and Orders</li>
//                       <li>Enable Two-Step Verification</li>
//                       <li>Enroll in Brand Registry (if applicable)</li>
//                     </ul>
//                   </div>
//                 </li>
//               </ol>
//             </div>
//           </section>
//           {/* Post-Setup Tips Section */}
//           <section className="mb-12">
//             <div className="bg-green-50 border-l-4 border-green-400 p-8 rounded-lg shadow mb-6">
//               <h2 className="text-2xl font-bold text-green-700 mb-2">Post-Setup Tips</h2>
//               <ul className="list-disc ml-6 text-gray-700 space-y-2">
//                 <li><b>Understand Amazon Policies</b></li>
//                 <li><b>Choose a Fulfillment Method:</b>
//                   <ul className="list-disc ml-6">
//                     <li><b>FBA:</b> Amazon handles shipping</li>
//                     <li><b>FBM:</b> You manage shipping</li>
//                     <li><b>Easy Ship (India):</b> You store, Amazon delivers</li>
//                   </ul>
//                 </li>
//                 <li><b>Optimize Listings</b></li>
//                 <li><b>Monitor Performance</b></li>
//               </ul>
//             </div>
//           </section>
//           {/* Common Questions Section */}
//           <section className="mb-12">
//             <div className="bg-white rounded-lg shadow-md p-8">
//               <h2 className="text-2xl font-bold text-green-700 mb-4">Common Questions</h2>
//               <div className="space-y-6">
//                 <div>
//                   <span className="font-semibold text-gray-900">Is it free to set up?</span>
//                   <p className="text-gray-700">Account creation is free; fees apply per sale or monthly.</p>
//                 </div>
//                 <div>
//                   <span className="font-semibold text-gray-900">Can I sell internationally?</span>
//                   <p className="text-gray-700">Yes, with U.S. account or separate regional accounts.</p>
//                 </div>
//                 <div>
//                   <span className="font-semibold text-gray-900">Do I need a business entity?</span>
//                   <p className="text-gray-700">No, but recommended for scaling.</p>
//                 </div>
//               </div>
//             </div>
//           </section>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Amazon;


import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { ArrowUp, ChevronRight, HelpCircle, Shield, Package, CreditCard, User, Building, Check, X } from 'lucide-react';

const Amazon = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);

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
          className="fixed bottom-8 right-8 bg-green-600 text-white p-3 rounded-full shadow-lg hover:bg-green-700 transition-all duration-300 z-40 animate-bounce-slow"
          aria-label="Scroll to top"
        >
          <ArrowUp size={24} />
        </button>
      )}

      <div className="min-h-screen pt-20 bg-gradient-to-br from-green-50 via-white to-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header Section with Logo */}
          <div className="flex items-center justify-center mb-10">
            <div className="bg-white p-4 rounded-xl shadow-md flex items-center">
              <div className="w-16 h-16 bg-yellow-500 rounded-md flex items-center justify-center mr-4">
                <span className="text-white text-2xl font-bold">A</span>
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Amazon Seller Account Setup</h1>
                <p className="text-green-600">Your Gateway to Amazon Marketplace Success</p>
              </div>
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

          {/* Post-Setup Tips Section */}
          <section className="mb-12">
            <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-lg shadow-lg p-8 mb-6 transform hover:shadow-xl transition-all duration-300">
              <div className="flex items-start mb-4">
                <div className="mr-6">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                    <Shield className="h-6 w-6 text-green-600" />
                  </div>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white mb-2">Post-Setup Tips</h2>
                  <p className="text-green-100">Maximize your Amazon selling experience with these expert recommendations</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white bg-opacity-10 rounded-lg p-4">
                  <h3 className="font-semibold text-white mb-2">Understand Amazon Policies</h3>
                  <p className="text-green-100 text-sm">Familiarize yourself with Amazon's terms of service and selling policies</p>
                </div>
                <div className="bg-white bg-opacity-10 rounded-lg p-4">
                  <h3 className="font-semibold text-white mb-2">Choose Fulfillment Method</h3>
                  <p className="text-green-100 text-sm">FBA, FBM, or Easy Ship (India) - select what works best for your business</p>
                </div>
                <div className="bg-white bg-opacity-10 rounded-lg p-4">
                  <h3 className="font-semibold text-white mb-2">Optimize Listings</h3>
                  <p className="text-green-100 text-sm">Use high-quality images, compelling titles, and relevant keywords</p>
                </div>
                <div className="bg-white bg-opacity-10 rounded-lg p-4">
                  <h3 className="font-semibold text-white mb-2">Monitor Performance</h3>
                  <p className="text-green-100 text-sm">Regularly check your analytics and customer feedback</p>
                </div>
              </div>
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

          {/* Call to Action */}
          <div className="text-center mt-12 mb-8">
            <div className="inline-block bg-gradient-to-r from-green-600 to-green-700 text-white font-bold text-xl py-4 px-8 rounded-full shadow-lg transform hover:scale-105 transition-transform duration-300 hover:shadow-xl">
              Ready to Start Selling on Amazon?
            </div>
            <p className="mt-4 text-gray-600">Our team of Amazon experts can help you set up and optimize your account</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Amazon;