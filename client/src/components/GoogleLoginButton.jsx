import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const GoogleLoginButton = () => {
  const navigate = useNavigate();
  const { handleLogin } = useAuth();

  useEffect(() => {
    // Load Google Identity Services script
    const loadGoogleScript = () => {
      const script = document.createElement('script');
      script.src = 'https://accounts.google.com/gsi/client';
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);

      script.onload = initializeGoogleSignIn;
    };

    loadGoogleScript();
  }, []);

  const initializeGoogleSignIn = () => {
    if (!window.google) return;

    window.google.accounts.id.initialize({
      client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
      callback: handleCredentialResponse,
    });

    window.google.accounts.id.renderButton(
      document.getElementById('google-signin-button'),
      {
        theme: 'outline',
        size: 'large',
        type: 'standard',
        shape: 'pill',
        logo_alignment: 'left',
      }
    );
  };

  const handleCredentialResponse = async (response) => {
    try {
      const { credential } = response;
      const result = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/google/google-login`,
        {
          token: credential,
        }
      );

      if (result.data.success) {
        const { token, user } = result.data;
        localStorage.setItem('authToken', token);
        await handleLogin(token, user);
        navigate('/dashboard/profile');
      }
    } catch (error) {
      console.error('Google login error:', error.response?.data || error.message);
    }
  };

  return (
    <div
      id="google-signin-button"
      className="flex justify-center items-center w-full"
    />
  );
};

export default GoogleLoginButton;