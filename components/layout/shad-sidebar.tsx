import React from 'react';
import Link from "next/link";
import {Home, LineChart, Package, Package2, Settings, ShoppingCart, Users2} from "lucide-react";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip";
import Image from "next/image";
import Routes from "@/components/navigation/routes";

function ShadSidebar() {
    return (
        <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
            <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
                <Link
                    href="#"
                    className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
                >
                    <Image src={'/images/kurzgesagt-duck.png'} alt="" width={30} height={30} />
                </Link>
                {
                    Routes().map((route) => (
                        <TooltipProvider key={route.title}>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Link
                                        href={route.path}
                                        className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                                    >
                                        {route.component}
                                        <span className="sr-only">{route.title}</span>
                                    </Link>
                                </TooltipTrigger>
                                <TooltipContent side="right">{route.title}</TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    ))
                }
            </nav>
            <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Link
                                href="#"
                                className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                            >
                                <Settings className="h-5 w-5"/>
                                <span className="sr-only">Settings</span>
                            </Link>
                        </TooltipTrigger>
                        <TooltipContent side="right">Settings</TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </nav>
        </aside>
    );
}

export default ShadSidebar;