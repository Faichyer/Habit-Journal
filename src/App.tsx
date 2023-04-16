import { useEffect, useState } from 'react'
import HabitJournal from './components/HabitJournal'
import Home from './pages/Home'

function App() {
	const [solution, setSolution] = useState(null)

	useEffect(() => {
		fetch('http://localhost:3001/solutions')
			.then((res) => res.json())
			.then((json) => {
				const randomSolution =
					json[Math.floor(Math.random() * json.length)]

				setSolution(randomSolution)
			})
	}, [])

	return (
		<div className="text-center text-base font-quicksand">
			<Home />
		</div>
	)
}

export default App
