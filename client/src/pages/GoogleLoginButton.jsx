// components/GoogleLoginButton.js
import React from 'react';

const GoogleLoginButton = () => {
  const handleGoogleLogin = () => {
    window.location.href = `${import.meta.env.VITE_API_URL || 'http://localhost:5051'}/api/google/google-login`;
  };

  return (
    <button
      type="button"
      onClick={handleGoogleLogin}
      className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-full border border-gray-300 bg-white text-gray-700 font-semibold shadow-md hover:bg-gray-50 hover:shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-400 group relative overflow-hidden"
      style={{ position: 'relative' }}
    >
      <span className="absolute left-4 flex items-center">
        <img
          src="https://developers.google.com/identity/images/g-logo.png"
          alt="Google"
          className="w-6 h-6"
        />
      </span>
      <span className="flex-1 text-center text-base group-hover:text-green-600 transition-colors duration-200">
        Continue with Google
      </span>
    </button>
  );
};

export default GoogleLoginButton;
