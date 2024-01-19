import React, { useState } from "react";

import {BiCurrentLocation} from "react-icons/bi"

const FilterSearchPage = () => {
  const [filters, setFilters] = useState({
    name: "",
    category: "",
    priceRange: "",
    location : ""
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFilters((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSearch = () => {
    // Your search logic here
    console.log(filters);
  };

  return (
    <div className="container mx-auto rounded-xl w-[100%] flex flex-col">
      <h1 className="text-3xl font-bold my-4">Filter Search</h1>
      <div className="bg-gray-100 p-4 rounded w-auto mx-[15vw] ">
        <div className="mb-4 mt-4">
          <form className="flex items-center mx-6 ">
            <div className="relative w-full shadow-lg ">
              <input
                type="text"
                className="bg-white  text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-5 p-2.5  "
                placeholder="Search"
                required
              />
            </div>
            <button
              className="mx-3 my-2 bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={handleSearch}
            >
              Search
            </button>
            {/* <button
              onClick={(e) => {
                e.preventDefault();
              }}
              type="submit"
              className=" shadow-lg p-2.5 ml-2 text-sm font-medium text-white bg-blue-700 rounded-lg  hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
              </svg>
              <span className="sr-only">Search</span>
            </button> */}
          </form>
        </div>
        <div className="mb-4  mx-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="category"
          >
            Category
          </label>
          <select
            className="shadow bg-white appearance-none border rounded w-full py-2 px-3 mr-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="category"
            name="category"
            value={filters.category}
            onChange={handleInputChange}
          >
            <option value="">Select category</option>
            <option value="electronics">Electronics</option>
            <option value="clothing">Clothing</option>
            <option value="books">Books</option>
          </select>
        </div>
        <div className="mb-4 mx-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="priceRange"
          >
            Price Range
          </label>
          <input
            className="mr-4 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="priceRange"
            type="text"
            name="priceRange"
            value={filters.priceRange}
            onChange={handleInputChange}
            placeholder="Enter price range"
          />
        </div>

        <div className="mb-4 mx-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="priceRange"
          >
            Location
          </label>
          <div className="flex px-3 shadow justify-center items-center rounded w-full bg-white border">
          <BiCurrentLocation />
          <input
            className=" ml-4  appearance-none border-none rounded w-full py-2 outline-none  text-gray-700 "
            id="priceRange"
            type="text"
            name="location"
            value={filters.location}
            onChange={handleInputChange}
            placeholder="Enter Location"
          />
          </div>
        </div>

      </div>
    </div>
  );
};

export default FilterSearchPage;
