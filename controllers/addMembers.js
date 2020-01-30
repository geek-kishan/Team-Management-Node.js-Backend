const Task = require("../models/tasks");

module.exports = async (memberData)=>{
    try{
        const id = memberData.taskId;
        const task = await Task.findById(id);
        if(!task){
            return 0;
        }
        const newMembers = memberData.members;
        const updatedTask = await Task.findByIdAndUpdate(id,{$pushAll:{members:newMembers}});
        return {
            Message:"members added",
            updatedTask: updatedTask
        }
    }catch(err){
        console.log(err);
    }
}
