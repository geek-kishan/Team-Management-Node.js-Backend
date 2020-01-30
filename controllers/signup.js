const User = require("../models/users");
const jwt = require("jsonwebtoken");
const encryption = require("./encryption");
const key = "xyz";

module.exports = async (userData)=>{
    try{
        var password = await userData.password;
        userData.password = await encryption.encrypt(password);

        const newUser = new User(userData);
        const savedUser = await newUser.save();

        let payload = {subject: savedUser._id};
        let token = await jwt.sign(payload,key);
        
        return {
            message: "successfully signedIn",
            token: token
        };
    }catch(err){
        console.log(err);
    }
}