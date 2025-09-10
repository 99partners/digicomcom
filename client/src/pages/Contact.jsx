import React, { useState, useEffect } from 'react';
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  MessageCircle,
  Loader2,
} from 'lucide-react';
import axios from 'axios';
import { getApiUrl } from '../config/api.config';
import { Helmet } from 'react-helmet';

const Contact = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [supportForm, setSupportForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const validatePhoneNumber = (phone) => {
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(phone);
  };

  const handleKeyDown = (e) => {
    const allowedKeys = ["Backspace", "ArrowLeft", "ArrowRight", "Delete", "Tab"];
    const isNumber = /[0-9]/.test(e.key);
    if (e.target.value.length >= 10 && !allowedKeys.includes(e.key)) {
      e.preventDefault();
    }
    if (!isNumber && !allowedKeys.includes(e.key)) {
      e.preventDefault();
    }
  };

  const handleSupportSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    if (!validatePhoneNumber(supportForm.phone)) {
      setError("Please enter exactly 10 digits for the phone number.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(getApiUrl('api/contact/submit'), supportForm);
      
      if (response.data.success) {
        setSuccess("Your message has been sent successfully! We'll get back to you within 24 hours.");
        setSupportForm({ name: "", email: "", phone: "", message: "" });
      } else {
        setError(response.data.message || "Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error('Error submitting contact form:', error);
      setError(error.response?.data?.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const offices = [
    {
      city: "Ahmedabad",
      address: "E 608, Titanium City Center, Satellite, Ahmedabad, 380015",
      email: "ahmedabad@99partners.com",
      mapLink: "https://maps.google.com/?q=Titanium+City+Center,+Satellite,+Ahmedabad,+380015",
    },
    {
      city: "USA",
      address: "8 The Green STE B, Dover, Delaware 19901",
      email: "dover@99partners.com",
      mapLink: "https://maps.google.com/?q=8+The+Green+STE+B,+Dover,+Delaware+19901",
    },
    {
      city: "Sydney",
      address: "Level 13/50 Carrington Street, Sydney, NSW, Australia, 2000",
      email: "sydney@99partners.com",
      mapLink: "https://maps.google.com/?q=Level+13/50+Carrington+Street,+Sydney,+NSW,+Australia,+2000",
    },
    {
      city: "Bhavnagar",
      address: "306, Aristo Complex, Waghawadi Road, Bhavnagar-364001, Gujarat, India",
      email: "bhavnagar@99partners.com",
      mapLink: "https://maps.app.goo.gl/Wq8ACCPD6HafkqFh8",
    },
  ];

  const contactLd = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact 99Digicom",
    url: "https://99digicom.com/contact_us",
    description: "Get in touch with 99Digicom for support and inquiries.",
    contactPoint: [
      { "@type": "ContactPoint", email: "ahmedabad@99partners.com", contactType: "customer support" },
      { "@type": "ContactPoint", email: "dover@99partners.com", contactType: "customer support" },
      { "@type": "ContactPoint", email: "sydney@99partners.com", contactType: "customer support" },
      { "@type": "ContactPoint", email: "bhavnagar@99partners.com", contactType: "customer support" }
    ]
  };

  return (
    <main id="main-content" className="min-h-screen bg-gradient-to-br from-green-50 to-white">
      <Helmet>
        <title>Contact Us | 99Digicom</title>
        <meta name="description" content="Get in touch with 99Digicom for support and inquiries. Visit our offices or send us a message." />
        <link rel="canonical" href="https://99digicom.com/contact_us" />
        <meta name="robots" content="noindex, nofollow" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Contact Us | 99Digicom" />
        <meta property="og:description" content="Reach out to 99Digicom for support and inquiries." />
        <meta property="og:url" content="https://99digicom.com/contact_us" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Contact Us | 99Digicom" />
        <meta name="twitter:description" content="Reach out to 99Digicom for support and inquiries." />
        <script type="application/ld+json">{JSON.stringify(contactLd)}</script>
      </Helmet>
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 bg-white text-center">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 sm:mb-3 md:-mb-6">
            Get in <span className="text-green-600">Touch</span>
          </h1>
        </div>
      </section>

      {/* Company Contact Card */}
      <section className="py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8 md:p-10">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">
                99 Partners Digicom Private Limited
              </h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 sm:h-6 w-5 sm:w-6 text-green-600 flex-shrink-0 mt-0.5" />
                  <a
                    href="https://maps.app.goo.gl/Wq8ACCPD6HafkqFh8"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-green-800 transition-colors text-sm sm:text-base hover:underline"
                  >
                    306, Aristo Complex, Waghawadi Road, Bhavnagar-364001, Gujarat, India
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-5 sm:h-6 w-5 sm:w-6 text-green-600 flex-shrink-0" />
                  <a
                    href="tel:+916352653306"
                    className="text-gray-600 hover:text-green-800 transition-colors text-sm sm:text-base hover:underline"
                  >
                    +91 6352 653306
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="h-5 sm:h-6 w-5 sm:w-6 text-green-600 flex-shrink-0" />
                  <a
                    href="mailto:99partners.in@gmail.com"
                    className="text-gray-600 hover:text-green-800 transition-colors text-sm sm:text-base hover:underline"
                  >
                    99partners.in@gmail.com
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Customer Support Form */}
      <section className="py-12 sm:py-16 md:py-20 px-4 -mt-20">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="bg-gradient-to-r from-green-600 to-green-700 px-4 sm:px-6 py-4 sm:py-6">
                <div className="flex items-center justify-center sm:justify-start">
                  <MessageCircle className="h-5 sm:h-6 md:h-7 w-5 sm:w-6 md:w-7 text-white mr-2 sm:mr-3" />
                  <h2 className="text-2xl sm:text-3xl md:text-3xl font-bold text-white">
                    Need Help?
                  </h2>
                </div>
                <p className="text-green-100 text-sm sm:text-base md:text-lg mt-2 sm:mt-3 text-center sm:text-left">
                  Have questions or need support? Our team is here to assist you with any inquiries.
                </p>
              </div>

              <div className="p-4 sm:p-6 md:p-8">
                {error && (
                  <div className="mb-4 sm:mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm sm:text-base" role="alert" aria-live="assertive">
                    {error}
                  </div>
                )}
                {success && (
                  <div className="mb-4 sm:mb-6 p-4 bg-green-50 border border-green-200 text-green-700 rounded-lg text-sm sm:text-base" role="status" aria-live="polite">
                    {success}
                  </div>
                )}

                <form onSubmit={handleSupportSubmit} className="space-y-6">
                  <div>
                    <label
                      htmlFor="support-name"
                      className="block text-sm sm:text-base font-medium text-gray-700 mb-2"
                    >
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="support-name"
                      required
                      value={supportForm.name}
                      onChange={(e) =>
                        setSupportForm({ ...supportForm, name: e.target.value })
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all text-sm sm:text-base"
                      placeholder="Enter your full name"
                      autoComplete="name"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="support-email"
                      className="block text-sm sm:text-base font-medium text-gray-700 mb-2"
                    >
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="support-email"
                      required
                      value={supportForm.email}
                      onChange={(e) =>
                        setSupportForm({ ...supportForm, email: e.target.value })
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all text-sm sm:text-base"
                      placeholder="Enter your email address"
                      autoComplete="email"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="support-phone"
                      className="block text-sm sm:text-base font-medium text-gray-700 mb-2"
                    >
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      id="support-phone"
                      required
                      value={supportForm.phone}
                      onChange={(e) =>
                        setSupportForm({ ...supportForm, phone: e.target.value })
                      }
                      onKeyDown={handleKeyDown}
                      maxLength="10"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all text-sm sm:text-base"
                      placeholder="Enter 10-digit phone number"
                      autoComplete="tel"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="support-message"
                      className="block text-sm sm:text-base font-medium text-gray-700 mb-2"
                    >
                      Message *
                    </label>
                    <textarea
                      id="support-message"
                      rows={4}
                      required
                      value={supportForm.message}
                      onChange={(e) =>
                        setSupportForm({ ...supportForm, message: e.target.value })
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all text-sm sm:text-base resize-none"
                      placeholder="Describe your question or issue in detail"
                      autoComplete="off"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className={`w-full inline-flex items-center justify-center px-6 py-3 text-sm sm:text-base font-medium rounded-lg transition-all duration-200 ${
                      loading
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-green-600 hover:bg-green-700 hover:shadow-lg'
                    } text-white`}
                  >
                    {loading ? (
                      <>
                        <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="h-5 w-5 mr-2" />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Office Locations */}
      <section className="py-12 sm:py-16 md:py-20 px-4 bg-green-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 sm:mb-10 md:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">
              Visit Our Offices
            </h2>
            <p className="text-base sm:text-lg md:text-lg text-gray-600 max-w-2xl mx-auto">
              Meet our team in person at our office locations around the world.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-10">
            {offices.map((office, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow p-4 sm:p-6"
              >
                <div className="flex items-center mb-2 sm:mb-4">
                  <div className="w-10 sm:w-12 md:w-14 h-10 sm:h-12 md:h-14 bg-green-100 rounded-full flex items-center justify-center mr-2 sm:mr-3">
                    <MapPin className="h-5 sm:h-6 md:h-7 w-5 sm:w-6 md:w-7 text-green-600" />
                  </div>
                  <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-900">
                    {office.city}
                  </h3>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="h-4 sm:h-5 w-4 sm:w-5 text-gray-600 mt-0.5 flex-shrink-0" />
                    <a
                      href={office.mapLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-green-600 hover:text-green-800 transition-colors text-sm sm:text-base hover:underline"
                    >
                      {office.address}
                    </a>
                  </div>

                  <div className="flex items-center gap-3">
                    <Mail className="h-4 sm:h-5 w-4 sm:w-5 text-gray-600 flex-shrink-0" />
                    <a
                      href={`mailto:${office.email}`}
                      className="text-green-600 hover:text-green-800 transition-colors text-sm sm:text-base hover:underline"
                    >
                      {office.email}
                    </a>
                  </div>

                  <div className="flex items-center gap-3">
                    <Clock className="h-4 sm:h-5 w-4 sm:w-5 text-gray-600 flex-shrink-0" />
                    <span className="text-gray-600 text-sm sm:text-base">
                      Monday - Friday, 9:00 AM - 6:00 PM
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Contact;