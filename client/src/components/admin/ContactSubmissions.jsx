import { useState, useEffect } from 'react';
import axiosInstance from '../../config/api.config';
import { toast } from 'react-toastify';

const ContactSubmissions = () => {
    const [contacts, setContacts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchContacts();
    }, []);

    const fetchContacts = async () => {
        try {
            const response = await axiosInstance.get('/api/admin/contacts');
            if (response.data.success) {
            setContacts(response.data.data);
            } else {
                toast.error('Failed to fetch contact submissions');
            }
        } catch (error) {
            console.error('Error fetching contacts:', error);
            toast.error('Error loading contact submissions');
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this contact submission?')) {
            return;
        }

        try {
            const response = await axiosInstance.delete(`/api/admin/contacts/${id}`);
            if (response.data.success) {
                toast.success('Contact submission deleted successfully');
                setContacts(contacts.filter(contact => contact._id !== id));
            } else {
                toast.error('Failed to delete contact submission');
            }
        } catch (error) {
            console.error('Error deleting contact:', error);
            toast.error('Error deleting contact submission');
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        }).replace(',', '');
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500"></div>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-lg p-6">
            <h1 className="text-2xl font-bold mb-6">Contact Form Submissions</h1>
            {contacts.length === 0 ? (
                <p className="text-gray-500 text-center py-8">No contact submissions found</p>
            ) : (
            <div className="overflow-x-auto">
                    <table className="min-w-full">
                        <thead>
                            <tr className="border-b">
                                <th className="text-left py-4 px-4 text-gray-500 font-medium">DATE</th>
                                <th className="text-left py-4 px-4 text-gray-500 font-medium">NAME</th>
                                <th className="text-left py-4 px-4 text-gray-500 font-medium">EMAIL</th>
                                <th className="text-left py-4 px-4 text-gray-500 font-medium">PHONE</th>
                                <th className="text-left py-4 px-4 text-gray-500 font-medium">MESSAGE</th>
                        </tr>
                    </thead>
                        <tbody>
                        {contacts.map((contact) => (
                                <tr key={contact._id} className="border-b last:border-b-0">
                                    <td className="py-4 px-4 text-gray-600">
                                        {formatDate(contact.createdAt)}
                                </td>
                                    <td className="py-4 px-4 text-gray-600">
                                    {contact.name}
                                </td>
                                    <td className="py-4 px-4 text-gray-600">
                                        <a href={`mailto:${contact.email}`} className="hover:underline">
                                    {contact.email}
                                        </a>
                                </td>
                                    <td className="py-4 px-4 text-gray-600">
                                        <a href={`tel:${contact.phone}`} className="hover:underline">
                                    {contact.phone}
                                        </a>
                                </td>
                                    <td className="py-4 px-4 text-gray-600 max-w-xs truncate">
                                    {contact.message}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            )}
        </div>
    );
};

export default ContactSubmissions; 