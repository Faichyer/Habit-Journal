import React, { useState } from 'react'
import { HabitProps } from '../../types/habit.type'
import { useNavigate } from 'react-router-dom'
import HabitTrackDialog from './HabitTrackDialog'

const HabitBanner = ({
	id,
	cardImg,
	cardName,
	description,
	habitsRecords,
}: HabitProps) => {
	const navigate = useNavigate()
	const [isOpen, setIsOpen] = useState(false)

	const openDialog = () => {
		setIsOpen(true)
	}

	const handleViewHabitClick = () => {
		navigate(`/habits/:${id}`)
	}

	const isTodayRecordDone =
		habitsRecords.filter(
			(hb) => new Date().getDate() === new Date(hb.date).getDate()
		).length > 0

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
						{isTodayRecordDone ? (
							<p className="text-[17px] font-bold text-[#0FB478]">
								{`Tracks: ${
									habitsRecords[0].tracks.filter(
										(track) => track.complete
									).length
								} / ${habitsRecords[0].tracks.length}`}
							</p>
						) : (
							<p className="text-[17px] font-bold text-red-800">
								Today's track has not been complete yet
							</p>
						)}
					</div>

					{isTodayRecordDone ? (
						<a
							className="block mt-10 w-full px-4 py-3 font-medium tracking-wide text-center transition-colors duration-300 transform bg-green-400 rounded-[14px] hover:bg-green-500 cursor-pointer"
							onClick={handleViewHabitClick}
						>
							View today's track
						</a>
					) : (
						<a
							className="block mt-10 w-full px-4 py-3 font-medium tracking-wide text-center transition-colors duration-300 transform bg-red-400 rounded-[14px] hover:bg-red-500 cursor-pointer"
							onClick={openDialog}
						>
							Track now
						</a>
					)}
				</div>
			</div>
			<HabitTrackDialog open={isOpen} setOpen={setIsOpen} />
		</div>
	)
}

export default HabitBanner
