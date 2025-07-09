"use client"

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import logo from "../assets/99digicom.png"
import { useAuth } from "../context/AuthContext"
import axiosInstance from "../config/api.config"

const PartnerLogin = () => {
  const navigate = useNavigate()
  const { handleLogin } = useAuth()
  const [state, setState] = useState("Login")
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: ''
  })
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const checkPartnerRequest = async (token) => {
    try {
      const response = await axiosInstance.get('/api/partner/has-request', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
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
      const { name, email, phone, password } = formData
      const endpoint = state === "Sign Up" ? "/api/auth/register" : "/api/auth/login"
      const payload = state === "Sign Up" ? { name, email, phone, password } : { email, password }

      const { data } = await axiosInstance.post(endpoint, payload)

      if (data.success) {
        handleLogin(data.token, data.user)
        
        if (state === "Sign Up") {
          toast.success("Account created successfully!")
          navigate("/partner", { state: { section: 'create-user' } })
        } else {
          const hasRequest = await checkPartnerRequest(data.token)
          toast.success("Login successful!")
          
          navigate("/partner", { 
            state: { 
              section: hasRequest ? 'dashboard' : 'create-user' 
            } 
          })
        }
      } else {
        toast.error(data.message || "Authentication failed")
      }
    } catch (error) {
      console.error('Authentication error:', error)
      toast.error(error.response?.data?.message || "Authentication failed")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <img
            className="mx-auto h-12 w-auto"
            src={logo}
            alt="99 Digicom"
          />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            {state === "Login" ? "Sign in to your account" : "Create your account"}
          </h2>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={onSubmitHandler}>
          <div className="rounded-md shadow-sm -space-y-px">
            {state === "Sign Up" && (
              <>
                <div>
                  <label htmlFor="name" className="sr-only">
                    Full Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="sr-only">
                    Phone Number
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    pattern="[0-9]{10}"
                    maxLength="10"
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>
              </>
            )}
            <div>
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className={`appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 ${
                  state === "Sign Up" ? "" : "rounded-t-md"
                } focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm`}
                placeholder="Email address"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete={state === "Login" ? "current-password" : "new-password"}
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white ${
                isLoading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              }`}
            >
              {isLoading ? "Processing..." : state}
            </button>
          </div>

          <div className="text-center">
            <button
              type="button"
              onClick={() => setState(state === "Login" ? "Sign Up" : "Login")}
              className="text-sm text-green-600 hover:text-green-500"
            >
              {state === "Login"
                ? "Don't have an account? Sign Up"
                : "Already have an account? Login"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default PartnerLogin