import { userChatContext } from '@/Context/ChatContext'
import { useAuth } from '@/Context/authContext'
import { db, storage } from '@/Firebase/firebase'

import {
	Timestamp,
	arrayUnion,
	doc,
	serverTimestamp,
	updateDoc,
} from 'firebase/firestore'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import React from 'react'
import { TbSend } from 'react-icons/tb'
import { v4 as uuid } from 'uuid'

const Composebar = () => {
	const {
		inputText,
		setInputText,
		data,
		attachment,
		setAttachment,
		attachmentPreview,
		setAttachmentPreview,
	} = userChatContext()
	const { currentUser } = useAuth()
	const handleTyping = (e) => {
		setInputText(e.target.value)
	}

	const onKeyUp = (e) => {
		if (e.key === 'Enter' && (inputText || attachment)) {
			handleSend()
		}
	}

	const handleSend = async () => {
		if (attachment) {
			const storageRef = ref(storage, uuid())
			const uploadTask = uploadBytesResumable(storageRef, attachment)

			uploadTask.on(
				'state_changed',
				(snapshot) => {
					const progress =
						(snapshot.bytesTransferred / snapshot.totalBytes) * 100
					console.log('Upload is ' + progress + '% done')
					switch (snapshot.state) {
						case 'paused':
							console.log('Upload is paused')
							break
						case 'running':
							console.log('Upload is running')
							break
					}
				},
				(error) => {
					console.error(error)
				},
				() => {
					getDownloadURL(uploadTask.snapshot.ref).then(
						async (downloadURL) => {
							await updateDoc(doc(db, 'chats', data.chatId), {
								messages: arrayUnion({
									id: uuid(),
									text: inputText,
									sender: currentUser.uid,
									date: Timestamp.now(),
									read: false,
									img: downloadURL,
								}),
							})
						}
					)
				}
			)
		} else {
			await updateDoc(doc(db, 'chats', data.chatId), {
				messages: arrayUnion({
					id: uuid(),
					text: inputText,
					sender: currentUser.uid,
					date: Timestamp.now(),
					read: false,
				}),
			})
		}

		let msg = { text: inputText }
		if (attachment) {
			msg.img = true
		}
		await updateDoc(doc(db, 'userChats', currentUser.uid), {
			[data.chatId + '.lastMessage']: msg,
			[data.chatId + '.date']: serverTimestamp(),
		})
		await updateDoc(doc(db, 'userChats', data.user.uid), {
			[data.chatId + '.lastMessage']: msg,
			[data.chatId + '.date']: serverTimestamp(),
		})

		setInputText('')
		setAttachment(null)
		setAttachmentPreview(null)
	}

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
				onClick={handleSend}
			>
				<TbSend className="text-white" size={20} />
			</button>
		</div>
	)
}

export default Composebar
