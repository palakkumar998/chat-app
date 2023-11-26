import { userChatContext } from '@/Context/ChatContext'
import { db } from '@/Firebase/firebase'
import { doc, onSnapshot } from 'firebase/firestore'
import React, { useEffect, useRef, useState } from 'react'
import Message from './Message'

const Messages = () => {
	const { data } = userChatContext()
	const [messages, setMessages] = useState([])
	const ref = useRef()
	useEffect(() => {
		const unsub = onSnapshot(doc(db, 'chats', data.chatId), (doc) => {
			if (doc.exists()) {
				setMessages(doc.data().messages)
			}
		})
		return () => unsub()
	}, [data.chatId])

	return (
		<div
			ref={ref}
			className="grow flex flex-col overflow-auto py-5 scrollbar"
		>
			{messages?.map((m) => {
				return <Message message={m} key={m.id} />
			})}
		</div>
	)
}

export default Messages
