const mongoose = require("mongoose");

const forgotSchema = new mongoose.Schema({
    email : {type : String , required : true},
    token : {type : String, required : true}, 
    createdAt : {type : Date, default : Date.now()}

});

// it gets deleted after 10 min
forgotSchema.index({ createdAt: 1 }, { expireAfterSeconds: 600 });

mongoose.models = {}; // to remove error

const model = mongoose.model("Forgot", forgotSchema); 
export default model;