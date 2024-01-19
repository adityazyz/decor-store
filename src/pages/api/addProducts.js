import Product from "../../../models/Product";
import connectDb from "../../../middleware/mongoose";

const handler = async (req, res) => {
    if(req.method == "POST"){
        let p = new Product(req.body)

        let data = await p.save();
        res.status(200).json(data);
    }else{
        res.status(400).json({Error : "This method is not allowed."});
    }
}

export default connectDb(handler);