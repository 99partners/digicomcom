
import { useState, useEffect } from "react";
import {
  Handshake,
  CheckCircle,
  ArrowRight,
  Globe,
  TrendingUp,
  Gift,
  Users,
  ShoppingCart,
  Zap,
  Target,
} from "lucide-react";
import { Helmet } from "react-helmet";
import COB1 from "../assets/COB1.png";
import COB2 from "../assets/COB2.png";
import COB3 from "../assets/COB3.png";
import COB4 from "../assets/COB4.png";
import amazonLogo from "../assets/Amazon.png";
import flipkartLogo from "../assets/Flipkart.png";
import jiomartLogo from "../assets/Jiomart.png";
import meeshoLogo from "../assets/Meesho1.png";
import indiamartLogo from "../assets/Indiamart.png";
import snapdealLogo from "../assets/Snapdeal.png";
import ImageSlider from '../components/ImageSlider';
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

export default function CoBranding() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const isAuthenticated = () => {
    const token = localStorage.getItem("authToken") || sessionStorage.getItem("authToken");
    return !!token;
  };

  const handleStartCollaboration = () => {
    if (isAuthenticated()) {
      navigate("/dashboard/profile");
    } else {
      navigate("/partnerlogin");
    }
  };

  // Steps for Brand Collaborations
  const steps = t('coBranding.collaborations.steps', { returnObjects: true }).map((step, idx) => ({
    src: [COB1, COB2, COB3, COB4][idx],
    alt: step.title,
    title: step.title,
    description: step.description,
  }));

  // Supported Marketplaces
  const marketplaceLogos = t('coBranding.supportedMarketplaces.items', { returnObjects: true }).map((platform, idx) => ({
    name: platform.name,
    desc: platform.desc,
    src: [amazonLogo, flipkartLogo, meeshoLogo, jiomartLogo, indiamartLogo, snapdealLogo][idx],
    alt: platform.name + " Logo"
  }));

  // Benefits
  const benefits = t('coBranding.benefits.items', { returnObjects: true });

  // How It Works steps
  const howItWorksSteps = t('coBranding.benefits.howItWorks.steps', { returnObjects: true });

  return (
    <>
      <Helmet>
        <title>{t('coBranding.seo.title')}</title>
        <meta name="description" content={t('coBranding.seo.description')} />
        <meta name="keywords" content={t('coBranding.seo.keywords')} />
        <link rel="canonical" href="https://99digicom.com/co-branding" />
        <meta name="robots" content="noindex, nofollow" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={t('coBranding.seo.title')} />
        <meta property="og:description" content={t('coBranding.seo.description')} />
        <meta property="og:url" content="https://99digicom.com/co-branding" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={t('coBranding.seo.title')} />
        <meta name="twitter:description" content={t('coBranding.seo.description')} />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: t('coBranding.seo.title'),
          url: "https://99digicom.com/co-branding",
          description: t('coBranding.seo.description')
        })}</script>
      </Helmet>

      <main id="main-content" className="min-h-screen bg-gradient-to-br from-green-50 to-white">
        {/* Hero Section */}
        <section aria-labelledby="hero-heading" className="pt-24 pb-16 px-4">
          <div className="max-w-7xl mx-auto text-center">
            <div className="inline-flex items-center space-x-2 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium mb-6" role="text">
              <Handshake className="h-4 w-4" aria-hidden="true" />
              <span>{t('coBranding.hero.badge')}</span>
            </div>
            <h1 id="hero-heading" className="text-5xl font-bold text-gray-900 mb-6">
              <span>Unlock New Growth Opportunities Through</span>
              <br />
              <span className="text-green-600">Brand Collaboration</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              {t('coBranding.hero.subtitle')}
            </p>
            <button
              type="button"
              onClick={handleStartCollaboration}
              className="inline-flex items-center px-8 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors"
              aria-label={t('coBranding.hero.cta')}
            >
              {t('coBranding.hero.cta')}
              <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </section>

        {/* Features Section */}
        <section aria-labelledby="features-heading" className="py-16 px-4 bg-green-50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 id="features-heading" className="text-3xl font-bold text-gray-900 mb-4">
                {t('coBranding.features.heading')}
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                {t('coBranding.features.description')}
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-8" role="list">
              {t('coBranding.features.items', { returnObjects: true }).map((item, index) => (
                <div key={index} className="bg-white rounded-lg p-6" role="listitem">
                  {/* Icons mapped by index */}
                  {index === 0 && <Users className="h-8 w-8 text-green-600 mb-4" aria-hidden="true" />}
                  {index === 1 && <Zap className="h-8 w-8 text-green-600 mb-4" aria-hidden="true" />}
                  {index === 2 && <Globe className="h-8 w-8 text-green-600 mb-4" aria-hidden="true" />}
                  {index === 3 && <Target className="h-8 w-8 text-green-600 mb-4" aria-hidden="true" />}
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              ))}
            </div>
            <div className="mt-8 bg-white rounded-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {t('coBranding.features.useCase.title')}
              </h3>
              <p className="text-gray-600">
                {t('coBranding.features.useCase.description')}
              </p>
            </div>
          </div>
        </section>

        {/* Brand Collaborations Section */}
        <section aria-labelledby="collaborations-heading" className="py-16 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 id="collaborations-heading" className="text-3xl font-bold text-gray-900 mb-4">
                {t('coBranding.collaborations.heading')}
              </h2>
              <p className="text-lg text-gray-600 max-w-4xl mx-auto">
                {t('coBranding.collaborations.description')}
              </p>
            </div>
            <ImageSlider slides={steps} />
          </div>
        </section>

        {/* Apply Section */}
        <section className="py-16 px-4 bg-white">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {t('coBranding.apply.heading')}
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
              {t('coBranding.apply.description')}
            </p>
            <a
              href="#get-started"
              className="inline-flex items-center px-8 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors"
            >
              {t('coBranding.apply.cta')}
              <ArrowRight className="ml-2 h-5 w-5" />
            </a>
          </div>
        </section>

        {/* Supported Platforms */}
        <section aria-labelledby="platforms-heading" className="py-16 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 id="platforms-heading" className="text-3xl font-bold text-gray-900 mb-4">
                {t('coBranding.supportedMarketplaces.heading')}
              </h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6" role="list">
              {marketplaceLogos.map((platform, index) => (
                <div key={index} className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow text-center p-6" role="listitem">
                  <img
                    src={platform.src}
                    alt={platform.alt}
                    className="h-12 w-auto object-contain mx-auto mb-2"
                    loading="lazy"
                    decoding="async"
                  />
                  <h3 className="text-lg font-semibold text-gray-900">{platform.name}</h3>
                  <p className="text-gray-600 text-sm">{platform.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section aria-labelledby="benefits-heading" className="py-16 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 id="benefits-heading" className="text-3xl font-bold text-gray-900 mb-4">
                {t('coBranding.benefits.heading')}
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                {t('coBranding.benefits.description')}
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6" role="list">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start space-x-4" role="listitem">
                    {index === 0 && <Globe className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" aria-hidden="true" />}
                    {index === 1 && <Gift className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" aria-hidden="true" />}
                    {index === 2 && <Users className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" aria-hidden="true" />}
                    {index === 3 && <TrendingUp className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" aria-hidden="true" />}
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">{benefit.title}</h4>
                      <p className="text-gray-600 text-sm">{benefit.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="bg-green-50 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {t('coBranding.benefits.howItWorks.title')}
                </h3>
                <ol className="text-gray-600 text-sm space-y-2" role="list">
                  {howItWorksSteps.map((step, index) => (
                    <li key={index} className="flex items-center" role="listitem">
                      <CheckCircle className="h-4 w-4 text-green-600 mr-2" aria-hidden="true" />
                      {step}
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </section>

        {/* Success Story */}
        <section aria-labelledby="success-story-heading" className="py-16 px-4 bg-green-50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 id="success-story-heading" className="text-3xl font-bold text-gray-900 mb-4">
                {t('coBranding.successStory.heading')}
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                {t('coBranding.successStory.description')}
              </p>
            </div>
            <blockquote className="bg-white rounded-lg p-6 shadow-lg">
              <p className="text-gray-600">
                {t('coBranding.successStory.quote')}
              </p>
            </blockquote>
          </div>
        </section>
      </main>
    </>
  );
}

