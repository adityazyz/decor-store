import Product from "../../../models/Product";
import connectDb from "../../../middleware/mongoose"; 

const handler = async (req, res) => {
    // parse the request body 
    let body = req.body ? JSON.parse(req.body) : null;
    
    // (POST REQUEST)
    if(body){ // see if body is not null
        const filter = body.filter;  //extract the filter from body for further use

        let products = await Product.find(filter); 
        res.status(200).json({products});
    }else{

    // (GET REQUEST)
        // if body is null
        let products = await Product.find();
        res.status(200).json({products});
    }
    
    
    
}
export default connectDb(handler);