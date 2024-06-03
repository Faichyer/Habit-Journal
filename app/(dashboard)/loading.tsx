import React from 'react'

type Props = {}

export default function Loading({}: Props) {
    return (
        <main className='text-center'>
            <h2 className="text-primary">Loading...</h2>
            <p>Hopefully not for too long !</p>
        </main>
    )
}