import React from 'react'
import { Link } from 'react-router-dom'
import { Mail } from 'lucide-react'
import { useEffect } from "react";

const TermsOfService = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="min-h-screen bg-white text-gray-800">
      <main className="pt-24 sm:pt-32 px-4 sm:px-6 lg:px-8 py-10 sm:py-16 max-w-2xl sm:max-w-3xl lg:max-w-4xl mx-auto">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8 sm:mb-10 text-center text-green-700">
          Terms of Service
        </h1>
        <div className="space-y-6 sm:space-y-8 text-base sm:text-lg leading-7">
          <p>
            Welcome to <strong>99partners.in</strong>! These Terms govern your use of our website and services. Please read them carefully.
          </p>

          <section>
            <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-green-700 mb-2">Accounts</h2>
            <p className="text-gray-700">
              When creating an account, you must provide accurate and complete information. You are responsible for
              maintaining the confidentiality of your password and all activities that occur under your account.
            </p>
          </section>

          <section>
            <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-green-700 mb-2">Intellectual Property</h2>
            <p className="text-gray-700">
              All content, trademarks, and intellectual property displayed on this site are the property of 99 Partners
              and protected by applicable copyright and trademark laws.
            </p>
          </section>

          <section>
            <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-green-700 mb-2">Links to Other Sites</h2>
            <p className="text-gray-700">
              Our website may contain links to third-party websites. We are not responsible for the content, terms, or
              privacy policies of those external sites.
            </p>
          </section>

          <section>
            <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-green-700 mb-2">Termination</h2>
            <p className="text-gray-700">
              We reserve the right to suspend or terminate your access to our services at any time if you violate these
              Terms or engage in unlawful or abusive conduct.
            </p>
          </section>

          <section>
            <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-green-700 mb-2">Governing Law</h2>
            <p className="text-gray-700">
              These Terms are governed by and construed in accordance with the laws of Maharashtra, India.
            </p>
          </section>

          <section>
            <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-green-700 mb-2">Changes to These Terms</h2>
            <p className="text-gray-700">
              We may revise these Terms of Service at any time. Last updated on <strong>20th June 2025</strong>.
            </p>
          </section>

          <section>
            <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-green-700 mb-2">Contact Us</h2>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-center gap-2">
                <Mail className="h-5 w-5 text-green-600" />
                <span>Email: hello@99partners.com</span>
              </li>
              <li>
                Visit:{" "}
                <Link to="/contact" className="text-green-600 hover:text-green-800 font-medium underline">
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

export default TermsOfService
