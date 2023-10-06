import React, { useEffect, useState } from 'react'
import PageTitle from '../components/PageTitle'
import HabitCard from '../components/habits/HabitCard'
import { HabitProps } from '../types/habit.type'

const Habits = () => {
	const [habits, setHabits] = useState<HabitProps[]>([])

	useEffect(() => {
		fetch('http://localhost:3000/habits')
			.then((res) => res.json())
			.then((json) => {
				setHabits(json)
			})
	}, [])

	return (
		<div className="h-full w-screen">
			<PageTitle title="Habits" />
			<div className="flex flex-row justify-evenly mt-4">
				{habits &&
					habits.map((habit) => (
						<HabitCard
							cardImg={habit.cardImg}
							cardName={habit.cardName}
							description={habit.description}
							id={habit.id}
							tracks={habit.tracks}
							key={habit.id}
						/>
					))}
			</div>
		</div>
	)
}

export default Habits
