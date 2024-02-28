const jwt = require('jsonwebtoken');
const User = require('../model/user.model');
const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');
const handlebars = require('handlebars');
const userService = {};

userService.adminSignup = async (req) => {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await User.findOne({ email: req.body.email })
            if (response) { 
                resolve({ msg: "user already exists.", status: 400 }) 
            }
            const otp = Math.floor(1000 + Math.random() * 9000);
            const expire = Date.now() + 600 * 1000; // 10 minute from now
            req.body.otp = otp;
            req.body.otpExpire = expire;
            sendVerificationCode(req.body.email, otp)
            const user = new User(req.body);
            await user.save();
            resolve({ msg: "user registered succesfully", status: 201 })
        } catch (error) {
            console.log(error);
            reject({ msg: "Internal Server Error...", status: 500, data: error })
        }
    })
}

userService.verifyOTP = async (req) => {
    return new Promise(async (resolve, reject) => {
        try {
            const { email, otp } = req.body;
            if (!email || !otp) {
                resolve({ msg: "OTP is required.", status: 400 });
            }
            const user = await User.findOne({ email });
            if (!user) {
                resolve({ msg: "User not found.", status: 404 });
            }
            console.log('user >> ', user.otp, otp);
            if (user.otp !== otp) {
                resolve({ msg: "The OTP entered is invalid please verify its accuracy.", status: 401 });
            }
            if (user.otpExpire && new Date() > new Date(user.otpExpire)) {
                resolve({ msg: "OTP has expired.", status: 401 });
            }
            user.isVerified = true;
            await User.findOneAndUpdate({ email }, { $unset: { otp: 1 } }, { new: true });
            await User.findOneAndUpdate({ email }, { $unset: { otpExpire: 1 } }, { new: true });
            if(req.body.actionType == 'signup'){
                await user.save();
                resolve({ msg: "Email verified successfully.", status: 200 })
            }else{
                const token = jwt.sign({ user: user._id }, 'shhhhh'); // need to replace with env variable and expire time
                await User.findOneAndUpdate({ email }, { $set: { auth_token: token } });
                resolve({ msg: "Email verified successfully.", status: 200, token: token })
            }
        } catch (error) {
            console.error("Error verifying OTP:", error);
            reject({ msg: "Internal Server Error.", status: 500, data: error });
        }
    });
}

userService.resendOtp = async (req) => {
    return new Promise(async (resolve, reject) => {
        try {
            const { email } = req.body;
            if (!email) {
                resolve({ msg: "Email is required.", status: 400 });
            }
            const user = await User.findOne({ email });
            if (!user) {
                resolve({ msg: "User not found.", status: 404 });
            }
            // Generate a new OTP
            const otp = Math.floor(1000 + Math.random() * 9000);
            const expire = Date.now() + 600 * 1000; // 10 minute from now 
            // Send the new OTP to the user's email
            sendVerificationCode(email, otp);
            await User.findOneAndUpdate({ email }, { $set: { otp: otp }, }, { new: true })
            await User.findOneAndUpdate({ email }, { $set: { otpExpire: expire } }, { new: true })
            // Update the user record in the database with the new OTP
            resolve({ msg: "OTP resent successfully.", status: 200 });
        } catch (error) {
            console.error("Error resending OTP:", error);
            reject({ msg: "Internal Server Error.", status: 500, data: error });
        }
    });
}

userService.adminLogin = async (req) => {
    return new Promise(async (resolve, reject) => {
        try {
            const email = req.body.email;
            if (!email) {
                resolve({ msg: "Email is required.", status: 400 });
            }
            const user = await User.findOne({ email: email });
            if (!user) {
                resolve({ msg: "User not found.", status: 404 });
            }else{
                if (!user.isVerified) {
                    resolve({ msg: "Email not verified.", status: 401 });
                }

                // Generate a new OTP
                const otp = Math.floor(1000 + Math.random() * 9000);
                const expire = Date.now() + 600 * 1000; // 10 minute from now 
                sendVerificationCode(email, otp);
                await User.findOneAndUpdate({ email }, { $set: { otp: otp }, }, { new: true })
                await User.findOneAndUpdate({ email }, { $set: { otpExpire: expire } }, { new: true })

                resolve({ msg: "We've sent an OTP to your email. Please verify it to login.", status: 200 });
            }
        } catch (error) {
            console.error("Error logging in:", error);
            reject({ msg: "Internal Server Error.", status: 500, data: error });
        }
    });

}

const sendVerificationCode = async (email, otp) => {
    const emailTemplateSource = fs.readFileSync(path.join(__dirname, "../views/verification.hbs"), "utf8")
    const otpTemplate = handlebars.compile(emailTemplateSource)
    const htmlToSend = otpTemplate({ otp })
    const mailOptions = {
        from: process.env.AUTH_EMAIL,
        to: email,
        subject: "BILLER Aplication - OTP Verification",
        html: htmlToSend
    }

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.AUTH_EMAIL,
            pass: process.env.AUTH_PASSWORD
        }
    });

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error("Error sending email:", error);
        } else {
            res.status(200).json({ msg: "Email sent successfully." });
        }
    });
}

module.exports = userService;