"use client";

import AboutUsImage from '../assets/aboutus.png';
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Helmet } from 'react-helmet';
import {
  Handshake,
  Target,
  Users,
  Globe,
  BarChart,
  ArrowRight,
} from "lucide-react";
import SEO from "../components/SEO";

const About = () => {
  const { t } = useTranslation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const values = [
    {
      icon: Handshake,
      title: t("about.content.section3.values.partnership.title"),
      description: t("about.content.section3.values.partnership.description"),
    },
    {
      icon: Users,
      title: t("about.content.section3.values.enable.title"),
      description: t("about.content.section3.values.enable.description"),
    },
    {
      icon: BarChart,
      title: t("about.content.section3.values.performance.title"),
      description: t("about.content.section3.values.performance.description"),
    },
    {
      icon: Globe,
      title: t("about.content.section3.values.simplify.title"),
      description: t("about.content.section3.values.simplify.description"),
    },
  ];

  const goals = [
    t("about.content.section3.goals.first"),
    t("about.content.section3.goals.second"),
    t("about.content.section3.goals.third"),
    t("about.content.section3.goals.fourth"),
  ];

  return (
    <>
      <SEO
        title={t("about.seo.title")}
        description={t("about.seo.description")}
        keywords={t("about.seo.keywords")}
        canonicalUrl="https://99digicom.com/about"
      />
      <Helmet>
        <meta name="robots" content="noindex, nofollow" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "AboutPage",
          name: "About 99Digicom",
          url: "https://99digicom.com/about"
        })}</script>
      </Helmet>
      <main id="main-content" className="min-h-screen bg-gradient-to-br from-green-50 to-white">
        <article>
          <header className="pt-24 pb-16 px-4 sm:px-6 md:px-10 bg-white">
            <div className="max-w-7xl mx-auto text-center">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                {t("about.hero.title1")}{" "}
                <span className="text-green-600">{t("about.hero.title2")}</span>{" "}
                {t("about.hero.title3")}{" "}
                <span className="text-green-600">{t("about.hero.title4")}</span>
              </h1>
              <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto">
                {t("about.hero.subtitle")}
              </p>
            </div>
          </header>

          <section
            className="py-16 px-4 sm:px-6 md:px-10 bg-white"
            aria-labelledby="mission-vision-heading"
          >
            <div className="max-w-7xl mx-auto space-y-8">
              <div className="text-center">
                <h2
                  id="mission-vision-heading"
                  className="text-3xl font-bold text-gray-900 mb-4"
                >
                  {t("about.content.section1.heading")} & {t("about.content.section2.heading")}
                </h2>
                <p className="text-base sm:text-lg text-gray-600">
                  {t("about.hero.subtitle")}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  t("about.content.section1.heading"),
                  t("about.content.section1.heading"),
                  t("about.content.section2.heading"),
                ].map((title, idx) => (
                  <div
                    key={idx}
                    className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow p-6"
                  >
                    <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                      <Target
                        className="h-6 w-6 text-green-600 mr-2"
                        aria-hidden="true"
                      />{" "}
                      {title}
                    </h3>
                    <p className="text-base text-gray-600">
                      {title === t("about.content.section1.heading")
                        ? t("about.content.section1.paragraph1")
                        : title === t("about.content.section1.heading")
                        ? t("about.content.section1.paragraph2")
                        : t("about.content.section2.paragraph1")}
                    </p>
                  </div>
                ))}
              </div>

              <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                  <Users
                    className="h-6 w-6 text-green-600 mr-2"
                    aria-hidden="true"
                  />{" "}
                  {t("about.content.section3.heading")}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {values.map((val, idx) => (
                    <div
                      key={idx}
                      className="flex items-start space-x-4 p-4 rounded-lg bg-green-50 hover:bg-green-100 transition-colors"
                    >
                      <val.icon
                        className="h-6 w-6 text-green-600 mt-1 flex-shrink-0"
                        aria-hidden="true"
                      />
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">
                          {val.title}
                        </h4>
                        <p className="text-sm text-gray-600">{val.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <Target
                    className="h-6 w-6 text-green-600 mr-2"
                    aria-hidden="true"
                  />{" "}
                  {t("about.content.section3.goals.heading")}
                </h3>
                <ul
                  className="list-disc list-inside text-base text-gray-600 space-y-2"
                  role="list"
                >
                  {goals.map((g, i) => (
                    <li key={i}>{g}</li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          <section
            className="py-16 px-4 sm:px-6 md:px-10 bg-green-50"
            aria-labelledby="journey-heading"
          >
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h2
                  id="journey-heading"
                  className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6"
                >
                  {t("about.content.section3.journey.heading")}
                </h2>
                <p className="text-base sm:text-lg text-gray-600">
                  {t("about.content.section3.journey.paragraph1")}
                </p>
                <p className="text-base sm:text-lg text-gray-600">
                  {t("about.content.section3.journey.paragraph2")}
                </p>
                <p className="text-base sm:text-lg text-gray-600">
                  {t("about.content.section3.journey.paragraph3")}
                </p>
                <p className="text-base sm:text-lg text-gray-600">
                  {t("about.content.section3.journey.paragraph4")}
                </p>
              </div>
              <div className="relative space-y-6">
                <img
                  src={AboutUsImage}
                  alt={t("about.content.section3.journey.imageAlt")}
                  className="rounded-lg shadow-lg w-full h-auto object-cover mb-6"
                  width="600"
                  height="400"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>
          </section>
        </article>
      </main>
    </>
  );
};

export default About;