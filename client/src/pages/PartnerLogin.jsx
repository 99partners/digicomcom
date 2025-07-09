"use client"

import { useContext, useState, useEffect } from "react"
import { User, Mail, Phone, Lock, ArrowLeft } from "lucide-react"
import { Link, useNavigate, useLocation } from "react-router-dom"
import axiosInstance from "../config/api.config"
import { toast } from "react-toastify"
import logo from "../assets/99digicom.png"
import { useAuth } from "../context/AuthContext"

const PartnerLogin = () => {
  const [state, setState] = useState("Sign Up")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const navigate = useNavigate()
  const location = useLocation()
  const { handleLogin, user } = useAuth()

  // Show message if redirected from protected route
  useEffect(() => {
    if (location.state?.message) {
      toast.info(location.state.message);
    }
  }, [location]);

  useEffect(() => {
    // If user is already logged in, redirect to partner dashboard
    if (user) {
      navigate('/partner');
    }
  }, [user, navigate]);

  const handlePhoneChange = (e) => {
    const input = e.target.value.replace(/\D/g, '');
    if (input.length <= 10) {
      setPhone(input);
    } else {
      toast.error('Phone number should not exceed 10 digits');
    }
  }

  const checkPartnerRequest = async (token) => {
    try {
      const response = await axiosInstance.get('/api/partner/has-request');
      return response.data.hasRequest;
    } catch (error) {
      console.error('Error checking partner request:', error);
      return false;
    }
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const endpoint = state === "Sign Up" ? "/api/auth/register" : "/api/auth/login"
      const payload = state === "Sign Up" ? { name, email, phone, password } : { email, password }

      const { data } = await axiosInstance.post(endpoint, payload)

      if (data.success) {
        // Store the token and user data
        await handleLogin(data.token, data.user)
        
        if (state === "Sign Up") {
          toast.success("Account created successfully!")
          // For new registrations, always redirect to create partner request
          navigate("/partner")
        } else {
          // For login, check if user has existing partner request
          const hasRequest = await checkPartnerRequest(data.token)
          toast.success("Login successful!")
          
          // Get the redirect URL if it exists
          const redirectUrl = localStorage.getItem('redirectAfterLogin');
          if (redirectUrl) {
            localStorage.removeItem('redirectAfterLogin');
            navigate(redirectUrl);
          } else {
            // Redirect based on whether they have a request or not
            if (hasRequest) {
              navigate("/partner")
            } else {
              navigate("/partner", { state: { section: 'create-user' } })
            }
          }
        }
      } else {
        toast.error(data.message || "Authentication failed")
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || "Something went wrong"
      toast.error(errorMessage)
      console.error('Auth error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left Section - Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <img src={logo} alt="Logo" className="h-12 mx-auto mb-8" />
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              {state === "Sign Up" ? "Create Account" : "Welcome Back"}
            </h2>
            <p className="text-gray-600">
              {state === "Sign Up"
                ? "Sign up to become a partner"
                : "Sign in to access your partner account"}
            </p>
          </div>

          <form onSubmit={onSubmitHandler} className="space-y-6">
            {state === "Sign Up" && (
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <div className="mt-1 relative">
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500"
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <div className="mt-1 relative">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
              </div>
            </div>

            {state === "Sign Up" && (
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Phone Number
                </label>
                <div className="mt-1 relative">
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={handlePhoneChange}
                    maxLength={10}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500"
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <Phone className="h-5 w-5 text-gray-400" />
                  </div>
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1 relative">
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
              </div>
            </div>

            <div>
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
                ) : state}
              </button>
            </div>
          </form>

          <div className="text-center">
            <button
              onClick={() => setState(state === "Sign Up" ? "Sign In" : "Sign Up")}
              className="text-sm text-green-600 hover:text-green-500"
            >
              {state === "Sign Up"
                ? "Already have an account? Sign In"
                : "Don't have an account? Sign Up"}
            </button>
          </div>
        </div>
      </div>

      {/* Right Section - Image/Info */}
      <div className="hidden md:flex md:w-1/2 bg-green-50">
        <div className="flex flex-col justify-center p-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Join Our Partner Network
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Unlock new opportunities and grow your business with 99digicom's partner program.
          </p>
          <ul className="space-y-4">
            <li className="flex items-center text-gray-700">
              <svg className="w-6 h-6 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              Access exclusive resources and support
            </li>
            <li className="flex items-center text-gray-700">
              <svg className="w-6 h-6 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              Collaborate with industry experts
            </li>
            <li className="flex items-center text-gray-700">
              <svg className="w-6 h-6 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              Expand your market reach
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PartnerLogin;