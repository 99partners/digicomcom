import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';

const OndcSeller = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>ONDC Seller Network Participant | 99DigiCom</title>
        <meta 
          name="description" 
          content="Join ONDC as a seller network participant with 99DigiCom. Enable your business to reach millions of customers through the Open Network for Digital Commerce." 
        />
      </Helmet>

      <main className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              ONDC Seller Network Participant
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Expand your business reach by joining India's revolutionary Open Network for Digital Commerce (ONDC) as a seller.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-gray-900">
                Why Join ONDC as a Seller?
              </h2>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <span className="h-6 w-6 text-green-500 mr-2">✓</span>
                  <span>Access a nationwide network of buyers</span>
                </li>
                <li className="flex items-start">
                  <span className="h-6 w-6 text-green-500 mr-2">✓</span>
                  <span>Reduce dependency on specific platforms</span>
                </li>
                <li className="flex items-start">
                  <span className="h-6 w-6 text-green-500 mr-2">✓</span>
                  <span>Lower commission costs</span>
                </li>
                <li className="flex items-start">
                  <span className="h-6 w-6 text-green-500 mr-2">✓</span>
                  <span>Direct customer relationships</span>
                </li>
              </ul>
            </div>

            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-gray-900">
                Our Support Services
              </h2>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <span className="h-6 w-6 text-green-500 mr-2">✓</span>
                  <span>ONDC compliance and registration support</span>
                </li>
                <li className="flex items-start">
                  <span className="h-6 w-6 text-green-500 mr-2">✓</span>
                  <span>Technical integration assistance</span>
                </li>
                <li className="flex items-start">
                  <span className="h-6 w-6 text-green-500 mr-2">✓</span>
                  <span>Catalog optimization for ONDC</span>
                </li>
                <li className="flex items-start">
                  <span className="h-6 w-6 text-green-500 mr-2">✓</span>
                  <span>Ongoing operational support</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-green-50 rounded-2xl p-8 mb-16">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              Getting Started
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="text-2xl font-bold text-green-600 mb-2">01</div>
                <h3 className="text-lg font-semibold mb-2">Initial Consultation</h3>
                <p className="text-gray-600">Understand your business needs and ONDC readiness</p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="text-2xl font-bold text-green-600 mb-2">02</div>
                <h3 className="text-lg font-semibold mb-2">Technical Assessment</h3>
                <p className="text-gray-600">Evaluate system requirements and integration needs</p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="text-2xl font-bold text-green-600 mb-2">03</div>
                <h3 className="text-lg font-semibold mb-2">Implementation</h3>
                <p className="text-gray-600">Complete setup and go live on ONDC network</p>
              </div>
            </div>
          </div>

          <div className="text-center">
            <a
              href="/contact_us"
              className="inline-block bg-green-600 text-white px-8 py-3 rounded-full font-medium hover:bg-green-700 transition-colors duration-200"
            >
              Get Started with ONDC
            </a>
          </div>
        </div>
      </main>
    </>
  );
};

export default OndcSeller; 