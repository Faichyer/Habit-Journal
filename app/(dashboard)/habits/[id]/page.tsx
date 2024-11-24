import HabitCalendar from "@/components/calendar/habit-calendar";
import {
	getHabitsRecords,
	getSelectedHabit,
} from "@/components/habits/actions/habits.action";
import { getTwoRandomQuestions } from "@/components/habits/actions/questions.actions";
import HabitBanner from "@/components/habits/habit-banner";
import HabitCharts from "@/components/habits/habit-charts";
import HabitProgress from "@/components/habits/habit-progress";
import PageTitle from "@/components/typography/page-title";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
	type HabitProps,
	type HabitsRecordsProps,
	type QuestionProps,
	TrackProps,
} from "@/types/habit.types";
import { Clock } from "lucide-react";
import React from "react";
import {notFound} from "next/navigation";

async function HabitsPage({ params }: { params: { id: string } }) {
	const currentHabit: HabitProps = await getSelectedHabit(params.id) || null;
	if (!currentHabit) {
		return notFound();
	}
	const habitsRecords: HabitsRecordsProps[] =
		(await getHabitsRecords(params.id)) || [];
	const questions: QuestionProps[] = (await getTwoRandomQuestions()) || [];

	return (
		<main className="grid flex-1 items-start gap-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-2 xl:grid-cols-2">
			<div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
				<PageTitle title={currentHabit.card_name} />
				<div className="grid lg:grid-cols-2 gap-4 flex-wrap lg:flex-nowrap lg:col-span-2">
					<Card className="w-full">
						<CardHeader className="pb-2">
							<div className="grid grid-cols-[1fr,auto] items-start gap-4">
								<div>
									<CardTitle className="text-2xl">Overview</CardTitle>
								</div>
								<div className="flex flex-col items-center">
									<Clock className="h-8 w-8 text-primary" />
									<p className="text-sm text-muted-foreground mt-1">7:00 AM</p>
								</div>
							</div>
						</CardHeader>
						<CardContent>
							<p className="text-muted-foreground">
								{currentHabit.description}
							</p>
						</CardContent>
					</Card>
					<HabitBanner
						habit={currentHabit}
						habitsRecords={habitsRecords}
						questions={questions}
					/>
				</div>
			</div>
			<div className="grid lg:grid-cols-2 gap-4 flex-wrap lg:flex-nowrap lg:col-span-2">
				<Card className="">
					<CardHeader className="pb-2">
						<div className="grid grid-cols-[1fr,auto] items-start gap-4">
							<div>
								<CardTitle className="text-2xl">Schedule</CardTitle>
							</div>
						</div>
					</CardHeader>
					<CardContent>
						<HabitCalendar />
					</CardContent>
				</Card>
				<div className={"flex flex-col justify-between gap-4 w-full"}>
					<HabitCharts />
					<HabitProgress />
				</div>
			</div>
		</main>
	);
}

export default HabitsPage;
