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
import { API_CONFIG } from "../config/api.config";

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
      setError("Please enter an email address");
      setIsLoading(false);
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        `${API_CONFIG.baseUrl}/api/newsletter`,
        { email },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.success) {
        setIsSubmitted(true);
        setEmail("");
        setError(null);
      } else {
        setError(
          response.data.message || "Failed to subscribe. Please try again."
        );
      }
    } catch (err) {
      console.error("Newsletter subscription error:", err.message);
      setError(
        err.response?.data?.message || "Failed to subscribe. Please try again."
      );
      setIsSubmitted(false);
    } finally {
      setIsLoading(false);
    }
  };

  const quickLinks = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about" },
    { name: "Shop", path: "/shop" },
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
    { name: "FAQs", path: "/faqss" },
  ];

  const socialLinks = [
    {
      icon: Linkedin,
      url: "https://www.linkedin.com/company/99-partners-digicom-private-limited/",
      label: "LinkedIn",
    },
    { icon: Twitter, url: "https://x.com/99_partners?t=E3xMTe3OeDRrm3eDysWzVQ&s=08", label: "X" },
    {
      icon: Instagram,
      url: "https://www.instagram.com/99partners_?igsh=Njhlbmh5NTdkMWt2",
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
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white" role="contentinfo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-10 lg:py-12">
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8 lg:gap-10">
          {/* Left Column */}
          <div className="space-y-6">
            <div className="flex items-center space-x-2 group">
              <Link to="/" aria-label="99Digicom - Home">
                <img
                  src={logo || "/placeholder.svg"}
                  alt="99Digicom Logo"
                  className="h-12 w-auto object-contain sm:h-16"
                  width="64"
                  height="64"
                  loading="lazy"
                />
              </Link>
              <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-green-600 to-green-500 bg-clip-text text-transparent group-hover:from-green-500 group-hover:to-green-600">
                Digicom
              </span>
            </div>
            <p className="text-xs sm:text-sm text-gray-400 max-w-md">
              Setup, Manage, Advertise, and Co-Brand across all Top marketplaces.
            </p>

            <div className="text-xs sm:text-sm text-gray-400 space-y-3">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400" aria-hidden="true" />
                <a
                  href="mailto:support@99digicom.com"
                  className="hover:text-white transition-colors"
                  aria-label="Email us at support@99digicom.com"
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
                    aria-label={`Visit our office in ${address.details}`}
                  >
                    <MapPin className="w-4 h-4 text-red-400" aria-hidden="true" />
                    <span className="truncate">{address.details}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="flex flex-col sm:grid sm:grid-cols-2 gap-6 sm:gap-8">
            <div className="space-y-6">
              <nav aria-label="Quick links">
                <p className="text-base sm:text-lg font-semibold border-b border-gray-600 pb-2 mb-4">
                  Quick Links
                </p>
                <ul className="space-y-2 text-xs sm:text-sm text-gray-300">
                  {quickLinks.map((link, i) => (
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
              </nav>
              <div>
                <p className="text-base sm:text-lg font-semibold border-b border-gray-600 pb-2 mb-4">
                  Our Domains
                </p>
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
              <nav aria-label="Help and support">
                <p className="text-base sm:text-lg font-semibold border-b border-gray-600 pb-2 mb-4">
                  Help & Support
                </p>
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
              </nav>

              <div className="space-y-4">
                <p className="text-base sm:text-lg font-semibold border-b border-gray-600 pb-2 mb-4">
                  Stay Connected
                </p>
                <p className="text-xs sm:text-sm text-gray-300">
                  Subscribe to our newsletter for updates on new partnerships and opportunities.
                </p>

                <form onSubmit={handleSubmit} className="space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 w-full">
                    <label className="sr-only" htmlFor="newsletter-email">
                      Email address
                    </label>
                    <input
                      type="email"
                      id="newsletter-email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-xs sm:text-sm text-white placeholder-gray-500 focus:ring-2 focus:ring-green-500 transition-colors"
                      aria-label="Email address for newsletter"
                      aria-invalid={error ? "true" : "false"}
                      aria-describedby={error ? "newsletter-error" : undefined}
                    />
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full sm:w-auto px-4 py-2 bg-green-600 text-white text-xs sm:text-sm rounded-md hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      aria-label="Subscribe to newsletter"
                    >
                      {isLoading ? "Subscribing..." : "Subscribe"}
                    </button>
                  </div>

                  {isSubmitted && !error && (
                    <p className="text-green-400 text-xs sm:text-sm mt-1" role="status">
                      Subscribed successfully!
                    </p>
                  )}

                  {error && (
                    <p 
                      id="newsletter-error" 
                      className="text-red-400 text-xs sm:text-sm mt-1" 
                      role="alert"
                    >
                      {error}
                    </p>
                  )}
                </form>

                <div>
                  <p className="text-sm font-semibold mb-2">Follow Us</p>
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
                        <Icon className="w-4 h-4 text-white" aria-hidden="true" />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-700 text-center text-xs sm:text-sm text-gray-400">
          <p>©️ {currentYear} 99digicom.com. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;