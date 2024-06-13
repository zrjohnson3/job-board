import prisma from "@/lib/prisma";
import JobListItem from "@/components/JobListItem";
import { JobFilterValues } from "@/lib/validation";
import { Prisma } from "@prisma/client";

interface JobResultsProps {
    filterValues: JobFilterValues;
}

export default async function JobResults({ filterValues: { q, type, location, remote } }: JobResultsProps) {
    const searchString = q
        ?.split(" ")
        .filter((word) => word.length > 0)
        .join(" & ");

    console.log("Search String:", searchString);

    const searchFilter: Prisma.JobWhereInput = searchString
        ? {
            OR: [
                { title: { contains: searchString, mode: 'insensitive' } },
                { companyName: { contains: searchString, mode: 'insensitive' } },
                { type: { contains: searchString, mode: 'insensitive' } },
                { locationType: { contains: searchString, mode: 'insensitive' } },
                { location: { contains: searchString, mode: 'insensitive' } },
            ],
        }
        : {};

    console.log("Search Filter:", JSON.stringify(searchFilter, null, 2));

    const where: Prisma.JobWhereInput = {
        AND: [
            searchFilter,
            type ? { type } : {},
            location && location !== 'all' ? { location } : {},
            remote ? { locationType: "Remote" } : {},
            { approved: true },
        ],
    };

    console.log("Where Clause:", JSON.stringify(where, null, 2));

    const jobs = await prisma.job.findMany({
        where,
        orderBy: { createdAt: 'desc' },
    });

    console.log("Jobs Found:", jobs.length);

    return (
        <div className="grow space-y-4">
            {jobs.map((job) => (
                <JobListItem key={job.id} job={job} />
            ))}
            {jobs.length === 0 && (
                <p className="m-auto text-center">
                    No jobs found. Try adjusting your search filters.
                </p>
            )}
        </div>
    );
}
