const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true,
        unique: true
    },
    profileImage:{
        type: String,
        default: ""
    }
},{timestamps:true});

const userModels = mongoose.model("userModels",userSchema);
module.exports = userModels;
