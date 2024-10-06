"use server"

import {createServer} from "@/lib/supabase/server";

export async function getTwoRandomQuestions() {
    const supabase = createServer()

    const {data, error} = await supabase.from('questions')
        .select()

    if (error) {
        console.log(error)
    }

    if (data && data.length > 0) {
        return data
    }
}