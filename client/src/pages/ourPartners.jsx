"use client"

import { Link } from "react-router-dom";
import { CheckCircle, Users, ArrowRight, Handshake } from "lucide-react";
import { Helmet } from 'react-helmet';
import logo from "../assets/99digicom.png";

const PartnerCommitments = () => {
  return (
    <>
      <Helmet>
        <title>Our Partners & Partner Commitments | 99digicom</title>
        <meta name="description" content="Learn about 99digicom's partner commitments and expectations. Clear guidelines for documentation, product listing, compliance, fulfillment, and customer service." />
        <meta name="keywords" content="partner commitments, e-commerce partnership, seller guidelines, marketplace compliance, partner requirements" />
        <link rel="canonical" href="https://99digicom.com/our-partners" />
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "WebPage",
              "name": "Partner Commitments and Guidelines",
              "description": "Guidelines and commitments for 99digicom partners",
              "provider": {
                "@type": "Organization",
                "name": "99digicom"
              },
              "offers": {
                "@type": "Offer",
                "name": "Partner Program",
                "description": "Comprehensive e-commerce enablement services with transparent pricing"
              }
            }
          `}
        </script>
      </Helmet>

      <main className="min-h-screen bg-gradient-to-br from-green-50 to-white">
        {/* Hero Section */}
        <section aria-labelledby="hero-heading" className="pt-24 pb-16 px-4">
          <div className="max-w-7xl mx-auto text-center">
            <div className="inline-flex items-center space-x-2 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium mb-6" role="text">
              <Handshake className="h-4 w-4" aria-hidden="true" />
              <span>Our Partners</span>
            </div>
            <h1 id="hero-heading" className="text-5xl font-bold text-gray-900 mb-6">
              Our <span className="text-green-600">Partners</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Success starts with a shared commitment. At 99digicom, we treat our partners as an extension of our brand ecosystem.
            </p>
          </div>
        </section>

        {/* Commitments Section */}
        <section aria-labelledby="commitments-heading" className="py-16 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 id="commitments-heading" className="text-3xl font-bold text-gray-900 mb-4">🤝 What We Expect from Our Partners</h2>
              <p className="text-lg text-gray-600 max-w-4xl mx-auto">
                To ensure smooth collaboration, high performance, and long-term growth, we ask our partners to commit to these essential responsibilities.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-8" role="list">
              {[
                {
                  title: "Timely Documentation & Setup",
                  items: [
                    "Submit valid business documents: GST, PAN, bank details, brand certifications, FSSAI (if applicable).",
                    "Cooperate during seller account creation and platform onboarding.",
                    "Respond quickly to documentation or platform verification requests.",
                  ],
                },
                {
                  title: "Product Listing Readiness",
                  items: [
                    "Provide high-quality product information: names, images, pricing, and descriptions.",
                    "Share updated inventory and stock availability regularly.",
                    "Approve listing drafts within agreed timelines to avoid delays.",
                  ],
                },
                {
                  title: "Compliance & Authenticity",
                  items: [
                    "Ensure all products listed are genuine, legal, and compliant with relevant standards.",
                    "Maintain quality standards as per platform policies (Amazon, Flipkart, ONDC, etc.).",
                    "Avoid counterfeit, expired, or misleading products/content.",
                  ],
                },
                {
                  title: "Fulfilment & Timely Dispatch",
                  items: [
                    "Pack and dispatch orders as per SLAs (unless 99digicom is managing fulfillment).",
                    "Respond to order notifications and shipping updates promptly.",
                    "Coordinate with delivery/logistics partners when needed.",
                  ],
                },
                {
                  title: "Customer-Centric Approach",
                  items: [
                    "Support positive customer experiences through quality packaging, accurate listings, and quick responses to complaints.",
                    "Cooperate on return management and refunds when necessary.",
                    "Keep customer satisfaction as a top priority.",
                  ],
                },
                {
                  title: "Marketing Participation (Optional, but Recommended)",
                  items: [
                    "Participate in seasonal campaigns and co-branding opportunities.",
                    "Allow use of your brand name, logo, and product visuals for joint promotions.",
                    "Share your availability for collaborative content creation (e.g., festive promos or reels).",
                  ],
                },
              ].map((commitment, index) => (
                <div key={index} className="space-y-4" role="listitem">
                  <div className="flex items-start space-x-4">
                    <CheckCircle className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" aria-hidden="true" />
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">{commitment.title}</h3>
                      <ul className="space-y-2" role="list">
                        {commitment.items.map((item, i) => (
                          <li key={i} className="text-gray-600 text-sm flex items-start" role="listitem">
                            <span className="mr-2" aria-hidden="true">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Financial Commitments Section */}
        <section aria-labelledby="financial-heading" className="py-16 px-4 bg-green-50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 id="financial-heading" className="text-3xl font-bold text-gray-900 mb-4">💼 Financial Commitments</h2>
              <p className="text-lg text-gray-600 max-w-4xl mx-auto">
                Transparent pricing to support your growth on our platform.
              </p>
            </div>
            <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow">
              <table className="w-full" role="table">
                <thead>
                  <tr className="bg-green-600 text-white">
                    <th scope="col" className="py-4 px-6 text-left text-sm font-semibold rounded-tl-lg">Type</th>
                    <th scope="col" className="py-4 px-6 text-left text-sm font-semibold">Description</th>
                    <th scope="col" className="py-4 px-6 text-left text-sm font-semibold rounded-tr-lg">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    {
                      type: "One-Time Onboarding Fee",
                      description: "Platform setup, listing support & dashboard access",
                      amount: "Starts from ₹4,999",
                    },
                    {
                      type: "Monthly Account Management (Optional)",
                      description: "Listing updates, reporting, platform support",
                      amount: "From ₹3,500/month",
                    },
                    {
                      type: "Advertising Budget (If opted)",
                      description: "Paid promotions on marketplaces or Meta/Google",
                      amount: "Flexible (based on plan)",
                    },
                  ].map((item, index) => (
                    <tr
                      key={index}
                      className={`border-b border-green-100 hover:bg-green-50 transition-all duration-200 ${
                        index === 2 ? "rounded-bl-lg rounded-br-lg" : ""
                      }`}
                      role="row"
                    >
                      <td className="py-4 px-6 text-gray-900 font-medium">{item.type}</td>
                      <td className="py-4 px-6 text-gray-600 text-sm">{item.description}</td>
                      <td className="py-4 px-6 text-green-600 font-semibold">{item.amount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-center text-gray-600 text-sm mt-6">
              Custom packages available for high-volume or multi-category sellers.
            </p>
          </div>
        </section>

        {/* Benefits Section */}
        <section aria-labelledby="benefits-heading" className="py-16 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 id="benefits-heading" className="text-3xl font-bold text-gray-900 mb-4">🧩 What You Get in Return</h2>
              <p className="text-lg text-gray-600 max-w-4xl mx-auto">
                Partnering with 99digicom means seamless growth and support.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-8" role="list">
              {[
                "Multi-platform presence without the headache",
                "Dedicated onboarding & growth team",
                "Access to co-marketing, bundling, and promotions",
                "Transparent, performance-focused partnership",
              ].map((benefit, index) => (
                <div key={index} className="flex items-start space-x-4" role="listitem">
                  <Users className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" aria-hidden="true" />
                  <div>
                    <p className="text-gray-600 text-sm">{benefit}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section aria-labelledby="cta-heading" className="py-16 px-4 bg-green-50">
          <div className="max-w-7xl mx-auto text-center">
            <h2 id="cta-heading" className="text-3xl font-bold text-gray-900 mb-4">🚀 Let's Build a Win-Win Relationship</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
              We're here to help you grow — and we believe clarity leads to success.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/partners/partnersOnboarding"
                className="group bg-green-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-green-700 transition-all duration-300 flex items-center justify-center touch-manipulation"
                aria-label="Apply to become a partner"
              >
                Apply to Become a Partner
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
              </Link>
              <Link
                to="/contact"
                className="group border-2 border-green-600 text-green-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-green-600 hover:text-white transition-all duration-300 flex items-center justify-center touch-manipulation"
                aria-label="Talk to our team about partnership opportunities"
              >
                Talk to Our Team
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default PartnerCommitments;
