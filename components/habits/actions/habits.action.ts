"use server"

import {createServer} from "@/lib/supabase/server";

export async function getSelectedHabit(id: string) {
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

export async function getHabitsRecords(id: string) {
    const supabase = createServer()

    const {data, error} = await supabase.from('habits_records')
        .select()
        .eq('habits_id', id)
    // .eq('date', new Date().toISOString().split('T')[0])

    if (error) {
        console.log(error)
    }

    if (data && data.length > 0) {
        return data
    }
}
