const mongoose=require("mongoose");

const schema=new mongoose.Schema({
    _id:Number,
    firstname:String,
    lastname:String,
    password:String,
    email:String,
    image:String
})


// bcrypt.genSalt(saltRounds, function(err, salt) {
//     bcrypt.hash(myPlaintextPassword, salt, function(err, hash) {
//         // Store hash in your password DB.
//     });
// });





mongoose.model("teachers",schema);
