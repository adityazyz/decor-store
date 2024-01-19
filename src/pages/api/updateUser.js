import User from "../../../models/User";
import connectDb from "../../../middleware/mongoose";

const handler = async (req, res) => {

    if(req.method == "PUT"){ 
        let reqBody = req.body
            // if req.bodyy is in string form ..parse it into Json form
            // ( Body sent from thunderclient will be in json form default)
            // (this is for when we hit the endpoint from out code, using fetch req)
        if (typeof(req.body) === "string" ){
            reqBody = JSON.parse(req.body)
        }

        try {

            let data = await User.findOneAndUpdate({email:reqBody.email}, reqBody);
            res.status(200).json(data);

        } catch (error) {
            res.status(400).json({error:"Internal server error"})
        }
    }else{
        res.status(400).json({Error : "This method is not allowed."});
    }
}

export default connectDb(handler);