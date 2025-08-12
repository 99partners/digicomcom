import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import userModel from '../models/UserModel.js';
import transporter from '../config/nodemailer.js';
import { EMAIL_VERIFY_TEMPLATE, PASSWORD_RESET_TEMPLATE } from '../config/emailTemplets.js';

// Token helpers
const getAccessSecret = () => {
    return process.env.JWT_ACCESS_SECRET || process.env.JWT_SECRET || process.env.JWT_SECRET_KEY;
};

const getRefreshSecret = () => {
    return process.env.JWT_REFRESH_SECRET || process.env.JWT_SECRET || process.env.JWT_SECRET_KEY;
};

const generateAccessToken = (userId) => {
    const secret = getAccessSecret();
    if (!secret) throw new Error('JWT access secret not configured');
    // Short-lived access token (15 minutes)
    return jwt.sign({ id: userId }, secret, { expiresIn: '15m' });
};

const generateRefreshToken = (userId) => {
    const secret = getRefreshSecret();
    if (!secret) throw new Error('JWT refresh secret not configured');
    // Long-lived refresh token (7 days)
    return jwt.sign({ id: userId }, secret, { expiresIn: '7d' });
};

const getCookieBaseOptions = () => ({
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    domain: process.env.NODE_ENV === 'production' ? '.99digicom.com' : undefined,
    path: '/',
});


export const register = async (req, res)=>{

    const{name, email, password, phone} = req.body;
    if(!name || !email || !password || !phone){
        return res.json({success:false,message:"Missing Details"});
    }

    try{
        // Check for existing email
        const existingUser = await userModel.findOne({email})
        if(existingUser){
            return res.json({success:false, message:"User already exists with this email"})
        }

        // Check for existing phone number
        const existingPhone = await userModel.findOne({phone})
        if(existingPhone){
            return res.json({success:false, message:"User already exists with this phone number"})
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        //generate OTP for email verification
        const otp = String(Math.floor(100000 + Math.random() * 900000)) //6 digits random number
        
        const user = new userModel({
            name,
            email,
            phone,
            password: hashedPassword,
            verifyOtp: otp,
            verifyOtpExpireAt: Date.now() + 24*60*60*1000 //1day
        })
        await user.save()

        // Issue tokens (access + refresh)
        const accessToken = generateAccessToken(user._id);
        const refreshToken = generateRefreshToken(user._id);

        // Set cookies
        const baseCookie = getCookieBaseOptions();
        res.cookie('token', accessToken, { ...baseCookie, maxAge: 15 * 60 * 1000 });
        res.cookie('refreshToken', refreshToken, { ...baseCookie, maxAge: 7 * 24 * 60 * 60 * 1000 });

        //send OTP verification email to user
        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: email,
            subject: 'Account Verification OTP',
            html: EMAIL_VERIFY_TEMPLATE.replace("{{otp}}", otp).replace("{{email}}", email)
        }
        await transporter.sendMail(mailOptions)

        console.log('Registration successful and verification OTP sent to:', email, 'OTP:', otp)

        // Return user data and token
        const userData = {
            id: user._id,
            name: user.name,
            email: user.email,
            phone: user.phone
        };

        return res.json({
            success: true,
            token: accessToken,
            user: userData
        });

    } catch(err) {
        res.json({success:false, messsage: err.message})
    }
}

export const login = async(req, res) => {
    const {email, password} = req.body;

    if(!email || !password){
        return res.json({success:false, message:"Email and Password are required"});
    }

    try {
        const user = await userModel.findOne({email})
        if(!user){
            return res.json({success:false, message:"Invalid Email"})
        }

        const isPasswordValid = await bcrypt.compare(password, user.password)

        if(!isPasswordValid){
            return res.json({success:false, message:"Invalid Password"})
        }

        // Issue tokens (access + refresh)
        const accessToken = generateAccessToken(user._id);
        const refreshToken = generateRefreshToken(user._id);

        // Set cookies
        const cookieOptions = getCookieBaseOptions();
        res.cookie('token', accessToken, { ...cookieOptions, maxAge: 15 * 60 * 1000 });
        res.cookie('refreshToken', refreshToken, { ...cookieOptions, maxAge: 7 * 24 * 60 * 60 * 1000 });

        // If user is not verified, send OTP automatically
        if (!user.isAccountVerified) {
            const otp = String(Math.floor(100000 + Math.random() * 900000)) //6 digits random number
            user.verifyOtp = otp;
            user.verifyOtpExpireAt = Date.now() + 24*60*60*1000; //1day
            await user.save();

            //send OTP verification email to user
            const mailOptions = {
                from: process.env.SENDER_EMAIL,
                to: user.email,
                subject: 'Account Verification OTP',
                html: EMAIL_VERIFY_TEMPLATE.replace("{{otp}}", otp).replace("{{email}}", user.email)
            }
            await transporter.sendMail(mailOptions);

            console.log('Login successful for unverified user, OTP sent to:', user.email, 'OTP:', otp);
        }

        // Return user data and token
        const userData = {
            id: user._id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            isAccountVerified: user.isAccountVerified
        };

        return res.json({
            success: true,
            token: accessToken,
            user: userData
        });

    } catch(err) {
        console.error('Login error:', err);
        res.status(500).json({success:false, message: err.message}) 
    }
}

export const logout = (req, res) => {
    try {
        const cookieOptions = getCookieBaseOptions();
        res.clearCookie('token', cookieOptions);
        res.clearCookie('refreshToken', cookieOptions);
        return res.json({success: true, message: "Logged Out Successfully"});
    } catch (err) {
        console.error('Logout error:', err);
        res.status(500).json({success: false, message: err.message});
    }
}

// Refresh access token using refresh token cookie
export const refreshToken = async (req, res) => {
    try {
        const tokenFromCookie = req.cookies?.refreshToken;
        if (!tokenFromCookie) {
            return res.status(401).json({ success: false, message: 'Refresh token missing' });
        }

        const secret = getRefreshSecret();
        let decoded;
        try {
            decoded = jwt.verify(tokenFromCookie, secret);
        } catch (err) {
            return res.status(401).json({ success: false, message: 'Invalid or expired refresh token' });
        }

        const user = await userModel.findById(decoded.id).select('_id');
        if (!user) {
            return res.status(401).json({ success: false, message: 'User not found' });
        }

        const newAccessToken = generateAccessToken(user._id);
        const cookieOptions = getCookieBaseOptions();
        res.cookie('token', newAccessToken, { ...cookieOptions, maxAge: 15 * 60 * 1000 });

        return res.json({ success: true, token: newAccessToken });
    } catch (error) {
        console.error('Refresh token error:', error);
        return res.status(500).json({ success: false, message: 'Server error during token refresh' });
    }
};


//Send verification OPT to user email
export const sendVerifyOtp = async(req, res)=>{
    console.log('Received OTP request for user:', req.user?.id);

    try {
        // Get user from token instead of requiring userId in body
        const user = await userModel.findById(req.user.id);

        if (!user) {
            return res.status(404).json({success:false, message:"User not found"});
        }

        if(user.isAccountVerified){
            return res.status(400).json({success:false, message:"Account already verified"});
        }

        //generate OTP send user email.
        const otp = String(Math.floor(100000 + Math.random() * 900000)) //6 digits random number
        user.verifyOtp = otp;
        user.verifyOtpExpireAt = Date.now() + 24*60*60*1000; //1day
        await user.save();

        console.log('Generated OTP for user:', { 
            userId: user._id,
            otp: otp,
            expiresAt: user.verifyOtpExpireAt
        });

        //now send otp to user email.
        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: user.email,
            subject: 'Account Verification OTP',
            html: EMAIL_VERIFY_TEMPLATE.replace("{{otp}}", otp).replace("{{email}}", user.email)
        }
        
        //send email
        await transporter.sendMail(mailOptions);

        console.log('Sent verification email to:', user.email);

        return res.json({success:true, message:"Verification code sent to your email"});
        
    } catch(err) {
        console.error('Error sending verification OTP:', err);
        return res.status(500).json({success:false, message: err.message});
    }
}

//Verify OTP and update user account to verified
export const verifyEmail = async(req, res)=>{
    const {otp} = req.body;
    console.log('Received verification request:', { otp, userId: req.user?.id });

    if(!otp){
        return res.status(400).json({success:false, message:"OTP is required"});
    }

    try {
        const user = await userModel.findById(req.user.id);
        console.log('Found user:', { 
            userId: user?._id,
            hasOtp: !!user?.verifyOtp,
            isVerified: user?.isAccountVerified,
            otpExpiry: user?.verifyOtpExpireAt
        });

        if(!user){
            return res.status(404).json({success:false, message:"User not found"});
        }

        if(user.isAccountVerified){
            return res.status(400).json({success:false, message:"Account is already verified"});
        }

        if(!user.verifyOtp){
            return res.status(400).json({success:false, message:"No verification code found. Please request a new one."});
        }

        if(user.verifyOtp !== otp){
            console.log('OTP mismatch:', { 
                received: otp, 
                stored: user.verifyOtp 
            });
            return res.status(400).json({success:false, message:"Invalid verification code"});
        }

        if(user.verifyOtpExpireAt < Date.now()){
            return res.status(400).json({success:false, message:"Verification code has expired. Please request a new one."});
        }

        // Clear OTP and mark account as verified
        user.verifyOtp = undefined;
        user.verifyOtpExpireAt = undefined;
        user.isAccountVerified = true;
        await user.save();

        // Return updated user data
        const userData = {
            id: user._id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            isAccountVerified: true,
            profileImage: user.profileImage
        };

        console.log('Verification successful:', { userId: user._id });

        return res.json({
            success: true,
            message: "Email verified successfully",
            user: userData
        });

    } catch(err) {
        console.error('Email verification error:', err);
        return res.status(500).json({success:false, message: err.message});
    }
}


//check user is Authenticated or not.
export const isAuthenticated = async(req, res) => {
    try {
        // Get user from token (set by userAuth middleware)
        const user = await userModel.findById(req.user.id).select('-password -verifyOtp -resetOtp -verifyOtpExpireAt -resetOtpExpireAt');
        
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User not found"
            });
        }

        return res.json({
            success: true,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                isAccountVerified: user.isAccountVerified
            }
        });
    } catch(error) {
        console.error('Auth check error:', error);
        return res.status(401).json({
            success: false,
            message: error.message
        });
    }
}


export const isAuth = async (req, res) => {
    try {
        // Check for token in Authorization header first
        const authHeader = req.headers.authorization;
        let token;

        if (authHeader && authHeader.startsWith('Bearer ')) {
            token = authHeader.split(' ')[1];
        } else {
            token = req.cookies.token;
        }

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Not authenticated"
            });
        }

        // Use consistent JWT secret
        const jwtSecret = process.env.JWT_SECRET || process.env.JWT_SECRET_KEY;
        if (!jwtSecret) {
            console.error('JWT secret is not configured');
            return res.status(500).json({
                success: false,
                message: "Server configuration error"
            });
        }

        const decoded = jwt.verify(token, jwtSecret);
        const user = await userModel.findById(decoded.id).select('-password');

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User not found"
            });
        }

        return res.json({
            success: true,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                isAccountVerified: user.isAccountVerified
            }
        });

    } catch (error) {
        console.error('Auth check error:', error);
        if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
            return res.status(401).json({
                success: false,
                message: "Invalid or expired token"
            });
        }
        return res.status(500).json({
            success: false,
            message: "Server error during authentication check"
        });
    }
};

//send RESET PASSWORD OTP to user email
export const sendRestOtp = async(req, res)=>{
    const {email} = req.body;
    if(!email){
        return res.json({success:false, message:"Email is required"})
    }

    try {
        const user = await userModel.findOne({email})
        if(!user){
            return res.json({success:false, message:"User not found"})
        }
                //generate OTP send user email.
                const otp = String(Math.floor(100000 + Math.random() * 900000)) //6 digits random number
                user.resetOtp = otp
                user.resetOtpExpireAt = Date.now() + 15*60*1000 //15 minutes
                await user.save()
        
                //now send otp to user email.
                const mailOptions = {
                    from: process.env.SENDER_EMAIL,
                    to: user.email,
                    subject: 'Password Reset OTP',
                    // text: `Hello ${user.name}, Your OTP for password reset is ${otp}. It will expire in 15 minutes`
                    html: PASSWORD_RESET_TEMPLATE.replace("{{otp}}", otp).replace("{{email}}", user.email)
                }
                //send email
                await transporter.sendMail(mailOptions)

                return res.json({success:true, message:"Password Reset OTP sent to your email"})
        
    }catch(err) {
        return res.json({success:false, message: err.message})
    }
}

//Verify OTP and update user password
export const resetPassword = async(req, res)=>{
    const {email, otp, newPassword} = req.body;
    if(!email || !otp || !newPassword){
        return res.json({success:false, message:"Email, OTP and New Password required"})
    }

    try {
        const user = await userModel.findOne({email})

        if(!user){
            return res.json({success:false, message:"User not found"})
        }

        if(user.resetOtp === '' || user.resetOtp!== otp){
            return res.json({success:false, message:"Invalid OTP"})
        }

        if(user.resetOtpExpireAt < Date.now()){
            return res.json({success:false, message:"OTP expired. Please request a new OTP"})
        }

        //if OTP is valid.
        const hashedPassword = await bcrypt.hash(newPassword, 10)
        user.password = hashedPassword
        user.resetOtp = ''
        user.resetOtpExpireAt = 0
        await user.save()

        return res.json({success:true, message:"Password has been reset successfully"})
    }catch(err) {
        return res.json({success:false, message: err.message})
    }
}