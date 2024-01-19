import connectDb from "../../../middleware/mongoose";
const nodemailer = require("nodemailer");

const myEmail = 'adityazyzz007@gmail.com';
const appPassword = 'fxwkgvrccmkfodjc';

const currentUrl = "http://127.0.0.1:3000/"

const handler = async (req, res) => {
    
    if(req.method == "POST"){
        const body = JSON.parse(req.body);
        try {
            const transporter = nodemailer.createTransport({
                service : "gmail",
                auth: {
                  // TODO: replace `user` and `pass` values from <https://forwardemail.net>
                  user: myEmail,
                  pass: appPassword
                }
              });

            const mailOptions = {
                from: myEmail, // sender address
                to: body.email, // list of receivers
                subject: "Reset your Decor-Store password.", // Subject line
                // text: `\nhttps://localhost:3000/forgot?token=${body.token}`, // plain text body
                html: `<h2>Hello, A request has been received to change the password for your Decor-Store account. Click the following button to reset your password</h2> <br>  <a href='${currentUrl}/forgot?token=${body.token}'> <button style='background-color: #008CBA;border: none;color: white;padding: 15px 32px;text-align: center;text-decoration: none;display: inline-block;font-size: 16px;margin: 4px 2px;'> Reset Password </button> </a>  <br/>  <h3>If you did not initiate this request, you can safely ignore it.</h3>`,     
                
                // html body can be sent too
              }

              console.log(mailOptions)

            transporter.sendMail(mailOptions,async(error,info)=>{
                if(error){
                    console.log(error)
                }else{
                    console.log("Email sent " + info.response)
                }
            })

            res.status(200).json({"Success":true})
            
        } catch (error) {
            res.status(400).json({error : "Internal server error", success : false})
        }
    }else{
        res.status(400).json({error : "This method is not allowed.", success : false});
    }
}

export default connectDb(handler);