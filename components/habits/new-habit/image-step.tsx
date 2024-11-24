'use client'

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function ImageStep() {
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            // setHabitData({ ...habitData, image: e.target.files[0] })
        }
    }

    return (
        <div className="space-y-4">
            <div>
                <Label htmlFor="habit-image" className="text-sm sm:text-base">Upload Image</Label>
                <Input
                    id="habit-image"
                    type="file"
                    onChange={handleFileChange}
                    accept="image/*"
                    className="mt-1"
                />
            </div>
            {/*{habitData.image && (*/}
            {/*    <p className="text-sm text-muted-foreground">*/}
            {/*        Selected file: {habitData.image.name}*/}
            {/*    </p>*/}
            {/*)}*/}
        </div>
    )
}

