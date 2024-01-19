const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({

    product_category : {type : String, required : true} ,
    product_brand_name : {type : String, required : true},
    product_name : {type : String, required : true},
    product_description : {type : String, required : true} ,
    product_price : {type : Number, required : true} ,
    product_sizes : [String] ,
    product_colors :[String] ,
    product_brand_socials : {
        instagram : {type : String} ,
        facebook : {type : String} ,
        twitter :{type : String}
    },
    keywords : [{type : String, required : true}],
    quantities : {},
    product_image : {} ,
    
    
},{timestamps:true});

mongoose.models = {}; // to remove error

const model = mongoose.model("Product", productSchema);
export default model;