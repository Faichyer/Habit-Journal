import { Button } from "@/components/ui/button";
import { convertMouseEventToPressEvent } from "@/lib/utils";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { useDateFormatter } from "@react-aria/i18n";
import type { CalendarState } from "@react-stately/calendar";
import type { AriaButtonProps } from "@react-types/button";
import type {
	DOMAttributes,
	FocusableElement,
	PressEvent,
} from "@react-types/shared";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

type Props = {
	state: CalendarState;
	calendarProps: DOMAttributes;
	prevButtonProps: AriaButtonProps<"button">;
	nextButtonProps: AriaButtonProps<"button">;
};

const CalendarHead = ({
	state,
	calendarProps,
	prevButtonProps,
	nextButtonProps,
}: Props) => {
	const monthDateFormatter = useDateFormatter({
		month: "long",
		year: "numeric",
		timeZone: state.timeZone,
	});

	const [monthName, _, year] = monthDateFormatter
		.formatToParts(state.visibleRange.start.toDate(state.timeZone))
		.map((part) => part.value);

	return (
		<div className="flex items-center pb-4">
			<VisuallyHidden>
				<h2>{calendarProps["aria-label"]}</h2>
			</VisuallyHidden>
			{/* biome-ignore lint/a11y/useHeadingContent: <explanation> */}
			<h2
				aria-hidden
				className="flex-1 align-center font-bold text-md text-gray-12"
			>
				{monthName} <span className="text-gray-11">{year}</span>
			</h2>
			<button
				onClick={(e) => convertMouseEventToPressEvent(e, "press")}
				{...prevButtonProps}
			>
				<ChevronLeftIcon className="size-4" />
			</button>
			<button
				onClick={(e) => convertMouseEventToPressEvent(e, "press")}
				className={"ml-2"}
				{...nextButtonProps}
			>
				<ChevronRightIcon className="size-4" />
			</button>
		</div>
	);
};

export default CalendarHead;
