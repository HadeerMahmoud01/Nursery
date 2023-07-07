const mongoose=require("mongoose");
const jwt=require("jsonwebtoken");
require("./../Models/teacherModel");
const teacherschema=mongoose.model("teachers");


exports.login=function(request,response,next){

if(request.body.email=="admin@gmail.com",request.body.password=="123"){
    const token=jwt.sign({
            id:1,
            role:"admin",
            username:"boss"
    },"nursery",{expiresIn:"1h"});

    response.status(200).json({data:"ok",token})

    
}else{

        teacherschema.findOne({email:request.body.email})
        .then(user=>{
            bcrypt.compare(request.body.password,user.password,function (error,request){
            if(user==null){
                throw new Error("Username or password incorrect..")
            }
            const token=jwt.sign({
                id:user_id,
                role:"teacher",
                
            },"nursery",{expiresIn:"1h"});

            response.status(200).json({data:"ok",token})

        });
        })//
        .catch(error=>{
            next(error);
        })

}



}