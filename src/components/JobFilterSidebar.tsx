import React from 'react'
import { Label } from './ui/label'
import { Input } from './ui/input';
import Select from './Select';
import prisma from '@/lib/prisma';
import { jobTypes } from '@/lib/job-types';
import { Button } from './ui/button';
import { jobFilterSchema, JobFilterValues } from '@/lib/validation';
import { redirect } from 'next/navigation';
import FormSubmitButton from './FormSubmitButton';

async function filterJobs(formData: FormData) {
    'use server'; // Makes this function run on the server (Server Components feature)

    console.log('Filtering jobs with:', {
        q: formData.get('q'),
        type: formData.get('type'),
        location: formData.get('location'),
        remote: formData.get('remote'),
    });

    const values = Object.fromEntries(formData.entries()); // Convert formData to an object to use in the query

    const parseResult = jobFilterSchema.safeParse(values); // Validate the values with the schema

    const { q, type, location, remote } = jobFilterSchema.parse(values); // Destructure the values from the parsed result

    const searchParams = new URLSearchParams({
        ...(q && { q: q.trim() }), // Add search parameter if it exists
        ...(type && { type }), // Add type parameter if it exists
        ...(location && { location }), // Add location parameter if it exists
        ...(remote && { remote: 'true' }), // Add remote parameter if it exists

    }); // Create a new URLSearchParams object to store the query parameters

    redirect(`/?${searchParams.toString()}`); // Redirect to the jobs page with the query parameters
}

interface JobFilterSidebarProps {
    defaultValues: JobFilterValues;
}

export default async function JobFilterSidebar({
    defaultValues,
}: JobFilterSidebarProps) {

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
                        <Label htmlFor='q'>Search</Label>
                        <Input
                            type='text'
                            id='q'
                            name='q'
                            placeholder='Title, Company, etc..'
                            defaultValue={defaultValues.q}
                        />
                    </div>
                    <div className='flex flex-col gap-2 p-2'>
                        <Label htmlFor='type'>Type</Label>
                        <Select className='' id='type' name='type' defaultValue={defaultValues.type || ""}>
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
                        <Select className='' id='location' name='location' defaultValue={defaultValues.location || "all"}>
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
                            defaultChecked={defaultValues.remote}
                        />
                        <Label htmlFor='remote'>Remote Jobs</Label>
                    </div>
                    {/* <Button type='submit' className='w-full p-2'>
                        Filter Jobs
                    </Button> */}
                    <FormSubmitButton className='w-full p-2'>
                        Filter Jobs
                    </FormSubmitButton>
                </div>


            </form>
        </aside>
    )
}