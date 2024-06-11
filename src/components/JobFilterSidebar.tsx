import React from 'react'
import { Label } from './ui/label'
import { Input } from './ui/input';
import Select from './Select';
import prisma from '@/lib/prisma';
import { jobTypes } from '@/lib/job-types';
import { Button } from './ui/button';

async function filterJobs(formData: FormData) {
    'use server'; // Makes this function run on the server (Server Components feature)

    console.log('Filtering jobs with:', {
        search: formData.get('search'),
        type: formData.get('type'),
        location: formData.get('location'),
        remote: formData.get('remote'),
    });
}

export default async function JobFilterSidebar() {

    const distinctLocations = (await prisma.job
        .findMany({
            where: { approved: true }, // Only approved jobs
            select: { location: true }, // Select only the location field
            distinct: ['location'], // Get distinct locations
        })
        .then((location) => location.map((location) => location.location)) as string[]);

    return (
        <aside className="md:w-[260px] sticky top-0 h-fit bg-background border rounded-lg p-2">
            <form action={filterJobs} >
                <div className='space-y-4'>
                    <div className='flex flex-col gap-2 p-2'>
                        <Label htmlFor='search'>Search</Label>
                        <Input type='text' id='search' name='search' placeholder='Title, Company, etc..' />
                    </div>
                    <div className='flex flex-col gap-2 p-2'>
                        <Label htmlFor='type'>Type</Label>
                        <Select className='' id='type' name='type' defaultValue="">
                            {/* Fetch types from job-types.ts */}
                            {jobTypes.map((type) => (
                                <option key={type} value={type}>
                                    {type}
                                </option>
                            ))}
                        </Select>
                    </div>
                    <div className='flex flex-col gap-2 p-2'>
                        <Label htmlFor='location'>Location</Label>
                        <Select className='' id='location' name='location' defaultValue="all">
                            <option value='all'>All Locations</option>
                            {/* Fetch locations from database */}
                            {distinctLocations.map((location) => (
                                <option key={location} value={location}>
                                    {location}
                                </option>
                            ))}
                        </Select>
                    </div>
                    <div className='flex items-center p-2 gap-2'>
                        <input
                            id='remote'
                            name='remote'
                            type='checkbox'
                            className='scale-125 accent-black'
                        />
                        <Label htmlFor='remote'>Remote Jobs</Label>
                    </div>
                    <Button type='submit' className='w-full p-2'>
                        Filter Jobs
                    </Button>
                </div>


            </form>
        </aside>
    )
}