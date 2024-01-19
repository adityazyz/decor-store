import React from 'react'
import Head from 'next/head';
import Script from 'next/script';
const https = require('https');
const PaytmChecksum = require('../../Paytm_Node_Checksum-master/PaytmChecksum');


function transaction() {
    const HOST = "https://securegw.paytm.in";
    const MID = "RtZYvX44163568075252";
    const OID = `${Math.floor(Math.random())*Date.now()}`
    const subTotal = 1;
    const email = "adityazyzz@gmail.com"

async function onScriptLoad(){
        // get a txnToken 
        let data = await fetch(`/api/preTransaction`,{
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            body: JSON.stringify({subTotal,OID,email}) // send data in string json
        })
        let txnToken = await data.json();
        console.log(txnToken);

        var config = {
        "root": "",
        "flow": "DEFAULT",
        "data": {
        "orderId": `${Math.floor(Math.random())*Date.now()}`, /* update order id */
        "token": txnToken, /* update token value */
        "tokenType": "TXN_TOKEN",
        "amount": subTotal /* update amount */
        },
        "handler": {
        "notifyMerchant": function(eventName,data){
        console.log("notifyMerchant handler function called");
        console.log("eventName => ",eventName);
        console.log("data => ",data);
        }
        }
        };
   
        window.Paytm.CheckoutJS.init(config).then(function onSuccess() {
        // after successfully updating configuration, invoke JS Checkout
        window.Paytm.CheckoutJS.invoke();
        }).catch(function onError(error){
        console.log("error => ",error);
        });

    }

  return (
    <div>
        <Head>
        <meta name="viewport" content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0"/>
      </Head>
       <Script type="application/javascript" src={`${HOST}/merchantpgpui/checkoutjs/merchants/${MID}.js`}  crossorigin="anonymous"/>
    <h1>hiii</h1>
    </div>
  )
}

export default transaction