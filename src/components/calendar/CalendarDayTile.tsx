import React from 'react'

type Props = {
	day: Date
}

const CalendarDayTile = ({ day }: Props) => {
	const isCurrentMonth = day.getMonth() === new Date().getMonth()
	const isCurrentDay = day.getDate() === new Date().getDate()
	const dayCellClassName = `border p-1 h-50 sm:w-20 w-10 overflow-auto transition cursor-pointer duration-300 ease hover:bg-gray-200 ${
		isCurrentDay ? 'bg-red-300' : ''
	} ${isCurrentMonth ? 'font-bold' : ''}`

	return (
		<td className={dayCellClassName}>
			<div className="flex flex-col h-50 sm:w-full w-10 mx-auto overflow-hidden">
				<div className="top h-5 w-full">
					<span
						className={`${
							isCurrentDay ? 'text-white' : 'text-gray-500'
						} text-sm`}
					>
						{day.getDate()}
					</span>
				</div>
				<div className="bottom flex-grow h-50 py-1 w-full cursor-pointer"></div>
			</div>
		</td>
	)
}

export default CalendarDayTile
