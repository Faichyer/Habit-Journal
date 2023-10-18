import React from 'react'
import { HabitProps } from '../../types/habit.type'
import { useNavigate } from 'react-router-dom'

const HabitCard = ({
	id,
	cardImg,
	cardName,
	description,
	habitsRecords,
}: HabitProps) => {
	const navigate = useNavigate()

	const handleViewHabitClick = () => {
		navigate(`/habits/:${id}`)
	}

	// const cardImg = 'https://i.redd.it/ma1p1g2t11u91.png'
	return (
		<div className="w-96 mx-auto">
			<div className="rounded-xl mt-4 shadow-md shadow-slate-200 hover:shadow-lg">
				<div
					className="bg-center bg-cover h-56 w-full rounded-xl"
					style={{
						backgroundImage: `url(${cardImg})`,
					}}
				></div>
				<div className="p-4 sm:p-6">
					<p className="font-bold text-gray-700 text-[22px] leading-7 mb-1">
						{cardName}
					</p>
					<div className="flex flex-row justify-center">
						<p className="text-[17px] font-bold text-[#0FB478]">
							{`Tracks: ${
								habitsRecords[0].tracks.filter(
									(track) => track.complete
								).length
							} / ${habitsRecords[0].tracks.length}`}
						</p>
					</div>
					<p className="text-[#7C7C80] font-[15px] mt-6">
						{description}
					</p>

					<a
						className="block mt-10 w-full px-4 py-3 font-medium tracking-wide text-center transition-colors duration-300 transform bg-red-400 rounded-[14px] hover:bg-red-500 cursor-pointer"
						onClick={handleViewHabitClick}
					>
						View the habit
					</a>
				</div>
			</div>
		</div>
	)
}

export default HabitCard
