"use client"
import React, { useEffect, useState } from 'react';

const Tutors = () => {
    const [tutors, setTutors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTutors = async () => {
            try {
                const response = await fetch('/api/mentor'); // Replace with your API endpoint
                const data = await response.json();
                setTutors(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching tutors:', error);
                setLoading(false);
                setError('Failed to fetch ads');

            }
        };

        fetchTutors();
    }, []);

    if (loading) {
        return <p> Loading...</p>;
    }
    if (error) return <p className="text-center text-red-500">{ error}</p>;
    if (tutors.length === 0) {
        return <p> No tutors available</p>;
    };
    return (
<div className="bg-gray-100 w-full py-12 px-4 sm:px-6 lg:px-8">
  <div className="container mx-auto">
    {/* Heading and Description */}
    <div className="text-center mb-12">
      <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
        Meet Our Expert Mentors
      </h1>
      <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600 leading-relaxed">
        Connect with our collaborative network of seasoned mentors. Book a one-on-one appointment with any of our experts to gain personalized insights and guidance tailored to your needs.
      </p>
    </div>

    {/* Mentors Grid */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {tutors.length === 0 ? (
        <p className="col-span-full text-center text-gray-500 text-lg font-medium">
          No mentors available at the moment.
        </p>
      ) : (
        tutors.map((tutor) => (
          <div
            key={tutor._id}
            className="bg-white rounded-xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
          >
            <h3 className="text-xl font-bold text-gray-900 truncate">
              {tutor.name}
            </h3>
            <p className="mt-2 text-gray-600 line-clamp-3">
              <span className="font-semibold">Tutorial Info:</span>{" "}
              {tutor.description}
            </p>
            <p className="mt-2 text-gray-600">
              <span className="font-semibold">Course:</span> {tutor.course}
            </p>
            <p className="mt-2 text-gray-600">
              <span className="font-semibold">Experience:</span>{" "}
              {tutor.experience} years
            </p>
            <p className="mt-2 text-gray-600">
              <span className="font-semibold">Service Duration:</span>{" "}
              {new Date(tutor.duration).toLocaleDateString()}
            </p>
            <p className="mt-2 text-gray-600">
              <span className="font-semibold">Location:</span> {tutor.location}
            </p>
            <p className="mt-2 text-gray-600">
              <span className="font-semibold">Salary:</span> ${tutor.salary}
            </p>
            <p className="mt-2 text-gray-600">
              <span className="font-semibold">Availability:</span>{" "}
              <span
                className={
                  tutor.availability ? "text-green-600" : "text-red-600"
                }
              >
                {tutor.availability ? "Available" : "Not Available"}
              </span>
            </p>
            <button
              className="mt-4 w-full px-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors duration-200"
              onClick={() => {
                // Placeholder for booking logic
                alert(`Book an appointment with ${tutor.name}`);
              }}
            >
              Book Appointment
            </button>
          </div>
        ))
      )}
    </div>
  </div>
</div>
        
    );
    return null;
    
} ;

export default Tutors;