/* eslint-disable @next/next/no-img-element */
import { useAuth } from '@/Context/authContext'
import React, { useState } from 'react'
import Avatar from './Avatar'
import { userChatContext } from '@/Context/ChatContext'
import ImageViewer from 'react-simple-image-viewer'
import { Timestamp, doc, getDoc, updateDoc } from 'firebase/firestore'
import { formatDate, wrapEmojisInHtmlTag } from '@/utils/helper'
import Icon from './Icon'
import { GoChevronDown } from 'react-icons/go'
import MessageMenu from './MessageMenu'
import DeleteMsgPopup from './popups/DeleteMsgPopup'
import { db } from '@/Firebase/firebase'
import { DELETED_FOR_EVERYONE, DELETED_FOR_ME } from '@/utils/constants'

const Message = ({ message }) => {
	const { currentUser } = useAuth()
	const { users, data, imageViewer, setImageViewer, editMsg, setEditMsg } =
		userChatContext()
	const self = message.sender === currentUser.uid
	const [showMenu, setshowMenu] = useState(false)
	const [showDeletePopup, setshowDeletePopup] = useState(false)

	//?---->/ DATE CONVERSION LOGIC /<----------//
	const timestamp = new Timestamp(
		message.date?.seconds,
		message.date?.nanoseconds
	)
	const date = timestamp.toDate()

	const deletePopupHandler = () => {
		setshowDeletePopup(true)
		setshowMenu(false)
	}
	const deleteMessage = async (action) => {
		try {
			const messageId = message.id
			const chatRef = doc(db, 'chats', data.chatId)

			const chatDoc = await getDoc(chatRef)

			const updatedMessages = chatDoc.data().messages.map((message) => {
				if (message.id === messageId) {
					if (action === DELETED_FOR_ME) {
						message.deletedInfo = {
							[currentUser.uid]: DELETED_FOR_ME,
						}
					}
					if (action === DELETED_FOR_EVERYONE) {
						message.deletedInfo = {
							deletedForEveryone: true,
						}
					}
				}
				return message
			})

			await updateDoc(chatRef, { messages: updatedMessages })
			setshowDeletePopup(false)
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<div className={`mb-5 max-w-[75%] ${self ? 'self-end' : ''}`}>
			{showDeletePopup && (
				<DeleteMsgPopup
					onHide={() => setshowDeletePopup(false)}
					className="DeleteMsgPopup"
					noHeader={true}
					shortHeight={true}
					self={self}
					deleteMessage={deleteMessage}
				/>
			)}
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
					className={`group flex  gap-4 p-4 rounded-xl relative break-all ${
						self ? 'rounded-br-sm bg-c5 ' : 'rounded-bl-sm bg-c1'
					} `}
				>
					{message.text && (
						<div
							className={`text-[13px] ${
								self ? 'pr-12' : 'pl-12'
							}`}
							dangerouslySetInnerHTML={{
								__html: wrapEmojisInHtmlTag(message.text),
							}}
						></div>
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

					<div
						className={`${
							showMenu ? '' : ''
						} rounded-full group-hover:flex absolute top-2 ${
							self ? '-left-9' : '-right-9 '
						} `}
					>
						<Icon
							size="small"
							className={`hover:bg-inherit ${
								self
									? 'hover:rotate-90'
									: 'hover:rotate-[270deg]'
							} rounded-full`}
							icon={
								<GoChevronDown size={15} className="text-c3" />
							}
							onClick={() => setshowMenu(true)}
						/>
						{showMenu && (
							<MessageMenu
								self={self}
								setshowMenu={setshowMenu}
								showMenu={showMenu}
								deletePopupHandler={deletePopupHandler}
								setEditMsg={() => setEditMsg(message)}
							/>
						)}
					</div>
					{/* <div
						className={`flex items-end ${
							self
								? 'justify-start flex-row-reverse -mr-1'
								: 'ml-1'
						}`}
					>
						<div className="text-[9px] text-c3">
							{formatDate(date)}
						</div>
					</div> */}
				</div>
			</div>

			<div
				className={`flex relative bottom-6 items-end ${
					self ? 'justify-start flex-row-reverse mr-12' : 'ml-12'
				}`}
			>
				<div className="text-[10px] text-c3">{formatDate(date)}</div>
			</div>
		</div>
	)
}

export default Message
