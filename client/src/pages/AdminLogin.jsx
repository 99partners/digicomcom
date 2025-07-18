import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useAuth } from '../context/AuthContext';
import { getApiUrl } from '../config/api.config';

const AdminLogin = () => {
    const [credentials, setCredentials] = useState({
        username: '',
        password: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const { handleLogin, user, loading } = useAuth();

    // Check if admin is already logged in
    useEffect(() => {
        if (!loading && user && user.role === 'admin') {
            console.log('Admin already logged in, redirecting to /admin');
            navigate('/admin', { replace: true });
        }
    }, [user, loading, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            console.log('Attempting admin login with credentials:', { username: credentials.username });
            
            const response = await axios.post(
                getApiUrl('api/admin/login'),
                credentials,
                { withCredentials: true }
            );

            console.log('Admin login response:', response.data);

            if (response.data.success) {
                console.log('Admin login successful, response:', response.data);
                
                // First handle the login
                await handleLogin(response.data.token, { 
                    role: 'admin',
                    username: response.data.admin?.username || credentials.username,
                    isAdmin: true
                }, true);
                
                console.log('Admin login handled, navigating to /admin');
                toast.success('Login successful');
                
                // Small delay to ensure state is set before navigation
                setTimeout(() => {
                    navigate('/admin', { replace: true });
                }, 100);
            } else {
                toast.error(response.data.message || 'Login failed');
            }
        } catch (error) {
            console.error('Admin login error:', error);
            // Only show error toast for actual login attempts, not for auth checks
            if (error.response?.status === 401) {
                toast.error('Invalid credentials');
            } else if (error.response?.status === 500) {
                toast.error('Server error. Please try again later.');
            } else {
                toast.error('Login failed. Please try again.');
            }
        } finally {
            setIsLoading(false);
        }
    };

    // Show loading while checking auth status
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <div className="w-8 h-8 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
                <div className="text-center mb-8">
                    <h1 className="text-2xl font-bold text-gray-900">Admin Login</h1>
                    <p className="text-gray-600 mt-2">Enter your credentials to access the admin panel</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                            Username
                        </label>
                        <input
                            id="username"
                            type="text"
                            required
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                            value={credentials.username}
                            onChange={(e) => setCredentials({
                                ...credentials,
                                username: e.target.value
                            })}
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            required
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                            value={credentials.password}
                            onChange={(e) => setCredentials({
                                ...credentials,
                                password: e.target.value
                            })}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
                    >
                        {isLoading ? (
                            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                        ) : 'Sign in'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AdminLogin;