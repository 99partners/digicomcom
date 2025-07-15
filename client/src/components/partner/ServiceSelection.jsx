import { useNavigate } from 'react-router-dom';

const ServiceSelection = () => {
  const navigate = useNavigate();

  const services = [
    {
      id: 'platform',
      title: 'Platform Enablement',
      description: 'Get your business online with our comprehensive platform enablement services',
      icon: '🚀',
      route: '/partner/create-application/platform'
    },
    {
      id: 'ams',
      title: 'Account Management Services (AMS)',
      description: 'Professional account management to optimize your online presence',
      icon: '📊',
      route: '/partner/create-application/ams'
    },
    {
      id: 'advertising',
      title: 'Marketing Services',
      description: 'Boost your visibility with our targeted marketing solutions',
      icon: '📈',
      route: '/partner/create-application/advertising'
    },
    {
      id: 'cobranding',
      title: 'Co-Branding Partnership',
      description: 'Partner with us to expand your brand reach and market presence',
      icon: '🤝',
      route: '/partner/create-application/cobranding'
    }
  ];

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">Select a Service</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {services.map((service) => (
          <div
            key={service.id}
            onClick={() => navigate(service.route)}
            className="bg-white rounded-lg shadow-md p-6 cursor-pointer hover:shadow-lg transition-shadow"
          >
            <div className="text-4xl mb-4">{service.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
            <p className="text-gray-600">{service.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServiceSelection; 