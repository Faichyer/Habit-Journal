import React from 'react'
import { HabitProps } from '../../types/habit.type'

type Props = {
	day: Date
	habit: HabitProps
}

const CalendarDayTile = ({ day, habit }: Props) => {
	const isCurrentMonth = day.getMonth() === new Date().getMonth()
	const isCurrentDay =
		day.getDate() === new Date().getDate() && isCurrentMonth
	const hasDayAHabitRecord =
		habit.habitsRecords.filter(
			(hb) => day.getDate() === new Date(hb.date).getDate()
		).length > 0
	const dayCellClassName = `border p-1 h-50 sm:w-20 w-10 overflow-auto transition cursor-pointer duration-300 ease hover:bg-gray-200 ${
		isCurrentDay ? 'bg-red-300' : ''
	} ${isCurrentMonth ? 'font-bold' : ''}`
	const dayRecordsCells = `${
		hasDayAHabitRecord
			? 'absolute top-0 right-0 inline-block w-1 h-1 transform translate-x-1/2 -translate-y-1/2 bg-green-600 rounded-full'
			: ''
	}`

	return (
		<td className={dayCellClassName}>
			<div className="flex flex-col h-50 sm:w-full w-10 mx-auto overflow-hidden">
				<div className="top h-5 w-full">
					<span
						className={`${
							isCurrentDay ? 'text-white' : 'text-gray-500'
						} text-sm relative inline-block`}
					>
						{day.getDate()}
						<span className={dayRecordsCells}></span>
					</span>
				</div>
				<div className="bottom flex-grow h-50 py-1 w-full cursor-pointer"></div>
			</div>
		</td>
	)
}

export default CalendarDayTile
