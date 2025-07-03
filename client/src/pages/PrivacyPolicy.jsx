import React from 'react'
import { Link } from 'react-router-dom'
import { Mail } from 'lucide-react'

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-white text-gray-800">
      <main className="pt-32 container mx-auto px-4 py-16 max-w-4xl">
        <h1 className="text-4xl font-bold mb-10 text-center text-green-700">Privacy Policy</h1>
        <div className="space-y-8 text-base leading-7">
          <p>
            This Privacy Policy describes how <strong>99 Partners</strong> collects, uses, and discloses your personal
            information when you visit our website <strong>99partners.in</strong>.
          </p>

          <section>
            <h2 className="text-2xl font-semibold text-green-700 mb-2">Information We Collect</h2>
            <ul className="list-disc list-inside space-y-1 text-gray-700">
              <li>
                <strong>Personal Information:</strong> Name, email, phone, etc.
              </li>
              <li>
                <strong>Usage Data:</strong> IP address, browser type, pages visited, etc.
              </li>
              <li>
                <strong>Cookies:</strong> Used to track preferences and enhance performance.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-green-700 mb-2">How We Use Your Information</h2>
            <ul className="list-disc list-inside space-y-1 text-gray-700">
              <li>To improve our website and services</li>
              <li>To notify you about updates or changes</li>
              <li>To respond to customer inquiries</li>
              <li>For website analytics and performance tracking</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-green-700 mb-2">Disclosure of Data</h2>
            <p className="text-gray-700">
              We may disclose your personal information if required by law or to protect our legal rights.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-green-700 mb-2">Security of Data</h2>
            <p className="text-gray-700">
              We implement appropriate technical and organizational measures to safeguard your data, but no method of
              transmission over the internet is 100% secure.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-green-700 mb-2">Changes to This Policy</h2>
            <p className="text-gray-700">
              We may update this privacy policy from time to time. Last updated on <strong>20th June 2025</strong>.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-green-700 mb-2">Contact Us</h2>
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

export default PrivacyPolicy








