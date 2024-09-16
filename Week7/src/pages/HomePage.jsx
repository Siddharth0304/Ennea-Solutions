import Hero from "../components/Hero"
import HomeCards from "../components/HomeCards"
import JobListings from "../components/JobListings"
import ViewAllJobs from "../components/ViewAllJobs"
//Home page
export default function HomePage() {
  return (
    <>
        <Hero title="Job Finder" description="Find the job that fits your skill set" />
        <HomeCards/>
        <JobListings isHome="true" />
        <ViewAllJobs/>
    </>
  )
}
