import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, MessageCircle, Users, CheckCircle } from 'lucide-react';

const Contact = () => {
  const [partnerForm, setPartnerForm] = useState({
    name: '',
    email: '',
    businessName: '',
    message: ''
  });

  const [supportForm, setSupportForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handlePartnerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Partner inquiry:', partnerForm);
    // Handle form submission
    alert('Thank you for your interest! We\'ll get back to you within 24 hours.');
    setPartnerForm({ name: '', email: '', businessName: '', message: '' });
  };

  const handleSupportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Support request:', supportForm);
    // Handle form submission
    alert('Your support request has been submitted. We\'ll respond soon!');
    setSupportForm({ name: '', email: '', subject: '', message: '' });
  };

  const offices = [
    {
      city: 'Mumbai',
      address: '123 Digital Hub, Andheri East, Mumbai, India',
      phone: '+91 123 456 7890',
      email: 'mumbai@99digicom.com'
    },
    {
      city: 'Bengaluru',
      address: '456 Tech Park, Whitefield, Bengaluru, India',
      phone: '+91 987 654 3210',
      email: 'bengaluru@99digicom.com'
    }
  ];

  const contactMethods = [
    {
      icon: Mail,
      title: 'Email Support',
      value: 'support@99digicom.com',
      description: 'For general inquiries and support'
    },
    {
      icon: Phone,
      title: 'Phone Support',
      value: '+91 123 456 7890',
      description: 'Monday to Friday, 9 AM - 6 PM IST'
    },
    {
      icon: MessageCircle,
      title: 'Live Chat',
      value: 'Available 9 AM–6 PM IST',
      description: 'Instant support via our website'
    }
  ];

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-blue-600 to-purple-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold mb-6">Get in Touch</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Ready to transform your business? Have questions about our services? We're here to help you succeed.
          </p>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {contactMethods.map((method, index) => {
              const IconComponent = method.icon;
              return (
                <div key={index} className="text-center p-6 bg-gray-50 rounded-xl hover:bg-blue-50 transition-colors group">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-200 transition-colors">
                    <IconComponent className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{method.title}</h3>
                  <p className="text-xl font-bold text-blue-600 mb-2">{method.value}</p>
                  <p className="text-gray-600">{method.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Forms Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Partner Inquiry Form */}
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <div className="flex items-center mb-6">
                <Users className="h-8 w-8 text-blue-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900">Partner with Us</h2>
              </div>
              <p className="text-gray-600 mb-6">
                Ready to join our ecosystem? Fill out the form, and we'll get back to you within 24 hours.
              </p>
              
              <form onSubmit={handlePartnerSubmit} className="space-y-6">
                <div>
                  <label htmlFor="partner-name" className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="partner-name"
                    required
                    value={partnerForm.name}
                    onChange={(e) => setPartnerForm({ ...partnerForm, name: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your full name"
                  />
                </div>
                
                <div>
                  <label htmlFor="partner-email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="partner-email"
                    required
                    value={partnerForm.email}
                    onChange={(e) => setPartnerForm({ ...partnerForm, email: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your email address"
                  />
                </div>
                
                <div>
                  <label htmlFor="business-name" className="block text-sm font-medium text-gray-700 mb-2">
                    Business Name *
                  </label>
                  <input
                    type="text"
                    id="business-name"
                    required
                    value={partnerForm.businessName}
                    onChange={(e) => setPartnerForm({ ...partnerForm, businessName: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your business name"
                  />
                </div>
                
                <div>
                  <label htmlFor="partner-message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message
                  </label>
                  <textarea
                    id="partner-message"
                    rows={4}
                    value={partnerForm.message}
                    onChange={(e) => setPartnerForm({ ...partnerForm, message: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Tell us about your business and partnership goals"
                  />
                </div>
                
                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  <Send className="h-5 w-5 mr-2" />
                  Submit Inquiry
                </button>
              </form>
            </div>

            {/* Customer Support Form */}
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <div className="flex items-center mb-6">
                <MessageCircle className="h-8 w-8 text-green-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900">Need Help?</h2>
              </div>
              <p className="text-gray-600 mb-6">
                Have questions or need support? Our team is here to assist you with any inquiries.
              </p>
              
              <form onSubmit={handleSupportSubmit} className="space-y-6">
                <div>
                  <label htmlFor="support-name" className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="support-name"
                    required
                    value={supportForm.name}
                    onChange={(e) => setSupportForm({ ...supportForm, name: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Enter your full name"
                  />
                </div>
                
                <div>
                  <label htmlFor="support-email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="support-email"
                    required
                    value={supportForm.email}
                    onChange={(e) => setSupportForm({ ...supportForm, email: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Enter your email address"
                  />
                </div>
                
                <div>
                  <label htmlFor="support-subject" className="block text-sm font-medium text-gray-700 mb-2">
                    Subject *
                  </label>
                  <select
                    id="support-subject"
                    required
                    value={supportForm.subject}
                    onChange={(e) => setSupportForm({ ...supportForm, subject: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value="">Select a subject</option>
                    <option value="Technical Support">Technical Support</option>
                    <option value="Billing Inquiry">Billing Inquiry</option>
                    <option value="Product Information">Product Information</option>
                    <option value="Partnership Question">Partnership Question</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="support-message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="support-message"
                    rows={4}
                    required
                    value={supportForm.message}
                    onChange={(e) => setSupportForm({ ...supportForm, message: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Describe your question or issue in detail"
                  />
                </div>
                
                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  <Send className="h-5 w-5 mr-2" />
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Office Locations */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Visit Our Offices</h2>
            <p className="text-xl text-gray-600">Meet our team in person at our office locations across India.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {offices.map((office, index) => (
              <div key={index} className="bg-gray-50 p-8 rounded-xl hover:bg-blue-50 transition-colors group">
                <div className="flex items-center mb-4">
                  <MapPin className="h-6 w-6 text-blue-600 mr-2" />
                  <h3 className="text-xl font-bold text-gray-900">{office.city} Office</h3>
                </div>
                
                <div className="space-y-3">
                  <p className="text-gray-600">{office.address}</p>
                  
                  <div className="flex items-center">
                    <Phone className="h-4 w-4 text-gray-400 mr-2" />
                    <a href={`tel:${office.phone}`} className="text-blue-600 hover:text-blue-800 transition-colors">
                      {office.phone}
                    </a>
                  </div>
                  
                  <div className="flex items-center">
                    <Mail className="h-4 w-4 text-gray-400 mr-2" />
                    <a href={`mailto:${office.email}`} className="text-blue-600 hover:text-blue-800 transition-colors">
                      {office.email}
                    </a>
                  </div>
                  
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 text-gray-400 mr-2" />
                    <span className="text-gray-600">Monday - Friday, 9:00 AM - 6:00 PM</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Response Time Promise */}
      <section className="py-16 bg-gradient-to-r from-green-500 to-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center mb-6">
            <CheckCircle className="h-12 w-12 mr-4" />
            <h2 className="text-3xl font-bold">Our Response Promise</h2>
          </div>
          <p className="text-xl mb-4">
            We're committed to providing exceptional support and quick responses to all inquiries.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
            <div>
              <div className="text-3xl font-bold mb-2">24 Hours</div>
              <div className="text-lg">Partner Inquiries</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">2 Hours</div>
              <div className="text-lg">Support Requests</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">Instant</div>
              <div className="text-lg">Live Chat Support</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;