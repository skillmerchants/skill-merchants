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
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [totalJobs, setTotalJobs] = useState(0);
  const itemsPerPage = 6;
  const [isLoading, setIsLoading] = useState(true);

 // Log the token for debugging  
  
  // Fetch jobs on component mount
  useEffect(() => {
      async function fetchJobs() {
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/jobs?limit=${itemsPerPage}&skip=${
              (page - 1) * itemsPerPage
            }`,
            {
              cache: "no-store",
            }
          );
  
          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || `Failed to fetch jobs (Status: ${response.status})`);
          }
  
          const data = await response.json();
          console.log("API response:", data);
  
          if (!Array.isArray(data.data)) {
            throw new Error("Invalid jobs data");
          }
  
          const newJobs = data.data;
          setJobs((prev) => (page === 1 ? newJobs : [...prev, ...newJobs]));
          setTotalJobs(data.total || 0);
          setHasMore((page - 1) * itemsPerPage + newJobs.length < data.total);
        } catch (err) {
          console.error("Error fetching jobs:", err.message);
          setError(err.message);
        } finally {
          setIsLoading(false);
        }
      }
  
      fetchJobs();
    }, [page]);
  
  // useEffect(() => {
    
  //   const fetchJobs = async () => {

  //     try {
  //       const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/jobs`);
  //       if (!response.ok) {
  //         const errorData = await response.json();
  //         throw new Error(errorData.message || `Failed to fetch jobs (Status: ${response.status})`);
  //       }

  //       const data = await response.json();
  //       console.log("API response:", data);

  //       setJobs(data); // Update state with fetched jobs
  //     } catch (err) {
  //       console.error("Error fetching jobs:", err);
  //       setError(err.message || "Failed to load jobs");
  //     }
  //   };

  //   fetchJobs();
  // }, []); // Empty dependency array ensures this runs once on mount

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
      <div className="flex justify-between mb-8">
        <button
          onClick={() => router.back()}
          className="mt-4 inline-block text-indigo-600 hover:text-indigo-700 font-semibold"
        >
          ← Go to User Dashboard
        </button>
        <button
          onClick={() => router.push("/pages/admin/dashboard/jobPost")}
          className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200"
        >
        Post Job
      </button>

      </div>
      <h1 className="font-bold text-center mb-8">Job Listings</h1>

      {/* Error Message */}
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {Array.isArray(jobs) && jobs.length > 0 ? (
          jobs.map((job) => (
            <div key={job._id} className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-800">{job.title}</h2>
              <p className="text-gray-600 mt-2">{job.company}</p>
              <p className="text-gray-600 line-clamp-1 mt-2">{job.description}</p>
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
              {hasMore && (
          <div className="mt-12 flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6">
            <button
              onClick={() => setPage((prev) => prev + 1)}
              disabled={isLoading}
              className={`px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors duration-300 ${
                isLoading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {isLoading ? (
                <span className="flex items-center">
                  <svg
                    className="w-5 h-5 animate-spin mr-2 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8h8a8 8 0 01-16 0z"
                    />
                  </svg>
                  Loading...
                </span>
              ) : (
                "Load More"
              )}
            </button>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                disabled={page === 1 || isLoading}
                className={`px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors duration-200 ${
                  page === 1 || isLoading ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                Previous
              </button>
              <span className="text-gray-600 font-medium">Page {page}</span>
              <button
                onClick={() => setPage((prev) => prev + 1)}
                disabled={!hasMore || isLoading}
                className={`px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors duration-200 ${
                  !hasMore || isLoading ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                Next
              </button>
            </div>
          </div>
        )}
    </div>
  );
}