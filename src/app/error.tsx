"use client"
import H1 from '@/components/ui/h1'
import React from 'react'

export default function Error() {
    return (
        <main className='m-auto my-10 max-w-5xl space-y-5 px-3 text-center'>
            <H1>Error</H1>
            <p>An unexpected error occured</p>
        </main>
    )
}