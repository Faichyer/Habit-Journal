import React from 'react';
import PageTitle from "@/components/typography/page-title";
import {FcAlarmClock} from "react-icons/fc";
import Calendar from "@/components/calendar/calendar";
import HabitBanner from "@/components/habits/habit-banner";
import {createServerComponentClient} from "@supabase/auth-helpers-nextjs";
import {cookies} from "next/headers";
import {HabitProps, HabitsRecordsProps, TrackProps} from "@/components/types/habit.types";
import {createServer} from "@/lib/supabase/server";

async function getSelectedHabit(id: number) {
    const supabase = createServer()

    const {data, error} = await supabase.from('habits')
        .select()
        .eq('id', id)

    if (error) {
        console.log(error)
    }

    if (data && data.length > 0) {
        return data[0]
    }
}

async function getHabitsRecords(id: number) {
    const supabase = createServer()

    const {data, error} = await supabase.from('habitsRecords')
        .select()
        .eq('habitsId', id)

    if (error) {
        console.log(error)
    }

    if (data && data.length > 0) {
        return data[0]
    }
}

async function getTracks(id: number) {
    const supabase = createServer()

    const {data, error} = await supabase.from('tracks')
        .select()
        .eq('habitsRecordsId', id)

    if (error) {
        console.log(error)
    }

    if (data && data.length > 0) {
        return data[0]
    }
}

async function Page({ params }: { params: { id: string } }) {

    const currentHabit: HabitProps = await getSelectedHabit(+params.id) || null
    const habitsRecords: HabitsRecordsProps[] = await getHabitsRecords(+params.id) || []

    return (
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-2 xl:grid-cols-2">
            <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
                <PageTitle title={currentHabit.cardName}/>
                <div className="flex flex-col justify-start">
                    <h2 className="text-2xl text-primary">Overview</h2>
                    <div className="flex flex-row justify-between">
                        <p className="w-1/2">
                            {currentHabit.description}
                        </p>
                        <div className="text-lg w-1/4 flex flex-col items-center">
                            {React.createElement(FcAlarmClock, {
                                size: '30',
                            })}
                            Alarm at 7AM
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-span-2">
                <h2 className="text-2xl text-primary">Schedule</h2>
            </div>
            <div className="grid lg:grid-cols-3 items-start gap-4 md:gap-8 lg:col-span-2">
                <div className="lg:col-span-2">
                    <Calendar habit={currentHabit} habitsRecords={habitsRecords}/>
                </div>
                <div className="lg:col-span-1">
                    <HabitBanner habit={currentHabit} habitsRecords={habitsRecords}/>
                </div>
            </div>

        </main>
    );
}


export default Page;