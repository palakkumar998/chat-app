import React, { useState } from 'react'
import Icon from './Icon'
import { CgAttachment } from 'react-icons/cg'
import { HiOutlineEmojiHappy } from 'react-icons/hi'
import Composebar from './Composebar'
import EmojiPicker from 'emoji-picker-react'
import ClickAwayListener from 'react-click-away-listener'
import { userChatContext } from '@/Context/ChatContext'
import { IoClose } from 'react-icons/io5'
import { MdDeleteForever } from 'react-icons/md'

const ChatFooter = () => {
	const [showImojiPicker, setshowImojiPicker] = useState(false)
	const {
		inputText,
		setInputText,

		attachment,
		setAttachment,

		attachmentPreview,
		setAttachmentPreview,

		editMsg,
		setEditMsg,

		isTyping,
		setIsTyping,

		imageViewer,
		setImageViewer,
	} = userChatContext()

	const onEmojiClick = (emojiData) => {
		let text = inputText
		setInputText((text += emojiData.emoji))
	}

	const onFileChange = (e) => {
		const file = e.target.files[0]
		setAttachment(file)

		if (file) {
			const blobUrl = URL.createObjectURL(file)
			setAttachmentPreview(blobUrl)
		}
	}

	return (
		<div className="flex items-center p-2 rounded-xl bg-c1/[0.5] relative">
			{attachmentPreview && (
				<div className="absolute w-[200px] h-[200px] bottom-16 bg-c1 left-0 p-2 rounded-xl shadow-xl">
					<img src={attachmentPreview} />
					<div
						className="w-6 h-6 rounded-full bg-gray-600 flex items-center justify-center absolute -right-2 -top-2 hover:cursor-pointer"
						onClick={() => {
							setAttachment(null)
							setAttachmentPreview(null)
						}}
					>
						<MdDeleteForever size={14} />
					</div>
				</div>
			)}

			<div className="shrink-0">
				<input
					type="file"
					id="fileUploader"
					placeholder="Upload Media"
					className="hidden"
					onChange={onFileChange}
				/>
				<label htmlFor="fileUploader">
					<Icon
						size="large"
						icon={<CgAttachment />}
						className="text-c3"
					/>
				</label>
			</div>
			<div className="shrink-0 relative">
				<Icon
					size="large"
					icon={
						<HiOutlineEmojiHappy
							size={24}
							className="text-c3"
							onClick={() => setshowImojiPicker(true)}
						/>
					}
				/>
				{showImojiPicker && (
					<ClickAwayListener
						onClickAway={() => setshowImojiPicker(false)}
					>
						<div className="absolute bottom-14 left-2 shadow-2xl">
							<EmojiPicker
								theme="light"
								emojiStyle="native"
								onEmojiClick={onEmojiClick}
								autoFocusSearch={false}
							/>
						</div>
					</ClickAwayListener>
				)}
			</div>

			{isTyping && (
				<div className="absolute -top-6 left-4 bg-c2 items-center w-full h-6">
					<div className="flex w-full h-full opacity-50 gap-2 text-xs text-white">
						{`User is Typing`}
						<img src="/Typing.svg" />
					</div>
				</div>
			)}

			{editMsg && (
				<div
					className="absolute -top-12 left-1/2 -translate-x-1/2 bg-blue-500 flex items-center gap-2 py-2 px-4 rounded-full text-xs font-medium cursor-pointer shadow-lg"
					onClick={() => setEditMsg(null)}
				>
					<span>Cancel Edit</span>
					<IoClose size={15} className="text-white" />
				</div>
			)}

			<Composebar />
		</div>
	)
}

export default ChatFooter
