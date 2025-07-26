import React from 'react';
import { Helmet } from 'react-helmet';

const Meesho = () => {
  return (
    <>
      <Helmet>
        <title>Meesho Services | 99digicom</title>
        <meta name="description" content="Complete Meesho marketplace services including account management, listing optimization, and advertising." />
      </Helmet>
      <div className="min-h-screen pt-20 bg-gradient-to-br from-green-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Meesho Seller Account Setup Guide</h1>

          {/* Overview Section */}
          <section className="mb-12">
            <div className="bg-white rounded-lg shadow-md p-8 mb-6">
              <h2 className="text-2xl font-bold text-green-700 mb-2">Overview</h2>
              <p className="text-gray-700">
                Meesho empowers sellers with over 100 million users. Offers zero commission fees and social media integration. Steps to register and optimize your store.
              </p>
            </div>
          </section>

          {/* Requirements Section */}
          <section className="mb-12">
            <div className="bg-green-50 border-l-4 border-green-400 p-8 rounded-lg shadow mb-6">
              <h2 className="text-2xl font-bold text-green-700 mb-2">Requirements</h2>
              <ul className="list-disc ml-6 text-gray-700 space-y-2">
                <li><b>Active Mobile Number</b></li>
                <li><b>Email Address</b></li>
                <li><b>GSTIN (for taxable products)</b></li>
                <li><b>PAN Card</b></li>
                <li><b>Bank Account</b></li>
                <li><b>Business Details</b></li>
                <li><b>Address Proof</b></li>
                <li><b>Product Information</b></li>
                <li><b>Age Requirement:</b> 18+</li>
                <li><b>Smartphone</b></li>
                <li><b>Trademark Registration (Optional)</b></li>
              </ul>
            </div>
          </section>

          {/* Step-by-Step Setup Process */}
          <section className="mb-12">
            <div className="text-center mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Step-by-Step Setup Process</h2>
            </div>
            <div className="flex justify-center">
              <ol className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full max-w-4xl">
                <li className="bg-white rounded-lg shadow-md p-6 flex items-start">
                  <span className="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-full bg-green-100 text-green-700 font-bold mr-4">1</span>
                  <div>
                    <span className="font-semibold text-gray-900">Download the Meesho Supplier App</span>
                  </div>
                </li>
                <li className="bg-white rounded-lg shadow-md p-6 flex items-start">
                  <span className="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-full bg-green-100 text-green-700 font-bold mr-4">2</span>
                  <div>
                    <span className="font-semibold text-gray-900">Initiate Registration</span>
                  </div>
                </li>
                <li className="bg-white rounded-lg shadow-md p-6 flex items-start">
                  <span className="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-full bg-green-100 text-green-700 font-bold mr-4">3</span>
                  <div>
                    <span className="font-semibold text-gray-900">Enter Business Details</span>
                  </div>
                </li>
                <li className="bg-white rounded-lg shadow-md p-6 flex items-start">
                  <span className="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-full bg-green-100 text-green-700 font-bold mr-4">4</span>
                  <div>
                    <span className="font-semibold text-gray-900">Upload Required Documents</span>
                  </div>
                </li>
                <li className="bg-white rounded-lg shadow-md p-6 flex items-start">
                  <span className="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-full bg-green-100 text-green-700 font-bold mr-4">5</span>
                  <div>
                    <span className="font-semibold text-gray-900">Complete Verification and Activate Account</span>
                  </div>
                </li>
                <li className="bg-white rounded-lg shadow-md p-6 flex items-start">
                  <span className="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-full bg-green-100 text-green-700 font-bold mr-4">6</span>
                  <div>
                    <span className="font-semibold text-gray-900">Set Up Your Store and List Products</span>
                  </div>
                </li>
                <li className="bg-white rounded-lg shadow-md p-6 flex items-start">
                  <span className="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-full bg-green-100 text-green-700 font-bold mr-4">7</span>
                  <div>
                    <span className="font-semibold text-gray-900">Enable Account Security</span>
                  </div>
                </li>
              </ol>
            </div>
          </section>

          {/* Post-Setup Tips Section */}
          <section className="mb-12">
            <div className="bg-green-50 border-l-4 border-green-400 p-8 rounded-lg shadow mb-6">
              <h2 className="text-2xl font-bold text-green-700 mb-2">Post-Setup Tips</h2>
              <ul className="list-disc ml-6 text-gray-700 space-y-2">
                <li><b>Optimize Product Listings</b></li>
                <li><b>Leverage Social Commerce</b></li>
                <li><b>Manage Orders and Inventory</b></li>
                <li><b>Understand Fees</b></li>
                <li><b>Provide Excellent Customer Service</b></li>
                <li><b>Monitor Performance</b></li>
                <li><b>Avoid Common Issues</b></li>
                <li><b>Use Additional Resources</b></li>
              </ul>
            </div>
          </section>

          {/* Common Questions Section */}
          <section className="mb-12">
            <div className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-bold text-green-700 mb-4">Common Questions</h2>
              <div className="space-y-6">
                <div>
                  <span className="font-semibold text-gray-900">Is registration free?</span>
                  <p className="text-gray-700">Yes</p>
                </div>
                <div>
                  <span className="font-semibold text-gray-900">Is GSTIN mandatory?</span>
                  <p className="text-gray-700">Required for taxable products, optional otherwise</p>
                </div>
                <div>
                  <span className="font-semibold text-gray-900">How long does verification take?</span>
                  <p className="text-gray-700">2-5 business days</p>
                </div>
                <div>
                  <span className="font-semibold text-gray-900">Can individuals sell?</span>
                  <p className="text-gray-700">Yes</p>
                </div>
                <div>
                  <span className="font-semibold text-gray-900">Does Meesho handle logistics?</span>
                  <p className="text-gray-700">Yes</p>
                </div>
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
                <li><a href="mailto:seller@meesho.com" className="text-green-700 underline">Meesho Seller Support</a> or in-app chat</li>
                <li>Third-party resources: Seller Rocket, Unicommerce, ClearTax</li>
              </ul>
              <h2 className="text-2xl font-bold text-green-700 mt-8 mb-4">Notes</h2>
              <ul className="list-disc ml-6 text-gray-700 space-y-2">
                <li>Zero-commission model requires strategic pricing.</li>
                <li>Ideal for social media-savvy sellers.</li>
                <li>Review policies regularly.</li>
                <li>Leverage WhatsApp and social platforms.</li>
              </ul>
              <p className="text-gray-700 mt-4">By following these steps and leveraging Meesho’s tools, you can build a successful online business. <b>Start your Meesho selling journey today!</b></p>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default Meesho;