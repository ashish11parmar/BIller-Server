const connection = require('mongoose');
const dotenv = require('dotenv');
const mongoose = require("mongoose");
dotenv.config({path:'./.env'});

//___________MongoDB Connection Function_______________
mongoose.connect(process.env.DB_URL).then(()=>{
    console.log("DB connected");
}).catch((err)=>{
    console.log(err);
});