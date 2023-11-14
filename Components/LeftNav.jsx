//?IMPORTING FROM REACT
import React, { useState } from 'react'
import { BiCheck, BiEdit } from 'react-icons/bi'
import { BsFillCheckCircleFill } from 'react-icons/bs'
import { FiPlus } from 'react-icons/fi'
import { MdPhotoCamera, MdAddAPhoto, MdDeleteForever } from 'react-icons/md'
import { IoClose, IoLogOutOutline } from 'react-icons/io5'
import { toast } from 'react-toastify'
//?IMPORTING FROM COMPONENTS
import Avatar from './Avatar'
import Icon from './Icon'
import ToastMessage from './ToastMessage'
import UserPopup from './popups/UserPopup'
//?IMPORTING FROM CONTEXT
import { useAuth } from '@/Context/authContext'
import { profileColors } from '@/utils/constants'
//?IMPORTING FROM FIREBASE/FIRESTORE/STORAGE/AUTH
import { doc, updateDoc } from 'firebase/firestore'
import { db, auth, storage } from '@/Firebase/firebase'
import { updateProfile } from 'firebase/auth'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'

const LeftNav = () => {
	const [editProfile, seteditProfile] = useState(false)
	const { currentUser, signOut, setCurrentUser } = useAuth()
	const [nameEdited, setNameEdited] = useState(false)
	const authUser = auth.currentUser
	const [userPopups, setuserPopups] = useState(false)

	//?------------------>/ IMAGE UPLAODING TO FIRESTORE & PROGRESSING LOGIC /<----------------------//
	const updloadImageToFirstore = (file) => {
		try {
			if (file) {
				const storageRef = ref(storage, currentUser.displayName)
				const uploadTask = uploadBytesResumable(storageRef, file)

				uploadTask.on(
					'state_changed',
					(snapshot) => {
						const progress =
							(snapshot.bytesTransferred / snapshot.totalBytes) *
							100
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
								console.log('File available at', downloadURL)
								handleUpdateProfile('photo', downloadURL)

								await updateProfile(authUser, {
									photoURL: downloadURL,
								})
							}
						)
					}
				)
			}
		} catch (error) {
			console.error(error)
		}
	}
	//*============>/ IMAGE UPLAODING TO FIRESTORE & PROGRESSING LOGIC ENDS HERE /<===============//

	//?------------------->/ PROFILE HANDLING LOGIC / <-------------------//
	const handleUpdateProfile = (type, value) => {
		//?UPADATE TYPE------> (photo, color, name, photo-remove)
		let obj = { ...currentUser }
		switch (type) {
			case 'color':
				obj.color = value
				break

			case 'photo':
				obj.photoURL = value
				break
			case 'name':
				obj.displayName = value
				break
			case 'photo-remove':
				obj.photoURL = null
				break

			default:
				break
		}
		try {
			toast.promise(
				async () => {
					const userDocRef = doc(db, 'users', currentUser.uid)
					await updateDoc(userDocRef, obj)
					setCurrentUser(obj)

					if (type === 'photo-remove') {
						await updateProfile(authUser, {
							photoURL: null,
						})
					}
					if (type === 'name') {
						await updateProfile(authUser, {
							displayName: value,
						})
					}
					if (type === 'color') {
						await updateProfile(authUser, {
							color: value,
						})
					}
					setNameEdited(false)
				},
				{
					pending: 'Profile Updating..',
					success: 'Profile Upadted successfully',
					error: 'Profile Update Failed',
				},
				{
					autoClose: 3000,
				}
			)
			console.log('Email send to your registered email id.')
		} catch (error) {
			console.error('An error occured', error)
		}
	}
	//*============>/ PROFILE HANDLING LOGIC ENDS HERE/<=============//

	//?-----------> / DISPLAY NAME & PREVENT UNUSAUL EDITING IN USER NAME /<-----------//
	const onkeyup = (event) => {
		if (event.target.innertext !== currentUser.displayName) {
			// name edited
			setNameEdited(true)
		} else {
			// not edited
			setNameEdited(false)
		}
	}
	const onkeydown = (event) => {
		if (event.key === 'Enter' && event.keyCode === 13) {
			event.preventDefault()
		}
	}
	//*=======>/ DISPLAY NAME & PREVENT UNUSAUL EDITING IN USER NAME ENDS HERE/<==========//

	//?------------------------------->/ PROFILE CONTAINER / <-------------------------------//
	const editProfileContainer = () => {
		return (
			<div className="relative flex flex-col items-center">
				<ToastMessage />
				<Icon
					size="small"
					className="absolute top-0 right-5 hover: bg-c2"
					icon={<IoClose size={20} />}
					onClick={() => seteditProfile(false)}
				/>
				<div className="relative group cursor-pointer">
					<Avatar
						size="xx-large"
						user={currentUser}
						onClick={() => seteditProfile(true)}
					/>
					<div className="w-full h-full rounded-full top-0 left-0 justify-center items-center bg-black/0.5 absolute hidden group-hover:flex">
						<label htmlFor="fileUpload">
							{currentUser.photoURL ? (
								<MdPhotoCamera size={34} />
							) : (
								<MdAddAPhoto size={34} />
							)}
						</label>

						<input
							id="fileUpload"
							type="file"
							onChange={(e) =>
								updloadImageToFirstore(e.target.files[0])
							}
							style={{ display: 'none' }}
						/>
					</div>

					{currentUser.photoURL && (
						<div
							className="w-6 h-6 rounded-full bg-red-500 flex justify-center items-center absolute right-0 bottom-0"
							onClick={() => handleUpdateProfile('photo-remove')}
						>
							<MdDeleteForever size={14} />
						</div>
					)}
				</div>
				<div className="mt-5 flex flex-col items-center">
					<div className="flex items-center gap-2">
						{nameEdited && (
							<BsFillCheckCircleFill
								className="cursor-pointer text-c4"
								onClick={() =>
									handleUpdateProfile(
										'name',
										document.getElementById(
											'displayNameEdit'
										).innerText
									)
								}
							/>
						)}
						<div
							contentEditable
							className="bg-transparent outline-none border-none text-center"
							id="displayNameEdit"
							onKeyUp={onkeyup}
							onKeyDown={onkeydown}
						>
							{currentUser.displayName}
						</div>
					</div>
					<span className="text-c3 text-sm">{currentUser.email}</span>
				</div>
				{/* profile color selector */}
				<div className="grid grid-cols-5 gap-4 mt-5">
					{profileColors.map((color, index) => (
						<span
							className="w-10 h-10 flex rounded-full items-center justify-center cursor-pointer transition-transform hover:scale-125  "
							key={index}
							style={{ backgroundColor: color }}
							onClick={() => {
								handleUpdateProfile('color', color)
							}}
						>
							{color === currentUser.color && (
								<BiCheck size={24} />
							)}
						</span>
					))}
				</div>
			</div>
		)
	}

	//*============>/ PROFILE CONTAINER ENDS HERE/<==============//

	//?------------->/ RETURNING COMPONENT /<-------------------//

	return (
		<div
			className={` ${
				editProfile ? 'w-[350px]' : 'w-[80px] items-center '
			} flex flex-col justify-between py-5 shrink-0 transition-all`}
		>
			{editProfile ? (
				editProfileContainer()
			) : (
				<div
					className="relative group cursor-pointer"
					onClick={() => seteditProfile(true)}
				>
					<Avatar size="large" user={currentUser} />

					<div className="w-full h-full rounded-full bg-black/[0.5] absolute top-0 left-0 justify-center items-center hidden group-hover:flex">
						<BiEdit size={14} />
					</div>
				</div>
			)}

			<div
				className={`flex gap-5 rounded-full ${
					editProfile ? 'ml-5' : 'flex-col items-center '
				}`}
			>
				<Icon
					size="x-large"
					className="bg-green-500 hover:bg-gray-600"
					icon={<FiPlus size={24} />}
					onClick={() => {
						setuserPopups(!userPopups)
					}}
				/>

				{/* // icon for log out user  */}
				<Icon
					size="x-large"
					className="hover:bg-c2"
					icon={<IoLogOutOutline size={24} />}
					onClick={signOut}
				/>
			</div>
			{userPopups && (
				<UserPopup
					onHide={() => setuserPopups(false)}
					title="Find Users"
				/>
			)}
		</div>
	)
}

export default LeftNav
