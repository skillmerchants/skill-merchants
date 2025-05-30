"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

const  Mentors =  () => {
  const [mentors, setMentors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [totalTutors, setTotalTutors] = useState(0);
  const itemsPerPage = 6;
  
  const [showFullDescription, setShowFullDescription] = useState(false);
  const truncateText = (text, length) => {
    if (text.length <= length) return text;
    return text.slice(0, length) + "...";
  };
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    description: "",
    course: "",
    location: "",
    salary: "",
    duration: "",
    availability: true,
    experience: "",
    link: "",
  });
  const [editId, setEditId] = useState(null);
  const nameInputRef = useRef(null); // Ref for the Name input

   // Define fetchMentors outside useEffect
const fetchMentors = async (currentPage) => {
  try {
    const response = await fetch(
      `/api/mentor?limit=${itemsPerPage}&skip=${
        (currentPage - 1) * itemsPerPage
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
    setMentors((prev) => (currentPage === 1 ? newTutors : [...prev, ...newTutors]));
    setTotalTutors(data.total || 0);
    setHasMore((currentPage - 1) * itemsPerPage + newTutors.length < data.total);
    setLoading(false);
  } catch (error) {
    console.error("Error fetching tutors:", error.message);
    setError(error.message || "Failed to fetch tutors. Please try again.");
    setLoading(false);
  }
};

// Use useEffect to call fetchTutорони

useEffect(() => {
  fetchMentors(page);
}, [page, router]);

// Example: Call fetchTutors elsewhere, e.g., in a button click handler

  //   try {
  //   // Construct query string from queryParams and pagination
  //   const params = new URLSearchParams({
  //     ...queryParams,
  //     limit: itemsPerPage.toString(),
  //     skip: ((page - 1) * itemsPerPage).toString(),
  //   }).toString();

  //   const response = await fetch(`${endpoint}?${params}`, {
  //     ...options,
  //     headers: {
  //       "Content-Type": "application/json",
  //       ...options.headers,
  //     },
  //   });

  //   if (!response.ok) {
  //     const errorData = await response.json();
  //     throw new Error(errorData.message || `Failed to fetch data (Status: ${response.status})`);
  //   }

  //   const data = await response.json();
  //   console.log("API response:", data);

  //   const newData = Array.isArray(data.data) ? data.data : [];
  //   if (setData) {
  //     setData((prev) => (page === 1 ? newData : [...prev, ...newData]));
  //   }
  //   if (setTotal) setTotal(data.total || 0);
  //   if (setHasMore) {
  //     setHasMore((page - 1) * itemsPerPage + newData.length < data.total);
  //   }
  //   if (setLoading) setLoading(false);

  //   return { success: true, data: newData, total: data.total };
  // } catch (error) {
  //   console.error(`Error fetching data from ${endpoint}:`, error.message);
  //   if (setError) {
  //     setError(error.message || "Failed to fetch data. Please try again.");
  //   }
  //   if (setLoading) setLoading(false);
  //   return { success: false, error: error.message };
  // }

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Handle form submission (create or update)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    const method = editId ? "PUT" : "POST";
    const url = editId ? `/api/mentor/${editId}` : "/api/mentor";

    try {
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      console.log(`${method} /api/mentor response:`, result); // Debug response
      if (!response.ok) throw new Error(result.message || "Operation failed");

      // Reset form
      setFormData({
        name: "",
        category: "",
        description: "",
        course: "",
        location: "",
        salary: "",
        duration: "",
        availability: true,
        experience: "",
        link: "",
      });
      setEditId(null);

      // Fetch updated mentors list
      await fetchMentors();

      alert(result.message);
    } catch (error) {
      console.error("Error:", error);
      setError(error.message);
    }
  };

  // Handle edit
  const handleEdit = (mentor) => {
    setEditId(mentor._id);
    setFormData({
      name: mentor.name,
      category: mentor.category,
      description: mentor.description,
      course: mentor.course,
      location: mentor.location,
      salary: mentor.salary,
      link: mentor.link,
      duration: new Date(mentor.duration).toISOString().split("T")[0], // Format for date input
      availability: mentor.availability,
      experience: mentor.experience,
    });

    // Scroll to and focus the Name input
    if (nameInputRef.current) {
      nameInputRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
      nameInputRef.current.focus();
    }
  };

  // Handle delete
  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this mentor?")) return;

    try {
      const response = await fetch(`/api/mentor/${id}`, {
        method: "DELETE",
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || "Failed to delete mentor");

      // Fetch updated mentors list
      await fetchMentors();

      alert(result.message);
    } catch (error) {
      console.error("Error deleting mentor:", error);
      setError(error.message);
    }
  };

  if (loading) {
    return (
       <div className="mx-auto  w-full   h-full overflow-hidden ">
  
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
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="min-h-screen sec3 py-30 px-4 sm:px-6 lg:px-8">
              <nav className="fixed align-items-center top-0 left-0 right-0 z-50">
            <div className="flex justify-between sec p-1 align-items-lg-center">
                          <button
            onClick={() => router.back()}
            className="m1-4 inline-block text-indigo-600 hover:text-indigo-700 font-semibold"
          >
            ← Back 
          </button>
                <div className="flex items-center gap-3 mx-9 my-2">
                   <img className="rounded-full w-10 h-10" src="https://images.seeklogo.com/logo-png/17/2/sm-supermalls-logo-png_seeklogo-176299.png" alt="" />
                    <h2 className="text-black hidden md:inline font-[700]">Skill Merchants</h2>
                </div>

            </div> 
          </nav>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-6 text-center">
          Manage Mentors
        </h1>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="sec4 p-6 rounded-lg shadow-md mb-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                ref={nameInputRef} // Attach ref to Name input
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Enter mentor's name"
              />
            </div>
            <div>
              <label
                htmlFor="category"
                className="block text-sm font-medium text-gray-700"
              >
                Category
              </label>
              <input
                type="text"
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Enter mentor's category"
              />
            </div>
            <div>
              <label
                htmlFor="course"
                className="block text-sm font-medium text-gray-700"
              >
                Course
              </label>
              <input
                type="text"
                id="course"
                name="course"
                value={formData.course}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Enter course name"
              />
            </div>
            <div>
              <label
                htmlFor="location"
                className="block text-sm font-medium text-gray-700"
              >
                Location
              </label>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Enter location"
              />
            </div>
            <div>
              <label
                htmlFor="salary"
                className="block text-sm font-medium text-gray-700"
              >
                Salary ($)
              </label>
              <input
                type="number"
                id="salary"
                name="salary"
                value={formData.salary}
                onChange={handleChange}
                required
                min="0"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Enter salary"
              />
            </div>
            <div>
              <label
                htmlFor="duration"
                className="block text-sm font-medium text-gray-700"
              >
                Duration
              </label>
              <input
                type="text"
                id="duration"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label
                htmlFor="link"
                className="block text-sm font-medium text-gray-700"
              >
                Link
              </label>
              <input
                type="url"
                id="link"
                name="link"
                value={formData.link}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label
                htmlFor="experience"
                className="block text-sm font-medium text-gray-700"
              >
                Experience (Years)
              </label>
              <input
                type="number"
                id="experience"
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                required
                min="0"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Enter years of experience"
              />
            </div>
            <div className="flex items-center">
              <input
                id="availability"
                name="availability"
                type="checkbox"
                checked={formData.availability}
                onChange={handleChange}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label
                htmlFor="availability"
                className="ml-2 block text-sm text-gray-700"
              >
                Available
              </label>
            </div>
          </div>
          <div className="mt-6">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows="4"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Describe the mentor's expertise"
            />
          </div>
          <div className="mt-6 flex space-x-4">
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {editId ? "Update Mentor" : "Create Mentor"}
            </button>
            {editId && (
              <button
                type="button"
                onClick={() => {
                  setEditId(null);
                  setFormData({
                    name: "",
                    category: "",
                    description: "",
                    course: "",
                    location: "",
                    salary: "",
                    duration: "",
                    availability: true,
                    experience: "",
                    link : "",
                  });
                }}
                className="px-4 py-2 bg-gray-500 text-white rounded-md shadow-sm hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              >
                Cancel
              </button>
            )}
          </div>
          {error && (
            <p className="mt-4 text-center text-sm text-red-600">{error}</p>
          )}
        </form>

        {/* Mentors List */}
        <h2 className="text-2xl font-semibold mb-4">Mentors List</h2>
        {mentors.length === 0 ? (
          <p className="text-gray-600">No mentors found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {mentors.map((mentor) => (
              <div
                key={mentor._id}
                className="sec4 p-6 rounded-lg shadow-md"
              >
                <h3 className="text-lg font-semibold text-gray-900">
                  {mentor.name}
                </h3>
                <p className="mt-1">
                  <strong>Course:</strong> {mentor.course}
                </p>
                <p className="mt-1">
                  <strong>Location:</strong> {mentor.location}
                </p>
                <p className="mt-1">
                  <strong>Link:</strong> {mentor.link}
                </p>
                <p className="mt-1">
                  <strong>Salary:</strong> ${mentor.salary}
                </p>
                <p className="mt-1">
                  <strong>Duration:</strong>{" "}
                  {new Date(mentor.duration).toLocaleDateString()}
                </p>
                <p className="mt-1">
                  <strong>Availability:</strong>{" "}
                  {mentor.availability ? "Yes" : "No"}
                </p>
                <p className="mt-1">
                  <strong>Experience:</strong> {mentor.experience} years
                </p>
                <p className="mt-2 text-gray-600 ">
                  {showFullDescription ? mentor.description : truncateText(mentor.description, 100)}
                </p>
                {mentor.description.length > 100 && (
                  <button
                    type="button"
                    onClick={() => setShowFullDescription(!showFullDescription)}
                    className="text-indigo-600 hover:text-indigo-800 text-sm"
                  >
                    {showFullDescription ? "Show Less" : "Show More"}
                  </button>
                )}
                <div className="mt-4 flex justify-between">
                  <button
                    onClick={() => handleEdit(mentor)}
                    className="px-4 py-2 sec5 text-white rounded-md shadow-sm hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(mentor._id)}
                    className="px-4 py-2 bg-red-500 text-white rounded-md shadow-sm hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
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

export default Mentors;