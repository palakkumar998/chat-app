import Link from 'next/link';
import { useEffect, React, useState } from 'react'
import { IoLogoGoogle, IoLogoFacebook } from "react-icons/io";
import { auth } from '@/Firebase/firebase';
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, FacebookAuthProvider, sendPasswordResetEmail } from 'firebase/auth';
import { useAuth } from '@/Context/authContext';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import ToastMessage from '@/Components/ToastMessage';



const Login = () => {

  const router = useRouter();
  const gProvider = new GoogleAuthProvider();
  const fProvider = new FacebookAuthProvider();
  const { currentUser, isLoading } = useAuth();
  const [Email, setEmail] = useState("")

  useEffect(() => {
    if (!isLoading && currentUser) {
      router.push("/");

    }

  }, [currentUser, isLoading]);


  // METHOD: this method submit the email and password and prevent the default behaviour
  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (er̥ror) {
      console.log("🚀 ~ file: login.js:18 ~ handleSubmit ~ er̥ror:", er̥ror)

    }

  }

  // METHOD: login with your google account 
  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, gProvider)

    } catch (e̥rror) {
      console.log("🚀 ~ file: login.js:47 ~ signInWithGoogle ~ e̥rror:", e̥rror)
      console.error(error);

    }
  }

  // METHOD: login with your facebook account 
  const signInWithFacebook = async () => {
    try {
      await signInWithPopup(auth, fProvider)

    } catch (e̥rror) {
      console.log("🚀 ~ file: login.js:47 ~ signInWithGoogle ~ e̥rror:", e̥rror)
      console.error(error);

    }
  }

  // METHOD : this method reset the password with corresponding email using sendPasswordResetEmail function
  const resetPassword = async () => {
    try {
      toast.promise(
        async () => {
          await sendPasswordResetEmail(auth, Email);
        },
        {
          pending: "Generating reset link",
          success: "Reset email send to your registered email address",
          error: "You may have entered wrong email address",
        },
        {
          autoClose: 5000,
        }
      );
      console.log("Email send to your registered email id.");
    } catch (error) {
      console.error("An error occured", error);
    }
  };


  return isLoading || (!isLoading && currentUser) ? ("Loader......") : (
    <div className="h-[100vh] flex justify-center items-center bg-c1">
      <ToastMessage />
      <div className="flex items-center flex-col">

        <div className="text-center">

          <div className="text-4xl font-bold text-white"> Login to your Account</div>
          <div className="mt-3 text-c3">Connect and chat with anyone, anywhere</div>
        </div>

        <div className="flex items-center gap-2 w-full mt-10 mb-5 ">
          {/* // login button */}
          <div className=" w-1/2 h-14 rounded-md cursor-pointer p-[1px]">
            <div onClick={signInWithGoogle} className="flex items-center justify-center gap-3 text-white bg-slate-800 hover:bg-c5 w-full h-full rounded-md font-semibold" >
              <IoLogoGoogle size={24} />
              <span>Login with Google</span>
            </div>
          </div>
          <div className=" w-1/2 h-14 rounded-md cursor-pointer p-[1px]">
            <div onClick={signInWithFacebook} className="flex items-center justify-center gap-3 text-white bg-slate-800 hover:bg-c5 w-full h-full rounded-md font-semibold" >
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

          <input type="email"
            placeholder='enter your email here'
            className='w-full h-14 bg-c5 rounded-xl outline-none border-none px-5 text-c3 '
            autoComplete='off'
            onChange={(e) => setEmail(e.target.value)} />

          <input type="password"
            placeholder='enter your password here'
            className='w-full h-14 bg-c5 rounded-xl outline-none border-none px-5 text-c3 '
            autoComplete='off' />

          <div className="text-right w-full text-c3">
            <span className='cursor-pointer' onClick={resetPassword}> Forget Password ?</span>
          </div>
          <button className='mt-4 w-full h-14 rounded-xl outline-none text-base font-semibold bg-gradient-to-r from-indigo-500 via-sky-500  to-emerald-500 cursor-pointer'>Login into your Account</button>
        </form>
        {/* registration link */}
        <div className="flex justify-center gap-1 text-c3 mt-5">
          <span>Not a member yet ?</span>
          <Link href="/register" className='font-semibold text-c3 underline underline-offset-3 cursor-pointer'> Register Now </Link>
        </div>

      </div>
    </div>
  )
}

export default Login