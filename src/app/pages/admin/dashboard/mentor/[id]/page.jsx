"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

const Mentors = () => {
  const [mentors, setMentors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
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

  // Fetch all mentors
  const fetchMentors = async () => {
    try {
      const response = await fetch("/api/mentor");
      if (!response.ok) throw new Error("Failed to fetch mentors");
      const result = await response.json();
      console.log("GET /api/mentor response:", result); // Debug response
      setMentors(Array.isArray(result) ? result : result.data || []);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching mentors:", error);
      setError("Failed to fetch mentors");
      setLoading(false);
    }
  };

  // Fetch mentors on mount
  useEffect(() => {
    fetchMentors();
  }, []);

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

  if (loading) return <p className="text-center text-gray-600">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <button onClick={() => router.back()} className="mb-4 inline-block text-indigo-600 hover:text-indigo-700 font-semibold">
        ← Back to Mentor Listings
      </button>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-6 text-center">
          Manage Mentors
        </h1>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-lg shadow-md mb-8"
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
                type="number"
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
                type="date"
                id="duration"
                name="duration"
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
                className="bg-white p-6 rounded-lg shadow-md"
              >
                <h3 className="text-lg font-semibold text-gray-900">
                  {mentor.name}
                </h3>
                <p className="mt-2 text-gray-600">{mentor.description}</p>
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
                <div className="mt-4 flex justify-between">
                  <button
                    onClick={() => handleEdit(mentor)}
                    className="px-4 py-2 bg-yellow-500 text-white rounded-md shadow-sm hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
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
      </div>
    </div>
  );
};

export default Mentors;