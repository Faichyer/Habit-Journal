"use client";

import { HabitTrackForm } from "@/components/habits/habit-track-form";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from "@/components/ui/drawer";
import { useMediaQuery } from "@/lib/hooks/use-media-query";
import type { QuestionProps } from "@/types/habit.types";
import React, { useRef } from "react";

type DialogProps = {
	habitsId: string;
	questions: QuestionProps[];
};

const HabitTrackDialog = ({ habitsId, questions }: DialogProps) => {
	const cancelButtonRef = useRef(null);
	const isDesktop = useMediaQuery("(min-width: 768px)");

	if (isDesktop) {
		return (
			<Dialog>
				<DialogTrigger asChild>
					<Button variant={"ringHover"} className={"bg-red-500 w-full"}>
						Track Now
					</Button>
				</DialogTrigger>
				<DialogContent className="sm:max-w-[425px] w:64">
					<DialogHeader>
						<DialogTitle>Well Done! 🎉</DialogTitle>
						<DialogDescription>
							Add a track to your habit to keep track of your progress.
						</DialogDescription>
					</DialogHeader>
					<HabitTrackForm habitsId={habitsId} questions={questions} />
					<DialogFooter>
						<Button variant="outline">Cancel</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		);
	}

	return (
		<Drawer>
			<DrawerTrigger asChild>
				<Button>Track Now</Button>
			</DrawerTrigger>
			<DrawerContent>
				<DrawerHeader className="text-left">
					<DrawerTitle>Well Done! 🎉</DrawerTitle>
					<DrawerDescription>
						Add a track to your habit to keep track of your progress.
					</DrawerDescription>
				</DrawerHeader>
				<HabitTrackForm habitsId={habitsId} questions={questions} />
				<DrawerFooter className="pt-2">
					<DrawerClose asChild>
						<Button variant="outline">Cancel</Button>
					</DrawerClose>
				</DrawerFooter>
			</DrawerContent>
		</Drawer>
	);
};

export default HabitTrackDialog;
