const mongoose = require("mongoose");
require("dotenv").config();

// console.log(process.env.MONGODB_URL)

exports.connect = async() => {
    try{
        await mongoose.connect(process.env.MONGODB_URL,{
            useNewUrlParser: true,
            useUnifiedTopology:true,
        })
        console.log("DB connected Successfully")
    }
catch(error) {
        console.log("DB connection failed");
       console.error(error);
        process.exit(1);
    }
};