import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Mail } from 'lucide-react'
import { Helmet } from 'react-helmet'

const RefundPolicy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const lastUpdated = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="min-h-screen bg-white text-gray-800">
      <Helmet>
        <title>Refund Policy | 99Digicom</title>
        <meta name="description" content="Read the 99Digicom Refund Policy regarding eligibility, process, and timelines for refunds." />
        <link rel="canonical" href="https://99digicom.com/refundpolicy" />
        <meta name="robots" content="noindex, nofollow" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Refund Policy | 99Digicom" />
        <meta property="og:description" content="Read the 99Digicom Refund Policy regarding eligibility, process, and timelines for refunds." />
        <meta property="og:url" content="https://99digicom.com/refundpolicy" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Refund Policy | 99Digicom" />
        <meta name="twitter:description" content="Read the 99Digicom Refund Policy regarding eligibility, process, and timelines for refunds." />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "Refund Policy",
          url: "https://99digicom.com/refundpolicy",
          description: "Read the 99Digicom Refund Policy regarding eligibility, process, and timelines for refunds.",
          title: "Refund Policy | 99Digicom",
          keywords: "99digicom, refund policy, eligibility, process, timelines, refunds, digital products, services, customer support, refund process, refund timeline, refund eligibility, refund policy, refund process, refund timeline, refund eligibility"
        })}</script>
      </Helmet>

      <main id="main-content" className="pt-24 sm:pt-32 px-4 sm:px-6 lg:px-8 py-10 sm:py-16 max-w-2xl sm:max-w-3xl lg:max-w-4xl mx-auto">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8 sm:mb-10 text-center text-green-700">
          Refund Policy
        </h1>
        <p className="text-sm text-gray-500 text-center mb-6">Last updated: <strong>{lastUpdated}</strong></p>

        <div className="space-y-6 sm:space-y-8 text-base sm:text-lg leading-7">
          <p>
            At <strong>99digicom.com</strong>, we strive to provide our customers with the best digital products and
            services. If you are not entirely satisfied with your purchase, we’re here to help.
          </p>

          <section>
            <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-green-700 mb-2">1. Eligibility for Refund</h2>
            <ul className="list-disc pl-6 text-gray-700 space-y-1">
              <li>The product/service you purchased was not delivered as described.</li>
              <li>There is a verified technical issue that prevents usage and cannot be resolved.</li>
              <li>You were charged more than the listed price.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-green-700 mb-2">2. Non-Refundable Items</h2>
            <ul className="list-disc pl-6 text-gray-700 space-y-1">
              <li>Services or products that have already been fully delivered/consumed.</li>
              <li>Digital goods once downloaded or accessed (unless faulty or not as described).</li>
              <li>Customized or personalized services after work has commenced.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-green-700 mb-2">3. Refund Request Process</h2>
            <ol className="list-decimal pl-6 text-gray-700 space-y-1">
              <li>Email us at <strong>support@99digicom.com</strong> with your order number and reason for the refund.</li>
              <li>Our team will review your request within 3–5 business days.</li>
              <li>If approved, the refund will be processed to your original payment method within 7–10 business days.</li>
            </ol>
          </section>

          <section>
            <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-green-700 mb-2">4. Late or Missing Refunds</h2>
            <ul className="list-disc pl-6 text-gray-700 space-y-1">
              <li>First check your bank account again.</li>
              <li>Then contact your credit card company or payment provider—it may take some time before your refund is posted.</li>
              <li>If you’ve done all of this and still have not received your refund, please contact us at <strong>support@99digicom.com</strong>.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-green-700 mb-2">5. Contact Us</h2>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-center gap-2">
                <Mail className="h-5 w-5 text-green-600" />
                <span>Email: support@99digicom.com</span>
              </li>
              <li>
                Visit:{" "}
                  <Link to="/contact_us" className="text-green-600 hover:text-green-800 font-medium underline">
                  Contact Us
                </Link>
              </li>
            </ul>
          </section>
        </div>
      </main>
    </div>
  )
}

export default RefundPolicy