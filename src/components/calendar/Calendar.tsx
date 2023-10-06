import React from 'react'
import CalendarHead from './CalendarHead'
import CalendarDayTile from './CalendarDayTile'

type Props = {}

const Calendar = (props: Props) => {
	const weekDays = [
		{
			day: 'Monday',
			shortDay: 'Mon',
		},
		{
			day: 'Tuesday',
			shortDay: 'Tue',
		},
		{
			day: 'Wednesday',
			shortDay: 'Wed',
		},
		{
			day: 'Thursday',
			shortDay: 'Thu',
		},
		{
			day: 'Friday',
			shortDay: 'Fri',
		},
		{
			day: 'Saturday',
			shortDay: 'Sat',
		},
		{
			day: 'Sunday',
			shortDay: 'Sun',
		},
	]

	const days = []

	// const daysInMonth = new Date().getDaysInMonth();
	const currentDate = new Date()
	const currentMonth = currentDate.getMonth()
	const currentYear = currentDate.getFullYear()

	const getWeeksInMonth = () => {
		const weeks = []
		let currentDay = new Date(currentYear, currentMonth, 1)

		// Calculate the day of the week for the first day of the month
		const firstDayOfWeek = currentDay.getDay()

		// Calculate the offset to align with Monday as the start of the week
		const offset = firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1

		// Calculate the date of the first cell in the calendar
		currentDay.setDate(currentDay.getDate() - offset)

		while (currentDay.getMonth() <= currentMonth) {
			const week = []
			for (let i = 0; i < 7; i++) {
				week.push(new Date(currentDay))
				currentDay.setDate(currentDay.getDate() + 1)
			}
			weeks.push(week)
		}

		return weeks
	}

	const weeksInMonth = getWeeksInMonth()
	console.log(weeksInMonth)
	return (
		<div>
			<h2 className="text-center text-2xl font-bold my-4">
				{currentDate.toLocaleString('en', { month: 'long' })}{' '}
				{currentYear}
			</h2>
			<table className="w-full">
				<thead>
					<tr>
						{weekDays.map((el) => (
							<CalendarHead
								key={el.day}
								day={el.day}
								shortDay={el.shortDay}
							/>
						))}
					</tr>
				</thead>
				<tbody>
					{/* <tr className="text-center h-20">
						<td className="border p-1 h-40 xl:w-40 lg:w-30 md:w-30 sm:w-20 w-10 overflow-auto transition cursor-pointer duration-500 ease hover:bg-gray-300 ">
							<div className="flex flex-col h-40 mx-auto xl:w-40 lg:w-30 md:w-30 sm:w-full w-10 mx-auto overflow-hidden">
								<div className="top h-5 w-full">
									<span className="text-gray-500">1</span>
								</div>
								<div className="bottom flex-grow h-30 py-1 w-full cursor-pointer">
									<div className="event bg-purple-400 text-white rounded p-1 text-sm mb-1">
										<span className="event-name">
											Meeting
										</span>
										<span className="time">
											12:00~14:00
										</span>
									</div>
									<div className="event bg-purple-400 text-white rounded p-1 text-sm mb-1">
										<span className="event-name">
											Meeting
										</span>
										<span className="time">
											18:00~20:00
										</span>
									</div>
								</div>
							</div>
						</td> */}
					{/* <tr className="text-center h-20">
						{[1, 2, 3, 4, 5, 6, 7].map((el) => (
							<CalendarDayTile day={el} key={el} />
						))}
					</tr> */}
					{weeksInMonth.map((week, index) => (
						<tr key={index} className="text-center h-16">
							{week.map((day) => (
								<CalendarDayTile
									day={day}
									key={day.toDateString()}
								/>
							))}
						</tr>
					))}
				</tbody>
			</table>
		</div>
	)
}

export default Calendar
