import Image from "next/image";
import prisma from "@/lib/prisma"
import JobListItem from "@/components/JobListItem";
import JobFilterSidebar from "@/components/JobFilterSidebar";

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
    <main className="flex min-h-screen flex-col justify-between max-w-5xl m-auto px-3 my-10 space-y-3">
      <div className="text-center tracking-tight ">
        <h1 className="font-extrabold text-xl md:text-3xl lg:text-5xl">Zen Jobs </h1>
        <h3>Find your dream job!</h3>
      </div>

      <section className="flex flex-col md:flex-row">
        <JobFilterSidebar />
        <div>
          {/* JobListItem */}
          {jobs.map((job) => (
            <JobListItem key={job.id} job={job} />
          ))}
        </div>

      </section>


    </main>
  );
}
