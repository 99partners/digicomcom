import { useState, useEffect } from 'react';
import { 
  CheckCircle, 
  XCircle, 
  Clock, 
  PhoneCall, 
  PlayCircle,
  RefreshCcw,
  Search,
  ChevronDown,
  Filter
} from 'lucide-react';

const AMSSubmissions = () => {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const statusIcons = {
    pending: <Clock className="h-5 w-5 text-yellow-500" />,
    contacted: <PhoneCall className="h-5 w-5 text-blue-500" />,
    'in-progress': <PlayCircle className="h-5 w-5 text-purple-500" />,
    completed: <CheckCircle className="h-5 w-5 text-green-500" />,
    rejected: <XCircle className="h-5 w-5 text-red-500" />
  };

  const fetchSubmissions = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://99digicom.com/api/platform-ams/submissions', {
        credentials: 'include'
      });
      const data = await response.json();
      
      if (data.success) {
        setSubmissions(data.data);
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError('Failed to fetch submissions');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, newStatus) => {
    try {
      const response = await fetch(`http://99digicom.com/api/platform-ams/submissions/${id}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ status: newStatus })
      });

      const data = await response.json();
      
      if (data.success) {
        // Update the local state
        setSubmissions(submissions.map(sub => 
          sub._id === id ? { ...sub, status: newStatus } : sub
        ));
      } else {
        alert('Error updating status: ' + data.message);
      }
    } catch (err) {
      alert('Failed to update status');
      console.error(err);
    }
  };

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const filteredSubmissions = submissions.filter(sub => {
    const matchesFilter = filter === 'all' || sub.status === filter;
    const matchesSearch = searchTerm === '' || 
      sub.businessName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sub.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sub.phone.includes(searchTerm);
    return matchesFilter && matchesSearch;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 p-4">
        <p>{error}</p>
        <button 
          onClick={fetchSubmissions}
          className="mt-4 flex items-center gap-2 mx-auto px-4 py-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100"
        >
          <RefreshCcw className="h-4 w-4" />
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Platform AMS Submissions</h2>
        <button 
          onClick={fetchSubmissions}
          className="flex items-center gap-2 px-4 py-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100"
        >
          <RefreshCcw className="h-4 w-4" />
          Refresh
        </button>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-wrap gap-4 mb-6">
        <div className="flex-1 min-w-[200px]">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search by business name, email, or phone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
        </div>
        <div className="relative">
          <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent appearance-none bg-white"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="contacted">Contacted</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
            <option value="rejected">Rejected</option>
          </select>
          <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
        </div>
      </div>

      {/* Submissions List */}
      <div className="space-y-4">
        {filteredSubmissions.length === 0 ? (
          <p className="text-center text-gray-500 py-8">No submissions found</p>
        ) : (
          filteredSubmissions.map((submission) => (
            <div key={submission._id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex flex-wrap gap-4 justify-between items-start">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-800">{submission.businessName}</h3>
                  <div className="mt-2 space-y-1 text-sm text-gray-600">
                    <p className="flex items-center gap-2">
                      <span className="font-medium">Contact:</span> {submission.contactPerson}
                    </p>
                    <p className="flex items-center gap-2">
                      <span className="font-medium">Email:</span> {submission.email}
                    </p>
                    <p className="flex items-center gap-2">
                      <span className="font-medium">Phone:</span> {submission.phone}
                    </p>
                    {submission.website && (
                      <p className="flex items-center gap-2">
                        <span className="font-medium">Website:</span> 
                        <a href={submission.website} target="_blank" rel="noopener noreferrer" 
                           className="text-green-600 hover:underline">
                          {submission.website}
                        </a>
                      </p>
                    )}
                  </div>
                  
                  {/* Services and Platforms */}
                  <div className="mt-4 space-y-2">
                    <div>
                      <p className="font-medium text-sm text-gray-700">Services Needed:</p>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {submission.servicesNeeded.map((service, idx) => (
                          <span key={idx} className="px-2 py-1 bg-green-50 text-green-600 rounded text-xs">
                            {service}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="font-medium text-sm text-gray-700">Platforms:</p>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {submission.platforms.map((platform, idx) => (
                          <span key={idx} className="px-2 py-1 bg-blue-50 text-blue-600 rounded text-xs">
                            {platform}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Additional Information */}
                  <div className="mt-4">
                    <p className="font-medium text-sm text-gray-700">Additional Notes:</p>
                    <p className="mt-1 text-sm text-gray-600">{submission.additionalNotes || 'No additional notes'}</p>
                  </div>
                </div>

                {/* Status Section */}
                <div className="min-w-[200px]">
                  <div className="flex items-center gap-2 mb-4">
                    {statusIcons[submission.status]}
                    <span className="capitalize text-sm font-medium">{submission.status}</span>
                  </div>
                  <select
                    value={submission.status}
                    onChange={(e) => updateStatus(submission._id, e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value="pending">Pending</option>
                    <option value="contacted">Contacted</option>
                    <option value="in-progress">In Progress</option>
                    <option value="completed">Completed</option>
                    <option value="rejected">Rejected</option>
                  </select>
                  <p className="text-xs text-gray-500 mt-2">
                    Submitted: {new Date(submission.submittedAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AMSSubmissions; 