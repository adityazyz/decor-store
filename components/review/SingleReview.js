import Image from 'next/image'
import React from 'react'
import ProductFeature from './ProductFeature'

function SingleReview(props) {
  return (
    
<>
<div className="my-3 shadow-lg rounded-t-8xl rounded-b-5xl overflow-hidden">
      <div className="pt-3 pb-3 md:pb-1 px-4 md:px-16 bg-white bg-opacity-40">
        <div className="flex flex-wrap items-center">
          <Image className="h-10 w-11 rounded-xl mr-5 mb-2" src={props.imageSource} width={50} height={50} alt=""/>
          <h4 className="w-full md:w-auto text-lg font-heading font-medium">{props.name}</h4>

          {/* /// ratinggg  */}
          <div className="w-full md:w-px h-2 md:h-8 mx-8 bg-transparent md:bg-gray-200"></div>
          <span className="mr-4 text-lg font-heading font-medium">{props.rating}.0</span>
          <div className="inline-flex">
            {/* ///// stars  */}
            <a className="inline-block mr-1" href="#">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 7.91677H12.4167L10 0.416763L7.58333 7.91677H0L6.18335 12.3168L3.81668 19.5834L10 15.0834L16.1834 19.5834L13.8167 12.3168L20 7.91677Z" fill={(props.rating >= 1)?"#FFCB00":"#E4E7EB"}></path>
              </svg>
            </a>
            <a className="inline-block mr-1" href="#">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 7.91677H12.4167L10 0.416763L7.58333 7.91677H0L6.18335 12.3168L3.81668 19.5834L10 15.0834L16.1834 19.5834L13.8167 12.3168L20 7.91677Z" fill={(props.rating >= 2)?"#FFCB00":"#E4E7EB"}></path>
              </svg>
            </a>
            <a className="inline-block mr-1" href="#">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 7.91677H12.4167L10 0.416763L7.58333 7.91677H0L6.18335 12.3168L3.81668 19.5834L10 15.0834L16.1834 19.5834L13.8167 12.3168L20 7.91677Z" fill={(props.rating >= 3)?"#FFCB00":"#E4E7EB"}></path>
              </svg>
            </a>
            <a className="inline-block mr-1" href="#">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 7.91677H12.4167L10 0.416763L7.58333 7.91677H0L6.18335 12.3168L3.81668 19.5834L10 15.0834L16.1834 19.5834L13.8167 12.3168L20 7.91677Z" fill={(props.rating >= 4)?"#FFCB00":"#E4E7EB"}></path>
              </svg>
            </a>
            <a className="inline-block text-gray-200" href="#">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 7.91677H12.4167L10 0.416763L7.58333 7.91677H0L6.18335 12.3168L3.81668 19.5834L10 15.0834L16.1834 19.5834L13.8167 12.3168L20 7.91677Z" fill={(props.rating == 5)?"#FFCB00":"#E4E7EB"}></path>
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* //// actual review  */}
      <div className="px-4 overflow-hidden md:px-16 pt-4 pb-12 bg-white">
        <div className="flex flex-wrap">
          <div className="w-full md:w-2/3 mb-6 md:mb-0">
            <p className="mb-8 max-w-2xl text-sm text-darkBlueGray-400 leading-loose">{props.reviewText}</p>
            <div className="-mb-2">
            <div className="sm:inline-flex w-full md:w-auto mb-2">
              
              {/* ------features  */}
              {props.feature1 && <ProductFeature name = {props.feature1}/>}
              {props.feature2 && <ProductFeature name = {props.feature2}/>}
              {props.feature3 && <ProductFeature name = {props.feature3}/>}

              </div>
            </div>
          </div>
          <div className="w-full md:w-1/3 text-right">
            <p className="my-3 text-sm text-gray-300">{props.timeWhenAdded}</p>
          </div>
        </div>
      </div>
    </div>
</>
  )
}

export default SingleReview