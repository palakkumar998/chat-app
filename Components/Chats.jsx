import { userChatContext } from '@/Context/ChatContext'
import { db } from '@/Firebase/firebase'
import { collection, doc, onSnapshot } from 'firebase/firestore'
import React, { useEffect } from 'react'

const Chats = () => {
	const { users, setUsers } = userChatContext()

	useEffect(() => {
		onSnapshot(collection(db, 'users'), (snapshot) => {
			const updatedUsers = {}
			snapshot.forEach((doc) => {
				updatedUsers[doc.id] = doc.data()
				console.log(doc.data())
			})
			setUsers(updatedUsers)
		})
	}, [])

	return (
		<div>
			chat
		</div>
	)
}

export default Chats
