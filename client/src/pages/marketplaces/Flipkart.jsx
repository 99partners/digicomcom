import React from 'react';
import { Helmet } from 'react-helmet';

const Flipkart = () => {
  return (
    <>
      <Helmet>
        <title>Flipkart Services | 99digicom</title>
        <meta name="description" content="Complete Flipkart marketplace services including account management, Shopsy, listing optimization, and advertising." />
      </Helmet>
      <div className="min-h-screen pt-20 bg-gradient-to-br from-green-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Flipkart Seller Account Setup Guide</h1>

          {/* Overview Section */}
          <section className="mb-12">
            <div className="bg-white rounded-lg shadow-md p-8 mb-6">
              <h2 className="text-2xl font-bold text-green-700 mb-2">Overview</h2>
              <p className="text-gray-700">
                Selling on Flipkart provides access to over 300 million users. Steps to create a seller account and set up a store.
              </p>
            </div>
          </section>

          {/* Requirements Section */}
          <section className="mb-12">
            <div className="bg-green-50 border-l-4 border-green-400 p-8 rounded-lg shadow mb-6">
              <h2 className="text-2xl font-bold text-green-700 mb-2">Requirements</h2>
              <ul className="list-disc ml-6 text-gray-700 space-y-2">
                <li><b>Valid GSTIN</b></li>
                <li><b>PAN Card</b></li>
                <li><b>Bank Account</b></li>
                <li><b>Business Registration Documents</b></li>
                <li><b>ID and Address Proof</b></li>
                <li><b>Email ID and Phone Number</b></li>
                <li><b>Pickup Address</b></li>
                <li><b>Minimum One Product</b></li>
                <li><b>Age Requirement:</b> 18+</li>
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
                <li className="bg-white rounded-2xl shadow-lg p-8 flex items-start w-full">
                  <span className="flex-shrink-0 h-12 w-12 flex items-center justify-center rounded-full bg-green-100 text-green-700 font-bold mr-6 text-xl">1</span>
                  <div className="flex-1">
                    <span className="font-semibold text-gray-900">Visit the Flipkart Seller Hub</span>
                  </div>
                </li>
                <li className="bg-white rounded-2xl shadow-lg p-8 flex items-start w-full">
                  <span className="flex-shrink-0 h-12 w-12 flex items-center justify-center rounded-full bg-green-100 text-green-700 font-bold mr-6 text-xl">2</span>
                  <div className="flex-1">
                    <span className="font-semibold text-gray-900">Enter Business and Contact Information</span>
                  </div>
                </li>
                <li className="bg-white rounded-2xl shadow-lg p-8 flex items-start w-full">
                  <span className="flex-shrink-0 h-12 w-12 flex items-center justify-center rounded-full bg-green-100 text-green-700 font-bold mr-6 text-xl">3</span>
                  <div className="flex-1">
                    <span className="font-semibold text-gray-900">Verify Your Account</span>
                  </div>
                </li>
                <li className="bg-white rounded-2xl shadow-lg p-8 flex items-start w-full">
                  <span className="flex-shrink-0 h-12 w-12 flex items-center justify-center rounded-full bg-green-100 text-green-700 font-bold mr-6 text-xl">4</span>
                  <div className="flex-1">
                    <span className="font-semibold text-gray-900">Set Up Your Seller Profile</span>
                  </div>
                </li>
                <li className="bg-white rounded-2xl shadow-lg p-8 flex items-start w-full">
                  <span className="flex-shrink-0 h-12 w-12 flex items-center justify-center rounded-full bg-green-100 text-green-700 font-bold mr-6 text-xl">5</span>
                  <div className="flex-1">
                    <span className="font-semibold text-gray-900">List Your First Product</span>
                  </div>
                </li>
                <li className="bg-white rounded-2xl shadow-lg p-8 flex items-start w-full">
                  <span className="flex-shrink-0 h-12 w-12 flex items-center justify-center rounded-full bg-green-100 text-green-700 font-bold mr-6 text-xl">6</span>
                  <div className="flex-1">
                    <span className="font-semibold text-gray-900">Agree to Terms and Conditions</span>
                  </div>
                </li>
                <li className="bg-white rounded-2xl shadow-lg p-8 flex items-start w-full">
                  <span className="flex-shrink-0 h-12 w-12 flex items-center justify-center rounded-full bg-green-100 text-green-700 font-bold mr-6 text-xl">7</span>
                  <div className="flex-1">
                    <span className="font-semibold text-gray-900">Explore Seller Hub Features</span>
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
                <li><b>Choose a Fulfillment Model:</b>
                  <ul className="list-disc ml-6">
                    <li><b>Fulfillment by Flipkart (FBF)</b></li>
                    <li><b>Non-FBF</b></li>
                  </ul>
                </li>
                <li><b>Leverage Marketing Tools</b></li>
                <li><b>Provide Excellent Customer Service</b></li>
                <li><b>Monitor Fees and Payments</b></li>
                <li><b>Avoid Common Issues</b></li>
                <li><b>Use Support Resources</b></li>
              </ul>
            </div>
          </section>

          {/* Common Questions Section */}
          <section className="mb-12">
            <div className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-bold text-green-700 mb-4">Common Questions</h2>
              <div className="space-y-6">
                <div>
                  <span className="font-semibold text-gray-900">Is GSTIN mandatory?</span>
                  <p className="text-gray-700">Required for most products, except for exempt categories.</p>
                </div>
                <div>
                  <span className="font-semibold text-gray-900">Are there listing fees?</span>
                  <p className="text-gray-700">No, only commissions on sales.</p>
                </div>
                <div>
                  <span className="font-semibold text-gray-900">Can individuals sell?</span>
                  <p className="text-gray-700">Yes, as sole proprietorship.</p>
                </div>
                <div>
                  <span className="font-semibold text-gray-900">How long does registration take?</span>
                  <p className="text-gray-700">10 minutes, verification a few days.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Resources & Notes Section */}
          <section className="mb-12">
            <div className="bg-green-100 rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-bold text-green-700 mb-4">Resources</h2>
              <ul className="list-disc ml-6 text-gray-700 space-y-2">
                <li><a href="https://seller.flipkart.com" className="text-green-700 underline" target="_blank" rel="noopener noreferrer">Flipkart Seller Hub</a></li>
                <li>Flipkart Seller Hub App</li>
                <li><a href="https://seller.flipkart.com/support" className="text-green-700 underline" target="_blank" rel="noopener noreferrer">Flipkart Help Center</a></li>
                <li>Third-party resources: Unicommerce, RevBoosters, ClearTax</li>
              </ul>
              <h2 className="text-2xl font-bold text-green-700 mt-8 mb-4">Notes</h2>
              <ul className="list-disc ml-6 text-gray-700 space-y-2">
                <li>High commission fees (up to 50%) and return costs may impact profits.</li>
                <li>Ensure compliance with Flipkart’s policies.</li>
                <li>Confirm eligibility for GST-exempt products.</li>
              </ul>
              <p className="text-gray-700 mt-4">By following these steps and leveraging Flipkart’s tools, you can establish a successful online business. <b>Start your selling journey today!</b></p>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default Flipkart;