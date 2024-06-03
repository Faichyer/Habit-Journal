import React from 'react';
import {CalendarCheck2, Home, LineChart, SlidersHorizontal, UserRound} from "lucide-react";

function Routes() {
    return [
        {
            title: 'Dashboard',
            path: '/',
            component: <Home className="h-5 w-5" />,
        },
        {
            title: 'Account',
            path: '/account',
            component: <UserRound className="h-5 w-5" />,
        },
        {
            title: 'Habits',
            path: '/habits',
            component: <CalendarCheck2 className="h-5 w-5" />,
        },
        {
            title: 'Analytics',
            path: '/analytics',
            component: <LineChart className="h-5 w-5"/>,
        },
        {
            title: 'Settings',
            path: '/settings',
            component: <SlidersHorizontal className="h-5 w-5" />,
        }
    ]
}

export default Routes;