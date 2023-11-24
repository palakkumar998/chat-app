import React, { useState } from 'react'
import Icon from './Icon'
import { CgAttachment } from 'react-icons/cg'
import { HiOutlineEmojiHappy } from 'react-icons/hi'
import Composebar from './Composebar'
import EmojiPicker from 'emoji-picker-react'
import ClickAwayListener from 'react-click-away-listener'

const ChatFooter = () => {
	const onEmojiClick = () => {}
	const [showImojiPicker, setshowImojiPicker] = useState(false)
	return (
		<div className="flex items-center p-2 rounded-xl bg-c1/[0.8] relative">
			<div className="shrink-0">
				<input
					type="file"
					id="fileUploader"
					placeholder="Upload Media"
					className="hidden"
					onChange={() => {}}
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
							className="text-blue-300"
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

			<Composebar />
		</div>
	)
}

export default ChatFooter
