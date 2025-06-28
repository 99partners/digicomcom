import React from 'react';
import { Link } from 'react-router-dom';

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-purple-50 dark:from-gray-900 dark:via-black dark:to-gray-900 text-gray-900 dark:text-white">
      <main className="pt-32 container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-8 text-center">Terms of Service</h1>
        <div className="prose lg:prose-lg mx-auto">
          <p>
            Welcome to 99partners.in! These Terms govern your use of our website and services.
          </p>
          <h2>Accounts</h2>
          <p>
            You must provide accurate info. You're responsible for your password and account activity.
          </p>

          <h2>Intellectual Property</h2>
          <p>
            All content is owned by 99 Partners and protected by law.
          </p>

          <h2>Links to Other Sites</h2>
          <p>
            We are not responsible for third-party sites linked on our service.
          </p>

          <h2>Termination</h2>
          <p>
            We may suspend or terminate your access for any violation.
          </p>

          <h2>Governing Law</h2>
          <p>
            Governed by Maharashtra, India laws.
          </p>

          <h2>Changes</h2>
          <p>
            We may revise Terms at any time. Last updated on 20th June 2025.
          </p>

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

export default TermsOfService;
