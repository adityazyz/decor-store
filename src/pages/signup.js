import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'universal-cookie';

function Signup() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

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

    const cookies = new Cookies();

    useEffect(() => {
      if(cookies.get("token")){
        router.push("/")
      }
    }, [])
    

    const handleChange = (e)=>{
        if(e.target.name === "name"){
            setName(e.target.value);
        }else if(e.target.name === "email"){
            setEmail(e.target.value);
        }else if(e.target.name === "password"){
            setPassword(e.target.value);
        }else if(e.target.name === "confirmPassword"){
            setConfirmPassword(e.target.value);
        }
    }

    const handleSubmit = async (e)=>{
        e.preventDefault();
        
        try {
            if(password === confirmPassword){
                let data = await fetch(`/api/signUp`,{
                    method: 'POST', // *GET, POST, PUT, DELETE, etc.
                    // sending through body, a search filter to be used in .find()...as body.filter
                    body: JSON.stringify({name,email,password}) // send data in string json
                })
                data = await data.json();
                if(data.success === true){
                    toast.success('Account Created, Welcome !  ', emitterConfig );
    
                    // clearing fields
                    setName("");
                    setEmail("");
                    setPassword("");
                    setConfirmPassword("");
    
                    setTimeout(async() => {
                        // getting a token based on email and pass (partial login pg frunctinality)
                        // and saving it in cookies
                        let data = await fetch(`/api/logIn`,{
                        method: 'POST', // *GET, POST, PUT, DELETE, etc.
                        // sending through body, a search filter to be used in .find()...as body.filter
                        body: JSON.stringify({email,password}) // send data in string json
                        })
                        data = await data.json();

                        if(data){
                        // saving token in local storage
                        cookies.set("token", data.token)
                        router.push("/")
                        }
                    }, 1500);
                }else{
                    toast.error(data.error, emitterConfig );
                }
            }else{
                toast.error('Passwords do not match !', emitterConfig );
            }
        } catch (error) {
            console.log({error})
        }

    }

    return (
        <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <h1 className="text-4xl font-bold text-white text-center">Create a new account</h1>
                </div>
                <form className="mt-8 space-y-6">
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <label htmlFor="name" className="sr-only">Name</label>
                            <input id="name" name="name" type="text" required className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-black focus:outline-none focus:ring-gray-500 focus:border-gray-500 focus:z-10 sm:text-sm" placeholder="Full Name" 
                            value={name}
                            onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="email-address" className="sr-only">Email address</label>
                            <input id="email-address" name="email" type="email"  required className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-black  focus:outline-none focus:ring-gray-500 focus:border-gray-500 focus:z-10 sm:text-sm mt-4" placeholder="Email address" 
                            value={email}
                            onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">Password</label>
                            <input id="password" name="password" type="password"  required className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-black  focus:outline-none focus:ring-gray-500 focus:border-gray-500 focus:z-10 sm:text-sm mt-4" placeholder="Password" 
                            value={password}
                            onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="confirm-password" className="sr-only">Confirm Password</label>
                            <input id="confirmPassword" name="confirmPassword" type="password" required className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-black  focus:outline-none focus:ring-gray-500 focus:border-gray-500 focus:z-10 sm:text-sm mt-4" placeholder="Confirm Password" 
                            value={confirmPassword}
                            onChange={handleChange}
                            />
                        </div>
                    </div>
                    
                    <div>
                        <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-gradient-to-r from-green-400 to-blue-500 hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-offset-2 hover:ring-green-400"
                        onClick={handleSubmit}
                        >
                            <span className="text-white">Sign up</span>
                        </button>
                    </div>
                </form>
                <div className="flex items-center justify-center mt-6">
                    <div className="text-white font-medium hover:text-gray-200">
                        Already have an account?
                        <Link href="/login" className="text-green-400 ml-2">Log in</Link>
                    </div>
                </div>
            </div>
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

export default Signup;
 
