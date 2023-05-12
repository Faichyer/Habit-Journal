import React, { useEffect, useState } from 'react'
import { HabitProps } from '../../types/habit.type'
import { useParams } from 'react-router-dom'
import PageTitle from '../PageTitle'

type HabitJournalProps = {}

function HabitJournal({}: HabitJournalProps) {
	const [currentHabit, setCurrentHabit] = useState<HabitProps>({
		id: 0,
		cardName: '',
		tracks: [],
	})
	const { id } = useParams()

	useEffect(() => {
		fetch(`http://localhost:3001/habits/${id?.split(':')[1]}`)
			.then((res) => res.json())
			.then((json) => {
				setCurrentHabit(json)
			})
	}, [])

	return (
		<div className="mx-auto">
			<PageTitle title={currentHabit.cardName} />

			<div></div>
		</div>
	)
}

export default HabitJournal
