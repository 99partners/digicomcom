import { Helmet } from "react-helmet"
import React, { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';

const faqs = [
  {
    category: 'About 99digicom',
    questions: [
      {
        question: 'What makes 99digicom different from other agencies?',
        answer: 'We combine platform mastery (Amazon, Flipkart, ONDC, Swiggy, etc.) with end-to-end solutions – from setup and account management to ads and co-branding. Unlike niche players, we orchestrate unified strategies across all channels for maximum impact.',
      },
      {
        question: 'Do you work with brands outside India?',
        answer: 'Yes! While we specialize in Indian marketplaces (Flipkart, Meesho, ONDC), our advertising and co-branding strategies serve global brands entering India or leveraging cross-border e-commerce platforms.',
      },
    ],
  },
  {
    category: 'Account Setup & Management',
    questions: [
      {
        question: 'How long does it take to onboard our brand?',
        answer: 'Platform enablement takes 7–14 days (depending on catalog complexity). Account management begins immediately after onboarding. Advertising/co-branding campaigns launch in 2–3 weeks post-strategy finalization.',
      },
      {
        question: 'What’s included in your Account Management service?',
        answer: 'Full lifecycle support: Daily platform operations (listings, inventory, orders), performance monitoring & reporting, compliance/issue resolution, optimizing catalog content & promotions, coordinating with marketplace support teams.',
      },
      {
        question: 'How do you measure success for Platform Enablement/Account Management?',
        answer: 'We track platform-specific KPIs: Sales volume & market share, account health metrics (e.g., Amazon Seller Rating), listing visibility & conversion rates, operational efficiency (inventory/order errors).',
      },
      {
        question: 'What if we only need one service (e.g., ads but not account management)?',
        answer: 'No problem! Services are modular. We’ll align with your internal teams to ensure seamless integration (e.g., sharing ad performance data with your sales ops).',
      },
    ],
  },
  {
    category: 'Co-Branding & Collaboration',
    questions: [
      {
        question: 'How do co-branding partnerships work?',
        answer: 'We identify brands with synergistic audiences, negotiate terms, then co-create campaigns (e.g., joint social contests, bundled products, co-hosted webinars). We handle strategy, execution, and performance tracking for both partners.',
      },
    ],
  },
  {
    category: 'Marketing & Promotions',
    questions: [
      {
        question: 'Can you manage advertising across multiple platforms?',
        answer: 'Absolutely. Our eCommerce Advertising service runs unified campaigns on Amazon Ads, Flipkart Ads, Swiggy/Zomato Promotions, and social media – all optimized through a single dashboard to maximize ROAS.',
      },
      {
        question: 'What industries do you specialize in?',
        answer: 'We serve FMCG, electronics, fashion, home goods, and food brands – especially those scaling on marketplaces. Our ONDC expertise also supports hyperlocal businesses (pharmacies, groceries, services).',
      },
    ],
  },
  {
    category: 'Contracts & Reporting',
    questions: [
      {
        question: 'Are there long-term contracts?',
        answer: 'We offer flexible engagements (monthly/quarterly). Most clients start with a 3-month pilot to validate results before scaling.',
      },
      {
        question: 'How do you report results?',
        answer: 'Custom dashboards track KPIs like: Platforms: Sales growth, ROI, traffic; Ads: ROAS, CPC, new customer acquisition; Co-branding: Shared lead gen, campaign reach. Bi-weekly reviews + quarterly strategy audits included.',
      },
      {
        question: 'How do you stay updated with platform changes (e.g., ONDC/Flipkart updates)?',
        answer: 'Our team holds platform certifications, attends beta programs, and maintains direct partner relationships. We share critical updates via monthly client briefings and agile strategy tweaks.',
      },
    ],
  },
];

const Faqs = () => {
  // Scroll to top on component mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [searchTerm, setSearchTerm] = useState('');
  const [filteredFAQs, setFilteredFAQs] = useState(faqs);

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
            faq.question.toLowerCase().includes(term) ||
            faq.answer.toLowerCase().includes(term)
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
      <Helmet>
        <title>Frequently Asked Questions | 99DigiCom Digital Commerce Solutions</title>
        <meta name="description" content="Find answers to common questions about our digital commerce services, platform enablement, account management, co-branding partnerships, and marketing solutions." />
        <meta name="keywords" content="digital commerce FAQ, ecommerce questions, ONDC help, marketplace management FAQ" />
        <link rel="canonical" href={window.location.href} />
        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>
      </Helmet>

      <main className="py-20 bg-white text-gray-800">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-green-700 mb-4">Frequently Asked Questions</h1>
            <p className="text-lg text-gray-600">Get answers to common questions about our platform and services.</p>
          </div>

          {/* Search Bar */}
          <div className="mb-12 sticky top-0 z-10 bg-white py-4">
            <label className="sr-only" htmlFor="faq-search">Search FAQs</label>
            <input
              type="search"
              id="faq-search"
              placeholder="🔎 Type your question here..."
              value={searchTerm}
              onChange={handleSearch}
              className="w-full p-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600 text-lg"
              aria-label="Search frequently asked questions"
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
                  <p className="text-gray-600">No results found.</p>
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