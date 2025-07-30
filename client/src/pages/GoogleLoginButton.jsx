// // components/GoogleLoginButton.js
// import React from 'react';
// import axios from 'axios';

// const GoogleLoginButton = () => {
//   const handleGoogleLogin = async () => {
//     // Here you would get the Google token from the Google API (e.g., using Google Identity Services)
//     const token = await getGoogleToken(); // Placeholder for actual token retrieval
//     try {
//       const response = await axios.post(`${import.meta.env.VITE_API_URL || 'http://localhost:5051'}/api/google/google-login`, { token });
//       // Handle successful login (e.g., save user info, redirect, etc.)
//       console.log('Login successful:', response.data);
//     } catch (error) {
//       console.error('Google login failed:', error);
//     }
//   };

//   return (
//     <button
//       type="button"
//       onClick={handleGoogleLogin}
//       className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-full border border-gray-300 bg-white text-gray-700 font-semibold shadow-md hover:bg-gray-50 hover:shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-400 group relative overflow-hidden"
//       style={{ position: 'relative' }}
//     >
//       <span className="absolute left-4 flex items-center">
//         <img
//           src="https://developers.google.com/identity/images/g-logo.png"
//           alt="Google"
//           className="w-6 h-6"
//         />
//       </span>
//       <span className="flex-1 text-center text-base group-hover:text-green-600 transition-colors duration-200">
//         Continue with Google
//       </span>
//     </button>
//   );
// };

// export default GoogleLoginButton;


import React, { useEffect, useRef } from 'react';
import {jwtDecode} from 'jwt-decode';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const GoogleLoginButton = () => {
  const navigate = useNavigate();
  const { handleLogin } = useAuth();
  const initialized = useRef(false);

  useEffect(() => {
    if (!window.google || initialized.current) return;
    const buttonDiv = document.getElementById('google-button');
    if (!buttonDiv || buttonDiv.children.length > 0) return;
    window.google.accounts.id.initialize({
      client_id: '678940763431-ao3o1pqtp1c32tf9ep174vhlb36faaoj.apps.googleusercontent.com',
      callback: handleCredentialResponse,
    });
    window.google.accounts.id.renderButton(buttonDiv, {
      theme: 'outline',
      size: 'large',
      type: 'standard',
      shape: 'pill',
      logo_alignment: 'left',
    });
    window.google.accounts.id.prompt();
    initialized.current = true;
  }, []);

  const handleCredentialResponse = async (response) => {
    const decoded = jwtDecode(response.credential);
    try {
      const res = await axios.post('/api/google/google-login', {
        token: response.credential,
      });
      // Save app JWT in localStorage and AuthContext
      const user = res.data.user;
      const appToken = res.data.token;
      localStorage.setItem('authToken', appToken); // Save app JWT as authToken
      if (handleLogin) {
        await handleLogin(appToken, user, false);
      }
      navigate('/dashboard/profile');
    } catch (err) {
      console.error('Login error:', err.response?.data || err.message);
    }
  };

  return <div id="google-button"></div>;
};

export default GoogleLoginButton;