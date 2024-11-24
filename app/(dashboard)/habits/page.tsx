import PageTitle from "@/components/typography/page-title";
import { FocusCards } from "@/components/ui/focus-card";
import type { HabitProps } from "@/types/habit.types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import React from "react";

async function getHabits() {
	const supabase = createServerComponentClient({ cookies });

	const { data, error } = await supabase.from("habits").select();

	if (error) {
		console.log(error);
	}

	if (data) {
		return data;
	}
}

const Habits = async () => {
	const habits: HabitProps[] = (await getHabits()) ?? [];

	const cards = habits.map((habit) => ({
		title: habit.card_name,
		subtitle: habit.description,
		src: habit.card_img,
		href: `/habits/${habit.id}`,
	}));

	return (
		<React.Fragment>
			<main className="grid flex-1 items-start px-4 gap-4 sm:px-6 sm:py-0 md:gap-8 ">
				<PageTitle title="Habits" />
				<div className={"grid flex-1 gap-4 items-start sm:py-0 md:gap-8"}>
					<FocusCards cards={cards} />
				</div>
			</main>
		</React.Fragment>
	);
};

export default Habits;
