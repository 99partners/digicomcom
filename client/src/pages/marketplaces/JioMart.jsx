import React from 'react';
import { Helmet } from 'react-helmet';

const JioMart = () => {
  return (
    <>
      <Helmet>
        <title>JioMart Services | 99digicom</title>
        <meta name="description" content="Complete JioMart marketplace services including account management, listing optimization, and advertising." />
      </Helmet>
      <div className="min-h-screen pt-20 bg-gradient-to-br from-green-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">JioMart Seller Account Setup Guide</h1>

          {/* Overview Section */}
          <section className="mb-12">
            <div className="bg-white rounded-lg shadow-md p-8 mb-6">
              <h2 className="text-2xl font-bold text-green-700 mb-2">Overview</h2>
              <p className="text-gray-700">
                JioMart, launched by Reliance Retail, is a leading B2C e-commerce platform in India, serving over 5 million customers across 11,780 stores in 6,700 cities, with 2 million daily shoppers. It offers sellers access to a vast customer base, seamless logistics, and tools like WhatsApp integration for enhanced reach. This guide provides a step-by-step process to register as a JioMart seller, set up your account, and optimize your store for success.
              </p>
            </div>
          </section>

          {/* Requirements Section */}
          <section className="mb-12">
            <div className="bg-green-50 border-l-4 border-green-400 p-8 rounded-lg shadow mb-6">
              <h2 className="text-2xl font-bold text-green-700 mb-2">Requirements</h2>
              <p className="text-gray-700 mb-4">Before starting, gather the following:</p>
              <ul className="list-disc ml-6 text-gray-700 space-y-2">
                <li><b>GSTIN:</b> Mandatory for tax compliance, except for GST-exempt products (e.g., certain agricultural goods). Ensure your business has a valid Goods and Services Tax Identification Number.</li>
                <li><b>PAN Card:</b> Personal or business PAN for identity verification.</li>
                <li><b>Bank Account:</b> A current account in the name of the business or individual for receiving payments. Include account number, IFSC code, and a canceled cheque or bank statement.</li>
                <li><b>Business Registration Documents:</b> For non-individual entities (e.g., Private Limited Company, LLP, Partnership), provide Certificate of Incorporation, Memorandum of Association, or Partnership Deed. Sole proprietorships need a declaration confirming bank account ownership.</li>
                <li><b>Contact Information:</b> Active mobile number (preferably linked to WhatsApp) and email address for OTP verification and communication.</li>
                <li><b>Business Address:</b> A valid address for product pickups and business verification.</li>
                <li><b>Product Details:</b> At least one product to list, with details like description, high-quality images, and pricing, aligned with JioMart’s categories (e.g., grocery, electronics, personal care).</li>
                <li><b>Age Requirement:</b> Seller must be at least 18 years old.</li>
                <li><b>Trademark Registration (Optional):</b> Required if selling under your own brand.</li>
                <li><b>Import/Export Code (Optional):</b> Needed for international sellers.</li>
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
                    <span className="font-semibold text-gray-900">Visit the JioMart Seller Portal</span>
                    <p className="text-gray-600">Go to <a href="https://seller.jiomart.com" className="text-green-600 underline" target="_blank" rel="noopener noreferrer">seller.jiomart.com</a> and click “Register” or “Sign Up.” Alternatively, use the JioMart Seller App (available on Google Play or iOS App Store) for mobile setup. Ensure you’re on the official JioMart Seller Portal to avoid phishing risks.</p>
                  </div>
                </li>
                <li className="bg-white rounded-lg shadow-md p-6 flex items-start">
                  <span className="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-full bg-green-100 text-green-700 font-bold mr-4">2</span>
                  <div>
                    <span className="font-semibold text-gray-900">Initiate Registration</span>
                    <ul className="list-disc ml-6 text-gray-600">
                      <li>Enter your full name, mobile number, email address, and create a secure password.</li>
                      <li>Verify your mobile number and email via OTPs sent by JioMart. This step ensures secure communication.</li>
                    </ul>
                  </div>
                </li>
                <li className="bg-white rounded-lg shadow-md p-6 flex items-start">
                  <span className="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-full bg-green-100 text-green-700 font-bold mr-4">3</span>
                  <div>
                    <span className="font-semibold text-gray-900">Provide Business Details</span>
                    <ul className="list-disc ml-6 text-gray-600">
                      <li>Business Name: Legal name as registered.</li>
                      <li>Business Type: Choose from Sole Proprietorship, Partnership, Private Limited Company, LLP, or other recognized entities.</li>
                      <li>Business Address: Provide a complete address, including pin code, for product pickups and verification.</li>
                      <li>GSTIN: Enter your GST number for tax compliance.</li>
                      <li>PAN Number: Provide your personal or company PAN.</li>
                      <li>Bank Details: Submit account number, IFSC code, and bank name for payments.</li>
                      <li>For non-individual businesses, include Corporate Identification Number (CIN) if applicable.</li>
                    </ul>
                  </div>
                </li>
                <li className="bg-white rounded-lg shadow-md p-6 flex items-start">
                  <span className="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-full bg-green-100 text-green-700 font-bold mr-4">4</span>
                  <div>
                    <span className="font-semibold text-gray-900">Upload Required Documents</span>
                    <ul className="list-disc ml-6 text-gray-600">
                      <li>PAN Card</li>
                      <li>GST Certificate</li>
                      <li>Canceled cheque or bank statement</li>
                      <li>Business registration documents (e.g., Certificate of Incorporation, Partnership Deed)</li>
                      <li>Address proof (e.g., utility bill, lease agreement)</li>
                      <li>Two passport-size photographs (if required for KYC)</li>
                      <li>Trademark registration or brand authorization (if selling own brand)</li>
                    </ul>
                    <p className="text-gray-600 mt-1">Ensure documents match the provided details to avoid delays. File sizes should be within 2-5 MB. JioMart’s team reviews documents within 3-5 business days. You’ll receive an email with approval status or requests for additional information.</p>
                  </div>
                </li>
                <li className="bg-white rounded-lg shadow-md p-6 flex items-start">
                  <span className="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-full bg-green-100 text-green-700 font-bold mr-4">5</span>
                  <div>
                    <span className="font-semibold text-gray-900">Complete Verification and Account Activation</span>
                    <ul className="list-disc ml-6 text-gray-600">
                      <li>After document submission, JioMart verifies your information. Upon approval, you’ll receive an email with a seller portal link and an invitation code.</li>
                      <li>Click the link, enter the invitation code, and agree to JioMart’s Terms and Conditions.</li>
                      <li>Log in to the Seller Dashboard using your User ID and password. Complete any remaining profile details, such as annual turnover or office type.</li>
                    </ul>
                  </div>
                </li>
                <li className="bg-white rounded-lg shadow-md p-6 flex items-start">
                  <span className="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-full bg-green-100 text-green-700 font-bold mr-4">6</span>
                  <div>
                    <span className="font-semibold text-gray-900">Set Up Your Store and List Products</span>
                    <ul className="list-disc ml-6 text-gray-600">
                      <li>Access the JioMart Seller Dashboard to configure your store: add a business logo and a concise description to build buyer trust.</li>
                      <li>Select product categories (e.g., grocery, electronics, personal care) that align with your offerings.</li>
                      <li>Set up payment methods (e.g., bank transfers) and shipping preferences. JioMart’s logistics handle deliveries, but you can configure shipping fees and timelines.</li>
                      <li>Add products via the “Listings” section: title, description, images, pricing, and category. Use high-quality images and keyword-rich titles.</li>
                      <li>Save and publish listings. Listings may take a few days to appear.</li>
                    </ul>
                  </div>
                </li>
                <li className="bg-white rounded-lg shadow-md p-6 flex items-start">
                  <span className="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-full bg-green-100 text-green-700 font-bold mr-4">7</span>
                  <div>
                    <span className="font-semibold text-gray-900">Enable Two-Step Verification</span>
                    <ul className="list-disc ml-6 text-gray-600">
                      <li>Secure your account by enabling two-factor authentication in the Seller Dashboard settings.</li>
                      <li>Use a strong password with a mix of letters, numbers, and symbols.</li>
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
                    <li>Use SEO-friendly keywords in titles and descriptions to improve search rankings.</li>
                    <li>Ensure high-quality images and accurate product details to attract buyers.</li>
                    <li>Update pricing regularly based on JioMart’s analytics and market trends.</li>
                  </ul>
                </li>
                <li><b>Leverage JioMart’s Tools:</b>
                  <ul className="list-disc ml-6">
                    <li>Use JioMart’s marketing tools (e.g., ads, flash sales, discounts) to boost visibility, especially during events like festive sales.</li>
                    <li>Participate in promotional programs for coupons and deals to drive sales.</li>
                    <li>Utilize WhatsApp integration to engage customers directly.</li>
                  </ul>
                </li>
                <li><b>Manage Orders and Inventory:</b>
                  <ul className="list-disc ml-6">
                    <li>Track orders, shipments, and returns via the Seller Dashboard or JioMart Seller App for real-time updates.</li>
                    <li>Maintain optimal inventory to avoid stockouts or overstocking.</li>
                  </ul>
                </li>
                <li><b>Understand Fees:</b>
                  <ul className="list-disc ml-6">
                    <li>Commission Fee: 1-15% based on product type and price.</li>
                    <li>Fixed Fee: Based on transaction value (includes selling price, gift wrapping, etc.).</li>
                    <li>Shipping Fees: Calculated by package weight/volume, handled by JioMart’s logistics.</li>
                    <li>Collection Fee: Currently not charged.</li>
                    <li>Payments are credited to your bank account within 7-15 days.</li>
                  </ul>
                </li>
                <li><b>Provide Excellent Customer Service:</b>
                  <ul className="list-disc ml-6">
                    <li>Respond to customer queries promptly via the dashboard or WhatsApp to build trust and positive reviews.</li>
                    <li>Handle returns efficiently per JioMart’s flexible, zero-questions return policy.</li>
                  </ul>
                </li>
                <li><b>Monitor Account Health:</b>
                  <ul className="list-disc ml-6">
                    <li>Regularly check the Seller Dashboard for performance metrics (e.g., order fulfillment rate, customer feedback).</li>
                    <li>Address issues like late deliveries or quality complaints to avoid account suspension.</li>
                  </ul>
                </li>
                <li><b>Avoid Common Issues:</b>
                  <ul className="list-disc ml-6">
                    <li>Ensure document accuracy to prevent verification delays.</li>
                    <li>Avoid misleading product information or unethical practices.</li>
                    <li>Contact JioMart Seller Support at <a href="mailto:seller.onboarding@jiomart.com" className="text-green-700 underline">seller.onboarding@jiomart.com</a> for issues with registration, listings, or account management.</li>
                  </ul>
                </li>
                <li><b>Use Additional Resources:</b>
                  <ul className="list-disc ml-6">
                    <li>Attend JioMart’s webinars and training sessions for optimization tips.</li>
                    <li>Consider third-party services like RevBoosters, Seller Rocket, or Shiprocket for account management, product photography, or logistics support.</li>
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
                  <span className="font-semibold text-gray-900">Is registration free?</span>
                  <p className="text-gray-700">Yes, there’s no fee to register or list products. Fees apply only on sales (commission, fixed, and shipping fees).</p>
                </div>
                <div>
                  <span className="font-semibold text-gray-900">How long does verification take?</span>
                  <p className="text-gray-700">Typically 3-5 business days, longer if documents are incomplete.</p>
                </div>
                <div>
                  <span className="font-semibold text-gray-900">Can individuals sell?</span>
                  <p className="text-gray-700">Yes, as sole proprietors, but GSTIN is required for taxable products.</p>
                </div>
                <div>
                  <span className="font-semibold text-gray-900">Can I sell my own brand?</span>
                  <p className="text-gray-700">Yes, with trademark registration or brand authorization if applicable.</p>
                </div>
                <div>
                  <span className="font-semibold text-gray-900">Does JioMart handle logistics?</span>
                  <p className="text-gray-700">Yes, JioMart’s logistics network manages deliveries, saving sellers time and effort.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Resources & Notes Section */}
          <section className="mb-12">
            <div className="bg-green-100 rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-bold text-green-700 mb-4">Resources</h2>
              <ul className="list-disc ml-6 text-gray-700 space-y-2">
                <li><a href="https://seller.jiomart.com" className="text-green-700 underline" target="_blank" rel="noopener noreferrer">JioMart Seller Portal</a></li>
                <li>JioMart Seller App for iOS and Android</li>
                <li><a href="mailto:seller.onboarding@jiomart.com" className="text-green-700 underline">JioMart Seller Support: seller.onboarding@jiomart.com</a></li>
                <li>Third-party services: RevBoosters, Seller Rocket, Shiprocket, RegisterKaro for additional support</li>
              </ul>
              <h2 className="text-2xl font-bold text-green-700 mt-8 mb-4">Notes</h2>
              <ul className="list-disc ml-6 text-gray-700 space-y-2">
                <li>JioMart’s platform is seller-friendly with low commission rates (1-15%) and no collection fees, but high competition and platform fees may impact margins. Price products strategically to cover costs.</li>
                <li>JioMart’s integration with Reliance’s ecosystem (e.g., Jio telecom, Milkbasket subscriptions) boosts visibility, especially in Tier 2 and rural markets.</li>
                <li>Regularly review JioMart’s policies to stay compliant and avoid disruptions.</li>
              </ul>
              <p className="text-gray-700 mt-4">By following these steps and leveraging JioMart’s tools, you can establish a strong online presence and tap into millions of customers across India. <b>Start your JioMart selling journey today!</b></p>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default JioMart; 