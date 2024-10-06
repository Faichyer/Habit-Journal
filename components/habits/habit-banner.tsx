"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import type {
	HabitProps,
	HabitsRecordsProps,
	QuestionProps,
} from "@/types/habit.types";
import React, { useState } from "react";
import HabitTrackDialog from "./habit-track-dialog";

type Props = {
	habit: HabitProps;
	habitsRecords: HabitsRecordsProps[];
	questions: QuestionProps[];
};

const HabitBanner = ({ habit, habitsRecords, questions }: Props) => {
	const handleViewHabitClick = () => {
		// navigate(`/habits/:${id}`)
		console.log("View habit clicked");
	};

	// const isTodayRecordDone = habitsRecords.filter((hb) => new Date().getDate() === new Date(hb.date).getDate()).length > 0
	const isTodayRecordDone = false;

	return (
		<Card className="w-full">
			<img
				alt={"habit-card"}
				className="w-full h-64 rounded-t-xl object-cover"
				src={habit.card_img}
			/>
			<div className="px-6 py-4 flex flex-col gap-2">
				<div className="font-bold text-xl mb-2">{habit.card_name}</div>
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
				{isTodayRecordDone ? (
					<Button
						variant={"ringHover"}
						onClick={handleViewHabitClick}
					>{`View today's track`}</Button>
				) : (
					<HabitTrackDialog habitsId={habit.id} questions={questions} />
				)}
			</div>
		</Card>
	);
};

export default HabitBanner;
