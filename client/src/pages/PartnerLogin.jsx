// import React, { useContext, useState } from 'react'
// import { assets } from '../assets/assets'
// import { useNavigate } from 'react-router-dom'
// import { AppContext } from '../context/AppContext'
// import axios from 'axios'
// import {toast} from 'react-toastify'



// const Login = () => {

//   const [state, setState] = useState('Sign Up')
//   const [name, setName] = useState('')
//   const [email, setEmail] = useState('')
//   const [password, setPassword] = useState('')


//   const navigate =  useNavigate()
//   const {backendUrl, setIsLogin, getUserData} = useContext(AppContext)


//    const onSubmitHandler = async (e) => {
//     try {
//         e.preventDefault()
//         axios.defaults.withCredentials = true //this will send cookies with every request
//         if(state === 'Sign Up'){
//         const {data} =   await axios.post(backendUrl + '/api/auth/register', {name, email, password})

//           if(data.success){
//             setIsLogin(true)
//             getUserData()
//             navigate('/')
//           }else{
//             toast.error(data.message)
//           }

//         }else{
//           const {data} =   await axios.post(backendUrl + '/api/auth/login', {email, password})

//           if(data.success){
//             setIsLogin(true)
//             getUserData()
//             navigate('/')
//           }else{
//             toast.error(data.message)
//           }
//         }
//     }catch(error) {
//       toast.error(error.message)
      
//     }
//   }


//   return (
//     <div className='flex items-center justify-center min-h-screen px-6 sm:px--0 
//     bg-gradient-to-br from-indigo-200 to-indigo-600'>
//       <img onClick={()=>navigate('/')} src={assets.logo} className='absolute left-5 sm:left-20 top-5 w-28 sm:w-32 cursor-pointer'/>


//       <div className='bg-slate-900 p-10 rounded-lg shadow-lg w-full sm:w-96 text-indigo-300 text-sm'>
//         <h2 className='text-3xl font-semibold text-white text-center mb-3 '>{state === 'Sign Up' ? 'Create Account' : 'Login'}</h2>
//         <p className='text-center text-sm  mb-6'>{state === 'Sign Up' ? 'Create your account' : 'Login to your account!'}</p>

//         <form onSubmit={onSubmitHandler}>
//            {state === 'Sign Up' && (
//             <div className='mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]'>
//              <img src={assets.person_icon} alt="" />
//              <input onChange={e=>setName(e.target.value)} value={name} className='bg-transparent outline-none' type="text" placeholder='Full Name' required/>
//            </div>
//            )}

//             <div className='mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]'>
//               <img src={assets.mail_icon} alt="" />
//               <input onChange={e=>setEmail(e.target.value)} value={email}  className='bg-transparent outline-none' type="email" placeholder='Email id' required/>
//             </div>

//             <div className='mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]'>
//               <img src={assets.lock_icon} alt="" />
//               <input onChange={e=>setPassword(e.target.value)} value={password}  className='bg-transparent outline-none' type="password" placeholder='Password' required/>
//             </div>

//             <p onClick={()=>navigate('/reset-password')} className='mb-4 text-indigo-500 cursor-pointer'>Forgot password?</p>
//             <button className='w-full py-2.5 rounded-full bg-gradient-to-r from-indigo-500 to-indigo-900 text-white font-medium'>{state}</button>
//         </form>

//         {state === 'Sign Up' ? 
//           ( <p className='text-gray-400 text-center text-xs mt-4'>Already have an account? {' '}
//               <span onClick={()=>setState('Login')} className='text-blue-400 underline cursor-pointer'>Login here</span>
//             </p>
//           ) : 

//           ( <p className='text-gray-400 text-center text-xs mt-4'>Don't have an account? {' '}
//             <span onClick={()=>setState('Sign Up')} className='text-blue-400 underline cursor-pointer'>Sign up</span>
//             </p>
//           )}
          
          


//       </div>
//     </div>
//   )
// }

// export default Login


//2nd code

// import React, { useContext, useState } from 'react'
// import { Mail, Lock, Eye, EyeOff, User } from 'lucide-react';
// import { Link } from 'react-router-dom';
// import { assets } from '../assets/assets'
// import { useNavigate } from 'react-router-dom'
// import { AppContext } from '../context/AppContext'
// import axios from 'axios'
// import {toast} from 'react-toastify'


// function AuthPage() {
//   const [isLogin, setIsLogin] = useState(true);
//   const [showPassword, setShowPassword] = useState(false);
//   const [fullName, setFullName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [state, setState] = useState('Sign Up')
//   const [name, setName] = useState('');

//     const navigate =  useNavigate()
//   const {backendUrl, setIsLogin, getUserData} = useContext(AppContext)


//      const onSubmitHandler = async (e) => {
//     try {
//         e.preventDefault()
//         axios.defaults.withCredentials = true //this will send cookies with every request
//         if(state === 'Sign Up'){
//         const {data} =   await axios.post(backendUrl + '/api/auth/register', {name, email, password})

//           if(data.success){
//             setIsLogin(true)
//             getUserData()
//             navigate('/')
//           }else{
//             toast.error(data.message)
//           }

//         }else{
//           const {data} =   await axios.post(backendUrl + '/api/auth/login', {email, password})

//           if(data.success){
//             setIsLogin(true)
//             getUserData()
//             navigate('/')
//           }else{
//             toast.error(data.message)
//           }
//         }
//     }catch(error) {
//       toast.error(error.message)
      
//     }
//   };

//   return (
//     <div className="min-h-screen flex">
//       {/* Left Side - Branding */}
      // <div className={`hidden lg:flex lg:w-1/2 ${isLogin ? 'bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900' : 'bg-gradient-to-br from-emerald-900 via-teal-900 to-slate-900'} relative overflow-hidden`}>
      //   <div className="absolute inset-0 opacity-20">
      //     {isLogin ? (
      //       <>
      //         <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
      //         <div className="absolute top-40 right-20 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
      //         <div className="absolute bottom-20 left-40 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-2000"></div>
      //       </>
      //     ) : (
      //       <>
      //         <div className="absolute top-20 left-20 w-72 h-72 bg-emerald-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
      //         <div className="absolute top-40 right-20 w-72 h-72 bg-teal-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
      //         <div className="absolute bottom-20 left-40 w-72 h-72 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-2000"></div>
      //       </>
      //     )}
      //   </div>

//         <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:50px_50px]"></div>

//         <div className="relative z-10 flex flex-col justify-center items-center text-center px-12 text-white">
//           <div className="mb-8">
//             <div className={`w-16 h-16 ${isLogin ? 'bg-gradient-to-r from-blue-400 to-purple-500' : 'from-emerald-400 to-teal-500'} rounded-2xl flex items-center justify-center mb-4 shadow-2xl`}>
//               <div className="w-8 h-8 bg-white rounded-lg transform rotate-45"></div>
//             </div>
//             <h1 className={`text-4xl font-bold bg-clip-text text-transparent ${isLogin ? 'bg-gradient-to-r from-blue-400 to-purple-400' : 'bg-gradient-to-r from-emerald-400 to-teal-400'}`}>
//               TechFlow
//             </h1>
//           </div>

//           <h2 className="text-3xl font-semibold mb-4 leading-tight">
//             {isLogin ? 'Welcome to the future of' : 'Start your journey with'}
//             <span className={`block bg-clip-text text-transparent ${isLogin ? 'bg-gradient-to-r from-blue-400 to-purple-400' : 'bg-gradient-to-r from-emerald-400 to-teal-400'}`}>
//               {isLogin ? 'digital innovation' : 'cutting-edge technology'}
//             </span>
//           </h2>
//           <p className="text-slate-300 text-lg max-w-md leading-relaxed">
//             {isLogin
//               ? 'Join thousands of professionals who trust our platform to streamline their workflow and boost productivity.'
//               : 'Create your account and unlock powerful tools designed to transform your workflow and accelerate your success.'}
//           </p>
//         </div>
//       </div>

//       {/* Right Side - Form */}
//       <div className="w-full lg:w-1/2 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-8">
//         <div className="w-full max-w-md">
//           {/* Mobile Logo */}
//           <div className="lg:hidden text-center mb-8">
//             <div className={`w-12 h-12 ${isLogin ? 'bg-gradient-to-r from-blue-500 to-purple-600' : 'bg-gradient-to-r from-emerald-500 to-teal-600'} rounded-xl flex items-center justify-center mx-auto mb-3 shadow-lg`}>
//               <div className="w-6 h-6 bg-white rounded-md transform rotate-45"></div>
//             </div>
//             <h1 className="text-2xl font-bold text-slate-800">TechFlow</h1>
//           </div>

//           <div className="bg-slate-800 backdrop-blur-xl border border-slate-700/50 rounded-2xl shadow-2xl p-8 transition-all duration-300 hover:shadow-3xl">
//             {/* Header */}
//             <div className="text-center mb-8">
//               <h2 className="text-3xl font-bold text-white mb-2">{isLogin ? 'Login' : 'Sign Up'}</h2>
//               <p className="text-slate-400 text-lg">{isLogin ? 'Login to your account!' : 'Create your account to get started!'}</p>
//             </div>

//             <form onSubmit={onSubmitHandler} className="space-y-6">
//               {!isLogin && (
//                 <div className="group">
//                   <label htmlFor="fullName" className="block text-sm font-medium text-slate-300 mb-2">
//                     Full Name
//                   </label>
//                   <div className="relative">
//                     <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
//                       <User className="h-5 w-5 text-slate-400" />
//                     </div>
//                     <input
//                       id="fullName"
//                       type="text"
//                       value={fullName}
//                       onChange={(e) => setFullName(e.target.value)}
//                       className="block w-full pl-12 pr-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
//                       placeholder="Enter your full name"
//                       required
//                     />
//                   </div>
//                 </div>
//               )}

//               <div className="group">
//                 <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">
//                   Email Address
//                 </label>
//                 <div className="relative">
//                   <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
//                     <Mail className="h-5 w-5 text-slate-400" />
//                   </div>
//                   <input
//                     id="email"
//                     type="email"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     className="block w-full pl-12 pr-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     placeholder="Enter your email"
//                     required
//                   />
//                 </div>
//               </div>

//               <div className="group">
//                 <label htmlFor="password" className="block text-sm font-medium text-slate-300 mb-2">
//                   Password
//                 </label>
//                 <div className="relative">
//                   <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
//                     <Lock className="h-5 w-5 text-slate-400" />
//                   </div>
//                   <input
//                     id="password"
//                     type={showPassword ? 'text' : 'password'}
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     className="block w-full pl-12 pr-12 py-3 bg-slate-700/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     placeholder={isLogin ? 'Enter your password' : 'Create a strong password'}
//                     required
//                   />
//                   <button
//                     type="button"
//                     className="absolute inset-y-0 right-0 pr-4 flex items-center"
//                     onClick={() => setShowPassword(!showPassword)}
//                   >
//                     {showPassword ? <EyeOff className="h-5 w-5 text-slate-400" /> : <Eye className="h-5 w-5 text-slate-400" />}
//                   </button>
//                 </div>
//               </div>

//               {!isLogin && (
//                 <div className="text-xs text-slate-400 space-y-1">
//                   <p>Password must contain:</p>
//                   <ul className="list-disc list-inside space-y-1 ml-2">
//                     <li>At least 8 characters</li>
//                     <li>One uppercase and lowercase letter</li>
//                     <li>One number and special character</li>
//                   </ul>
//                 </div>
//               )}

//               <button
//                 type="submit"
//                 className={`w-full ${isLogin ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700' : 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700'} text-white font-semibold py-3 px-6 rounded-xl shadow-lg transform transition-all duration-200 hover:shadow-xl`}
//               >
//                 {isLogin ? 'Login' : 'Create Account'}
//               </button>
//             </form>

//             <div className="mt-8 text-center">
//               <p className="text-slate-400">
//                 {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
//                 <button
//                   onClick={() => setIsLogin(!isLogin)}
//                   className={`font-medium underline transition-colors duration-200 ${isLogin ? 'text-blue-400 hover:text-blue-300' : 'text-emerald-400 hover:text-emerald-300'}`}
//                 >
//                   {isLogin ? 'Sign up' : 'Login'}
//                 </button>
//               </p>
//             </div>
//           </div>

//           <div className="mt-8 text-center text-sm text-slate-500">
//             <p>© 2024 TechFlow. All rights reserved.</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default AuthPage;

//3rd code

"use client"

import { useContext, useState } from "react"
import { User, Mail, Lock, ArrowLeft } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import { toast } from "react-toastify"

const PartnerLogin = () => {
  const [state, setState] = useState("Sign Up")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const navigate = useNavigate()
  // const{backendUrl} = useContext(AppContext);  
  const backendUrl = "http://localhost:5050"; 
  // const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:5050"

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      axios.defaults.withCredentials = true
      const url = backendUrl + (state === "Sign Up" ? "/api/auth/register" : "/api/auth/login")
      const payload = state === "Sign Up" ? { name, email, password } : { email, password }

      const { data } = await axios.post(url, payload)

      if (data.success) {
        toast.success(state === "Sign Up" ? "Account created successfully!" : "Login successful!")
        navigate("/")
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message || "Something went wrong")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen">
      {/* Left Side */}
      <div className="w-1/2 hidden md:flex flex-col justify-center items-center bg-gradient-to-br from-green-600 via-emerald-600 to-teal-700 text-white p-10 relative overflow-hidden">
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
          <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-6 mx-auto shadow-2xl">
            <div className="text-center text-white">
              <div className="text-lg font-bold">TF</div>
            </div>
          </div>

          <h1 className="text-4xl font-bold mb-2">TechFlow</h1>
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
                     className="text-green-400 hover:text-green-300 cursor-pointer text-xs transition-colors" >
                    Forgot password?
                     </Link>
                  
                    {/* </Link>
                    Forgot password?
                  {/* </Link> */}
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
                    Sign in here
                  </span>
                </p>
              ) : (
                <p className="text-gray-400 text-center text-xs">
                  {"Don't have an account?"}{" "}
                  <span
                    onClick={() => setState("Sign Up")}
                    className="text-green-400 hover:text-green-300 underline cursor-pointer transition-colors"
                  >
                    Sign up here
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
 