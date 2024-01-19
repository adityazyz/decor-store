const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    user_id : {type : String , required : true},
    products : [
        {
            product_id : {type : String , required : true},
            product_specs : {
                color  : {type : String},
                size : {type : String}
            },
            product_quantity : {type : Number , required : true}
        }
    ],
    address : {type : String, required : true},
    amount : {type : Number, required : true},
    status : {type : String, required : true, default : "Pending"}

},{timestamps:true});

mongoose.models = {}; // to remove error

const model = mongoose.model("Order", orderSchema); 
export default model;