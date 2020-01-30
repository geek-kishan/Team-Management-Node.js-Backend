const express = require("express")
    , mongoose = require("mongoose")
    , auth = require("./routes/auth")
    , user = require("./routes/user");

const app = express();
const PORT = process.env.port || 4001;
const dbUrl = "mongodb://localhost:27017/taskmanager";

app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.use("/auth", auth);
app.use("/user", user);

mongoose.connect(dbUrl,{useNewUrlParser:true,useUnifiedTopology:true},(err)=>{
    if(err){
        throw err;
    }else{
        console.log("connected with database");
    }
});

app.listen(PORT,()=> console.log(`server is running on localhost: ${PORT}`));