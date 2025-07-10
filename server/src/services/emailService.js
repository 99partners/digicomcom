const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'smtp-relay.brevo.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD
  }
});

const sendOTPEmail = async (to, otp) => {
  try {
    await transporter.sendMail({
      from: process.env.SENDER_EMAIL,
      to: to,
      subject: 'Email Verification OTP',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">Email Verification</h2>
          <p>Your verification code is:</p>
          <h1 style="color: #4CAF50; font-size: 32px; letter-spacing: 2px;">${otp}</h1>
          <p>This code will expire in 5 minutes.</p>
          <p style="color: #666; font-size: 14px;">If you didn't request this code, please ignore this email.</p>
        </div>
      `
    });
    return true;
  } catch (error) {
    console.error('Email sending failed:', error);
    return false;
  }
};

const sendPasswordResetEmail = async (to, otp) => {
  try {
    await transporter.sendMail({
      from: process.env.SENDER_EMAIL,
      to: to,
      subject: 'Password Reset OTP',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">Password Reset Request</h2>
          <p>Your password reset code is:</p>
          <h1 style="color: #4CAF50; font-size: 32px; letter-spacing: 2px;">${otp}</h1>
          <p>This code will expire in 5 minutes.</p>
          <p style="color: #666; font-size: 14px;">If you didn't request this code, please ignore this email.</p>
        </div>
      `
    });
    return true;
  } catch (error) {
    console.error('Email sending failed:', error);
    return false;
  }
};

module.exports = {
  sendOTPEmail,
  sendPasswordResetEmail
}; 