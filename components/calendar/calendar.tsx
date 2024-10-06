"use client";

import CalendarGrid from "@/components/calendar/calendar-grid";
import CalendarHead from "@/components/calendar/calendar-head";
import { Progress } from "@/components/ui/progress";
import {
	createCalendar,
	getLocalTimeZone,
	today,
} from "@internationalized/date";
import {
	type CalendarProps,
	type DateValue,
	useCalendar,
} from "@react-aria/calendar";
import { useLocale } from "@react-aria/i18n";
import { useCalendarState } from "@react-stately/calendar";
import React from "react";

function Calendar(props: CalendarProps<DateValue>) {
	const { locale } = useLocale();
	const state = useCalendarState({
		...props,
		minValue: today(getLocalTimeZone()),
		defaultValue: today(getLocalTimeZone()),
		value: today(getLocalTimeZone()),

		visibleDuration: { months: 1 },
		locale,
		createCalendar,
	});
	const [progress, setProgress] = React.useState(13);

	React.useEffect(() => {
		const timer = setTimeout(() => setProgress(66), 500);
		return () => clearTimeout(timer);
	}, []);

	const { calendarProps, prevButtonProps, nextButtonProps } = useCalendar(
		props,
		state,
	);

	return (
		<div {...calendarProps} className="inline-block text-gray-800">
			<CalendarHead
				state={state}
				calendarProps={calendarProps}
				prevButtonProps={prevButtonProps}
				nextButtonProps={nextButtonProps}
			/>
			<div className="flex gap-8">
				<CalendarGrid state={state} />
			</div>
		</div>
	);
}

export default Calendar;
