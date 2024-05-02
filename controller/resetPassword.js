const User = require("../model/User")
const bcrypt = require("bcrypt")
const crypto = require("crypto")

//resetPasswordToken
exports.resetPasswordToken = async(req,res) => {
      try{
          const { email} = req.body;
        
          
          const user = await User.findOne({email});
          if(!user) {
            return res.json({
                success:false,
                message:'Your Email is not registered with us'
            });
          }

          //generate token 
          const token = crypto.randomBytes(20).toString("hex");

          const updatedDetails = await User.findOneAndUpdate (
            {email},
            {
                token:token,
                resetPasswordExpires: Date.now() + 5*60*1000,
            },
            {new:true}
          )
        //   console.log(updatedDetails);
          //create url
          const url = `http://localhost:8001/reset-password/${token}`;
          return res.json({
            success:true,
            url
        });
      }catch(error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:'Something went wrong'
      })
    }
}

exports.resetPassword = async(req,res) => {
    try{
        const {password, confirmPassword, token} = req.body;
        
        if(password != confirmPassword) {
            return res.json({
                success:false,
                message:'Password not matching',
            });
        }
        //get userDetails from db using token
        const userDetails = await User.findOne({token})
        if(!userDetails) {
            return res.json({
                success:false,
                message:'Token is invaild',
            }); 
        }

        //token time check
        if(userDetails.resetPasswordExpires < Date.now()) {
            return res.json({
                success:false,
                message:'Token is expired, Please regenerate your token',
            }); 
        }

        //hash password
        const hashedPassword = await bcrypt.hash(password,10);
        //update password
        await User.findOneAndUpdate(
            {token: token},
            {password:hashedPassword},
            {new:true},
        )
         //return response
         return res.status(200).json({
            success:true,
            message:'Password reset successfully',
        });
    }catch(error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:'Something went wrong while reseting the password',
        });
    }
}

