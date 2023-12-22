import { userChatContext, setIsTyping } from '@/Context/ChatContext'
import { db } from '@/Firebase/firebase'
import { doc, onSnapshot } from 'firebase/firestore'
import React, { useEffect, useRef, useState } from 'react'
import Message from './Message'
import { DELETED_FOR_ME } from '@/utils/constants'
import { useAuth } from '@/Context/authContext'

const Messages = () => {
	const { data, setIsTyping } = userChatContext()
	const [messages, setMessages] = useState([])
	const ref = useRef()
	const { currentUser } = useAuth()

	useEffect(() => {
		const unsub = onSnapshot(doc(db, 'chats', data.chatId), (doc) => {
			if (doc.exists()) {
				setMessages(doc.data().messages);
				setIsTyping(doc.data()?.typing?.[data.user.uid] || false);
			}
			setTimeout(() => {
				scrollToBottom()
			}, 0)
		})
		return () => unsub()
	}, [data.chatId])

	const scrollToBottom = () => {
		const chatContainer = ref.current
		chatContainer.scrollTop = chatContainer.scrollHeight
	}
	console.log(messages);

	return (
		<div
			ref={ref}
			className="grow flex flex-col overflow-auto py-5 scrollbar"
		>
			{messages
				?.filter((m) => {
					return (
						m?.deletedInfo?.[currentUser.uid] !== DELETED_FOR_ME &&
						!m?.deletedInfo?.deletedForEveryone &&
						!m?.deleteChatInfo?.[currentUser.uid]
					)
				})
				?.map((m) => {
					return <Message message={m} key={m.id} />
				})}
		</div>
	)
}

export default Messages
