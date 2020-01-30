const reply = {
    msg: "Bad request"
}

module.exports = {
    loginValidation: (req,res,next)=>{
        let user = req.body;
        if(user.password == null || user.email == null){
            return res.status(400).send(reply);
        }
        next();
    },
    signupValidation: (req,res,next)=>{
        let user = req.body;
        if(user.fname == null || user.lname == null || user.email == null || user.password == null){
            return res.status(400).send(reply);
        }
        next();
    },
    changepassValidation: (req,res,next)=>{
        // console.log(user);
        let user = req.body;
        if(user.newPass == null || user.oldPass == null){
            return res.status(400).send(reply);
        }
        next();
    }
}