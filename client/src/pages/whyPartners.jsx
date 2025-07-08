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
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white">
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center space-x-2 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Handshake className="h-4 w-4" />
            <span>For Product Partners</span>
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Why Partner with <span className="text-green-600">99digicom?</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            We don’t just offer a platform — we build partnerships to help your brand thrive in India’s digital commerce landscape.
          </p>
          <div className="flex justify-center space-x-4">
            
          </div>
        </div>
      </section>

      {/* Benefits of Partnering */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Benefits of Partnering with Us</h2>
            <p className="text-lg text-gray-600 max-w-4xl mx-auto">
              Empower your brand with tools, visibility, and support to succeed.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <Globe className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Multi-Platform Presence</h4>
                  <p className="text-gray-600 text-sm">
                    Sell on ONDC, Amazon, Flipkart, Meesho, Jiomart, Swiggy, and Zomato with one unified enablement process.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <Settings className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">End-to-End Support</h4>
                  <p className="text-gray-600 text-sm">
                    From account setup and catalog creation to order fulfillment and returns, we handle it all.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <Handshake className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Strategic Co-Branding</h4>
                  <p className="text-gray-600 text-sm">
                    Unlock new audiences with joint promotions, bundle offerings, and festive campaigns.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <Megaphone className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Performance Marketing Expertise</h4>
                  <p className="text-gray-600 text-sm">
                    Data-driven ad campaigns on e-commerce and social media with clear ROI tracking.
                  </p>
                </div>
              </div>
            </div>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <Clock className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Fast Onboarding</h4>
                  <p className="text-gray-600 text-sm">
                    Go live in 3–7 business days with our streamlined onboarding process.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <DollarSign className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Affordable & Transparent Pricing</h4>
                  <p className="text-gray-600 text-sm">
                    Tailored plans for startups and scale-ups with no hidden costs or long-term contracts.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <BarChart3 className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Analytics & Insights</h4>
                  <p className="text-gray-600 text-sm">
                    Regular reports with sales, ad performance, and platform insights for informed decisions.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <Users className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Dedicated Partner Success Team</h4>
                  <p className="text-gray-600 text-sm">
                    Personalized support with a dedicated relationship manager for your business.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Who Should Partner */}
      <section className="py-16 px-4 bg-green-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Who Should Partner With Us?</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our services are tailored for brands ready to scale in the digital commerce ecosystem.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { name: "D2C Brands", desc: "Looking to scale across multiple platforms" },
              { name: "Manufacturers", desc: "Seeking digital reach and co-branding support" },
              { name: "Artisan Sellers", desc: "Offering handmade or unique products" },
              { name: "Lifestyle Brands", desc: "Organic, spiritual, fashion, or wellness products" },
              { name: "F&B Vendors", desc: "Targeting Swiggy/Zomato buyers" },
              { name: "Early-Stage Brands", desc: "Needing e-commerce marketing expertise" },
            ].map((partner, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow text-center p-6">
                <div className="w-12 h-12 bg-green-100 text-green-600 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <ShoppingCart className="h-6 w-6" />
                </div>
                <h4 className="text-lg font-semibold text-gray-900">{partner.name}</h4>
                <p className="text-gray-600 text-sm">{partner.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Let’s Grow, Together</h2>
          <p className="text-lg text-gray-600 mb-8 max-w-3xl mx-auto">
            At 99digicom, we believe in long-term collaboration, shared growth, and building India’s most trusted digital commerce ecosystem.
          </p>
          <div className="flex justify-center space-x-4">
            
          </div>
        </div>
      </section>

      
      
    </div>
  );
}