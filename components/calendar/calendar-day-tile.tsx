import { cn } from "@/lib/utils";
import type { HabitProps, HabitsRecordsProps } from "@/types/habit.types";
import {
	type CalendarDate,
	getLocalTimeZone,
	isSameMonth,
	isToday,
} from "@internationalized/date";
import { useCalendarCell } from "@react-aria/calendar";
import { useFocusRing } from "@react-aria/focus";
import { mergeProps } from "@react-aria/utils";
import type { CalendarState } from "@react-stately/calendar";
import React from "react";
import { useRef } from "react";

type Props = {
	day: Date;
	state: CalendarState;
	date: CalendarDate;
	currentMonth: CalendarDate;
};

const CalendarDayTile = ({
	day,

	state,
	date,
	currentMonth,
}: Props) => {
	const ref = useRef<HTMLDivElement>(null);
	const { cellProps, buttonProps, isSelected, isDisabled, formattedDate } =
		useCalendarCell({ date }, state, ref);

	const isOutsideMonth = !isSameMonth(currentMonth, date);

	const isDateToday = isToday(date, getLocalTimeZone());

	const { focusProps, isFocusVisible } = useFocusRing();

	return (
		<td
			{...cellProps}
			className={cn("py-0.5 relative px-0.5", isFocusVisible ? "z-10" : "z-0")}
		>
			<div
				{...mergeProps(buttonProps, focusProps)}
				ref={ref}
				hidden={isOutsideMonth}
				className="size-14 outline-none group rounded-md"
			>
				<div
					className={cn(
						"size-full rounded-md flex items-center justify-center",
						"text-gray-12 h-8 w-8 mobile:w-10 mobile:h-10 sm:w-20 sm:h-20 lg:h-10 lg:w-10 laptopL:h-14 laptopL:w-14 xl:w-18 xl:h-18 text-sm font-semibold",
						isDisabled
							? isDateToday
								? "cursor-defaut"
								: "text-gray-8 cursor-defaut"
							: "cursor-pointer bg-gray-3",
						// Focus ring, visible while the cell has keyboard focus.
						isFocusVisible &&
							"ring-1 group-focus:z-2 ring-gray-12 ring-offset-1",
						// Darker selection background for the start and end.
						isSelected && "bg-gray-12 text-gray-1",
						// Hover state for non-selected cells.
						!isSelected && !isDisabled && "hover:ring-2 hover:ring-gray-12",
						// isDateToday && "bg-gray-1 text-primary ring-0 ring-offset-0",
					)}
				>
					{formattedDate}
					{isDateToday && (
						<div
							className={cn(
								"absolute bottom-4 left-1/2 transform -translate-x-1/2 translate-y-1/2 size-1.5 bg-gray-12 rounded-full",
								isSelected && "bg-gray-1",
							)}
						/>
					)}
				</div>
			</div>
		</td>
	);
};

export default CalendarDayTile;
