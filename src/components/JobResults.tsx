import prisma from "@/lib/prisma";
import { JobFilterValues } from "@/lib/validation";
import { Prisma } from "@prisma/client";
import JobListItem from "./JobListItem";

interface JobResultsProps {
    filterValues: JobFilterValues;
}

export default async function JobResults({
    filterValues: { q, type, location, remote },
}: JobResultsProps) {
    const searchString = q
        ?.split(" ")
        .filter((word) => word.length > 0)
        .join(" & ");

    const searchFilter: Prisma.JobWhereInput = searchString
        ? {
            OR: [
                { title: { search: searchString } },
                { companyName: { search: searchString } },
                { type: { search: searchString } },
                { locationType: { search: searchString } },
                { location: { search: searchString } },
            ],
        }
        : {};

    const where: Prisma.JobWhereInput = {
        AND: [
            searchFilter,
            type ? { type } : {},
            location ? { location } : {},
            remote ? { locationType: "Remote" } : {},
            { approved: true }, // Only approved jobs - switch to false to see unapproved jobs / all jobs  (Switch back to true to see only approved jobs for production!)
        ],
    };

    const jobs = await prisma.job.findMany({
        where,
        orderBy: { createdAt: "desc" },
    });

    return (
        <div className="grow space-y-4">
            {jobs.map((job) => (
                <JobListItem job={job} key={job.id} />
            ))}
            {jobs.length === 0 && (
                <p className="m-auto text-center">
                    No jobs found. Try adjusting your search filters.
                </p>
            )}
        </div>
    );
}

