import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
    Crown, 
    Check, 
    CreditCard, 
    Calendar, 
    Clock, 
    ArrowRight,
    Shield,
    Zap,
    Users,
    BarChart,
    Settings,
    Star
} from 'lucide-react';

const Subscriptions = () => {
    const [currentPlan, setCurrentPlan] = useState({
        name: 'Professional',
        status: 'active',
        billingCycle: 'monthly',
        nextBilling: '2024-04-10',
        amount: 299
    });

    const plans = [
        {
            name: 'Starter',
            price: 149,
            billing: 'monthly',
            features: [
                'Basic marketplace integration',
                'Standard support',
                'Single platform access',
                'Basic analytics',
                '2 team members'
            ],
            highlighted: false
        },
        {
            name: 'Professional',
            price: 299,
            billing: 'monthly',
            features: [
                'Advanced marketplace integration',
                'Priority support',
                'Multi-platform access',
                'Advanced analytics & reporting',
                '5 team members',
                'Co-branding tools',
                'API access'
            ],
            highlighted: true
        },
        {
            name: 'Enterprise',
            price: 599,
            billing: 'monthly',
            features: [
                'Custom marketplace solutions',
                '24/7 dedicated support',
                'Unlimited platform access',
                'Custom analytics & reporting',
                'Unlimited team members',
                'Advanced co-branding tools',
                'Full API access',
                'Custom integrations'
            ],
            highlighted: false
        }
    ];

    const billingHistory = [
        {
            id: 1,
            date: '2024-03-10',
            amount: 299,
            status: 'paid',
            invoice: 'INV-2024-001'
        },
        {
            id: 2,
            date: '2024-02-10',
            amount: 299,
            status: 'paid',
            invoice: 'INV-2024-002'
        },
        {
            id: 3,
            date: '2024-01-10',
            amount: 299,
            status: 'paid',
            invoice: 'INV-2024-003'
        }
    ];

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 py-8">
            <div className="max-w-7xl mx-auto px-4">
                {/* Current Plan Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-2xl shadow-xl overflow-hidden border border-green-100 mb-8"
                >
                    <div className="bg-gradient-to-r from-green-600 to-green-700 px-6 py-8">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                                <div className="h-12 w-12 bg-white/20 rounded-lg flex items-center justify-center">
                                    <Crown className="h-6 w-6 text-white" />
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold text-white">Current Plan: {currentPlan.name}</h2>
                                    <p className="text-green-100 mt-1">Next billing on {formatDate(currentPlan.nextBilling)}</p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-4">
                                <span className="px-3 py-1 bg-green-500 bg-opacity-30 rounded-full text-white text-sm">
                                    {currentPlan.status === 'active' ? 'Active' : 'Inactive'}
                                </span>
                                <button className="px-4 py-2 bg-white text-green-600 rounded-lg font-medium hover:bg-green-50 transition-colors">
                                    Manage Plan
                                </button>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Subscription Plans */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                    {plans.map((plan, index) => (
                        <motion.div
                            key={plan.name}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className={`bg-white rounded-xl shadow-lg overflow-hidden border ${
                                plan.highlighted ? 'border-green-200 ring-2 ring-green-500' : 'border-green-100'
                            }`}
                        >
                            <div className={`px-6 py-8 ${plan.highlighted ? 'bg-green-50' : ''}`}>
                                <h3 className="text-xl font-bold text-gray-900">{plan.name}</h3>
                                <div className="mt-4 flex items-baseline">
                                    <span className="text-4xl font-bold text-gray-900">${plan.price}</span>
                                    <span className="ml-2 text-gray-500">/month</span>
                                </div>
                                <ul className="mt-6 space-y-4">
                                    {plan.features.map((feature, i) => (
                                        <li key={i} className="flex items-start">
                                            <Check className="h-5 w-5 text-green-500 mr-2" />
                                            <span className="text-gray-600">{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                                <button
                                    className={`mt-8 w-full py-3 px-4 rounded-lg font-medium ${
                                        plan.highlighted
                                            ? 'bg-green-600 text-white hover:bg-green-700'
                                            : 'bg-green-100 text-green-700 hover:bg-green-200'
                                    } transition-colors`}
                                >
                                    {currentPlan.name === plan.name ? 'Current Plan' : 'Select Plan'}
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Billing History */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-xl shadow-lg overflow-hidden border border-green-100"
                >
                    <div className="px-6 py-4 border-b border-green-100">
                        <h3 className="text-lg font-semibold text-gray-900">Billing History</h3>
                    </div>
                    <div className="divide-y divide-green-100">
                        {billingHistory.map((bill) => (
                            <div key={bill.id} className="px-6 py-4 flex items-center justify-between hover:bg-green-50">
                                <div className="flex items-center space-x-4">
                                    <div className="h-10 w-10 bg-green-100 rounded-lg flex items-center justify-center">
                                        <CreditCard className="h-5 w-5 text-green-600" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-900">
                                            Invoice {bill.invoice}
                                        </p>
                                        <p className="text-sm text-gray-500">
                                            {formatDate(bill.date)}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-4">
                                    <span className="text-sm font-medium text-gray-900">
                                        ${bill.amount}
                                    </span>
                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                        bill.status === 'paid' 
                                            ? 'bg-green-100 text-green-800'
                                            : 'bg-yellow-100 text-yellow-800'
                                    }`}>
                                        {bill.status.charAt(0).toUpperCase() + bill.status.slice(1)}
                                    </span>
                                    <button className="text-green-600 hover:text-green-700">
                                        Download
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Subscriptions; 