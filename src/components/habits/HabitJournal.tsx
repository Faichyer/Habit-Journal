import React, { useEffect } from 'react'
import { HabitProps } from '../../types/habit.type'

type HabitJournalProps = {
	habit: HabitProps
}

function HabitJournal({ habit }: HabitJournalProps) {
	// const { currentGuess, handleKeyup } = useHabitJournal({ solution })

	// useEffect(() => {
	// 	window.addEventListener('keyup', handleKeyup)

	// 	return () => window.removeEventListener('keyup', handleKeyup)
	// }, [handleKeyup])

	return (
		<div>
			{/* <div>Solution is: {solution.word}</div>
			<div>Current guess is: {currentGuess}</div> */}
		</div>
	)
}

export default HabitJournal
