import Link from 'next/link'
import React from 'react'

type Props = {}

export default function NotFound({}: Props) {
    return (
        <main className='text-center'>
            <h2 className="text-3xl">We hit a break wall</h2>
            <p>We couldn't find ur habit</p>
            <p>Go back to the <Link className={'text-primary'} href='/habits'>Habits</Link> </p>

        </main>
    )
}