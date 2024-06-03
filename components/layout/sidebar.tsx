"use client";

import React, { useState } from 'react'
import { HiMenuAlt3 } from 'react-icons/hi'
import { MdOutlineDashboard } from 'react-icons/md'
import { RiSettings4Line } from 'react-icons/ri'
import { TbReportAnalytics } from 'react-icons/tb'
import { AiOutlineUser } from 'react-icons/ai'
import { BsCalendar2Check } from 'react-icons/bs'
import Link from 'next/link'
import Image from 'next/image'
import {useTheme} from "next-themes";


const Sidebar = () => {
    const menus = [
        { name: 'Dashboard', link: '/', icon: MdOutlineDashboard },
        { name: 'Account', link: '/account', icon: AiOutlineUser },
        { name: 'Habits', link: '/habits', icon: BsCalendar2Check },
        {
            name: 'Analytics',
            link: '/analytics',
            icon: TbReportAnalytics,
            margin: true,
        },
        { name: 'Setting', link: '/settings', icon: RiSettings4Line },
    ]
    const [open, setOpen] = useState(true)
    const {} = useTheme()

    return (
        <section className="flex gap-6">
            <div
                className={` min-h-screen ${
                    open ? 'w-72' : 'w-16'
                } duration-500 px-4 border-r border-rose-100 dark:border-rose-950`}
            >
                <div className="py-3 flex justify-end">
                    <HiMenuAlt3
                        size={26}
                        className="cursor-pointer"
                        onClick={() => setOpen(!open)}
                    />
                </div>

                <div className={`mt-4 ${open ? 'w-20' : 'w-10'} mx-auto`}>
                    <Image src={'/images/kurzgesagt-duck.png'} alt="" width={30} height={30} />
                </div>
                <div className="mt-4 text-2xl justify-center">
                    {open ? 'Habit Journal' : ''}
                </div>
                <span className="text-lg text-red-400">
					{' '}
                    {open ? 'by Kurzgesagt' : ''}
				</span>

                <div className="mt-24 flex flex-col gap-4 relative">
                    {menus?.map((menu, i) => (
                        <Link
                            href={menu?.link}
                            key={i}
                            className={` ${
                                menu?.margin && 'mt-5'
                            } group flex items-center text-sm  gap-3.5 font-medium p-2 h-12 hover:bg-red-500 rounded-md`}
                        >
                            <div>
                                {React.createElement(menu?.icon, {
                                    size: '20',
                                })}
                            </div>
                            <h2
                                style={{
                                    transitionDelay: `${i + 3}00ms`,
                                }}
                                className={`whitespace-pre duration-500 ${
                                    !open &&
                                    'opacity-0 translate-x-32 overflow-hidden'
                                }`}
                            >
                                {menu?.name}
                            </h2>
                            <h2
                                className={`${
                                    open && 'hidden'
                                } absolute left-48 font-semibold whitespace-pre rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}
                            >
                                {menu?.name}
                            </h2>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Sidebar
