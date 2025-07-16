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
    Eye,
    Calendar,
    User,
    Mail,
    Phone,
    Building,
    Package,
    DollarSign,
    TrendingUp,
    Shield,
    FileText,
    Tag
} from 'lucide-react';

const PartnerRequestManagement = () => {
    const [submissions, setSubmissions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [expandedSubmission, setExpandedSubmission] = useState(null);
    const [filter, setFilter] = useState('all'); // all, pending, approved, rejected, in_review
    const [formTypeFilter, setFormTypeFilter] = useState('all'); // all, platformams, ams, advertising, cobranding
    const [searchTerm, setSearchTerm] = useState('');
    const [stats, setStats] = useState({});

    useEffect(() => {
        fetchSubmissions();
    }, []);

    const fetchSubmissions = async () => {
        try {
            const response = await axiosInstance.get('/api/admin/form-submissions');
            if (response.data.success) {
                setSubmissions(response.data.data);
                setStats(response.data.stats);
            }
        } catch (error) {
            console.error('Error fetching form submissions:', error);
            toast.error('Failed to load form submissions');
        } finally {
            setLoading(false);
        }
    };

    const handleStatusChange = async (submissionId, newStatus, formType) => {
        try {
            const response = await axiosInstance.put(`/api/admin/form-submissions/${submissionId}/status`, {
                status: newStatus,
                formType: formType
            });
            if (response.data.success) {
                setSubmissions(submissions.map(sub => 
                    sub._id === submissionId ? { ...sub, status: newStatus } : sub
                ));
                toast.success(`Form submission ${newStatus} successfully`);
            }
        } catch (error) {
            console.error('Error updating submission status:', error);
            toast.error('Failed to update submission status');
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
            case 'in_review':
                return (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        <Eye className="w-4 h-4 mr-1" />
                        In Review
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

    const getFormTypeBadge = (formType) => {
        const badges = {
            platformams: { label: 'Platform AMS', color: 'bg-purple-100 text-purple-800' },
            ams: { label: 'AMS', color: 'bg-blue-100 text-blue-800' },
            advertising: { label: 'Marketing', color: 'bg-pink-100 text-pink-800' },
            cobranding: { label: 'Co-Branding', color: 'bg-indigo-100 text-indigo-800' }
        };
        
        const badge = badges[formType] || { label: formType, color: 'bg-gray-100 text-gray-800' };
        
        return (
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${badge.color}`}>
                <Tag className="w-4 h-4 mr-1" />
                {badge.label}
            </span>
        );
    };

    const renderSubmissionDetails = (submission) => {
        const { data, formType } = submission;
        
        return (
            <div className="mt-4 border-t border-gray-200 pt-4">
                <div className="grid grid-cols-1 gap-6">
                    {/* User Information */}
                    {submission.user && (
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <h4 className="text-sm font-medium text-gray-900 mb-3 flex items-center">
                                <User className="w-4 h-4 mr-2" />
                                User Information
                            </h4>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                <div className="flex items-center">
                                    <User className="w-4 h-4 text-gray-400 mr-2" />
                                    <span className="text-sm text-gray-900">{submission.user.name}</span>
                                </div>
                                <div className="flex items-center">
                                    <Mail className="w-4 h-4 text-gray-400 mr-2" />
                                    <span className="text-sm text-gray-900">{submission.user.email}</span>
                                </div>
                                {submission.user.phone && (
                                    <div className="flex items-center">
                                        <Phone className="w-4 h-4 text-gray-400 mr-2" />
                                        <span className="text-sm text-gray-900">{submission.user.phone}</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Form-specific data */}
                    <div className="bg-white border border-gray-200 p-4 rounded-lg">
                        <h4 className="text-sm font-medium text-gray-900 mb-3 flex items-center">
                            <FileText className="w-4 h-4 mr-2" />
                            Form Details
                        </h4>
                        
                        {/* Common fields */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                            {data.hasGST && (
                                <div>
                                    <dt className="text-sm font-medium text-gray-500 flex items-center">
                                        <Shield className="w-4 h-4 mr-1" />
                                        GST Status
                                    </dt>
                                    <dd className="mt-1 text-sm text-gray-900">
                                        {data.hasGST === 'yes' ? (
                                            <>GST Number: {data.gstNumber}</>
                                        ) : (
                                            'No GST'
                                        )}
                                    </dd>
                                </div>
                            )}
                            
                            {data.monthlySales && (
                                <div>
                                    <dt className="text-sm font-medium text-gray-500 flex items-center">
                                        <DollarSign className="w-4 h-4 mr-1" />
                                        Monthly Sales
                                    </dt>
                                    <dd className="mt-1 text-sm text-gray-900">{data.monthlySales}</dd>
                                </div>
                            )}
                        </div>

                        {/* Marketplaces */}
                        {data.marketplaces && (
                            <div className="mb-4">
                                <dt className="text-sm font-medium text-gray-500 mb-2">Marketplaces</dt>
                                <dd className="flex flex-wrap gap-2">
                                    {Object.entries(data.marketplaces)
                                        .filter(([_, value]) => value)
                                        .map(([marketplace]) => (
                                            <span
                                                key={marketplace}
                                                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                                            >
                                                {marketplace.toUpperCase()}
                                            </span>
                                        ))}
                                </dd>
                            </div>
                        )}

                        {/* Form-specific fields */}
                        {formType === 'ams' && data.serviceAccountNumber && (
                            <div className="mb-4">
                                <dt className="text-sm font-medium text-gray-500">Service Account Number</dt>
                                <dd className="mt-1 text-sm text-gray-900">{data.serviceAccountNumber}</dd>
                            </div>
                        )}

                        {formType === 'advertising' && (
                            <div className="space-y-4">
                                {data.selectedPlan && (
                                    <div>
                                        <dt className="text-sm font-medium text-gray-500">Selected Plan</dt>
                                        <dd className="mt-1 text-sm text-gray-900">{data.selectedPlan}</dd>
                                    </div>
                                )}
                                {data.services && (
                                    <div>
                                        <dt className="text-sm font-medium text-gray-500 mb-2">Services</dt>
                                        <dd className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                                            {Object.entries(data.services)
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
                            </div>
                        )}

                        {formType === 'cobranding' && (
                            <div className="space-y-4">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {data.isManufacturer !== undefined && (
                                        <div>
                                            <dt className="text-sm font-medium text-gray-500">Manufacturer</dt>
                                            <dd className="mt-1 text-sm text-gray-900">
                                                {data.isManufacturer ? 'Yes' : 'No'}
                                            </dd>
                                        </div>
                                    )}
                                    {data.establishmentYear && (
                                        <div>
                                            <dt className="text-sm font-medium text-gray-500">Established Year</dt>
                                            <dd className="mt-1 text-sm text-gray-900">{data.establishmentYear}</dd>
                                        </div>
                                    )}
                                    {data.companyName && (
                                        <div>
                                            <dt className="text-sm font-medium text-gray-500">Company Name</dt>
                                            <dd className="mt-1 text-sm text-gray-900">{data.companyName}</dd>
                                        </div>
                                    )}
                                    {data.numberOfProducts && (
                                        <div>
                                            <dt className="text-sm font-medium text-gray-500">Number of Products</dt>
                                            <dd className="mt-1 text-sm text-gray-900">{data.numberOfProducts}</dd>
                                        </div>
                                    )}
                                    {data.panNumber && (
                                        <div>
                                            <dt className="text-sm font-medium text-gray-500">PAN Number</dt>
                                            <dd className="mt-1 text-sm text-gray-900">{data.panNumber}</dd>
                                        </div>
                                    )}
                                </div>
                                
                                {data.productCategories && (
                                    <div>
                                        <dt className="text-sm font-medium text-gray-500 mb-2">Product Categories</dt>
                                        <dd className="flex flex-wrap gap-2">
                                            {data.productCategories.map((category, index) => (
                                                <span
                                                    key={index}
                                                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800"
                                                >
                                                    {category}
                                                </span>
                                            ))}
                                        </dd>
                                    </div>
                                )}
                                
                                {data.productUSP && (
                                    <div>
                                        <dt className="text-sm font-medium text-gray-500">Product USP</dt>
                                        <dd className="mt-1 text-sm text-gray-900">{data.productUSP}</dd>
                                    </div>
                                )}
                                
                                {data.productDescription && (
                                    <div>
                                        <dt className="text-sm font-medium text-gray-500">Product Description</dt>
                                        <dd className="mt-1 text-sm text-gray-900">{data.productDescription}</dd>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                {/* Action buttons */}
                {['pending', 'in_review'].includes(submission.status) && (
                    <div className="mt-6 flex gap-3">
                        <button
                            onClick={() => handleStatusChange(submission._id, 'approved', submission.formType)}
                            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                        >
                            <CheckCircle className="h-4 w-4 mr-2" />
                            Approve
                        </button>
                        <button
                            onClick={() => handleStatusChange(submission._id, 'rejected', submission.formType)}
                            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                        >
                            <XCircle className="h-4 w-4 mr-2" />
                            Reject
                        </button>
                        {submission.status === 'pending' && (
                            <button
                                onClick={() => handleStatusChange(submission._id, 'in_review', submission.formType)}
                                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                <Eye className="h-4 w-4 mr-2" />
                                Mark as In Review
                            </button>
                        )}
                    </div>
                )}
            </div>
        );
    };

    const filteredSubmissions = submissions.filter(submission => {
        const matchesStatusFilter = filter === 'all' || submission.status === filter;
        const matchesFormTypeFilter = formTypeFilter === 'all' || submission.formType === formTypeFilter;
        const matchesSearch = searchTerm === '' || 
            (submission.user?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
             submission.user?.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
             submission.formType.toLowerCase().includes(searchTerm.toLowerCase()));
        return matchesStatusFilter && matchesFormTypeFilter && matchesSearch;
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
                    <h1 className="text-3xl font-bold text-gray-900">Form Submissions</h1>
                    <p className="mt-2 text-sm text-gray-600">
                        Manage all form submissions from different services
                    </p>
                    
                    {/* Stats */}
                    <div className="mt-4 grid grid-cols-1 sm:grid-cols-5 gap-4">
                        <div className="bg-white p-4 rounded-lg shadow">
                            <div className="text-2xl font-bold text-gray-900">{stats.total || 0}</div>
                            <div className="text-sm text-gray-600">Total</div>
                        </div>
                        <div className="bg-white p-4 rounded-lg shadow">
                            <div className="text-2xl font-bold text-purple-600">{stats.platformAMS || 0}</div>
                            <div className="text-sm text-gray-600">Platform AMS</div>
                        </div>
                        <div className="bg-white p-4 rounded-lg shadow">
                            <div className="text-2xl font-bold text-blue-600">{stats.ams || 0}</div>
                            <div className="text-sm text-gray-600">AMS</div>
                        </div>
                        <div className="bg-white p-4 rounded-lg shadow">
                            <div className="text-2xl font-bold text-pink-600">{stats.advertising || 0}</div>
                            <div className="text-sm text-gray-600">Marketing</div>
                        </div>
                        <div className="bg-white p-4 rounded-lg shadow">
                            <div className="text-2xl font-bold text-indigo-600">{stats.cobranding || 0}</div>
                            <div className="text-sm text-gray-600">Co-Branding</div>
                        </div>
                    </div>
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
                            placeholder="Search by user name, email, or form type..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                            <Filter className="h-5 w-5 text-gray-400" />
                            <select
                                className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-md"
                                value={filter}
                                onChange={(e) => setFilter(e.target.value)}
                            >
                                <option value="all">All Status</option>
                                <option value="pending">Pending</option>
                                <option value="in_review">In Review</option>
                                <option value="approved">Approved</option>
                                <option value="rejected">Rejected</option>
                            </select>
                        </div>
                        <div className="flex items-center gap-2">
                            <select
                                className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-md"
                                value={formTypeFilter}
                                onChange={(e) => setFormTypeFilter(e.target.value)}
                            >
                                <option value="all">All Forms</option>
                                <option value="platformams">Platform AMS</option>
                                <option value="ams">AMS</option>
                                <option value="advertising">Marketing</option>
                                <option value="cobranding">Co-Branding</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Submissions List */}
                <div className="bg-white shadow overflow-hidden sm:rounded-md">
                    <ul className="divide-y divide-gray-200">
                        {filteredSubmissions.length === 0 ? (
                            <li className="px-4 py-8 text-center text-gray-500">
                                No form submissions found matching your criteria.
                            </li>
                        ) : (
                            filteredSubmissions.map((submission) => (
                                <li key={submission._id}>
                                <div className="px-4 py-4 sm:px-6">
                                    <div className="flex items-center justify-between">
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center justify-between">
                                                    <div className="flex items-center space-x-3">
                                                <div>
                                                            <div className="flex items-center space-x-2">
                                                                {getFormTypeBadge(submission.formType)}
                                                                {getStatusBadge(submission.status)}
                                                            </div>
                                                            <p className="mt-2 text-sm text-gray-600 flex items-center">
                                                                <Calendar className="w-4 h-4 mr-1" />
                                                                Submitted on {new Date(submission.createdAt).toLocaleDateString()}
                                                            </p>
                                                            {submission.user && (
                                                                <p className="mt-1 text-sm text-gray-600 flex items-center">
                                                                    <User className="w-4 h-4 mr-1" />
                                                                    {submission.user.name} ({submission.user.email})
                                                                </p>
                                                            )}
                                                        </div>
                                                    </div>
                                            </div>
                                        </div>
                                        <button
                                                onClick={() => setExpandedSubmission(expandedSubmission === submission._id ? null : submission._id)}
                                            className="ml-4 text-gray-400 hover:text-gray-500"
                                        >
                                                {expandedSubmission === submission._id ? (
                                                <ChevronUp className="h-5 w-5" />
                                            ) : (
                                                <ChevronDown className="h-5 w-5" />
                                            )}
                                        </button>
                                    </div>

                                        {expandedSubmission === submission._id && renderSubmissionDetails(submission)}
                                </div>
                            </li>
                            ))
                        )}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default PartnerRequestManagement; 