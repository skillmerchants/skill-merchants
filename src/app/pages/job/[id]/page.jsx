// app/job/[id]/page.jsx
'use client'; // Mark as client component

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';

export default function JobDetails() {
  const [job, setJob] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const params = useParams();
  const { id } = params;

  useEffect(() => {
    async function fetchJobDetails() {
      if (!id) {
        setError('Job ID is missing');
        setIsLoading(false);
        return;
      }

      try {
        const response = await fetch(`/api/jobs/${id}`, {
          method: 'GET',
          cache: 'no-store', // Adjust caching as needed
        });

        if (!response.ok) {
          throw new Error('Failed to fetch job details');
        }

        const data = await response.json();
        console.log('Job details:', data);
        setJob(data);
      } catch (err) {
        console.error('Error fetching job details:', err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchJobDetails();
  }, [id]); // Re-run if id changes

  if (isLoading) {
    return (
       <div className="mx-auto  w-full  sec2 h-full overflow-hidden ">

      <div className="flex  p-8 justify-center items-center min-h-screen">
        <div className="text-center space-y-6">
          <div className="w-24 h-24 border-4 border-t-blue-500 border-gray-700 rounded-full animate-spin mx-auto" />
          <div className="text-blue-500 font-semibold text-4xl opacity-90 animate-fadeIn">
            Almost There...
          </div>
          <div className="text-gray-700 text-sm opacity-80 animate-fadeIn">
            <p>We're getting everything ready for you...</p>
            <p>Sit tight for just a moment.</p>
          </div>
        </div>
      </div>
     
    </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-gray-200">
        <p className="text-lg text-red-500 font-medium">Error: {error}</p>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-gray-200">
        <p className="text-lg text-gray-600 font-medium">Job not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center sec3 py-12 px-4 sm:px-6 lg:px-8">
              <nav className="fixed  top-0 left-0 right-0 z-50">
            <div className="flex justify-between sec p-1 align-items-lg-center">
                <div className="flex items-center gap-3 mx-9 my-2">
                   <img className="rounded-full w-10 h-10" src="https://images.seeklogo.com/logo-png/17/2/sm-supermalls-logo-png_seeklogo-176299.png" alt="" />
                    <h2 className="text-black font-[700]">Skill Merchants</h2>
                </div>
                          <button
            onClick={() => router.back()}
            className="m1-4 inline-block text-indigo-600 hover:text-indigo-700 font-semibold"
          >
            ← Back to Job Listings
          </button>
            </div> 
          </nav> 
      <div className="max-w-2xl w-full space-y-6">
        {/* Back Button */}
  

        {/* Job Details Card */}
        <div className="sec4 rounded-2xl shadow-xl p-8 transition-all duration-300 hover:shadow-2xl">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">{job.title}</h2>
          <div className="space-y-4">
            <div className="flex items-center">
              <span className="text-lg font-semibold text-gray-700">Company:</span>
              <span className="ml-2 text-lg text-gray-600">{job.company}</span>
            </div>
            <div>
              <span className="text-lg font-semibold text-gray-700">Description:</span>
              <p className="mt-1 text-gray-600 leading-relaxed">{job.description}</p>
            </div>
            <div className="flex items-center">
              <span className="text-lg font-semibold text-gray-700">Location:</span>
              <span className="ml-2 text-gray-600">{job.location}</span>
            </div>
            <div className="flex items-center">
              <span className="text-lgLy font-semibold text-gray-700">Salary:</span>
              <span className="ml-2 text-gray-600">
                {job.salary ? `$${job.salary}` : 'Not disclosed'}
              </span>
            </div>
            <div className="flex items-center">
              <span className="text-lg font-semibold text-gray-700">Posted:</span>
              <span className="ml-2 text-gray-600">
                {new Date(job.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </span>
            </div>
            {job.skills && (
              <div>
                <span className="text-lg font-semibold text-gray-700">Skills:</span>
                <p className="mt-1 text-gray-600">{job.skills}</p>
              </div>
            )}
          </div>
          <a
            href={job.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-block w-full sm:w-auto px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors duration-300"
          >
            Apply Now
          </a>
        </div>
      </div>
    </div>
  );
}