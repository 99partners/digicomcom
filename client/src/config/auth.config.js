export const AUTH_CONFIG = {
  tokenKey: 'session_token',
  loginPath: '/login',
  endpoints: {
    login: '/api/portal/access/login',
    signup: '/api/portal/access/signup',
    profile: '/api/portal/access/profile',
    forgotPassword: '/api/portal/access/forgot-password',
    resetPassword: '/api/portal/access/reset-password',
    sendOTP: '/api/portal/access/send-otp',
    verifyOTP: '/api/portal/access/verify-otp'
  }
}; 