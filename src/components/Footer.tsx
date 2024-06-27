import { Link as LinkIcon } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

export default function Footer() {
    return (
        <footer className='border-t'>
            <div className='mx-auto max-w-6xl space-y-5 px-3 py-5'>
                <div className='flex flex-wrap gap-5 items-center justify-evenly text-muted-foreground'>

                    <Link href='/about' className='hover:underline'>
                        About Us
                    </Link>
                    <Link href='/mission' className='hover:underline'>
                        Mission
                    </Link>
                    <Link href='/contact' className='hover:underline'>
                        Contact
                    </Link>
                    <Link href='/contact' className='hover:underline'>
                        Terms of Service
                    </Link>
                    <Link href='/contact' className='hover:underline'>
                        Privacy Policy
                    </Link>
                </div>
            </div>
            <div className='text-center text-sm text-muted-foreground'>
                {new Date().getFullYear()} Zen Jobs, Inc. All rights reserved.
            </div>
        </footer>
    )
}
