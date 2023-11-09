import React, { useState } from 'react'
import { BiCheck, BiEdit } from 'react-icons/bi'
import { BsFillCheckCircleFill } from 'react-icons/bs'
import Avatar from './Avatar'
import { useAuth } from '@/Context/authContext'
import Icon from './Icon'
import { FiPlus } from 'react-icons/fi'
import { IoClose, IoLogOutOutline } from 'react-icons/io5'
import { MdPhotoCamera, MdAddAPhoto, MdDeleteForever } from 'react-icons/md'
import { profileColors } from '@/utils/constants'

const LeftNav = () => {
	const [editProfile, seteditProfile] = useState(true)
	const { currentUser, signOut } = useAuth()
	const [nameEdited, setNameEdited] = useState(false)

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

	const editProfileContainer = () => {
		return (
			<div className="relative flex flex-col items-center">
				<Icon
					size="small"
					className="absolute top-0 right-5 hover: bg-c2"
					icon={<IoClose size={20} />}
					onClick={() => seteditProfile(false)}
				/>
				<div className="relative group cursor-pointer">
					<Avatar size="xx-large" user={currentUser} />
					<div className="w-full h-full rounded-full top-0 left-0 justify-center items-center bg-black/0.5 absolute hidden group-hover:flex">
						<label htmlFor="fileUpload">
							{
								// Check if the currentUser object has a photoURL property
								currentUser.photoURL ? (
									// If photoURL exists, render the MdPhotoCamera icon
									<MdPhotoCamera size={34} />
								) : (
									// If photoURL does not exist, render the MdAddAPhoto icon
									<MdAddAPhoto size={34} />
								)
							}
						</label>

						<input
							type="file"
							id="fileUpload"
							onChange={(e) => {}}
							style={{ display: 'none' }}
						/>
					</div>

					{
						// Check if the currentUser object has a photoURL property
						currentUser.photoURL && (
							// If photoURL exists, render the following div element
							<div className="w-6 h-6 rounded-full bg-red-500 flex justify-center items-center absolute right-0 bottom-0 ">
								<MdDeleteForever size={14} />
							</div>
						)
					}
				</div>
				<div className="mt-5 flex flex-col items-center">
					<div className="flex items-center gap-2">
						{!nameEdited && <BiEdit className="text-c3" />}
						{nameEdited && (
							<BsFillCheckCircleFill
								className="text-c4 cursor-pointer"
								onClick={() => {
									// name edit logic
								}}
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
							className="w-10 h-10 flex rounded-full items-center justify-center cursor-pointer transition-transform hover:scale-125"
							key={index}
							style={{ backgroundColor: color }}
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
					onClick={() => {}}
				/>

				{/* // icon for log out user  */}
				<Icon
					size="x-large"
					className="hover:bg-c2"
					icon={<IoLogOutOutline size={24} />}
					onClick={signOut}
				/>
			</div>
		</div>
	)
}

export default LeftNav
