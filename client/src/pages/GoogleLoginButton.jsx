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