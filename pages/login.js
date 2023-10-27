import Link from 'next/link';
import { useEffect, React } from 'react'
import { IoLogoGoogle, IoLogoFacebook } from "react-icons/io";
import { auth } from '@/Firebase/firebase';
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, FacebookAuthProvider } from 'firebase/auth';
import { useAuth } from '@/Context/authContext';
import { useRouter } from 'next/router';



const Login = () => {

  const router = useRouter();
  const gProvider = new GoogleAuthProvider();
  const fProvider = new FacebookAuthProvider();
  const { currentUser, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && currentUser) {
      router.push("/");

    }

  }, [currentUser, isLoading]);



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


  return isLoading || (!isLoading && currentUser) ? ("Loader......") : (
    <div className="h-[100vh] flex justify-center items-center bg-white">
      <div className="flex items-center flex-col">

        <div className="text-center">
          <div className="text-2xl font-bold text-c1"> Login to your Account</div>
          <div className="mt-3 text-c3">Connect and chat with anyone, anywhere</div>
        </div>

        <div className="flex items-center gap-2 w-full mt-10 mb-5 ">
          {/* // login button */}
          <div className=" w-1/2 h-14 rounded-md cursor-pointer p-[1px]">
            <div onClick={signInWithGoogle} className="flex items-center justify-center gap-3 text-white bg-orange-500 hover:bg-orange-700 w-full h-full rounded-md font-semibold" >
              <IoLogoGoogle size={24} />
              <span>Login with Google</span>
            </div>
          </div>
          <div className=" w-1/2 h-14 rounded-md cursor-pointer p-[1px]">
            <div onClick={signInWithFacebook} className="flex items-center justify-center gap-3 text-white bg-blue-400 hover:bg-blue-600 w-full h-full rounded-md font-semibold" >
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
            placeholder='enter your email here' className='w-full h-14 bg-slate-300 rounded-xl outline-none border-none px-5 text-c3 ' autoComplete='off' />
          <input type="password"
            placeholder='enter your password here' className='w-full h-14 bg-slate-300 rounded-xl outline-none border-none px-5 text-c3 ' autoComplete='off' />
          <div className="text-right w-full text-c3">
            <span className='cursor-pointer'> Forget Password ?</span>
          </div>
          <button className='mt-4 w-full h-14 rounded-xl outline-none text-base font-semibold bg-gradient-to-r from-indigo-500 via-sky-500  to-emerald-500 cursor-pointer'>Login into your Account</button>
        </form>
        {/* registration link */}
        <div className="flex justify-center gap-1 text-c3 mt-5">
          <span>Not a member yet ?</span>
          <Link href="/register" className='font-semibold text-c2 underline underline-offset-3 cursor-pointer'> Register Now </Link>
        </div>

      </div>



    </div>
  )
}

export default Login