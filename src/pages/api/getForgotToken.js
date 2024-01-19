import forgot from "../../../models/Forgot";
import connectDb from "../../../middleware/mongoose"; 

const handler = async (req, res) => {
    const {token} = req.query;  
    // (GET REQUEST)
    try {
        if(token){ // see if body is not null
            let tokenExists = await forgot.findOne({token}); 
            res.status(200).json({tokenExists});
        }else{
            res.status(400).json({error : "Incorrect query"});
        }

    } catch (error) {
        res.status(400).json({Error : "Internal Server Error."})
    }
    
}

export default connectDb(handler);