import User from "../../../models/User";
import connectDb from "../../../middleware/mongoose";
import CryptoJS from "crypto-js";
import  Jwt from "jsonwebtoken";

// login ( we decrypt password using secret key and compare with password in database)
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

            const {email, password} = reqBody;

            // const encryptedPass = CryptoJS.AES.encrypt(req.body.password,"Secret123").toString();
            let data = await User.findOne({email});
            
            if(data){
                // decrypting pass
                const bytes = CryptoJS.AES.decrypt(data.password , process.env.CRYPTOJS_SECRET_KEY);
                const decryptedPass = bytes.toString(CryptoJS.enc.Utf8);

                if(email === data.email && password=== decryptedPass){
                    let token = Jwt.sign({name:data.name, email : data.email}, process.env.JWT_SECRET,{expiresIn : "2d"})

                    // sending token with name and email  
                    res.status(200).json({success : true, token });
                }
                else{
                    res.status(400).json({succes : false, error : "Invalid credentials"})
                }
            }else{
                res.status(400).json({succes : false, error : "User not found."})
            }

        } catch (error) {
            res.status(400).json({succes : false, error : "Internal server error."})
        }
    }else{
        res.status(400).json({succes : false, error : "This method is not allowed."});
    } 
}

export default connectDb(handler);