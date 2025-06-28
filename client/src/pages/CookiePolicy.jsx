import React from 'react';
import { Link } from 'react-router-dom';

const CookiePolicy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-purple-50 dark:from-gray-900 dark:via-black dark:to-gray-900 text-gray-900 dark:text-white">
      <main className="pt-32 container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-8 text-center">Cookie Policy</h1>
        <div className="prose lg:prose-lg mx-auto">
          <p>
            This Cookie Policy explains what cookies are, how we use them, and your choices.
          </p>

          <h2>What are Cookies?</h2>
          <p>
            Small files stored on your browser to recognize you and enhance your experience.
          </p>

          <h2>How We Use Cookies</h2>
          <ul>
            <li>Enable features</li>
            <li>Provide analytics</li>
            <li>Store preferences</li>
            <li>Show personalized ads</li>
          </ul>

          <h2>Types of Cookies</h2>
          <ul>
            <li><strong>Essential:</strong> For login/authentication</li>
            <li><strong>Analytics:</strong> Track usage and performance</li>
          </ul>

          <h2>Third-party Cookies</h2>
          <p>Used for reporting and ad delivery (e.g. Google Analytics).</p>

          <h2>Your Choices</h2>
          <p>You can delete or block cookies from your browser settings.</p>

          <h2>More Info</h2>
          <ul>
            <li><a href="http://www.allaboutcookies.org/" target="_blank" rel="noopener noreferrer">AllAboutCookies</a></li>
            <li><a href="http://www.networkadvertising.org/" target="_blank" rel="noopener noreferrer">Network Advertising Initiative</a></li>
          </ul>

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

export default CookiePolicy;
