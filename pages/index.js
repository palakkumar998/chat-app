import { useAuth } from '@/Context/authContext'
import { useRouter } from 'next/router'
import { React, useEffect } from 'react'



const Home = () => {
  const { signOut, currentUser, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !currentUser) {
      router.push("/login")
    }

  }, [currentUser, isLoading])

  return (
    <div className="flex justify-center items-center">
      <div className=" w-1/4 h-12 rounded-md cursor-pointer p-[1px]">
        <div className="flex items-center justify-center gap-3 text-white bg-blue-400 hover:bg-blue-600 w-full h-full rounded-md font-semibold" >
          <button onClick={signOut}>sign out</button>
        </div>
      </div>
    </div>

  )
}

export default Home