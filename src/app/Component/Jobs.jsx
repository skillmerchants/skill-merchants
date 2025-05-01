// src/app/jobs/page.jsx
import axios from 'axios'; // Import Axios
import Link from 'next/link';

  export default async function JobsPage() {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/jobs`);
   
   const job = response.data; // Use response.data for Axios
   if (!Array.isArray(job)) {
     throw new Error('Invalid jobs data');
   }
      console.log( 'job:', job);

    return (
      <div className="p-8 bg-gray-100 w-full min-h-screen">
        <h1 className="text-3xl font-bold text-center mb-8">Web Development Intern</h1>
        <h1 className="text-xl font-bold text-center mb-8">Tech Solutions Inc</h1>
        <h1 className="font-bold text-center mb-8">Job Listings</h1>
  
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        { Array.isArray(job) && job.length > 0 ? ( job  .map((job) => ( 
          <div key={job._id} className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-800"> {job.title}</h2>
              <p className="text-gray-600 mt-2">{job.company}</p>
              <p className="text-gray-600 mt-2">{job.description}</p>
              <p className="text-gray-600 mt-2">{job.skills}</p>
              <p className="text-sm text-gray-500 mt-4">{job.location}</p>
              <p className="text-sm text-gray-500 mt-4">{job.salary}</p>
              <p className="text-sm text-gray-500 mt-4">{  (new Date(job.createdAt).toDateString()) }</p>
              <Link href={`/pages/job/${job._id}`} className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 
                rounded hover:bg-blue-600 transition duration-200">
              view job details
            </Link>
              <a
                href={job.url}
                target="_blank"
                rel="noopener noreferrer"
                className="m-4 inline-block bg-blue-500 text-white px-4 py-2 
                rounded hover:bg-blue-600 transition duration-200"
              >
                Apply Now
              </a>
            </div>
          )) ): (
            <p className="text-center text-gray-500">No job listings available.</p>
          )}
        </div>
      </div>
    );
  }  catch (error) {
    console.error('Error fetching jobs:', error);
    return [];
  }}