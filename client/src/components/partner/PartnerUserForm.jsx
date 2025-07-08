import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { getApiUrl } from '../../config/api.config';

const PartnerUserForm = ({ user, onSubmit, onCancel }) => {
    const [formData, setFormData] = useState({
        serviceType: user?.serviceType || 'ams'
    });

    const serviceTypes = [
        { id: 'ams', label: 'AMS (Application Management Services)' },
        { id: 'platform', label: 'Platform Enablement' },
        { id: 'cobranding', label: 'Co-Branding' },
        { id: 'marketing', label: 'Marketing' }
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (user?._id) {
                await axios.put(getApiUrl(`api/partner/users/${user._id}`), formData);
                toast.success('Request updated successfully');
            } else {
                await axios.post(getApiUrl('api/partner/users'), formData);
                toast.success('Request created successfully');
            }
            onSubmit();
        } catch (error) {
            console.error('Error saving request:', error);
            toast.error(error.response?.data?.message || 'Failed to save request');
        }
    };

    return (
        <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">{user ? 'Edit Request' : 'Create Request'}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Service Type</label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {serviceTypes.map((service) => (
                            <div key={service.id} className="relative">
                                <input
                                    type="radio"
                                    name="serviceType"
                                    id={service.id}
                                    value={service.id}
                                    checked={formData.serviceType === service.id}
                                    onChange={handleChange}
                                    className="peer absolute opacity-0"
                                    required
                                />
                                <label
                                    htmlFor={service.id}
                                    className="block p-4 bg-white border rounded-lg cursor-pointer transition-colors peer-checked:border-purple-500 peer-checked:bg-purple-50 hover:bg-gray-50"
                                >
                                    <div className="font-medium text-gray-900">{service.label}</div>
                                </label>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex justify-end space-x-3 mt-6">
                    <button
                        type="button"
                        onClick={onCancel}
                        className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700"
                    >
                        {user ? 'Update' : 'Create'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default PartnerUserForm; 