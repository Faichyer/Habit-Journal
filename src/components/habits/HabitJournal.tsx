import React, { useEffect, useState } from 'react'
import { HabitProps } from '../../types/habit.type'
import { useParams } from 'react-router-dom'

type HabitJournalProps = {}

function HabitJournal({}: HabitJournalProps) {
	const [currentHabit, setCurrentHabit] = useState<HabitProps>()
	const { id } = useParams()

	useEffect(() => {
		fetch(`http://localhost:3001/habits/${id?.split(':')[1]}`)
			.then((res) => res.json())
			.then((json) => {
				setCurrentHabit(json)
			})
	}, [])

	return (
		<div>
			{currentHabit && currentHabit.cardName}
			{/* <div>Solution is: {solution.word}</div>
			<div>Current guess is: {currentGuess}</div> */}
		</div>
	)
}

export default HabitJournal
