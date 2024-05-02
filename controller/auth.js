const User = require("../model/User")
const bcrypt = require("bcrypt")

exports.registration = async (req,res) => {
    try{
        const {username, email, password} = req.body;

        //validation
        if(!username || !email || !password) {
            return res.status(403).json({
                success: false,
                message:"All fields are required",
            })
        }

        const existingUser = await User.findOne({email});
        if(existingUser) {
            return res.status(400).json({
                success:false,
                message:"User is already registered",
            })
        }
        
        //password hashing
        const hashedPassword = await bcrypt.hash(password, 10);

        //create db entry
        const user = await User.create({
            username,
            email,
            password:hashedPassword
        })

        return res.status(200).json({
            success: true,
            message: "User registered successfully",
            user
        })

    }catch(error){
        return res.status(500).json({
            sucess: false,
            message: "User cannot be registered, Please try again",
        })
    }
}

exports.login = async (req, res) => {
    try {
         const {email, password} = req.body;
         if(!email || !password) {
            return res.status(400).json({
                success:false,
                message: "All fields are requried",
            })
         }

         const user = await User.findOne({email})
         if(!user) {
            return res.status(400).json({
                success:false,
                message: "User is not registered, please do registration first",
            })
         }
   
        if(await bcrypt.compare(password, user.password)) {
            res.status(200).json({
                success:true,
                message:"User logged in successfully",
            })
        }else{
            return res.status(401).json({
                success: false,
                message: "Passsword is incorrect",
              });
        }
    }catch(error) {
        console.log(error);
        return res.status(500).json({
        success: false,
        message: "Login Failure, Please Try Again",
    });
    }
}