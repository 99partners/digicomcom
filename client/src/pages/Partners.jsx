"use client"

import { Link } from "react-router-dom"
import {
  Users,
  TrendingUp,
  Globe,
  Headphones,
  CheckCircle,
  ArrowRight,
  DollarSign,
  Calendar,
  Star
} from "lucide-react"
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

const iconMap = {
  Globe,
  Users,
  TrendingUp,
  Headphones,
  Calendar,
  CheckCircle,
  Star,
  DollarSign
};

const Partners = () => {
  const { t } = useTranslation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const benefits = t('partners.benefitsSection.benefits', { returnObjects: true });
  const onboardingSteps = t('partners.onboardingSection.steps', { returnObjects: true });
  const commitments = t('partners.commitmentsSection.points', { returnObjects: true });
  const pricingPlans = t('partners.pricingSection.plans', { returnObjects: true });

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white">
      {/* Hero */}
      <section className="pt-24 pb-16 px-4 bg-white text-center">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 sm:mb-6 md:mb-6">
            {t('partners.hero.heading')}
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-6 sm:mb-8 md:mb-8 max-w-2xl mx-auto">
            {t('partners.hero.subtitle')}
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center px-6 sm:px-8 md:px-10 py-3 sm:py-3 md:py-4 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors text-sm sm:text-base md:text-lg"
          >
            {t('partners.hero.cta')}
            <ArrowRight className="ml-2 h-4 sm:h-5 md:h-6 w-4 sm:w-5 md:w-6" />
          </Link>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-12 sm:py-16 md:py-20 px-4 bg-green-50">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl md:text-3xl font-bold text-gray-900 mb-4 sm:mb-6 md:mb-6">
            {t('partners.benefitsSection.heading')}
          </h2>
          <p className="text-base sm:text-lg md:text-lg text-gray-600 mb-8 sm:mb-10 md:mb-10">
            {t('partners.benefitsSection.subtitle')}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8 md:gap-10 text-left">
            {benefits.map((benefit, index) => {
              const Icon = iconMap[benefit.icon] || CheckCircle;
              return (
                <div key={index} className="flex items-start space-x-4 p-4 sm:p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                  <Icon className="h-5 sm:h-6 md:h-7 w-5 sm:w-6 md:w-7 text-green-600 mt-1" />
                  <div>
                    <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-900">{benefit.title}</h3>
                    <p className="text-sm sm:text-base md:text-sm text-gray-600">{benefit.description}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Onboarding Process */}
      <section className="py-12 sm:py-16 md:py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl md:text-3xl font-bold text-gray-900 mb-4 sm:mb-6 md:mb-6">
            {t('partners.onboardingSection.heading')}
          </h2>
          <p className="text-base sm:text-lg md:text-lg text-gray-600 mb-8 sm:mb-10 md:mb-12">
            {t('partners.onboardingSection.subtitle')}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 sm:gap-8 md:gap-10">
            {onboardingSteps.map((step, index) => (
              <div key={index} className="bg-green-50 p-4 sm:p-6 md:p-8 rounded-lg shadow-lg text-center">
                <div className="w-10 sm:w-12 md:w-14 h-10 sm:h-12 md:h-14 bg-green-600 text-white font-bold flex items-center justify-center rounded-full mx-auto mb-2 sm:mb-4 md:mb-4">
                  {step.step}
                </div>
                <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-900">{step.title}</h3>
                <p className="text-sm sm:text-base md:text-sm text-gray-600 mt-2">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Commitments CTA */}
      <section className="py-12 sm:py-16 md:py-20 px-4 bg-green-50 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-3xl font-bold text-gray-900 mb-4 sm:mb-6 md:mb-6">
            {t('partners.commitmentsSection.heading')}
          </h2>
          <p className="text-base sm:text-lg md:text-lg text-gray-600 mb-4 sm:mb-6 md:mb-6">
            {t('partners.commitmentsSection.subtitle')}
          </p>
          <ul className="text-left text-sm sm:text-base md:text-sm text-gray-700 space-y-2 mx-auto max-w-2xl">
            {commitments.map((point, idx) => (
              <li key={idx}>{point}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-12 sm:py-16 md:py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl md:text-3xl font-bold text-gray-900 mb-4 sm:mb-6 md:mb-6">
            {t('partners.pricingSection.heading')}
          </h2>
          <p className="text-base sm:text-lg md:text-lg text-gray-600 mb-8 sm:mb-10 md:mb-10">
            {t('partners.pricingSection.subtitle')}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 md:gap-10 text-center">
            {pricingPlans.map((plan, idx) => (
              <div key={idx} className="border rounded-lg p-4 sm:p-6 md:p-8 shadow">
                <h3 className="font-semibold text-lg sm:text-xl md:text-2xl mb-2">{plan.title}</h3>
                <p className="text-green-600 font-bold text-xl sm:text-2xl md:text-3xl">{plan.price}</p>
                <p className="text-sm sm:text-base md:text-sm text-gray-600 mt-2">{plan.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Partners