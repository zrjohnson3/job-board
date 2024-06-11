import Image from "next/image";
import prisma from "@/lib/prisma"
import JobListItem from "@/components/JobListItem";

export default async function Home() {

  const jobs = await prisma.job.findMany({
    where: {
      approved: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  })

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Zen Job Board! </h1>

      {/* JobListItem */}
      {jobs.map((job) => (
        <JobListItem key={job.id} job={job} />
      ))}

    </main>
  );
}
