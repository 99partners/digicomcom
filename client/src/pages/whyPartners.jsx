import { useState, useEffect } from "react";
import {
  Handshake,
  CheckCircle,
  ArrowRight,
  Globe,
  Settings,
  Megaphone,
  Clock,
  DollarSign, // Keeping this for reference, but will replace with Rupee symbol
  BarChart3,
  Users,
  ShoppingCart,
} from "lucide-react";
import axios from 'axios';
import { getApiUrl } from '../config/api.config';
import { Helmet } from 'react-helmet';
import { Link } from "react-router-dom"; // Add this import
import { useTranslation } from "react-i18next"; // Add this import

export default function ForProductPartners() {
  const { t } = useTranslation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const whyHeading = t("whyPartner.hero.title");
  const whyHighlight = "with 99digicom";
  const whyIdx = whyHeading.toLowerCase().indexOf(whyHighlight);

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

  // Get translated benefits and partner types
  const benefits = t("whyPartner.benefits.items", { returnObjects: true });
  const partnerTypes = t("whyPartner.whoShouldPartner.items", { returnObjects: true });

  return (
    <>
      <Helmet>
        <title>{t("whyPartner.seo.title")}</title>
        <meta name="description" content={t("whyPartner.seo.description")} />
        <meta name="keywords" content={t("whyPartner.seo.keywords")} />
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
              <span>{t("whyPartner.hero.badge")}</span>
            </div>
            <h1 id="hero-heading" className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              {whyIdx === -1 ? (
                whyHeading
              ) : (
                <>
                  {whyHeading.slice(0, whyIdx)}
                  <span className="text-green-600">{whyHeading.slice(whyIdx, whyIdx + whyHighlight.length)}</span>
                  {whyHeading.slice(whyIdx + whyHighlight.length)}
                </>
              )}
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              {t("whyPartner.hero.subtitle")}
            </p>
          </div>
        </section>

        {/* Benefits of Partnering */}
        <section aria-labelledby="benefits-heading" className="py-12 px-4 sm:py-16 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-10 sm:mb-12">
              <h2 id="benefits-heading" className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">{t("whyPartner.benefits.heading")}</h2>
              <p className="text-base sm:text-lg text-gray-600 max-w-4xl mx-auto">
                {t("whyPartner.benefits.description")}
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8" role="list">
              {benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow p-6 flex flex-col items-center text-center h-full"
                  role="listitem"
                >
                  {/* Use icons as before, or map by index if needed */}
                  {/* Example: */}
                  {index === 0 && <Globe className="h-10 w-10 text-green-600 mb-4" aria-hidden="true" />}
                  {index === 1 && <Settings className="h-10 w-10 text-green-600 mb-4" aria-hidden="true" />}
                  {index === 2 && <Handshake className="h-10 w-10 text-green-600 mb-4" aria-hidden="true" />}
                  {index === 3 && <Megaphone className="h-10 w-10 text-green-600 mb-4" aria-hidden="true" />}
                  {index === 4 && <Clock className="h-10 w-10 text-green-600 mb-4" aria-hidden="true" />}
                  {index === 5 && <span className="h-12 w-12 text-green-600 mb-4 inline-flex items-center justify-center text-3xl" aria-hidden="true">₹</span>}
                  {index === 6 && <BarChart3 className="h-10 w-10 text-green-600 mb-4" aria-hidden="true" />}
                  {index === 7 && <Users className="h-10 w-10 text-green-600 mb-4" aria-hidden="true" />}
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
              <h2 id="partner-types-heading" className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">{t("whyPartner.whoShouldPartner.heading")}</h2>
              <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto">
                {t("whyPartner.whoShouldPartner.description")}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" role="list">
              {partnerTypes.map((partner, index) => (
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
    </>
  );
}