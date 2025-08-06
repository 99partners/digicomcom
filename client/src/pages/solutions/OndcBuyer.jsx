import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';

const OndcBuyer = () => {
  const { t } = useTranslation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const benefits = t('ondcBuyer.benefits.points', { returnObjects: true });
  const services = t('ondcBuyer.services.points', { returnObjects: true });
  const steps = t('ondcBuyer.process.steps', { returnObjects: true });

  return (
    <>
      <Helmet>
        <title>{t('ondcBuyer.seo.title')}</title>
        <meta 
          name="description" 
          content={t('ondcBuyer.seo.description')} 
        />
      </Helmet>

      <main className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {t('ondcBuyer.hero.heading')}
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t('ondcBuyer.hero.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-gray-900">
                {t('ondcBuyer.benefits.heading')}
              </h2>
              <ul className="space-y-4">
                {benefits.map((point, idx) => (
                  <li key={idx} className="flex items-start">
                    <span className="h-6 w-6 text-green-500 mr-2">✓</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-gray-900">
                {t('ondcBuyer.services.heading')}
              </h2>
              <ul className="space-y-4">
                {services.map((point, idx) => (
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
              {t('ondcBuyer.process.heading')}
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
              {t('ondcBuyer.cta')}
            </a>
          </div>
        </div>
      </main>
    </>
  );
};

export default OndcBuyer;