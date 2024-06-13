import Image from "next/image";
import prisma from "@/lib/prisma"
import JobListItem from "@/components/JobListItem";

export default async function JobResults() {

    const jobs = await prisma.job.findMany({
        where: {
            approved: true,
        },
        orderBy: {
            createdAt: 'desc',
        },
    })

    return (
        <div>
            {/* JobListItem */}
            {jobs.map((job) => (
                <JobListItem key={job.id} job={job} />
            ))}
        </div>
    )
}