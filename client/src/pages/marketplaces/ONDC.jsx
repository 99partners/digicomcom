import React from 'react';
import { Helmet } from 'react-helmet';

const ONDC = () => {
  return (
    <>
      <Helmet>
        <title>ONDC Services | 99digicom</title>
        <meta name="description" content="Comprehensive ONDC marketplace services including account management, listing optimization, and advertising." />
      </Helmet>
      <div className="min-h-screen pt-20 bg-gradient-to-br from-green-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">ONDC Seller Account Setup Guide</h1>

          {/* Overview Section */}
          <section className="mb-12">
            <div className="bg-white rounded-lg shadow-md p-8 mb-6">
              <h2 className="text-2xl font-bold text-green-700 mb-2">Overview</h2>
              <p className="text-gray-700">
                The Open Network for Digital Commerce (ONDC), launched by the Government of India in December 2021, is an open-source platform designed to level the playing field for businesses of all sizes by connecting sellers with buyers across multiple apps. With over 5 lakh sellers onboarded and a growing network of buyer and seller apps, ONDC offers increased visibility, lower costs, and flexibility. This guide provides a step-by-step process to register as an ONDC seller, set up your account, and optimize your store for success.
              </p>
            </div>
          </section>

          {/* Requirements Section */}
          <section className="mb-12">
            <div className="bg-green-50 border-l-4 border-green-400 p-8 rounded-lg shadow mb-6">
              <h2 className="text-2xl font-bold text-green-700 mb-2">Requirements</h2>
              <p className="text-gray-700 mb-4">Before starting, ensure you have the following:</p>
              <ul className="list-disc ml-6 text-gray-700 space-y-2">
                <li><b>GSTIN:</b> Mandatory for taxable products (except for GST-exempt categories like certain agricultural goods or handicrafts). Required for compliance and to become a Verified Seller.</li>
                <li><b>PAN Card:</b> Personal or business PAN for identity verification and tax purposes.</li>
                <li><b>Bank Account:</b> A current or savings account in the name of the individual or business for receiving payments. Include account number, IFSC code, and a canceled cheque or bank statement.</li>
                <li><b>Business Details:</b> Business name, address, and type (e.g., sole proprietorship, partnership, private limited company, LLP). Individuals can register without a formal business.</li>
                <li><b>Contact Information:</b> Active 10-digit Indian mobile number and email address for OTP verification and communication.</li>
                <li><b>Address Proof:</b> Utility bill (electricity, water), Aadhaar card, lease agreement, or property tax receipt for the business or pickup address.</li>
                <li><b>Product Information:</b> Details for at least one product (description, high-quality images, pricing) in ONDC-supported categories (e.g., grocery, fashion, electronics, food & beverage, home & kitchen).</li>
                <li><b>Business Documents (if applicable):</b> For non-individual entities, provide Certificate of Incorporation, Memorandum of Association, or Partnership Deed. Sole proprietorships may need a declaration confirming bank account ownership.</li>
                <li><b>Age Requirement:</b> Seller must be at least 18 years old.</li>
                <li><b>Physical Address in India:</b> Required for logistics and verification.</li>
                <li><b>Agreement Copy:</b> Signed agreement with the ONDC Seller Network Participant (SNP) for terms and conditions.</li>
                <li><b>Trademark Registration (Optional):</b> Needed if selling your own branded products.</li>
                <li><b>Smartphone or Computer:</b> To access the seller app or portal for setup and management.</li>
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
                    <span className="font-semibold text-gray-900">Choose an ONDC Seller Network Participant</span>
                    <p className="text-gray-600">Visit the website of an ONDC-approved SNP, such as Protean Open Commerce, SellerApp, uEngage, Vikra, Shipyaari, or COSTBO. Alternatively, check the <a href="https://ondc.org" className="text-green-600 underline" target="_blank" rel="noopener noreferrer">ONDC official website</a> for a list of Seller Network Participants or contact ONDC Sahayak at +91-8130935050. Download the SNP’s seller app from the Google Play Store or iOS App Store, if available.</p>
                  </div>
                </li>
                <li className="bg-white rounded-lg shadow-md p-6 flex items-start">
                  <span className="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-full bg-green-100 text-green-700 font-bold mr-4">2</span>
                  <div>
                    <span className="font-semibold text-gray-900">Initiate Registration</span>
                    <ul className="list-disc ml-6 text-gray-600">
                      <li>On the SNP’s website or app, click “Register,” “Sign Up,” or “Start Selling.”</li>
                      <li>Enter your mobile number and email address. Verify both via OTPs sent to your phone and email.</li>
                      <li>Create a secure password (mix of letters, numbers, symbols).</li>
                    </ul>
                  </div>
                </li>
                <li className="bg-white rounded-lg shadow-md p-6 flex items-start">
                  <span className="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-full bg-green-100 text-green-700 font-bold mr-4">3</span>
                  <div>
                    <span className="font-semibold text-gray-900">Complete Seller Profile</span>
                    <ul className="list-disc ml-6 text-gray-600">
                      <li>Business Name: Legal name or personal name for individuals.</li>
                      <li>Business Type: Sole Proprietorship, Partnership, Private Limited Company, LLP, or Individual.</li>
                      <li>GSTIN: Enter for taxable products; select exempt if applicable.</li>
                      <li>PAN Number: Personal or business PAN.</li>
                      <li>Bank Details: Account number, IFSC code, and bank name.</li>
                      <li>Pickup Address: Valid address for product pickups, including pin code.</li>
                      <li>Business Logo (Optional): Upload a logo to enhance brand visibility.</li>
                      <li>Website (Optional): Add if available.</li>
                      <li>Specify product categories (e.g., grocery, fashion, electronics) and delivery pin codes you serve.</li>
                    </ul>
                  </div>
                </li>
                <li className="bg-white rounded-lg shadow-md p-6 flex items-start">
                  <span className="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-full bg-green-100 text-green-700 font-bold mr-4">4</span>
                  <div>
                    <span className="font-semibold text-gray-900">Upload Required Documents</span>
                    <ul className="list-disc ml-6 text-gray-600">
                      <li>PAN Card</li>
                      <li>GST Certificate (if applicable)</li>
                      <li>Canceled cheque or bank statement</li>
                      <li>Address proof (e.g., utility bill, Aadhaar card, lease agreement)</li>
                      <li>Business registration documents (for non-individual entities)</li>
                      <li>Signed agreement with the SNP for ONDC terms and conditions</li>
                    </ul>
                    <p className="text-gray-600 mt-1">Ensure documents match provided details and are within 2-5 MB. Inaccurate or unclear documents may delay verification. Some SNPs may require additional KYC documents, like ID proof or photographs.</p>
                  </div>
                </li>
                <li className="bg-white rounded-lg shadow-md p-6 flex items-start">
                  <span className="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-full bg-green-100 text-green-700 font-bold mr-4">5</span>
                  <div>
                    <span className="font-semibold text-gray-900">KYC Review and Approval</span>
                    <ul className="list-disc ml-6 text-gray-600">
                      <li>The SNP reviews your KYC details and documents, typically within 2-3 business days.</li>
                      <li>Monitor your email or app notifications for approval status or requests for additional information.</li>
                      <li>Upon approval, you’ll receive access to the SNP’s seller dashboard or app.</li>
                    </ul>
                  </div>
                </li>
                <li className="bg-white rounded-lg shadow-md p-6 flex items-start">
                  <span className="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-full bg-green-100 text-green-700 font-bold mr-4">6</span>
                  <div>
                    <span className="font-semibold text-gray-900">List Products</span>
                    <ul className="list-disc ml-6 text-gray-600">
                      <li>Access the SNP’s seller dashboard or app and navigate to the “Products” or “Catalog” section.</li>
                      <li>Add products: Title (descriptive, keyword-rich), description (features, specifications, benefits), images (high-resolution, minimum 800x800 pixels), pricing, inventory, and return/cancellation policy.</li>
                      <li>Save and publish listings. Products become visible across ONDC buyer apps (e.g., Paytm, PhonePe) within 24-48 hours after approval.</li>
                    </ul>
                  </div>
                </li>
                <li className="bg-white rounded-lg shadow-md p-6 flex items-start">
                  <span className="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-full bg-green-100 text-green-700 font-bold mr-4">7</span>
                  <div>
                    <span className="font-semibold text-gray-900">Configure Logistics and Payments</span>
                    <ul className="list-disc ml-6 text-gray-600">
                      <li>Choose a logistics option: Self-Ship (your own delivery agent or third-party logistics) or ONDC Logistics Partners (SNP-integrated providers like Shipyaari).</li>
                      <li>Set up payment details in the seller dashboard to receive payments (weekly or as per SNP terms).</li>
                      <li>ONDC’s decentralized settlement framework ensures secure fund transfers.</li>
                    </ul>
                  </div>
                </li>
                <li className="bg-white rounded-lg shadow-md p-6 flex items-start">
                  <span className="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-full bg-green-100 text-green-700 font-bold mr-4">8</span>
                  <div>
                    <span className="font-semibold text-gray-900">Enable Account Security</span>
                    <ul className="list-disc ml-6 text-gray-600">
                      <li>Enable two-factor authentication in the SNP’s app or dashboard settings.</li>
                      <li>Use a strong password to protect your account.</li>
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
                    <li>Use SEO-friendly keywords to improve discoverability across buyer apps.</li>
                    <li>Ensure high-quality images and detailed descriptions to attract buyers.</li>
                    <li>Regularly update inventory and pricing based on demand and competition.</li>
                  </ul>
                </li>
                <li><b>Leverage ONDC’s Reach:</b>
                  <ul className="list-disc ml-6">
                    <li>Your products are visible across multiple buyer apps (e.g., Paytm, PhonePe, Dunzo), reaching over 50 million buyers.</li>
                    <li>Promote your ONDC store using a personalized QR code generated via <a href="https://qrmaker.ondc.org" className="text-green-700 underline" target="_blank" rel="noopener noreferrer">qrmaker.ondc.org</a> for social media sharing.</li>
                  </ul>
                </li>
                <li><b>Manage Orders and Customer Service:</b>
                  <ul className="list-disc ml-6">
                    <li>Monitor orders via the SNP’s dashboard or app. Respond to inquiries promptly to maintain high ratings.</li>
                    <li>Handle returns and cancellations per your stated policy to ensure customer satisfaction.</li>
                  </ul>
                </li>
                <li><b>Understand Costs:</b>
                  <ul className="list-disc ml-6">
                    <li>ONDC itself charges no commission, but SNPs may charge a negotiable commission or subscription fee.</li>
                    <li>Shipping fees depend on package weight, dimensions, and logistics provider.</li>
                    <li>Payments are credited to your bank account within 7-15 days, depending on the SNP.</li>
                  </ul>
                </li>
                <li><b>Monitor Performance:</b>
                  <ul className="list-disc ml-6">
                    <li>Use the SNP’s analytics tools to track sales, customer feedback, and order fulfillment rates.</li>
                    <li>Maintain high performance to avoid penalties or reduced visibility.</li>
                  </ul>
                </li>
                <li><b>Avoid Common Issues:</b>
                  <ul className="list-disc ml-6">
                    <li>Ensure document accuracy to prevent KYC delays.</li>
                    <li>Avoid listing prohibited items (e.g., hazardous goods) per ONDC’s policies.</li>
                    <li>Contact the SNP’s support team or ONDC Sahayak (+91-8130935050) for issues with registration, listings, or payments.</li>
                  </ul>
                </li>
                <li><b>Explore Additional Tools:</b>
                  <ul className="list-disc ml-6">
                    <li>Use SNP-provided tools like catalog digitalization, order management, or Generative AI for enriched listings (e.g., SellerApp’s LQI with Google Cloud).</li>
                    <li>Attend ONDC webinars or workshops for training on best practices.</li>
                    <li>Consider third-party services like Shipyaari or COSTBO for logistics and marketing support.</li>
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
                  <p className="text-gray-700">ONDC itself has no registration fees. SNPs may charge minimal or no onboarding fees, but commissions or subscription fees may apply.</p>
                </div>
                <div>
                  <span className="font-semibold text-gray-900">Is GSTIN mandatory?</span>
                  <p className="text-gray-700">Required for taxable products, except for exempt categories under Section 9(5) of the CGST Act.</p>
                </div>
                <div>
                  <span className="font-semibold text-gray-900">How long does verification take?</span>
                  <p className="text-gray-700">KYC typically takes 2-3 business days.</p>
                </div>
                <div>
                  <span className="font-semibold text-gray-900">Can individuals sell?</span>
                  <p className="text-gray-700">Yes, individuals can register as sole proprietors without a formal business.</p>
                </div>
                <div>
                  <span className="font-semibold text-gray-900">Can I use multiple SNPs?</span>
                  <p className="text-gray-700">Registering with one SNP is sufficient, as products are visible across all ONDC buyer apps. Multiple registrations offer no additional advantage.</p>
                </div>
                <div>
                  <span className="font-semibold text-gray-900">Does ONDC handle logistics?</span>
                  <p className="text-gray-700">No, but SNPs integrate with logistics providers, or you can self-ship.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Resources & Notes Section */}
          <section className="mb-12">
            <div className="bg-green-100 rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-bold text-green-700 mb-4">Resources</h2>
              <ul className="list-disc ml-6 text-gray-700 space-y-2">
                <li><a href="https://ondc.org" className="text-green-700 underline" target="_blank" rel="noopener noreferrer">ONDC Official Website</a></li>
                <li>ONDC Sahayak: Contact at +91-8130935050 for support</li>
                <li>Seller Network Participants: Protean, SellerApp, uEngage, Vikra, Shipyaari, COSTBO</li>
                <li>Meesho Supplier App: Can be used for ONDC integration, as Meesho is an ONDC participant.</li>
                <li>Third-party resources: TheGSTCo, Seller Rocket, or Unicommerce for additional support</li>
              </ul>
              <h2 className="text-2xl font-bold text-green-700 mt-8 mb-4">Notes</h2>
              <ul className="list-disc ml-6 text-gray-700 space-y-2">
                <li>ONDC’s open network ensures your products are visible across multiple buyer apps without platform lock-ins, offering a 40x increase in merchant onboarding in 2023.</li>
                <li>Small businesses, artisans, and kirana shops benefit from ONDC’s low-cost model and access to rural and urban markets.</li>
                <li>ONDC uses advanced encryption and multi-factor authentication for secure transactions.</li>
                <li>Regularly check SNP dashboards and ONDC’s resources for updates on policies, new buyer apps, and expansion to categories like mobility and travel.</li>
              </ul>
              <p className="text-gray-700 mt-4">By following these steps and leveraging ONDC’s ecosystem, you can expand your reach, reduce costs, and grow your business across India’s digital commerce landscape. <b>Start your ONDC selling journey today!</b></p>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default ONDC; 