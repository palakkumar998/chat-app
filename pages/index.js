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
    <div className='text-c1'>
      <button onClick={signOut} >  sign out</button>

    </div>

  )
}

export default Home