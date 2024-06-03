"use client"

import React, { useState } from 'react'
import {HabitProps, HabitsRecordsProps} from '../types/habit.types'
import HabitTrackDialog from './habit-track-dialog'
import {Card} from "@/components/ui/card";
import Link from "next/link";

type Props = {
    habit: HabitProps,
    habitsRecords: HabitsRecordsProps[]
}

const HabitBanner = ({habit, habitsRecords} : Props) => {
    // const navigate = useNavigate()
    const [isOpen, setIsOpen] = useState(false)

    const openDialog = () => {
        setIsOpen(true)
    }

    const handleViewHabitClick = () => {
        // navigate(`/habits/:${id}`)
        console.log('View habit clicked')
    }

    const isTodayRecordDone = habitsRecords.filter((hb) => new Date().getDate() === new Date(hb.date).getDate()).length > 0

    // const cardImg = 'https://i.redd.it/ma1p1g2t11u91.png'
    return (
        <Card className="max-w-sm rounded overflow-hidden shadow-lg">
            <img className="w-full h-64 rounded-b object-cover" src={habit.cardImg}/>
            <div className="px-6 py-4 flex flex-col gap-2">
                <div className="font-bold text-xl mb-2">{habit.cardName}</div>
                <div className="flex flex-row justify-center">
                    {isTodayRecordDone ? (
                        <p className="text-[17px] text-[#0FB478]">
                            {/*{`Tracks: ${*/}
                            {/*    habitsRecords[0].tracks.filter(*/}
                            {/*        (track) => track.complete*/}
                            {/*    ).length*/}
                            {/*} / ${habitsRecords[0].tracks.length}`}*/}
                        </p>
                    ) : (
                        <p className="text-[17px text-primary">
                            {`Today's track has not been complete yet`}
                        </p>
                    )}
                </div>
                {
                    isTodayRecordDone ? (
                        <button
                            className="block mt-10 w-full px-4 py-3 font-medium tracking-wide text-center transition-colors duration-300 transform bg-green-400 rounded-[14px] hover:bg-green-500 cursor-pointer"
                            onClick={handleViewHabitClick}
                        >
                            {`View today's track`}
                        </button>
                    ) : (
                        <HabitTrackDialog open={isOpen} setOpen={setIsOpen} habitsId={habit.id}/>
                    )
                }
            </div>
        </Card>
    )
}

export default HabitBanner
