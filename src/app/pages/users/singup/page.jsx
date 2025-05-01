"use client"
import axios from "axios"; // Import Axios
import { useRouter } from 'next/navigation'
import { useState } from 'react';
import Link from 'next/link'

export default function UserSignup() {
  const router = useRouter()
  const [error, setError] = useState(null); // State to hold error messages
  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;   
    try {
      // Make a POST request using Axios
      const response = await axios.post("/api/auth/signup", {
        email,
        password,
      });
      // Log the response for debugging
      
      console.log("Response:", response.data);
    
      console.log("Redirecting to login page"); // Redirect to login page
      alert(response.data.message); 
      
      router.push('/pages/users/login'); // Redirect to profile page
      // window.location.href = "/pages/users/login";// Show success message
    } catch (error) {
      console.error("Error during signup:", error);

      if (error.response) {
        // Server responded with a non-2xx status code
        setError(error.response.data.message || "An error occurred during signup.");
      } else {
        // Network error or other issues
        setError("Something went wrong. Please try again.");
      }
    }
  } ;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md space-y-6">
        {/* Header */}
        <h2 className="text-2xl font-bold text-center text-gray-800">User Signup</h2>

        {/* Error Message */}
        {error && <p className="text-red-500 text-sm">{error}</p>}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email Input */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              // value={email}
              // onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              required
            />
          </div>
                
          {/* Password Input */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              // value={password}
              // onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Signup
          </button>
        </form>

        {/* Login Link */}
        <div className="text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link href="/pages/users/login" className="text-blue-600 hover:underline">
            Login here
          </Link>
        </div>
      </div>
    </div>
  );
}