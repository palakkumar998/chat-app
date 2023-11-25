import { userChatContext } from '@/Context/ChatContext'
import React from 'react'
import { TbSend } from 'react-icons/tb'

const Composebar = () => {
	const { inputText, setInputText } = userChatContext()
	const handleTyping = (e) => {
		setInputText(e.target.value)
	}
	const onKeyUp = () => {}

	return (
		<div className="flex items-center gap-2 grow">
			<input
				type="text"
				className="grow w-full outline-0 px-2 py-2 text-white bg-transparent placeholder:text-c3 outline-none text-base "
				value={inputText}
				placeholder="Type a message"
				onChange={handleTyping}
				onKeyUp={onKeyUp}
			/>
			<button
				className={`h-10 w-10 rounded-full shrink-0 flex justify-center items-center ${
					inputText.trim().length > 0 ? 'bg-green-500' : ''
				} `}
			>
				<TbSend className="text-white" size={20} />
			</button>
		</div>
	)
}

export default Composebar
