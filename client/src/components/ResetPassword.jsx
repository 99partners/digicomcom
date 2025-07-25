import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import logo from "../assets/99digicom.png"; // Using logo from Footer.jsx

const ResetPassword = () => {
  const { backendUrl } = useContext(AppContext);
  axios.defaults.withCredentials = true;

  const inputRefs = React.useRef([]);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);

  const handleInput = (e, index) => {
    if (e.target.value.length > 0 && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && e.target.value === "" && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    const paste = e.clipboardData.getData("text");
    const pasteArray = paste.split("");
    pasteArray.forEach((char, index) => {
      if (inputRefs.current[index]) {
        inputRefs.current[index].value = char;
      }
    });
    setOtp(pasteArray.join(""));
  };

  const onSubmitEmail = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        backendUrl + "/api/auth/send-reset-otp",
        { email }
      );
      if (data.success) {
        toast.success(data.message);
        setIsEmailSent(true);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  const onSubmitOtp = async (e) => {
    e.preventDefault();
    const otpArray = inputRefs.current.map((input) => input.value);
    const otpValue = otpArray.join("");
    if (otpValue.length === 6) {
      setOtp(otpValue);
      setIsOtpSent(true);
    } else {
      toast.error("Please enter the full 6-digit OTP.");
    }
  };

  const onSubmitNewPassword = async (e) => {
    e.preventDefault();
    if (!email || !otp || !newPassword) {
      toast.error("Email, OTP, and New Password are required.");
      return;
    }
    try {
      const { data } = await axios.post(
        backendUrl + "/api/auth/reset-password",
        {
          email,
          otp,
          newPassword,
        }
      );
      if (data.success) {
        toast.success(data.message);
        navigate("/partner");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-white to-green-300 px-2">
      {/* Logo */}
      <Link
        to="/"
        className="absolute left-2 sm:left-20 top-5 flex items-center space-x-2 group"
      >
        <img
          src={logo || "/placeholder.svg"}
          alt="Digicom Logo"
          className="h-12 w-auto object-contain"
        />
        <span className="text-xl font-bold bg-gradient-to-r from-green-600 to-green-500 bg-clip-text text-transparent group-hover:from-green-500 group-hover:to-green-600">
          Digicom
        </span>
      </Link>

      {!isEmailSent && (
        <form
          onSubmit={onSubmitEmail}
          className="bg-slate-900 p-6 sm:p-8 rounded-lg shadow-lg w-full max-w-xs sm:max-w-md text-sm"
        >
          <h1 className="text-white text-xl sm:text-2xl font-semibold text-center mb-4">
            Reset Password
          </h1>
          <p className="text-center mb-6 text-indigo-300">
            Enter your registered email address.
          </p>

          <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
            <img src={assets.mail_icon} alt="Email Icon" className="w-3 h-3" />
            <input
              type="email"
              placeholder="Email ID"
              className="bg-transparent outline-none text-white w-full"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <button className="w-full py-2.5 bg-gradient-to-r from-emerald-600 via-green-700 to-teal-800 text-white rounded-full mt-3">
            Submit
          </button>
        </form>
      )}

      {!isOtpSent && isEmailSent && (
        <form
          onSubmit={onSubmitOtp}
          className="bg-slate-900 p-6 sm:p-8 rounded-lg shadow-lg w-full max-w-xs sm:max-w-md text-sm"
        >
          <h1 className="text-white text-xl sm:text-2xl font-semibold text-center mb-4">
            Reset Password OTP
          </h1>
          <p className="text-center mb-6 text-indigo-300">
            Enter the 6-digit code sent to your email.
          </p>

          <div className="flex justify-between mb-8" onPaste={handlePaste}>
            {Array(6)
              .fill(0)
              .map((_, index) => (
                <input
                  ref={(el) => (inputRefs.current[index] = el)}
                  key={index}
                  type="text"
                  maxLength="1"
                  onInput={(e) => handleInput(e, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  required
                  className="w-10 h-10 sm:w-12 sm:h-12 bg-[#333A5C] text-white text-center text-lg rounded-md"
                />
              ))}
          </div>

          <button className="w-full py-2.5 bg-gradient-to-r from-emerald-600 via-green-700 to-teal-800 text-white rounded-full">
            Submit
          </button>
        </form>
      )}

      {isOtpSent && isEmailSent && (
        <form
          onSubmit={onSubmitNewPassword}
          className="bg-slate-900 p-6 sm:p-8 rounded-lg shadow-lg w-full max-w-xs sm:max-w-md text-sm"
        >
          <h1 className="text-white text-xl sm:text-2xl font-semibold text-center mb-4">
            New Password
          </h1>
          <p className="text-center mb-6 text-indigo-300">
            Enter the new password below.
          </p>

          <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
            <img
              src={assets.lock_icon}
              alt="Password Icon"
              className="w-3 h-3"
            />
            <input
              type="password"
              placeholder="New Password"
              className="bg-transparent outline-none text-white w-full"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>

          <button className="w-full py-2.5 bg-gradient-to-r from-emerald-600 via-green-700 to-teal-800 text-white rounded-full mt-3">
            Submit
          </button>
        </form>
      )}
    </div>
  );
};

export default ResetPassword;
