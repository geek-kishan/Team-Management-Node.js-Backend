const User = require("../models/users");

module.exports = async (newMembers)=>{
    try{
        let taskId = newMembers.taskId;
        let assignTo = newMembers.members;
        // console.log(assignTo);
        const updatedArrays = await User.updateMany({_id:{$in:assignTo}},{$push:{mytasks: taskId}},{multi:true});
        // console.log(updatedArrays);
        return true;
    }catch(err){
        console.log(err);
        return false;
    }

}