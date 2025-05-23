// src/app/jobs/page.jsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function JobsPage() {
  const [jobs, setJobs] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [totalJobs, setTotalJobs] = useState(0);
  const itemsPerPage = 6;
  const router = useRouter();

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

  return (
    <div className="sec w-full py-12 px-4  sm:px-6 lg:px-8 min-h-screen">
      <div className="container mx-auto">
        <div className="text-center mb-12" id="job">
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

        {isLoading && page === 1 ? (
          <div className="flex items-center justify-center">
            <svg
              className="w-6 h-6 animate-spin text-indigo-600 mr-2"
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
            <p className="text-gray-600 text-lg font-medium">Loading jobs...</p>
          </div>
        ) : error ? (
          <div className="text-center">
            <p className="text-red-500 text-lg font-medium">Error: {error}</p>
            <button
              onClick={() => {
                setIsLoading(true);
                setError(null);
                setPage(1);
              }}
              className="mt-4 px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors duration-300"
            >
              Retry
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {jobs.length > 0 ? (
              jobs.map((job) => (
                <div
                  key={job._id}
                  className="sec4 rounded-xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                >
                  <h3 className="text-xl font-bold text-gray-900 truncate">{job.title}</h3>
                  <p className="text-gray-600 mt-2 font-semibold">{job.company}</p>
                  <p className="text-gray-600 mt-2 line-clamp-1">{job.description}</p>
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
                  <div className="mt-4 flex justify-around s">
                    <button
                      onClick={() => router.push(`/pages/job/${job._id}`)}
                      className=" text-center px-4 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors duration-200"
                    >
                      View Details
                    </button>
                    <button className=" text-center px-4 py-1 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors duration-200">
                      <a
                        href={job.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Apply Now
                      </a>
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="col-span-full text-center text-gray-600 text-lg font-medium">
                No job listings available at the moment.
              </p>
            )}
          </div>
        )}

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
    </div>
  );
}