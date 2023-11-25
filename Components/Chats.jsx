import { userChatContext } from '@/Context/ChatContext'
import { db } from '@/Firebase/firebase'
import { Timestamp, collection, doc, onSnapshot } from 'firebase/firestore'
import React, { useEffect, useRef, useState } from 'react'
import { RiSearch2Line } from 'react-icons/ri'
import Avatar from './Avatar'
import { useAuth } from '@/Context/authContext'
import { formatDate } from '@/utils/helper'

const Chats = () => {
	const {
		users,
		setUsers,
		chats,
		setChats,
		selectedChat,
		setSelectedChat,
		dispatch,
	} = userChatContext()
	const [search, setSearch] = useState('')
	const { currentUser } = useAuth()

	const isBlockExecutedRef = useRef(false)
	const isUserFetchedRef = useRef(false)

	//?-------->/ FETCHING USER'S DATA /<----------//
	useEffect(() => {
		onSnapshot(collection(db, 'users'), (snapshot) => {
			const updatedUsers = {}
			snapshot.forEach((doc) => {
				updatedUsers[doc.id] = doc.data()
				console.log(doc.data())
			})
			setUsers(updatedUsers)
			if (!isBlockExecutedRef.current) {
				isUserFetchedRef.current = true
			}
		})
	}, [])

	//?-------->/ FETCHING USER'S CHATS /<------------//
	useEffect(() => {
		const getChats = () => {
			const unsub = onSnapshot(
				doc(db, 'userChats', currentUser.uid),
				(doc) => {
					if (doc.exists()) {
						const data = doc.data()
						setChats(data)

						//?----->/ THIS LOGIC WILL EXECUTE ONLY ONCE /<----------//
						if (
							!isBlockExecutedRef.current &&
							isUserFetchedRef.current &&
							users
						) {
							const firstChat = Object.values(data).sort(
								(a, b) => b.data - a.date
							)[0]

							if (firstChat) {
								const user = users[firstChat?.userInfo?.uid]
								handleSelect(user)
							}
							isBlockExecutedRef.current = true
						}
					}
				}
			)
		}

		currentUser.uid && getChats()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isBlockExecutedRef.current, users])

	//?----->/ LOGIC- METHOD TO ARRAY, SEARCHING USER/EMAIL/CHATS IN SEARCH-BAR & SORTING CHATS WITH CURRENT TIMESTAMP /<-------//
	const filteredChats = Object.entries(chats || {})
		.filter(
			([, chat]) =>
				chat?.userInfo?.displayName
					.toLowerCase()
					.includes(search.toLowerCase()) ||
				chat?.lastMessage?.text
					.toLowerCase()
					.includes(search.toLowerCase())
		)
		.sort((a, b) => b[1].date - a[1].date)

	console.log(filteredChats)

	const handleSelect = (user, selectedChatId) => {
		setSelectedChat(user)
		dispatch({ type: 'CHANGE_USER', payload: user })
	}
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
				{Object.keys(users || {}).length > 0 &&
					filteredChats?.map((chat) => {
						const user = users[chat[1].userInfo.uid]
						const timestamp = new Timestamp(
							chat[1].date?.seconds,
							chat[1].date?.nanoseconds
						)
						const date = timestamp.toDate()
						// console.log(date)

						return (
							<>
								<li
									key={chat[0]}
									onClick={() => handleSelect(user, chat[0])}
									className={`h-[90px] flex items-center gap-4 rounded-2xl hover:bg-c1 p-4 cursor-pointer ${
										selectedChat?.uid === user?.uid
											? 'bg-c1'
											: ''
									}`}
								>
									<Avatar size="x-large" user={user} />
									<div className="flex flex-col gap-2 grow relative">
										<span className="text-base text-white flex items-center justify-between">
											<div className="font-medium">
												{user?.displayName}
											</div>
											<div className="text-c3 text-xs">
												{formatDate(date)}
											</div>
										</span>
										<p className="text-c3 text-xs line-clamp-1 break-all">
											{chat[1]?.lastMessage?.text ||
												(chat[1]?.lastMessage?.img &&
													'image') ||
												'Say hello... to   ' +
													user.displayName}
										</p>
										<span className="absolute right-0 top-7 min-w-[20px] h-5 rounded-full bg-blue-500  flex justify-center items-center text-sm">
											8
										</span>
									</div>
								</li>
							</>
						)
					})}
			</ul>
		</div>
	)
}

export default Chats
