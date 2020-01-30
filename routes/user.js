const express = require("express");
const verifyToken = require("../controllers/tokenVerifier");
const router = express.Router();
const User = require("../models/users");
const newtask = require("../controllers/newTask");
const addMembers = require("../controllers/addMembers");
const validator = require("../validations/taskValidation");
const taskStatus = require("../controllers/taskStatus");
const assignTo = require("../controllers/assignTask");

router.post("/newtask",validator.newtaskValidation,verifyToken, async(req,res)=>{
    try{
        let taskData = req.body;
        taskData.createdBy = req.userId;
        const reply = await newtask(taskData);
        if(reply == false){
            res.status(500).send("Internal server error");
        }else{
            if(reply.taskDetails.members !== null){
                let assignTaskTo = {
                    taskId : reply.taskDetails._id,
                    members : reply.taskDetails.members
                }
                const assignedTo = await assignTo(assignTaskTo);
                if(assignedTo == true){
                    res.status(201).send(reply);
                }else if(assignedTo == false){
                    res.status(500).send("Internal server error");
                }
            } 
        }
    }catch(err){
        console.log(err);
        res.status(500).send("Internal server error");
    }
});

router.put("/addmembers",validator.addmembersValidation,verifyToken, async(req,res)=>{
    try{
        let memberData = req.body;
        let reply = await addMembers(memberData);
        if(reply == 0){
            res.status(401).send("No task found");
        }else if(reply == false){
            res.status(500).send("Internal server error");    
        }else{
            let taskAssignedTo = assignTo(memberData);
            if(taskAssignedTo == false){
                res.send(500).send("Internal server error");
            }else{
                res.status(201).send("Members added and task assigned");
            }
        }
    }catch(err){
        console.log(err);
        res.status(500).send("Internal server error");
    }
});

router.put("/taskstatus",validator.taskstatusValidation, verifyToken, async(req,res)=>{
    try{
        let statusData = req.body;
        let reply = await taskStatus(statusData);
        if(reply == 0){
            res.status(401).send("No task found");
        }else{
            res.status(201).send(reply);
        }
    }catch(err){
        console.log(err);
        res.status(500).send("Internal server error");
    }
});

router.get("/allusers",verifyToken, async (req,res)=>{
    try{
        const users = await User.find({});
        if(!users){
            res.status(404).send({
                Message: "No userFound"
            });
        }else {
            res.status(201).send(users);
        }
    }catch(err){
        console.log(err);
        res.status(500).send("Internal server error");
    }
});

module.exports = router;