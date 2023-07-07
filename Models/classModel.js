const mongoose=require("mongoose");
const schema=new mongoose.Schema({
    _id:Number,
    name:String,
    supervisor:{type:Number,ref:"teachers"},
    children:{type:Array,ref:"children"}
})
mongoose.model("classes",schema);