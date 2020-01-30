const reply = {
    message: "Bad request"
}
module.exports = {
    newtaskValidation: (req,res,next)=>{
        let taskData = req.body;
        if(taskData.name == null || taskData.task == null){
           return res.status(400).send(reply);
        }
        next();
    },
    addmembersValidation: (req,res,next)=>{
        let taskData = req.body;
        // console.log(taskData);
        if(taskData.taskId == null || taskData.members == null){
            console.log("error")
            return res.status(400).send(reply);
        }
        next();
    },
    taskstatusValidation: (req,res,next)=>{
        console.log(req.body);
        console.log("error isshoen");
        let taskData = req.body;
        if(taskData.status == null || taskData.taskId == null || taskData.status instanceof String){
            return res.status(400).send(reply);
        }
        next();
    }
}