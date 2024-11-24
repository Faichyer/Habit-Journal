'use client'

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function RhythmStep() {
    return (
        <div className="space-y-4">
            <div>
                <Label htmlFor="habit-rhythm" className="text-sm sm:text-base">Rhythm</Label>
                <Select>
                    <SelectTrigger id="habit-rhythm" className="mt-1">
                        <SelectValue placeholder="Select rhythm"/>
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="daily">Daily</SelectItem>
                        <SelectItem value="weekly">Weekly</SelectItem>
                        <SelectItem value="monthly">Monthly</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div>
                <Label htmlFor="habit-periodicity" className="text-sm sm:text-base">Periodicity</Label>
                <Input
                    id="habit-periodicity"
                   placeholder="E.g., 3 times per week"
                    className="mt-1"
                />
            </div>
        </div>
    )
}

