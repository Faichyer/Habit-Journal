import React from 'react'

type Props = {
	day: number
}

const CalendarDayTile = ({ day }: Props) => {
	return (
		<td className="border p-1 h-20 sm:w-20 w-10 overflow-auto transition cursor-pointer duration-500 ease hover:bg-gray-3h-300">
			<div className="flex flex-col h-20 sm:w-full w-10 mx-auto overflow-hidden">
				<div className="top h-5 w-full">
					<span className="text-gray-500 text-sm">{day}</span>
				</div>
				<div className="bottom flex-grow h-20 py-1 w-full cursor-pointer"></div>
			</div>
		</td>
	)
}

export default CalendarDayTile
