import { userChatContext } from '@/Context/ChatContext'
import { useAuth } from '@/Context/authContext'
import { db } from '@/Firebase/firebase'
import {
	arrayRemove,
	arrayUnion,
	doc,
	getDoc,
	updateDoc,
} from 'firebase/firestore'
import React from 'react'
import ClickAwayListener from 'react-click-away-listener'

const ChatMenu = ({ showMenu, setshowMenu }) => {
	const { currentUser } = useAuth()
	const { data, users, chats, dispatch, setSelectedChat } = userChatContext()

	const handleClickAway = () => {
		setshowMenu(false)
	}

	const isUserBlocked = users[currentUser.uid]?.blockedUsers?.find(
		(u) => u === data.user.uid
	)
	const iAmBlocked = users[data.user.uid]?.blockedUsers?.find(
		(u) => u === currentUser.uid
	)

	const handleBlock = async (action) => {
		// ?------->/ TO BLOCK USER /<----------------/
		if (action === 'block') {
			await updateDoc(doc(db, 'users', currentUser.uid), {
				blockedUsers: arrayUnion(data.user.uid),
			})
		}

		//?-------->/ TO UNBLOCK USER /<--------------/
		if (action === 'unblock') {
			await updateDoc(doc(db, 'users', currentUser.uid), {
				blockedUsers: arrayRemove(data.user.uid),
			})
		}
	}
	const handleDelete = async () => {
		try {
			const chatRef = doc(db, 'chats', data.chatId)

			// Retrieve the chat document from Firestore
			const chatDoc = await getDoc(chatRef)

			// Create a new "messages" array that excludes the message with the matching ID
			const updatedMessages = chatDoc.data().messages.map((message) => {
				message.deleteChatInfo = {
					...message.deleteChatInfo,
					[currentUser.uid]: true,
				}
				return message
			})

			// Update the chat document in Firestore with the new "messages" array
			await updateDoc(chatRef, { messages: updatedMessages })

			await updateDoc(doc(db, 'userChats', currentUser.uid), {
				[data.chatId + '.chatDeleted']: true,
			})

			const chatId = Object.keys(chats || {}).filter(
				(id) => id !== data.chatId
			)

			const filteredChats = Object.entries(chats || {})
				.filter(([id, chat]) => id !== data.chatId)
				.sort((a, b) => b[1].date - a[1].date)

			if (filteredChats.length > 0) {
				setSelectedChat(filteredChats?.[0]?.[1]?.userInfo)
				dispatch({
					type: 'CHANGE_USER',
					payload: filteredChats?.[0]?.[1]?.userInfo,
				})
			} else {
				dispatch({ type: 'EMPTY' })
			}
		} catch (error) {
			console.error(error)
		}
	}
	return (
		<ClickAwayListener onClickAway={handleClickAway}>
			<div className="w-[200px] absolute top-[70px] right-5 bg-c0 z-10 rounded-md overflow-hidden ">
				<ul className="flex flex-col py-2">
					{!iAmBlocked && (
						<li
							className="flex py-3 px-5 items-center hover:bg-black cursor-pointer"
							onClick={(e) => {
								e.stopPropagation()
								handleBlock(isUserBlocked ? 'unblock' : 'block')
							}}
						>
							{isUserBlocked ? 'Unblock' : 'Block'}
						</li>
					)}
					<li className="flex py-3 px-5 items-center hover:bg-black cursor-pointer">
						Share Profile
					</li>
					<li
						className="flex py-3 px-5 items-center hover:bg-black cursor-pointer"
						onClick={(e) => {
							e.stopPropagation()
							setshowMenu(false)
							handleDelete()
						}}
					>
						Delete Chat
					</li>
				</ul>
			</div>
		</ClickAwayListener>
	)
}

export default ChatMenu
