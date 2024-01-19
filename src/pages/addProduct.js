// order will be -> Name, category, description, brand , img url , price ,  ?keywords 
// socials ? , size ? , colors? ,final quantity !\\

// >>>>>>     make size and color input dynamic     <<<<<<< 
// use arrangements of rows and columns for input fields



//// pg 6..if not color variant ..ask for just an image

import React, { useState } from 'react';
import {MdOutlineManageSearch} from "react-icons/md";
import RowCell from '../../components/RowCell';


function AddProduct() {

  const [pageNumber, setpageNumber] = useState(1);

  const [product_brand, setProduct_brand] = useState('');
  const [product_name, setProduct_name] = useState('');
  const [product_description, setProduct_description] = useState('');
  const [product_category, setProduct_category] = useState('');
  const [product_price, setProduct_price] = useState('');
 

  
  const [product_keywords, setProduct_keywords] = useState([]);             // slug (array of strings)
  const [product_brand_socials, setProduct_brand_socials] = useState({});   // struct: keys with str value
  const [product_sizes, setProduct_sizes] = useState([]);                   // array of strings
  const [product_colors, setProduct_colors] = useState([]);         // array of strings


  // no. of keywords
  const [numberOfKeywords, setnumberOfKeywords] = useState(3);
  // keyword states 
  const [keyword1, setKeyword1] = useState("");
  const [keyword2, setKeyword2] = useState("");
  const [keyword3, setKeyword3] = useState("");
  const [keyword4, setKeyword4] = useState("");
  const [keyword5, setKeyword5] = useState("");

  //social handles
  const [facebook, setFacebook] = useState("");
  const [twitter, setTwitter] = useState("");
  const [instagram, setInstagram] = useState("");

  // sizes 
  const [numberOfSizes, setnumberOfSizes] = useState(3);
  const [size1, setSize1] = useState("");
  const [size2, setSize2] = useState("");
  const [size3, setSize3] = useState("");
  const [size4, setSize4] = useState("");
  const [size5, setSize5] = useState("");

  /// colors 
  const [numberOfColors, setNumberOfColors] = useState(3);
  const [color1, setColor1] = useState("");
  const [color2, setColor2] = useState("");
  const [color3, setColor3] = useState("");
  const [color4, setColor4] = useState("");
  const [color5, setColor5] = useState("");

  // image (colorwise) -> take color key from colors array
  const [product_image, setproduct_image] = useState({});
  const [singleImage, setsingleImage] = useState();

  // size and color combined array (quantity list)
  const [quantityKeys, setquantityKeys] = useState([]);
  const [quantities, setquantities] = useState({});



  function handleSubmit(event) {
    event.preventDefault();
    // Process order with user's information
    // ...
  }

  const addKeywordCount = ()=>{
    if(numberOfKeywords < 5){
      setnumberOfKeywords(numberOfKeywords+1);
    }
  }

  const addSizesCount = ()=>{
    if(numberOfSizes <5){
      setnumberOfSizes(numberOfSizes+1);
    }
  }

  const addColorsCount = ()=>{
    if(numberOfColors <5){
      setNumberOfColors(numberOfColors + 1);
    }
  }

  const getSizeAndColorCombinations = ()=>{
    // creating size and color arrays
    let sizeArr = [];
    let colorArr = [];
    
    (size1)?sizeArr.push(size1):"";
    (size2)?sizeArr.push(size2):"";
    (size3)?sizeArr.push(size3):"";
    (size4)?sizeArr.push(size4):"";
    (size5)?sizeArr.push(size5):"";

    (color1)?colorArr.push(color1):"";
    (color2)?colorArr.push(color2):"";
    (color3)?colorArr.push(color3):"";
    (color4)?colorArr.push(color4):"";
    (color5)?colorArr.push(color5):"";

    // creating combined array
    if(size1 && color1)    // if we have both, color and size
    {   
      let arr = [];
      for (var i = 0; i < sizeArr.length; i++) {
        for (var j = 0; j < colorArr.length; j++) {
          arr.push(`${sizeArr[i]},${colorArr[j]}`)
        }
      }
      setquantityKeys(arr);
    }else if(size1 && !color1){        // if we have size and not color
      let arr = [];
      for (let i = 0; i < sizeArr.length; i++) {
        arr.push(sizeArr[i]);
      }
      setquantityKeys(arr);
    }else if(!size1 && color1){      // if we have color and not size
      let arr = [];
      for (let i = 0; i < colorArr.length; i++) {
        arr.push(colorArr[i]);
      }
      setquantityKeys(arr);
    }

    
  }

  const combineTheEnteries = ()=>{
    let keywordArray = [];
    (keyword1)?keywordArray.push(keyword1):"";
    (keyword2)?keywordArray.push(keyword2):"";
    (keyword3)?keywordArray.push(keyword3):"";
    (keyword4)?keywordArray.push(keyword4):"";
    (keyword5)?keywordArray.push(keyword5):"";
    setProduct_keywords(keywordArray);

    let socialStruct = {};
    (facebook)?socialStruct["facebook"]=facebook:"";
    (instagram)?socialStruct["instagram"]=instagram:"";
    (twitter)?socialStruct["twitter"]=twitter:"";
    setProduct_brand_socials(socialStruct);

    let sizeArray = [];
    (size1)?sizeArray.push(size1):"";
    (size2)?sizeArray.push(size2):"";
    (size3)?sizeArray.push(size3):"";
    (size4)?sizeArray.push(size4):"";
    (size5)?sizeArray.push(size5):"";
    setProduct_sizes(sizeArray);

    let colorArray = [];
    (color1)?colorArray.push(color1):"";
    (color2)?colorArray.push(color2):"";
    (color3)?colorArray.push(color3):"";
    (color4)?colorArray.push(color4):"";
    (color5)?colorArray.push(color5):"";
    setProduct_colors(colorArray);

  }

  const arrangeFinalDataAndSubmit = ()=>{
    const product_data = {
      // id will be created automatically by mongodb 
      product_category : product_category,
      product_brand_name : product_brand,
      product_name : product_name,
      product_description : product_description,
      product_price : product_price ,
      product_sizes : product_sizes,
      product_colors : product_colors,
      product_brand_socials : product_brand_socials,
      keywords : product_keywords,
      quantities : quantities,
      product_image: (!(!product_colors || product_colors.length === 0)) ? product_image : {
        singleImage : singleImage
      }
    }

    console.log(product_data);

    //// save data from here
  }


  // this is for validation 
  const page1Ready = true;
  const [page2Ready, setPage2Ready] = useState(false);
  const [page3Ready, setPage3Ready] = useState(false);
  const [page4Ready, setPage4Ready] = useState(false);
  const [page5Ready, setPage5Ready] = useState(false);
  const [page6Ready, setPage6Ready] = useState(false);
  const [page7Ready, setPage7Ready] = useState(false);
  const [page8Ready, setPage8Ready] = useState(false);

  // for creation of different sections..use (if pagenumber === 1 ..build pagenumber1 === true )
            // keep it one way, don't set it false anywhere 
  const validateCurrentPage = ()=>{
    // check for all fields + build the next page
    if((pageNumber === 1)&&(product_brand && product_name && product_description && product_category && product_price)){
      setPage2Ready(true);
      return true;
    
    // check for all fields + build the next page
    }else if((pageNumber === 2)&& (keyword1 && keyword2 && keyword3)){
      setPage3Ready(true);
      return true;

    }else if((pageNumber === 3)){
      setPage4Ready(true);
      return true;
    }else if((pageNumber === 4)){
      setPage5Ready(true);
      return true;
    }else if((pageNumber === 5)){
      setPage6Ready(true);
      return true;
    }else if((pageNumber === 6)){
      setPage7Ready(true);
      return true;
    }else if((pageNumber === 7)){
      setPage8Ready(true);
      return true;
    }else{
      return false;
    }
  }

  const nextClicked = ()=>{
    if(validateCurrentPage()){
      ((pageNumber < 8)?setpageNumber(pageNumber+1) :"" );
      (size1 || color1)?getSizeAndColorCombinations():""; 
      (keyword1 || size1 || color1 )? combineTheEnteries():""
    }
  }


  return (
    <div className="max-w-[80vw] mx-auto p-4">
      <h1 className="text-2xl font-bold mb-7 mt-10">
        {(pageNumber===7)?"Confirm Details":"Enter Product Details"}
      </h1>
      <form onSubmit={handleSubmit}>

        {page1Ready && <div className={`${(pageNumber===1)?"block":"hidden"} h-full md:h-[57vh] w-[80vw] bg-slate-100 px-5 pt-7 rounded-lg `}>
        <div className='flex flex-col md:flex-row'>

        <div className="mb-2 mx-3">
          <label className="block font-medium mb-2" htmlFor="email">
          Brand Name
          </label>
          <input
            className=" w-full md:w-[36vw] px-4 py-2 border border-gray-400 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            type="text"
            name='product_brand'
            value={product_brand}
            onChange={(e)=>{setProduct_brand(e.target.value)}}
            required
          />
        </div>

        <div className="mb-4 mx-3">
          <label className="block font-medium mb-2" htmlFor="name">
           Product Name
          </label>
          <input
            className=" w-full md:w-[36vw] px-4 py-2 border border-gray-400 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            type="text"
            name='product_name'
            value={product_name}
            onChange={(e)=>{setProduct_name(e.target.value)}}
            required
          />
        </div>

        </div>

        <div className="mb-4 mx-3 ">
          <label className="block font-medium mb-2" htmlFor="address">
            Description
          </label>
          <textarea className="w-full md:w-[74vw] px-4 py-2 border border-gray-400 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            type="text"
            name='product_description'
            value={product_description}
            onChange={(e)=>{setProduct_description(e.target.value)}}
            required cols="30" rows="3"></textarea>
        </div>


        <div className='flex flex-col md:flex-row'>

        <div className="mb-4 mx-3">
          <label className="block font-medium mb-2" htmlFor="email">
            Category
          </label>
          <input
            className=" w-full md:w-[23vw] px-4 py-2 border border-gray-400 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            type="text"
            name='product_category'
            value={product_category}
            onChange={(e)=>{setProduct_category(e.target.value)}}
            required
          />
        </div>

        <div className="mb-2 mx-3">
          <label className="block font-medium mb-2" htmlFor="city">
            Price in ₹
          </label>
          <input
            className="w-full md:w-[15vw] px-4 py-2 border border-gray-400 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            type="number"
            name='product_price'
            value={product_price}
            onChange={(e)=>{setProduct_price(e.target.value)}}
            required
          />
        </div>
        
        </div>

        </div>}

        {/* ////////////////////////////////////////////////////////////////////////////// */}
        {/* ///////    KEYWORDS    //////// */}
        {page2Ready && <div className={`${(pageNumber===2)?"block":"hidden"} h-[57vh] w-[72vw] `}>
            <h1 className='block text-lg font-medium mb-2'>Enter the Keywords associated with your products</h1>

            <div className='flex justify-between'>

            <div className='flex flex-col w-full md:w-auto'>

          {/* /// input fields  */}
          <input
            className="w-full md:w-[23vw] px-4 py-2 border border-gray-400 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent my-3"
            type="text"
            name='keyword1'
            value={keyword1}
            onChange={(e)=>{setKeyword1(e.target.value)}}
            required
            hidden = {(numberOfKeywords>=1)?false:true}
          />
          <input
            className="w-full md:w-[23vw] px-4 py-2 border border-gray-400 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent my-3"
            type="text"
            name='keyword2'
            value={keyword2}
            onChange={(e)=>{setKeyword2(e.target.value)}}
            required
            hidden = {(numberOfKeywords>=2)?false:true}
          />
          <input
            className="w-full md:w-[23vw] px-4 py-2 border border-gray-400 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent my-3"
            type="text"
            name='keyword3'
            value={keyword3}
            onChange={(e)=>{setKeyword3(e.target.value)}}
            required
            hidden = {(numberOfKeywords>=3)?false:true}
          />
          <input
            className="w-full md:w-[23vw] px-4 py-2 border border-gray-400 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent my-3"
            type="text"
            name='keyword4'
            value={keyword4}
            onChange={(e)=>{setKeyword4(e.target.value)}}
            hidden = {(numberOfKeywords>=4)?false:true}
          />
          <input
            className="w-full md:w-[23vw] px-4 py-2 border border-gray-400 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent my-3"
            type="text"
            name='keyword5'
            value={keyword5}
            onChange={(e)=>{setKeyword5(e.target.value)}}
            hidden = {(numberOfKeywords===5)?false:true}
          />

          {/* // plus button  */}
          <button onClick={()=>{addKeywordCount()}} 
          className=" bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          hidden = {(numberOfKeywords===5)?true:false}
          >
            + Add
          </button>

        </div>

        <MdOutlineManageSearch className=' h-64 w-64 mb-15 mr-10 text-gray-800 hidden md:block'></MdOutlineManageSearch>

        </div>
               
        </div>}



        {/* { ////////////////////////////////////////////////////////////////////////////} */}
        {/* ///////    SOCIALS    //////// */}
        {page3Ready && <div className={`${(pageNumber===3)?"block":"hidden"} h-[57vh] w-[72vw] `}>
            <h1 className='block text-lg font-medium mb-2'>Does your brand have presence on social media ?</h1>
            <h1 className='block text-lg text-gray-500 mb-5'>If yes, then share your social handles to promote you brand and to reachout to greater audience.</h1>


            <div className='flex flex-col'>
            
            <div className='flex items-center'>
              <label htmlFor="facebook" className='mr-3'>
                <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                  <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                </svg>
              </label>
              <input
               className="w-full md:w-[23vw] px-4 py-2 border border-gray-400 rounded-md     shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500    focus:border-transparent my-3"
               type="text"
               name='facebook'
               value={facebook}
               onChange={(e)=>{setFacebook(e.target.value)}}
              />
            </div>
          
            <div className='flex items-center'>
            <label htmlFor="twitter" className='mr-3'>
              <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round"     strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
              </svg>
              </label>
              <input
                className="w-full md:w-[23vw] px-4 py-2 border border-gray-400 rounded-md     shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500     focus:border-transparent my-3"
                type="text"
                name='twitter'
                value={twitter}
               onChange={(e)=>{setTwitter(e.target.value)}}
              />
            </div>

            <div className='flex items-center'>
            <label htmlFor="instagram" className='mr-3'>
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" /></svg>
              </label>
              <input
                className="w-full md:w-[23vw] px-4 py-2 border border-gray-400 rounded-md     shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500     focus:border-transparent my-3"
                type="text"
                name='instagram'
                value={instagram}
                onChange={(e)=>{setInstagram(e.target.value)}}
              />
            </div>

          </div>
            
        </div>}



        {/* /* ////////////////////////////////////////////////////////////////////////////*/ }
        {/* /////////  SIZES   //////////  */}

        {page4Ready && <div className={`${(pageNumber===4)?"block":"hidden"} h-[57vh] w-[72vw]`}>
        <h1 className='block text-center text-lg font-medium mb-2'>Does your product have different sizes ?
        <span className=' text-lg text-gray-500 mb-5'>
          &nbsp;  If yes, then please enter size names below !
        </span>
        </h1>
        <div className='flex flex-col w-full md:w-auto justify-center items-center'>

          {/* /// input fields  */}
          <input
            className="w-full md:w-[23vw] px-4 py-2 border border-gray-400 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent my-3"
            type="text"
            name='size1'
            value={size1}
            onChange={(e)=>{setSize1(e.target.value)}}
            hidden = {(numberOfSizes>=1)?false:true}
          />
          <input
            className="w-full md:w-[23vw] px-4 py-2 border border-gray-400 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent my-3"
            type="text"
            name='size2'
            value={size2}
            onChange={(e)=>{setSize2(e.target.value)}}
            hidden = {(numberOfSizes>=2)?false:true}
          />
          <input
            className="w-full md:w-[23vw] px-4 py-2 border border-gray-400 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent my-3"
            type="text"
            name='size3'
            value={size3}
            onChange={(e)=>{setSize3(e.target.value)}}
            hidden = {(numberOfSizes>=3)?false:true}
          />
          <input
            className="w-full md:w-[23vw] px-4 py-2 border border-gray-400 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent my-3"
            type="text"
            name='size4'
            value={size4}
            onChange={(e)=>{setSize4(e.target.value)}}
            hidden = {(numberOfSizes>=4)?false:true}
          />
          <input
            className="w-full md:w-[23vw] px-4 py-2 border border-gray-400 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent my-3"
            type="text"
            name='size5'
            value={size5}
            onChange={(e)=>{setSize5(e.target.value)}}
            hidden = {(numberOfSizes===5)?false:true}
          />

          {/* // plus button  */}
          <button onClick={()=>{addSizesCount()}} 
          className="w-full md:w-[23vw] bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          hidden = {(numberOfSizes===5)?true:false}
          >
            + Add
          </button>

        </div>
        </div>}




        {/* ///////////////////////////////////////////////////////////////////////////// */}
        {/* ////////   COLOR VARIANTS    /////////  */}
        {page5Ready && <div className={`${(pageNumber===5)?"block":"hidden"} h-[57vh] w-[72vw] `}>
            <h1 className='block text-center text-lg font-medium mb-2'>Does your product have different color variants ?
            <span className=' text-lg text-gray-500 mb-5'>
            &nbsp;  If yes, then please enter color variants below !
            </span>
            </h1>

            <div className='flex flex-col w-full md:w-auto justify-center items-center'>

          {/* /// input fields  */}
          <input
            className="w-full md:w-[23vw] px-4 py-2 border border-gray-400 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent my-3"
            type="text"
            name='color1'
            value={color1}
            onChange={(e)=>{setColor1(e.target.value)}}
            hidden = {(numberOfColors>=1)?false:true}
          />
          <input
            className="w-full md:w-[23vw] px-4 py-2 border border-gray-400 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent my-3"
            type="text"
            name='color2'
            value={color2}
            onChange={(e)=>{setColor2(e.target.value)}}
            hidden = {(numberOfColors>=2)?false:true}
          />
          <input
            className="w-full md:w-[23vw] px-4 py-2 border border-gray-400 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent my-3"
            type="text"
            name='color3'
            value={color3}
            onChange={(e)=>{setColor3(e.target.value)}}
            hidden = {(numberOfColors>=3)?false:true}
          />
          <input
            className="w-full md:w-[23vw] px-4 py-2 border border-gray-400 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent my-3"
            type="text"
            name='color4'
            value={color4}
            onChange={(e)=>{setColor4(e.target.value)}}
            hidden = {(numberOfColors>=4)?false:true}
          />
          <input
            className="w-full md:w-[23vw] px-4 py-2 border border-gray-400 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent my-3"
            type="text"
            name='color5'
            value={color5}
            onChange={(e)=>{setColor5(e.target.value)}}
            hidden = {(numberOfColors===5)?false:true}
          />

          {/* // plus button  */}
          <button onClick={()=>{addColorsCount()}} 
          className="w-full md:w-[23vw] bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          hidden = {(numberOfColors===5)?true:false}
          >
            + Add
          </button>

        </div>
        </div>}


      {/* /////////////////////////////////////////////////////////////  */}
      {/* /////// IMAGE per Color variant //////// */}
      {page6Ready && <div className={`${(pageNumber===6)?"block":"hidden"} h-[57vh] w-[72vw] `}>
            <h1 className='block text-left text-lg font-medium mb-6'>
              {!(!product_colors || product_colors.length === 0)?"Provide product image for its color variants.":"Provide Product image "}
            </h1>

            <div className='flex flex-col w-full md:w-auto justify-center items-center'>

          {/* /// input fields  */}
        {/* check if color array not null or empty...take input image for each color variant
          or ...input single image */}
          {!(!product_colors || product_colors.length === 0)?(product_colors && product_colors.map((item)=>{
            return <div className="flex left-0 items-center content-between mb-2  " key={item}>
            <label className=" text-left block font-medium mb-2 w-20 " htmlFor="email">
            {item.toUpperCase()}
            </label>
            <input
              className=" w-full md:w-[36vw] px-4 py-2 border border-gray-400 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-3"
              type="text"
              name={item}
              onChange={(e)=>{
                {setproduct_image({...product_image, [e.target.name] :e.target.value}) }
              }}
              required
            />
          </div>      
          })):(<div className="flex left-0 items-center content-between mb-2  ">
          <label className=" text-left block font-medium mb-2 w-20 mr-2 " htmlFor="email">
          Image url : 
          </label>
          <input
            className=" w-full md:w-[36vw] px-4 py-2 border border-gray-400 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-3"
            type="text"
            name="product-image-url"
            value={singleImage}
            onChange={(e)=>setsingleImage(e.target.value)
            }
            required
          />
        </div>)}

          </div>
          <p className='my-5 text-gray-500 text-sm '>Current version do not support direct upload of multiple product photos, just provide link to single image. We will change this in future updates.</p>
      </div>}




        {/* /////////////////////////////////////////////////////////////////////////// */}
        {/* //////   QUANTITY PER SIZE AND COLOR   /////// */}
        {page7Ready && <><div className={`${(pageNumber===7)?"block":"hidden"} h-[57vh] w-[72vw] overflow-scroll `}>
        <h1 className='block text-lg font-medium mb-2'>
          Please enter the initial quantity of each product variant :
        </h1>


        {/* // looping through quantityKeys to create a form  */}
        {quantityKeys && quantityKeys.map((i)=>{
          return <div key = {i} className='flex items-center px-3 border rounded-lg border-gray-300 bg-slate-100'>

          <label className="block text-lg mb-2 text-left w-full" htmlFor="city">
            {i} :
          </label>

          <input
            className="w-full md:w-[23vw] px-4 py-2 border border-gray-400 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent my-3"
            type="number"
            name = {i}
            onChange={(e)=>{setquantities({...quantities, [e.target.name] :e.target.value}); }}
            required
          />
          </div>
          
        })}
        </div>


        <hr className="my-1" />
        </>
        }



{/* //////////////////////////////////////////////////////////////////// */}
{/* /////////    CONFIRMATION PAGE    ////////// */}
        {page8Ready && <div className={`${(pageNumber===8)?"block":"hidden"} rounded-xl bg-slate-100 px-5 h-[57vh] w-[72vw] overflow-scroll `}>

      <div className="  mx-auto">
       <div className=" lg:w-full  flex flex-wrap">
         <div className="lg:w-full w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">


           {/* // column entries */}
           <RowCell field = {"Brand Name :"} value = {product_brand}/>
           <RowCell field = {"Product Name :"} value = {product_name}/>
           <RowCell field = {"Description :"} value = {product_description}/>
           <RowCell field = {"Category :"} value = {product_category}/>
           <RowCell field = {"Price in ₹ :"} value = {product_price}/>
           <RowCell field = {"Keywords :"} value = {product_keywords }/>
           {(facebook || instagram || twitter) && <RowCell field = {"Socials : "} value = {product_brand_socials}/>}
           {/* //// image links ( colorwise )  */}
           <div >
            <div  className="flex  py-2">
                <span className="text-gray-900">{"Image Urls : "}</span>
                <span className={`ml-auto text-gray-900 text-left w-[35vw]`}>
                    {/* // showing quantities per variant  */}
                    {product_image && product_colors.map((item)=>{
                      return <>
                        <div className='flex'>
                          <p>{item}</p> <span>&nbsp;:&nbsp;</span>
                          <p>{product_image[item]}</p>
                        </div>
                      </>
                  })}
                 </span>
                 </div>
                 <div className='border-t border-gray-300 py-1'></div>
            </div> 

           {/* // displaying quantities per variant (by modifying rowcell format) */}
           <div >
            <div  className="flex  py-2">
                <span className="text-gray-900">{"Quantity : "}</span>
                <span className={`ml-auto text-gray-900 text-left w-[35vw]`}>
                    {/* // showing quantities per variant  */}
                    {quantities && quantityKeys.map((item)=>{
                      return <>
                        <div className='flex'>
                          <p>{item}</p> <span>&nbsp;:&nbsp;</span>
                          <p>{quantities[item]}</p>
                        </div>
                      </>
                  })}
            
                 </span>
                 </div>
            </div>    

          </div>
        </div>
      </div>
 
 
</div>}


{/* >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> */}
{/* // back and next button */}

        <div className={`flex flex-col md:flex-row ${(pageNumber===1)?"justify-end":"justify-between"}`}>

        {/* // back button  */}
        <button className={`mt-5 sm:self-center h-10 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded`}
        onClick={()=>
            {(pageNumber > 1)?setpageNumber(pageNumber-1):""}
        }
        hidden={(pageNumber === 1)?true:false}
        >
            Back
        </button >


        {/* // next button  */}
        {(pageNumber != 8) && <button className="mt-5  sm:self-center h-10 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={()=>{nextClicked()}}    
        // if size1 and color1 is not blank get combinations (when next clicked)
        >
            {(pageNumber<6)?((((!instagram && !twitter && !facebook) && pageNumber === 3 ) || ((!size1 && !size2 && !size3 && !size4 && !size5) && pageNumber === 4 ) || ((!color1 && !color2 && !color3 && !color4 && !color5) && pageNumber === 5 ))?"Skip":"Next"):"Continue"}
        </button>}

        {/* // add prod button  */}
        {(pageNumber === 8) && <button className="mt-5  sm:self-center h-10 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={arrangeFinalDataAndSubmit} key={"Add-prod"}
        >Add Product</button>}

        </div>

      </form>
    </div>
  );
  
}
  export default AddProduct;

