import { userChatContext } from '@/Context/ChatContext'
import { db } from '@/Firebase/firebase'
import { collection, doc, onSnapshot } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { RiSearch2Line } from 'react-icons/ri'

const Chats = () => {
	const { users, setUsers } = userChatContext()
	const [search, setSearch] = useState('')

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
		<div className="flex flex-col h-full">
			<div className="shrink-0 sticky -top-[20px] z-10 justify-center flex w-full bg-2 py-5">
				<RiSearch2Line 
				className='absolute top-9 left-12 text-c3'
				/>
				<input
					type="text"
					value={search}
					placeholder="Search Username..."
					onChange={(e) => setSearch(e.target.value)}
					className="w-[300px] h-12 justify-center rounded-xl bg-c1/[0.5] pl-11 pr-5 placeholder:text-c3 outline-none text-base"
				/>
			</div>
		</div>
	)
}

export default Chats
