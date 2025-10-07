import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';

const OndcSeller = () => {
  const { t } = useTranslation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const whyJoinPoints = t('ondcSeller.whyJoin.points', { returnObjects: true });
  const supportPoints = t('ondcSeller.support.points', { returnObjects: true });
  const steps = t('ondcSeller.steps.items', { returnObjects: true });

  const ondcSellerHeading = t('ondcSeller.hero.heading');
  const ondcSellerIdx = ondcSellerHeading.indexOf('ONDC');

  return (
    <>
      <Helmet>
        <title>{t('ondcSeller.seo.title')}</title>
        <meta name="description" content={t('ondcSeller.seo.description')} />
        <link rel="canonical" href="https://99digicom.com/solutions/ondc-seller" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={t('ondcSeller.seo.title')} />
        <meta property="og:description" content={t('ondcSeller.seo.description')} />
        <meta property="og:url" content="https://99digicom.com/solutions/ondc-seller" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={t('ondcSeller.seo.title')} />
        <meta name="twitter:description" content={t('ondcSeller.seo.description')} />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: t('ondcSeller.seo.title'),
          url: "https://99digicom.com/solutions/ondc-seller",
          description: t('ondcSeller.seo.description')
        })}</script>
      </Helmet>

      <main id="main-content" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {ondcSellerIdx === -1 ? (
                ondcSellerHeading
              ) : (
                <>
                  {ondcSellerHeading.slice(0, ondcSellerIdx)}
                  <span className="text-green-600">ONDC</span>
                  {ondcSellerHeading.slice(ondcSellerIdx + 4)}
                </>
              )}
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t('ondcSeller.hero.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-gray-900">
                {t('ondcSeller.whyJoin.heading')}
              </h2>
              <ul className="space-y-4">
                {whyJoinPoints.map((point, idx) => (
                  <li key={idx} className="flex items-start">
                    <span className="h-6 w-6 text-green-500 mr-2">✓</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-gray-900">
                {t('ondcSeller.support.heading')}
              </h2>
              <ul className="space-y-4">
                {supportPoints.map((point, idx) => (
                  <li key={idx} className="flex items-start">
                    <span className="h-6 w-6 text-green-500 mr-2">✓</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="bg-green-50 rounded-2xl p-8 mb-16">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              {t('ondcSeller.steps.heading')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {steps.map((step, idx) => (
                <div key={idx} className="bg-white rounded-xl p-6 shadow-sm">
                  <div className="text-2xl font-bold text-green-600 mb-2">{step.step}</div>
                  <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                  <p className="text-gray-600">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center">
            <a
              href="/contact_us"
              className="inline-block bg-green-600 text-white px-8 py-3 rounded-full font-medium hover:bg-green-700 transition-colors duration-200"
            >
              {t('ondcSeller.cta')}
            </a>
          </div>
        </div>
      </main>
    </>
  );
};

export default OndcSeller;