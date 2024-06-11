import React from 'react'
import { Job } from '@prisma/client'
import Image from 'next/image';
import companyLogoPlaceholder from '../../public/assets/company-logo-placeholder.png';

interface JobListItemProps {

    job: Job;

    // job: {
    //     id: number
    //     title: string
    //     description: string
    //     company: string
    //     location: string
    //     salary: string
    //     type: string
    // }
}

const JobListItem = ({ job: {
    // Only use the properties we need
    title,
    type,
    locationType,
    location,
    salary,
    companyName,
    companyLogoUrl,
    createdAt,
} }: JobListItemProps) => {
    return (
        <article className="flex gap-3 p-5 m-2 border bg-white shadow-lg rounded-lg hover:bg-muted/60">
            <Image
                alt='Company Logo'
                src={companyLogoUrl || companyLogoPlaceholder}
                height={100}
                width={100}
                className='rounded-lg self-center'
            />
            <div className="flex-grow space-y-3">
                <div>
                    <h2 className="text-xl font-bold">{title}</h2>
                    <p className="text-sm text-muted-foreground">{companyName}</p>
                </div>
                <div className="text-sm text-muted-foreground">
                    <p>{type} | {locationType} | {location}</p>
                    <p>{salary}</p>
                </div>
            </div>


            {title}
        </article>
    )
}

export default JobListItem