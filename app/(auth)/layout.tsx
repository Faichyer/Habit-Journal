import React from 'react';
import Link from "next/link";
import Image from "next/image";
import { cookies } from 'next/headers'
import {createServerComponentClient} from "@supabase/auth-helpers-nextjs";
import {redirect} from "next/navigation";

export default async function LoginLayout({ children }: {children: React.ReactNode}) {
    const supabase = createServerComponentClient({cookies})
    const {data, error} = await supabase.auth.getSession()

    if (data.session) {
        redirect('/')
    }

    return (
        <div className="container relative hidden h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
            <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
                <Image width={32} height={32} className="mr-2" src="/images/kurzgesagt-duck.png" alt="logo"/>
                <div className="absolute inset-0 bg-zinc-900"/>
                <div className="relative z-20 mt-auto">
                    <blockquote className="space-y-2">
                        <p className="text-lg">
                            &ldquo;After carefully researching the science behind habits,
                            talking to experts, and trying it ourselves, we created this app.
                            It contains a step by step tutorial that will help you to change your life in a sustainable way.&rdquo;
                        </p>
                        <footer className="text-sm">Kurzgesagt</footer>
                    </blockquote>
                </div>
            </div>
            <div className="lg:p-8">
                <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                    <div className="flex flex-col space-y-2 text-center">
                        <h1 className="text-2xl font-semibold tracking-tight">
                            Create an account
                        </h1>
                        <p className="text-sm text-muted-foreground">
                            Enter your email below to create your account
                        </p>
                    </div>
                    {children}
                    <p className="px-8 text-center text-sm text-muted-foreground">
                        By clicking continue, you agree to our{" "}
                        <Link
                            href="/terms"
                            className="underline underline-offset-4 hover:text-primary"
                        >
                            Terms of Service
                        </Link>{" "}
                        and{" "}
                        <Link
                            href="/privacy"
                            className="underline underline-offset-4 hover:text-primary"
                        >
                            Privacy Policy
                        </Link>
                        .
                    </p>
                </div>
            </div>
        </div>
)
}
