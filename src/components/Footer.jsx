import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Globe, Twitter, Linkedin, Instagram, Mail } from 'lucide-react';

const Footer = () => {
  const [email, setEmail] = useState('');
  const location = useLocation();

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    // Handle newsletter signup
    console.log('Newsletter signup:', email);
    setEmail('');
  };

  // Don't show footer on login page
  if (location.pathname === '/login') {
    return null;
  }

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Newsletter Section */}
        <div className="mb-12 text-center">
          <h3 className="text-2xl font-bold mb-4">Stay Updated</h3>
          <p className="text-gray-300 mb-6">Get the latest on digital commerce trends and exclusive offers.</p>
          <form onSubmit={handleNewsletterSubmit} className="max-w-md mx-auto flex">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 px-4 py-3 rounded-l-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <button
              type="submit"
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-r-lg font-medium transition-colors"
            >
              Subscribe
            </button>
          </form>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <Globe className="h-8 w-8 text-blue-400" />
              <span className="text-xl font-bold">99digicom.com</span>
            </Link>
            <p className="text-gray-300 mb-4">
              Empowering businesses in the digital commerce era with innovative solutions and strategic partnerships.
            </p>
            <div className="flex space-x-4">
              <a href="https://twitter.com/99digicom" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="https://linkedin.com/company/99digicom" className="text-gray-400 hover:text-white transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="https://instagram.com/99digicom" className="text-gray-400 hover:text-white transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-300 hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/about" className="text-gray-300 hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/services" className="text-gray-300 hover:text-white transition-colors">Services</Link></li>
              <li><Link to="/partners" className="text-gray-300 hover:text-white transition-colors">Partners</Link></li>
            </ul>
          </div>

          {/* More Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">More</h4>
            <ul className="space-y-2">
              <li><Link to="/shop" className="text-gray-300 hover:text-white transition-colors">Shop</Link></li>
              <li><Link to="/resources" className="text-gray-300 hover:text-white transition-colors">Resources</Link></li>
              <li><Link to="/careers" className="text-gray-300 hover:text-white transition-colors">Careers</Link></li>
              <li><Link to="/contact" className="text-gray-300 hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <div className="space-y-2 text-gray-300">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <a href="mailto:support@99digicom.com" className="hover:text-white transition-colors">
                  support@99digicom.com
                </a>
              </div>
              <p>Phone: +91 123 456 7890</p>
              <p>Live Chat: 9 AM–6 PM IST</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-800 text-center text-gray-400">
          <p>&copy; 2025 99digicom.com. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;