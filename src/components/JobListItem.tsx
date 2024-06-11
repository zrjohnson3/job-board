import React from 'react'
import { Job } from '@prisma/client'
import Image from 'next/image';
import companyLogoPlaceholder from '../../public/assets/company-logo-placeholder.png';
import { Banknote, Briefcase, Calendar, Clock, Globe2, MapPin } from 'lucide-react';
import { formatMoney, relativeDate } from '@/lib/utils';

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

                    <p className='flex items-center gap-1.5 sm:hidden md:p-4 lg:p-4 '>
                        <Briefcase size={16} className="shrink-0" />
                        {type}
                    </p>
                    <p className='flex items-center gap-1.5 '>
                        <MapPin size={16} className="shrink-0" />
                        {locationType}
                    </p>
                    <p className='flex items-center gap-1.5'>
                        <Globe2 size={16} className="shrink-0" />
                        {location || "Worldwide"}
                    </p>
                    <p className='flex items-center gap-1.5'>
                        <Banknote size={16} className="shrink-0" />
                        {formatMoney(salary)}
                    </p>
                    <p className='flex items-center gap-1.5  sm:hidden md:p-4 lg:p-4 '>
                        <Clock size={16} className="shrink-0" />
                        {relativeDate(createdAt)}
                    </p>
                </div>
            </div>


            {title}
        </article >
    )
}

export default JobListItem