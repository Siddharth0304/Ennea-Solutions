import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements
} from "react-router-dom"

import MainLayout from "./Layouts/MainLayout";
import HomePage from "./pages/HomePage";
import JobPage from "./pages/JobPage";
import NotFoundPage from "./pages/NotFoundPage";
import SingleJob, { jobLoader } from "./pages/SingleJob";
import AddJobPage from "./pages/AddJobPage";
import EditJobPage from "./pages/EditJobPage";

export default function App() {
  //Add New Job
  const addJob=async(newJob)=>{
    const res=await fetch('/api/jobs', {
      method : 'POST',
      headers: {
        'Content-Type' : 'application/json'
      },
      body : JSON.stringify(newJob),
    });
    return;
  }

  //Delete Job
  const deleteJob=async(id)=>{
    const res=await fetch(`/api/jobs/${id}`, {
      method : 'DELETE'
    });
    return;
  }

  //Update Job
  const updateJob=async(job)=>{
    const res=await fetch(`/api/jobs/${job.id}`, {
      method : 'PUT',
      headers: {
        'Content-Type' : 'application/json'
      },
      body : JSON.stringify(job),
    });
    return;
  }
  
  const router=createBrowserRouter(
    createRoutesFromElements(
    // Main Layout and surrounds other routes meaning part of every route
    <Route path="/" element={<MainLayout/>}>
      <Route index element={<HomePage/>} />
      <Route path="/jobs" element={<JobPage/>}/>
      <Route path="/jobs/:id" element={<SingleJob deleteJob={deleteJob}/>} loader={jobLoader} />
      <Route path="/edit-job/:id" element={<EditJobPage updateJobSubmit={updateJob} />} loader={jobLoader} />
      <Route path="/add-job" element={<AddJobPage addJobSubmit={addJob} />}  />
      
      <Route path="*" element={<NotFoundPage/>}/>
    </Route>
    )
  );  
  
  return <RouterProvider router={router}/>
}
