import type { HabitProps } from "@/types/habit.types";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";

const HabitCard = ({ id, card_img, card_name, description }: HabitProps) => {
	return (
		<Card className="max-w-sm rounded overflow-hidden shadow-lg">
			<img
				className="w-full h-64 rounded-b object-cover"
				src={card_img}
				alt="Sunset in the mountains"
			/>
			<div className="px-6 py-4">
				<div className="font-bold text-xl mb-2">{card_name}</div>
				<p className="text-gray-700 text-base">{description}</p>
			</div>
			<div className="flex justify-center align-middle py-2">
				<Button asChild>
					<Link href={`/habits/${id}`}>View Habit</Link>
				</Button>
			</div>
		</Card>
	);
};

export default HabitCard;
