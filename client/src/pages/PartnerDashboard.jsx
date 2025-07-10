import { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import DashboardPanel from '../components/partner/DashboardPanel';

const PartnerDashboard = () => {
  const { user } = useAuth();

  useEffect(() => {
    // Set page title
    document.title = 'Partner Dashboard - 99digicom';
  }, []);

  return (
    <div className="h-full">
      <DashboardPanel />
    </div>
  );
};

export default PartnerDashboard; 