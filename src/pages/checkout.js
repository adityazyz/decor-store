import React, {useState } from 'react';
import { useSelector} from 'react-redux';
import Head from 'next/head';
import Script from 'next/script';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Checkout() {


  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zip, setZip] = useState('');

  const cartItems = useSelector((state)=>state.cart.cartItems);
 

  const getSubTotal = ()=>{
    let subTotal = 0;
    cartItems.map((item)=>{
      subTotal += (item.product_price * item.product_quantity)
    })

    return subTotal;
  }

  const emitterConfig = {
    position: "bottom-center",
    autoClose: 2500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    };


    const HOST = "https://securegw.paytm.in";
    const MID = "RtZYvX44163568075252";
    const OID = `${Math.random()*Date.now()}`;

    //  -> actual ammount 
    // const subTotal = getSubTotal();    
    
    // -> for testing payment
    const subTotal = "1.0";   

    const emailID = "adityazyzz@gmail.com"

  const fillFields = ()=>{
    toast.error("Please fill all fields",emitterConfig)
  }

  const initiatePayment = async (e)=>{
    e.preventDefault()
    // get a txnToken 
    let r = await fetch(`/api/preTransaction`,{
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      body: JSON.stringify({subTotal,OID,email : emailID}) // send data in string json
  })
  let txnRes = await r.json();
  let txnToken = txnRes.txnToken;
  console.log(txnToken);

  var config = {
  "root": "",
  "flow": "DEFAULT",
  "data": {
  "orderId": OID, /* update order id */
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
    <div className="max-w-[80vw] mx-auto p-6">
       <Head>
        <meta name="viewport" content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0"/>
      </Head>
       <Script type="application/javascript" src={`${HOST}/merchantpgpui/checkoutjs/merchants/${MID}.js`}  crossorigin="anonymous"/>
    
     
      <h1 className="text-2xl font-bold mb-7">Checkout</h1>
      <form onSubmit={initiatePayment}>


        <div className='flex flex-col md:flex-row'>
        <div className="mb-4 mx-3">
          <label className="block font-medium mb-2" htmlFor="name">
            Name
          </label>
          <input
            className=" w-full md:w-[36vw] px-4 py-2 border border-gray-400 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="mb-4 mx-3">
          <label className="block font-medium mb-2" htmlFor="email">
            Email
          </label>
          <input
            className=" w-full md:w-[36vw] px-4 py-2 border border-gray-400 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        </div>
        <div className="mb-4 mx-3 ">
          <label className="block font-medium mb-2" htmlFor="address">
            Address
          </label>
          <textarea className="w-full px-4 py-2 border border-gray-400 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            type="text"
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required cols="30" rows="3"></textarea>
        </div>

        <div className='flex flex-col md:flex-row'>
        <div className="mb-4 mx-3">
          <label className="block font-medium mb-2" htmlFor="city">
            City
          </label>
          <input
            className="w-full md:w-[23vw] px-4 py-2 border border-gray-400 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            type="text"
            id="city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          />
        </div>
        <div className='mb-4 mx-3'>
        <label className="block font-medium mb-2" htmlFor="state">
            State
          </label>
            <select className="w-full md:w-[23vw] px-4 py-2 border border-gray-400 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            type="text"
            id="state"
            value={state}
            onChange={(e) => setState(e.target.value)}
            placeholder=" "
            required >
                <option value="">Select state</option>
                <option value="Andhra Pradesh">Andhra Pradesh</option>
                <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                <option value="Assam">Assam</option>
                <option value="Bihar">Bihar</option>
                <option value="Chhattisgarh">Chhattisgarh</option>
                <option value="Goa">Goa</option>
                <option value="Gujarat">Gujarat</option>
                <option value="Haryana">Haryana</option>
                <option value="Himachal Pradesh">Himachal Pradesh</option>
                <option value="Jharkhand">Jharkhand</option>
                <option value="Karnataka">Karnataka</option>
                <option value="Kerala">Kerala</option>
                <option value="Madhya Pradesh">Madhya Pradesh</option>
                <option value="Maharashtra">Maharashtra</option>
                <option value="Manipur">Manipur</option>
                <option value="Meghalaya">Meghalaya</option>
                <option value="Mizoram">Mizoram</option>
                <option value="Nagaland">Nagaland</option>
                <option value="Odisha">Odisha</option>
                <option value="Punjab">Punjab</option>
                <option value="Rajasthan">Rajasthan</option>
                <option value="Sikkim">Sikkim</option>
                <option value="Tamil Nadu">Tamil Nadu</option>
                <option value="Telangana">Telangana</option>
                <option value="Tripura">Tripura</option>
                <option value="Uttar Pradesh">Uttar Pradesh</option>
                <option value="Uttarakhand">Uttarakhand</option>
                <option value="West Bengal">West Bengal</option>
            </select>
        </div>
       
        <div className="mb-4 mx-3">
          <label className="block font-medium mb-2" htmlFor="zip">
            Zip
          </label>
          <input
            className="w-full md:w-[23vw] px-4 py-2 border border-gray-400 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            type="text"
            id="zip"
            value={zip}
            onChange={(e) => setZip(e.target.value)}
            placeholder="Pincode here"
            required
          />
        </div>
        </div>
        <hr className="my-6" />


{/* ///// order summary  */}
        
  

  {(cartItems)&& <>
  <h2 className="text-lg font-medium mb-4">Order Summary</h2>
  <div className="  mx-auto">
    <div className="lg:w-4/5  flex flex-wrap">
      <div className="lg:w-full w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">


        {/* // column names */}
        <div className="flex mb-4">
          <a className="flex-grow text-left text-gray-500 py-2 text-lg px-1">Name</a>
          <a className="flex-grow text-right text-gray-500 py-2 text-lg px-1 ml-20">Price</a>
          <a className="flex-grow text-right text-gray-500 py-2 text-lg px-1">Quantity</a>
        </div>

        {/* // column entries */}
        {cartItems.map((item)=>{
          return <div key={item.product_id}>
          <div  className="flex border-t border-gray-200 py-2">
            <span className="text-gray-900">{item.product_name}</span>
            <span className="ml-auto text-gray-900 ">₹ {item.product_price}</span>
            <span className="ml-auto text-gray-900">{item.product_quantity}</span>
          </div>
          </div>
        })}

        <div className='border-t border-gray-200 py-2'></div>

        {/* // total  and place order*/}

        {/* // subtotal  */}
        <div className='flex flex-col md:flex-row'>
          <div className="flex mt-16 mr-24">
            <span className="title-font font-medium text-xl text-gray-900">
            <span className='text-gray-500 mr-4'>Subtotal</span>₹{getSubTotal()}.00</span>
          </div>

         {/* /////// place order  */}
          <button className=" mt-5 md:mt-14 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors duration-300 h-10"
            type="submit" onClick={((name.length != 0) && (email.length != 0) &&(address.length != 0) && (city.length != 0) && (zip.length != 0) ) ? initiatePayment : fillFields  }>
            Place Order
          </button>

        </div>
      </div>
    </div>
  </div>
  </>}
        
      </form>

            <div>
                <ToastContainer
                position="bottom-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                />
            </div>

    </div>
  );
}

export default Checkout;

