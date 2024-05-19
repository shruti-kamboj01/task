const User = require("../model/User")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

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
            const payload = {
                email: user.email,
                id: user._id
            };
            const token = jwt.sign(payload, process.env.JWT_SECRET, {
                expiresIn: "24h",
            });

            //save token to user document in db
            user.token = token;
            user.password = undefined

            res.status(200).json({
                success:true,
                token,
                user,
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