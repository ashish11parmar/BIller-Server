const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName: {
        type: String
    },
    lastName: {
        type: String,
    },
    email: {
        type: String,
        lowercase: true,
        unique: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    number: {
        type: String
    },
    isCompany: {
        type: Boolean,
        default: false,
    },
    otp: {
        type: Number
    },
    otpExpire: {
        type: Date
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    auth_token: {
        type: String
    },
})

const User = mongoose.model('user', userSchema);
module.exports = User;