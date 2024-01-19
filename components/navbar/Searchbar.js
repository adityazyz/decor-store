import React from 'react'

function Searchbar() {
    
  return (
    <>
    
<form className="flex items-center mx-6 ">   
    <div className="relative w-full shadow-lg ">
        <input type="text" className="bg-white  text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-5 p-2.5  " placeholder="Search" required/>
    </div>
    <button onClick={(e)=>{e.preventDefault()}} type="submit" className=" shadow-lg p-2.5 ml-2 text-sm font-medium text-white bg-blue-700 rounded-lg  hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
        <span className="sr-only">Search</span>
    </button>
</form>

    </>
  )
}

export default Searchbar