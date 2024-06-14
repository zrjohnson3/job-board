
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import logo from '../../public/assets/zenJobsLogoSvg.svg'
import { Button } from './ui/button'

export default function Navbar() {
    return (
        <header className='shadow-sm'>
            <nav className='max-w-6xl m-auto px-3 py-2 flex items-start justify-between'>
                <Link href='/' className='flex items-center gap-1'>
                    <Image src={logo} alt='Zen Jobs Logo (needs change)' width={120} height={120} />
                    <span className='text-2xl font-thin tracking-tighter'>Zen Jobs</span>
                </Link>
                <div className='flex flex-col space-y-2 p-2'>
                    <Button asChild className='lg:text-lg font-light sm:text-sm sm:font-light'>
                        <Link href='/jobs/new'>Post a Job</Link>
                    </Button>
                    <Button asChild className='lg:text-lg font-light sm:text-sm sm:font-light'>
                        <Link href={'jobs/find'}>Find a job</Link>
                    </Button>
                </div>


            </nav>
        </header>
    )
}


