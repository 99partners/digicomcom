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
                Creating an Amazon Seller account allows you to sell products on one of the world’s largest online marketplaces, reaching millions of customers. This guide provides a detailed, step-by-step process to set up your account, choose the right selling plan, and optimize your profile for success.
              </p>
            </div>
          </section>

          {/* Requirements Section */}
          <section className="mb-12">
            <div className="bg-green-50 border-l-4 border-green-400 p-8 rounded-lg shadow mb-6">
              <h2 className="text-2xl font-bold text-green-700 mb-2">Requirements</h2>
              <p className="text-gray-700 mb-4">Before starting, gather the following:</p>
              <ul className="list-disc ml-6 text-gray-700 space-y-2">
                <li><b>Business Email Address:</b> Use a dedicated email, separate from personal or customer accounts. If you have accounts with Amazon Brand Registry, Amazon Ads, or Vendor Central, use the same email for consistency.</li>
                <li><b>Bank Account Information:</b> A valid bank account for receiving payments, in your name or your business’s name. Ensure it’s part of Amazon’s Payment Service Provider Program.</li>
                <li><b>Phone Number:</b> For verification and communication.</li>
                <li><b>Tax Information:</b> A tax identification number (EIN for businesses or SSN for individuals in the U.S.) or equivalent for your country.</li>
                <li><b>Government-Issued ID:</b> A passport or driver’s license for identity verification.</li>
                <li><b>Credit Card:</b> An internationally chargeable card (e.g., American Express, MasterCard, Visa) for fees. It doesn’t need to match your business name.</li>
                <li><b>Business Details:</b> If registering as a business, provide your business name, address, and registration documents (e.g., certificate of incorporation). For individuals, select “None, I am an individual.”</li>
                <li><b>Age Requirement:</b> You must be at least 18 years old.</li>
                <li><b>Supported Country:</b> Verify your country is supported by Amazon for seller registration. <a href="https://sellercentral.amazon.com/gp/help/external/200405020" className="text-green-700 underline" target="_blank" rel="noopener noreferrer">Check Amazon’s list of supported countries</a>.</li>
              </ul>
            </div>
          </section>

          {/* Step-by-Step Setup Process */}
          <section className="mb-12">
            <div className="text-center mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Step-by-Step Setup Process</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <ol className="space-y-8">
                <li className="bg-white rounded-lg shadow-md p-6 flex items-start">
                  <span className="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-full bg-green-100 text-green-700 font-bold mr-4">1</span>
                  <div>
                    <span className="font-semibold text-gray-900">Visit the Amazon Seller Sign-Up Page</span>
                    <p className="text-gray-600">Go to <a href="https://sell.amazon.com" className="text-green-600 underline" target="_blank" rel="noopener noreferrer">sell.amazon.com</a> or <a href="https://sellercentral.amazon.com" className="text-green-600 underline" target="_blank" rel="noopener noreferrer">sellercentral.amazon.com</a> and click “Sign Up.” Use an existing Amazon account or create a new one with a business email and password. Enter the OTP sent to your email for verification.</p>
                  </div>
                </li>
                <li className="bg-white rounded-lg shadow-md p-6 flex items-start">
                  <span className="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-full bg-green-100 text-green-700 font-bold mr-4">2</span>
                  <div>
                    <span className="font-semibold text-gray-900">Choose a Selling Plan</span>
                    <ul className="list-disc ml-6 text-gray-600">
                      <li><b>Individual Plan:</b> $0.99 per item sold, no monthly fee. Best for sellers with fewer than 40 items/month. Limited access to advanced tools.</li>
                      <li><b>Professional Plan:</b> $39.99/month, no per-item fee. Ideal for sellers with over 40 items/month, offering bulk listing, advanced reporting, and eligibility for top product placement.</li>
                    </ul>
                    <p className="text-gray-600 mt-1">You can change or cancel your plan anytime. Consider sales volume and business goals when choosing.</p>
                  </div>
                </li>
                <li className="bg-white rounded-lg shadow-md p-6 flex items-start">
                  <span className="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-full bg-green-100 text-green-700 font-bold mr-4">3</span>
                  <div>
                    <span className="font-semibold text-gray-900">Enter Business Information</span>
                    <ul className="list-disc ml-6 text-gray-600">
                      <li><b>Business Location:</b> Select the country where your business is located. This must be accurate for verification.</li>
                      <li><b>Business Type:</b> Choose from options like “Privately-owned,” “None, I am an individual,” or other entities. Provide your business name as it appears on official documents.</li>
                      <li><b>Primary Contact:</b> Enter the name, phone number, and ID of the primary contact (you or another person). Specify if you’re a beneficial owner (owns &gt;25% of the business) or legal representative (authorized to act on behalf of the business).</li>
                    </ul>
                  </div>
                </li>
                <li className="bg-white rounded-lg shadow-md p-6 flex items-start">
                  <span className="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-full bg-green-100 text-green-700 font-bold mr-4">4</span>
                  <div>
                    <span className="font-semibold text-gray-900">Provide Billing and Tax Information</span>
                    <ul className="list-disc ml-6 text-gray-600">
                      <li>Enter a valid bank account for payments and a credit card for fees. Amazon may charge a $1 fee to verify the card.</li>
                      <li>Complete the Amazon Tax Interview to provide tax details (e.g., EIN or SSN). Ensure accuracy to comply with regulations.</li>
                      <li>For non-U.S. sellers, use the Amazon Currency Converter to receive payments in your local currency. <a href="https://sellercentral.amazon.com/gp/help/external/200405020" className="text-green-700 underline" target="_blank" rel="noopener noreferrer">Check supported countries and currencies</a>.</li>
                    </ul>
                  </div>
                </li>
                <li className="bg-white rounded-lg shadow-md p-6 flex items-start">
                  <span className="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-full bg-green-100 text-green-700 font-bold mr-4">5</span>
                  <div>
                    <span className="font-semibold text-gray-900">Verify Your Identity</span>
                    <ul className="list-disc ml-6 text-gray-600">
                      <li>Upload clear images of your government-issued ID and, if applicable, a recent bank statement. Ensure details match your provided information.</li>
                      <li>You may need to schedule a video call with an Amazon associate to confirm your identity. Monitor your email for updates and instructions.</li>
                      <li>Verification typically takes three business days or less.</li>
                      <li>For business accounts, Amazon may mail a postcard with a code to your business address for additional verification (up to 7 days). Enter the code in Seller Central to complete this step.</li>
                    </ul>
                  </div>
                </li>
                <li className="bg-white rounded-lg shadow-md p-6 flex items-start">
                  <span className="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-full bg-green-100 text-green-700 font-bold mr-4">6</span>
                  <div>
                    <span className="font-semibold text-gray-900">Set Up Your Store</span>
                    <ul className="list-disc ml-6 text-gray-600">
                      <li>Choose a unique store name for your Amazon storefront. It doesn’t need to match your business name but must not be used by another seller. You can change it later in Seller Central settings.</li>
                      <li>Add a store description, logo (optional), and configure shipping and return policies. For Fulfillment by Amazon (FBA) sellers, Amazon handles shipping, so skip shipping settings.</li>
                      <li>If selling GST-exempt products (e.g., books in India), select the appropriate option and upload your GSTIN certificate if required.</li>
                    </ul>
                  </div>
                </li>
                <li className="bg-white rounded-lg shadow-md p-6 flex items-start">
                  <span className="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-full bg-green-100 text-green-700 font-bold mr-4">7</span>
                  <div>
                    <span className="font-semibold text-gray-900">Add Products to Your Inventory</span>
                    <ul className="list-disc ml-6 text-gray-600">
                      <li>Go to the “Inventory” section in Seller Central and click “Add a Product.”</li>
                      <li>If your product exists in Amazon’s catalog, search and match it. If it’s new, create a listing with accurate descriptions, high-quality images, and relevant keywords.</li>
                      <li>Select the appropriate product category and optimize listings for visibility. Refer to Amazon’s product listing guidelines for best practices.</li>
                    </ul>
                  </div>
                </li>
                <li className="bg-white rounded-lg shadow-md p-6 flex items-start">
                  <span className="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-full bg-green-100 text-green-700 font-bold mr-4">8</span>
                  <div>
                    <span className="font-semibold text-gray-900">Configure Seller Central</span>
                    <ul className="list-disc ml-6 text-gray-600">
                      <li>Access Seller Central to manage listings, inventory, orders, and performance metrics.</li>
                      <li>Set up two-step verification for added security.</li>
                      <li>Add additional users if you need help with tasks.</li>
                      <li>If you own a brand, enroll in Amazon Brand Registry for additional tools like A+ Content and Brand Analytics.</li>
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
                <li><b>Understand Amazon Policies:</b> Review Amazon’s selling policies and code of conduct to avoid violations. Monitor your Account Health dashboard for compliance with metrics like Order Defect Rate (ODR).</li>
                <li><b>Choose a Fulfillment Method:</b>
                  <ul className="list-disc ml-6">
                    <li><b>Fulfillment by Amazon (FBA):</b> Amazon handles storage, packing, and shipping. Ideal for scalability and Prime eligibility.</li>
                    <li><b>Fulfillment by Merchant (FBM):</b> You manage storage and shipping. Suitable for low-volume sellers or unique products.</li>
                    <li><b>Easy Ship (India):</b> You store and pack, Amazon delivers.</li>
                  </ul>
                </li>
                <li><b>Optimize Listings:</b> Use high-quality images, accurate descriptions, and relevant keywords. Consider tools like SmartScout for market research.</li>
                <li><b>Monitor Performance:</b> Track metrics like order defect rate and late shipment rate to maintain good standing.</li>
                <li><b>Avoid Common Mistakes:</b>
                  <ul className="list-disc ml-6">
                    <li>Ensure all provided information matches official documents to avoid verification delays.</li>
                    <li>Choose a unique store name to avoid conflicts.</li>
                    <li>Contact Seller Central support if you encounter errors during setup.</li>
                  </ul>
                </li>
                <li><b>Explore Additional Tools:</b> Use Amazon Ads, FBA, or third-party services like eFulfillment for FBA prep to streamline operations.</li>
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
                  <p className="text-gray-700">Creating an account is free, but selling incurs fees (e.g., $0.99 per item for Individual plans, $39.99/month for Professional plans, plus referral fees).</p>
                </div>
                <div>
                  <span className="font-semibold text-gray-900">Can I sell internationally?</span>
                  <p className="text-gray-700">Yes, use your U.S. account to sell in Canada and Mexico, or create separate accounts for Europe, Asia-Pacific, or other regions.</p>
                </div>
                <div>
                  <span className="font-semibold text-gray-900">Do I need a business entity?</span>
                  <p className="text-gray-700">No, individuals can sell without an LLC, but a registered business is recommended for scaling and brand protection.</p>
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