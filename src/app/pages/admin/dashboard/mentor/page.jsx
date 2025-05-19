"use client"
import React, { useEffect, useState } from 'react';
import { useRouter } from "next/navigation";
const Tutors = () => {
    const [tutors, setTutors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const router = useRouter();
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
        <div className='flex flex-col items-center justify-center w-full bg-cyan-50 text-black p-10'>
                                <div className='text-2xl font-bold text-blue-700 '>Mentor</div>
                    <div className='text-lg'>A collaborative network of seasoned mentors</div>
                    <div className='text-lg'>Book appointment with any of the experts for one-on-one conversations</div>
                    <button
          onClick={() => router.back()}
          className="my-4 inline-block text-indigo-600 hover:text-indigo-700 font-semibold"
        >
          ← Go to User Dashboard
        </button>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
            {tutors.map((tutor) => (
                <div
                    key={tutor._id}
                    style={{
                        border: '1px solid #ccc',
                        borderRadius: '8px',
                        padding: '16px',
                        width: '300px',
                        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                    }}
                >

                    <h3>{tutor.name}</h3>
                    <p><strong>Course:</strong> {tutor.course}</p>
                    <p><strong>Tutorial Info:</strong> {tutor.description}</p>
                    <p><strong>Experience:</strong> {tutor.experience}</p>
                    <p><strong>Service Duration:</strong> {tutor.duration}</p>
                    <p><strong>Location:</strong> {tutor.location}</p>
                    <p><strong>Salary:</strong> {tutor.salary}</p>
                    <p><strong>Salary:</strong> {tutor.link}</p>
                    <p><strong>Availability:</strong> {tutor.availability ? 'Available' : 'Not Available'}</p>
                    <button
                onClick={() => router.push(`/pages/admin/dashboard/mentor/${tutor._id}`)}
                className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200"
              >
                Edit job details
              </button>
                </div>
            ))}
        </div>
        </div>
        
    );
    return null;
    
} ;

export default Tutors;