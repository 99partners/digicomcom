"use client";

import { Helmet } from "react-helmet"
import React, { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { useTranslation } from "react-i18next";
import SEO from "../components/SEO";

const Faqs = () => {
  const { t } = useTranslation();
  
  // Scroll to top on component mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [searchTerm, setSearchTerm] = useState('');
  const [filteredFAQs, setFilteredFAQs] = useState([]);

  const categories = [
    { id: 'about', label: t('faq.categories.about') },
    { id: 'accountSetup', label: t('faq.categories.accountSetup') },
    { id: 'cobranding', label: t('faq.categories.cobranding') },
    { id: 'marketing', label: t('faq.categories.marketing') },
    { id: 'contracts', label: t('faq.categories.contracts') }
  ];

  const faqs = categories.map(cat => ({
    category: cat.label,
    questions: t(`faq.questions.${cat.id}`, { returnObjects: true })
  }));

  useEffect(() => {
    setFilteredFAQs(faqs);
  }, []);

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);

    if (term === '') {
      setFilteredFAQs(faqs);
      return;
    }

    const filtered = faqs
      .map((category) => ({
        ...category,
        questions: category.questions.filter(
          (faq) =>
            t(faq.question).toLowerCase().includes(term) ||
            t(faq.answer).toLowerCase().includes(term)
        ),
      }))
      .filter((category) => category.questions.length > 0);

    setFilteredFAQs(filtered);
  };

  // Schema markup for FAQs
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.flatMap(category => 
      category.questions.map(faq => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    )
  };

  return (
    <>
      <SEO
        title={t('faq.seo.title')}
        description={t('faq.seo.description')}
        keywords={t('faq.seo.keywords')}
        canonicalUrl="https://99digicom.com/faq"
        schema={faqSchema}
      />

      <main className="py-20 bg-white text-gray-800">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-green-700 mb-4">{t('faq.title')}</h1>
            <p className="text-lg text-gray-600">{t('faq.description')}</p>
          </div>

          {/* Search Bar */}
          <div className="mb-12 sticky top-0 z-10 bg-white py-4">
            <label className="sr-only" htmlFor="faq-search">Search FAQs</label>
            <input
              type="search"
              id="faq-search"
              placeholder={t("faq.searchPlaceholder")}
              value={searchTerm}
              onChange={handleSearch}
              className="w-full p-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600 text-lg"
              aria-label={t("faq.searchLabel")}
              role="searchbox"
            />
            {searchTerm && (
              <div 
                className="mt-2 bg-gray-50 rounded-lg p-4"
                role="region"
                aria-live="polite"
                aria-label="Search results"
              >
                {filteredFAQs.flatMap((category) => category.questions).length === 0 ? (
                  <p className="text-gray-600">{t("faq.noResults")}</p>
                ) : (
                  <ul className="list-disc pl-5 text-gray-600" role="list">
                    {filteredFAQs
                      .flatMap((category) => category.questions)
                      .slice(0, 5)
                      .map((faq, index) => (
                        <li key={index} className="py-1">{faq.question}</li>
                      ))}
                  </ul>
                )}
              </div>
            )}
          </div>

          {/* Accordion Layout */}
          <div className="space-y-12">
            {filteredFAQs.map((category, catIndex) => (
              <section 
                key={catIndex}
                aria-labelledby={`category-${catIndex}`}
              >
                <h2 
                  id={`category-${catIndex}`}
                  className="text-2xl font-semibold text-green-700 mb-4"
                >
                  {category.category}
                </h2>
                <div className="space-y-4">
                  {category.questions.map((faq, index) => (
                    <details 
                      key={index} 
                      className="bg-gray-50 rounded-lg p-6 group border border-green-100"
                      id={`faq-${catIndex}-${index}`}
                    >
                      <summary 
                        className="flex items-center justify-between cursor-pointer font-medium text-gray-900 text-lg"
                        aria-label={faq.question}
                      >
                        <span>{faq.question}</span>
                        <Plus 
                          className="h-5 w-5 text-green-600 group-open:rotate-45 transition-transform duration-300"
                          aria-hidden="true"
                        />
                      </summary>
                      <div 
                        className="mt-4 text-gray-600 leading-relaxed"
                        role="region"
                        aria-labelledby={`faq-${catIndex}-${index}`}
                      >
                        {faq.answer}
                      </div>
                    </details>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </main>
    </>
  );
};

export default Faqs;