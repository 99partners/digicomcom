import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import axiosInstance from '../../config/api.config';
import { Helmet } from 'react-helmet';

const MyApplications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const response = await axiosInstance.get('/api/partner/applications');
      if (response.data.success) {
        setApplications(response.data.applications);
      }
    } catch (error) {
      console.error('Error fetching applications:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800',
      approved: 'bg-green-100 text-green-800',
      rejected: 'bg-red-100 text-red-800',
      'in-review': 'bg-blue-100 text-blue-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  if (loading) {
    return (
      <main id="main-content" className="min-h-screen flex items-center justify-center" aria-busy="true">
        <div className="w-8 h-8 border-4 border-green-500 border-t-transparent rounded-full animate-spin" role="status" aria-label="Loading"></div>
      </main>
    );
  }

  return (
    <main id="main-content" className="max-w-5xl mx-auto px-2 sm:px-4 py-8">
      <Helmet>
        <title>My Applications | 99Digicom</title>
        <meta name="description" content="View the status and details of your service applications on 99Digicom." />
        <link rel="canonical" href="https://99digicom.com/dashboard/my-applications" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="My Applications | 99Digicom" />
        <meta property="og:description" content="View the status and details of your service applications on 99Digicom." />
        <meta property="og:url" content="https://99digicom.com/dashboard/my-applications" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="My Applications | 99Digicom" />
        <meta name="twitter:description" content="View the status and details of your service applications on 99Digicom." />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "My Applications",
          url: "https://99digicom.com/dashboard/my-applications",
          description: "User applications overview"
        })}</script>
      </Helmet>
      <h1 className="text-2xl sm:text-3xl font-bold mb-8 text-center sm:text-left">My Applications</h1>
      
      {applications.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg">No applications found. Start by creating a new application.</p>
          <button
            onClick={() => window.location.href = '/dashboard/create-application'}
            className="mt-4 px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
          >
            Create Application
          </button>
        </div>
      ) : (
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 text-sm" aria-label="My applications table">
              <caption className="sr-only">List of your applications with status and submission date</caption>
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-3 sm:px-6 py-3 text-left font-medium text-gray-500 uppercase tracking-wider">
                    Service Type
                  </th>
                  <th scope="col" className="px-3 sm:px-6 py-3 text-left font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-3 sm:px-6 py-3 text-left font-medium text-gray-500 uppercase tracking-wider">
                    Description
                  </th>
                  <th scope="col" className="px-3 sm:px-6 py-3 text-left font-medium text-gray-500 uppercase tracking-wider">
                    Submitted On
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {applications.map((app) => (
                  <tr key={app._id} className="hover:bg-gray-50">
                    <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                      <div className="font-medium text-gray-900">
                        {app.serviceType}
                      </div>
                    </td>
                    <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(app.status)}`}>
                        {app.status}
                      </span>
                    </td>
                    <td className="px-3 sm:px-6 py-4">
                      <div className="text-gray-900">
                        {app.description}
                      </div>
                    </td>
                    <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                      <div className="text-gray-500">
                        {new Date(app.createdAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </main>
  );
};

export default MyApplications;