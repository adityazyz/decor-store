import React,{useState, useEffect} from 'react'
import Image from 'next/image'
import Link from 'next/link';
import { useRouter } from 'next/router'
import Searchbar from './Searchbar';
import CartSidebar from './sidebar/CartSidebar';
import { savedCart } from '../../slices/cartSlice'
import { useDispatch } from 'react-redux';
import Cookies from 'universal-cookie';
import {HiShoppingCart} from "react-icons/hi"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Navbar() {

  const cookies = new Cookies();
  
  const dispatch = useDispatch();

    const navItem1 = "Sculpture";
    const navItem2 = "Wall Art";
    const navItem3 = "Plants";
    const navItem4 = "Ceramics";

    const navItem1link = "/sculpture";
    const navItem2link = "/wallart";
    const navItem3link = "/plants";
    const navItem4link = "/ceramics";

    const activeLinkStyle = " bg-black text-white rounded-md px-3 py-2 text-sm font-medium";
    const unactiveLinkStyle = " text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium";

    const activeLinkStyleMobile = "text-white bg-black  hover:text-white block rounded-md px-3 py-2 text-base font-medium";
    const unactiveLinkStyleMobile = "text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium";

    const router = useRouter();
    const currentPath = router.pathname;

    const [profileDrop, setProfileDrop] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [cartSidebar, setCartSidebar] = useState(false);

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

    // decides what to show on nav bar and what not to
    const [loggedin, setLoggedin] = useState(false);
  
    const logInPressed = ()=>{
        router.push("/login");
    }

    const logOutPressed = ()=>{
      cookies.remove("token");
      toast("Logged out Successfully !",emitterConfig)
      setTimeout(() => {
        router.push("/")
      }, 2000);
    }

    const handleProfileClick = ()=>{
    (!profileDrop)?(setProfileDrop(true)):(setProfileDrop(false));
    }

    const handleProfileBlur = ()=>{
      // delay bcoz the dropdown is closing before the buttons are getting clicked
        setTimeout(() => {
          setProfileDrop(false);
        }, 100);
    }

    const toggleMenu = ()=>{
        (!menuOpen)?(setMenuOpen(true)):(setMenuOpen(false));
    }

    const toggleCartSidebar = ()=>{
      (!cartSidebar)?(setCartSidebar(true)):setCartSidebar(false);
    }

    // runs whenever value of token changes i.e null or string
    useEffect(() => {
  
        if (cookies.get('token')) {
          setLoggedin(true);
        } else {
          setLoggedin(false);
        }
      
    }, [cookies.get('token')]);

   useEffect(() => {
  
    let cartAlready = cookies.get("localCart");
     if(cartAlready){
       dispatch(savedCart(cartAlready))
     }else{
       dispatch(savedCart([]));
     }
   }, [])
   

  return (
    <div className='sticky top-0 z-30'>


{/* /////side bar  */}  
{
  <CartSidebar toggleCartSidebar = {toggleCartSidebar} cartSidebar = {cartSidebar}/>
}


  <nav className="bg-gray-800 ">
      {/*the navbar */}
  <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-6 ">
    <div className="relative flex h-20 items-center justify-between">
      <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
        {/* <!-- Mobile menu button--> */}
        <button onClick={toggleMenu} type="button" className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" aria-controls="mobile-menu" aria-expanded="false" >
          <span className="sr-only">Open main menu</span>
          {/* <!--
            Icon when menu is closed.

            Menu open: "hidden", Menu closed: "block"
          --> */}
          {/* ////// menu button mobile  */}
          <svg className={`${(!menuOpen)?"block":"hidden"} h-6 w-6`} fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
          {/* <!--
            Icon when menu is open.

            Menu open: "block", Menu closed: "hidden"
          --> */}
          {/* ////// cross button mobile  */}
          <svg className={`${(menuOpen)?"block":"hidden"} h-6 w-6`} fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
        {/* //logo  */}
        <Link href="/">
        <div className="flex flex-shrink-0 items-center mx-8">
          <Image className="mr-5 block h-9 sm:h-11 w-[auto] sm:w-[10vw] md:w-auto lg:hidden" src="/app-logo.png" width={500} height={500} alt="Your Company"/>
          <Image className="hidden h-11 w-auto lg:block" src="/app-logo.png" width={500} height={500} alt="Your Company"/>
        </div>
        </Link>

        <div className="hidden sm:ml-6 sm:block pt-1">
          <div className="flex space-x-4 ">
            
            <Link href={navItem1link} className={(currentPath === navItem1link)?activeLinkStyle:unactiveLinkStyle} aria-current="page">{navItem1}</Link>

            <Link href={navItem2link} className={(currentPath === navItem2link)?activeLinkStyle:unactiveLinkStyle}>{navItem2}</Link>

            <Link href={navItem3link} className={(currentPath === navItem3link)?activeLinkStyle:unactiveLinkStyle}>{navItem3}</Link>

            <Link href={navItem4link} className={(currentPath === navItem4link)?activeLinkStyle:unactiveLinkStyle}>{navItem4}</Link>
          
          </div> 
        </div>
      </div>
      <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
        {/* ///// SEARCHBAR IN LAGRGE SCREEN */}
        <div className="hidden lg:block w-[30vw]">
        <Searchbar/>
        </div>




        
        {/*  IF LOGGED IN    /////////////////////////// */}
        {/* ////////////////////////// profile icon + cart icon /////////////////////////// */}

        {loggedin && <>
        {/* <!-- Profile dropdown --> */}
        <div className="relative ml-4 ">
          <div>
             {/* ///// profile drop button  */}
            <button type="button" className={`flex rounded-full bg-gray-800 text-sm hover:ring-2 hover:ring-white hover:ring-offset-2 hover:ring-offset-gray-800 ${(profileDrop)?"focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800":" "}`} id="user-menu-button " aria-expanded="false" aria-haspopup="true" onClick={handleProfileClick}  onBlur={handleProfileBlur}>
              <span className="sr-only">Open user menu</span>
              <Image className="h-8 w-8 rounded-full" src="/user-icon.png"  width={500} height={500} alt=""/>
            </button>
          </div>
          {/* /////// profile drop menu  */}
          <div className={`absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none ${(!profileDrop)?"hidden":"block"}`} role="menu" aria-orientation="vertical" arialabelledby="user-menu-button" tabIndex="-1">
            {/* <!-- Active: "bg-gray-100", Not Active: "" --> */}
            <Link href="/myAccount" className="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-200 hover:text-gray-800" role="menuitem" tabIndex="-1" id="user-menu-item-0" >My Account</Link>
            <Link href="/myOrders" className="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-200 hover:text-gray-800" role="menuitem" tabIndex="-1" id="user-menu-item-1" >My Orders</Link>
            <Link href="#" className="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-200 hover:text-gray-800" role="menuitem" tabIndex="-1" id="user-menu-item-2" onClick={logOutPressed}>Log out</Link>
          </div>
        </div>

        {/* /////cart button  */}
        <div className='h-8 w-8 flex items-center justify-center mx-6'>
        <button onClick={toggleCartSidebar} >
          <HiShoppingCart  className='h-7 w-7 text-gray-200 hover:text-white hover:h-8 hover:w-8'/>
        </button>
        </div>
        </>
        }

        {/* //// if not logged in ...show login option  ///////////////////////////// */}
        {!loggedin && <button className=" h-8 bg-gradient-to-r from-green-500 to-[#3B81F6] hover:from-green-500 hover:to-green-600 text-white font-bold py-2 px-4 ml-6 mr-2 rounded-full flex items-center justify-center" onClick={logInPressed}>
          Log In
        </button>
        }

      </div>
    </div>
  </div>

  {/* <!-- Mobile menu, show/hide based on menu state. --> */}
  <div className={`sm:hidden`} id="mobile-menu" hidden = {!menuOpen}>
    <div className="space-y-1 px-2 pt-2 pb-3">
      {/* <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" --> */}
      <Link onClick={toggleMenu} href={navItem1link} className={(currentPath === navItem1link)?activeLinkStyleMobile:unactiveLinkStyleMobile} aria-current="page">{navItem1}</Link>

      <Link onClick={toggleMenu} href={navItem2link} className={(currentPath === navItem2link)?activeLinkStyleMobile:unactiveLinkStyleMobile}>{navItem2}</Link>

      <Link onClick={toggleMenu} href={navItem3link} className={(currentPath === navItem3link)?activeLinkStyleMobile:unactiveLinkStyleMobile}>{navItem3}</Link>

      <Link onClick={toggleMenu} href={navItem4link} className={(currentPath === navItem4link)?activeLinkStyleMobile:unactiveLinkStyleMobile}>{navItem4}</Link>
    </div>
  </div>

</nav> 

    {/* ####### searchBar  */}
    <div className="bg-gray-800  w-[100vw] pt-4 pb-4 flex lg:hidden justify-center">
      <div className = " w-[100vw] sm:w-[65vw] ">
        <Searchbar />
        {/* block :block */}
      </div>
    </div>


    {/* // toast container ///////// */}
    <div>
        <ToastContainer
        position="bottom-center"
        autoClose={5000}
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

  )
}

export default Navbar