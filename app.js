 0
const express = require("express");
const morgan =require("morgan");
const mongoose=require("mongoose");

const childroute=require("./routes/childroute");
const teacherroute=require("./routes/teacherroute");
const classroute=require("./routes/classroute");
const login=require("./routes/authenticationRoute");
const authenticatedmw=require("./MiddleWare/authmw");

const server =express();
mongoose.connect("mongodb://127.0.0.1:27017/ITIDB")
        .then(()=>{
            console.log("connected");
            server.listen(process.env.PORT||7206,()=>{
                console.log("server is ok");
            })
        })
        .catch(error=>{
                console.log("db problem"+error);
        })


 //server.use(morgan('tiny'));

 //first middle ware

 server.use((request,respond,next)=>{
        console.log(request.method,request.url);
        next();
 })

 //second middle
 server.use((request,respond,next)=>{
    if(true){
        next();
    }else{
        next(new Error("no authority"));
    }

 })
 //routes
 server.use(express.json());
 server.use(login);
 server.use(authenticatedmw);
server.use(childroute);
server.use(classroute);
server.use(teacherroute);

 //not found
 server.use((request,response,next)=>{
    response.status(404).json({message:"not found"});
 });

 //error
 server.use((error,request,response,next)=>{
    response.status(505).json({message:"error"+error});
 })