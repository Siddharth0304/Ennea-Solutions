import { useState, useEffect } from "react";
import JobListing from "./JobListing";
import Spinners from "./Spinners";

export default function JobListings({isHome=false}) {
  const [jobs,setJobs]=useState([]);
  const [loading,setLoading]=useState(true);

  useEffect(()=>{  //Hook used to fetch data from local api
    const fetchJobs=async()=>{
      const apiUrl=isHome?"/api/jobs?_limit=3":"/api/jobs"  //using isHome prop to display only 3 jobs in home page and all jobs in joblisting page
      try{
        const res=await fetch(apiUrl);
        const data=await res.json();
        setJobs(data);
      }
      catch(err){
        console.log("Error in Fetching data",err);
      }
      finally{
        setLoading(false);  //even though fetching is successful or not we want to stop loading
      }
      
    }
    fetchJobs();
  },[])
  return (
    <section className="bg-blue-50 px-4 py-10">
        <div className="container-xl lg:container m-auto">
          <h2 className="text-3xl font-bold text-indigo-500 mb-6 text-center">
            {isHome?"Recent Jobs" : "Browse Jobs"}
          </h2>
          {loading ?
            (<Spinners loading={loading} />) :
            (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <>
                  {jobs.map((job)=>(
                    <JobListing key={job.id} job={job}/> //Using JobListing component to display single job
                  ))}
                </>
                </div>
            )
          }
        
        </div>
      </section>
  )
}
