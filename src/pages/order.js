import React from 'react'

function order() {


  const allOrders = [
    {
      order_id : 8828,
      order_details : [
        {
          product_id : 1,
          product_name : "greeek godd greeek godd 1",
          product_price : 877,
          product_quantity : 5,
          product_size : "L",
          product_color : "Black"
        },
        {
          product_id : 1,
          product_name : "greeek godd greeek godd 1",
          product_price : 877,
          product_quantity : 2,
          product_size : "L",
          product_color : "Black"
        },
        {
          product_id : 1,
          product_name : "greeek godd greeek godd 1",
          product_price : 877,
          product_quantity : 3,
          product_size : "L",
          product_color : "Black"
        }
      ] 
    }
  ]

  const myOrder = allOrders[0];

  const total = ()=>{
    let total = 0;
    myOrder.order_details.map((i)=>{
      total += (i.product_price * i.product_quantity)
    })
    return total;
  }

  return (
<>
<section class="text-gray-600 body-font overflow-hidden">
  <div class="container px-5 py-24 mx-auto">
    <div class="lg:w-4/5 mx-auto flex flex-wrap">


      <div class="lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
        <h2 class="text-sm title-font text-gray-500 tracking-widest">DECOR STORE</h2>
        <h1 class="text-gray-900 text-3xl title-font font-medium mb-4">Order Id : #{myOrder.order_id}</h1>

        <div class="flex mb-4">
          <a class="flex-grow py-2 text-lg px-1">Description</a>
          <a class="flex-grow py-2 text-right text-lg px-1 ml-14">Quantity </a>
          <a class="flex-grow py-2 text-right text-lg px-1">Item Total</a>
        </div>

        {(myOrder) && myOrder.order_details.map((item)=>{
          return <div class="flex border-t border-gray-200 py-2">
            <span class="text-gray-500">{item.product_name}</span>
            <span class="ml-auto text-gray-500">{item.product_quantity}</span>
            <span class="ml-auto text-gray-900">{item.product_price * item.product_quantity}</span>
          </div>
        })}

        <div class="flex border-t border-gray-200 py-2"></div>

        {/* // total  and place order*/}

        {/* // subtotal  */}
        <div className='flex flex-col md:flex-row'>
          <div className="flex mt-16 mr-24">
            <span className="title-font font-medium text-xl text-gray-900">
            <span className='text-gray-500 mr-4'>Total</span>₹{total()}.00</span>
          </div>

         {/* /////// place order  */}
          <button className=" mt-5 md:mt-14 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors duration-300 h-10"
            type="submit">
            Track Order
          </button>

        </div>


      </div>
      
      <img alt="ecommerce" class="ml-10 md:w-4/5 lg:w-2/5 w-[80vw] lg:h-[60vh] h-64 object-cover object-center rounded" src="https://dummyimage.com/400x400"/>

    </div>
  </div>
</section>  
</>
  )
}

export default order