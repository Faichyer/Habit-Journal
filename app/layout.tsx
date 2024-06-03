import type {Metadata} from 'next'
import Quicksand from 'next/font/local'
import {cn} from "@/lib/utils"
import "./globals.css"
import {ThemeProvider} from "next-themes";
import { Toaster } from '@/components/ui/sonner';

// const inter = Inter({
//     display: 'swap',
//     variable: '--font-inter',
//     src: [
//         {
//             path: '../public/fonts/Inter-Thin.ttf',
//             weight: '100',
//             style: 'normal',
//         },
//         {
//             path: '../public/fonts/Inter-ExtraLight.ttf',
//             weight: '200',
//             style: 'normal',
//         },
//         {
//             path: '../public/fonts/Inter-Light.ttf',
//             weight: '300',
//             style: 'normal',
//         },
//         {
//             path: '../public/fonts/Inter-Regular.ttf',
//             weight: '400',
//             style: 'normal',
//         },
//         {
//             path: '../public/fonts/Inter-Medium.ttf',
//             weight: '500',
//             style: 'normal',
//         },
//         {
//             path: '../public/fonts/Inter-SemiBold.ttf',
//             weight: '600',
//             style: 'normal',
//         },
//         {
//             path: '../public/fonts/Inter-Bold.ttf',
//             weight: '700',
//             style: 'normal',
//         },
//         {
//             path: '../public/fonts/Inter-ExtraBold.ttf',
//             weight: '800',
//             style: 'normal',
//         },
//         {
//             path: '../public/fonts/Inter-Black.ttf',
//             weight: '900',
//             style: 'normal',
//         },
//     ],
// })

const quicksand = Quicksand({
    src: '../public/fonts/Quicksand-VariableFont_wght.ttf',
    display: 'swap',
    variable: '--font-quicksand',
})


export const metadata: Metadata = {
    title: 'Habit Journal',
    description: 'Generated by create next app',
}

export default function RootLayout({ children}: { children: React.ReactNode}) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body
                className={cn(
                    `min-h-screen bg-background font-sans antialiased ${quicksand.variable}`
                )}
            >
                <ThemeProvider
                    attribute="class"
                    defaultTheme="light"
                    enableSystem
                    disableTransitionOnChange
                >
                    {children}
                    <Toaster />
                </ThemeProvider>
            </body>
        </html>
    )
}