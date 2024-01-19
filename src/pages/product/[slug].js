import { useRouter } from "next/router"
import ProductDetail from "../../../components/ProductDetail";
import Reviews from "../../../components/review/Reviews";
import { useState,useEffect } from "react";



function product() {

  const [finalData, setfinalData] = useState([]);
  const router = useRouter()
  const {slug} = router.query

  // fetching only one product from database whose id = slug passed
  const getProdData = async ()=>{
    const data = await fetch("http://localhost:3000/api/getProducts",{
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      // sending through body, a search filter to be used in .find()...as body.filter
      body: JSON.stringify({filter : { _id : slug}}) 
    });

      let myData = await data.json()
      myData = myData.products[0]

      // setting finalData to myData
      setfinalData(myData)

    }

// fetching and updating value of finalData when page loads
    useEffect(() => {
      getProdData()
    }, [])

  return (
<>

{/* /// ratinggg is hardcoded */}

{/* product data  */}
{(finalData != null && finalData.length != 0)?
 <ProductDetail product_id ={finalData._id} product_category={finalData.product_category} product_brand_name = {finalData.product_brand_name} product_name = {finalData.product_name} product_image = {finalData.product_image} product_description = {finalData.product_description}  product_price = {finalData.product_price} product_rating = {5} product_sizes = {finalData.product_sizes} product_colors = {finalData.product_colors} product_brand_socials = {finalData.product_brand_socials} quantities = {finalData.quantities} /> :""
}

{/* will pass the entire reviews for the prticular products here  */}
<Reviews/>
</>
  )
}


export default product;

