import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
    CreditCard,
    Download,
    Receipt,
    Calendar
} from 'lucide-react';
import axiosInstance from '../../config/api.config';
import { toast } from 'react-toastify';
import { Helmet } from 'react-helmet';

const Subscriptions = () => {
    const [billingHistory, setBillingHistory] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchBillingHistory();
    }, []);

    const fetchBillingHistory = async () => {
        try {
            setIsLoading(true);
            // You'll need to implement this endpoint in your backend
            const response = await axiosInstance.get('/api/user/billing-history');
            if (response.data.success) {
                setBillingHistory(response.data.billingHistory);
            }
        } catch (error) {
            console.error('Error fetching billing history:', error);
            toast.error('Failed to load billing history');
            setBillingHistory([
                {
                    id: 1,
                    date: '2024-03-10',
                    amount: 299,
                    status: 'paid',
                    invoice: 'INV-2024-001',
                    description: 'Professional Plan - Monthly'
                },
                {
                    id: 2,
                    date: '2024-02-10',
                    amount: 299,
                    status: 'paid',
                    invoice: 'INV-2024-002',
                    description: 'Professional Plan - Monthly'
                },
                {
                    id: 3,
                    date: '2024-01-10',
                    amount: 299,
                    status: 'paid',
                    invoice: 'INV-2024-003',
                    description: 'Professional Plan - Monthly'
                }
            ]);
        } finally {
            setIsLoading(false);
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const handleDownload = async (invoiceId) => {
        try {
            // You'll need to implement this endpoint in your backend
            const response = await axiosInstance.get(`/api/user/invoice/${invoiceId}`, {
                responseType: 'blob'
            });
            
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `invoice-${invoiceId}.pdf`);
            document.body.appendChild(link);
            link.click();
            link.remove();
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Error downloading invoice:', error);
            toast.error('Failed to download invoice');
        }
    };

    if (isLoading) {
        return (
            <main id="main-content" className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 py-8 flex items-center justify-center" aria-busy="true">
                <div className="w-8 h-8 border-4 border-green-500 border-t-transparent rounded-full animate-spin" role="status" aria-label="Loading"></div>
            </main>
        );
    }

    return (
        <main id="main-content" className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 py-8">
            <Helmet>
                <title>Subscriptions | 99Digicom</title>
                <meta name="description" content="View your subscription billing history and download invoices." />
                <link rel="canonical" href="https://99digicom.com/dashboard/subscriptions" />
                <meta property="og:type" content="website" />
                <meta property="og:title" content="Subscriptions | 99Digicom" />
                <meta property="og:description" content="View your subscription billing history and download invoices." />
                <meta property="og:url" content="https://99digicom.com/dashboard/subscriptions" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Subscriptions | 99Digicom" />
                <meta name="twitter:description" content="View your subscription billing history and download invoices." />
                <script type="application/ld+json">{JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "CollectionPage",
                    name: "Subscriptions",
                    url: "https://99digicom.com/dashboard/subscriptions",
                    description: "User subscription billing history"
                })}</script>
            </Helmet>
            <div className="max-w-7xl mx-auto px-2 sm:px-4">
                {/* Billing History */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-xl shadow-lg overflow-hidden border border-green-100"
                >
                    <div className="px-4 sm:px-6 py-4 border-b border-green-100 bg-white">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                            <div className="flex items-center space-x-2">
                                <Receipt className="h-5 w-5 text-green-600" />
                                <h3 className="text-lg font-semibold text-gray-900">Billing History</h3>
                            </div>
                        </div>
                    </div>

                    {billingHistory.length === 0 ? (
                        <div className="px-4 sm:px-6 py-8 text-center text-gray-500">
                            No billing history available
                        </div>
                    ) : (
                        <div className="divide-y divide-green-100">
                            {billingHistory.map((bill) => (
                                <div key={bill.id} className="px-4 sm:px-6 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between hover:bg-green-50 gap-4">
                                    <div className="flex items-center space-x-4 w-full sm:w-auto">
                                        <div className="h-10 w-10 bg-green-100 rounded-lg flex items-center justify-center">
                                            <CreditCard className="h-5 w-5 text-green-600" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-gray-900">
                                                {bill.description}
                                            </p>
                                            <div className="flex items-center space-x-2 text-sm text-gray-500">
                                                <Calendar className="h-4 w-4" />
                                                <span>{formatDate(bill.date)}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
                                        <span className="text-sm font-medium text-gray-900">
                                            ₹{bill.amount}
                                        </span>
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                            bill.status === 'paid' 
                                                ? 'bg-green-100 text-green-800'
                                                : 'bg-yellow-100 text-yellow-800'
                                        }`}>
                                            {bill.status.charAt(0).toUpperCase() + bill.status.slice(1)}
                                        </span>
                                        <button 
                                            onClick={() => handleDownload(bill.invoice)}
                                            className="flex items-center space-x-1 text-green-600 hover:text-green-700"
                                        >
                                            <Download className="h-4 w-4" />
                                            <span className="text-sm">Invoice</span>
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </motion.div>
            </div>
        </main>
    );
};

export default Subscriptions;