import React from "react";
import Sidebar from "@/components/layout/sidebar";
import { cookies } from "next/headers";
import {createServerComponentClient} from "@supabase/auth-helpers-nextjs";
import {redirect} from "next/navigation";
import ShadSidebar from "@/components/layout/shad-sidebar";
import Header from "@/components/layout/header";

export default async function DashboardLayout({ children }: {children: React.ReactNode}) {
    const supabase = createServerComponentClient({ cookies })
    const { data, error } = await supabase.auth.getUser()

    if (!data.user) {
        redirect('/login')
    }

    return (
        <div className="flex min-h-screen w-full flex-col bg-muted/40 ">
            {/*<Sidebar />*/}
            <ShadSidebar />
            <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
                <Header />
                {children}
            </div>
        </div>
    )
}