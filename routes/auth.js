const express = require("express");
const isAlreadyExists = require("../controllers/alreadyExists");
const login = require("../controllers/login");
const signup = require("../controllers/signup");
const changepassword = require("../controllers/changePassword");
const verifyToken = require("../controllers/tokenVerifier");
const validator = require("../validations/authValidation");

const router = express.Router(); 

router.post("/login",validator.loginValidation,async (req,res)=>{
    try{
        let userData = req.body;
        const reply = await login(userData);
        if(reply == false){
            res.status(401).send({msg:"Invalid data!"});
        }else{
            res.status(201).send(reply);
        }
    }catch(err){
        console.log(err);
        res.status(500).send("Internal server error");
    }
    
});

router.post("/signup",validator.signupValidation,isAlreadyExists, async (req,res)=>{
    try{
        let userData = req.body;
        const reply = await signup(userData);
        res.status(201).json(reply);
    }catch(err){
        console.log(err);
        res.status(500).send("Internal server error");
    }
});

router.put("/changePassword",validator.changepassValidation,verifyToken, async (req,res)=>{
    try{
        let userData = req.body;
        userData.id = req.userId;
        const reply = await changepassword(userData);
        reply ? res.send("Password changed") : res.send("Wrong details");
    }catch(err){
        console.log(err);
        res.status(500).send("Internal server error");
    }
});

module.exports = router;