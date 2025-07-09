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
import { simulateApiCall } from '../config/mockData';

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
      const { data } = await simulateApiCall({ 
        success: true,
        message: 'Form submitted successfully'
      });
      
      if (data.success) {
        alert('Thank you for your submission! Our team will contact you shortly.');
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
        alert('Error submitting form. Please try again.');
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
            <Store className="h-4 w-4" />
            <span>Seller Account Setup</span>
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Launch Your Online Store on <span className="text-green-600">Amazon, Flipkart & More</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Get expert help to go live within days.
          </p>
          <a
            href="#get-started"
            className="inline-flex items-center px-8 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors"
          >
            Get Started for ₹4,999
            <ArrowRight className="ml-2 h-5 w-5" />
          </a>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose 99digicom for Account Setup?</h2>
            <p className="text-lg text-gray-600 max-w-4xl mx-auto">
              Start selling online quickly and confidently with our expert support.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex items-start space-x-4 p-6 bg-green-50 rounded-lg">
              <CheckCircle className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Hassle-Free Setup Process</h4>
                <p className="text-gray-600 text-sm">Seamless onboarding on top platforms.</p>
              </div>
            </div>
            <div className="flex items-start space-x-4 p-6 bg-green-50 rounded-lg">
              <CheckCircle className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Quick Turnaround</h4>
                <p className="text-gray-600 text-sm">Get live in 3–5 days.</p>
              </div>
            </div>
            <div className="flex items-start space-x-4 p-6 bg-green-50 rounded-lg">
              <CheckCircle className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Expert Support</h4>
                <p className="text-gray-600 text-sm">Guidance for documentation and approvals.</p>
              </div>
            </div>
            <div className="flex items-start space-x-4 p-6 bg-green-50 rounded-lg">
              <CheckCircle className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Avoid Mistakes</h4>
                <p className="text-gray-600 text-sm">Prevent common seller errors.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="py-16 px-4 bg-green-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">What's Included</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Everything you need to start selling online.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <FileText className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Business Account Creation</h4>
                  <p className="text-gray-600 text-sm">Set up your seller account on one platform.</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <Shield className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">GST, PAN, Bank Details Verification</h4>
                  <p className="text-gray-600 text-sm">Ensure compliance with platform requirements.</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <Package className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Product Category Approval Assistance</h4>
                  <p className="text-gray-600 text-sm">Get your products approved for listing.</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <Building className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">5 Product Listings</h4>
                  <p className="text-gray-600 text-sm">Create five sample product listings to get started.</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <CheckCircle className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">7 Days Post-Setup Support</h4>
                  <p className="text-gray-600 text-sm">Ongoing guidance after setup.</p>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">Onboarding Checklist</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-600 mr-2" /> Account registration completed</li>
                <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-600 mr-2" /> KYC and documentation verified</li>
                <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-600 mr-2" /> Store profile setup</li>
                <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-600 mr-2" /> Product listings created</li>
                <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-600 mr-2" /> Ready to sell!</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Supported Platforms */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Supported Marketplaces</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { name: "Amazon", desc: "World's largest e-commerce platform" },
              { name: "Flipkart", desc: "India's leading e-commerce marketplace" },
              { name: "Meesho", desc: "Social commerce platform" },
              { name: "Jiomart", desc: "Reliance's digital commerce platform" },
              { name: "IndiaMART", desc: "B2B marketplace for Indian businesses" },
              { name: "Snapdeal", desc: "Popular e-commerce platform" },
            ].map((platform, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow text-center p-6">
                <div className="w-12 h-12 bg-green-100 text-green-600 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <ShoppingCart className="h-6 w-6" />
                </div>
                <h4 className="text-lg font-semibold text-gray-900">{platform.name}</h4>
                <p className="text-gray-600 text-sm">{platform.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Client Testimonials */}
      <section className="py-16 px-4 bg-green-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Client Testimonials</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Hear from small business owners who launched successfully with us.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <p className="text-gray-600 italic">"99digicom made our Amazon store setup a breeze. We were live in just 4 days!"</p>
              <p className="text-gray-900 font-semibold mt-4">- Priya S., EcoTrendy Crafts</p>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6">
              <p className="text-gray-600 italic">"Their team handled all our documentation and approvals, saving us weeks of hassle."</p>
              <p className="text-gray-900 font-semibold mt-4">- Rajesh K., HomeVibe Decor</p>
            </div>
          </div>
        </div>
      </section>

      
    </div>
  );
}