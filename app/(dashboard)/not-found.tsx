import Link from 'next/link'
import React from 'react'

type Props = {}

function NotFound({}: Props) {
    return (
        <main className='text-center'>
            <h2 className="text-3xl">There was a problem.</h2>
            <p>We couldn`&apos`t find ur page</p>
            <p>Go back to the <Link href='/'>Dashboard</Link> </p>

        </main>
    )
}

export default NotFound