
const https = require('https');

const PaytmChecksum = require('../../../Paytm_Node_Checksum-master/PaytmChecksum');


export default async function handler(req,res) {

    let body =  JSON.parse(req.body);


    var paytmParams = {};
    
    paytmParams.body = {
        "requestType"   : "Payment",
        "mid"           : "RtZYvX44163568075252",
        "websiteName"   : "YOUR_WEBSITE_NAME",
        "orderId"       : body.OID,
        "callbackUrl"   : "http://localhost:3000/api/postTransaction",
        "txnAmount"     : {
            "value"     : body.subTotal,
            "currency"  : "INR",
        },
        "userInfo"      : {
            "custId"    : body.email,
        },
    };
    
    const checksum = await PaytmChecksum.generateSignature(JSON.stringify(paytmParams.body), "4vnQO9l9aHZzM1X%");

        paytmParams.head = {
            "signature"    : checksum
        };
    
       var post_data = JSON.stringify(paytmParams);

    const reqAsync = ()=>{
    return new Promise((resolve, rejects)=>{
        var options = {
    
                    /* for Staging */
            //         hostname: 'securegw-stage.paytm.in',
            
                    /* for Production */
                    hostname: 'securegw.paytm.in',
            
                    port: 443,
                    path: `/theia/api/v1/initiateTransaction?mid=RtZYvX44163568075252&orderId=${body.OID}`,
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Content-Length': post_data.length
                    }
                };
            
                var response = "";
                var post_req = https.request(options, function(post_res) {
                    post_res.on('data', function (chunk) {
                        response += chunk;
                    });
            
                    post_res.on('end', function(){
                        console.log('Response: ', response);
                        resolve(JSON.parse(response).body);
                    });
                });
            
                post_req.write(post_data);
                post_req.end();
    })
    }
    
    let myRes = await reqAsync();
        res.status(200).json(myRes)




}

