import { API_BASE_URL } from './api.config';

export const AUTH_CONFIG = {
  apiUrl: API_BASE_URL,
  endpoints: {
    login: '/api/auth/login',
    register: '/api/auth/register',
    logout: '/api/auth/logout',
    verify: '/api/auth/verify',
    resetPassword: '/api/auth/reset-password',
    forgotPassword: '/api/auth/forgot-password'
  }
};

// Instructions for setting up Auth0 and Google OAuth:
/*
1. Create an Auth0 account at https://auth0.com/
2. Create a new application in Auth0 dashboard
3. In Auth0 dashboard:
   - Go to Applications > Your App > Settings
   - Copy Domain and Client ID
   - Add http://localhost:5173/callback to Allowed Callback URLs
   - Add http://localhost:5173 to Allowed Web Origins
   - Add http://localhost:5173 to Allowed Logout URLs

4. Set up Google OAuth in Auth0:
   - Go to Authentication > Social
   - Enable Google
   - Create a new project in Google Cloud Console
   - Set up OAuth 2.0 credentials
   - Copy Client ID and Client Secret from Google Cloud Console
   - Paste them in Auth0 Google connection settings

5. Create a .env file in the client directory with these variables:
   VITE_AUTH0_DOMAIN=your-auth0-domain.auth0.com
   VITE_AUTH0_CLIENT_ID=your-auth0-client-id
   VITE_AUTH0_CALLBACK_URL=http://localhost:5173/callback
*/ 