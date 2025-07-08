import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import axiosInstance from '../../config/api.config';
import {
    CheckCircle,
    XCircle,
    Clock,
    ChevronDown,
    ChevronUp,
    Search,
    Filter,
} from 'lucide-react';

const PartnerRequestManagement = () => {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [expandedRequest, setExpandedRequest] = useState(null);
    const [filter, setFilter] = useState('all'); // all, pending, approved, rejected
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchRequests();
    }, []);

    const fetchRequests = async () => {
        try {
            const response = await axiosInstance.get('/api/admin/partner-requests');
            if (response.data.success) {
                setRequests(response.data.data);
            }
        } catch (error) {
            console.error('Error fetching partner requests:', error);
            toast.error('Failed to load partner requests');
        } finally {
            setLoading(false);
        }
    };

    const handleStatusChange = async (requestId, newStatus) => {
        try {
            const response = await axiosInstance.put(`/api/admin/partner-requests/${requestId}/status`, {
                status: newStatus
            });
            if (response.data.success) {
                setRequests(requests.map(req => 
                    req._id === requestId ? { ...req, status: newStatus } : req
                ));
                toast.success(`Request ${newStatus} successfully`);
            }
        } catch (error) {
            console.error('Error updating request status:', error);
            toast.error('Failed to update request status');
        }
    };

    const getStatusBadge = (status) => {
        switch (status) {
            case 'approved':
                return (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        <CheckCircle className="w-4 h-4 mr-1" />
                        Approved
                    </span>
                );
            case 'rejected':
                return (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                        <XCircle className="w-4 h-4 mr-1" />
                        Rejected
                    </span>
                );
            default:
                return (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                        <Clock className="w-4 h-4 mr-1" />
                        Pending
                    </span>
                );
        }
    };

    const filteredRequests = requests.filter(request => {
        const matchesFilter = filter === 'all' || request.status === filter;
        const matchesSearch = searchTerm === '' || 
            Object.values(request).some(value => 
                String(value).toLowerCase().includes(searchTerm.toLowerCase())
            );
        return matchesFilter && matchesSearch;
    });

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-green-500 border-t-transparent"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Partner Requests</h1>
                    <p className="mt-2 text-sm text-gray-600">
                        Manage and review partner requests from the platform
                    </p>
                </div>

                {/* Filters and Search */}
                <div className="mb-6 flex flex-col sm:flex-row gap-4">
                    <div className="relative flex-1">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Search className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            type="text"
                            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 sm:text-sm"
                            placeholder="Search requests..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="flex items-center gap-2">
                        <Filter className="h-5 w-5 text-gray-400" />
                        <select
                            className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-md"
                            value={filter}
                            onChange={(e) => setFilter(e.target.value)}
                        >
                            <option value="all">All Requests</option>
                            <option value="pending">Pending</option>
                            <option value="approved">Approved</option>
                            <option value="rejected">Rejected</option>
                        </select>
                    </div>
                </div>

                {/* Requests List */}
                <div className="bg-white shadow overflow-hidden sm:rounded-md">
                    <ul className="divide-y divide-gray-200">
                        {filteredRequests.map((request) => (
                            <li key={request._id}>
                                <div className="px-4 py-4 sm:px-6">
                                    <div className="flex items-center justify-between">
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <h3 className="text-lg font-medium text-gray-900">
                                                        {request.serviceType.toUpperCase()} Request
                                                    </h3>
                                                    <p className="mt-1 text-sm text-gray-500">
                                                        Submitted on {new Date(request.createdAt).toLocaleDateString()}
                                                    </p>
                                                </div>
                                                {getStatusBadge(request.status)}
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => setExpandedRequest(expandedRequest === request._id ? null : request._id)}
                                            className="ml-4 text-gray-400 hover:text-gray-500"
                                        >
                                            {expandedRequest === request._id ? (
                                                <ChevronUp className="h-5 w-5" />
                                            ) : (
                                                <ChevronDown className="h-5 w-5" />
                                            )}
                                        </button>
                                    </div>

                                    {expandedRequest === request._id && (
                                        <div className="mt-4 border-t border-gray-200 pt-4">
                                            <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
                                                {request.marketplaces && request.marketplaces.length > 0 && (
                                                    <div className="sm:col-span-2">
                                                        <dt className="text-sm font-medium text-gray-500">Marketplaces</dt>
                                                        <dd className="mt-1 flex flex-wrap gap-2">
                                                            {request.marketplaces.map((marketplace) => (
                                                                <span
                                                                    key={marketplace}
                                                                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                                                                >
                                                                    {marketplace}
                                                                </span>
                                                            ))}
                                                        </dd>
                                                    </div>
                                                )}

                                                {request.serviceAccountNumber && (
                                                    <div>
                                                        <dt className="text-sm font-medium text-gray-500">Service Account Number</dt>
                                                        <dd className="mt-1 text-sm text-gray-900">{request.serviceAccountNumber}</dd>
                                                    </div>
                                                )}

                                                <div>
                                                    <dt className="text-sm font-medium text-gray-500">GST Status</dt>
                                                    <dd className="mt-1 text-sm text-gray-900">
                                                        {request.hasGST === 'yes' ? (
                                                            <>GST Number: {request.gstNumber}</>
                                                        ) : (
                                                            'No GST'
                                                        )}
                                                    </dd>
                                                </div>

                                                {request.monthlyOnlineSales && (
                                                    <div>
                                                        <dt className="text-sm font-medium text-gray-500">Monthly Online Sales</dt>
                                                        <dd className="mt-1 text-sm text-gray-900">{request.monthlyOnlineSales}</dd>
                                                    </div>
                                                )}

                                                {request.marketingServices && Object.values(request.marketingServices).some(Boolean) && (
                                                    <div className="sm:col-span-2">
                                                        <dt className="text-sm font-medium text-gray-500">Marketing Services</dt>
                                                        <dd className="mt-1 grid grid-cols-1 gap-2 sm:grid-cols-2">
                                                            {Object.entries(request.marketingServices)
                                                                .filter(([_, value]) => value)
                                                                .map(([service]) => (
                                                                    <span
                                                                        key={service}
                                                                        className="inline-flex items-center text-sm text-gray-900"
                                                                    >
                                                                        <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                                                                        {service.replace(/([A-Z])/g, ' $1').trim()}
                                                                    </span>
                                                                ))}
                                                        </dd>
                                                    </div>
                                                )}

                                                {request.additionalNotes && (
                                                    <div className="sm:col-span-2">
                                                        <dt className="text-sm font-medium text-gray-500">Additional Notes</dt>
                                                        <dd className="mt-1 text-sm text-gray-900">{request.additionalNotes}</dd>
                                                    </div>
                                                )}
                                            </dl>

                                            {request.status === 'pending' && (
                                                <div className="mt-6 flex gap-3">
                                                    <button
                                                        onClick={() => handleStatusChange(request._id, 'approved')}
                                                        className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                                                    >
                                                        <CheckCircle className="h-4 w-4 mr-2" />
                                                        Approve
                                                    </button>
                                                    <button
                                                        onClick={() => handleStatusChange(request._id, 'rejected')}
                                                        className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                                                    >
                                                        <XCircle className="h-4 w-4 mr-2" />
                                                        Reject
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default PartnerRequestManagement; 