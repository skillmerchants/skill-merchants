"use client";

import axios from "axios";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";


export default function JobsPage() {
  const router = useRouter();
  const [jobs, setJobs] = useState([]); // State to store jobs
  const [deletingId, setDeletingId] = useState(null); // State for delete operation
  const [error, setError] = useState(null); // State for error handling

 // Log the token for debugging  
  
  // Fetch jobs on component mount
  useEffect(() => {
    
    const fetchJobs = async () => {

      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/jobs`);
        const jobData = response.data;

        if (!Array.isArray(jobData)) {
          throw new Error("Invalid jobs data");
        }

        setJobs(jobData); // Update state with fetched jobs
      } catch (err) {
        console.error("Error fetching jobs:", err);
        setError(err.message || "Failed to load jobs");
      }
    };

    fetchJobs();
  }, []); // Empty dependency array ensures this runs once on mount

  // Handle job deletion
  const handleDelete = async (_id) => {
    setDeletingId(_id);

    try {
      const response = await fetch(`/api/jobs/${_id}`, { method: "DELETE" });

      if (!response.ok) {
        throw new Error("Failed to delete job");
      }

      // Update jobs state to remove the deleted job
      setJobs((prevJobs) => prevJobs.filter((job) => job._id !== _id));
    } catch (err) {
      console.error("Error deleting job:", err);
      setError(err.message || "Failed to delete job");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="p-8 bg-gray-100 w-full min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-8">Web Development Intern</h1>
      <h1 className="text-xl font-bold text-center mb-8">Tech Solutions Inc</h1>
      <button
        onClick={() => router.push("/pages/admin/dashboard/jobPost")}
        className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200"
      >
        Post Job
      </button>
      <h1 className="font-bold text-center mb-8">Job Listings</h1>

      {/* Error Message */}
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {Array.isArray(jobs) && jobs.length > 0 ? (
          jobs.map((job) => (
            <div key={job._id} className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-800">{job.title}</h2>
              <p className="text-gray-600 mt-2">{job.company}</p>
              <p className="text-gray-600 mt-2">{job.description}</p>
              <p className="text-gray-600 mt-2">{job.skills}</p>
              <p className="text-sm text-gray-500 mt-4">{job.location}</p>
              <p className="text-sm text-gray-500 mt-4">{job.salary}</p>
              <p className="text-sm text-gray-500 mt-4">
                {new Date(job.createdAt).toDateString()}
              </p>
              <button
                onClick={() => router.push(`/pages/admin/dashboard/jobs/${job._id}`)}
                className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200"
              >
                Edit job details
              </button>
              <button
                onClick={() => handleDelete(job._id)}
                disabled={deletingId === job._id}
                className="px-4 py-2 mx-7 bg-red-600 text-white rounded hover:bg-red-700 focus:outline-none"
              >
                {deletingId === job._id ? "Deleting..." : "Delete"}
              </button>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No job listings available.</p>
        )}
      </div>
    </div>
  );
}