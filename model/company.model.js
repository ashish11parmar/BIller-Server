const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const companySchema = new Schema({
    userId:{
        type: Schema.Types.ObjectId,
        required: true
    },
    companyName: {
        type: String,
        required: true
    },
    gstNumber: {
        type: String,
        unique: true,
        required: true
    },
    registerNumber: {
        type: String,
        unique: true,
        required: true
    },
    companyLogo: {
        type: String
    },
    companyEmail: {
        type: String
    },
    companyMobile:{
        type: String
    },
    companyTelephone:{
        type: String
    },
    websiteAddress:{
        type: String
    },
    locationDetails:{
        address:{
            type: String,
            required: true
        },
        city:{
            type: String,
            required: true
        },
        state:{
            type: String,
            required: true
        },
        country:{
            type: String,
            required: true
        },
        zipCode:{
            type: Number,
            required: true
        },
    },
    bankDetails:{
        name:{
            type: String,
            required: true
        },
        branch:{
            type: String,
            required: true
        },
        accountDetails:{
            type: String
        },
        ifscCode:{
            type: String,
            required: true
        }
    }
})

const company = mongoose.model('company', companySchema);
module.exports = company;