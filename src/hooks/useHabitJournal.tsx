import React, { useState, useEffect } from 'react'
// import { SolutionType } from '../types/habit.type'

type HabitJournalProps = {
	// solution: SolutionType
}

function useHabitJournal(props: HabitJournalProps) {
	const [turn, setTurn] = useState(0)
	const [currentGuess, setCurrentGuess] = useState('')
	const [guesses, setGuesses] = useState([])
	const [history, setHistory] = useState([] as String[])
	const [isCorrect, setIsCorrect] = useState(false)
	/*
	const formatGuess = () => {
		let solutionArray = [...solution.word]
		let formattedGuess = [...currentGuess].map((letter) => {
			return { key: letter, color: 'grey' }
		})

		formattedGuess.forEach((letter, index) => {
			if (solutionArray[index] === letter.key) {
				formattedGuess[index].color = 'green'
				solutionArray[index] = '*'
			}
		})

		formattedGuess.forEach((letter, index) => {
			if (
				solutionArray.includes(letter.key) &&
				letter.color !== 'green'
			) {
				formattedGuess[index].color = 'yellow'
				solutionArray[solutionArray.indexOf(letter.key)] = '*'
			}
		})

		return formattedGuess
	}

	const addNewGuess = () => {}

	const handleKeyup = ({ key }: KeyboardEvent) => {
		// Submitting
		if (key === 'Enter') {
			if (turn > 5) {
				console.log('Tu as utilisé tous tes tours')
				return
			}

			if (history.includes(currentGuess)) {
				console.log('Tu as déjà essayé ce mot')
				return
			}

			if (currentGuess.length !== 5) {
				console.log('Le mot doit avoir 5 caractères')
				return
			}

			const formatted = formatGuess()
			console.log(formatted)
		}

		// Backspace to erase
		if (key === 'Backspace') {
			setCurrentGuess((prev) => prev.slice(0, -1))
			return
		}

		// Guess submit
		if (/^[A-Za-z]$/.test(key)) {
			if (currentGuess.length < 5) {
				setCurrentGuess((prev) => prev + key)
			}
		}
	}

	return { turn, currentGuess, guesses, isCorrect, handleKeyup }
	*/
}

export default useHabitJournal
