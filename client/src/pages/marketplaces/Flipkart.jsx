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
                Selling on Flipkart provides access to over 300 million registered users across India, offering a trusted platform with robust tools for product listing, logistics, and payments. This guide walks you through the step-by-step process of creating a Flipkart Seller account, setting up your store, and preparing to sell effectively.
              </p>
            </div>
          </section>

          {/* Requirements Section */}
          <section className="mb-12">
            <div className="bg-green-50 border-l-4 border-green-400 p-8 rounded-lg shadow mb-6">
              <h2 className="text-2xl font-bold text-green-700 mb-2">Requirements</h2>
              <p className="text-gray-700 mb-4">Before starting, ensure you have the following:</p>
              <ul className="list-disc ml-6 text-gray-700 space-y-2">
                <li><b>Valid GSTIN:</b> A Goods and Services Tax Identification Number is mandatory for most products (except GST-exempt categories like books).</li>
                <li><b>PAN Card:</b> Required for individuals or businesses (personal PAN for sole proprietorships, company PAN for registered entities).</li>
                <li><b>Bank Account:</b> An active current bank account in the name of the business or individual for receiving payments. Include account number and IFSC code.</li>
                <li><b>Business Registration Documents:</b> For non-individual sellers (e.g., Private Limited Company, LLP), provide Certificate of Incorporation, Memorandum of Association, or partnership deeds. Sole proprietorships need a signed declaration stating the individual owns the bank account.</li>
                <li><b>ID and Address Proof:</b> Government-issued ID (e.g., Aadhaar, passport) and address proof (e.g., telephone bill, electricity bill, bank statement, or lease agreement in the business’s name).</li>
                <li><b>Email ID and Phone Number:</b> Active contact details for communication and verification via OTP.</li>
                <li><b>Pickup Address:</b> A valid address for Flipkart to collect products for fulfillment.</li>
                <li><b>Minimum One Product:</b> At least one product ready to list, with details like description, images, and pricing.</li>
                <li><b>Age Requirement:</b> Seller must be at least 18 years old.</li>
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
                    <p className="text-gray-600 whitespace-normal">Go to <a href="https://seller.flipkart.com" className="text-green-600 underline" target="_blank" rel="noopener noreferrer">seller.flipkart.com</a> and click “Start Selling” or “Register Today.” Sign up using your email address or mobile number and create a strong password.</p>
                  </div>
                </li>
                <li className="bg-white rounded-2xl shadow-lg p-8 flex items-start w-full">
                  <span className="flex-shrink-0 h-12 w-12 flex items-center justify-center rounded-full bg-green-100 text-green-700 font-bold mr-6 text-xl">2</span>
                  <div className="flex-1">
                    <span className="font-semibold text-gray-900">Enter Business and Contact Information</span>
                    <ul className="list-disc ml-6 text-gray-600">
                      <li>Provide your business name, type (e.g., sole proprietorship, private limited company, LLP), and contact details.</li>
                      <li>Submit your GSTIN (if applicable), PAN card details, and bank account information (account number, IFSC code). Ensure these match your business registration documents.</li>
                      <li>Specify a pickup address for product shipments.</li>
                      <li>For sole proprietorships, include a signed declaration on business letterhead confirming ownership of the bank account. For companies or LLPs, provide incorporation documents or power of attorney if applicable.</li>
                    </ul>
                  </div>
                </li>
                <li className="bg-white rounded-2xl shadow-lg p-8 flex items-start w-full">
                  <span className="flex-shrink-0 h-12 w-12 flex items-center justify-center rounded-full bg-green-100 text-green-700 font-bold mr-6 text-xl">3</span>
                  <div className="flex-1">
                    <span className="font-semibold text-gray-900">Verify Your Account</span>
                    <ul className="list-disc ml-6 text-gray-600">
                      <li>Verify your email and phone number using OTPs sent by Flipkart.</li>
                      <li>Upload scanned copies of required documents (e.g., PAN card, ID proof, address proof, canceled cheque). Ensure clarity and accuracy to avoid delays.</li>
                      <li>If you encounter errors like “GSTIN Number Already Exists,” ensure the GSTIN isn’t linked to another Flipkart account. Contact Flipkart Seller Support for assistance.</li>
                    </ul>
                  </div>
                </li>
                <li className="bg-white rounded-2xl shadow-lg p-8 flex items-start w-full">
                  <span className="flex-shrink-0 h-12 w-12 flex items-center justify-center rounded-full bg-green-100 text-green-700 font-bold mr-6 text-xl">4</span>
                  <div className="flex-1">
                    <span className="font-semibold text-gray-900">Set Up Your Seller Profile</span>
                    <ul className="list-disc ml-6 text-gray-600">
                      <li>Once verified, access the Flipkart Seller Hub dashboard.</li>
                      <li>Add your business logo, a brief description, and other details visible to customers. Ensure the description reflects your brand and builds trust.</li>
                      <li>Configure payment settings by selecting a preferred payment gateway (e.g., Razorpay, Paytm, Cashfree) in the “Payment” section.</li>
                      <li>Set up shipping preferences in the “Shipping” section. Choose between Fulfillment by Flipkart (FBF) for Flipkart-managed logistics or Non-FBF (self-managed storage, packing, and delivery).</li>
                    </ul>
                  </div>
                </li>
                <li className="bg-white rounded-2xl shadow-lg p-8 flex items-start w-full">
                  <span className="flex-shrink-0 h-12 w-12 flex items-center justify-center rounded-full bg-green-100 text-green-700 font-bold mr-6 text-xl">5</span>
                  <div className="flex-1">
                    <span className="font-semibold text-gray-900">List Your First Product</span>
                    <ul className="list-disc ml-6 text-gray-600">
                      <li>Navigate to “Listings &gt; Add New Listings” in the Seller Hub dashboard.</li>
                      <li>Select the appropriate product category and brand. If selling a unique product, obtain brand approval from Flipkart’s brand regulation team if required.</li>
                      <li>Enter product details: title, description, price, SKU, and variants (e.g., size, color). Upload high-quality images adhering to Flipkart’s guidelines (clear, bright, multiple angles).</li>
                      <li>Include key selling points, care instructions, and return/replacement policies to enhance customer trust.</li>
                      <li>Save the listing to make it live. You can list products individually or in bulk for larger inventories.</li>
                    </ul>
                  </div>
                </li>
                <li className="bg-white rounded-2xl shadow-lg p-8 flex items-start w-full">
                  <span className="flex-shrink-0 h-12 w-12 flex items-center justify-center rounded-full bg-green-100 text-green-700 font-bold mr-6 text-xl">6</span>
                  <div className="flex-1">
                    <span className="font-semibold text-gray-900">Agree to Terms and Conditions</span>
                    <ul className="list-disc ml-6 text-gray-600">
                      <li>Review and accept Flipkart’s seller policies, including guidelines for product listing, pricing, shipping, and customer service. Compliance is critical to avoid penalties or account suspension.</li>
                    </ul>
                  </div>
                </li>
                <li className="bg-white rounded-2xl shadow-lg p-8 flex items-start w-full">
                  <span className="flex-shrink-0 h-12 w-12 flex items-center justify-center rounded-full bg-green-100 text-green-700 font-bold mr-6 text-xl">7</span>
                  <div className="flex-1">
                    <span className="font-semibold text-gray-900">Explore Seller Hub Features</span>
                    <ul className="list-disc ml-6 text-gray-600">
                      <li>Use the dashboard to manage orders, track inventory, monitor payments, and view performance analytics.</li>
                      <li>Enable two-step verification for account security.</li>
                      <li>Add team members with specific access levels for efficient workflow management.</li>
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
                <li><b>Optimize Product Listings:</b>
                  <ul className="list-disc ml-6">
                    <li>Use SEO-friendly keywords in titles and descriptions to improve search visibility.</li>
                    <li>Ensure high-quality images (clear, well-lit, multiple angles) and accurate product details.</li>
                    <li>Regularly update pricing to stay competitive using Flipkart’s pricing tools.</li>
                  </ul>
                </li>
                <li><b>Choose a Fulfillment Model:</b>
                  <ul className="list-disc ml-6">
                    <li><b>Fulfillment by Flipkart (FBF):</b> Flipkart handles storage, packing, and shipping. Ideal for scalability and access to 19,000+ pin codes.</li>
                    <li><b>Non-FBF:</b> You manage storage, packing, and delivery. Suitable for small-scale sellers or unique products.</li>
                  </ul>
                </li>
                <li><b>Leverage Marketing Tools:</b> Use Flipkart Ads, sponsored listings, and promotional events (e.g., Big Billion Days) to boost visibility. Promote products via social media and email marketing.</li>
                <li><b>Provide Excellent Customer Service:</b> Respond promptly to customer inquiries and resolve issues to maintain high seller ratings. Handle returns efficiently per Flipkart’s policies to avoid penalties.</li>
                <li><b>Monitor Fees and Payments:</b>
                  <ul className="list-disc ml-6">
                    <li>Flipkart charges a commission per sale (percentage-based), fixed fees based on order value, and payment mode fees (e.g., COD, prepaid). Include shipping costs in pricing or list separately.</li>
                    <li>Payments are transferred to your bank account within 7-15 days. Review payment reports in the dashboard.</li>
                    <li>Flipkart’s Seller Protection Fund covers losses from damaged or lost products during transit or fraudulent customer claims.</li>
                  </ul>
                </li>
                <li><b>Avoid Common Issues:</b>
                  <ul className="list-disc ml-6">
                    <li>Ensure all documents match to prevent verification delays.</li>
                    <li>Regularly review Flipkart’s policies to stay compliant.</li>
                    <li>Monitor Account Health metrics to avoid suspension risks.</li>
                  </ul>
                </li>
                <li><b>Use Support Resources:</b>
                  <ul className="list-disc ml-6">
                    <li>Access Flipkart’s Help Center, webinars, and tutorials for guidance.</li>
                    <li>Contact the Seller Support Team for issues with listings, payments, or account setup.</li>
                    <li>Consider third-party tools like Unicommerce for inventory and order management.</li>
                  </ul>
                </li>
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
                  <p className="text-gray-700">Required for most products, but GST-exempt categories (e.g., books) may not need it.</p>
                </div>
                <div>
                  <span className="font-semibold text-gray-900">Are there listing fees?</span>
                  <p className="text-gray-700">Listing products is free; Flipkart charges commissions and fees only on sales.</p>
                </div>
                <div>
                  <span className="font-semibold text-gray-900">Can individuals sell?</span>
                  <p className="text-gray-700">Yes, as a sole proprietorship, but a Private Limited Company or LLP is preferred for liability protection and scalability.</p>
                </div>
                <div>
                  <span className="font-semibold text-gray-900">How long does registration take?</span>
                  <p className="text-gray-700">Setup can be completed in 10 minutes with all documents ready, though verification may take a few days.</p>
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
                <li><a href="https://seller.flipkart.com/support" className="text-green-700 underline" target="_blank" rel="noopener noreferrer">Flipkart Help Center</a> for FAQs, guides, and tutorials.</li>
                <li>Third-party resources: Unicommerce, RevBoosters, or ClearTax for additional support.</li>
              </ul>
              <h2 className="text-2xl font-bold text-green-700 mt-8 mb-4">Notes</h2>
              <ul className="list-disc ml-6 text-gray-700 space-y-2">
                <li>Some sellers report high commission fees (up to 50% in some cases) and return costs impacting profits. Carefully review fee structures and price products accordingly.</li>
                <li>Ensure compliance with Flipkart’s policies to avoid account suspension or penalties.</li>
                <li>For GST-exempt products, confirm eligibility with Flipkart’s guidelines.</li>
              </ul>
              <p className="text-gray-700 mt-4">By following these steps and leveraging Flipkart’s tools, you can establish a successful online business and tap into India’s vast e-commerce market. <b>Start your selling journey today!</b></p>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default Flipkart; 