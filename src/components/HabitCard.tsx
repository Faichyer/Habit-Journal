import React from 'react'
import { HabitProps } from '../types/habit.type'

const HabitCard = ({
	cardImg,
	cardName,
	description,
	date,
	tracks,
}: HabitProps) => {
	// const cardImg = 'https://i.redd.it/ma1p1g2t11u91.png'
	return (
		<div>
			<div className="w-96 mx-auto rounded-xl mt-4 shadow-md shadow-slate-200">
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
								tracks.filter((track) => track.completed).length
							} / ${tracks.length}`}
						</p>
					</div>
					<p className="text-[#7C7C80] font-[15px] mt-6">
						{description}
					</p>

					<a className="block mt-10 w-full px-4 py-3 font-medium tracking-wide text-center capitalize transition-colors duration-300 transform bg-red-400 rounded-[14px] hover:bg-red-500 focus:outline-none focus:ring focus:ring-teal-300 focus:ring-opacity-80">
						View the habit
					</a>
					<a
						target="_blank"
						className="block mt-1.5 w-full px-4 py-3 font-medium tracking-wide text-center capitalize transition-colors duration-300 transform rounded-[14px] hover:bg-[#F2ECE7] hover:text-[#000000dd] focus:outline-none focus:ring focus:ring-teal-300 focus:ring-opacity-80"
					>
						Download app
					</a>
				</div>
			</div>
		</div>
	)
}

export default HabitCard
