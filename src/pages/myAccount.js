// using accordion for details and change password
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import  Jwt  from 'jsonwebtoken';
import Cookies from 'universal-cookie'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MyAccount = () => {

  const cookies = new Cookies();
  const router = useRouter();
 
  const emitterConfig = {
    position: "bottom-center",
    autoClose: 2500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    };

  const accordionData = [
    {
      title: 'My Details',
    },
    {
      title: 'Change Password',
    },
  ];

  /// ACCORDION RELATED STATES 
  const [activeIndex, setActiveIndex] = useState(0);

  const toggleAccordion = (index) => {
    setActiveIndex(index === activeIndex ? -1 : index);
    // scroll to top everytime a new accordion closes and new one opens 
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // STATES DEFINED LATER FOR FUNCTIONALITY
  const [editMode, setEditMode] = useState(false);

  const [details, setDetails] = useState({});

  const [oldPass, setOldPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [newPassC, setNewPassC] = useState("");


  // functions
  const handleChange = (e)=>{  // handles thange of detail fields
    setDetails({...details,[e.target.name]:e.target.value});
  }

  const handlePassChange = (e)=>{
    if(e.target.name === "oldPass"){
      setOldPass(e.target.value)
    }else if(e.target.name === "newPass"){
      setNewPass(e.target.value)
    }else if(e.target.name === "newPassC"){
      setNewPassC(e.target.value)
    }
  }

  const handleDetailsSubmit = async(e)=>{ // change details
    e.preventDefault();
    let data = await fetch(`/api/updateUser`,{
      method: 'PUT', // *GET, POST, PUT, DELETE, etc.
      // sending through body, a search filter to be used in .find()...as body.filter
      body: JSON.stringify({name: details.name, email : details.email , address : details.address, pinCode: details.pinCode, phoneNumber : details.phoneNumber}) // send data in string json
    })
    data = await data.json();

    if(data){
      toast.success("Details Updated",emitterConfig);
      setEditMode(false);
    }else{
      toast.error("Some Error occured", emitterConfig)
    }

  }
//first check if old password matchs,,then proceeed forward
  const handlePasswordSubmit = async(e)=>{  // change password
    e.preventDefault();

    if(oldPass.length != 0 && newPass.length != 0 && newPassC.length != 0){
      // compare passwords
      if(newPass === newPassC){
        // get the current password and further compare with newpassword
        let data = await fetch(`/api/getUser?email=${details.email}`);
        data = await data.json();

        // encrypted password , encoded to be used in url
        const encOldPass = encodeURIComponent(data.user.password);

        if(data){
          // compare old enc password with new enc password
          let com = await fetch(`api/comparePass?encOldPass=${encOldPass}&oldPass=${oldPass}&newPass=${newPass}`);
          com = await com.json();

          if(com){
            
            // if old pass is correct and new and old passwords do not match
            if(com.success === true){ 
              
              // change the password
              let update = await fetch(`/api/updatePassword`,{
                method: 'PUT', // *GET, POST, PUT, DELETE, etc.
                // sending through body, a search filter to be used in .find()...as body.filter
                body: JSON.stringify({condition : {email : details.email},newPassword : newPass}) // send data in string json
              })
              update = await update.json();

              if(update){
                toast.success("Password Updated successfully !")
                setOldPass("");
                setNewPass("");
                setNewPassC("");
              }
              
            }else{ // show error otherwise
              toast.error(com.message, emitterConfig);
            }
          }
        }

      }else{
        toast.error("New Passwords do not match.")
      }
    }else{
      toast.error("Please fill all password fields !",emitterConfig);
    }
    
  }

  useEffect(() => {


    let loggedIn = cookies.get("token");
    if(!loggedIn){
      router.push("/")
    }

    
    // ${userEmail}
    const getDetails = async ()=>{

      // get name and email from token
      const token = cookies.get("token");
      // decrypt token [ FOR NAME AND EMAIL]
      const decryptedToken = Jwt.decode(token, process.env.JWT_SECRET);

      // getting details from user collection
      let data = await fetch(`/api/getUser?email=${decryptedToken.email}`)
      data = await data.json();

      const initialDetails = { 
        name : decryptedToken.name,   // take from token
        email : decryptedToken.email,  // take from token
        address : data.user.address,                   // fetch from and update in "user collection"
        pinCode : data.user.pinCode,                 // fetch from and update in "user collection"
        phoneNumber : data.user.phoneNumber          // fetch from and update in "user collection"
      };
      setDetails(initialDetails);
    }

    getDetails(); // calling above async function
  
  }, [])
  

  return (<div className='py-6'>

<h1 className="text-2xl font-bold mt-4 mb-5 mx-[5vw]">My Account</h1>

<div className="bg-gray-800 rounded-lg max-w-[90vw] mx-auto p-14 pt-8">

<h2 className="text-lg text-white font-bold mb-4 ">Manage your account details.</h2>

      {accordionData.map((item, index) => (
        <div
          className="border-b border-gray-300 rounded-xl mt-2"
          key={index}
        >
        {/* // accordion toggle button and title  */}
          <button
            className={`flex items-center justify-between px-4 py-2 bg-white w-full rounded-lg ${
              activeIndex === index ? ' border border-gray-400' : 'border-b-2'
            }`}
            onClick={() => toggleAccordion(index)}
          >
            <span className={`font-semibold `}>{item.title}</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={`h-4 w-4 transition-transform ${
                activeIndex === index ? 'transform rotate-180' : ''
              }`}
            >
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </button>

{/* ///////////////////////////////////////////////////////////////////////////////////////////////// */}
          {/* // accordion data  */}
          {activeIndex === index && (
            <div className="px-4 py-4 bg-white flex justify-center items-center pt-8 rounded-lg border border-gray-200">

            {/* // for My Details ------------------------------------------- */}
              {(item.title === "My Details") && <div>
                
                <div className='flex flex-col md:flex-row '>
                <div className="mb-4 mx-2">
                  <label className="block font-medium mb-2" htmlFor="name">
                    Name
                  </label>
                  <input
                    className={` w-full md:w-[36vw] px-4 py-2 border border-gray-400 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${editMode?"":"pointer-events-none"} `}
                    type="text"
                    id="name"
                    name='name'
                    value={details.name}
                    onChange={handleChange}
                    minLength={3}
                    required
                    readOnly = {editMode?false:true}
                  />
                </div>
                <div className="mb-4 mx-2">
                  <label className="block font-medium mb-2" htmlFor="email">
                    Email <span className=' text-sm font-light mb-2 text-gray-500'> &nbsp; *Email cannot be changed* </span>
                  </label>
                  <input
                    className=" w-full md:w-[36vw] px-4 py-2 border border-gray-400 rounded-md shadow-sm focus:outline-none pointer-events-none"
                    type="email"
                    id="email"
                    name='email'
                    value={details.email}
                    onChange={handleChange}
                    minLength={3}
                    readOnly = {true} // always true for email
                    required
                  />
                </div>
                </div>

                <div className="mb-4 mx-2 ">
                  <label className="block font-medium mb-2" htmlFor="address">
                    Address
                  </label>
                  <textarea className={`w-full px-4 py-2 border border-gray-400 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${editMode?"":"pointer-events-none"}`}
                    type="text"
                    id="address"
                    name='address'
                    value={details.address}
                    onChange={handleChange}
                    minLength={3}
                    readOnly = {editMode?false:true}
                    required cols="30" rows="3"></textarea>
             </div>

             <div className='flex flex-col md:flex-row'>
             <div className="mb-4 mx-2">
               <label className="block font-medium mb-2" htmlFor="zip">
               Pincode
               </label>
               <input
                 className={` w-full md:w-[36vw] px-4 py-2 border border-gray-400 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${editMode?"":"pointer-events-none"} `}
                 type="text"
                 id="pinCode"
                 name='pinCode'
                 value={details.pinCode}
                 onChange={handleChange}
                 minLength={3}
                 readOnly = {editMode?false:true}
                 required
               />
             </div>

             <div className="mb-4 mx-2">
               <label className="block font-medium mb-2" htmlFor="city">
                 Phone Number
               </label>
               <input
                 className={` w-full md:w-[36vw] px-4 py-2 border border-gray-400 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${editMode?"":"pointer-events-none"} `}
                 type='tel'
                 id="phoneNumber"
                 name='phoneNumber'
                 value={details.phoneNumber}
                 onChange={handleChange}
                 minLength={3}
                 readOnly = {editMode?false:true}
                 required
               /> 
             </div>
             </div>

{/* --------------------------------------------------------------- */}
             {/* ///// buttons  */}
             <div className={`flex ${((details.address === "" || details.pinCode === "" || details.phoneNumber === "") && !editMode) ? "justify-between" : "justify-end"} px-2 pt-6 pb-4`}>

            {/* // text */}
              {((details.address === "" || details.pinCode === "" || details.phoneNumber === "") && !editMode) && <h3 className='text-sm text-gray-600' >Fill in your details for better user experience.</h3>}

            {/* //  edit button  */}
             { !editMode && <button onClick={()=>{setEditMode(true)}} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Edit
             </button>}

             {editMode && <>
             
             <div></div>
             {/* // see to it that cancel button works as wanted */}
             <button onClick={()=>{setEditMode(false);router.reload()}} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mx-4 ">
                Cancel
             </button>

             <button onClick={handleDetailsSubmit} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                Save Changes
             </button>
             </>}

             </div>
                
             </div>}


            {/* // for Change Password ------------------------------------------- */}

            {(item.title === "Change Password") && <div>
                
            <div className='flex flex-col pt-1 pb-5'>
             <div className="mb-4 mx-2">
               <label className="block font-medium mb-2" htmlFor="zip">
               Old Password
               </label>
               <input
                 className="w-full md:w-[36vw] px-4 py-2 border border-gray-400 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                 type="password"
                 id="oldPass"
                 name='oldPass'
                 value={oldPass}
                 onChange={handlePassChange}
                 required
               />
             </div>
             <div className="mb-4 mx-2">
               <label className="block font-medium mb-2" htmlFor="zip">
               New Password
               </label>
               <input
                 className="w-full md:w-[36vw] px-4 py-2 border border-gray-400 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                 type="password"
                 id="newPass"
                 name='newPass'
                 value={newPass}
                 onChange={handlePassChange}
                 required
               />
             </div>
             <div className="mb-4 mx-2">
               <label className="block font-medium mb-2" htmlFor="zip">
               Confirm New Password
               </label>
               <input
                 className="w-full md:w-[36vw] px-4 py-2 border border-gray-400 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                 type="password"
                 id="newPassC"
                 name='newPassC'
                 value={newPassC}
                 onChange={handlePassChange}
                 required
               />
             </div>

             {/* -------------button -------------- */}
             <button onClick={handlePasswordSubmit} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">
                Update Password
             </button>

            </div>

                </div>}
            </div>
          )}
        </div>
      ))}
    </div>

    {/* toast container ---------- */}
            <div>
                <ToastContainer
                position="bottom-center"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                />
            </div>
  </div>
  );
};

export default MyAccount;
