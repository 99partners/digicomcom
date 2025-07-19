import { useState, useEffect } from "react";
import {
  ArrowRight,
  CheckCircle,
  ShoppingCart,
  Users,
  Package,
  BarChart3,
  MessageSquare,
  FileText,
  Image as ImageIcon,
  Tag,
  Rocket,
  Globe,
} from "lucide-react";
import axios from "axios";
import { getApiUrl } from "../config/api.config";
import { Helmet } from "react-helmet";
import step1 from "../assets/step1.png";
import step2 from "../assets/step2.png";
import step3 from "../assets/step3.png";
import step4 from "../assets/step4.png";
import step5 from "../assets/step5.png";

export default function PartnerOnboarding() {
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
    additionalNotes: "",
    consent: false,
  });

  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    { src: step1, alt: "Step 1: Fill the Partner Interest Form illustration" },
    { src: step2, alt: "Step 2: Consultation & Category Assessment illustration" },
    { src: step3, alt: "Step 3: Documentation & Seller Account Setup illustration" },
    { src: step4, alt: "Step 4: Catalog, Content & Pricing illustration" },
    { src: step5, alt: "Step 5: Go Live & Start Selling illustration" },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(getApiUrl("api/onboarding/submit"), formData);
      const data = await response.data;
      if (data.success) {
        alert("Thank you for your submission! Our team will contact you shortly to begin onboarding.");
        setFormData({
          brandName: "",
          contactPerson: "",
          email: "",
          phone: "",
          website: "",
          businessType: "",
          productCategories: [],
          platforms: [],
          additionalNotes: "",
          consent: false,
        });
      } else {
        alert("Error submitting form: " + data.message);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Error submitting form. Please try again.");
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

  const handlePrev = () => {
    setCurrentStep((prev) => (prev > 0 ? prev - 1 : 4));
  };

  const handleNext = () => {
    setCurrentStep((prev) => (prev < 4 ? prev + 1 : 0));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white">
      <Helmet>
        <style>{``}</style> {/* Removed animation styles */}
      </Helmet>

      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center space-x-2 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Rocket className="h-4 w-4" />
            <span>Partner Onboarding</span>
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Join <span className="text-green-600">99digicom</span> in 5 Easy Steps
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Start your journey with a growing network of digital-first brands. Simple, structured, and supportive onboarding to help you sell, scale, and succeed.
          </p>
          <div className="flex justify-center space-x-4"></div>
        </div>
      </section>

      {/* Partner Dashboard */}
      <section aria-labelledby="dashboard-features-heading" className="py-16 px-4 bg-green-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 id="dashboard-features-heading" className="text-3xl font-bold text-gray-900 mb-4">Your Partner Dashboard Includes</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Manage your business with powerful tools and insights.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6" role="list">
            {[
              { name: "Product & Inventory Controls", icon: <Package className="h-6 w-6 text-green-600" aria-hidden="true" /> },
              { name: "Sales Reports and Insights", icon: <BarChart3 className="h-6 w-6 text-green-600" aria-hidden="true" /> },
              { name: "Support Ticketing System", icon: <MessageSquare className="h-6 w-6 text-green-600" aria-hidden="true" /> },
              { name: "Access to Growth Campaigns", icon: <Rocket className="h-6 w-6 text-green-600" aria-hidden="true" /> },
            ].map((feature, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow p-6 flex items-center space-x-4" role="listitem">
                <div className="flex-shrink-0">{feature.icon}</div>
                <h3 className="text-lg font-semibold text-gray-900">{feature.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Onboarding Steps */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How to Join 99digicom in 5 Easy Steps</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our streamlined process gets you ready to sell quickly.
            </p>
          </div>
          <div className="relative overflow-hidden w-full h-[400px]">
            <button
              onClick={handlePrev}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-green-600 text-white p-2 rounded-full hover:bg-green-700 transition-colors z-10"
              aria-label="Previous step"
            >
              <ArrowRight className="h-6 w-6 rotate-180" />
            </button>
            <div className="flex justify-center items-center h-full space-x-4">
              {steps.map((step, index) => {
                const isCenter = index === currentStep;
                const isLeft = index === (currentStep - 1 + 5) % 5;
                const isRight = index === (currentStep + 1) % 5;
                return (
                  <img
                    key={index}
                    src={step.src}
                    alt={step.alt}
                    className={`rounded-lg object-contain shadow-md transition-all duration-500 ${
                      isCenter ? "w-96 h-96 z-20" : isLeft || isRight ? "w-48 h-48 scale-75 z-10" : "w-0 h-0 opacity-0"
                    }`}
                    onError={(e) => {
                      e.target.src = "https://via.placeholder.com/600x600.png?text=Image+Not+Found";
                      console.error(`Image failed to load: ${step.src}`);
                    }}
                  />
                );
              })}
            </div>
            <button
              onClick={handleNext}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-green-600 text-white p-2 rounded-full hover:bg-green-700 transition-colors z-10"
              aria-label="Next step"
            >
              <ArrowRight className="h-6 w-6" />
            </button>
          </div>
        </div>
      </section>

      {/* Who Can Apply */}
      <section aria-labelledby="eligible-partners-heading" className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 id="eligible-partners-heading" className="text-3xl font-bold text-gray-900 mb-4">Who Can Apply?</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We welcome a diverse range of brands ready to grow.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6" role="list">
            {[
              { name: "Organic & Wellness", desc: "Herbal and health-focused products" },
              { name: "Artisan & Handmade", desc: "Spiritual and unique goods" },
              { name: "Fashion & Lifestyle", desc: "Apparel and home décor" },
              { name: "FMCG & Packaged Food", desc: "Consumer goods and food products" },
              { name: "D2C Niche Brands", desc: "Direct-to-consumer startups" },
              { name: "Restaurants & Food", desc: "For Zomato/Swiggy onboarding" },
            ].map((category, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow text-center p-6" role="listitem">
                <div className="w-12 h-12 bg-green-100 text-green-600 rounded-lg flex items-center justify-center mx-auto mb-2" aria-hidden="true">
                  <ShoppingCart className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">{category.name}</h3>
                <p className="text-gray-600 text-sm">{category.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Expert Support */}
      <section aria-labelledby="expert-support-heading" className="py-16 px-4 bg-green-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 id="expert-support-heading" className="text-3xl font-bold text-gray-900 mb-4">Get Expert Support at Every Step</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our team is with you from onboarding to scaling.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6" role="list">
            {[
              { name: "Dedicated Onboarding Manager", icon: <Users className="h-6 w-6 text-green-600" aria-hidden="true" /> },
              { name: "Prebuilt Listing Templates", icon: <FileText className="h-6 w-6 text-green-600" aria-hidden="true" /> },
              { name: "Guidance on Pricing & Compliance", icon: <Tag className="h-6 w-6 text-green-600" aria-hidden="true" /> },
              { name: "Multi-Platform Enablement", icon: <Globe className="h-6 w-6 text-green-600" aria-hidden="true" /> },
            ].map((support, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow p-6 flex items-center space-x-4" role="listitem">
                <div className="flex-shrink-0">{support.icon}</div>
                <h3 className="text-lg font-semibold text-gray-900">{support.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
