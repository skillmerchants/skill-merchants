'use client';

import React, { useState, useEffect } from 'react';

export default function PostJob({ params }) {
  const resolvedParams = React.use(params); // Unwrap the params Promise
  const { id } = resolvedParams; // Extract the job ID
  console.log('Job ID:', id);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    company: '',
    url: '',
    salary: '',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Fetch job data for editing
  useEffect(() => {
    if (id) {
      const fetchJob = async () => {
        try {
          const response = await fetch(`/api/jobs/${id}`);
          if (!response.ok) {
            throw new Error('Failed to fetch job');
          }
          const jobData = await response.json();
          setFormData({
            title: jobData.title || '',
            description: jobData.description || '',
            location: jobData.location || '',
            company: jobData.company || '',
            url: jobData.url || '',
            salary: jobData.salary || '',
          });
        } catch (err) {
          setError(err.message || 'Failed to load job data');
        }
      };
      fetchJob();
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const method = id ? 'PUT' : 'POST';
      const url = id ? `/api/jobs/${id}` : '/api/jobs';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(errorData || `Failed to ${id ? 'update' : 'create'} job`);
      }

      const jobData = await response.json();
      console.log('Job processed:', jobData);
      setSuccess(`Job ${id ? 'updated' : 'posted'} successfully!`);
      setFormData({
        title: '',
        description: '',
        location: '',
        company: '',
        url: '',
        salary: '',
      });
    } catch (err) {
      setError(err.message || 'An unexpected error occurred');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center sec3">
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
      <div className="w-full max-w-3xl p-8 sec4 shadow-lg rounded-lg">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          {id ? 'Edit Job' : 'Post a New Job'}
        </h1>

        {/* Success Message */}
        {success && <p className="text-green-500 text-sm mb-4">{success}</p>}

        {/* Error Message */}
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
              Job Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter job title"
            />
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Job Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows="4"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter job description"
            ></textarea>
          </div>

          {/* Salary */}
          <div>
            <label htmlFor="salary" className="block text-sm font-medium text-gray-700">
              Salary (NGN)
            </label>
            <input
              type="number"
              id="salary"
              name="salary"
              value={formData.salary}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter salary"
            />
          </div>

          {/* Location */}
          <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-700">
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
              placeholder="Enter job location"
            />
          </div>

          {/* Company */}
          <div>
            <label htmlFor="company" className="block text-sm font-medium text-gray-700">
              Company Name
            </label>
            <input
              type="text"
              id="company"
              name="company"
              value={formData.company}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter company name"
            />
          </div>

          {/* URL */}
          <div>
            <label htmlFor="url" className="block text-sm font-medium text-gray-700">
              Job URL
            </label>
            <input
              type="url"
              id="url"
              name="url"
              value={formData.url}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter job URL"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {id ? 'Update Job' : 'Post Job'}
          </button>
        </form>
      </div>
    </div>
  );
}
