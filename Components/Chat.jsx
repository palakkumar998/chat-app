import React from 'react'
import ChatHeader from './ChatHeader'
import Messages from './Messages'
import { userChatContext } from '@/Context/ChatContext'
import ChatFooter from './ChatFooter'
import { useAuth } from '@/Context/authContext'

const Chat = () => {
	const { currentUser } = useAuth()
	const { data, users } = userChatContext()

	const handleClickAway = () => {
		setshowMenu(false)
	}
	
	const isUserBlocked = users[currentUser.uid]?.blockedUsers?.find(
		(u) => u === data.user.uid
	)
	const iAmBlocked = users[data.user.uid]?.blockedUsers?.find(
		(u) => u === currentUser.uid
	)


	return (
		<div className="flex flex-col grow p-5 ">
			<ChatHeader />
			{data.chatId && <Messages />}
			{!isUserBlocked && !iAmBlocked && <ChatFooter />}
			{/*//?------->/  CONDITION FOR SHOWING MSG WHEN YOU BLOCK THE USER /<--------------  */}
			{isUserBlocked && (
				<div className="w-full text-center text-c3 py-5">
					This user has been blocked
				</div>
			)}
			{/*//?------->/  CONDITION FOR SHOWING MSG WHEN SOMEONE BLOCK THE YOU /<--------------  */}
			{iAmBlocked && (
				<div className="w-full text-center text-c3 py-5">
					{`${data.user.displayName} has Blocked you`}
				</div>
			)}
		</div>
	)
}

export default Chat
