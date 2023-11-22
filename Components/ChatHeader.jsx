import { userChatContext } from '@/Context/ChatContext'
import React, { useState } from 'react'
import Avatar from './Avatar'
import Icon from './Icon'
import { IoEllipsisVerticalSharp } from 'react-icons/io5'

const ChatHeader = () => {
	const [showMenu, setshowMenu] = useState(false)
	const { users, data } = userChatContext()

	const online = users[data.user.uid]?.isOnline
	const user = users[data.user.uid]
	return (
		<div className="flex justify-between items-center pb-5 border-b border-white/[0.05]">
			{user && (
				<div className="flex items-center gap-4">
					<Avatar size="large" user={user} />
					<div>
						<div className="font-medium">{user.displayName}</div>
						<p className="text-c3 text-xs">
							{(online && 'Online') || 'Offline'}
						</p>
					</div>
				</div>
			)}

			<div className="flex items-center gap-2">
				<Icon
					size="large"
					className={`${showMenu ? 'bg-c1' : ''}`}
					onClick={() => setshowMenu(true)}
					icon={
						<IoEllipsisVerticalSharp
							size={20}
							className="text-c3"
						/>
					}
				/>
			</div>
		</div>
	)
}

export default ChatHeader
