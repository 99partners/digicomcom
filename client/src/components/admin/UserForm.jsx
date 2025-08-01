import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { getApiUrl } from '../../config/api.config';

const UserForm = ({ user, onSubmit, onCancel }) => {
    const [formData, setFormData] = useState({
        name: user?.name || '',
        email: user?.email || '',
        phone: user?.phone || '',
        role: user?.role || 'user',
        isAccountVerified: user?.isAccountVerified || false,
        services: user?.services || []
    });

    const [newService, setNewService] = useState('');

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleAddService = () => {
        if (newService.trim()) {
            setFormData(prev => ({
                ...prev,
                services: [...prev.services, newService.trim()]
            }));
            setNewService('');
        }
    };

    const handleRemoveService = (indexToRemove) => {
        setFormData(prev => ({
            ...prev,
            services: prev.services.filter((_, index) => index !== indexToRemove)
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (user?._id) {
                // Update existing user
                await axios.put(getApiUrl(`api/admin/users/${user._id}`), formData);
                toast.success('User updated successfully');
            } else {
                // Create new user
                await axios.post(getApiUrl('api/admin/users'), formData);
                toast.success('User created successfully');
            }
            onSubmit();
        } catch (error) {
            console.error('Error saving user:', error);
            toast.error(error.response?.data?.message || 'Failed to save user');
        }
    };

    return (
        <div className="bg-white rounded-lg shadow p-4 sm:p-6 max-w-2xl w-full mx-auto">
            <h2 className="text-xl sm:text-2xl font-semibold mb-4">{user ? 'Edit User' : 'Create User'}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                            required
                        />
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Phone</label>
                        <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Role</label>
                        <select
                            name="role"
                            value={formData.role}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                        >
                            <option value="user">User</option>
                            <option value="admin">Admin</option>
                        </select>
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Services</label>
                    <div className="flex flex-col sm:flex-row gap-2 mt-1">
                        <input
                            type="text"
                            value={newService}
                            onChange={(e) => setNewService(e.target.value)}
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                            placeholder="Enter a service"
                        />
                        <button
                            type="button"
                            onClick={handleAddService}
                            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                        >
                            Add
                        </button>
                    </div>
                    <div className="mt-2 flex flex-wrap gap-2">
                        {formData.services.map((service, index) => (
                            <span
                                key={index}
                                className="inline-flex items-center px-2 py-1 rounded-full text-sm bg-blue-100 text-blue-800"
                            >
                                {service}
                                <button
                                    type="button"
                                    onClick={() => handleRemoveService(index)}
                                    className="ml-1 text-blue-600 hover:text-blue-800"
                                >
                                    ×
                                </button>
                            </span>
                        ))}
                    </div>
                </div>
                <div className="flex items-center">
                    <input
                        type="checkbox"
                        name="isAccountVerified"
                        checked={formData.isAccountVerified}
                        onChange={handleChange}
                        className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                    />
                    <label className="ml-2 block text-sm text-gray-700">Account Verified</label>
                </div>
                <div className="flex flex-col sm:flex-row justify-end gap-3 mt-6">
                    <button
                        type="button"
                        onClick={onCancel}
                        className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700"
                    >
                        {user ? 'Update' : 'Create'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default UserForm;