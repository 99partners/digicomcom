"use client";

import { useState } from "react";
import axios from "axios";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  MessageCircle,
  Users,
  CheckCircle,
} from "lucide-react";

import { useEffect } from "react";
const Contact = () => {
  // Scroll to top on component mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [partnerForm, setPartnerForm] = useState({
    name: "",
    email: "",
    businessName: "",
    message: "",
  });

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
    // Ensure exactly 10 digits
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(phone);
  };

  const handleKeyDown = (e) => {
    // Allow numbers and control keys (e.g., Backspace, Arrow keys, Delete, Tab)
    const allowedKeys = [
      "Backspace",
      "ArrowLeft",
      "ArrowRight",
      "Delete",
      "Tab",
    ];
    const isNumber = /[0-9]/.test(e.key);
    // Prevent input if 10 digits are already entered
    if (e.target.value.length >= 10 && !allowedKeys.includes(e.key)) {
      e.preventDefault();
    }
    // Block non-numeric keys
    if (!isNumber && !allowedKeys.includes(e.key)) {
      e.preventDefault();
    }
  };

  const handlePartnerSubmit = (e) => {
    e.preventDefault();
    console.log("Partner inquiry:", partnerForm);
    alert(
      "Thank you for your interest! We'll get back to you within 24 hours."
    );
    setPartnerForm({ name: "", email: "", businessName: "", message: "" });
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
      const response = await axios.post('http://localhost:5050/api/contact/submit', {
        name: supportForm.name,
        email: supportForm.email,
        phone: supportForm.phone,
        message: supportForm.message
      });

      if (response.data.success) {
        setSuccess("Your message has been sent successfully!");
        setSupportForm({ name: "", email: "", phone: "", message: "" });
      }
    } catch (error) {
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
      mapLink:
        "https://maps.google.com/?q=Titanium+City+Center,+Satellite,+Ahmedabad,+380015",
    },
    {
      city: "Dover",
      address: "8 The Green STE B, Dover, Delaware 19901",
      email: "dover@99partners.com",
      mapLink:
        "https://maps.google.com/?q=8+The+Green+STE+B,+Dover,+Delaware+19901",
    },
    {
      city: "Sydney",
      address: "Level 13/50 Carrington Street, Sydney, NSW, Australia, 2000",
      email: "sydney@99partners.com",
      mapLink:
        "https://maps.google.com/?q=Level+13/50+Carrington+Street,+Sydney,+NSW,+Australia,+2000",
    },
    {
      city: "Bhavnagar",
      address:
        "306, Aristo Complex, Waghawadi Road, Bhavnagar-364001, Gujarat, India",
      email: "bhavnagar@99partners.com",
      mapLink: "https://maps.app.goo.gl/Wq8ACCPD6HafkqFh8",
    },
  ];

  const contactMethods = [
    {
      icon: Mail,
      title: "Email Support",
      value: "support@99digicom.com",
      description: "For general inquiries and support",
    },
    {
      icon: Phone,
      title: "Phone Support",
      value: "+91 123 456 7890",
      description: "Monday to Friday, 9 AM - 6 PM IST",
    },
    {
      icon: MessageCircle,
      title: "Live Chat",
      value: "Available 9 AM–6 PM IST",
      description: "Instant support via our website",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white">
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Get in Touch
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Ready to transform your business? Have questions about our services?
            We're here to help you succeed.
          </p>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-16 px-4 bg-green-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {contactMethods.map((method, index) => {
              const IconComponent = method.icon;
              return (
                <div
                  key={index}
                  className="text-center p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow"
                >
                  <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4 hover:bg-green-100 transition-colors">
                    <IconComponent className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {method.title}
                  </h3>
                  <p className="text-xl font-bold text-green-600 mb-2">
                    {method.value}
                  </p>
                  <p className="text-gray-600 text-sm">{method.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Customer Support Form */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto flex justify-center">
          <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-2xl">
            <div className="flex items-center mb-6">
              <MessageCircle className="h-8 w-8 text-green-600 mr-3" />
              <h2 className="text-2xl font-bold text-gray-900">Need Help?</h2>
            </div>
            <p className="text-gray-600 text-sm mb-6">
              Have questions or need support? Our team is here to assist you
              with any inquiries.
            </p>
            {error && (
              <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
                {error}
              </div>
            )}
            {success && (
              <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-lg">
                {success}
              </div>
            )}
            <form onSubmit={handleSupportSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="support-name"
                  className="block text-sm font-medium text-gray-700 mb-2"
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
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                  placeholder="Enter your full name"
                />
              </div>
              <div>
                <label
                  htmlFor="support-email"
                  className="block text-sm font-medium text-gray-700 mb-2"
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
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                  placeholder="Enter your email address"
                />
              </div>
              <div>
                <label
                  htmlFor="support-phone"
                  className="block text-sm font-medium text-gray-700 mb-2"
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
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                  placeholder="Enter 10-digit phone number"
                />
              </div>
              <div>
                <label
                  htmlFor="support-message"
                  className="block text-sm font-medium text-gray-700 mb-2"
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
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                  placeholder="Describe your question or issue in detail"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className={`w-full inline-flex items-center justify-center px-6 py-3 ${
                  loading ? 'bg-gray-400' : 'bg-green-600 hover:bg-green-700'
                } text-white font-medium rounded-lg transition-colors`}
              >
                {loading ? (
                  'Sending...'
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
      </section>

      {/* Office Locations */}
      <section className="py-16 px-4 bg-green-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Visit Our Offices
            </h2>
            <p className="text-lg text-gray-600">
              Meet our team in person at our office locations across India.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {offices.map((office, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow p-6"
              >
                <div className="flex items-center mb-4">
                  <MapPin className="h-6 w-6 text-green-600 mr-2" />
                  <h3 className="text-xl font-bold text-gray-900">
                    {office.city} Office
                  </h3>
                </div>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <MapPin className="h-4 w-4 text-gray-600 mr-2 mt-0.5" />
                    <a
                      href={office.mapLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-green-600 hover:text-green-800 transition-colors text-sm"
                    >
                      {office.address}
                    </a>
                  </div>
                  <div className="flex items-center">
                    <Mail className="h-4 w-4 text-gray-600 mr-2" />
                    <a
                      href={`mailto:${office.email}`}
                      className="text-green-600 hover:text-green-800 transition-colors"
                    >
                      {office.email}
                    </a>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 text-gray-600 mr-2" />
                    <span className="text-gray-600 text-sm">
                      Monday - Friday, 9:00 AM - 6:00 PM
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact