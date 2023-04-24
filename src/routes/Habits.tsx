import React from 'react'
import PageTitle from '../components/PageTitle'
import IsagiWorkout from '../assets/isagi_workout.png'
import KurzgesagtHabitJournal from '../assets/kurzgesagt_habit_journal.jpg'
import Gratefulness from '../assets/grateful.jpg'
import HabitCard from '../components/habits/HabitCard'

type HabitsProps = {}

const Habits = (props: HabitsProps) => {
	const habits = [
		{
			id: 1,
			cardName: 'Workout',
			cardImg: IsagiWorkout,
			description:
				'Try to go to gym everyday, almost and eat well accordingly to the main objective',
			tracks: [
				{ id: 1, trackName: 'Go to Gym', completed: true },
				{ id: 2, trackName: 'Sleep early', completed: true },
				{ id: 3, trackName: 'Eat well', completed: true },
			],
		},
		{
			id: 2,
			cardName: 'Habit Journal',
			cardImg: KurzgesagtHabitJournal,
			description:
				'This habit is to code a little bit everyday in order to finish this project ASAP',
			tracks: [
				{ id: 1, trackName: 'Code this shit', completed: true },
				{ id: 2, trackName: 'Learn new technologies', completed: true },
			],
		},
		{
			id: 3,
			cardName: 'Grateful',
			cardImg: Gratefulness,
			description:
				'Be grateful to the persons that helped you during your life bro',
			tracks: [
				{ id: 1, trackName: 'Thank one person a day', completed: true },
				{ id: 2, trackName: 'Stop this 420 stuff', completed: true },
				{ id: 3, trackName: 'Sleep early everyday', completed: true },
			],
		},
	]
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
