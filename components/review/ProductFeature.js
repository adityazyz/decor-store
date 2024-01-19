import React from 'react'

function ProductFeature(props) {
  return (
<>

            <div className="flex items-center h-9 w-2/3 sm:mx-2 sm:w-auto pl-2 pr-6 my-2 bg-green-100 border-2 border-green-500 rounded-full">
                <div className="flex mr-2 w-5 h-6 items-center justify-center bg-white rounded-full text-green-500">
                    <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M10.016 6.366H6.38V10.092H4.472V6.366H0.836V4.638H4.472V0.911999H6.38V4.638H10.016V6.366Z" fill="currentColor"></path>
                    </svg>
                </div>
                <span className="text-green-500 font-heading font-medium">{props.name}</span>
            </div>

</>
  )
}

export default ProductFeature