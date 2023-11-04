import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { IoLogoGoogle, IoLogoFacebook } from "react-icons/io";
import { auth, db } from '@/Firebase/firebase';
import { GoogleAuthProvider, FacebookAuthProvider, signInWithPopup, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { useAuth } from '@/Context/authContext';
import { doc, setDoc } from 'firebase/firestore';
import { profileColors } from '@/utils/constants';
import Loader from '@/Components/Loader';


const Register = () => {

    const router = useRouter();
    const gProvider = new GoogleAuthProvider(); //? creating an instanceof google auth provider/ fb auth provider
    const fProvider = new FacebookAuthProvider();
    const { currentUser, isLoading } = useAuth();
    const randomColor = Math.floor(Math.random() * profileColors.length); //? floor function helps to avoid decimal number values

    useEffect(() => {
        if (!isLoading && currentUser) {
            router.push("/");

        }

    }, [currentUser, isLoading]);

    // METHOD: this method will create display name, email, password to register into firebase authetication & submit the email and password and prevent the default behaviour
    const handleSubmit = async (e) => {
        e.preventDefault();

        const displayName = e.target[0].value;
        const email = e.target[1].value;
        const password = e.target[2].value;

        try {
            const { user } = await createUserWithEmailAndPassword(auth, email, password);

            // create collection to store email, name, password & colors for profile DP
            await setDoc(doc(db, "users", user.uid), {
                uid: user.uid,
                email,
                displayName,
                color: profileColors[randomColor],

            });

            // create collection in database for user's chat
            await setDoc(doc(db, "userChats", user.uid), {});

            // update user name
            await updateProfile(user, {
                displayName,
            });

            console.log("🚀 ~ file: register.js:56 ~ handleSubmit ~ us̥er:", user);

            router.push("/");

        } catch (error) {
            console.error("🚀 ~ file: login.js:61 ~ handleSubmit ~ er̥ror:", error)

        }

    }
    // METHOD: sign in  with your google account 
    const signInWithGoogle = async () => {
        try {
            await signInWithPopup(auth, gProvider)

        } catch (error) {
            console.log("🚀 ~ file: login.js:72 ~ signInWithGoogle ~ e̥rror:", error)


        }
    }

    // METHOD: sign in  with your facebook account 
    const signInWithFacebook = async () => {
        try {
            await signInWithPopup(auth, fProvider)

        } catch (error) {
            console.log("🚀 ~ file: login.js:83 ~ signInWithGoogle ~ e̥rror:", error)


        }
    }
    return isLoading || (!isLoading && currentUser) ? <Loader /> : (
        <div className="h-[100vh] flex justify-center items-center bg-c1 ">
            <div className="flex items-center flex-col border border-gray-500 py-7 px-7 rounded-2xl   ">

                <div className="text-center ">
                    <div className="text-4xl font-bold"> Create a new Account</div>
                    <div className="mt-3 text-c3">Connect and chat with anyone, anywhere</div>
                </div>

                <div className="flex items-center gap-2 w-full mt-10 mb-5 ">


                    <div className=" w-1/2 h-14 rounded-md cursor-pointer p-[1px]">
                        <div onClick={signInWithGoogle} className="flex items-center justify-center gap-3 text-white bg-slate-800 hover:bg-c5 w-full h-full rounded-md font-semibold" >
                            <IoLogoGoogle size={24} />
                            <span>Sign up with Google</span>
                        </div>
                    </div>

                    <div className=" w-1/2 h-14 rounded-md cursor-pointer p-[1px]">
                        <div onClick={signInWithFacebook}
                            className="flex items-center justify-center gap-3 text-white bg-slate-800 hover:bg-c5 w-full h-full rounded-md font-semibold" >
                            <IoLogoFacebook size={24} />
                            <span>Sign up with Facebook</span>
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