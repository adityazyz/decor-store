import User from "../../../models/User";
import connectDb from "../../../middleware/mongoose";

const handler = async (req, res) => {

    if(req.method == "GET"){

        try {
            const {email} = req.query;  

            let user = await User.findOne({email});

            if(user && user.length != 0){
                res.status(200).json({success : true,user : user});
            }else{
                res.status(400).json({success : false , error : "User not found !"}); 
            }
        } catch (error) {
             res.status(400).json({error : "Internal server error."}); 
        }

       
        
    }else{
        res.status(400).json({error : "This method is not allowed."});
    }
    
}
export default connectDb(handler);