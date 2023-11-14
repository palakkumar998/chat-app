import { ChatContextProvider } from '@/Context/ChatContext'
import { UserProvider } from '@/Context/authContext'
import '@/styles/globals.css'

export default function App({ Component, pageProps }) {
  return (
    // provide context API to your complete app structure using "<UserProvider> </UserProvider>"
    <UserProvider >
      <ChatContextProvider>

        <Component {...pageProps} />

      </ChatContextProvider>

    </UserProvider>

  )
}
