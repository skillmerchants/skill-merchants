// app/pages/tutors/page.jsx
"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const Tutors = () => {
  const [tutors, setTutors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [bloading, setBloading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [totalTutors, setTotalTutors] = useState(0);
  const itemsPerPage = 6;
  const router = useRouter();
 const [searchKeyword, setSearchKeyword] = useState(''); 

 const fetchTutors = async () => {
   try {
     const response = await fetch(
       `/api/mentor?limit=${itemsPerPage}&skip=${
         (page - 1) * itemsPerPage
       }`,
       {
         method: "GET",
         cache: "no-store",
       }
     );

     if (!response.ok) {
       const errorData = await response.json();
       throw new Error(errorData.message || `Failed to fetch tutors (Status: ${response.status})`);
     }

     const data = await response.json();
     console.log("API response:", data);
     const newTutors = Array.isArray(data.data) ? data.data : [];
     setTutors((prev) => (page === 1 ? newTutors : [...prev, ...newTutors]));
     setTotalTutors(data.total || 0);
     setHasMore((page - 1) * itemsPerPage + newTutors.length < data.total);
     setLoading(false);
   } catch (error) {
     console.error("Error fetching tutors:", error.message);
     setError(error.message || "Failed to fetch tutors. Please try again.");
     setLoading(false);
   }
 };
  useEffect(() => {

    fetchTutors();
  }, [page, router]);


const fetchTutor = async (currentPage, key) => {
    const keyword = key || null ;
    console.log(keyword);
    if (keyword == " " ) {
    fetchTutors();
    }
    // setBloading(true);
    try {
      const response = await fetch(
        `/api/mentor?limit=${itemsPerPage}&skip=${
          (currentPage - 1) * itemsPerPage
        }&category=${encodeURIComponent(keyword)}`,
        {
          method: 'GET',
          cache: 'no-store',
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `Failed to fetch tutors (Status: ${response.status})`);
      }

      const data = await response.json();
      // setBloading(false);
      console.log('API response:', data);
      const newTutors = Array.isArray(data.data) ? data.data : [];
      setTutors((prev) => (currentPage === 1 ? newTutors : [...prev, ...newTutors]));
      setTotalTutors(data.total || 0);
      setHasMore((currentPage - 1) * itemsPerPage + newTutors.length < data.total);
    } catch (error) {
      console.error('Error fetching tutors:', error.message);
      setError(error.message || 'Failed to fetch tutors. Please try again.');
      setLoading(false);
    }
  };

  // Fetch tutors when searchKeyword or page changes
  useEffect(() => {
    if (searchKeyword) {
      fetchTutor(page, searchKeyword);
    }
  }, [page, searchKeyword]);

  // Handle search input change
  const handleSearch = (e) => {
    const key = e.target.value;
    setSearchKeyword(key);
    setTutors([]); // Reset mentors
    setPage(1); // Reset to first page
  };
  const handleLoadMore = () => {
    if (hasMore && !loading) {
      setPage((prev) => prev + 1);
    }
  };
 
  if (loading && page === 1 ) {
    return (
      <div className="min-h-screen flex items-center w-full justify-center sec2">
        <div className="flex items-center space-x-2">
          <svg
            className="w-6 h-6 animate-spin text-indigo-600"
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
          <p className="text-lg text-gray-600 font-medium">Loading tutors...</p>
        </div>
      </div>
    );
  }
 
 
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center sec3 w-full">
        <div className="text-center">
          <p className="text-lg text-red-500 font-medium">{error}</p>
          <button
            onClick={() => {
              setLoading(true);
              setError(null);
              setPage(1);
            }}
            className="mt-4 px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors duration-300"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen sec3 w-full py-12 px-4 sm:px-6 lg:px-8"
      id="mentors"
    >
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
            Meet Our Expert Mentors
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600 leading-relaxed">
            Connect with our collaborative network of seasoned mentors. Book a one-on-one appointment with any of our experts to gain personalized insights and guidance tailored to your needs.
          </p>
        </div>

         <div className=" text-orange-50 mb-4 px-4 py-2 justify-around rounded-3xl flex flex-wrap  bg-indigo-500">
          <h1  className="py-2 font-bold ">Search Tutors by Category or Keyword </h1>
          <p className=" hidden">
            {searchKeyword ? `for "${searchKeyword}"` : ''}
             </p>
             
      <input
        type="text"
        value={searchKeyword}
        onChange={handleSearch}
        placeholder="Enter Category (e.g., tech)🔎 "
        className=" bg-blue-50 border-amber-600 border-2  text-blue-600  px-3 py-2  rounded-3xl w-80 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        
      />
      
         </div>

        <div className="grid grid-cols-1 text-left sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {tutors.length === 0 ? (
            <p className="col-span-full text-center text-gray-600 text-lg font-medium">
              No mentors available at the moment.
            </p>
          ) : (
            tutors.map((tutor) => (
              <div
                key={tutor._id}
                className="sec4 rounded-xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
              >
                <h3 className="text-xl font-bold text-gray-900 truncate">
                  <span className="font-semibold text-blue-600 pr-2">Course:</span> {tutor.course}
                </h3>
                <p className="mt-2 text-gray-600"><span className="font-semibold text-blue-600 pr-2">Mentors name:</span>{tutor.name}</p>
                <p className="mt-2 text-gray-600 line-clamp-3">
                  <span className="font-semibold line-clamp-1 text-blue-600 pr-2">Tutorial Info:</span>
                  {tutor.description}
                </p>
                <p className="mt-2 text-gray-600">
                  <span className="font-semibold text-blue-600 pr-2">Experience:</span> {tutor.experience} years
                </p>
                <p className="mt-2 text-gray-600">
                  <span className="font-semibold text-blue-600 pr-2">Service Duration:</span>{" "}
                  {new Date(tutor.duration).toLocaleDateString()}
                </p>
                <p className="mt-2 text-gray-600">
                  <span className="font-semibold text-blue-600 pr-2">Location:</span> {tutor.location}
                </p>
                <p className="mt-2 text-gray-600">
                  <span className="font-semibold text-blue-600 pr-2">Salary:</span> ${tutor.salary}
                </p>
                <p className="mt-2 text-gray-600">
                  <span className="font-semibold text-blue-600">Availability:</span>{" "}
                  <span className={tutor.availability ? "text-green-600" : "text-red-600"}>
                    {tutor.availability ? "Available" : "Not Available"}
                  </span>
                </p>
                <button
                  className="mt-4 w-full px-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors duration-200"
                  onClick={() => router.push(`/pages/tutor/${tutor._id}`)}
                >
                  Book Appointment
                </button>
              </div>
            ))
          )}
        </div>

        {hasMore && (
          <div className="mt-12 flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6">
            <button
              onClick={() => setPage((prev) => prev + 1)}
              disabled={loading}
              className={`px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors duration-300 ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {loading ? (
                <span className="flex w-full items-center">
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
                disabled={page === 1 || loading}
                className={`px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors duration-200 ${
                  page === 1 || loading ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                Previous
              </button>
              <span className="text-gray-600 font-medium">Page {page}</span>
              <button
                onClick={() => setPage((prev) => prev + 1)}
                disabled={!hasMore || loading}
                className={`px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors duration-200 ${
                  !hasMore || loading ? "opacity-50 cursor-not-allowed" : ""
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
};

export default Tutors;