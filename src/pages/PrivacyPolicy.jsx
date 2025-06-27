import React from 'react';
import { Link } from 'react-router-dom';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-purple-50 dark:from-gray-900 dark:via-black dark:to-gray-900 text-gray-900 dark:text-white">
      <main className="pt-32 container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-8 text-center">Privacy Policy</h1>
        <div className="prose lg:prose-lg mx-auto">
          <p>
            This Privacy Policy describes how 99 Partners collects, uses, and discloses your personal information when you visit our website 99partners.in.
          </p>
          <h2>Information We Collect</h2>
          <ul>
            <li><strong>Personal Information:</strong> Name, email, phone, etc.</li>
            <li><strong>Usage Data:</strong> IP, browser, pages visited, etc.</li>
            <li><strong>Cookies:</strong> To track preferences and performance.</li>
          </ul>
          <h2>How We Use Your Information</h2>
          <ul>
            <li>To improve our site and services</li>
            <li>To notify you of updates</li>
            <li>To respond to inquiries</li>
            <li>For analytics</li>
          </ul>
          <h2>Disclosure of Data</h2>
          <p>We may disclose personal info to comply with law or protect our rights.</p>

          <h2>Security of Data</h2>
          <p>We implement safeguards but cannot guarantee 100% security.</p>

          <h2>Changes</h2>
          <p>This policy may be updated from time to time. Last updated on 20th June 2025.</p>

          <h2>Contact Us</h2>
          <ul>
            <li>Email: hello@99partners.com</li>
            <li>Visit: <Link to="/contact" className="text-blue-600 dark:text-blue-400 hover:underline">Contact Us</Link></li>
          </ul>
        </div>
      </main>
    </div>
  );
};

export default PrivacyPolicy;
