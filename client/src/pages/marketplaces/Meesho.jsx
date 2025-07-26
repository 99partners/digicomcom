// import React from 'react';
// import { Helmet } from 'react-helmet';

// const Meesho = () => {
//   return (
//     <>
//       <Helmet>
//         <title>Meesho Services | 99digicom</title>
//         <meta name="description" content="Complete Meesho marketplace services including account management, listing optimization, and advertising." />
//       </Helmet>
//       <div className="min-h-screen pt-20 bg-gradient-to-br from-green-50 to-white">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <h1 className="text-4xl font-bold text-gray-900 mb-8">Meesho Seller Account Setup Guide</h1>

//           {/* Overview Section */}
//           <section className="mb-12">
//             <div className="bg-white rounded-lg shadow-md p-8 mb-6">
//               <h2 className="text-2xl font-bold text-green-700 mb-2">Overview</h2>
//               <p className="text-gray-700">
//                 Meesho empowers sellers with over 100 million users. Offers zero commission fees and social media integration. Steps to register and optimize your store.
//               </p>
//             </div>
//           </section>

//           {/* Requirements Section */}
//           <section className="mb-12">
//             <div className="bg-green-50 border-l-4 border-green-400 p-8 rounded-lg shadow mb-6">
//               <h2 className="text-2xl font-bold text-green-700 mb-2">Requirements</h2>
//               <ul className="list-disc ml-6 text-gray-700 space-y-2">
//                 <li><b>Active Mobile Number</b></li>
//                 <li><b>Email Address</b></li>
//                 <li><b>GSTIN (for taxable products)</b></li>
//                 <li><b>PAN Card</b></li>
//                 <li><b>Bank Account</b></li>
//                 <li><b>Business Details</b></li>
//                 <li><b>Address Proof</b></li>
//                 <li><b>Product Information</b></li>
//                 <li><b>Age Requirement:</b> 18+</li>
//                 <li><b>Smartphone</b></li>
//                 <li><b>Trademark Registration (Optional)</b></li>
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
//                 <li className="bg-white rounded-lg shadow-md p-6 flex items-start">
//                   <span className="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-full bg-green-100 text-green-700 font-bold mr-4">1</span>
//                   <div>
//                     <span className="font-semibold text-gray-900">Download the Meesho Supplier App</span>
//                   </div>
//                 </li>
//                 <li className="bg-white rounded-lg shadow-md p-6 flex items-start">
//                   <span className="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-full bg-green-100 text-green-700 font-bold mr-4">2</span>
//                   <div>
//                     <span className="font-semibold text-gray-900">Initiate Registration</span>
//                   </div>
//                 </li>
//                 <li className="bg-white rounded-lg shadow-md p-6 flex items-start">
//                   <span className="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-full bg-green-100 text-green-700 font-bold mr-4">3</span>
//                   <div>
//                     <span className="font-semibold text-gray-900">Enter Business Details</span>
//                   </div>
//                 </li>
//                 <li className="bg-white rounded-lg shadow-md p-6 flex items-start">
//                   <span className="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-full bg-green-100 text-green-700 font-bold mr-4">4</span>
//                   <div>
//                     <span className="font-semibold text-gray-900">Upload Required Documents</span>
//                   </div>
//                 </li>
//                 <li className="bg-white rounded-lg shadow-md p-6 flex items-start">
//                   <span className="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-full bg-green-100 text-green-700 font-bold mr-4">5</span>
//                   <div>
//                     <span className="font-semibold text-gray-900">Complete Verification and Activate Account</span>
//                   </div>
//                 </li>
//                 <li className="bg-white rounded-lg shadow-md p-6 flex items-start">
//                   <span className="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-full bg-green-100 text-green-700 font-bold mr-4">6</span>
//                   <div>
//                     <span className="font-semibold text-gray-900">Set Up Your Store and List Products</span>
//                   </div>
//                 </li>
//                 <li className="bg-white rounded-lg shadow-md p-6 flex items-start">
//                   <span className="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-full bg-green-100 text-green-700 font-bold mr-4">7</span>
//                   <div>
//                     <span className="font-semibold text-gray-900">Enable Account Security</span>
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
//                 <li><b>Leverage Social Commerce</b></li>
//                 <li><b>Manage Orders and Inventory</b></li>
//                 <li><b>Understand Fees</b></li>
//                 <li><b>Provide Excellent Customer Service</b></li>
//                 <li><b>Monitor Performance</b></li>
//                 <li><b>Avoid Common Issues</b></li>
//                 <li><b>Use Additional Resources</b></li>
//               </ul>
//             </div>
//           </section>

//           {/* Common Questions Section */}
//           <section className="mb-12">
//             <div className="bg-white rounded-lg shadow-md p-8">
//               <h2 className="text-2xl font-bold text-green-700 mb-4">Common Questions</h2>
//               <div className="space-y-6">
//                 <div>
//                   <span className="font-semibold text-gray-900">Is registration free?</span>
//                   <p className="text-gray-700">Yes</p>
//                 </div>
//                 <div>
//                   <span className="font-semibold text-gray-900">Is GSTIN mandatory?</span>
//                   <p className="text-gray-700">Required for taxable products, optional otherwise</p>
//                 </div>
//                 <div>
//                   <span className="font-semibold text-gray-900">How long does verification take?</span>
//                   <p className="text-gray-700">2-5 business days</p>
//                 </div>
//                 <div>
//                   <span className="font-semibold text-gray-900">Can individuals sell?</span>
//                   <p className="text-gray-700">Yes</p>
//                 </div>
//                 <div>
//                   <span className="font-semibold text-gray-900">Does Meesho handle logistics?</span>
//                   <p className="text-gray-700">Yes</p>
//                 </div>
//               </div>
//             </div>
//           </section>

//           {/* Resources & Notes Section */}
//           <section className="mb-12">
//             <div className="bg-green-100 rounded-lg shadow-md p-8">
//               <h2 className="text-2xl font-bold text-green-700 mb-4">Resources</h2>
//               <ul className="list-disc ml-6 text-gray-700 space-y-2">
//                 <li><a href="https://supplier.meesho.com" className="text-green-700 underline" target="_blank" rel="noopener noreferrer">Meesho Supplier Portal</a></li>
//                 <li>Meesho Supplier App</li>
//                 <li><a href="mailto:seller@meesho.com" className="text-green-700 underline">Meesho Seller Support</a> or in-app chat</li>
//                 <li>Third-party resources: Seller Rocket, Unicommerce, ClearTax</li>
//               </ul>
//               <h2 className="text-2xl font-bold text-green-700 mt-8 mb-4">Notes</h2>
//               <ul className="list-disc ml-6 text-gray-700 space-y-2">
//                 <li>Zero-commission model requires strategic pricing.</li>
//                 <li>Ideal for social media-savvy sellers.</li>
//                 <li>Review policies regularly.</li>
//                 <li>Leverage WhatsApp and social platforms.</li>
//               </ul>
//               <p className="text-gray-700 mt-4">By following these steps and leveraging Meesho’s tools, you can build a successful online business. <b>Start your Meesho selling journey today!</b></p>
//             </div>
//           </section>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Meesho;


import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { ArrowUp, ChevronRight, HelpCircle, Package, CreditCard, User, Building, Check, X, ShoppingBag } from 'lucide-react';

const Meesho = () => {
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
        <title>Meesho Services | 99digicom</title>
        <meta name="description" content="Complete Meesho marketplace services including account management, listing optimization, and advertising." />
        <meta name="keywords" content="Meesho seller account, Meesho setup, Meesho marketplace, social commerce, online selling" />
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
                <h1 className="text-3xl font-bold text-gray-900">Meesho Seller Account Setup</h1>
                <p className="text-green-600">Your Gateway to India's Social Commerce Platform</p>
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
                    Meesho empowers sellers with over 100 million users. Offers zero commission fees and social media integration. Our comprehensive guide walks you through every step of registering and optimizing your store on India's leading social commerce platform.
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
                  <p className="text-gray-700 mb-4">To create a Meesho Seller account, you'll need the following:</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center bg-white p-3 rounded-lg shadow-sm">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3">
                    <ShoppingBag className="h-5 w-5 text-green-600" />
                  </div>
                  <span className="font-medium text-gray-800">Active Mobile Number</span>
                </div>
                <div className="flex items-center bg-white p-3 rounded-lg shadow-sm">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3">
                    <User className="h-5 w-5 text-green-600" />
                  </div>
                  <span className="font-medium text-gray-800">Email Address</span>
                </div>
                <div className="flex items-center bg-white p-3 rounded-lg shadow-sm">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3">
                    <CreditCard className="h-5 w-5 text-green-600" />
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
                  <span className="font-medium text-gray-800">Business Details</span>
                </div>
                <div className="flex items-center bg-white p-3 rounded-lg shadow-sm">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3">
                    <Package className="h-5 w-5 text-green-600" />
                  </div>
                  <span className="font-medium text-gray-800">Address Proof</span>
                </div>
                <div className="flex items-center bg-white p-3 rounded-lg shadow-sm">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3">
                    <ShoppingBag className="h-5 w-5 text-green-600" />
                  </div>
                  <span className="font-medium text-gray-800">Product Information</span>
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

          {/* Step-by-Step Setup Process */}
          <section className="mb-12">
            <div className="text-center mb-10">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2 relative inline-block">
                Step-by-Step Setup Process
                <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-green-500 rounded-full"></span>
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">Follow these steps to create your Meesho Seller account quickly and easily</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { step: 1, title: "Download the Meesho Supplier App", details: "Available on Google Play Store and iOS App Store" },
                { step: 2, title: "Initiate Registration", details: "Open the app and tap on 'Register'" },
                { step: 3, title: "Enter Business Information", details: "Provide company details and contact information" },
                { step: 4, title: "Upload Required Documents", details: "PAN card, GST certificate, and business proof" },
                { step: 5, title: "Complete Verification", details: "Document verification typically takes 2-5 days" },
                { step: 6, title: "Set Up Your Store", details: "Add store details, logo, and policies" },
                { step: 7, title: "Enable Account Security", details: "Set up two-factor authentication" },
                { step: 8, title: "Start Listing Products", details: "Add products and set competitive pricing" }
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
                  <p className="text-green-100">Maximize your Meesho selling experience with these expert recommendations</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white bg-opacity-10 rounded-lg p-4">
                  <h3 className="font-semibold text-white mb-2">Optimize Product Listings</h3>
                  <p className="text-green-100 text-sm">Use high-quality images, compelling titles, and relevant keywords</p>
                </div>
                <div className="bg-white bg-opacity-10 rounded-lg p-4">
                  <h3 className="font-semibold text-white mb-2">Leverage Social Commerce</h3>
                  <p className="text-green-100 text-sm">Integrate with WhatsApp and other social platforms</p>
                </div>
                <div className="bg-white bg-opacity-10 rounded-lg p-4">
                  <h3 className="font-semibold text-white mb-2">Manage Orders and Inventory</h3>
                  <p className="text-green-100 text-sm">Use Meesho's tools to track and fulfill orders efficiently</p>
                </div>
                <div className="bg-white bg-opacity-10 rounded-lg p-4">
                  <h3 className="font-semibold text-white mb-2">Understand Fees</h3>
                  <p className="text-green-100 text-sm">Zero-commission model requires strategic pricing</p>
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
                    question: "Is registration free?", 
                    answer: "Yes, registration is completely free." 
                  },
                  { 
                    question: "Is GSTIN mandatory?", 
                    answer: "Required for taxable products, optional otherwise." 
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
                    question: "Does Meesho handle logistics?", 
                    answer: "Yes, Meesho offers integrated logistics solutions." 
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
                <li><a href="https://supplier.meesho.com" className="text-green-700 underline" target="_blank" rel="noopener noreferrer">Meesho Supplier Portal</a></li>
                <li>Meesho Supplier App</li>
                <li><a href="mailto:seller@meesho.com" className="text-green-700 underline" target="_blank" rel="noopener noreferrer">Meesho Seller Support</a> or in-app chat</li>
                <li>Third-party resources: Seller Rocket, Unicommerce, ClearTax</li>
              </ul>
              <h2 className="text-2xl font-bold text-green-700 mt-8 mb-4">Notes</h2>
              <ul className="list-disc ml-6 text-gray-700 space-y-2">
                <li>Zero-commission model requires strategic pricing.</li>
                <li>Ideal for social media-savvy sellers.</li>
                <li>Review policies regularly.</li>
                <li>Leverage WhatsApp and social platforms.</li>
              </ul>
              <p className="text-gray-700 mt-4">By following these steps and leveraging Meesho's tools, you can build a successful online business. <b>Start your Meesho selling journey today!</b></p>
            </div>
          </section>

          {/* Call to Action */}
          <div className="text-center mt-12 mb-8">
            <div className="inline-block bg-gradient-to-r from-green-600 to-green-700 text-white font-bold text-xl py-4 px-8 rounded-full shadow-lg transform hover:scale-105 transition-transform duration-300 hover:shadow-xl">
              Ready to Start Selling on Meesho?
            </div>
            <p className="mt-4 text-gray-600">Our team of Meesho experts can help you set up and optimize your account</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Meesho;