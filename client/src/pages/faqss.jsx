
import React, { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';

const faqs = [
  {
    category: 'For Product Partners / Sellers',
    questions: [
      {
        question: 'How do I become a seller on 99digicom?',
        answer: 'Fill out the Partner Application Form. Our team will contact you in 2–4 business days.',
      },
      {
        question: 'What documents do I need?',
        answer: 'GST, PAN, bank details, FSSAI (if applicable), product photos, and brand logo.',
      },
      {
        question: 'Do I need to sell on all platforms?',
        answer: 'No. You can choose platforms like ONDC, Amazon, Flipkart, Swiggy, Zomato, etc., based on your category and goals.',
      },
    ],
  },
  {
    category: 'Account Setup & Management',
    questions: [
      {
        question: 'How long does seller account setup take?',
        answer: 'Typically 3–7 working days, depending on the platform.',
      },
      {
        question: 'Can I update product listings myself?',
        answer: 'Yes, or you can opt for our AMS plan, and we’ll manage it for you.',
      },
    ],
  },
  {
    category: 'Co-Branding & Collaboration',
    questions: [
      {
        question: 'What is co-branding?',
        answer: 'It’s a collaboration between two brands for joint marketing or product bundles to reach more customers.',
      },
      {
        question: 'How do I apply for co-branding?',
        answer: 'Use the Co-Branding Application Form. We’ll match you with a relevant partner and help you launch your campaign.',
      },
    ],
  },
  {
    category: 'Marketing & Promotions',
    questions: [
      {
        question: 'Can you run ads for my brand?',
        answer: 'Yes! We run paid campaigns on Amazon, Flipkart, Meta (Instagram/Facebook), and Google.',
      },
      {
        question: 'What’s the minimum marketing budget?',
        answer: 'Starts from ₹4,999/month, plus ad spend. Custom packages available.',
      },
    ],
  },
  {
    category: 'Payments & Fees',
    questions: [
      {
        question: 'How much does it cost to onboard?',
        answer: 'Starting from ₹4,999 one-time. Monthly plans available based on service scope.',
      },
      {
        question: 'Who pays for co-branding promotions?',
        answer: 'Costs are shared between collaborating brands, depending on the campaign design.',
      },
    ],
  },
  {
    category: 'For Customers',
    questions: [
      {
        question: 'How do I place an order?',
        answer: '99digicom does not directly sell products. You’ll be redirected to our partner platforms like Amazon, Flipkart, or ONDC to complete your purchase.',
      },
      {
        question: 'Who handles delivery?',
        answer: 'The respective platform (Amazon, Zomato, etc.) manages delivery, tracking, and customer service.',
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

  return (
    <section className="py-20 bg-white text-gray-800">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-green-700 mb-4">Frequently Asked Questions</h2>
          <p className="text-lg text-gray-600">Get answers to common questions about our platform and services.</p>
        </div>

        {/* Search Bar */}
        <div className="mb-12 sticky top-0 z-10 bg-white py-4">
          <input
            type="text"
            placeholder="🔎 Type your question here..."
            value={searchTerm}
            onChange={handleSearch}
            className="w-full p-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600 text-lg"
          />
          {searchTerm && (
            <div className="mt-2 bg-gray-50 rounded-lg p-4">
              {filteredFAQs.flatMap((category) => category.questions).length === 0 ? (
                <p className="text-gray-600">No results found.</p>
              ) : (
                <ul className="list-disc pl-5 text-gray-600">
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
            <div key={catIndex}>
              <h3 className="text-2xl font-semibold text-green-700 mb-4">{category.category}</h3>
              <div className="space-y-4">
                {category.questions.map((faq, index) => (
                  <details key={index} className="bg-gray-50 rounded-lg p-6 group border border-green-100">
                    <summary className="flex items-center justify-between cursor-pointer font-medium text-gray-900 text-lg">
                      <span>{faq.question}</span>
                      <Plus className="h-5 w-5 text-green-600 group-open:rotate-45 transition-transform duration-300" />
                    </summary>
                    <div className="mt-4 text-gray-600 leading-relaxed">{faq.answer}</div>
                  </details>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Faqs;
