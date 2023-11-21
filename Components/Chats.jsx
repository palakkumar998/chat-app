import { userChatContext } from '@/Context/ChatContext'
import { db } from '@/Firebase/firebase'
import { collection, doc, onSnapshot } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { RiSearch2Line } from 'react-icons/ri'
import Avatar from './Avatar'
import { useAuth } from '@/Context/authContext'

const Chats = () => {
	const { users, setUsers, chats, setChats, selectedChat, setSelectedChat } =
		userChatContext()
	const [search, setSearch] = useState('')
	const { currentUser } = useAuth()

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

	useEffect(() => {
		const getChats = () => {
			const unsub = onSnapshot(
				doc(db, 'userChats', currentUser.uid),
				(doc) => {
					if (doc.exists()) {
						const data = doc.data()
						setChats(data)
					}
				}
			)
		}

		currentUser.uid && getChats();
	}, [])

	return (
		<div className="flex flex-col h-full">
			<div className="shrink-0 sticky -top-[20px] z-10 justify-center flex w-full bg-c2 py-5">
				<RiSearch2Line className="absolute top-9 left-12 text-c3" />
				<input
					type="text"
					value={search}
					placeholder="Search Username..."
					onChange={(e) => setSearch(e.target.value)}
					className="w-[300px] h-12 justify-center rounded-xl bg-c1/[0.5] pl-11 pr-5 placeholder:text-c3 outline-none text-base"
				/>
			</div>
			<ul className="flex flex-col w-full my-5 gap-[5px]">
				<li
					className={`h-[90px] flex items-center gap-4 rounded-2xl hover:bg-c1 p-4 cursor-pointer bg-c1`}
				>
					<Avatar size="x-large" user={currentUser} />
					<div className="flex flex-col gap-2 grow relative">
						<span className="text-base text-white flex items-center justify-between">
							<div className="font-medium">User name</div>
							<div className="text-c3 text-xs">dd-mm-yyyy</div>
						</span>
						<p className="text-c3 text-xs line-clamp-1 break-all">
							Lorem ipsum tur
						</p>
						<span className="absolute right-0 top-7 min-w-[20px] h-5 rounded-full bg-blue-500  flex justify-center items-center text-sm">
							5
						</span>
					</div>
				</li>
			</ul>
		</div>
	)
}

export default Chats
