export type HabitProps = {
	id: number
	cardImg?: string
	cardName: string
	description?: string
	habitsRecords: HabitsRecordsProps[]
}

export type HabitsRecordsProps = {
	id: number
	date: Date
	tracks: trackHabit[]
}

type trackHabit = {
	id: number
	trackName: string
	complete: boolean
}
