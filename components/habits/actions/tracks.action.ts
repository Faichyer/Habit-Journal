"use server"

import {createServer} from "@/lib/supabase/server";

async function getTracks(id: number) {
    const supabase = createServer()

    const {data, error} = await supabase.from('tracks')
        .select()
        .eq('habits_records_id', id)

    if (error) {
        console.log(error)
    }

    if (data && data.length > 0) {
        return data[0]
    }
}