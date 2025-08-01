// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import { ArrowLeft, Mail, Lock, User, Building, Phone, Globe, CheckCircle } from 'lucide-react';

// const Login = () => {
//   const [isLoading, setIsLoading] = useState(false);
//   const [activeTab, setActiveTab] = useState('login');
//   const [loginForm, setLoginForm] = useState({
//     email: '',
//     password: '',
//     rememberMe: false
//   });
//   const [signupForm, setSignupForm] = useState({
//     firstName: '',
//     lastName: '',
//     company: '',
//     phone: '',
//     email: '',
//     password: '',
//     agreeToTerms: false
//   });

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);

//     setTimeout(() => {
//       setIsLoading(false);
//       alert('Login Successful! Welcome back to 99digicom!');
//     }, 2000);
//   };

//   const handleSignup = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);

//     setTimeout(() => {
//       setIsLoading(false);
//       alert('Account Created! Welcome to 99digicom! Please verify your email.');
//     }, 2000);
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
//       {/* Background Pattern */}
//       <div className="absolute inset-0 opacity-5">
//         <div className="absolute inset-0" style={{
//           backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%234F46E5' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
//         }}></div>
//       </div>

//       <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-8 items-center relative z-10">
//         {/* Left Side - Image and Branding */}
//         <div className="hidden lg:flex flex-col justify-center space-y-8 p-8">
//           <div className="space-y-4">
//             <Link to="/" className="inline-flex items-center text-blue-600 hover:text-blue-700 transition-colors mb-6 group">
//               <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
//               Back to Home
//             </Link>
//             <h1 className="text-4xl font-bold text-gray-900">
//               Welcome to{" "}
//               <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
//                 99digicom.com
//               </span>
//             </h1>
//             <p className="text-xl text-gray-600 leading-relaxed">
//               Your gateway to digital commerce success. Join thousands of partners already growing their business with us.
//             </p>
//           </div>

//           {/* Feature highlights */}
//           <div className="space-y-4">
//             <div className="flex items-center space-x-3 group">
//               <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center group-hover:bg-blue-200 transition-colors">
//                 <Globe className="h-5 w-5 text-blue-600" />
//               </div>
//               <span className="text-gray-700 font-medium">ONDC Integration & Platform Enablement</span>
//             </div>
//             <div className="flex items-center space-x-3 group">
//               <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center group-hover:bg-purple-200 transition-colors">
//                 <User className="h-5 w-5 text-purple-600" />
//               </div>
//               <span className="text-gray-700 font-medium">Co-Branding & Partnership Solutions</span>
//             </div>
//             <div className="flex items-center space-x-3 group">
//               <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center group-hover:bg-orange-200 transition-colors">
//                 <Mail className="h-5 w-5 text-orange-600" />
//               </div>
//               <span className="text-gray-700 font-medium">Comprehensive Digital Marketing</span>
//             </div>
//           </div>

//           {/* Decorative Image */}
//           <div className="relative">
//             <div className="w-full h-64 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl overflow-hidden shadow-2xl">
//               <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20"></div>
//               <div className="absolute inset-0 flex items-center justify-center">
//                 <div className="text-center text-white">
//                   <Globe className="h-16 w-16 mx-auto mb-4 opacity-90" />
//                   <p className="text-lg font-semibold">Digital Commerce Platform</p>
//                   <p className="text-sm opacity-90">Connecting businesses worldwide</p>
//                 </div>
//               </div>
//               {/* Floating elements */}
//               <div className="absolute top-4 right-4 w-8 h-8 bg-white/20 rounded-full animate-pulse"></div>
//               <div className="absolute bottom-6 left-6 w-6 h-6 bg-white/30 rounded-full animate-pulse delay-300"></div>
//             </div>
//           </div>
//         </div>

//         {/* Right Side - Login/Signup Form */}
//         <div className="flex items-center justify-center">
//           <div className="w-full max-w-md bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl border border-white/20 overflow-hidden">
//             {/* Header */}
//             <div className="p-6 text-center border-b border-gray-100">
//               <div className="lg:hidden mb-4">
//                 <Link to="/" className="inline-flex items-center text-blue-600 hover:text-blue-700 transition-colors group">
//                   <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
//                   Back to Home
//                 </Link>
//               </div>
//               <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome</h2>
//               <p className="text-gray-600">
//                 Login to your account or create a new one to get started
//               </p>
//             </div>

//             {/* Content */}
//             <div className="p-6">
//               {/* Tabs */}
//               <div className="flex bg-gray-100 rounded-lg p-1 mb-6">
//                 <button
//                   onClick={() => setActiveTab('login')}
//                   className={`flex-1 py-2 px-4 text-sm font-medium rounded-md transition-all ${
//                     activeTab === 'login'
//                       ? 'bg-white text-blue-600 shadow-sm'
//                       : 'text-gray-600 hover:text-gray-900'
//                   }`}
//                 >
//                   Login
//                 </button>
//                 <button
//                   onClick={() => setActiveTab('signup')}
//                   className={`flex-1 py-2 px-4 text-sm font-medium rounded-md transition-all ${
//                     activeTab === 'signup'
//                       ? 'bg-white text-blue-600 shadow-sm'
//                       : 'text-gray-600 hover:text-gray-900'
//                   }`}
//                 >
//                   Sign Up
//                 </button>
//               </div>

//               {/* Login Form */}
//               {activeTab === 'login' && (
//                 <form onSubmit={handleLogin} className="space-y-4">
//                   <div>
//                     <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
//                       Email
//                     </label>
//                     <div className="relative">
//                       <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
//                       <input
//                         id="email"
//                         type="email"
//                         placeholder="Enter your email"
//                         value={loginForm.email}
//                         onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
//                         className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                         required
//                       />
//                     </div>
//                   </div>

//                   <div>
//                     <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
//                       Password
//                     </label>
//                     <div className="relative">
//                       <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
//                       <input
//                         id="password"
//                         type="password"
//                         placeholder="Enter your password"
//                         value={loginForm.password}
//                         onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
//                         className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                         required
//                       />
//                     </div>
//                   </div>

//                   <div className="flex items-center justify-between">
//                     <label className="flex items-center space-x-2">
//                       <input
//                         type="checkbox"
//                         checked={loginForm.rememberMe}
//                         onChange={(e) => setLoginForm({ ...loginForm, rememberMe: e.target.checked })}
//                         className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
//                       />
//                       <span className="text-sm text-gray-600">Remember me</span>
//                     </label>
//                     <a href="#" className="text-sm text-blue-600 hover:text-blue-700 transition-colors">
//                       Forgot password?
//                     </a>
//                   </div>

//                   <button
//                     type="submit"
//                     disabled={isLoading}
//                     className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
//                   >
//                     {isLoading ? (
//                       <div className="flex items-center justify-center">
//                         <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
//                         loging in...
//                       </div>
//                     ) : (
//                       'Login'
//                     )}
//                   </button>
//                 </form>
//               )}

//               {/* Signup Form */}
//               {activeTab === 'signup' && (
//                 <form onSubmit={handleSignup} className="space-y-4">
//                   <div className="grid grid-cols-2 gap-4">
//                     <div>
//                       <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
//                         First Name
//                       </label>
//                       <div className="relative">
//                         <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
//                         <input
//                           id="firstName"
//                           placeholder="First name"
//                           value={signupForm.firstName}
//                           onChange={(e) => setSignupForm({ ...signupForm, firstName: e.target.value })}
//                           className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                           required
//                         />
//                       </div>
//                     </div>
//                     <div>
//                       <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
//                         Last Name
//                       </label>
//                       <input
//                         id="lastName"
//                         placeholder="Last name"
//                         value={signupForm.lastName}
//                         onChange={(e) => setSignupForm({ ...signupForm, lastName: e.target.value })}
//                         className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                         required
//                       />
//                     </div>
//                   </div>

//                   <div>
//                     <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
//                       Company Name
//                     </label>
//                     <div className="relative">
//                       <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
//                       <input
//                         id="company"
//                         placeholder="Your company name"
//                         value={signupForm.company}
//                         onChange={(e) => setSignupForm({ ...signupForm, company: e.target.value })}
//                         className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                         required
//                       />
//                     </div>
//                   </div>

//                   <div>
//                     <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
//                       Phone Number
//                     </label>
//                     <div className="relative">
//                       <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
//                       <input
//                         id="phone"
//                         type="tel"
//                         placeholder="+91 12345 67890"
//                         value={signupForm.phone}
//                         onChange={(e) => setSignupForm({ ...signupForm, phone: e.target.value })}
//                         className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                         required
//                       />
//                     </div>
//                   </div>

//                   <div>
//                     <label htmlFor="signupEmail" className="block text-sm font-medium text-gray-700 mb-2">
//                       Email
//                     </label>
//                     <div className="relative">
//                       <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
//                       <input
//                         id="signupEmail"
//                         type="email"
//                         placeholder="Enter your email"
//                         value={signupForm.email}
//                         onChange={(e) => setSignupForm({ ...signupForm, email: e.target.value })}
//                         className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                         required
//                       />
//                     </div>
//                   </div>

//                   <div>
//                     <label htmlFor="signupPassword" className="block text-sm font-medium text-gray-700 mb-2">
//                       Password
//                     </label>
//                     <div className="relative">
//                       <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
//                       <input
//                         id="signupPassword"
//                         type="password"
//                         placeholder="Create a password"
//                         value={signupForm.password}
//                         onChange={(e) => setSignupForm({ ...signupForm, password: e.target.value })}
//                         className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                         required
//                       />
//                     </div>
//                   </div>

//                   <div className="flex items-start space-x-2">
//                     <input
//                       type="checkbox"
//                       checked={signupForm.agreeToTerms}
//                       onChange={(e) => setSignupForm({ ...signupForm, agreeToTerms: e.target.checked })}
//                       className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 mt-1"
//                       required
//                     />
//                     <span className="text-sm text-gray-600">
//                       I agree to the{" "}
//                       <a href="#" className="text-blue-600 hover:text-blue-700 transition-colors">
//                         Terms of Service
//                       </a>{" "}
//                       and{" "}
//                       <a href="#" className="text-blue-600 hover:text-blue-700 transition-colors">
//                         Privacy Policy
//                       </a>
//                     </span>
//                   </div>

//                   <button
//                     type="submit"
//                     disabled={isLoading}
//                     className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
//                   >
//                     {isLoading ? (
//                       <div className="flex items-center justify-center">
//                         <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
//                         Creating account...
//                       </div>
//                     ) : (
//                       'Create Account'
//                     )}
//                   </button>
//                 </form>
//               )}

//               {/* Separator */}
//               <div className="my-6">
//                 <div className="relative">
//                   <div className="absolute inset-0 flex items-center">
//                     <div className="w-full border-t border-gray-300"></div>
//                   </div>
//                   <div className="relative flex justify-center text-sm">
//                     <span className="px-2 bg-white text-gray-500">Need help?</span>
//                   </div>
//                 </div>
//               </div>

//               <div className="text-center text-sm text-gray-600">
//                 <Link to="/contact" className="text-blue-600 hover:text-blue-700 transition-colors">
//                   Contact Support
//                 </Link>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;

"use client";

import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Mail,
  Lock,
  User,
  Phone,
  Globe,
  CheckCircle,
} from "lucide-react";
import logo from "../assets/99digicom.png"; // Ensure this path matches your asset location

const CustomerLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("login");
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const [signupForm, setSignupForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    password: "",
    agreeToTerms: false,
  });

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      alert("Login Successful! Welcome back to 99digicom!");
    }, 2000);
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      alert("Account Created! Welcome to 99digicom! Please verify your email.");
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 flex items-center justify-center p-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%2310B981' fillOpacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        ></div>
      </div>

      <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-8 items-center relative z-10">
        {/* Left Side - Logo and Branding */}
        <div className="hidden lg:flex flex-col justify-center space-y-8 p-8">
          <div className="space-y-4">
            <Link
              to="/"
              className="inline-flex items-center text-green-600 hover:text-green-700 transition-colors mb-6 group"
            >
              <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
              Back to Home
            </Link>

            {/* 99digicom Logo
            <div className="flex items-center justify-center mb-8">
              <div className="w-32 h-32 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-2xl">
                <div className="text-center text-white">
                  <div className="text-3xl font-bold">99</div>
                  <div className="text-sm font-medium">digicom</div>
                </div>
              </div>
            </div> */}
            {/* <img
              src={logo} // Ensure this path matches your asset location
              alt="99digicom Logo"
              className="w-20 h-20 object-contain mb-6 mx-auto"
            /> */}

            <h1 className="text-4xl font-bold text-gray-900 text-center">
              Welcome to{" "}
              <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                99 Digicom
              </span>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed text-center">
              Your gateway to digital commerce success. Join thousands of
              customers already growing their business with us.
            </p>
          </div>

          {/* Feature highlights */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3 group">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center group-hover:bg-green-200 transition-colors">
                <Globe className="h-5 w-5 text-green-600" />
              </div>
              <span className="text-gray-700 font-medium">
                ONDC Integration & Platform Enablement
              </span>
            </div>
            <div className="flex items-center space-x-3 group">
              <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center group-hover:bg-emerald-200 transition-colors">
                <User className="h-5 w-5 text-emerald-600" />
              </div>
              <span className="text-gray-700 font-medium">
                Customer-Centric Solutions
              </span>
            </div>
            <div className="flex items-center space-x-3 group">
              <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center group-hover:bg-teal-200 transition-colors">
                <CheckCircle className="h-5 w-5 text-teal-600" />
              </div>
              <span className="text-gray-700 font-medium">
                Comprehensive Digital Services
              </span>
            </div>
          </div>

          {/* Decorative Image */}
          <div className="relative">
            <div className="w-full h-64 bg-gradient-to-br from-green-700 to-emerald-600 rounded-2xl overflow-hidden shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-green-600/20 to-emerald-600/20"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-white">
                  <img
                    src={logo} // Ensure this path matches your asset location
                    alt="99digicom Logo"
                    className="w-20 h-20 object-contain mb-6 mx-auto"
                  />
                  <p className="text-lg font-semibold">
                    Digital Commerce Platform
                  </p>
                  <p className="text-sm opacity-90">
                    Connecting customers worldwide
                  </p>
                </div>
              </div>
              {/* Floating elements */}
              <div className="absolute top-4 right-4 w-8 h-8 bg-white/20 rounded-full animate-pulse"></div>
              <div className="absolute bottom-6 left-6 w-6 h-6 bg-white/30 rounded-full animate-pulse delay-300"></div>
            </div>
          </div>
        </div>

        {/* Right Side - Login/Signup Form */}
        <div className="flex items-center justify-center">
          <div className="w-full max-w-md bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl border border-white/20 overflow-hidden">
            {/* Header */}
            <div className="p-6 text-center border-b border-gray-100">
              <div className="lg:hidden mb-4">
                <Link
                  to="/"
                  className="inline-flex items-center text-green-600 hover:text-green-700 transition-colors group"
                >
                  <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                  Back to Home
                </Link>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Customer Portal
              </h2>
              <p className="text-gray-600">
                Login to your account or create a new one to get started
              </p>
            </div>

            {/* Content */}
            <div className="p-6">
              {/* Tabs */}
              <div className="flex bg-gray-100 rounded-lg p-1 mb-6">
                <button
                  onClick={() => setActiveTab("login")}
                  className={`flex-1 py-2 px-4 text-sm font-medium rounded-md transition-all ${
                    activeTab === "login"
                      ? "bg-white text-green-600 shadow-sm"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  Login
                </button>
                <button
                  onClick={() => setActiveTab("signup")}
                  className={`flex-1 py-2 px-4 text-sm font-medium rounded-md transition-all ${
                    activeTab === "signup"
                      ? "bg-white text-green-600 shadow-sm"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  Sign Up
                </button>
              </div>

              {/* Login Form */}
              {activeTab === "login" && (
                <form onSubmit={handleLogin} className="space-y-4">
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Email
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <input
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        value={loginForm.email}
                        onChange={(e) =>
                          setLoginForm({ ...loginForm, email: e.target.value })
                        }
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <input
                        id="password"
                        type="password"
                        placeholder="Enter your password"
                        value={loginForm.password}
                        onChange={(e) =>
                          setLoginForm({
                            ...loginForm,
                            password: e.target.value,
                          })
                        }
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                        required
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={loginForm.rememberMe}
                        onChange={(e) =>
                          setLoginForm({
                            ...loginForm,
                            rememberMe: e.target.checked,
                          })
                        }
                        className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                      />
                      <span className="text-sm text-gray-600">Remember me</span>
                    </label>
                    <a
                      href="#"
                      className="text-sm text-green-600 hover:text-green-700 transition-colors"
                    >
                      Forgot password?
                    </a>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-3 px-4 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    {isLoading ? (
                      <div className="flex items-center justify-center">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                        Logging in...
                      </div>
                    ) : (
                      "Login"
                    )}
                  </button>
                </form>
              )}

              {/* Signup Form */}
              {activeTab === "signup" && (
                <form onSubmit={handleSignup} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="firstName"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        First Name
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <input
                          id="firstName"
                          placeholder="First name"
                          value={signupForm.firstName}
                          onChange={(e) =>
                            setSignupForm({
                              ...signupForm,
                              firstName: e.target.value,
                            })
                          }
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label
                        htmlFor="lastName"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Last Name
                      </label>
                      <input
                        id="lastName"
                        placeholder="Last name"
                        value={signupForm.lastName}
                        onChange={(e) =>
                          setSignupForm({
                            ...signupForm,
                            lastName: e.target.value,
                          })
                        }
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Phone Number
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <input
                        id="phone"
                        type="tel"
                        placeholder="+91 12345 67890"
                        value={signupForm.phone}
                        onChange={(e) =>
                          setSignupForm({
                            ...signupForm,
                            phone: e.target.value,
                          })
                        }
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="signupEmail"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Email
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <input
                        id="signupEmail"
                        type="email"
                        placeholder="Enter your email"
                        value={signupForm.email}
                        onChange={(e) =>
                          setSignupForm({
                            ...signupForm,
                            email: e.target.value,
                          })
                        }
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="signupPassword"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <input
                        id="signupPassword"
                        type="password"
                        placeholder="Create a password"
                        value={signupForm.password}
                        onChange={(e) =>
                          setSignupForm({
                            ...signupForm,
                            password: e.target.value,
                          })
                        }
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                        required
                      />
                    </div>
                  </div>

                  <div className="flex items-start space-x-2">
                    <input
                      type="checkbox"
                      checked={signupForm.agreeToTerms}
                      onChange={(e) =>
                        setSignupForm({
                          ...signupForm,
                          agreeToTerms: e.target.checked,
                        })
                      }
                      className="rounded border-gray-300 text-green-600 focus:ring-green-500 mt-1"
                      required
                    />
                    <span className="text-sm text-gray-600">
                      I agree to the{" "}
                      <a
                        href="#"
                        className="text-green-600 hover:text-green-700 transition-colors"
                      >
                        Terms of Service
                      </a>{" "}
                      and{" "}
                      <a
                        href="#"
                        className="text-green-600 hover:text-green-700 transition-colors"
                      >
                        Privacy Policy
                      </a>
                    </span>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-3 px-4 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    {isLoading ? (
                      <div className="flex items-center justify-center">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                        Creating account...
                      </div>
                    ) : (
                      "Create Account"
                    )}
                  </button>
                </form>
              )}

              {/* Separator */}
              <div className="my-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">
                      Need help?
                    </span>
                  </div>
                </div>
              </div>

              <div className="text-center text-sm text-gray-600">
                <Link
                  to="/contact"
                  className="text-green-600 hover:text-green-700 transition-colors"
                >
                  Contact Support
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerLogin;
