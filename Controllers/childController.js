
const mongoose=require("mongoose");
require("./../Models/childModel");
const childschema=mongoose.model("children");







exports.getchildren=function(request,response,next){
        childschema.find({})
        .then(data=>{
          response.status(200).json({data})
        })
        .catch(error=>{
          next(error);
        })
    
  }

  exports.getchild=(request,response,next)=>{
          childschema.findOne({
            _id:request.params.id
          })
          .then(child=>{
            if(child==null){
              throw new error("no child exists")
            }
            response.status(200).json({child})
          })
          .catch(error=>{
            next(error);
          })
   
  }

exports.postchildren=(request,response,next)=>{
      let object=new childschema({
        _id:request.body.id,
        
        firstname:request.body.firstname,
        lastname:request.body.lastname,
        age:request.body.age,
        level:request.body.level,
        address:{
            city:request.body.city,
            street:request.body.street,
            buildingnum:request.body.buildingnum
        }
      })
      object.save()
      .then(child=>{
        response.status(201).json({child})
      })
      .catch(error=>{
        next(error);
      })


    
  }


  exports.patchchildren=(request,response,next)=>{
         childschema.updateOne({
          _id:request.body.id
         },{
          $set:{
            firstname:request.body.firstname,
            lastname:request.body.lastname,
            age:request.body.age,
            level:request.body.level,
            address:{
                city:request.body.address.city,
                street:request.body.address.street,
                buildingnum:request.body.address.buildingnum
            }
          }
         })
         .then(data=>{
          response.status(200).json({data:"update child"})
         })
         .catch(error=>{
          next(error);
        })
  }


  exports.deletechildren=(request,response,next)=>{
    childschema.deleteOne({
      _id:request.body.id
    })
    .then(data=>{
      response.status(200).json({data:"delete child"})
    })
    .catch(error=>{
      next(error);
    })
   
  };
  