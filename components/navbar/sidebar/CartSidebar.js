import React from 'react'
import {GrClose} from "react-icons/Gr"
import {BsFillBagCheckFill} from "react-icons/Bs"
import {ImBin} from "react-icons/im"
import CartItem from './CartItem'
import { useSelector, useDispatch } from 'react-redux'
import { removeAllItems } from '../../../slices/cartSlice'
import Link from 'next/link' 
// { addItem, removeItem, removeAllItems, increment, decrement }

function CartSidebar(props) {

  const cartList = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();
  

  return (<>

<div className={`h-[100vh] w-2/3 lg:w-[38vw] absolute z-20 top 0 right-0 ${(props.cartSidebar)?"translate-x-0":"translate-x-full"} ease-in-out duration-300`}>
  <div className="h-full bg-white bg-opacity-100 px-10 pt-10 pb-24 rounded-lg overflow-hidden relative shadow-lg ">
  
    {/* // close button  */}
    <div className='absolute right-6 top-5 text-xs sm:text-sm mb-5'>
    <button  onClick={props.toggleCartSidebar}><GrClose className='h-4 w-4'/></button>
    </div>
    {/* //// heading  */}
    <h2 className="tracking-widest text-xs title-font font-medium text-gray-500 mb-10 text-center">YOUR CART</h2>

    {
      // key should be unique ("product_id[selected_size,selected_color]"")
      (cartList.length > 0)?(cartList.map((item)=>{
        return <CartItem 
        key = {`${item.product_id}[${item.selected_size?item.selected_size:""}${item.selected_color?",":""}${item.selected_color?item.selected_color:""}]`} 
        // product_id imp later to manipulate product quantity
        product_id = {item.product_id} 
        product_name = {item.product_name } 
        product_quantity = {item.product_quantity} 
        selected_color = {item.selected_color} 
        selected_size = {item.selected_size}
        // variant imp later to manipulate product quantity
        variant = {`[${item.selected_size?item.selected_size:""}${item.selected_color?",":""}${item.selected_color?item.selected_color:""}]`}
        />
      })):(<div className=' text-center'><p>Your cart is empty.</p></div>)
    }
    
    {/* ----action buttons (checkout and clear cart)  */}
    {(cartList.length > 0)?<div className="flex flex-col md:flex-row items-center justify-center mt-12">
      {/* // checkout btn  */}
        <Link href={"/checkout"}>
        <button className='flex bg-[#26b802] hover:bg-[#22a302] rounded-sm p-2 px-3 my-1 mx-4'>
        <div className= 'mx-1 self-center w-auto'>
            <BsFillBagCheckFill color='white'/>
        </div> 
        <div className='mr-2 text-xs sm:text-sm h-[3vh] text-white'>&nbsp; Checkout </div>
        </button>
        </Link>
        {/* //delete btn  */}
        <button className='flex bg-[#ee3336] hover:bg-[#ce2e2e] rounded-sm p-2 px-3 my-1 mx-4' onClick={()=>{dispatch(removeAllItems())}}>
        <div className= 'mx-1 self-center'>
            <ImBin color='white'/>
        </div> 
        <div className='mr-2 text-xs sm:text-sm h-[3vh] text-white'>&nbsp; Clear Cart </div>
        </button>
    </div> : ""}
    
    
  </div>
  </div>

</>)
}

export default CartSidebar