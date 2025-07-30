// components/GoogleLoginButton.js
import React, { useEffect } from 'react';
import {jwtDecode} from 'jwt-decode';
import axios from 'axios';

const GoogleLoginButton = () => {
  useEffect(() => {
    /* global google */
    window.google?.accounts?.id.initialize({
      client_id: '678940763431-ao3o1pqtp1c32tf9ep174vhlb36faaoj.apps.googleusercontent.com',
      callback: handleCredentialResponse,
    });

    window.google?.accounts?.id.renderButton(
      document.getElementById('google-button'),
      {
        theme: 'outline', // or "filled_blue"
        size: 'large',
        type: 'standard', // to match the screenshot
        shape: 'pill',
        logo_alignment: 'left',
      }
    );

    // Optional: show One Tap popup
    window.google?.accounts?.id.prompt();
  }, []);

  const handleCredentialResponse = async (response) => {
    const decoded = jwtDecode(response.credential);
    console.log('Decoded JWT:', decoded);

    try {
      const res = await axios.post('http://localhost:5051/api/auth/google-login', {
        token: response.credential,
      });

      console.log('Server response:', res.data);
    } catch (err) {
      console.error('Login error:', err.response?.data || err.message);
    }
  };

  return <div id="google-button"></div>;
};

export default GoogleLoginButton;
