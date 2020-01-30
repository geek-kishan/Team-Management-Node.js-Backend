const User = require("../models/users");

module.exports = async (req,res,next)=>{
    try{
        const email = await req.body.email;
        const user = await User.findOne({email:email});
        if(user){
            return res.status(400).send("User already exists!");
        }
    }catch(err){
        console.log(err);
    }
    next();
}