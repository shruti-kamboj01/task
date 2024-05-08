const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        require: true,
        trim:true,
    },
    email:{
        type:String,
        require: true,
        trim: true,
    },
    password:{
        type: String,
        require: true,
    },
    token:{
        type:String,
    },
    resetPasswordExpires:{
        type:Date,
    },
    post:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Post',
        require:true
    }]
})

module.exports = mongoose.model("User", userSchema);