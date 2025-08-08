import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useAuth } from '../context/AuthContext'
import axiosInstance from '../config/api.config'

const EmailVerify = () => {
  const [otp, setOtp] = useState(['', '', '', '', '', ''])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const inputRefs = useRef([])
  const navigate = useNavigate()
  const { user, checkAuthStatus } = useAuth()

  useEffect(() => {
    const verifyAuth = async () => {
      try {
        const token = localStorage.getItem('authToken')
        if (!token) {
          toast.error('Please login to continue')
          navigate('/partnerlogin')
          return
        }

        // Try to get user data if not available
        if (!user) {
          await checkAuthStatus()
        }

        // Check if already verified
        if (user?.isAccountVerified) {
          toast.success('Your account is already verified')
          navigate('/partner')
          return
        }

        setIsLoading(false)
      } catch (error) {
        console.error('Auth check error:', error)
        toast.error('Authentication failed. Please login again.')
        navigate('/partnerlogin')
      }
    }

    verifyAuth()
  }, [user, navigate, checkAuthStatus])

  const handleChange = (index, value) => {
    // Only allow numbers
    if (!/^\d*$/.test(value)) return

    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1].focus()
    }
  }

  const handleKeyDown = (index, e) => {
    // Handle backspace
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const newOtp = [...otp]
      newOtp[index - 1] = ''
      setOtp(newOtp)
      inputRefs.current[index - 1].focus()
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const otpString = otp.join('')

    if (otpString.length !== 6) {
      toast.error('Please enter a valid 6-digit code')
      return
    }

    setIsSubmitting(true)

    try {
      // Ensure we have a token
      const token = localStorage.getItem('authToken')
      if (!token) {
        toast.error('Session expired. Please login again.')
        navigate('/partnerlogin')
        return
      }

      const response = await axiosInstance.post('/api/auth/verify-account', {
        otp: otpString
      })

      if (response.data.success) {
        toast.success('Email verified successfully')
        await checkAuthStatus() // Update auth context with new verification status
        navigate('/dashboard/profile')
      } else {
        toast.error(response.data.message || 'Verification failed')
        // Clear OTP fields on error
        setOtp(['', '', '', '', '', ''])
        // Focus first input
        inputRefs.current[0].focus()
      }
    } catch (error) {
      console.error('Verification error:', error)
      if (error.response?.status === 401) {
        toast.error('Session expired. Please login again.')
        navigate('/partnerlogin')
      } else {
        const errorMessage = error.response?.data?.message || 'Failed to verify email'
        console.log('Error details:', error.response?.data) // Add this for debugging
        toast.error(errorMessage)
        // Clear OTP fields on error
        setOtp(['', '', '', '', '', ''])
        // Focus first input
        inputRefs.current[0].focus()
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleResendOtp = async () => {
    if (isSubmitting) return

    setIsSubmitting(true)
    try {
      // Ensure we have a token
      const token = localStorage.getItem('authToken')
      if (!token) {
        toast.error('Session expired. Please login again.')
        navigate('/partnerlogin')
        return
      }

      const response = await axiosInstance.post('/api/auth/send-verify-otp')
      if (response.data.success) {
        toast.success('New verification code sent to your email')
        setOtp(['', '', '', '', '', '']) // Clear OTP fields
        // Focus first input
        inputRefs.current[0].focus()
      } else {
        toast.error(response.data.message || 'Failed to send verification code')
      }
    } catch (error) {
      console.error('Resend error:', error)
      if (error.response?.status === 401) {
        toast.error('Session expired. Please login again.')
        navigate('/partnerlogin')
      } else {
        toast.error(error.response?.data?.message || 'Failed to resend verification code')
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-white flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-green-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-lg">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Enter 6 Digit OTP</h2>
          <p className="text-sm text-gray-600">Please enter the verification code sent to your email</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex justify-center space-x-3">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="w-12 h-12 text-center text-2xl font-semibold border-2 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-colors"
                required
              />
            ))}
          </div>

          <div className="flex flex-col items-center space-y-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Verifying...
                </>
              ) : (
                'Verify Email'
              )}
            </button>

            <button
              type="button"
              onClick={handleResendOtp}
              disabled={isSubmitting}
              className="text-sm text-green-600 hover:text-green-700 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Resend Code
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EmailVerify