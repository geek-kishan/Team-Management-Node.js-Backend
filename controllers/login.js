const User = require("../models/users"),
      encryption = require("./encryption"),
      jwt = require("jsonwebtoken"),
      key = "xyz";

module.exports = async (userData)=>{
    try{
        const user = await User.findOne({email: userData.email});
        if(!user){
            console.log("user not available");
            return false;
        }
        if(userData.password !== await encryption.decrypt(user.password)){
            console.log("old password is wrong");
            return false;
        }else{
            let payload = {subject: user._id};
            let token = jwt.sign(payload,key);
            return {
                message:"LoggedIn Successfully",
                token: token
            }
        }
    }catch(err){
        console.log(err);
    }
}