import React, {useState} from 'react'
import SingleReview from './SingleReview'


function Reviews() {

const [seeAll, setseeAll] = useState(false);

  return (

///// product description + reviews 

// https://wind-ui.com/components/ratings/ 
// https://shuffle.dev/components/tailwind/all/reviews 
// >>>  https://flowbite.com/docs/components/rating/ 


<div>
  <section className="py-2 2xl:py-44 bg-blueGray-100 rounded-t-10xl overflow-hidden">
    <div className="container px-4 mx-auto">
      <h1 className='text-lg sm:text-xl mx-2 sm:mx-3 sm:mb-6 my-4 text-center sm:text-left sm:my-6 text-gray-600'>Reviews</h1>

    {/* -------- reviews  */}
      
      <SingleReview rating = {5} imageSource = {"https://images.unsplash.com/photo-1546512565-39d4dc75e556?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1407&q=80"} name={"Faustina x. Fawn"} reviewText = {"I haretra neque non mi aliquam, finibus hart bibendum molestie. Vestibulum suscipit sagittis dignissim mauris."} feature1 = {"Durable"} feature2 = {"Perfect size"} feature3 = {"Beautiful"} timeWhenAdded = {"Added 1 month ago"}/>

      <SingleReview rating = {4} imageSource = {"https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"} name={"Emma Watson"} reviewText = {"I haretra neque non mi aliquam, finibus hart bibendum molestie. Vestibulum suscipit sagittis dignissim mauris."} feature1 = {"beautiful"} feature2 = {"Perfect size"}  timeWhenAdded = {"Added 1 month ago"}/>

      {seeAll && <SingleReview rating = {3} imageSource = {"https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"} name={"Nigga"} reviewText = {"I haretra neque non mi aliquam, finibus hart bibendum molestie. Vestibulum suscipit sagittis dignissim mauris."} feature1 = {"Durable"} feature2 = {"Perfect size"}  timeWhenAdded = {"Added 2 months ago"}/>}

      {seeAll && <SingleReview rating = {4} imageSource = {"https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2776&q=80"} name={"Eddy Thorn"} reviewText = {"I haretra neque non mi aliquam, finibus hart bibendum molestie. Vestibulum suscipit sagittis dignissim mauris."} feature1 = {"Perfect size"} feature2 = {"Beautiful"} feature3 = {"Durable"} timeWhenAdded = {"Added 2 months ago"}/>}
    

    {/* ---------- see all button  */}
      {(!seeAll)&& <div className="text-center">
        <button onClick={()=>{setseeAll(true)}} className="inline-block w-auto h-full my-4 py-2 px-6 leading-8 font-heading font-medium tracking-tighter text-lg text-white bg-blue-500 hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded-xl">See all</button>
      </div>}
    </div>
  </section>
</div>
  )
}

export default Reviews