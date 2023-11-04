import LeftNav from '@/Components/LeftNav'
import Loader from '@/Components/Loader'
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

  return isLoading || !currentUser ? <Loader /> : (

    <div className="bg-c1 flex w-full h-[100vh]">
      <div className="flex w-full shrink-0">
        <LeftNav />
        <div className="flex bg-c2 grow">
          <div>sidebar </div>
          <div>chat section </div>
        </div>
      </div>
    </div>

  )
}

export default Home