import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import userModel from '../models/UserModel.js';
import transporter from '../config/nodemailer.js';
import { EMAIL_VERIFY_TEMPLATE, PASSWORD_RESET_TEMPLATE } from '../config/emailTemplets.js';


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

        const user = new userModel({
            name,
            email,
            phone,
            password: hashedPassword
        })
        await user.save()

        //+++++++++++++++++ Now Generate Token For Auth++++++++++++++++++++++++

        //we are send this token using cookie.
         const token = jwt.sign({id: user._id}, process.env.JWT_SECRET_KEY, {expiresIn: '1d'})

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 1*24*60*60*1000
        });

        //we are send wellcome email to user...
        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: email,
            subject: 'Welcome to our site',
            text: `Hello ${name}, Welcome to our site. 
            We are happy to see you here.Your account has been created successfully with email id: ${email}.`

        }
        await transporter.sendMail(mailOptions)

        // Return user data and token
        const userData = {
            id: user._id,
            name: user.name,
            email: user.email,
            phone: user.phone
        };

        return res.json({
            success: true,
            token,
            user: userData
        });

    } catch(err) {
        res.json({success:false, messsage: err.message})
    }
}

export const login = async(req, res)=>{
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

        //if password is Matched then generate token.
         //we are send this token using cookie.


         const token = jwt.sign({id: user._id}, process.env.JWT_SECRET_KEY, {expiresIn: '1d'})

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 1*24*60*60*1000
        });

        // Return user data and token
        const userData = {
            id: user._id,
            name: user.name,
            email: user.email,
            phone: user.phone
        };

        return res.json({
            success: true,
            token,
            user: userData
        });

    } catch(err) {
        res.json({success:false, messsage: err.message}) 
    }
}

export const logout = (req, res)=>{
    try {
        res.clearCookie('token',{
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
        });
        return res.json({success:true, message:"Logged Out"})
    }catch (err) {
        res.json({success:false, messsage: err.message})
    }
}


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
export const isAuthenticated = async(req, res)=>{
    try {
        return res.json({success:true})
    }catch(error) {
        return res.json({success:false, message: error.message})
    }
}

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