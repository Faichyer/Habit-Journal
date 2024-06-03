export type HabitProps = {
    id: number
    cardImg: string
    cardName: string
    description?: string
    createdAt: Date
}

export type HabitsRecordsProps = {
    id: number
    createdAt: Date,
    date: Date,
    trigger: string,
    habitsId: number
}

export type QuestionProps = {
    id: number
    question: string
    createdAt: Date
}

export type ReflectionProps = {
    id: number
    questionId: number
    answer: string
    createdAt: Date
    habitsRecordsId: number
}

export type TrackProps = {
    id: number
    createdAt: Date
    name: string
    habitsRecordsId: number
    completed: boolean
}
