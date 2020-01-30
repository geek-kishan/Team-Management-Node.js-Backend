const Task = require("../models/tasks");

module.exports = async(taskData) =>{
    try{
        const task = await new Task(taskData);
        const createdTask = await task.save();
        return {
            message: "task created",
            taskDetails: createdTask
        }
    }catch(err){
        console.log(err);
        return false;
    }
}