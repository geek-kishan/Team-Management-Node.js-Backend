const mongoose = require("mongoose");

/***************** Tasks document model **********************/

const tasksSchema = new mongoose.Schema({
        createdBy: {type:String, require: true},
        name: {type: String, required: true},
        task: {type: String, required: true},
        members: {type:[String], required: false},
        completed: {type: Boolean, default: false}
});

module.exports = mongoose.model("tasks",tasksSchema,"tasks");