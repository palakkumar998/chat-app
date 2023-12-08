import { userChatContext } from '@/Context/ChatContext'
import { useAuth } from '@/Context/authContext'
import { db } from '@/Firebase/firebase'
import { arrayRemove, arrayUnion, doc, updateDoc } from 'firebase/firestore'
import React from 'react'
import ClickAwayListener from 'react-click-away-listener'

const ChatMenu = ({ showMenu, setshowMenu }) => {
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
					<li className="flex py-3 px-5 items-center hover:bg-black cursor-pointer">
						Delete Chat
					</li>
				</ul>
			</div>
		</ClickAwayListener>
	)
}

export default ChatMenu
