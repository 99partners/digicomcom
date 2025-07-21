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
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Amazon Services</h1>

          {/* Step-by-Step Guide Section */}
          <section className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">How to Set Up a Personal Amazon Account</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Follow these simple steps to create your own Amazon account and start shopping or using Amazon services.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <ol className="space-y-8">
                <li className="bg-white rounded-lg shadow-md p-6 flex items-start">
                  <span className="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-full bg-green-100 text-green-700 font-bold mr-4">1</span>
                  <div>
                    <span className="font-semibold text-gray-900">Visit Amazon’s Website or App:</span>
                    <p className="text-gray-600">Go to <a href="https://www.amazon.com" className="text-green-600 underline" target="_blank" rel="noopener noreferrer">www.amazon.com</a> or open the Amazon app. Click “Sign In” or “Account & Lists” (top right).</p>
                  </div>
                </li>
                <li className="bg-white rounded-lg shadow-md p-6 flex items-start">
                  <span className="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-full bg-green-100 text-green-700 font-bold mr-4">2</span>
                  <div>
                    <span className="font-semibold text-gray-900">Start the Registration Process:</span>
                    <p className="text-gray-600">Click “Create your Amazon account” or “Start Here” (website) or tap “Create a New Amazon Account” (app).</p>
                  </div>
                </li>
                <li className="bg-white rounded-lg shadow-md p-6 flex items-start">
                  <span className="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-full bg-green-100 text-green-700 font-bold mr-4">3</span>
                  <div>
                    <span className="font-semibold text-gray-900">Enter Your Information:</span>
                    <ul className="list-disc ml-6 text-gray-600">
                      <li><b>Name:</b> Provide your full name.</li>
                      <li><b>Email or Phone Number:</b> Enter a valid email address or mobile number.</li>
                      <li><b>Password:</b> Create a secure password (at least 6 characters, mix of uppercase, lowercase, numbers, special characters). Confirm the password.</li>
                    </ul>
                  </div>
                </li>
                <li className="bg-white rounded-lg shadow-md p-6 flex items-start">
                  <span className="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-full bg-green-100 text-green-700 font-bold mr-4">4</span>
                  <div>
                    <span className="font-semibold text-gray-900">Verify Your Email or Phone:</span>
                    <p className="text-gray-600">Amazon will send a verification code (OTP) to your email or phone. Enter the OTP on the verification page.</p>
                  </div>
                </li>
                <li className="bg-white rounded-lg shadow-md p-6 flex items-start">
                  <span className="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-full bg-green-100 text-green-700 font-bold mr-4">5</span>
                  <div>
                    <span className="font-semibold text-gray-900">Optional Security Steps:</span>
                    <p className="text-gray-600">Enable two-factor authentication (2FA) in your account settings for added security.</p>
                  </div>
                </li>
                <li className="bg-white rounded-lg shadow-md p-6 flex items-start">
                  <span className="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-full bg-green-100 text-green-700 font-bold mr-4">6</span>
                  <div>
                    <span className="font-semibold text-gray-900">Start Using Your Account:</span>
                    <p className="text-gray-600">Once verified, you can shop, access Prime, or use services like Amazon Music or Kindle.</p>
                  </div>
                </li>
              </ol>
              <div className="space-y-8">
                {/* Tips Box */}
                <div className="bg-green-50 border-l-4 border-green-400 p-6 rounded-lg shadow flex items-start">
                  <div className="mr-3 mt-1">
                    <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M12 20a8 8 0 100-16 8 8 0 000 16z" /></svg>
                  </div>
                  <div>
                    <span className="font-semibold text-green-700">Tips:</span>
                    <ul className="list-disc ml-6 text-gray-600 mt-1">
                      <li>Use a strong, unique password to protect your account.</li>
                      <li>If you encounter issues, check your internet connection or clear your browser cache.</li>
                    </ul>
                  </div>
                </div>
                {/* Seller Account Box */}
                <div className="bg-white border-l-4 border-yellow-400 p-6 rounded-lg shadow">
                  <span className="font-semibold text-yellow-700">Want to sell on Amazon?</span>
                  <p className="text-gray-600 mt-2">For a seller account, visit <a href="https://sell.amazon.com" className="text-yellow-600 underline" target="_blank" rel="noopener noreferrer">sell.amazon.com</a> and follow a similar process. You’ll need business details and a valid credit card.</p>
                </div>
                {/* More Info Box */}
                <div className="bg-green-100 p-6 rounded-lg shadow">
                  <span className="font-semibold text-green-700">Need more help?</span>
                  <p className="text-gray-600 mt-2">See <a href="https://www.amazon.com/gp/help/customer/display.html?nodeId=G3JHAKLM2QKM6NXS" className="text-green-700 underline" target="_blank" rel="noopener noreferrer">Amazon’s official help pages</a> for detailed guidance.</p>
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