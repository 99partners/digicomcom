import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';

const OndcBuyer = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>ONDC Buyer Network Participant | 99DigiCom</title>
        <meta 
          name="description" 
          content="Become an ONDC buyer network participant with 99DigiCom. Access a vast network of sellers and expand your procurement options through the Open Network for Digital Commerce." 
        />
      </Helmet>

      <main className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              ONDC Buyer Network Participant
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Transform your buying experience by joining India's Open Network for Digital Commerce (ONDC) as a buyer participant.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-gray-900">
                Benefits of Being a Buyer on ONDC
              </h2>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <span className="h-6 w-6 text-green-500 mr-2">✓</span>
                  <span>Access to diverse seller network across India</span>
                </li>
                <li className="flex items-start">
                  <span className="h-6 w-6 text-green-500 mr-2">✓</span>
                  <span>Competitive pricing through open market</span>
                </li>
                <li className="flex items-start">
                  <span className="h-6 w-6 text-green-500 mr-2">✓</span>
                  <span>Standardized buying experience</span>
                </li>
                <li className="flex items-start">
                  <span className="h-6 w-6 text-green-500 mr-2">✓</span>
                  <span>Enhanced product discovery</span>
                </li>
              </ul>
            </div>

            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-gray-900">
                Our Integration Services
              </h2>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <span className="h-6 w-6 text-green-500 mr-2">✓</span>
                  <span>ONDC buyer app development</span>
                </li>
                <li className="flex items-start">
                  <span className="h-6 w-6 text-green-500 mr-2">✓</span>
                  <span>API integration and testing</span>
                </li>
                <li className="flex items-start">
                  <span className="h-6 w-6 text-green-500 mr-2">✓</span>
                  <span>Search and discovery optimization</span>
                </li>
                <li className="flex items-start">
                  <span className="h-6 w-6 text-green-500 mr-2">✓</span>
                  <span>Transaction flow implementation</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-green-50 rounded-2xl p-8 mb-16">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              Implementation Process
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="text-2xl font-bold text-green-600 mb-2">01</div>
                <h3 className="text-lg font-semibold mb-2">Requirements Analysis</h3>
                <p className="text-gray-600">Define your buyer app requirements and features</p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="text-2xl font-bold text-green-600 mb-2">02</div>
                <h3 className="text-lg font-semibold mb-2">Development & Integration</h3>
                <p className="text-gray-600">Build and integrate ONDC-compliant buyer application</p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="text-2xl font-bold text-green-600 mb-2">03</div>
                <h3 className="text-lg font-semibold mb-2">Testing & Launch</h3>
                <p className="text-gray-600">Thorough testing and successful deployment</p>
              </div>
            </div>
          </div>

          <div className="text-center">
            <a
              href="/contact_us"
              className="inline-block bg-green-600 text-white px-8 py-3 rounded-full font-medium hover:bg-green-700 transition-colors duration-200"
            >
              Become an ONDC Buyer
            </a>
          </div>
        </div>
      </main>
    </>
  );
};

export default OndcBuyer; 