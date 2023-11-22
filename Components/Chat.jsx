import React from 'react'
import ChatHeader from './ChatHeader'
import Messages from './Messages'
import { userChatContext } from '@/Context/ChatContext'

const Chat = () => {
	const { data } = userChatContext()
	return (
		<div className="flex flex-col grow p-5 ">
			<ChatHeader />

			{data.chatId && <Messages />}
		</div>
	)
}

export default Chat
