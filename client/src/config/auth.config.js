export const AUTH_CONFIG = {
  tokenKey: 'session_token',
  loginPath: '/login',
  endpoints: {
    login: '/api/session/user/login',
    signup: '/api/session/user/signup',
    profile: '/api/session/user/profile',
    forgotPassword: '/api/session/user/forgot-password',
    resetPassword: '/api/session/user/reset-password',
    sendOTP: '/api/session/user/send-otp',
    verifyOTP: '/api/session/user/verify-otp'
  }
}; 