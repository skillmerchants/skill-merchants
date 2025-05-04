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
<div className="bg-gray-100 py-12 px-4 w-full sm:px-6 lg:px-8 min-h-screen">
      <div className="container mx-auto">
        {/* Heading, Subtitle, and Description */}
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
            Explore Exciting Job Opportunities
          </h1>
          <h2 className="text-xl font-semibold text-gray-700 mt-2">
            Tech Solutions Inc
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600 leading-relaxed">
            Discover rewarding career paths with our curated job listings. Whether you’re a seasoned professional or just starting out, find the perfect role to grow your skills and make an impact.
          </p>
        </div>

        {/* Job Listings Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.isArray(job) && job.length > 0 ? (
            job.map((job) => (
              <div
                key={job._id}
                className="bg-white rounded-xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
              >
                <h3 className="text-xl font-bold text-gray-900 truncate">
                  {job.title}
                </h3>
                <p className="text-gray-600 mt-2 font-semibold">{job.company}</p>
                <p className="text-gray-600 mt-2 line-clamp-3">
                  {job.description}
                </p>
                <p className="text-gray-600 mt-2">
                  <span className="font-semibold">Skills:</span> {job.skills}
                </p>
                <p className="text-sm text-gray-500 mt-4">{job.location}</p>
                <p className="text-sm text-gray-500 mt-2">
                  {job.salary ? `$${job.salary}` : "Salary not disclosed"}
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  Posted on: {new Date(job.createdAt).toLocaleDateString()}
                </p>
                <div className="mt-4 flex flex-col sm:flex-row sm:space-x-4 space-y-2 sm:space-y-0">
                  <Link
                    href={`/pages/job/${job._id}`}
                    className="flex-1 text-center px-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors duration-200"
                  >
                    View Details
                  </Link>
                  <a
                    href={job.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 text-center px-4 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors duration-200"
                  >
                    Apply Now
                  </a>
                </div>
              </div>
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500 text-lg font-medium">
              No job listings available at the moment.
            </p>
          )}
        </div>
      </div>
    </div>
    );
  }  catch (error) {
    console.error('Error fetching jobs:', error);
    return [];
  }}