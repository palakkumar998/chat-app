import React from 'react'
import PopupWrapper from './PopupWrapper'

import { RiErrorWarningLine } from 'react-icons/ri'
import { DELETED_FOR_EVERYONE, DELETED_FOR_ME } from '@/utils/constants'

const DeleteMsgPopup = (props) => {
	return (
		<PopupWrapper {...props}>
			<div className="mt-10 mb-5">
				<div className="flex items-center justify-center gap-3">
					<RiErrorWarningLine size={24} className="text-blue-500" />
					<div className="text-lg"> Delete message ? </div>
				</div>

				<div className="flex items-center justify-center gap-2 mt-10">
					<button
						onClick={() => props.deleteMessage(DELETED_FOR_ME)}
						className=" bg-blue-500 py-2 px-4 text-sm rounded-md text-white hover:bg-blue-700 hover:text-white"
					>
						Delete for Me
					</button>

					{props.self && (
						<button
							onClick={() =>
								props.deleteMessage(DELETED_FOR_EVERYONE)
							}
							className=" bg-blue-500 py-2 px-4 text-sm rounded-md text-white hover:bg-blue-700 hover:text-white"
						>
							Delete for Everyone
						</button>
					)}
					<button
						onClick={props.onHide}
						className="bg-gray-700 py-2 px-4 text-sm rounded-md text-white hover:bg-c3 hover:text-white"
					>
						Cancel
					</button>
				</div>
			</div>
		</PopupWrapper>
	)
}

export default DeleteMsgPopup
