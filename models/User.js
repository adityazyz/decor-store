const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name : {type : String, required : true},
    email : {type: String, required : true, unique : true},
    password : {type: String, required : true},
    address : {type: String,  default : ""},         
    pinCode :  {type: String,  default : ""},          
    phoneNumber : {type: String,  default : ""}

},{timestamps:true});

mongoose.models = {};              // to remove error
export default mongoose.model("User", userSchema);

