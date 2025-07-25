import { useState, useEffect } from "react";
import {
  Handshake,
  CheckCircle,
  ArrowRight,
  Globe,
  Settings,
  Megaphone,
  Clock,
  DollarSign,
  BarChart3,
  Users,
  ShoppingCart,
} from "lucide-react";
import axios from 'axios';
import { getApiUrl } from '../config/api.config';
import { Helmet } from 'react-helmet';
import { Link } from "react-router-dom"; // Add this import

export default function ForProductPartners() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [formData, setFormData] = useState({
    brandName: "",
    contactPerson: "",
    email: "",
    phone: "",
    website: "",
    businessType: "",
    productCategories: [],
    platforms: [],
    marketingGoals: [],
    targetAudience: "",
    additionalNotes: "",
    consent: false,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(getApiUrl('api/partners/submit'), formData);
      const data = await response.data;
      if (data.success) {
        alert('Thank you for your submission! Our team will contact you shortly.');
        setFormData({
          brandName: "",
          contactPerson: "",
          email: "",
          phone: "",
          website: "",
          businessType: "",
          productCategories: [],
          platforms: [],
          marketingGoals: [],
          targetAudience: "",
          additionalNotes: "",
          consent: false,
        });
      } else {
        alert('Error submitting form: ' + data.message);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Error submitting form. Please try again.');
    }
  };

  const handleCheckboxChange = (field, value, checked) => {
    setFormData((prev) => ({
      ...prev,
      [field]: checked ? [...prev[field], value] : prev[field].filter((item) => item !== value),
    }));
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <>
      <Helmet>
        <title>Why Partner with 99digicom | Digital Commerce Solutions</title>
        <meta name="description" content="Partner with 99digicom to scale your brand across multiple e-commerce platforms. Get end-to-end support, strategic co-branding, and performance marketing expertise." />
        <meta name="keywords" content="e-commerce partnership, brand collaboration, digital commerce, multi-platform selling, ONDC partner" />
        <link rel="canonical" href="https://99digicom.com/why-partners" />
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "Service",
              "name": "99digicom Partner Program",
              "provider": {
                "@type": "Organization",
                "name": "99digicom"
              },
              "description": "End-to-end digital commerce enablement and marketing services for product partners",
              "serviceType": "E-commerce Partnership",
              "offers": {
                "@type": "Offer",
                "description": "Multi-platform presence on ONDC, Amazon, Flipkart, Meesho, Jiomart, Swiggy, and Zomato"
              }
            }
          `}
        </script>
      </Helmet>

      <main className="min-h-screen bg-gradient-to-br from-green-50 to-white">
        {/* Hero Section */}
        <section aria-labelledby="hero-heading" className="pt-20 pb-12 px-4 sm:pt-24 sm:pb-16 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center">
            <div className="inline-flex items-center space-x-2 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium mb-6" role="text">
              <Handshake className="h-4 w-4" aria-hidden="true" />
              <span>For Product Partners</span>
            </div>
            <h1 id="hero-heading" className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Why Partner with <span className="text-green-600">99digicom?</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              We don't just offer a platform — we build partnerships to help your brand thrive in India's digital commerce landscape.
            </p>
          </div>
        </section>

        {/* Benefits of Partnering */}
        <section aria-labelledby="benefits-heading" className="py-12 px-4 sm:py-16 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-10 sm:mb-12">
              <h2 id="benefits-heading" className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">Benefits of Partnering with Us</h2>
              <p className="text-base sm:text-lg text-gray-600 max-w-4xl mx-auto">
                Empower your brand with tools, visibility, and support to succeed.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8" role="list">
              {[
                {
                  icon: <Globe className="h-8 w-8 text-green-600 mb-4" aria-hidden="true" />, 
                  title: "Multi-Platform Presence",
                  description: "Sell on ONDC, Amazon, Flipkart, Meesho, Jiomart, Swiggy, and Zomato with one unified enablement process."
                },
                {
                  icon: <Settings className="h-8 w-8 text-green-600 mb-4" aria-hidden="true" />, 
                  title: "End-to-End Support",
                  description: "From account setup and catalog creation to order fulfillment and returns, we handle it all."
                },
                {
                  icon: <Handshake className="h-8 w-8 text-green-600 mb-4" aria-hidden="true" />, 
                  title: "Strategic Co-Branding",
                  description: "Unlock new audiences with joint promotions, bundle offerings, and festive campaigns."
                },
                {
                  icon: <Megaphone className="h-8 w-8 text-green-600 mb-4" aria-hidden="true" />, 
                  title: "Performance Marketing Expertise",
                  description: "Data-driven ad campaigns on e-commerce and social media with clear ROI tracking."
                },
                {
                  icon: <Clock className="h-8 w-8 text-green-600 mb-4" aria-hidden="true" />, 
                  title: "Fast Onboarding",
                  description: "Go live in 3–7 business days with our streamlined onboarding process."
                },
                {
                  icon: <DollarSign className="h-8 w-8 text-green-600 mb-4" aria-hidden="true" />, 
                  title: "Affordable & Transparent Pricing",
                  description: "Tailored plans for startups and scale-ups with no hidden costs or long-term contracts."
                },
                {
                  icon: <BarChart3 className="h-8 w-8 text-green-600 mb-4" aria-hidden="true" />, 
                  title: "Analytics & Insights",
                  description: "Regular reports with sales, ad performance, and platform insights for informed decisions."
                },
                {
                  icon: <Users className="h-8 w-8 text-green-600 mb-4" aria-hidden="true" />, 
                  title: "Dedicated Partner Success Team",
                  description: "Personalized support with a dedicated relationship manager for your business."
                }
              ].map((benefit, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow p-6 flex flex-col items-center text-center h-full"
                  role="listitem"
                >
                  {benefit.icon}
                  <h3 className="font-semibold text-gray-900 mb-2 text-base sm:text-lg">{benefit.title}</h3>
                  <p className="text-gray-600 text-sm sm:text-base">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Who Should Partner */}
        <section aria-labelledby="partner-types-heading" className="py-12 px-4 sm:py-16 sm:px-6 lg:px-8 bg-green-50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-10 sm:mb-12">
              <h2 id="partner-types-heading" className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">Who Should Partner With Us?</h2>
              <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto">
                Our services are tailored for brands ready to scale in the digital commerce ecosystem.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" role="list">
              {[
                { name: "D2C Brands", desc: "Looking to scale across multiple platforms" },
                { name: "Manufacturers", desc: "Seeking digital reach and co-branding support" },
                { name: "Artisan Sellers", desc: "Offering handmade or unique products" },
                { name: "Lifestyle Brands", desc: "Organic, spiritual, fashion, or wellness products" },
                { name: "F&B Vendors", desc: "Targeting Swiggy/Zomato buyers" },
                { name: "Early-Stage Brands", desc: "Needing e-commerce marketing expertise" },
              ].map((partner, index) => (
                <div key={index} className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow text-center p-6" role="listitem">
                  <div className="w-12 h-12 bg-green-100 text-green-600 rounded-lg flex items-center justify-center mx-auto mb-2" aria-hidden="true">
                    <ShoppingCart className="h-6 w-6" />
                  </div>
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900">{partner.name}</h3>
                  <p className="text-gray-600 text-sm sm:text-base">{partner.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Join Us Button at the end */}
      <div className="flex justify-center py-8 sm:py-12 bg-white px-4">
        <Link
          to="/partnerlogin"
          className="inline-block px-6 sm:px-8 py-3 sm:py-4 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold text-base sm:text-lg shadow-lg hover:from-green-600 hover:to-emerald-700 transition-all duration-300 transform hover:scale-105"
        >
          Join us
        </Link>
      </div>
    </>
  );
}