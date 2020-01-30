const Task = require("../models/tasks");

module.exports = async (statusData)=>{
    try{
        const id = statusData.taskId;
        const task = await Task.findById(id);
        if(!task){
            return 0;
        }else{
            const taskStatus = statusData.status;
            const updatedTask = await Task.findByIdAndUpdate(id,{completed:taskStatus});
            return {
                Message: "Task updated",
                updatedTask: updatedTask
            }         
        }
    }catch(err){
        console.log(err);
        return false;
    }
}