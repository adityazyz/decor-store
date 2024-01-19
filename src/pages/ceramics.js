import React from 'react'
import CardItem from '../../components/CardItem';

function ceramics(props) {
  return (
    <>
  <section className="text-gray-600 body-font">
  <div className="container px-5 py-[8vh] mx-auto">
    <div className="flex flex-wrap -m-4">
      

    {/* //// if everything goes fine  */}
    {(props.propData != "Error") && props.propData.map(item => (
            <CardItem
              key = {item._id}
              info = {item}
            />
        ))}

    {/* //// if error happends while fetching */}
    {
      props.propData === "Error" && <div>
        Sorry Servers down
      </div>
    }

    </div>
  </div>
</section>
    </>
  )
}

export async function getServerSideProps(context) {

    try {
      let data = await fetch(`${process.env.DECOR_STORE_HOST}/api/getProducts`,{
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        // sending through body, a search filter to be used in .find()...as body.filter
        body: JSON.stringify({filter : {product_category : "CERAMICS"}}) 
      })
      let propData = await data.json();
      propData = propData.products;
  
      return {
        props: {propData}, // will be passed to the page component as props
      }
    } catch (error) {
      const propData = "Error";
      return {
        props: {propData},    // will be passed to the page component as props
      }
    }
}

export default ceramics