// import React from 'react';
// import { Helmet } from 'react-helmet';

// const Flipkart = () => {
//   return (
//     <>
//       <Helmet>
//         <title>Flipkart Services | 99digicom</title>
//         <meta name="description" content="Complete Flipkart marketplace services including account management, Shopsy, listing optimization, and advertising." />
//       </Helmet>
//       <div className="min-h-screen pt-20 bg-gradient-to-br from-green-50 to-white">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <h1 className="text-4xl font-bold text-gray-900 mb-8">Flipkart Seller Account Setup Guide</h1>

//           {/* Overview Section */}
//           <section className="mb-12">
//             <div className="bg-white rounded-lg shadow-md p-8 mb-6">
//               <h2 className="text-2xl font-bold text-green-700 mb-2">Overview</h2>
//               <p className="text-gray-700">
//                 Selling on Flipkart provides access to over 300 million users. Steps to create a seller account and set up a store.
//               </p>
//             </div>
//           </section>

//           {/* Requirements Section */}
//           <section className="mb-12">
//             <div className="bg-green-50 border-l-4 border-green-400 p-8 rounded-lg shadow mb-6">
//               <h2 className="text-2xl font-bold text-green-700 mb-2">Requirements</h2>
//               <ul className="list-disc ml-6 text-gray-700 space-y-2">
//                 <li><b>Valid GSTIN</b></li>
//                 <li><b>PAN Card</b></li>
//                 <li><b>Bank Account</b></li>
//                 <li><b>Business Registration Documents</b></li>
//                 <li><b>ID and Address Proof</b></li>
//                 <li><b>Email ID and Phone Number</b></li>
//                 <li><b>Pickup Address</b></li>
//                 <li><b>Minimum One Product</b></li>
//                 <li><b>Age Requirement:</b> 18+</li>
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
//                     <span className="font-semibold text-gray-900">Visit the Flipkart Seller Hub</span>
//                   </div>
//                 </li>
//                 <li className="bg-white rounded-2xl shadow-lg p-8 flex items-start w-full">
//                   <span className="flex-shrink-0 h-12 w-12 flex items-center justify-center rounded-full bg-green-100 text-green-700 font-bold mr-6 text-xl">2</span>
//                   <div className="flex-1">
//                     <span className="font-semibold text-gray-900">Enter Business and Contact Information</span>
//                   </div>
//                 </li>
//                 <li className="bg-white rounded-2xl shadow-lg p-8 flex items-start w-full">
//                   <span className="flex-shrink-0 h-12 w-12 flex items-center justify-center rounded-full bg-green-100 text-green-700 font-bold mr-6 text-xl">3</span>
//                   <div className="flex-1">
//                     <span className="font-semibold text-gray-900">Verify Your Account</span>
//                   </div>
//                 </li>
//                 <li className="bg-white rounded-2xl shadow-lg p-8 flex items-start w-full">
//                   <span className="flex-shrink-0 h-12 w-12 flex items-center justify-center rounded-full bg-green-100 text-green-700 font-bold mr-6 text-xl">4</span>
//                   <div className="flex-1">
//                     <span className="font-semibold text-gray-900">Set Up Your Seller Profile</span>
//                   </div>
//                 </li>
//                 <li className="bg-white rounded-2xl shadow-lg p-8 flex items-start w-full">
//                   <span className="flex-shrink-0 h-12 w-12 flex items-center justify-center rounded-full bg-green-100 text-green-700 font-bold mr-6 text-xl">5</span>
//                   <div className="flex-1">
//                     <span className="font-semibold text-gray-900">List Your First Product</span>
//                   </div>
//                 </li>
//                 <li className="bg-white rounded-2xl shadow-lg p-8 flex items-start w-full">
//                   <span className="flex-shrink-0 h-12 w-12 flex items-center justify-center rounded-full bg-green-100 text-green-700 font-bold mr-6 text-xl">6</span>
//                   <div className="flex-1">
//                     <span className="font-semibold text-gray-900">Agree to Terms and Conditions</span>
//                   </div>
//                 </li>
//                 <li className="bg-white rounded-2xl shadow-lg p-8 flex items-start w-full">
//                   <span className="flex-shrink-0 h-12 w-12 flex items-center justify-center rounded-full bg-green-100 text-green-700 font-bold mr-6 text-xl">7</span>
//                   <div className="flex-1">
//                     <span className="font-semibold text-gray-900">Explore Seller Hub Features</span>
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
//                 <li><b>Optimize Product Listings</b></li>
//                 <li><b>Choose a Fulfillment Model:</b>
//                   <ul className="list-disc ml-6">
//                     <li><b>Fulfillment by Flipkart (FBF)</b></li>
//                     <li><b>Non-FBF</b></li>
//                   </ul>
//                 </li>
//                 <li><b>Leverage Marketing Tools</b></li>
//                 <li><b>Provide Excellent Customer Service</b></li>
//                 <li><b>Monitor Fees and Payments</b></li>
//                 <li><b>Avoid Common Issues</b></li>
//                 <li><b>Use Support Resources</b></li>
//               </ul>
//             </div>
//           </section>

//           {/* Common Questions Section */}
//           <section className="mb-12">
//             <div className="bg-white rounded-lg shadow-md p-8">
//               <h2 className="text-2xl font-bold text-green-700 mb-4">Common Questions</h2>
//               <div className="space-y-6">
//                 <div>
//                   <span className="font-semibold text-gray-900">Is GSTIN mandatory?</span>
//                   <p className="text-gray-700">Required for most products, except for exempt categories.</p>
//                 </div>
//                 <div>
//                   <span className="font-semibold text-gray-900">Are there listing fees?</span>
//                   <p className="text-gray-700">No, only commissions on sales.</p>
//                 </div>
//                 <div>
//                   <span className="font-semibold text-gray-900">Can individuals sell?</span>
//                   <p className="text-gray-700">Yes, as sole proprietorship.</p>
//                 </div>
//                 <div>
//                   <span className="font-semibold text-gray-900">How long does registration take?</span>
//                   <p className="text-gray-700">10 minutes, verification a few days.</p>
//                 </div>
//               </div>
//             </div>
//           </section>

//           {/* Resources & Notes Section */}
//           <section className="mb-12">
//             <div className="bg-green-100 rounded-lg shadow-md p-8">
//               <h2 className="text-2xl font-bold text-green-700 mb-4">Resources</h2>
//               <ul className="list-disc ml-6 text-gray-700 space-y-2">
//                 <li><a href="https://seller.flipkart.com" className="text-green-700 underline" target="_blank" rel="noopener noreferrer">Flipkart Seller Hub</a></li>
//                 <li>Flipkart Seller Hub App</li>
//                 <li><a href="https://seller.flipkart.com/support" className="text-green-700 underline" target="_blank" rel="noopener noreferrer">Flipkart Help Center</a></li>
//                 <li>Third-party resources: Unicommerce, RevBoosters, ClearTax</li>
//               </ul>
//               <h2 className="text-2xl font-bold text-green-700 mt-8 mb-4">Notes</h2>
//               <ul className="list-disc ml-6 text-gray-700 space-y-2">
//                 <li>High commission fees (up to 50%) and return costs may impact profits.</li>
//                 <li>Ensure compliance with Flipkart’s policies.</li>
//                 <li>Confirm eligibility for GST-exempt products.</li>
//               </ul>
//               <p className="text-gray-700 mt-4">By following these steps and leveraging Flipkart’s tools, you can establish a successful online business. <b>Start your selling journey today!</b></p>
//             </div>
//           </section>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Flipkart;

import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { ArrowUp, ChevronRight, HelpCircle, Package, CreditCard, User, Building, Check, X, ShoppingBag } from 'lucide-react';

const Flipkart = () => {
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
          className="fixed bottom-8 right-8 bg-green-600 text-white p-3 rounded-full shadow-lg hover:bg-green-700 transition-all duration-300 z-40 animate-bounce-slow"
          aria-label="Scroll to top"
        >
          <ArrowUp size={24} />
        </button>
      )}

      <div className="min-h-screen pt-20 bg-gradient-to-br from-green-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header Section with Logo */}
          <div className="flex items-center justify-center mb-10">
            <div className="bg-white p-4 rounded-xl shadow-md flex items-center">
              <div className="w-16 h-16 bg-green-500 rounded-md flex items-center justify-center mr-4">
                <ShoppingBag className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Flipkart Seller Account Setup</h1>
                <p className="text-green-600">Your Gateway to India's Largest Marketplace</p>
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

          {/* Post-Setup Tips Section */}
          <section className="mb-12">
            <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-lg shadow-lg p-8 mb-6">
              <div className="flex items-start mb-4">
                <div className="mr-6">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                    <Check className="h-6 w-6 text-green-600" />
                  </div>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white mb-2">Post-Setup Tips</h2>
                  <p className="text-green-100">Maximize your Flipkart selling experience with these expert recommendations</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white bg-opacity-10 rounded-lg p-4">
                  <h3 className="font-semibold text-white mb-2">Optimize Product Listings</h3>
                  <p className="text-green-100 text-sm">Use high-quality images, compelling titles, and relevant keywords</p>
                </div>
                <div className="bg-white bg-opacity-10 rounded-lg p-4">
                  <h3 className="font-semibold text-white mb-2">Choose Fulfillment Model</h3>
                  <p className="text-green-100 text-sm">Fulfillment by Flipkart (FBF) or Non-FBF based on your business needs</p>
                </div>
                <div className="bg-white bg-opacity-10 rounded-lg p-4">
                  <h3 className="font-semibold text-white mb-2">Leverage Marketing Tools</h3>
                  <p className="text-green-100 text-sm">Use Sponsored Products and other advertising options</p>
                </div>
                <div className="bg-white bg-opacity-10 rounded-lg p-4">
                  <h3 className="font-semibold text-white mb-2">Provide Excellent Service</h3>
                  <p className="text-green-100 text-sm">Respond quickly to customer queries and resolve issues promptly</p>
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
        </div>
      </div>
    </>
  );
};

export default Flipkart;