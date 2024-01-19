import Link from 'next/link';
import React, {  useState } from 'react';
import { useRouter } from 'next/router';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Image from 'next/image';
import randomToken from 'random-token';

function Forgot() {

    const router = useRouter();
    var token = `${Date.now()}${randomToken(16)}`; 

    const [email, setEmail] = useState("");
    const [emailSent, setEmailSent] = useState(false);
    const [newPass, setNewPass] = useState({
        pass1 : "",
        pass2 : ""
    })


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

    const handleNewPassChange = (e)=>{
        setNewPass({...newPass,[e.target.name] : e.target.value});
    }

    const emailChange = async (e)=>{
        setEmail(e.target.value);
    }

    const handleSubmit = async(e)=>{
        e.preventDefault();

        // fetch request to our users collection to see if a user exists
        let data = await fetch(`/api/getUser?email=${email}`)
        data = await data.json()


        if(data){
            if(data.success === true){
                // save email and token in db
                await fetch(`/api/addForgotToken`,{
                    method: 'POST', // *GET, POST, PUT, DELETE, etc.
                    // sending through body, a search filter to be used in .find()...as body.filter
                    body: JSON.stringify({email,token}) // send data in string json
                })
        
                // send email
                let send = await fetch(`/api/sendEmail`,{
                    method: 'POST', // *GET, POST, PUT, DELETE, etc.
                    // sending through body, a search filter to be used in .find()...as body.filter
                    body: JSON.stringify({email,token}) // send data in string json
                })
                send = await send.json();

                console.log(send)

                // (show tick + check you email inbox) and redirect to login page after 4 sec
                setEmailSent(true);
                
            
            }else if(data.success === false){
                toast.error("User not found !", emitterConfig);
                setTimeout(() => {
                    router.push("/signup")
                }, 3000);

                // toast -> account do not exist and redirect to signup page after 2.5 sec
            }

        }
    }

    // when change password pressed
    // takes token as parameter to access email and do rest of the job with email id
    const changePasswordSubmit = async (token)=>{

        // checks if the passwords entered are identical or not
        if(newPass.pass1 === newPass.pass2){

            // checks if the token is valid or not
            let data =await  fetch(`/api/getForgotToken?token=${token}`);
            data = await data.json();
            if(data.tokenExists != null){

                //if token valid get email
                let userEmail = data.tokenExists.email;
                // update password 
                let update = await fetch(`/api/updatePassword`,{
                    method: 'PUT', // *GET, POST, PUT, DELETE, etc.
                    body: JSON.stringify({condition : {email : userEmail},newPassword : newPass.pass1}) // send data in string json
                })
 
                // if updated successfully
                if(update){
                    // delete all token of that email id
                    try {
                        let del = await fetch(`/api/deleteForgotToken`,{
                            method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
                            body: JSON.stringify({email : userEmail}) // send data   in string json
                        })
                    } catch (error) {
                        console.log({error})
                    }

                    // show them that password is changed successfully 
                    toast("Password Changed Successfully",emitterConfig)

                    // redirect them to login page
                    setTimeout(() => {
                        router.push("/login");
                    }, 2500);

                    
                }else{
                    toast.error("Some error occured!",emitterConfig);
                }

        
            }else{
                console.log("expired token")
                toast.error("Link Expired !",emitterConfig)

                // redirect to forgot page
                setTimeout(() => {
                    router.push("/forgot");
                }, 2500);
            }
        }else{
            // if passwords do not match
            toast.error("Passwords do not match!", emitterConfig);
        }
    }
    

    return (
        <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4 sm:px-6 lg:px-8">

{/* --------------------------------------------------------- */}
{/* ///////// if token not present in url /////////// */}
            {/* // defaault forgot page */}
           { !router.query.token && <>{!emailSent && <div className="max-w-md w-full space-y-8">
                <div>
                    <h1 className="text-4xl font-bold text-white text-center cursor-grab">Recover your account </h1>
                </div>
                <form className="mt-8 space-y-6">
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <label htmlFor="email-address" className="sr-only">Email address</label>
                            <input id="email-address" name="email" type="email" autoComplete="email" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 focus:outline-none focus:ring-gray-500 focus:border-gray-500 focus:z-10 sm:text-sm text-black" placeholder="Please enter your Email address" 
                            value = {email}
                            onChange={emailChange}
                            />
                        </div>
                    </div>
                    
                    <div>
                        <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gradient-to-r from-green-400 to-blue-500 hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-400"
                        onClick={handleSubmit}
                        >
                            <span className="text-white">Continue </span>&nbsp; &rarr;
                        </button>
                    </div>
                </form>
                <div className="flex flex-col items-center justify-center mt-6">
                    <div className="text-white font-medium hover:text-gray-200">
                        Don't have an account?
                        <Link href="/signup" className="text-green-400 ml-2">Sign up</Link>
                    </div>
                    <div className="text-white font-medium hover:text-gray-200 mt-4">
                        or
                        <Link href="/login" className="text-green-400 ml-2">Login</Link>
                    </div>
                </div>
            </div>}

            {/* // after email has been sent  */}
            {emailSent && <div>
                <div className="flex flex-col justify-center items-center">
                    <Image className=' h-44 w-52 ' src={"/icon-tick.png"} height={50} width={50} alt='Tick image'></Image>
                    <div className="flex items-center justify-center mt-6">
                        <div className="text-gray-300 font-medium hover:text-gray-200 mt-4">
                            An email has been sent to you, to recover your account.
                        </div>
                    </div>
                </div>
            </div>}
            </>}
{/* ------------------------------------------------------------------ */}
{/* //////// if token present in url ///////////// */}
        {(router.query.token) && <div className='flex flex-col max-w-md w-full'>
            <div>
                <h1 className="text-3xl font-bold text-white text-center mb-8">Set New Password</h1>
            </div>
            <div>
                <label htmlFor="pass1" className="sr-only">New Password</label>
                <input id="pass1" name="pass1" type="password" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 focus:outline-none focus:ring-gray-500 focus:border-gray-500 focus:z-10 sm:text-sm text-black mb-3" placeholder="Enter New Password" 
                value = {newPass.pass1}
                onChange={handleNewPassChange}
                />
            </div>
            <div>
                <label htmlFor="pass2" className="sr-only">New Password</label>
                <input id="pass2" name="pass2" type="password" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 focus:outline-none focus:ring-gray-500 focus:border-gray-500 focus:z-10 sm:text-sm text-black mb-3" placeholder="Confirm New Password" 
                value = {newPass.pass2}
                onChange={handleNewPassChange}
                />
            </div>
            <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gradient-to-r from-green-400 to-blue-500 hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-400 mt-5"
            onClick={()=>{changePasswordSubmit(router.query.token)}}
            >
                Change Password
            </button>

            </div>}

            {/* // toaast container  */}
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
    );
}

export default Forgot;

