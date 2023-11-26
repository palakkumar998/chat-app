/* eslint-disable @next/next/no-img-element */
import { useAuth } from '@/Context/authContext'
import React from 'react'
import Avatar from './Avatar'
import { userChatContext } from '@/Context/ChatContext'
import ImageViewer from 'react-simple-image-viewer'
import { Timestamp } from 'firebase/firestore'
import { formatDate } from '@/utils/helper'

const Message = ({ message }) => {
	const { currentUser } = useAuth()
	const { users, data, imageViewer, setImageViewer } = userChatContext()
	const self = message.sender === currentUser.uid

	//?---->/ Date logic /<----------//
	const timestamp = new Timestamp(
		message.date?.seconds,
		message.date?.nanoseconds
	)
	const date = timestamp.toDate()
	// console.log(date)

	return (
		<div className={`mb-5 max-w-[75%] ${self ? 'self-end' : ''}`}>
			<div
				className={`flex items-end gap-3 mb-1 ${
					self ? 'justify-start flex-row-reverse' : ''
				}`}
			>
				<Avatar
					size="small"
					user={self ? currentUser : users[data.user.uid]}
					className="mb-4"
				/>
				<div
					className={`group flex flex-col gap-4 p-3 rounded-3xl relative break-all ${
						self ? 'rounded-br-sm bg-c5 ' : 'rounded-bl-sm bg-c1'
					} `}
				>
					{message.text && (
						<div className="text-sm">{message.text}</div>
					)}

					{message.img && (
						<>
							<img
								src={message.img}
								width={250}
								height={250}
								alt={message?.text || ''}
								className="rounded-2xl max-w-[250px]"
								onClick={() => {
									setImageViewer({
										msgId: message.id,
										url: message.img,
									})
								}}
							/>
							{imageViewer &&
								imageViewer.msgId === message.id && (
									<ImageViewer
										src={[imageViewer.url]}
										currentIndex={0}
										disableScroll={false}
										closeOnClickOutside={true}
										onClose={() => setImageViewer(null)}
									/>
								)}
						</>
					)}
				</div>
			</div>
			<div
				className={`flex items-end ${
					self ? 'justify-start flex-row-reverse mr-12' : 'ml-12'
				}`}
			>
				<div className="text-xs text-c3">{formatDate(date)}</div>
			</div>
		</div>
	)
}

export default Message
