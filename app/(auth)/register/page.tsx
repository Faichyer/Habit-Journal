"use client"

import React, {useState} from 'react';
import AuthForm from "@/components/authentication/auth-form";
import {useRouter} from "next/navigation";
import {createClientComponentClient} from "@supabase/auth-helpers-nextjs";

function Page() {
    const [error, setError] = useState('')
    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>, email: string, password: string) => {
        e.preventDefault()

        const supabase = createClientComponentClient()

        const {error} = await supabase.auth.signUp({ email, password, options: { emailRedirectTo: `${location.origin}/api/auth/callback` }})

        if (error) {
            setError(error.message)
        }

        if (!error) {
            router.push('/verify')
        }
    }

    return (
        <React.Fragment>
            <AuthForm/>

            {error && (
                <div className='error'>{error}</div>
            )}
        </React.Fragment>
    );
}

export default Page;