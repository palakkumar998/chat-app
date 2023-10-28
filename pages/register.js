import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { IoLogoGoogle, IoLogoFacebook } from "react-icons/io";
import { auth } from '@/Firebase/firebase';
import { signInWithEmailAndPassword, GoogleAuthProvider, FacebookAuthProvider, signInWithPopup} from 'firebase/auth';
import { useAuth } from '@/Context/authContext';

const Register = () => {
    
    const router = useRouter();
    
    const gProvider = new GoogleAuthProvider();
    const fProvider = new FacebookAuthProvider();

    const { currentUser, isLoading } = useAuth();
    // const [Email, setEmail] = useState("")

    useEffect(() => {
        if (!isLoading && currentUser) {
            router.push("/");

        }

    }, [currentUser, isLoading]);

    // METHOD: this method submit the email and password and prevent the default behaviour
    const handleSubmit = async (e) => {
        e.preventDefault();

        const DisplayName = e.target[0].value;
        const email = e.target[1].value;
        const password = e.target[2].value;

        try {
            await signInWithEmailAndPassword(auth, email, password);
        } catch (er̥ror) {
            console.log("🚀 ~ file: login.js:18 ~ handleSubmit ~ er̥ror:", er̥ror)

        }

    }

    const signInWithGoogle = async () => {
        try {
            await signInWithPopup(auth, gProvider)

        } catch (e̥rror) {
            console.log("🚀 ~ file: login.js:47 ~ signInWithGoogle ~ e̥rror:", e̥rror)
           

        }
    }

    // METHOD: login with your facebook account 
    const signInWithFacebook = async () => {
        try {
            await signInWithPopup(auth, fProvider)

        } catch (e̥rror) {
            console.log("🚀 ~ file: login.js:47 ~ signInWithGoogle ~ e̥rror:", e̥rror)
           

        }
    }
    return isLoading || (!isLoading && currentUser) ? ("Loader......") : (
        <div className="h-[100vh] flex justify-center items-center bg-c1">
            <div className="flex items-center flex-col">

                <div className="text-center">
                    <div className="text-4xl font-bold"> Create a new Account</div>
                    <div className="mt-3 text-c3">Connect and chat with anyone, anywhere</div>
                </div>

                <div className="flex items-center gap-2 w-full mt-10 mb-5 ">
                    {/* // login button */}
                    <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 w-1/2 h-14 rounded-md cursor-pointer p-[1px]">
                        <div onClick={signInWithGoogle} className="flex items-center justify-center gap-3 text-white bg-c1 w-full h-full rounded-md font-semibold" >
                            <IoLogoGoogle size={24} />
                            <span>Login with Google</span>
                        </div>
                    </div>
                    <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 w-1/2 h-14 rounded-md cursor-pointer p-[1px]">
                        <div onClick={signInWithFacebook} className="flex items-center justify-center gap-3 text-white bg-c1 w-full h-full rounded-md font-semibold" >
                            <IoLogoFacebook size={24} />
                            <span>Login with Facebook</span>
                        </div>
                    </div>

                </div>
                <div className="flex items-center gap-1">
                    <span className='w-5 p-[1px] bg-c3' ></span>
                    <span className='text-c3 font-semibold' >Or</span>
                    <span className='w-5 p-[1px] bg-c3' ></span>
                </div>
                {/* login form  */}
                <form onSubmit={handleSubmit} className='flex flex-col items-center gap-3 mt-5  w-[500px]'>
                    <input type="text"
                        placeholder='Display name' className='w-full h-14 bg-c5 rounded-xl outline-none border-none px-5 text-c3 ' autoComplete='off' />
                    <input type="email"
                        placeholder='email' className='w-full h-14 bg-c5 rounded-xl outline-none border-none px-5 text-c3 ' autoComplete='off' />
                    <input type="password"
                        placeholder='password' className='w-full h-14 bg-c5 rounded-xl outline-none border-none px-5 text-c3 ' autoComplete='off' />
                    <div className="text-right w-full text-c3">

                    </div>
                    <button className='mt-4 w-full h-14 rounded-xl outline-none text-base font-semibold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 cursor-pointer'>Signup</button>
                </form>

                <div className="flex justify-center gap-1 text-c3 mt-5">
                    <span>Already have an Account !</span>
                    <Link href="/login" className='font-semibold text-white underline underline-offset-3 cursor-pointer'> Login </Link>
                </div>

            </div>



        </div>
    )
}

export default Register