import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import  Jwt  from 'jsonwebtoken';
import Cookies from 'universal-cookie'

function Login() {

    const cookies = new Cookies();
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const router = useRouter()

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

    const handleChange = (e)=>{
        if(e.target.name === "email"){
            setEmail(e.target.value);
        }else if(e.target.name === "password"){
            setPassword(e.target.value);
        }
    }

    const handleSubmit = async (e)=>{
        e.preventDefault();
    try {
        let data = await fetch(`/api/logIn`,{
                method: 'POST', // *GET, POST, PUT, DELETE, etc.
                // sending through body, a search filter to be used in .find()...as body.filter
                body: JSON.stringify({email,password}) // send data in string json
            })
            data = await data.json();

            if(data.success === true){

                // saving token in local storage
                cookies.set("token", data.token)

                // decrypt jwt token from data.token and use name from it
                let decryptedToken = Jwt.decode(data.token, process.env.JWT_SECRET);

                toast.success(`Welcome, ${decryptedToken.name} !`, emitterConfig );

                setTimeout(() => {
                    router.push("/") 
                }, 1500);
            }else{
                toast.error(data.error, emitterConfig );
            }
    } catch (error) { 
        console.log({error})
    }

    }

    useEffect(() => {
        if(cookies.get("token")){
          router.push("/")
        }
      }, [])

    return (
        <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <h1 className="text-4xl font-bold text-white text-center">Log in to your account</h1>
                </div>
                <form className="mt-8 space-y-6">
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <label htmlFor="email-address" className="sr-only">Email address</label>
                            <input id="email-address" name="email" type="email" autoComplete="email" required className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-black focus:outline-none focus:ring-gray-500 focus:border-gray-500 focus:z-10 sm:text-sm" placeholder="Email address" 
                            value={email}
                            onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">Password</label>
                            <input id="password" name="password" type="password" autoComplete="current-password" required className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-black focus:outline-none focus:ring-gray-500 focus:border-gray-500 focus:z-10 sm:text-sm mt-4" placeholder="Password" 
                            value={password}
                            onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="flex items-center justify-end">
                        <div className="text-sm">
                            <Link href="/forgot" className="font-medium text-gray-300 hover:text-gray-400">
                                Forgot your password?
                            </Link>
                        </div>
                    </div>
                    <div>
                        <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-gradient-to-r from-green-400 to-blue-500 hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-400"
                        onClick={handleSubmit}
                        >
                            <span className="text-white">Log in</span>
                        </button>
                    </div>
                </form>
                <div className="flex items-center justify-center mt-6">
                    <div className="text-white font-medium hover:text-gray-200">
                        Don't have an account?
                        <Link href="/signup" className="text-green-400 ml-2">Sign up</Link>
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

export default Login; 

