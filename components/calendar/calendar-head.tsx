import React from 'react'

type Props = {
    day: string
    shortDay: string
}

const CalendarHead = ({ day, shortDay }: Props) => {
    return (
        <th className="p-2 border-r h-10 lg:w-24 md:w-24 sm:w-20 w-10 xl:text-sm text-xs">
			<span className="xl:block lg:block md:block sm:block hidden">
				{day}
			</span>
            <span className="xl:hidden lg:hidden md:hidden sm:hidden block">
				{shortDay}
			</span>
        </th>
    )
}

export default CalendarHead
