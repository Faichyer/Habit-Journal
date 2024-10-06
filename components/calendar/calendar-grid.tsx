import type { HabitProps, HabitsRecordsProps } from "@/types/habit.types";
import {
	type DateDuration,
	endOfMonth,
	getWeeksInMonth,
} from "@internationalized/date";
import { useCalendarGrid } from "@react-aria/calendar";
import type { CalendarState } from "@react-stately/calendar";
import React from "react";
import CalendarDayTile from "./calendar-day-tile";
import CalendarHead from "./calendar-head";

type Props = {
	state: CalendarState;
	offset?: DateDuration;
};

const CalendarGrid = ({ state, offset = {} }: Props) => {
	const startDate = state.visibleRange.start.add(offset);
	const endDate = endOfMonth(startDate);
	const { gridProps, headerProps, weekDays } = useCalendarGrid(
		{
			startDate,
			endDate,
			weekdayStyle: "short",
		},
		state,
	);

	// Get the number of weeks in the month so we can render the proper number of rows.
	const weeksInMonth = getWeeksInMonth(startDate, "en-US");

	return (
		<table {...gridProps} cellPadding="0" className="flex-1">
			<thead {...headerProps}>
				<tr>
					{weekDays.map((day, index) => (
						// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
						<th key={index} className="uppercase text-xs text-gray-11 pb-4">
							{day}
						</th>
					))}
				</tr>
			</thead>
			<tbody>
				{
					// @ts-ignore
					[...new Array(weeksInMonth).keys()].map((weekIndex) => (
						<tr key={weekIndex}>
							{state.getDatesInWeek(weekIndex, startDate).map((date, index) => {
								if (!date) {
									return <td key={date} />;
								}

								return (
									<CalendarDayTile
										key={date.toString()}
										state={state}
										date={date}
										currentMonth={startDate}
										day={new Date()}
									/>
								);
							})}
						</tr>
					))
				}
			</tbody>
		</table>
	);
};

export default CalendarGrid;
