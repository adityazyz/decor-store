import forgot from "../../../models/Forgot";
import connectDb from "../../../middleware/mongoose";

const handler = async (req, res) => {
    let body = JSON.parse(req.body)
    if(req.method == "POST"){
        let p = new forgot(body)

        let data = await p.save();
        res.status(200).json(data);
    }else{
        res.status(400).json({Error : "This method is not allowed."});
    }
}

export default connectDb(handler);