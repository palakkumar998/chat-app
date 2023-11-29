import React, { useEffect, useRef } from 'react'
import ClickAwayListener from 'react-click-away-listener'
import { FaRegCopy } from 'react-icons/fa'
import { BsReply } from 'react-icons/bs'
import { MdOutlineModeEdit } from 'react-icons/md'
import { RiShareForwardLine } from 'react-icons/ri'
import { IoInformationCircleOutline } from 'react-icons/io5'
import { MdDeleteOutline } from 'react-icons/md'

const MessageMenu = ({ showMenu, setshowMenu, self, deletePopupHandler }) => {
	const handleClickAway = () => {
		setshowMenu(false)
	}

	const ref = useRef()

	useEffect(() => {
		ref?.current?.scrollIntoViewIfNeeded()
	}, [showMenu])

	return (
		<ClickAwayListener onClickAway={handleClickAway}>
			<div
				ref={ref}
				className={`w-[150px] absolute bg-c0 z-10 rounded-xl overflow-hidden top-8 glass shadow-xl ${
					self ? 'right-0' : 'left-0'
				} `}
			>
				<ul className="flex flex-col py-2 text-sm">
					{self && (
						<li className="flex py-3 px-5 items-center hover:bg-black cursor-pointer">
							Edit
							<div className="absolute items-center right-3">
								<MdOutlineModeEdit />
							</div>
						</li>
					)}
					<li className="flex py-3 px-5 items-center hover:bg-black cursor-pointer">
						Reply
						<div className="absolute items-center right-3">
							<BsReply />
						</div>
					</li>
					<li className="flex py-3 px-5 items-center hover:bg-black cursor-pointer">
						Forward
						<div className="absolute items-center right-3">
							<RiShareForwardLine />
						</div>
					</li>
					<li className="flex py-3 px-5 items-center hover:bg-black cursor-pointer">
						Copy
						<div className="absolute items-center right-3">
							<FaRegCopy />
						</div>
					</li>
					{self && (
						<li className="flex py-3 px-5 items-center hover:bg-black cursor-pointer">
							Info
							<div className="absolute items-center right-3">
								<IoInformationCircleOutline />
							</div>
						</li>
					)}
					<li
						className="flex py-3 px-5 items-center hover:bg-black cursor-pointer"
						onClick={(e) => {
							e.stopPropagation()
							deletePopupHandler(true)
						}}
					>
						Delete
						<div className="absolute items-center right-3">
							<MdDeleteOutline />
						</div>
					</li>
				</ul>
			</div>
		</ClickAwayListener>
	)
}

export default MessageMenu
