import Link from 'next/link'
import React from 'react'

function CardItem(props) {
  
  const img = (props.info.product_colors)?props.info.product_colors[0]:"";

  return (
<>
<div className="lg:w-1/4 md:w-1/2 p-4 w-full">

    {/* // this is how we pass slug when hitting an api */}
    {/* // takes a slug and display a product page at the current link accordingly */}
    <Link href={`http://localhost:3000/product/${props.info._id}`} > 
    <div className="block relative h-40 rounded overflow-hidden">
        <img alt="ecommerce" className="object-cover object-top w-full h-full block " src={(props.info.product_image["singleImage"])?props.info.product_image["singleImage"]:props.info.product_image[img]}/>
    </div>
    <div className="mt-4 shadow-lg p-3">
        <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">{props.info.product_category}</h3>
        <h2 className="text-gray-900 title-font text-[1em] font-medium">{props.info.product_name}</h2>
        <p className="mt-1">₹ {props.info.product_price}.00</p>
    </div>
    </Link>
</div>
</>
  )
}

export default CardItem