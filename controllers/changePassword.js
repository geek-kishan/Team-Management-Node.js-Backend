const User = require("../models/users");
const encryption = require("../controllers/encryption");

module.exports = async (userData)=>{
    try{
        userId = userData.id;
        oldPass = userData.oldPass;
        newPass = userData.newPass;

        const user = await User.findById(userId);
        if(!user){
            console.log("No user");
            return false;
        }
        if(oldPass !== await encryption.decrypt(user.password)){
            console.log("password does not match");
            return false;
        }else{
            console.log("password match");
            const updatedUser = await User.findByIdAndUpdate(userId,{password: await encryption.encrypt(newPass)});
            return true;
        }
    }catch(err){
        console.log(err);
    }
}