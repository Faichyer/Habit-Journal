import React, { useEffect } from 'react'
import useHabitJournal from '../../hooks/useHabitJournal'

type HabitJournalProps = {}

function HabitJournal(props: HabitJournalProps) {
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
