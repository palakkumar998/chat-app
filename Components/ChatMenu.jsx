import React from 'react'
import ClickAwayListener from 'react-click-away-listener'

const ChatMenu = ({ showMenu, setshowMenu }) => {
	const handleClickAway = () => {
		setshowMenu(false);
	}
	return (
		<ClickAwayListener onClickAway={handleClickAway}>
			<div className="w-[200px] absolute top-[70px] right-5 bg-c0 z-10 rounded-md overflow-hidden ">
				<ul className="flex flex-col py-2">
					<li className="flex py-3 px-5 items-center hover:bg-black cursor-pointer">
						Block User
					</li>
					<li className="flex py-3 px-5 items-center hover:bg-black cursor-pointer">
						Share Profile
					</li>
					<li className="flex py-3 px-5 items-center hover:bg-black cursor-pointer">
						Delete Chat
					</li>
				</ul>
			</div>
		</ClickAwayListener>
	)
}

export default ChatMenu
