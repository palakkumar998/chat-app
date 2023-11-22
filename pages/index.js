import Chat from '@/Components/Chat'
import Chats from '@/Components/Chats'
import LeftNav from '@/Components/LeftNav'
import Loader from '@/Components/Loader'
import { userChatContext } from '@/Context/ChatContext'
import { useAuth } from '@/Context/authContext'
import { useRouter } from 'next/router'
import { React, useEffect } from 'react'




const Home = () => {
  const { signOut, currentUser, isLoading } = useAuth();
  const router = useRouter();
  const { data } = userChatContext();

  useEffect(() => {
    if (!isLoading && !currentUser) {
      router.push("/login")
    }

  }, [currentUser, isLoading, router])

  return isLoading || !currentUser ? <Loader /> : (

    <div className="bg-c1 flex w-full h-[100vh]">
      <div className="flex w-full shrink-0">
        <LeftNav />
        <div className="flex bg-c2 grow">
          <div className='w-[400px] shrink-0 border-r border-white/[0.05] p-5 overflow-auto scrollbar' >
            <div className='flex flex-col h-full'> <Chats /> </div>
          </div>
          {data.user && <Chat />}
        </div>
      </div>
    </div>

  )
}

export default Home