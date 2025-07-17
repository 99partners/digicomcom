import React, { useState, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const FAQ = () => {
    const [expandedCategory, setExpandedCategory] = useState(null);
    const [expandedQuestions, setExpandedQuestions] = useState({});

    const faqs = [
        {
            category: 'About 99digicom',
            questions: [
                {
                    question: 'What makes 99digicom different from other agencies?',
                    answer: 'We combine platform mastery (Amazon, Flipkart, ONDC, Swiggy, etc.) with end-to-end solutions – from setup and account management to ads and co-branding. Unlike niche players, we orchestrate unified strategies across all channels for maximum impact.'
                },
                {
                    question: 'Do you work with brands outside India?',
                    answer: 'Yes! While we specialize in Indian marketplaces (Flipkart, Meesho, ONDC), our advertising and co-branding strategies serve global brands entering India or leveraging cross-border e-commerce platforms.'
                }
            ]
        },
        {
            category: 'Account Setup & Management',
            questions: [
                {
                    question: 'How long does it take to onboard our brand?',
                    answer: 'Platform enablement takes 7–14 days (depending on catalog complexity). Account management begins immediately after onboarding. Advertising/co-branding campaigns launch in 2–3 weeks post-strategy finalization.'
                },
                {
                    question: "What's included in your Account Management service?",
                    answer: 'Full lifecycle support: Daily platform operations (listings, inventory, orders), performance monitoring & reporting, compliance/issue resolution, optimizing catalog content & promotions, coordinating with marketplace support teams.'
                },
                {
                    question: 'How do you measure success for Platform Enablement/Account Management?',
                    answer: 'We track platform-specific KPIs: Sales volume & market share, account health metrics (e.g., Amazon Seller Rating), listing visibility & conversion rates, operational efficiency (inventory/order errors).'
                },
                {
                    question: 'What if we only need one service (e.g., ads but not account management)?',
                    answer: "No problem! Services are modular. We'll align with your internal teams to ensure seamless integration (e.g., sharing ad performance data with your sales ops)."
                }
            ]
        },
        {
            category: 'Co-Branding & Collaboration',
            questions: [
                {
                    question: 'How do co-branding partnerships work?',
                    answer: 'We identify brands with synergistic audiences, negotiate terms, then co-create campaigns (e.g., joint social contests, bundled products, co-hosted webinars). We handle strategy, execution, and performance tracking for both partners.'
                }
            ]
        },
        {
            category: 'Marketing & Promotions',
            questions: [
                {
                    question: 'Can you manage advertising across multiple platforms?',
                    answer: 'Absolutely. Our eCommerce Advertising service runs unified campaigns on Amazon Ads, Flipkart Ads, Swiggy/Zomato Promotions, and social media – all optimized through a single dashboard to maximize ROAS.'
                },
                {
                    question: 'What industries do you specialize in?',
                    answer: 'We serve FMCG, electronics, fashion, home goods, and food brands – especially those scaling on marketplaces. Our ONDC expertise also supports hyperlocal businesses (pharmacies, groceries, services).'
                }
            ]
        },
        {
            category: 'Contracts & Reporting',
            questions: [
                {
                    question: 'Are there long-term contracts?',
                    answer: 'We offer flexible engagements (monthly/quarterly). Most clients start with a 3-month pilot to validate results before scaling.'
                },
                {
                    question: 'How do you report results?',
                    answer: 'Custom dashboards track KPIs like: Platforms: Sales growth, ROI, traffic; Ads: ROAS, CPC, new customer acquisition; Co-branding: Shared lead gen, campaign reach. Bi-weekly reviews + quarterly strategy audits included.'
                },
                {
                    question: 'How do you stay updated with platform changes (e.g., ONDC/Flipkart updates)?',
                    answer: 'Our team holds platform certifications, attends beta programs, and maintains direct partner relationships. We share critical updates via monthly client briefings and agile strategy tweaks.'
                }
            ]
        }
    ];

    const toggleCategory = (category) => {
        setExpandedCategory(expandedCategory === category ? null : category);
    };

    const toggleQuestion = (categoryIndex, questionIndex) => {
        const key = `${categoryIndex}-${questionIndex}`;
        setExpandedQuestions(prev => ({
            ...prev,
            [key]: !prev[key]
        }));
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 py-8">
            <div className="max-w-4xl mx-auto px-4">
                <h1 className="text-3xl font-bold text-center text-gray-700 mb-8">
                    Frequently Asked Questions
                </h1>
                
                <div className="space-y-6">
                    <AnimatePresence>
                        {faqs.map((category, categoryIndex) => (
                            <motion.div
                                key={category.category}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.3, delay: categoryIndex * 0.1 }}
                                className="bg-white rounded-lg shadow-sm overflow-hidden border border-green-50"
                            >
                                <button
                                    onClick={() => toggleCategory(category.category)}
                                    className="w-full px-6 py-4 text-left bg-gradient-to-r from-green-100 to-green-200 text-green-800 font-semibold flex justify-between items-center hover:from-green-200 hover:to-green-300 transition-colors"
                                >
                                    <span>{category.category}</span>
                                    <span className="transform transition-transform duration-200">
                                        {expandedCategory === category.category ? '−' : '+'}
                                    </span>
                                </button>
                                
                                <AnimatePresence>
                                    {expandedCategory === category.category && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3 }}
                                            className="px-6 py-4 space-y-4 bg-white"
                                        >
                                            {category.questions.map((item, questionIndex) => {
                                                const isExpanded = expandedQuestions[`${categoryIndex}-${questionIndex}`];
                                                return (
                                                    <div key={questionIndex} className="border-b border-green-50 last:border-0 pb-4">
                                                        <button
                                                            onClick={() => toggleQuestion(categoryIndex, questionIndex)}
                                                            className="w-full text-left font-medium text-gray-600 flex justify-between items-center hover:text-green-600 transition-colors"
                                                        >
                                                            <span>{item.question}</span>
                                                            <span className="text-green-500 ml-2">
                                                                {isExpanded ? '−' : '+'}
                                                            </span>
                                                        </button>
                                                        
                                                        <AnimatePresence>
                                                            {isExpanded && (
                                                                <motion.p
                                                                    initial={{ opacity: 0, height: 0 }}
                                                                    animate={{ opacity: 1, height: 'auto' }}
                                                                    exit={{ opacity: 0, height: 0 }}
                                                                    transition={{ duration: 0.2 }}
                                                                    className="mt-2 text-gray-500 text-sm"
                                                                >
                                                                    {item.answer}
                                                                </motion.p>
                                                            )}
                                                        </AnimatePresence>
                                                    </div>
                                                );
                                            })}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};

export default FAQ; 