"use client"

import { useContext, useState } from "react"
import { User, Mail, Phone, Lock, ArrowLeft } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
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
  const { handleLogin } = useAuth()
  const backendUrl = "https://99digicom.com"

  const handlePhoneChange = (e) => {
    const input = e.target.value.replace(/\D/g, ''); // Remove non-digits
    if (input.length <= 10) {
      setPhone(input);
    } else {
      toast.error('Phone number should not exceed 10 digits');
    }
  }

  const checkPartnerRequest = async () => {
    try {
      const response = await axios.get(backendUrl + '/api/partner/has-request', {
        withCredentials: true
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
      axios.defaults.withCredentials = true
      const url = backendUrl + (state === "Sign Up" ? "/api/auth/register" : "/api/auth/login")
      const payload = state === "Sign Up" ? { name, email, phone, password } : { email, password }

      const { data } = await axios.post(url, payload)

      if (data.success) {
        // Store the token and user data for persistent login
        handleLogin(data.token, data.user)
        
        if (state === "Sign Up") {
          toast.success("Account created successfully!")
          // For new registrations, always redirect to create partner request
          navigate("/partner", { state: { section: 'create-user' } })
        } else {
          // For login, check if user has existing partner request
          const hasRequest = await checkPartnerRequest()
          toast.success("Login successful!")
          navigate("/partner", { 
            state: { 
              section: hasRequest ? 'dashboard' : 'create-user' 
            } 
          })
        }
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message || "Something went wrong")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen">
      {/* Left Side */}
      <div className="w-1/2 hidden md:flex flex-col justify-center items-center bg-gradient-to-br from-green-700 via-emerald-700 to-teal-700 text-white p-10 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23ffffff' fillOpacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          ></div>
        </div>

        <div className="absolute top-20 left-20 w-32 h-32 bg-white/10 rounded-full animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-24 h-24 bg-white/5 rounded-full animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 right-10 w-16 h-16 bg-white/15 rounded-full animate-pulse delay-500"></div>

        <div className="relative z-10 text-center">
          {/* Replaced TF logo with 99digicom.png */}
          <img
            src={logo} // Ensure this path matches your asset location
            alt="99digicom Logo"
            className="w-20 h-20 object-contain mb-6 mx-auto"
          />

          <h1 className="text-4xl font-bold mb-2">99 Digicom</h1>
          <h2 className="text-xl font-semibold mt-4 mb-6">
            Welcome to the future of <span className="text-green-200 font-bold">digital innovation</span>
          </h2>
          <p className="text-sm mt-4 max-w-md text-center leading-relaxed text-green-100">
            Join thousands of professionals who trust our platform to streamline their workflow and boost productivity.
          </p>

          <div className="mt-8 space-y-3">
            <div className="flex items-center justify-center space-x-2 text-green-100">
              <div className="w-2 h-2 bg-green-300 rounded-full"></div>
              <span className="text-sm">Secure & Reliable</span>
            </div>
            <div className="flex items-center justify-center space-x-2 text-green-100">
              <div className="w-2 h-2 bg-green-300 rounded-full"></div>
              <span className="text-sm">Advanced Analytics</span>
            </div>
            <div className="flex items-center justify-center space-x-2 text-green-100">
              <div className="w-2 h-2 bg-green-300 rounded-full"></div>
              <span className="text-sm">24/7 Support</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-8">
        <div className="bg-slate-900 p-10 rounded-2xl shadow-2xl w-full max-w-md text-green-300 text-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-500/10 to-emerald-500/5 rounded-full -translate-y-16 translate-x-16"></div>

          <div className="md:hidden mb-4">
            <Link
              to="/"
              className="inline-flex items-center text-green-400 hover:text-green-300 transition-colors group text-sm"
            >
              <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
              Back to Home
            </Link>
          </div>

          <div className="relative z-10">
            <h2 className="text-3xl font-bold text-white text-center mb-3">
              {state === "Sign Up" ? "Create Account" : "Welcome Back"}
            </h2>
            <p className="text-center text-sm mb-8 text-gray-400">
              {state === "Sign Up" ? "Create your account to get started" : "Sign in to your account"}
            </p>

            <form onSubmit={onSubmitHandler} className="space-y-5">
              {state === "Sign Up" && (
                <div className="flex items-center gap-3 w-full px-5 py-3 rounded-full bg-slate-800 border border-slate-700 hover:border-green-500/50 transition-colors group">
                  <User className="h-5 w-5 text-green-400 group-hover:text-green-300 transition-colors" />
                  <input
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    className="bg-transparent outline-none w-full text-white placeholder-gray-400"
                    type="text"
                    placeholder="Full Name"
                    required
                  />
                </div>
              )}

              <div className="flex items-center gap-3 w-full px-5 py-3 rounded-full bg-slate-800 border border-slate-700 hover:border-green-500/50 transition-colors group">
                <Mail className="h-5 w-5 text-green-400 group-hover:text-green-300 transition-colors" />
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  className="bg-transparent outline-none w-full text-white placeholder-gray-400"
                  type="email"
                  placeholder="Email address"
                  required
                />
              </div>

              {state === "Sign Up" && (
                <div className="flex items-center gap-3 w-full px-5 py-3 rounded-full bg-slate-800 border border-slate-700 hover:border-green-500/50 transition-colors group">
                  <Phone className="h-5 w-5 text-green-400 group-hover:text-green-300 transition-colors" />
                  <input
                    onChange={handlePhoneChange}
                    value={phone}
                    className="bg-transparent outline-none w-full text-white placeholder-gray-400"
                    type="tel"
                    placeholder="Phone Number (10 digits)"
                    pattern="[0-9]{10}"
                    maxLength="10"
                    required
                  />
                </div>
              )}

              <div className="flex items-center gap-3 w-full px-5 py-3 rounded-full bg-slate-800 border border-slate-700 hover:border-green-500/50 transition-colors group">
                <Lock className="h-5 w-5 text-green-400 group-hover:text-green-300 transition-colors" />
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  className="bg-transparent outline-none w-full text-white placeholder-gray-400"
                  type="password"
                  placeholder="Password"
                  required
                />
              </div>

              {state === "Login" && (
                <div className="flex justify-end">
                  <Link
                    to="/reset-password"
                    className="text-green-400 hover:text-green-300 cursor-pointer text-xs transition-colors"
                  >
                    Forgot password?
                  </Link>
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    {state === "Sign Up" ? "Creating Account..." : "Signing In..."}
                  </div>
                ) : state === "Sign Up" ? (
                  "Create Account"
                ) : (
                  "Sign In"
                )}
              </button>
            </form>

            <div className="mt-6 text-center">
              {state === "Sign Up" ? (
                <p className="text-gray-400 text-center text-xs">
                  Already have an account?{" "}
                  <span
                    onClick={() => setState("Login")}
                    className="text-green-400 hover:text-green-300 underline cursor-pointer transition-colors"
                  >
                    Sign in 
                  </span>
                </p>
              ) : (
                <p className="text-gray-400 text-center text-xs">
                  {"Don't have an account?"}{" "}
                  <span
                    onClick={() => setState("Sign Up")}
                    className="text-green-400 hover:text-green-300 underline cursor-pointer transition-colors"
                  >
                    Sign up 
                  </span>
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PartnerLogin