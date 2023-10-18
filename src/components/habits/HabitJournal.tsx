import React, { useEffect, useState } from 'react'
import { HabitProps } from '../../types/habit.type'
import { useParams } from 'react-router-dom'
import PageTitle from '../PageTitle'
import { FcAlarmClock } from 'react-icons/fc'
import Calendar from '../calendar/Calendar'

type HabitJournalProps = {}

function HabitJournal({}: HabitJournalProps) {
	const [currentHabit, setCurrentHabit] = useState<HabitProps>({
		id: 0,
		cardName: '',
		habitsRecords: [],
	})
	const { id } = useParams()
	const [value, onChange] = useState(new Date())

	useEffect(() => {
		fetch(`http://localhost:3000/habits/${id?.split(':')[1]}`)
			.then((res) => res.json())
			.then((json) => {
				console.log(json)
				setCurrentHabit(json)
			})
	}, [])

	return (
		<div className="w-full">
			<div className="mx-auto w-full">
				<PageTitle title={currentHabit.cardName} />
			</div>
			<div className="flex flex-col justify-start mt-8">
				<h2 className="mx-4 text-2xl font-bold">Overview</h2>
				<div className="mt-8 flex flex-row justify-around w-full">
					<h3 className="text-lg w-1/2">
						{currentHabit.description}
					</h3>
					<div className="text-lg w-1/4 flex flex-col items-center">
						{React.createElement(FcAlarmClock, {
							size: '30',
						})}
						Alarm at 7AM
					</div>
				</div>
			</div>
			<div className="flex flex-col justify-start mt-8">
				<h2 className="mx-4 text-2xl font-bold">Schedule</h2>
				<div className="mt-8 flex flex-row justify-around w-full">
					<Calendar habit={currentHabit} />
					<div className="w-40">Hello</div>
				</div>
			</div>
		</div>
	)
}

export default HabitJournal
