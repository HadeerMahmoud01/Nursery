const mongoose=require("mongoose");

require("./../Models/teacherModel");
const teacherschema=mongoose.model("teachers");
const bcrybt=require('bcrypt');
const { hash } = require("bcrypt");
const saltRounds =5;

exports.getallteachers=(request,response,next)=>{
        teacherschema.find({})
        .then(data=>{
            response.status(200).json({data})
        })
        .catch(error=>{
           next(error);
        })
   
}

exports.getteacher=(request,response,next)=>{
        teacherschema.findOne({_id:request.params.id})
        .then(teacher=>{
            if(teacher==null)
            {
                throw new Error("teacher not exists")
            }
            response.status(200).json({teacher})
        })
        .catch(error=>{
            next(error);
        })
    
    
}

exports.postteachers=(request,response,next)=>{
    bcrybt.hash(request.body.password,saltRounds,(error,hash)=>{
    let object=new teacherschema({
        _id:request.body.id,
        firstname:request.body.firstname,
        lastname:request.body.lastname,
        password:hash,
        email:request.body.email,
        image:request.body.image
    });
    object.save()
    .then(data=>{
        response.status(201).json({data});
    })
    .catch(error=>{
        next(error);
    })

}); 

}


exports.patchteachers=(request,response,next)=>{
       teacherschema.updateOne({
            _id:request.body.id
       },{
            $set:{
                firstname:request.body.firstname,
                lastname:request.body.lastname,
                password:request.body.password,
                email:request.body.email,
                image:request.body.image
            }
       })
       .then(data=>{
        if(request.body.id != request.decodedToken.id){
            throw new Error ("Can't Update Another Teacher...")
        }else{
            response.status(200).json({data:"update teacher"})
        }
        
       })
       .catch(error=>{
        next(error);
       })
}


exports.deleteteachers=(request,response,next)=>{
    teacherschema.deleteOne({
        _id:request.body.id
    })
    .then(data=>{
        response.status(200).json({data:"delete teacher"})
    })
    .catch(error=>{
        next(error);
    })

};
