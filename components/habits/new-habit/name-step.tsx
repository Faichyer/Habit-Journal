'use client'

import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"


export function NameStep() {
    return (
        <div className="space-y-4">
            <div>
                <Label htmlFor="habit-name" className="text-sm sm:text-base">Habit Name</Label>
                <Input
                    id="habit-name"
                   placeholder="Enter habit name"
                    className="mt-1"
                />
            </div>
            <div>
                <Label htmlFor="habit-description" className="text-sm sm:text-base">Description</Label>
                <Textarea
                    id="habit-description"
                    placeholder="Describe your habit"
                    className="mt-1"
                    rows={4}
                />
            </div>
        </div>
    )
}

