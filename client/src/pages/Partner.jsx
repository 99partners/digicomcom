import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { LogOut } from 'lucide-react';

const Partner = () => {
  const [partnerData, setPartnerData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { handleLogout, user } = useAuth();

  useEffect(() => {
    const fetchPartnerData = async () => {
      try {
        const response = await axios.get('http://localhost:5050/api/user/profile', {
          withCredentials: true
        });
        
        if (response.data.success) {
          setPartnerData(response.data.user);
        }
      } catch (error) {
        console.error('Error fetching partner data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPartnerData();
  }, []);

  const onLogout = () => {
    handleLogout();
    navigate('/partnerlogin');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-8 h-8 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="border-b border-gray-200 pb-4 mb-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">Partner Dashboard</h1>
            <button
              onClick={onLogout}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </button>
          </div>
          
          {user && (
            <div className="space-y-6">
              <div className="bg-green-50 p-4 rounded-lg">
                <h2 className="text-lg font-semibold text-green-800 mb-2">Welcome, {user.name}!</h2>
                <p className="text-green-600">Email: {user.email}</p>
                <p className="text-green-600">Phone: {user.phoneNumber}</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                  <h3 className="font-semibold text-gray-800 mb-2">Quick Actions</h3>
                  <ul className="space-y-2">
                    <li>
                      <button className="text-green-600 hover:text-green-700">View Profile</button>
                    </li>
                    <li>
                      <button className="text-green-600 hover:text-green-700">Update Settings</button>
                    </li>
                    <li>
                      <button className="text-green-600 hover:text-green-700">Support</button>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                  <h3 className="font-semibold text-gray-800 mb-2">Recent Activity</h3>
                  <p className="text-gray-600">No recent activity</p>
                </div>
                
                <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                  <h3 className="font-semibold text-gray-800 mb-2">Statistics</h3>
                  <p className="text-gray-600">Coming soon...</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Partner; 