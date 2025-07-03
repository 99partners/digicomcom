import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useAuth } from '../context/AuthContext'
import { useAppContext } from '../context/AppContext'

const EmailVerify = () => {
  const [otp, setOtp] = useState(['', '', '', '', '', ''])
  const inputRefs = useRef([])
  const navigate = useNavigate()
  const { user, handleLogin } = useAuth()
  const { backendUrl } = useAppContext()

  const handleChange = (index, value) => {
    if (value.length > 1) return
    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)

    if (value && index < 5) {
      inputRefs.current[index + 1].focus()
    }
  }

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus()
    }
  }

  const handlePaste = (e) => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData('text').trim()
    if (pastedData.length === 6 && /^\d+$/.test(pastedData)) {
      const digits = pastedData.split('')
      setOtp(digits)
      digits.forEach((digit, index) => {
        if (inputRefs.current[index]) {
          inputRefs.current[index].value = digit
        }
      })
      inputRefs.current[5].focus()
    }
  }

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    try {
      const otpArray = inputRefs.current.map(e => e.value)
      const otp = otpArray.join('')

      if (otp.length !== 6) {
        toast.error('Please enter all 6 digits')
        return
      }

      const { data } = await axios.post(`${backendUrl}/api/auth/verify-account`, { otp })

      if (data.success) {
        toast.success('Email verified successfully')
        
        try {
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
          console.log("Failed to fetch updated user data");
          navigate('/partner')
        }
      } else {
        toast.error('Invalid verification code')
      }
    } catch (error) {
      if (error.response?.status === 400) {
        toast.error('Invalid verification code')
      } else if (error.response?.status === 500) {
        toast.error('Server error. Please try again later.')
      }
    }
  }

  useEffect(() => {
    if (user?.isAccountVerified) {
      navigate('/partner')
    }
  }, [user, navigate])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Verify Your Email</h1>
          <p className="text-gray-600 mt-2">Enter the 6-digit verification code sent to your email</p>
        </div>

        <form onSubmit={onSubmitHandler} className="space-y-6">
          <div className="flex justify-center space-x-3">
            {[0, 1, 2, 3, 4, 5].map((index) => (
              <input
                key={index}
                type="text"
                maxLength={1}
                ref={(el) => (inputRefs.current[index] = el)}
                value={otp[index]}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={handlePaste}
                pattern="[0-9]"
                inputMode="numeric"
                autoComplete="one-time-code"
                required
                className="w-12 h-12 text-xl text-center border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
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
