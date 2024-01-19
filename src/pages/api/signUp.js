import User from "../../../models/User";
import connectDb from "../../../middleware/mongoose"; 
import CryptoJS from "crypto-js";
 
const handler = async (req, res) => {
    if(req.method == "POST"){
        try {

            let reqBody = req.body
            // if req.bodyy is in string form ..parse it into Json form
            // ( Body sent from thunderclient will be in json form default)
            // (this is for when we hit the endpoint from out code, using fetch req)
            if (typeof(req.body) === "string" ){
                reqBody = JSON.parse(req.body)
            }

            const {name, email, password} = reqBody;

            // encrypting password
            const encryptedPass = CryptoJS.AES.encrypt(password,process.env.CRYPTOJS_SECRET_KEY).toString();
            
            // saving
            try {
                let u = new User({name, email, password : encryptedPass});
                await u.save()
                res.status(200).json({success : true});
            } catch (error) {
                res.status(400).json({error : "Email already in use.",success : false})
            }
        
            
        } catch (error) {
            res.status(400).json({error : "Internal server error", success : false})
        }
    }else{
        res.status(400).json({error : "This metho is not allowed.", success : false});
    }
}

export default connectDb(handler);