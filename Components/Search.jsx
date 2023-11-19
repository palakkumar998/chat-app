import React, { useState } from 'react'
import { RiSearch2Line } from 'react-icons/ri'

const Search = () => {
	const [username, setusername] = useState('')

	const onkeyup = () => {}
	return (
		<div className="shrink-0 ">
			<div className="relative">
				<RiSearch2Line className=" absolute top-4 left-4 text-c3" />
				<input
					type="text"
					placeholder="Search User..."
					onChange={(e) => setusername(e.target.value)}
					onKeyUp={() => {}}
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
