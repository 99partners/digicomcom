import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useAuth } from '../context/AuthContext'
import { useAppContext } from '../context/AppContext'

const EmailVerify = () => {
  const [otp, setOtp] = useState(['', '', '', ''])
  const inputRefs = useRef([])
  const navigate = useNavigate()
  const { user, handleLogin } = useAuth()
  const { backendUrl } = useAppContext()

  const handleChange = (index, value) => {
    if (value.length > 1) return
    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)

    if (value && index < 3) {
      inputRefs.current[index + 1].focus()
    }
  }

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus()
    }
  }

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    try {
      const otpArray = inputRefs.current.map(e => e.value)
      const otp = otpArray.join('')

      const { data } = await axios.post(`${backendUrl}/api/auth/verify-account`, { otp })

      if (data.success) {
        // Only show success message for successful verification
        toast.success('Email verified successfully')
        
        try {
          // Get updated user data after verification
          const userResponse = await axios.get(`${backendUrl}/api/user/data`, { withCredentials: true });
          if (userResponse.data.success) {
            handleLogin(localStorage.getItem('authToken'), {
              ...user,
              ...userResponse.data.userData,
              isAccountVerified: true
            });
          }
          navigate('/partner')
        } catch (error) {
          // Silently handle user data fetch error
          console.log("Failed to fetch updated user data");
          navigate('/partner')
        }
      } else {
        // Show error only for invalid OTP
        toast.error('Invalid verification code')
      }
    } catch (error) {
      // Show error only for verification attempts
      if (error.response?.status === 400) {
        toast.error('Invalid verification code')
      } else if (error.response?.status === 500) {
        toast.error('Server error. Please try again later.')
      }
      // Don't show errors for other cases
    }
  }

  useEffect(() => {
    // Silently redirect verified users
    if (user?.isAccountVerified) {
      navigate('/partner')
    }
  }, [user, navigate])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Verify Your Email</h1>
          <p className="text-gray-600 mt-2">Enter the verification code sent to your email</p>
        </div>

        <form onSubmit={onSubmitHandler} className="space-y-6">
          <div className="flex justify-center space-x-4">
            {[0, 1, 2, 3].map((index) => (
              <input
                key={index}
                type="text"
                maxLength={1}
                ref={(el) => (inputRefs.current[index] = el)}
                value={otp[index]}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="w-14 h-14 text-2xl text-center border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />
            ))}
          </div>

          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            Verify Email
          </button>
        </form>
      </div>
    </div>
  )
}

export default EmailVerify
