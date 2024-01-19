import CryptoJS from "crypto-js";

export default function handler(req, res) {
    
   try {

    const {encOldPass} = req.query;
    const {oldPass} = req.query;
    const {newPass} = req.query;

    
    // decode old pass and match with new pass
    var bytes  = CryptoJS.AES.decrypt(encOldPass, process.env.CRYPTOJS_SECRET_KEY);
    var decOldPass = bytes.toString(CryptoJS.enc.Utf8);   

    
    // comparing old pass from user and decrypted old pass from user collection
    if(decOldPass === oldPass){
        // matching old pass with new pass
        if(oldPass === newPass){
            res.status(400).json({success : false, message : "This password is already in use"});
        }else{
            res.status(200).json({success : true});
        }
    }else{
        res.status(400).json({success : false, message : "Old password is incorrect"});
    }
            
   } catch (error) {
    res.status(400).json({error})
   }
  }
  