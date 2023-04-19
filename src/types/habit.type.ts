export type HabitProps = {
	id: number
	cardImg: string
	cardName: string
	description: string
	tracks: trackHabit[]
	date?: Date
}

type trackHabit = {
	id: number
	trackName: string
	completed: boolean
}
