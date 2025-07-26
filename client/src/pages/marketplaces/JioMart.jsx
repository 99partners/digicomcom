import React from 'react';
import { Helmet } from 'react-helmet';

const Jiomart = () => {
  return (
    <>
      <Helmet>
        <title>JioMart Services | 99digicom</title>
        <meta name="description" content="Step-by-step guide to setting up a JioMart Seller account and selling on JioMart with ease." />
      </Helmet>
      <div className="min-h-screen pt-20 bg-gradient-to-br from-green-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">JioMart Seller Account Setup Guide</h1>
          {/* Overview Section */}
          <section className="mb-12">
            <div className="bg-white rounded-lg shadow-md p-8 mb-6">
              <h2 className="text-2xl font-bold text-green-700 mb-2">Overview</h2>
              <p className="text-gray-700">
                Set up a JioMart seller account to sell products online with JioMart.
              </p>
            </div>
          </section>
          {/* Requirements Section */}
          <section className="mb-12">
            <div className="bg-green-50 border-l-4 border-green-400 p-8 rounded-lg shadow mb-6">
              <h2 className="text-2xl font-bold text-green-700 mb-2">Requirements</h2>
              <ul className="list-disc ml-6 text-gray-700 space-y-2">
                <li><b>PAN Card</b></li>
                <li><b>Aadhar Card</b></li>
                <li><b>GST Number</b></li>
                <li><b>Bank Account Details</b></li>
                <li><b>Mobile Number</b></li>
                <li><b>Email ID</b></li>
                <li><b>Business Address</b></li>
                <li><b>Product Details & Images</b></li>
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
                    <span className="font-semibold text-gray-900">Visit JioMart Partner Portal</span>
                  </div>
                </li>
                <li className="bg-white rounded-2xl shadow-lg p-8 flex items-start w-full">
                  <span className="flex-shrink-0 h-12 w-12 flex items-center justify-center rounded-full bg-green-100 text-green-700 font-bold mr-6 text-xl">2</span>
                  <div className="flex-1">
                    <span className="font-semibold text-gray-900">Register Using Mobile & Email</span>
                  </div>
                </li>
                <li className="bg-white rounded-2xl shadow-lg p-8 flex items-start w-full">
                  <span className="flex-shrink-0 h-12 w-12 flex items-center justify-center rounded-full bg-green-100 text-green-700 font-bold mr-6 text-xl">3</span>
                  <div className="flex-1">
                    <span className="font-semibold text-gray-900">Complete KYC Process</span>
                    <ul className="list-disc ml-6 text-gray-600">
                      <li>Upload Aadhar & PAN</li>
                      <li>Verify Bank Details</li>
                    </ul>
                  </div>
                </li>
                <li className="bg-white rounded-2xl shadow-lg p-8 flex items-start w-full">
                  <span className="flex-shrink-0 h-12 w-12 flex items-center justify-center rounded-full bg-green-100 text-green-700 font-bold mr-6 text-xl">4</span>
                  <div className="flex-1">
                    <span className="font-semibold text-gray-900">Add Business Details</span>
                  </div>
                </li>
                <li className="bg-white rounded-2xl shadow-lg p-8 flex items-start w-full">
                  <span className="flex-shrink-0 h-12 w-12 flex items-center justify-center rounded-full bg-green-100 text-green-700 font-bold mr-6 text-xl">5</span>
                  <div className="flex-1">
                    <span className="font-semibold text-gray-900">Upload GST & Product Catalog</span>
                  </div>
                </li>
                <li className="bg-white rounded-2xl shadow-lg p-8 flex items-start w-full">
                  <span className="flex-shrink-0 h-12 w-12 flex items-center justify-center rounded-full bg-green-100 text-green-700 font-bold mr-6 text-xl">6</span>
                  <div className="flex-1">
                    <span className="font-semibold text-gray-900">Start Selling After Approval</span>
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
                <li><b>Update Inventory Regularly</b></li>
                <li><b>Use High-Quality Product Images</b></li>
                <li><b>Respond Quickly to Orders</b></li>
                <li><b>Maintain Competitive Pricing</b></li>
                <li><b>Monitor Performance Metrics</b></li>
              </ul>
            </div>
          </section>
          {/* Common Questions Section */}
          <section className="mb-12">
            <div className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-bold text-green-700 mb-4">Common Questions</h2>
              <div className="space-y-6">
                <div>
                  <span className="font-semibold text-gray-900">Is there a registration fee?</span>
                  <p className="text-gray-700">Currently, registration on JioMart is free for sellers.</p>
                </div>
                <div>
                  <span className="font-semibold text-gray-900">Do I need GST to sell?</span>
                  <p className="text-gray-700">Yes, GST is mandatory for listing and selling products.</p>
                </div>
                <div>
                  <span className="font-semibold text-gray-900">How long does approval take?</span>
                  <p className="text-gray-700">Generally 2–5 working days after document verification.</p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default Jiomart;
