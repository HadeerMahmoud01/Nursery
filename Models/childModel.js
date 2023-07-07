const mongoose=require("mongoose");
const {AutoIncrementID} = require("@typegoose/auto-increment");
const schema=new mongoose.Schema({
    _id:Number,
    firstname:String,
    lastname:String,
    age:Number,
    level:{
        prekg:String,
        kg1:String,
        kg2:String
    },
    address:{
        city:String,
        street:String,
        buildingnum:Number
    }
})
schema.plugin(AutoIncrementID,{});
const model = mongoose.model("SomeModel",schema);
const doc = model.create({_id:1})
mongoose.model("children",schema);