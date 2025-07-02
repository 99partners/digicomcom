import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets.js'
import { toast } from 'react-toastify'
import axios from 'axios'
import { useAppContext } from '../context/AppContext'

const EmailVerify = () => {
  axios.defaults.withCredentials = true
  const inputRefs = React.useRef([])
  const navigate = useNavigate()
  
  // ✅ Using only the correct custom context hook
  const { backendUrl, isLogin, userData, getUserData } = useAppContext();

  const handelInput = (e, index) => {
    if (e.target.value.length > 0 && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus()
    }
  }

  const handelKeyDown = (e, index) => {
    if (e.key === 'Backspace' && e.target.value === '' && index > 0) {
      inputRefs.current[index - 1].focus()
    }
  }

  const handlePaste = (e) => {
    const paste = e.clipboardData.getData('text')
    const pasteArray = paste.split('')
    pasteArray.forEach((char, index) => {
      if (inputRefs.current[index]) {
        inputRefs.current[index].value = char
      }
    })
  }

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    try {
      const otpArray = inputRefs.current.map(e => e.value)
      const otp = otpArray.join('')

      const { data } = await axios.post(`${backendUrl}/api/auth/verify-account`, { otp })
      console.log("Backend URL:", backendUrl)

      if (data.success) {
        toast.success(data.message)
        await getUserData()
        navigate('/')
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message)
    }
  }

  useEffect(() => {
    if (isLogin && userData?.isAccountVerified) {
      navigate('/')
    }
  }, [isLogin, userData, navigate])

  return (
    <div className='flex items-center justify-center min-h-screen bg-gradient-to-br from-emerald-600 via-green-700 to-teal-800'>
      <img 
        onClick={() => navigate('/')} 
        src={assets.logo} 
        alt="logo"
        className='absolute left-5 sm:left-20 top-5 w-28 sm:w-32 cursor-pointer' 
      />

      <form onSubmit={onSubmitHandler} className='bg-slate-900 p-8 rounded-lg shadow-lg w-96 text-sm'>
        <h1 className='text-white text-2xl font-semibold text-center mb-4'>Email Verify OTP</h1>
        <p className='text-center mb-6 text-indigo-300'>Enter the 6-digit code sent to your email ID.</p>
        <div className='flex justify-between mb-8' onPaste={handlePaste}>
          {Array(6).fill(0).map((_, index) => (
            <input 
              ref={el => inputRefs.current[index] = el}
              key={index} 
              type="text" 
              maxLength="1"
              onInput={(e) => handelInput(e, index)}
              onKeyDown={(e) => handelKeyDown(e, index)}
              required
              className='w-12 h-12 bg-[#333A5C] text-white text-center text-lg rounded-md'
            />
          ))}
        </div>
        <button type="submit" className='w-full py-3 bg-gradient-to-r from-emerald-600 via-green-700 to-teal-800 text-white rounded-full'>
          Verify email
        </button>
      </form>
    </div>
  )
}

export default EmailVerify
