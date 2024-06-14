import JobFilterSidebar from "@/components/JobFilterSidebar";
import JobResults from "@/components/JobResults";
import { locationTypes } from "@/lib/job-types";
import { JobFilterValues } from "@/lib/validation";

interface PageProps {
  searchParams: {
    q?: string;
    type?: string;
    location: string;
    remote: boolean;
  }
}

export default async function Home({ searchParams: { q, type, location, remote } }: PageProps) {

  const filterValues: JobFilterValues = {
    q: q,
    type: type,
    location: location,
    remote: remote
  };

  return (
    <main className="flex min-h-screen flex-col justify-between max-w-5xl m-auto px-3 my-10 space-y-3">
      <div className="text-center tracking-tight">
        <h1 className="font-extrabold text-xl md:text-3xl lg:text-5xl">Developer Jobs</h1>
        <h3>Find your dream job!</h3>
      </div>

      <section className="flex flex-col-reverse flex-1 md:flex-row">
        <JobResults filterValues={filterValues} />
        <JobFilterSidebar defaultValues={filterValues} />

      </section>
    </main>
  );
}
