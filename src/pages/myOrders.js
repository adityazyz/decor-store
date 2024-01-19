import React from 'react'

function myOrders() {

   // dummy data (lets suppose fetched based on user_id)
  const orderData = {
      _id : "1",
      user_id : "649400e19aa14216cd6b3b9c",
      products : [
        {
          product_id : "6484b90a2a4438abcbe72890",
          product_name : "Product 1",
          product_price : 69,
          order_specs : {
            color : "White",
            size : "M"
          },
          order_quantity : 3,
        },
        {
          product_id : "64903314cb2dae698fa2e3e2",
          product_name : "Product 2",
          product_price : 99,
          order_specs : {
            color : "Red",
          },
          order_quantity : 2,
        },
        {
          product_id : "64902fcfcb2dae698fa2e3be",
          product_name : "Product 3",
          product_price : 70,
          order_specs : {
            size : "L"
          },
          order_quantity : 45,
        }
      ],

      address : "address",
      amount : 6969,
      status : "Pending"
    }


  return (
<div className='w-[100vw] h-[85vh]'>
<div><h2 className='text-gray-700 text-xl font-semibold text-center pt-7 py-3'>My Orders</h2></div>

{orderData && <div className="flex flex-col mx-28 md:mx-32 lg:mx-40 ">
  <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
    <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
      <div className="overflow-hidden">
        <table className="min-w-full text-center text-sm font-light">
          <thead
            className="border-b bg-neutral-800 font-medium text-white dark:border-neutral-500 dark:bg-neutral-900">
            <tr>
              <th scope="col" className=" px-6 py-4" >Sno.</th>
              <th scope="col" className=" px-6 py-4">Product</th>
              <th scope="col" className=" px-6 py-4">Quantity</th>
              <th scope="col" className=" px-6 py-4">Price</th>
            </tr>
          </thead>
          <tbody>
            {orderData && orderData.products.map((item,index)=>{
              return <tr className="border-b dark:border-neutral-500" key = {item.product_id}>
                <td className="whitespace-nowrap  px-6 py-4 font-medium">{index + 1}</td>
                <td className="whitespace-nowrap  px-6 py-4">{item.product_name}</td>
                <td className="whitespace-nowrap  px-6 py-4">{item.order_quantity}</td>
                <td className="whitespace-nowrap  px-6 py-4">{item.product_price}</td>
              </tr>
            })}
          </tbody>
        </table>
        <div className='mt-6 flex items-end justify-end'>
          <span className='text-sm font-semibold mx-4'>Total Amount : ₹ {orderData.amount}</span>
        </div>
      </div>
    </div>
  </div>
</div>}

{!orderData && <div>
  No Orders Yet, start shopping
  </div>}

</div>
  ) 
}
 
export default myOrders