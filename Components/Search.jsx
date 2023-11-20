import { db } from '@/Firebase/firebase'
import { collection, getDocs, query, where } from 'firebase/firestore'
import React, { useState } from 'react'
import { RiSearch2Line } from 'react-icons/ri'

const Search = () => {
	const [username, setUserName] = useState('')
	const [user, setUser] = useState(null)
	const [err, setErr] = useState(false)

	const onkeyup = async (e) => {
		if (e.code === "Enter" && !!username) {
			try {
				setErr(false)
				const usersRef = collection(db, 'users')
				const q = query(usersRef, where('displayName', "==", username))

				const querySnapshot = await getDocs(q)
				if (querySnapshot.empty) {
					setErr(true)
					setUser(null)
				} else {
					querySnapshot.forEach((doc) => {
						setUser(doc.data())
					})
				}
			} catch (error) {
				console.error(error)
				setErr(error)
			}
		}
	}
	return (
		<div className="shrink-0 ">
			<div className="relative">
				<RiSearch2Line className=" absolute top-4 left-4 text-c3" />
				<input
					type="text"
					placeholder="Search User..."
					onChange={(e) => setUserName(e.target.value)}
					onKeyUp={onkeyup}
					value={username}
					autoFocus
					className="w-full h-12 bg-c1/[0.5] rounded-xl pl-11  pr-16 placeholder:text-c3 outline-none text-base"
				/>
				<span className="absolute top-[14px] right-4 text-sm text-c3">
					enter
				</span>
			</div>
		</div>
	)
}

export default Search
