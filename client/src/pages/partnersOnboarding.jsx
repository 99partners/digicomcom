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
import ImageSlider from '../components/ImageSlider';
import { useTranslation } from "react-i18next"; // <-- Add this import

export default function PartnerOnboarding() {
  const { t } = useTranslation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const onboardingHeading = t("partners.onboardingSection.heading");
  const onboardingTarget = "onboarding";
  const onboardingIdx = onboardingHeading.toLowerCase().indexOf(onboardingTarget);

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
    { src: step1, alt: t("partners.onboardingSection.steps.0.title") },
    { src: step2, alt: t("partners.onboardingSection.steps.1.title") },
    { src: step3, alt: t("partners.onboardingSection.steps.2.title") },
    { src: step4, alt: t("partners.onboardingSection.steps.3.title") },
    { src: step5, alt: t("partners.onboardingSection.steps.4.title") },
  ];

  // Dashboard features
  const dashboardFeatures = [
    { name: t("partners.benefitsSection.benefits.0.title"), icon: <Package className="h-6 w-6 text-green-600" aria-hidden="true" /> },
    { name: t("partners.benefitsSection.benefits.1.title"), icon: <BarChart3 className="h-6 w-6 text-green-600" aria-hidden="true" /> },
    { name: t("partners.benefitsSection.benefits.2.title"), icon: <MessageSquare className="h-6 w-6 text-green-600" aria-hidden="true" /> },
    { name: t("partners.benefitsSection.benefits.3.title"), icon: <Rocket className="h-6 w-6 text-green-600" aria-hidden="true" /> },
  ];

  // Eligible partners
  const eligiblePartners = [
    { name: t("partners.onboardingSection.steps.0.title"), desc: t("partners.onboardingSection.steps.0.description"), icon: <CheckCircle className="h-6 w-6 text-green-600" aria-hidden="true" /> },
    { name: t("partners.onboardingSection.steps.1.title"), desc: t("partners.onboardingSection.steps.1.description"), icon: <Tag className="h-6 w-6 text-green-600" aria-hidden="true" /> },
    { name: t("partners.onboardingSection.steps.2.title"), desc: t("partners.onboardingSection.steps.2.description"), icon: <Users className="h-6 w-6 text-green-600" aria-hidden="true" /> },
    { name: t("partners.onboardingSection.steps.3.title"), desc: t("partners.onboardingSection.steps.3.description"), icon: <Package className="h-6 w-6 text-green-600" aria-hidden="true" /> },
    { name: t("partners.onboardingSection.steps.4.title"), desc: t("partners.onboardingSection.steps.4.description"), icon: <Rocket className="h-6 w-6 text-green-600" aria-hidden="true" /> },
    { name: t("partners.benefitsSection.benefits.5.title"), desc: t("partners.benefitsSection.benefits.5.description"), icon: <ShoppingCart className="h-6 w-6 text-green-600" aria-hidden="true" /> },
  ];

  // Expert support
  const expertSupport = [
    { name: t("partners.benefitsSection.benefits.7.title"), icon: <Users className="h-6 w-6 text-green-600" aria-hidden="true" /> },
    { name: t("partners.benefitsSection.benefits.6.title"), icon: <FileText className="h-6 w-6 text-green-600" aria-hidden="true" /> },
    { name: t("partners.benefitsSection.benefits.4.title"), icon: <Tag className="h-6 w-6 text-green-600" aria-hidden="true" /> },
    { name: t("partners.benefitsSection.benefits.0.title"), icon: <Globe className="h-6 w-6 text-green-600" aria-hidden="true" /> },
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
        <style>{``}</style>
      </Helmet>

      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center space-x-2 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Rocket className="h-4 w-4" />
            <span>{t("partners.onboardingSection.heading")}</span>
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            {onboardingIdx === -1 ? (
              onboardingHeading
            ) : (
              <>
                {onboardingHeading.slice(0, onboardingIdx)}
                <span className="text-green-600">{onboardingHeading.slice(onboardingIdx, onboardingIdx + onboardingTarget.length)}</span>
                {onboardingHeading.slice(onboardingIdx + onboardingTarget.length)}
              </>
            )}
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            {t("partners.onboardingSection.subtitle")}
          </p>
        </div>
      </section>

      {/* Partner Dashboard */}
      <section aria-labelledby="dashboard-features-heading" className="py-16 px-4 bg-green-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 id="dashboard-features-heading" className="text-3xl font-bold text-gray-900 mb-4">{t("partners.benefitsSection.heading")}</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              {t("partners.benefitsSection.subtitle")}
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6" role="list">
            {dashboardFeatures.map((feature, index) => (
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
            <h2 className="text-3xl font-bold text-gray-900 mb-4">{t("partners.onboardingSection.heading")}</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              {t("partners.onboardingSection.subtitle")}
            </p>
          </div>
          <ImageSlider slides={steps} />
        </div>
      </section>

      {/* Who Can Apply */}
      <section aria-labelledby="eligible-partners-heading" className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 id="eligible-partners-heading" className="text-3xl font-bold text-gray-900 mb-4">{t("partners.commitmentsSection.heading")}</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              {t("partners.commitmentsSection.subtitle")}
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6" role="list">
            {eligiblePartners.map((category, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow text-center p-6" role="listitem">
                <div className="w-12 h-12 bg-green-100 text-green-600 rounded-lg flex items-center justify-center mx-auto mb-2" aria-hidden="true">
                  {category.icon}
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
            <h2 id="expert-support-heading" className="text-3xl font-bold text-gray-900 mb-4">{t("partners.benefitsSection.benefits.7.title")}</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              {t("partners.benefitsSection.benefits.7.description")}
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6" role="list">
            {expertSupport.map((support, index) => (
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