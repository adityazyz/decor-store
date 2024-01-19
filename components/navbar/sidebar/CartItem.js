import React,{useState} from 'react'
import {ImBin} from "react-icons/im"
import {useDispatch} from 'react-redux'
import { increaseQuantity, decreaseQuantity, removeItem } from '../../../slices/cartSlice'


function CartItem(props) {

    const dispatch = useDispatch();


  return (
<div className='mb-5 md:pl-4 md:pr-4'>



        {/* // content  */}
     <div className='md:flex  lg:justify-between'>

        <h1 className=" text-left title-font text-xs sm:text-sm font-medium text-gray-600  mt-1"> {`${props.product_name} ${(props.selected_color || props.selected_size)?`[${(props.selected_color)?props.selected_color:""} ${(props.selected_size)?","+props.selected_size:""}]`:""}`}</h1>
        {/* <p className="leading-relaxed mb-3">Photo booth fam kinfolk cold-pressed sriracha leggings jianbing microdosing tousled waistcoat.</p> */}

        {/* ##### counter  */}
        
        <div className='flex justify-center items-center ml-2 mr-2 lg:mr-16 sm:ml-10 '>
        <div className=" w-[20vw] sm:w-[10vw] md:w-[10vw] lg:w-[6vw] flex">
            
            <div className="flex flex-row h-[4vh] w-full rounded-lg relative bg-transparent mt-1">
                 {/* ---minus  */}
                <button onClick={()=>{dispatch(decreaseQuantity({product_id : props.product_id}))}} data-action="decrement" className=" bg-gray-200 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-l cursor-pointer outline-none">
                    <span className="m-auto text-xl font-thin">−</span>
                </button>
                {/* --- input field  */}
                <input type="text" className=" focus:outline-none text-center w-full bg-gray-100 font-semibold text-sm hover:text-black focus:text-black  md:text-basecursor-default flex items-center text-gray-700  outline-none " name="custom-input-number" value={props.product_quantity} onChange={()=>{}}/>
                {/* ---plus  */}
                <button onClick={()=>{dispatch(increaseQuantity({product_id : props.product_id}))}}  data-action="increment" className="bg-gray-200 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-r cursor-pointer">
                    <span className="m-auto text-xl font-thin">+</span>
                </button>
            </div>

            <div className='mt-1 ml-3'>
                <button className='bg-red-500 hover:bg-red-700 p-2 md:p-1' onClick={()=>{dispatch(removeItem({product_id : props.product_id}))}}>
                <ImBin className='h-3 md:h-5 w-3 md:w-5 text-white'/>
                </button>
            </div>

        </div>
    </div>
        
        

    </div>
</div>
  )
}

export default CartItem