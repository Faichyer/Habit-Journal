import React from 'react'
import PageTitle from '@/components/typography/page-title'
import {createServerComponentClient} from "@supabase/auth-helpers-nextjs";
import {cookies} from "next/headers";
import {HabitProps} from "@/components/types/habit.types";
import HabitCard from "@/components/habits/habit-card";

async function getHabits() {
    const supabase = createServerComponentClient({cookies})

    const {data, error} = await supabase.from('habits')
        .select()

    if (error) {
        console.log(error)
    }

    if (data) {
        return data
    }
}

const Habits = async () => {
    const habits: HabitProps[] = (await getHabits()) ?? [];

    return (
        <React.Fragment>
            <PageTitle title="Habits"/>
            <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
                {habits &&
                    habits.map((habit) => (
                        <HabitCard key={habit.id} {...habit}
                        />
                    ))}
            </main>
        </React.Fragment>
    )
}

export default Habits
