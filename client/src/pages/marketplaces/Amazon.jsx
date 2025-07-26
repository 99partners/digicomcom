import React from 'react';
import { Helmet } from 'react-helmet';

const Amazon = () => {
  return (
    <>
      <Helmet>
        <title>Amazon Services | 99digicom</title>
        <meta name="description" content="Comprehensive Amazon marketplace services including account management, brand store, listing optimization, and advertising." />
      </Helmet>
      <div className="min-h-screen pt-20 bg-gradient-to-br from-green-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Amazon Seller Account Setup Guide</h1>
          {/* Overview Section */}
          <section className="mb-12">
            <div className="bg-white rounded-lg shadow-md p-8 mb-6">
              <h2 className="text-2xl font-bold text-green-700 mb-2">Overview</h2>
              <p className="text-gray-700">
                Set up an Amazon Seller account to sell on a major online marketplace.
              </p>
            </div>
          </section>
          {/* Requirements Section */}
          <section className="mb-12">
            <div className="bg-green-50 border-l-4 border-green-400 p-8 rounded-lg shadow mb-6">
              <h2 className="text-2xl font-bold text-green-700 mb-2">Requirements</h2>
              <ul className="list-disc ml-6 text-gray-700 space-y-2">
                <li><b>Business Email Address</b></li>
                <li><b>Bank Account Information</b></li>
                <li><b>Phone Number</b></li>
                <li><b>Tax Information</b></li>
                <li><b>Government-Issued ID</b></li>
                <li><b>Credit Card</b></li>
                <li><b>Business Details</b> (if applicable)</li>
                <li><b>Age Requirement:</b> 18+</li>
                <li><b>Supported Country</b> (<a href="https://sellercentral.amazon.com/gp/help/external/200405020" className="text-green-700 underline" target="_blank" rel="noopener noreferrer">Check Amazon’s list</a>)</li>
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
                    <span className="font-semibold text-gray-900">Visit the Amazon Seller Sign-Up Page</span>
                  </div>
                </li>
                <li className="bg-white rounded-2xl shadow-lg p-8 flex items-start w-full">
                  <span className="flex-shrink-0 h-12 w-12 flex items-center justify-center rounded-full bg-green-100 text-green-700 font-bold mr-6 text-xl">2</span>
                  <div className="flex-1">
                    <span className="font-semibold text-gray-900">Choose a Selling Plan</span>
                    <ul className="list-disc ml-6 text-gray-600">
                      <li><b>Individual Plan:</b> $0.99/item</li>
                      <li><b>Professional Plan:</b> $39.99/month</li>
                    </ul>
                  </div>
                </li>
                <li className="bg-white rounded-2xl shadow-lg p-8 flex items-start w-full">
                  <span className="flex-shrink-0 h-12 w-12 flex items-center justify-center rounded-full bg-green-100 text-green-700 font-bold mr-6 text-xl">3</span>
                  <div className="flex-1">
                    <span className="font-semibold text-gray-900">Enter Business Information</span>
                    <ul className="list-disc ml-6 text-gray-600">
                      <li><b>Business Location</b></li>
                      <li><b>Business Type</b></li>
                      <li><b>Primary Contact</b></li>
                    </ul>
                  </div>
                </li>
                <li className="bg-white rounded-2xl shadow-lg p-8 flex items-start w-full">
                  <span className="flex-shrink-0 h-12 w-12 flex items-center justify-center rounded-full bg-green-100 text-green-700 font-bold mr-6 text-xl">4</span>
                  <div className="flex-1">
                    <span className="font-semibold text-gray-900">Provide Billing and Tax Information</span>
                    <ul className="list-disc ml-6 text-gray-600">
                      <li>Bank Account</li>
                      <li>Credit Card</li>
                      <li>Tax Details</li>
                    </ul>
                  </div>
                </li>
                <li className="bg-white rounded-2xl shadow-lg p-8 flex items-start w-full">
                  <span className="flex-shrink-0 h-12 w-12 flex items-center justify-center rounded-full bg-green-100 text-green-700 font-bold mr-6 text-xl">5</span>
                  <div className="flex-1">
                    <span className="font-semibold text-gray-900">Verify Your Identity</span>
                    <ul className="list-disc ml-6 text-gray-600">
                      <li>Upload ID</li>
                      <li>Video Call (if required)</li>
                      <li>Postcard Verification (for businesses)</li>
                    </ul>
                  </div>
                </li>
                <li className="bg-white rounded-2xl shadow-lg p-8 flex items-start w-full">
                  <span className="flex-shrink-0 h-12 w-12 flex items-center justify-center rounded-full bg-green-100 text-green-700 font-bold mr-6 text-xl">6</span>
                  <div className="flex-1">
                    <span className="font-semibold text-gray-900">Set Up Your Store</span>
                    <ul className="list-disc ml-6 text-gray-600">
                      <li>Choose Store Name</li>
                      <li>Add Description, Logo, Policies</li>
                    </ul>
                  </div>
                </li>
                <li className="bg-white rounded-2xl shadow-lg p-8 flex items-start w-full">
                  <span className="flex-shrink-0 h-12 w-12 flex items-center justify-center rounded-full bg-green-100 text-green-700 font-bold mr-6 text-xl">7</span>
                  <div className="flex-1">
                    <span className="font-semibold text-gray-900">Add Products to Your Inventory</span>
                    <ul className="list-disc ml-6 text-gray-600">
                      <li>Match or Create Listings</li>
                      <li>Optimize with Keywords</li>
                    </ul>
                  </div>
                </li>
                <li className="bg-white rounded-2xl shadow-lg p-8 flex items-start w-full">
                  <span className="flex-shrink-0 h-12 w-12 flex items-center justify-center rounded-full bg-green-100 text-green-700 font-bold mr-6 text-xl">8</span>
                  <div className="flex-1">
                    <span className="font-semibold text-gray-900">Configure Seller Central</span>
                    <ul className="list-disc ml-6 text-gray-600">
                      <li>Manage Listings and Orders</li>
                      <li>Enable Two-Step Verification</li>
                      <li>Enroll in Brand Registry (if applicable)</li>
                    </ul>
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
                <li><b>Understand Amazon Policies</b></li>
                <li><b>Choose a Fulfillment Method:</b>
                  <ul className="list-disc ml-6">
                    <li><b>FBA:</b> Amazon handles shipping</li>
                    <li><b>FBM:</b> You manage shipping</li>
                    <li><b>Easy Ship (India):</b> You store, Amazon delivers</li>
                  </ul>
                </li>
                <li><b>Optimize Listings</b></li>
                <li><b>Monitor Performance</b></li>
              </ul>
            </div>
          </section>
          {/* Common Questions Section */}
          <section className="mb-12">
            <div className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-bold text-green-700 mb-4">Common Questions</h2>
              <div className="space-y-6">
                <div>
                  <span className="font-semibold text-gray-900">Is it free to set up?</span>
                  <p className="text-gray-700">Account creation is free; fees apply per sale or monthly.</p>
                </div>
                <div>
                  <span className="font-semibold text-gray-900">Can I sell internationally?</span>
                  <p className="text-gray-700">Yes, with U.S. account or separate regional accounts.</p>
                </div>
                <div>
                  <span className="font-semibold text-gray-900">Do I need a business entity?</span>
                  <p className="text-gray-700">No, but recommended for scaling.</p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default Amazon;