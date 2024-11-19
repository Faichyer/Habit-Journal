import type { AriaButtonProps } from "@react-types/button";
import type { PressEvent } from "@react-types/shared";
import { type ClassValue, clsx } from "clsx";
import type { MouseEvent as ReactMouseEvent, SyntheticEvent } from "react";
import { twMerge } from "tailwind-merge";
export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function generateScale({
	name,
	isOverlay = false,
}: { name: string; isOverlay?: boolean }) {
	const scale = Array.from({ length: 12 }, (_, i) => {
		const id = i + 1;
		if (isOverlay) {
			return [[`a${id}`, `var(--${name}-a${id})`]];
		}
		return [
			[id, `var(--${name}-${id})`],
			[`a${id}`, `var(--${name}-a${id})`],
		];
	}).flat();

	return Object.fromEntries(scale);
}

export type PointerType = "mouse" | "pen" | "touch" | "keyboard" | "virtual";

export type BaseEvent<T extends SyntheticEvent> = T & {
	stopPropagation(): void;
	continuePropagation(): void;
};

export function convertMouseEventToPressEvent(
	event: ReactMouseEvent<HTMLButtonElement, MouseEvent>,
	type: PressEvent["type"],
): PressEvent {
	const pointerType: PointerType = "mouse"; // Assuming a mouse event for simplicity

	// Create a flag to track whether propagation is stopped
	let propagationStopped = false;

	// Override the default stopPropagation function to control the event flow
	const stopPropagation = () => {
		event.stopPropagation();
		propagationStopped = true;
	};

	// continuePropagation will only have an effect if stopPropagation has been called before
	const continuePropagation = () => {
		if (propagationStopped) {
			event.nativeEvent.stopImmediatePropagation = () => {};
		}
	};

	return {
		type: type,
		pointerType: pointerType,
		target: event.currentTarget,
		shiftKey: event.shiftKey,
		ctrlKey: event.ctrlKey,
		metaKey: event.metaKey,
		altKey: event.altKey,
		x: event.clientX, // X position relative to the viewport
		y: event.clientY, // Y position relative to the viewport
		continuePropagation: continuePropagation,
	};
}
