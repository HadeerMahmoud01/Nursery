
 const mongoose=require("mongoose");
 require("./../Models/classModel")
 const classschema=mongoose.model("classes");
 const teacherschema=mongoose.model("teachers");
const childschema=mongoose.model("children");


exports.getclasses=(request,response,next)=>{
    classschema.find({})
    .populate({path:"teachers",select:{firstname:1}})
    .populate({path:"children",select:{firstname:1}})
    .then(data=>{
        response.status(200).json({data}) 
    })
    .catch(error=>next(error))
   
}
exports.getclass=(request,response)=>{
    response.status(200).json({message:"one class"})
}
exports.postclasses=(request,response)=>{

   teacherschema.findOne({_id:request.body.teachers})
    .then(teachers=>{
            if(teachers==null)
            throw new Error("teachers not exists");

            let object=new classschema({
              
                name:request.body.name,
               supervisor:request.body.supervisor,
               children:request.body.children
            })
        return  object.save();
    })
    .then(data=>{
                response.status(201).json(data);
    })
    .catch(error=>next(error))

}

exports.patchclasses=(request,response)=>{

    classschema.updateOne({
        _id:request.body.id
   },{
        $set:{
           
            name:request.body.name,
            supervisor:request.body.supervisor,
            children:request.body.children
        }
   })
   .then(data=>{
    response.status(200).json({data})
   })
   .catch(error=>{
    next(error);
   })
}

exports.deleteclasses=(request,response)=>{
   classschema.deleteOne({
        _id:request.body.id
    })
    .then(data=>{
        response.status(200).json({data})
    })
    .catch(error=>{
        next(error);
    })

};