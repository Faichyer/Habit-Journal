export type HabitProps = {
    id: string
    card_img: string
    card_name: string
    description?: string
    created_at: Date
}

export type HabitsRecordsProps = {
    id: string
    created_at: Date,
    date: Date,
    trigger: string,
    habits_id: string
}

export type QuestionProps = {
    id: number
    question: string
    created_at: Date
}

export type ReflectionProps = {
    id: number
    question_id: number
    answer: string
    created_at: Date
    habits_records_id: number
}

export type TrackProps = {
    id: number
    created_at: Date
    name: string
    habits_records_id: number
    completed: boolean
}

