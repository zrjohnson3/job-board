import JobFilterSidebar from "@/components/JobFilterSidebar";
import JobResults from "@/components/JobResults";
import H1 from "@/components/ui/h1";
import { locationTypes } from "@/lib/job-types";
import { JobFilterValues } from "@/lib/validation";
import { Metadata } from "next";

interface PageProps {
  searchParams: {
    q?: string;
    type?: string;
    location: string;
    remote: string;
  }
}

// Generate dynamic title based on the search parameters 
function getTitle({ q, type, location, remote }: JobFilterValues) {
  const titlePrefix = q ? `${q} jobs` : type ? `${type} developer jobs` : remote ? "Remote developer jobs" : "All developer jobs"

  const titleSuffix = location ? ` in ${location}` : "";

  return `${titlePrefix}${titleSuffix}`
}

// Generate dynamic metadata using search parameters the same way as title
function generateMetadata({
  searchParams: { q, type, location, remote }
}: PageProps): Metadata {
  return {
    title: `${getTitle({
      q,
      type,
      location,
      remote: remote === "true",
    })} | Zen Jobs`
  }
}

export default async function Home({ searchParams: { q, type, location, remote } }: PageProps) {

  const filterValues: JobFilterValues = {
    q,
    type,
    location,
    remote: remote === "true",
  };

  return (
    <main className="flex min-h-screen flex-col justify-between max-w-5xl m-auto px-3 my-10 space-y-3">
      <div className="text-center tracking-tight">
        {/* <h1 className="font-extrabold text-xl md:text-3xl lg:text-5xl">Developer Jobs</h1> */}
        <H1>{getTitle(filterValues)}</H1>
        <h3>Find your dream job!</h3>
      </div>

      <section className="flex flex-col-reverse flex-1 md:flex-row">
        <JobResults filterValues={filterValues} />
        <JobFilterSidebar defaultValues={filterValues} />

      </section>
    </main>
  );
}
