import Link from 'next/link';
import React,{useState} from 'react'
import {useDispatch } from 'react-redux'
import { addItem,removeAllItems } from '../slices/cartSlice'
import { useRouter } from 'next/router';
// react-tostify
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// / store size selected and color selected into cookies.  

function ProductDetail(props) {

  const stockRunningOutLimit = 20;

  // router
  const router = useRouter();

  const dispatch = useDispatch();

  // _________________________
  /// color and variant state
  // _________________________

  // const codes = [110043,110072,110071,110073,248007];
  const [deliverable, setdeliverable] = useState(null);
  const [pinEntered, setpinEntered] = useState();
  const [colorSelected, setcolorSelected] = useState((props.product_colors && props.product_colors.length != 0)?props.product_colors[0]:"");
  const [sizeSelected, setsizeSelected] = useState((props.product_sizes && props.product_sizes.length != 0 )?props.product_sizes[0]:"");

  //funtion that returns current variant 
  const getCurrentVariant = ()=>{
    if((props.product_colors && props.product_colors.length != 0) && (props.product_sizes && props.product_sizes.length != 0 )){
      return `${sizeSelected},${colorSelected}`;
    }else if(!(props.product_colors && props.product_colors.length != 0) && (props.product_sizes && props.product_sizes.length != 0 )){
      return sizeSelected;
    }else if((props.product_colors && props.product_colors.length != 0) && !(props.product_sizes && props.product_sizes.length != 0 )){
      return colorSelected;
    }
  }
  const currentVariant = getCurrentVariant(); // for size and color

  const currentVariantToBuy = {
    product_id : props.product_id, 
    product_name : props.product_name, 
    product_price : props.product_price,
    product_quantity : 1,  
    // to be selected by user here
    selected_color : colorSelected,  
    selected_size : sizeSelected 
  }

  const pinChange = (e)=>{
    setpinEntered(e.target.value);
    // to remove message, when changing pin
    setdeliverable(null);
  }

  const checkClicked = async(e)=>{
    e.preventDefault();
    const data = await fetch("http://localhost:3000/api/pincode");
    const codes = await data.json()
    // checking length bcoz alphabet aget removed in parseInt 
    if(pinEntered!=null){
      if((pinEntered.length === 6) && codes.includes(parseInt(pinEntered))){
        setdeliverable(true);
      }else if(pinEntered.length === 0){
        setdeliverable(null);
      }else{
        setdeliverable(false);
      }
    }
  }

  const showToast = (text, type = "default")=>{
    const basicConfig = {
      position: "bottom-center",
      autoClose: 2500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      }
    if(type === "success"){
      toast.success(text,basicConfig);
    }else if(type === " error"){
      toast.error(text,basicConfig);
    }else{
      toast(text,basicConfig);
    }
  }

  return (
<>
<section className="text-gray-700 body-font overflow-hidden bg-white mx-auto sm:my-10">
  <div className="container px-4 py-[2vh] sm:py-[7vh] mx-auto">
    <div className="lg:w-[80vw] mx-auto flex flex-wrap">

      {/* //// product image  ///// */}
      <img 
      draggable = "false"
      alt="ecommerce" 
      className=" pointer-events-none lg:w-1/2 w-full h-[90vh] object-cover rounded border border-gray-200 mt-4" 
      src={(colorSelected === "")?props.product_image["singleImage"]:props.product_image[colorSelected]} />


      <div className="lg:w-1/2 w-full lg:pl-10 lg:py-3 mt-6 lg:mt-0">
        <h2 className="text-sm title-font text-gray-500 tracking-widest">{props.product_brand_name}</h2>
        <h1 className="text-gray-900 text-2xl title-font font-medium mb-1">{props.product_name}</h1>
        <div className="flex mb-4">
          <span className="flex items-center">
            <svg fill={(props.product_rating >= 1)?"#FFCB00":"#E4E7EB"} stroke={(props.product_rating >= 1)?"#FFCB00":"#E4E7EB"} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
            </svg>
            <svg fill={(props.product_rating >= 2)?"#FFCB00":"#E4E7EB"} stroke={(props.product_rating >= 2)?"#FFCB00":"#E4E7EB"} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
            </svg>
            <svg fill={(props.product_rating >= 3)?"#FFCB00":"#E4E7EB"} stroke={(props.product_rating >= 3)?"#FFCB00":"#E4E7EB"} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 " viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
            </svg>
            <svg fill={(props.product_rating >= 4)?"#FFCB00":"#E4E7EB"} stroke={(props.product_rating >= 4)?"#FFCB00":"#E4E7EB"} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 " viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
            </svg>
            <svg fill={(props.product_rating == 5)?"#FFCB00":"#E4E7EB"} stroke={(props.product_rating == 5)?"#FFCB00":"#E4E7EB"} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 " viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
            </svg>
            <span className="text-gray-600 ml-3">{props.product_category}</span>
          </span>

          {/* // : SOCIALS */}
          
        {(props.product_brand_socials) && <span className="flex ml-3 pl-3 py-2 border-l-2 border-gray-200">
            {/* // facebook  */}
            {(props.product_brand_socials.facebook) && <Link href={props.product_brand_socials.facebook} prefetch={false} target="_blank"  className="text-gray-500">
              <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
              </svg>
            </Link>}
            {/* // twitter  */}
            {(props.product_brand_socials.twitter)&&<Link href={props.product_brand_socials.twitter} prefetch={false} target="_blank"  className="ml-2 text-gray-500">
              <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
              </svg>
            </Link>}
            
            {/* // instagram  */}
            {(props.product_brand_socials.instagram)&&<Link href={props.product_brand_socials.instagram} prefetch={false} target="_blank" className="ml-2 text-gray-500">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" /></svg>
            </Link>}
            
          </span>}

        </div>
        <p className="leading-relaxed mt-3">{props.product_description}</p>



        {/* ///// after desc stuff  */}
        <div className="flex flex-col mt-6 items-start pb-5 border-b-2 border-gray-200 mb-5">
        
        {/* holds color and size  */}

          <div className='flex items-start  sm:flex-row'>   
  
            {/* // color  */}
            {(props.product_colors && props.product_colors.length != 0) && <div className="mx-2 flex items-center">
            <span className="mr-3 text-gray-500">Color</span>
            <div className="relative">
              <select className="rounded border appearance-none border-gray-400 py-2 focus:outline-none focus:border-blue-500 text-base pl-3 pr-10" value ={colorSelected} onChange={(e)=>{setcolorSelected(e.target.value)}}>
                {/* <option value="">Select</option> */}
                {props.product_colors.map((item)=>{
                   return <option key={item} >{item}</option>   // returning sizes as dropdown option
                })}
              </select>
              <span className="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4" viewBox="0 0 24 24">
                  <path d="M6 9l6 6 6-6"></path>
                </svg>
              </span>
            </div>
          </div>}

          {/* /// size  */}
          {(props.product_sizes && props.product_sizes.length != 0 ) && <div className="mx-2 flex  sm:ml-6 items-center">
            <span className=" mr-3 text-gray-500">Size</span>
            <div className="relative">
              <select className="rounded border appearance-none border-gray-400 py-2 focus:outline-none focus:border-blue-500 text-base pl-3 pr-10" onChange={(e)=>{setsizeSelected(e.target.value)}}>
                {/* <option value={""}>Select</option> */}
                {props.product_sizes.map((item)=>{
                   return <option key={item} >{item}</option>   // returning sizes as dropdown option
                })}
              </select>
              <span className="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4" viewBox="0 0 24 24">
                  <path d="M6 9l6 6 6-6"></path>
                </svg>
              </span>
            </div>
          </div>}

          </div>

          {/* // available quantity alert  ///// */}
          {((props.quantities[currentVariant]===0)?<h3 className='text-red-500 mt-2 '>Sorry, this item is currently out of stock.</h3>:((props.quantities[currentVariant]<stockRunningOutLimit) ? <h3 className=' text-orange-400 mt-2 '> Hurry up, only a few pieces left ! </h3>:<h3 className='text-red-500 mt-2 '>&nbsp; </h3>))}  

          {/* // pincode checking  */}
          <div className='mx-auto md:mx-0 mt-1 md:mt-2'>
            <h3 className='mt-2 sm:mb-2 text-gray-600'>Please check if we deliver this item in your area</h3>
            <div className='flex flex-col sm:flex-row'>
              <input className=' sm:my-2 mt-4 h-11 w-full sm:w-auto p-2 rounded-sm border  border-gray-300' type="text" name="pin" placeholder='Enter pincode here' value={pinEntered} onChange={pinChange}/>
              <button className="my-2 flex items-center justify-center w-full sm:w-auto sm:ml-5   text-white bg-gray-700 border-0 py-2 px-6  focus:outline-none hover:bg-gray-900 rounded" onClick={checkClicked}>Check</button>
            </div>
            {((!deliverable)&&(deliverable !== null)) && <h3 className='mt-1 text-red-500'>Sorry we do not deliver this item in your area</h3>}
            {((deliverable)&&(deliverable !== null)) && <h3 className='mt-1 text-green-500'>Delivery is available in your area </h3>}
            {(deliverable === null) && <h3 className='mt-1 text-transparent hidden sm:block'>Please check if we deliver this item in your area</h3>}
          </div>


        </div>
        <div className="flex flex-col sm:flex-row justify-between ">
          <span className="mb-4 title-font font-medium text-2xl text-gray-900">₹{props.product_price}.00</span>
          
          {/* buttons */}
          
            {/* add to cart  */}
            {(props.quantities[currentVariant]===0)?"":<div className='flex flex-col sm:flex-row'>
            <button onClick={()=>{
              dispatch(addItem(currentVariantToBuy));
              showToast("Item added to cart !", "success")}
                } 
              className=" flex justify-center items-center my-2 sm:mx-2 sm:ml-5 text-white bg-blue-600 border-0 py-2 px-6  focus:outline-none hover:bg-blue-700 rounded">Add to Cart</button>

              {/* /* BUY NOW  */} 
            <button className='flex justify-center items-center my-2 sm:mx-2 sm:ml-auto text-white bg-[#26b802] border-0 py-2 px-6 focus:outline-none hover:bg-[#22a302] rounded' 
            onClick={()=>{
              dispatch(removeAllItems());
              dispatch(addItem(currentVariantToBuy));
              router.push("/checkout");
            }}
            >Buy Now</button>

            </div>}
            
            <ToastContainer             //toast container
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
    </div>
  </div>
</section>
</>
  )
}

export default ProductDetail