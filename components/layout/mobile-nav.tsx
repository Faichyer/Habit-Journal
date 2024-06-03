import React from 'react';
import {Sheet, SheetContent, SheetTrigger} from "@/components/ui/sheet";
import {Button} from "@/components/ui/button";
import {Home, LineChart, Package, Package2, PanelLeft, ShoppingCart, Users2} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import Routes from "@/components/navigation/routes";

function MobileNav() {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button size="icon" variant="outline" className="sm:hidden">
                    <PanelLeft className="h-5 w-5" />
                    <span className="sr-only">Toggle Menu</span>
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className="sm:max-w-xs">
                <nav className="grid gap-6 text-lg font-medium">
                    <Link
                        href="#"
                        className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-zinc-200 text-lg font-semibold text-primary-foreground md:text-base"
                    >
                        <Image src={'/images/kurzgesagt-duck.png'} alt="" width={30} height={30} />
                    </Link>
                    {
                        Routes().map((route) => (
                            <Link
                                href={route.path}
                                className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                            >
                                {route.component}
                                {route.title}
                            </Link>
                        ))
                    }
                </nav>
            </SheetContent>
        </Sheet>
    );
}

export default MobileNav;