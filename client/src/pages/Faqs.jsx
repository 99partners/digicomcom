import React from 'react';
import { Plus } from 'lucide-react';

const faqs = [
  {
    question: 'How do I join ONDC through 99digicom.com?',
    answer: 'Follow our simple 4-step onboarding process: Submit application, review & approval, setup & training, then go live. Our team will guide you through each step.'
  },
  {
    question: 'What are the costs of partnering with 99digicom.com?',
    answer: 'We have transparent pricing: ₹10,000 one-time setup fee and ₹2,999 monthly subscription. Optional add-ons include digital marketing (₹5,000/month) and logistics support (₹3,000/month).'
  },
  {
    question: 'Can I cancel my subscription anytime?',
    answer: 'Yes, you can cancel your subscription at any time with no penalties or hidden fees. We believe in flexible partnerships that work for your business.'
  },
  {
    question: 'What kind of support do you provide?',
    answer: 'We offer 24/7 technical support, dedicated account managers, comprehensive training resources, and regular performance analytics to ensure your success.'
  },
  {
    question: 'How long does ONDC integration take?',
    answer: 'Typically, ONDC integration takes 7-14 business days after approval. This includes setup, testing, and going live on the network.'
  },
  {
    question: 'Do you provide marketing support?',
    answer: 'Yes, we offer comprehensive digital marketing services including SEO, social media marketing, and targeted advertising campaigns as optional add-ons.'
  }
];

const FAQs = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
          <p className="text-xl text-gray-600">Get answers to common questions about our platform and services.</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <details key={index} className="bg-gray-50 rounded-lg p-6 group">
              <summary className="flex items-center justify-between cursor-pointer font-semibold text-gray-900 text-lg">
                <span>{faq.question}</span>
                <Plus className="h-5 w-5 text-blue-600 group-open:rotate-45 transition-transform duration-300" />
              </summary>
              <div className="mt-4 text-gray-600 leading-relaxed">
                {faq.answer}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQs;
