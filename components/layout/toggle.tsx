"use client"

import React, {useEffect} from 'react';
import {Button} from "@/components/ui/button";
import {Moon, SunMedium} from "lucide-react";
import {useTheme} from "next-themes";

function Toggle() {
    const { setTheme, theme } = useTheme()

    return (
        <Button
            variant="default"
            size="icon"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className={`overflow-hidden rounded-full ${theme === 'dark' ? 'bg-blue-800 hover:bg-blue-900' : 'bg-amber-500 hover:bg-amber-700'} transition-colors`}
        >
            {
                theme === 'dark' ? <Moon className="h-5 w-5" /> : <SunMedium className="h-5 w-5 text-white" />
            }
        </Button>
    );
}

export default Toggle;