const jwt = require("jsonwebtoken");

module.exports = (req,res,next)=>{
    if(!req.headers.authorization){
        return res.status(401).send("Unauthorized access");
    }
    let token = req.headers.authorization.split(' ')[1];
    if(token === 'null'){
        return res.status(401).send("Unauthorized access!");
    }
    let payload = jwt.verify(token, 'xyz');
    if(!payload){
        return res.status(401).send("Unauthorised access!");
    }
    req.userId = payload.subject;
    next();
}