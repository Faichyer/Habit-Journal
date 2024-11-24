import React from 'react';
import PageTitle from "@/components/typography/page-title";
import {Stepper} from "@/components/habits/new-habit/stepper";

async function Page() {

    return (
        <main className="grid flex-1 items-start px-4 gap-4 sm:px-6 sm:py-0 md:gap-8 ">
            <PageTitle title="New Habit"/>
            <div className={"grid flex-1 gap-4 items-start sm:py-0 md:gap-8"}>
                <div className="container px-0 py-6 sm:py-8">
                    <Stepper/>
                </div>
            </div>
        </main>
    );
}

export default Page;