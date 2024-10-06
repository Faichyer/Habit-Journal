"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

type CardProps = {
	title: string;
	src: string;
	subtitle?: string;
	href?: string;
};

// eslint-disable-next-line react/display-name
export const Card = React.memo(
	({
		card,
		index,
		hovered,
		setHovered,
	}: {
		card: CardProps;
		index: number;
		hovered: number | null;
		setHovered: React.Dispatch<React.SetStateAction<number | null>>;
	}) => (
		<div
			onMouseEnter={() => setHovered(index)}
			onMouseLeave={() => setHovered(null)}
			className={cn(
				"rounded-lg relative bg-gray-100 dark:bg-neutral-900 overflow-hidden h-60 md:h-96 w-full transition-all duration-300 ease-out",
				hovered !== null && hovered !== index && "blur-sm scale-[0.98]",
			)}
		>
			<Image
				src={card.src}
				alt={card.title}
				fill
				className="object-cover absolute inset-0"
			/>
			<div
				className={cn(
					"absolute inset-0 bg-black/50 flex flex-col justify-end gap-2 py-8 px-4 transition-opacity duration-300",
					hovered === index ? "opacity-100" : "opacity-0",
				)}
			>
				<div className="text-xl  md:text-2xl font-medium bg-clip-text text-primary bg-gradient-to-b from-neutral-50 to-neutral-200">
					{card.title}
				</div>
				<div className="md:text-sm font-medium bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-200">
					{card.subtitle}
				</div>
				<Link
					className={"hover:border-b-2 hover:border-b-primary w-20"}
					href={card.href || ""}
				>
					View habit
				</Link>
			</div>
		</div>
	),
);

export function FocusCards({ cards }: { cards: CardProps[] }) {
	const [hovered, setHovered] = useState<number | null>(null);

	return (
		<div className="grid grid-cols-1 md:grid-cols-3 gap-10 w-full">
			{cards.map((card, index) => (
				<Card
					key={card.title}
					card={card}
					index={index}
					hovered={hovered}
					setHovered={setHovered}
				/>
			))}
		</div>
	);
}
