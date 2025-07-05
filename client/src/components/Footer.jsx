import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Mail,
  MapPin,
  Linkedin,
  Instagram,
  Youtube,
  Twitter,
} from "lucide-react";
import { SiMedium } from "react-icons/si";
import logo from "../assets/99digicom.png";
import axios from "axios";

const API_URL = process.env.NODE_ENV === 'production' 
  ? 'https://api.99digicom.com' 
  : 'http://localhost:5050';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const location = useLocation();

  // Hide footer on login page
  if (location.pathname === "/login") return null;

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    // Validate email
    if (!email) {
      setError('Please enter an email address');
      setIsLoading(false);
      return;
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios({
        method: 'POST',
        url: `${API_URL}/api/newsletter`,
        data: { email },
        headers: {
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest'
        },
        withCredentials: true
      });

      if (response.status === 200) {
        setIsSubmitted(true);
        setEmail('');
        setError(null);
      }
    } catch (err) {
      console.error('Newsletter subscription error:', err);
      setError(err.response?.data?.message || 'Failed to subscribe. Please try again.');
      setIsSubmitted(false);
    } finally {
      setIsLoading(false);
    }
  };

  const quickLinks1 = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Product Partners", path: "/partners" },
  ];

  const quickLinks2 = [
    { name: "Shop", path: "/shop" },
    { name: "Resources", path: "/resources" },
    { name: "Careers", path: "/careers" },
    { name: "Contact Us", path: "/contact" },
  ];

  const domains = [
    { name: "99partners.in", url: "https://99partners.in" },
    { name: "99infosource.com", url: "https://99infosource.com" },
    { name: "99finserv.com", url: "https://99finserv.com" },
    { name: "harmonyhights.com", url: "https://harmonyhights.com" },
  ];

  const helpLinks = [
    { name: "Privacy Policy", path: "/privacypolicy" },
    { name: "Terms of Service", path: "/termsofservice" },
    { name: "Cookie Policy", path: "/cookiepolicy" },
    { name: "FAQs", path: "/faqs" },
  ];

  const socialLinks = [
    {
      icon: Linkedin,
      url: "https://linkedin.com/company/99digicom",
      label: "LinkedIn",
    },
    { icon: Twitter, url: "https://twitter.com/99digicom", label: "X" },
    {
      icon: Instagram,
      url: "https://instagram.com/99digicom",
      label: "Instagram",
    },
    {
      icon: Youtube,
      url: "https://www.youtube.com/@99Partners",
      label: "Youtube",
    },
    {
      icon: SiMedium,
      url: "https://medium.com/@99partners.in",
      label: "Medium",
    },
  ];

  const addresses = [
    {
      country: "India",
      details: "Ahmedabad, Gujarat, India",
      mapLink:
        "https://maps.google.com/?q=Titanium+City+Center,+Satellite,+Ahmedabad,+380015",
    },
    {
      country: "United States",
      details: "Dover, Delaware, USA",
      mapLink:
        "https://maps.google.com/?q=8+The+Green+STE+B,+Dover,+Delaware+19901",
    },
    {
      country: "Australia",
      details: "Sydney, NSW, Australia",
      mapLink:
        "https://maps.google.com/?q=Level+13/50+Carrington+Street,+Sydney,+NSW,+Australia,+2000",
    },
    {
      country: "India",
      details: "Bhavnagar, Gujarat, India",
      mapLink: "https://maps.app.goo.gl/Wq8ACCPD6HafkqFh8",
    },
  ];

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-10 lg:py-12">
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8 lg:gap-10">
          {/* Left Column */}
          <div className="space-y-6">
            <div className="flex items-center space-x-2 group">
              <img
                src={logo || "/placeholder.svg"}
                alt="Digicom Logo"
                className="h-12 w-auto object-contain sm:h-16"
              />
              <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-green-600 to-green-500 bg-clip-text text-transparent group-hover:from-green-500 group-hover:to-green-600">
                Digicom
              </span>
            </div>
            <p className="text-xs sm:text-sm text-gray-400 max-w-md">
              Empowering businesses in the digital commerce era with innovative
              solutions and strategic partnerships.
            </p>

            <div className="text-xs sm:text-sm text-gray-400 space-y-3">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400" />
                <a
                  href="mailto:support@99digicom.com"
                  className="hover:text-white transition-colors"
                >
                  support@99digicom.com
                </a>
              </div>
              <div className="grid gap-2">
                {addresses.map((address, i) => (
                  <a
                    key={i}
                    href={address.mapLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 hover:text-red-300 transition-colors text-gray-300 bg-gray-800/50 px-3 py-1.5 rounded-md text-xs sm:text-sm w-full sm:w-auto"
                  >
                    <MapPin className="w-4 h-4 text-red-400" />
                    <span className="truncate">{address.details}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="flex flex-col sm:grid sm:grid-cols-2 gap-6 sm:gap-8">
            <div className="space-y-6">
              <div>
                <h3 className="text-base sm:text-lg font-semibold border-b border-gray-600 pb-2 mb-4">
                  Quick Links
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <ul className="space-y-2 text-xs sm:text-sm text-gray-300">
                    {quickLinks1.map((link, i) => (
                      <li key={i}>
                        <Link
                          to={link.path}
                          className="hover:text-white transition-colors"
                        >
                          {link.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <ul className="space-y-2 text-xs sm:text-sm text-gray-300">
                    {quickLinks2.map((link, i) => (
                      <li key={i}>
                        <Link
                          to={link.path}
                          className="hover:text-white transition-colors"
                        >
                          {link.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-semibold border-b border-gray-600 pb-2 mb-4">
                  Our Domains
                </h3>
                <ul className="space-y-2 text-xs sm:text-sm text-gray-300">
                  {domains.map((domain, i) => (
                    <li key={i}>
                      <a
                        href={domain.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-blue-400 transition-colors"
                      >
                        {domain.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-base sm:text-lg font-semibold border-b border-gray-600 pb-2 mb-4">
                  Help & Support
                </h3>
                <ul className="space-y-2 text-xs sm:text-sm text-gray-300">
                  {helpLinks.map((link, i) => (
                    <li key={i}>
                      <Link
                        to={link.path}
                        className="hover:text-white transition-colors"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-4">
                <h3 className="text-base sm:text-lg font-semibold border-b border-gray-600 pb-2 mb-4">
                  Stay Connected
                </h3>
                <p className="text-xs sm:text-sm text-gray-300">
                  Subscribe to our newsletter for updates on new partnerships
                  and opportunities.
                </p>

                <div className="flex flex-col sm:flex-row sm:items-center gap-2 w-full">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-xs sm:text-sm text-white placeholder-gray-500 focus:ring-2 focus:ring-green-500 transition-colors"
                  />
                  <button
                    onClick={handleSubmit}
                    className="w-full sm:w-auto px-4 py-2 bg-green-600 text-white text-xs sm:text-sm rounded-md hover:bg-green-700 transition-colors"
                  >
                    Subscribe
                  </button>
                </div>

                {isSubmitted && (
                  <p className="text-green-400 text-xs sm:text-sm mt-1">
                    Subscribed successfully!
                  </p>
                )}

                {error && (
                  <p className="text-red-400 text-xs sm:text-sm mt-1">
                    {error}
                  </p>
                )}

                <div>
                  <h4 className="text-sm font-semibold mb-2">Follow Us</h4>
                  <div className="flex flex-wrap justify-center sm:justify-start gap-3">
                    {socialLinks.map(({ icon: Icon, url, label }, i) => (
                      <a
                        key={i}
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={label}
                        className="w-9 h-9 bg-gray-800 rounded-md flex items-center justify-center hover:bg-gradient-to-r hover:from-green-600 hover:to-green-500 transition-transform hover:scale-110"
                      >
                        <Icon className="w-4 h-4 text-white" />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-700 text-center text-xs sm:text-sm text-gray-400">
          © {currentYear} 99digicom.com. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;