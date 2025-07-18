
import { useState, useEffect } from "react";
import {
  Store,
  CheckCircle,
  ArrowRight,
  FileText,
  Package,
  Building,
  Truck,
  Shield,
  ShoppingCart,
} from "lucide-react";
import axios from "axios";
import { getApiUrl } from "../config/api.config";
import SEO from "../components/SEO";
import PE1 from "../assets/PE1.png";
import PE2 from "../assets/PE2.png";
import PE3 from "../assets/PE3.png";
import PE4 from "../assets/PE4.png";

export default function PlatformEnablement() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [formData, setFormData] = useState({
    businessName: "",
    contactPerson: "",
    email: "",
    phone: "",
    website: "",
    businessType: "",
    productCategories: [],
    topProducts: "",
    platforms: [],
    currentSalesVolume: "",
    targetSalesVolume: "",
    servicesNeeded: [],
    marketingGoals: [],
    targetAudience: "",
    timeline: "",
    additionalNotes: "",
    consent: false,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        getApiUrl("api/platform-enable/submit"),
        formData
      );
      const data = await response.data;
      if (data.success) {
        alert(
          "Thank you for your submission! Our team will contact you shortly."
        );
        setFormData({
          businessName: "",
          contactPerson: "",
          email: "",
          phone: "",
          website: "",
          businessType: "",
          productCategories: [],
          topProducts: "",
          platforms: [],
          currentSalesVolume: "",
          targetSalesVolume: "",
          servicesNeeded: [],
          marketingGoals: [],
          targetAudience: "",
          timeline: "",
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
      [field]: checked
        ? [...prev[field], value]
        : prev[field].filter((item) => item !== value),
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
      <SEO
        title="Platform Enablement Services - Launch Your Online Store | 99Digicom"
        description="Get expert help to launch your online store on Amazon, Flipkart & more marketplaces. Start selling online with hassle-free setup and support from 99Digicom."
        keywords="platform enablement, seller account setup, amazon seller, flipkart seller, online store setup, e-commerce launch, marketplace integration"
        canonicalUrl="https://99digicom.com/services/platformEnable"
      />
      <main className="min-h-screen bg-gradient-to-br from-green-50 to-white">
        {/* Hero Section */}
        <section className="pt-24 pb-16 px-4" aria-labelledby="hero-heading">
          <div className="max-w-7xl mx-auto text-center">
            <div className="inline-flex items-center space-x-2 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Store className="h-4 w-4" aria-hidden="true" />
              <span>Seller Account Setup</span>
            </div>
            <h1
              id="hero-heading"
              className="text-5xl font-bold text-gray-900 mb-6"
            >
              Launch Your Online Store on{" "}
              <span className="text-green-600">Amazon, Flipkart & More</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Get expert help to go live within days.
            </p>
            <a
              href="#get-started"
              className="inline-flex items-center px-8 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors"
              aria-label="Get started with platform enablement services"
            >
              Get Started for ₹4,999
              <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
            </a>
          </div>
        </section>

        {/* Why Choose Us */}
        <section
          className="py-16 px-4 bg-white"
          aria-labelledby="why-choose-heading"
        >
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2
                id="why-choose-heading"
                className="text-3xl font-bold text-gray-900 mb-4"
              >
                Why Choose 99digicom for Account Setup?
              </h2>
              <p className="text-lg text-gray-600 max-w-4xl mx-auto">
                Start selling online quickly and confidently with our expert
                support.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6" role="list">
              {[
                {
                  title: "Hassle-Free Setup Process",
                  description: "Seamless onboarding on top platforms.",
                  image: PE1,
                },
                {
                  title: "Quick Turnaround",
                  description: "Get live in 3–5 days.",
                  image: PE2,
                },
                {
                  title: "Expert Support",
                  description: "Guidance for documentation and approvals.",
                  image: PE3,
                },
                {
                  title: "Avoid Mistakes",
                  description: "Prevent common seller errors.",
                  image: PE4,
                },
              ].map((benefit, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center p-6 bg-green-50 rounded-lg"
                  role="listitem"
                >
                  <img
                    src={benefit.image}
                    alt={benefit.title}
                    className="w-52 h-52 sm:w-56 sm:h-56 object-contain rounded-md mb-4 bg-white p-2"
                    onError={(e) => {
                      console.error(`Failed to load image: ${benefit.image}`);
                      e.target.src = "/assets/fallback.png"; // Ensure fallback.png exists in public/assets/
                    }}
                  />
                  <div className="text-center">
                    <h3 className="font-semibold text-gray-900 mb-2">
                      {benefit.title}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* What's Included */}
        <section
          className="py-16 px-4 bg-green-50"
          aria-labelledby="whats-included-heading"
        >
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2
                id="whats-included-heading"
                className="text-3xl font-bold text-gray-900 mb-4"
              >
                What's Included
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Everything you need to start selling online.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6" role="list">
                {[
                  {
                    icon: FileText,
                    title: "Business Account Creation",
                    description: "Set up your seller account on one platform.",
                  },
                  {
                    icon: Shield,
                    title: "GST, PAN, Bank Details Verification",
                    description:
                      "Ensure compliance with platform requirements.",
                  },
                  {
                    icon: Package,
                    title: "Product Category Approval Assistance",
                    description: "Get your products approved for listing.",
                  },
                  {
                    icon: Building,
                    title: "5 Product Listings",
                    description:
                      "Create five sample product listings to get started.",
                  },
                  {
                    icon: CheckCircle,
                    title: "7 Days Post-Setup Support",
                    description: "Ongoing guidance after setup.",
                  },
                ].map((service, index) => (
                  <div
                    key={index}
                    className="flex items-start space-x-4"
                    role="listitem"
                  >
                    <service.icon
                      className="h-6 w-6 text-green-600 mt-1 flex-shrink-0"
                      aria-hidden="true"
                    />
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">
                        {service.title}
                      </h3>
                      <p className="text-gray-600 text-sm">
                        {service.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-6">
                  Onboarding Checklist
                </h3>
                <ul className="space-y-2 text-gray-600" role="list">
                  {[
                    "Account registration completed",
                    "KYC and documentation verified",
                    "Store profile setup",
                    "Product listings created",
                    "Ready to sell!",
                  ].map((item, index) => (
                    <li
                      key={index}
                      className="flex items-center"
                      role="listitem"
                    >
                      <CheckCircle
                        className="h-4 w-4 text-green-600 mr-2"
                        aria-hidden="true"
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Supported Platforms */}
        <section
          className="py-16 px-4 bg-white"
          aria-labelledby="platforms-heading"
        >
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2
                id="platforms-heading"
                className="text-3xl font-bold text-gray-900 mb-4"
              >
                Supported Marketplaces
              </h2>
            </div>
            <div
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
              role="list"
            >
              {[
                { name: "Amazon", desc: "World's largest e-commerce platform" },
                {
                  name: "Flipkart",
                  desc: "India's leading e-commerce marketplace",
                },
                { name: "Meesho", desc: "Social commerce platform" },
                {
                  name: "Jiomart",
                  desc: "Reliance's digital commerce platform",
                },
                {
                  name: "IndiaMART",
                  desc: "B2B marketplace for Indian businesses",
                },
                { name: "Snapdeal", desc: "Popular e-commerce platform" },
              ].map((platform, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow text-center p-6"
                  role="listitem"
                >
                  <div className="w-12 h-12 bg-green-100 text-green-600 rounded-lg flex items-center justify-center mx-auto mb-2">
                    <ShoppingCart className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {platform.name}
                  </h3>
                  <p className="text-gray-600 text-sm">{platform.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Client Testimonials */}
        <section
          className="py-16 px-4 bg-green-50"
          aria-labelledby="testimonials-heading"
        >
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2
                id="testimonials-heading"
                className="text-3xl font-bold text-gray-900 mb-4"
              >
                Client Testimonials
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Hear from small business owners who launched successfully with
                us.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-6" role="list">
              {[
                {
                  quote:
                    "99digicom made our Amazon store setup a breeze. We were live in just 4 days!",
                  author: "Priya S.",
                  company: "EcoTrendy Crafts",
                },
                {
                  quote:
                    "Their team handled all our documentation and approvals, saving us weeks of hassle.",
                  author: "Rajesh K.",
                  company: "HomeVibe Decor",
                },
              ].map((testimonial, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg shadow-lg p-6"
                  role="listitem"
                >
                  <blockquote>
                    <p className="text-gray-600 italic">{testimonial.quote}</p>
                    <footer className="text-gray-900 font-semibold mt-4">
                      - {testimonial.author}, {testimonial.company}
                    </footer>
                  </blockquote>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}