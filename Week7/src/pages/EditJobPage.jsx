import { useState } from "react";
import { useLoaderData, useNavigate, useParams } from "react-router-dom"
import { toast } from "react-toastify";

export default function EditJobPage({updateJobSubmit}) {
    const job=useLoaderData();
    const navigate=useNavigate();
    const {id}=useParams();
    const [formData,setFormData]=useState({
        title:job.title,
        type:job.type,
        location:job.location,
        description:job.description,
        salary:job.salary,
        companyName:job.company.name,
        companyDescription:job.company.description,
        contactEmail:job.company.contactEmail,
        contactPhone:job.company.contactPhone
    });

    const handleSubmitForm=(event)=>{
        event.preventDefault();
        // creating a job with format similar to that in api
        const {title,type,location,description,salary,companyName,companyDescription,contactEmail,contactPhone}=formData;
        
        const updateJob={
            id,
            title,
            type,
            location,
            description,
            salary,
            company : {
                name: companyName,
                description : companyDescription,
                contactEmail,
                contactPhone
            }
        }
        updateJobSubmit(updateJob);
        toast.success("Job updated successfully")
        return navigate(`/jobs/${id}`);
    }

    const handleInputChange=(event)=>{
        setFormData((currData)=>{
            return {...currData,[event.target.name]:event.target.value}
        });
    }
  return (
    <div>
      <section className="bg-indigo-50">
      <div className="container m-auto max-w-2xl py-24">
        <div
          className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0"
        >
          <form onSubmit={handleSubmitForm}>
            <h2 className="text-3xl text-center font-semibold mb-6">Edit Job</h2>

            <div className="mb-4">
              <label htmlFor="type" className="block text-gray-700 font-bold mb-2"
                >Job Type</label
              >
              <select
                id="type"
                name="type"
                value={formData.type}
                className="border rounded w-full py-2 px-3"
                onChange={handleInputChange}
                required
              >
                <option value="Full-Time">Full-Time</option>
                <option value="Part-Time">Part-Time</option>
                <option value="Remote">Remote</option>
                <option value="Internship">Internship</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2"
                >Job Listing Name</label
              >
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                className="border rounded w-full py-2 px-3 mb-2"
                placeholder="eg. Beautiful Apartment In Miami"
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="description"
                className="block text-gray-700 font-bold mb-2"
                >Description</label
              >
              <textarea
                id="description"
                name="description"
                value={formData.description}
                className="border rounded w-full py-2 px-3"
                rows="4"
                placeholder="Add any job duties, expectations, requirements, etc"
                onChange={handleInputChange}
              ></textarea>
            </div>

            <div className="mb-4">
              <label htmlFor="type" className="block text-gray-700 font-bold mb-2"
                >Salary</label
              >
              <select
                id="salary"
                name="salary"
                value={formData.salary}
                className="border rounded w-full py-2 px-3"
                onChange={handleInputChange}
                required
              >
                <option value="Under $50K">Under $50K</option>
                <option value="$50K - 60K">$50K - $60K</option>
                <option value="$60K - 70K">$60K - $70K</option>
                <option value="$70K - 80K">$70K - $80K</option>
                <option value="$80K - 90K">$80K - $90K</option>
                <option value="$90K - 100K">$90K - $100K</option>
                <option value="$100K - 125K">$100K - $125K</option>
                <option value="$125K - 150K">$125K - $150K</option>
                <option value="$150K - 175K">$150K - $175K</option>
                <option value="$175K - 200K">$175K - $200K</option>
                <option value="Over $200K">Over $200K</option>
              </select>
            </div>

            <div className='mb-4'>
              <label className='block text-gray-700 font-bold mb-2'>
                Location
              </label>
              <input
                type='text'
                id='location'
                name='location'
                value={formData.location}
                className='border rounded w-full py-2 px-3 mb-2'
                placeholder='Company Location'
                onChange={handleInputChange}
                required           
              />
            </div>

            <h3 className="text-2xl mb-5">Company Info</h3>

            <div className="mb-4">
              <label htmlFor="company" className="block text-gray-700 font-bold mb-2"
                >Company Name</label
              >
              <input
                type="text"
                id="company"
                name="companyName"
                value={formData.companyName}
                className="border rounded w-full py-2 px-3"
                onChange={handleInputChange}
                placeholder="Company Name"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="company_description"
                className="block text-gray-700 font-bold mb-2"
                >Company Description</label
              >
              <textarea
                id="company_description"
                name="companyDescription"
                value={formData.companyDescription}
                className="border rounded w-full py-2 px-3"
                rows="4"
                placeholder="What does your company do?"
                onChange={handleInputChange}
              ></textarea>
            </div>

            <div className="mb-4">
              <label
                htmlFor="contact_email"
                className="block text-gray-700 font-bold mb-2"
                >Contact Email</label
              >
              <input
                type="email"
                id="contact_email"
                name="contactEmail"
                value={formData.contactEmail}
                className="border rounded w-full py-2 px-3"
                placeholder="Email address for applicants"
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="contact_phone"
                className="block text-gray-700 font-bold mb-2"
                >Contact Phone</label
              >
              <input
                type="tel"
                id="contact_phone"
                name="contactPhone"
                value={formData.contactPhone}
                className="border rounded w-full py-2 px-3"
                placeholder="Optional phone for applicants"
                onChange={handleInputChange}
              />
            </div>

            <div>
              <button
                className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Edit Job
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
    </div>
  )
}
