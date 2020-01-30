const mongoose = require("mongoose");

/****************** User document model ************************/

const userSchema = new mongoose.Schema({
    fname : {type: String, required: true},
    lname : {type: String, required: true},
    email : {type: String, required: true},
    mytasks : {type:[String], required: false},
    password : {type: String, required: true}
});

module.exports = mongoose.model("users",userSchema,"users");