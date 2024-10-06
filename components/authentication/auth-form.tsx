"use client"

import React, {useState} from 'react';
import { cn } from "@/lib/utils"
import { Icons } from "@/components/ui/icons"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useFormState, useFormStatus } from 'react-dom';
import {login, signup} from "@/components/authentication/actions";

type Props = {
    isLoginPage? : boolean
}

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

function AuthForm({ isLoginPage }: Props) {
    const { pending } = useFormStatus()

    return (
        // <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
        //     <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
        //         <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
        //             {isLoginPage ? "Welcome back" : "Create an account" }
        //         </h1>
        //         <form className="space-y-4 md:space-y-6" onSubmit={(e) => handleSubmit(e, email, password)}>
        //             <div>
        //                 <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
        //                 <input name="email" id="email"
        //                        value={email} onChange={(e) => setEmail(e.target.value)}
        //                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500"
        //                        placeholder="name@mail.com"/>
        //             </div>
        //             <div>
        //                 <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
        //                 <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}
        //                        name="password" id="password" placeholder="••••••••"
        //                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500"/>
        //             </div>
        //             <div className="flex items-center justify-between">
        //                 <div className="flex items-start">
        //                     <div className="flex items-center h-5">
        //                         <input id="remember" aria-describedby="remember" type="checkbox"
        //                                className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"/>
        //                     </div>
        //                     <div className="ml-3 text-sm">
        //                         <label className="text-gray-500 dark:text-gray-300">Remember me</label>
        //                     </div>
        //                 </div>
        //                 <Link href="#" className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">
        //                     Forgot password?
        //                 </Link>
        //             </div>
        //             <button type="submit"
        //                     className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
        //                 {isLoginPage ? "Sign in" : "Sign up"}
        //             </button>
        //             <p className="text-sm font-light text-gray-500 dark:text-gray-400">
        //                 {
        //                     isLoginPage
        //                         ? "Don't have an account?"
        //                         : "Already have an account?"
        //                 }
        //                 <Link href={isLoginPage ? '/register' : '/login'} className="pl-2 font-medium text-primary-600 hover:underline dark:text-primary-500">
        //                     {isLoginPage ? "Sign up" : "Sign in"}
        //                 </Link>
        //             </p>
        //         </form>
        //     </div>
        // </div>
        <div className={cn("grid gap-6")}>
            <form>
                <div className="grid gap-2">
                    <div className="grid gap-1">
                        <Label className="sr-only" htmlFor="email">
                            Email
                        </Label>
                        <Input
                            id="email"
                            placeholder="name@example.com"
                            type="email"
                            autoCapitalize="none"
                            autoComplete="email"
                            autoCorrect="off"
                            name={'email'}
                            disabled={pending}
                        />
                    </div>
                    <div className="grid gap-1">
                        <Label className="sr-only" htmlFor="email">
                            Password
                        </Label>
                        <Input
                            id="password"
                            placeholder={isLoginPage ? "Enter your password" : "Create a password"}
                            type="password"
                            autoCapitalize="none"
                            name={'password'}
                            autoComplete="password"
                            autoCorrect="off"
                            disabled={pending}
                        />
                    </div>
                    <Button disabled={pending}
                    formAction={isLoginPage ? login : signup}
                    >
                        {pending && (
                            <Icons.spinner className="mr-2 h-4 w-4 animate-spin"/>
                        )}
                        {
                            isLoginPage ? "Sign In with Email" : "Register with Email"
                        }
                    </Button>
                </div>
            </form>
            <div className="relative">
                <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t"/>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
                </div>
            </div>
            <Button variant="outline" type="button" disabled={pending}>
                {pending ? (
                    <Icons.spinner className="mr-2 h-4 w-4 animate-spin"/>
                ) : (
                    <Icons.gitHub className="mr-2 h-4 w-4"/>
                )}{" "}
                GitHub
            </Button>
        </div>
    );
}

export default AuthForm;