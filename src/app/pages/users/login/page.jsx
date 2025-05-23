"use client"
import { useRouter } from 'next/navigation'
import { useState } from 'react';
import Link from 'next/link'
// pages/user/login.js
export default function UserLogin() {
  const router = useRouter()
  const [error, setError] = useState(null); // State to hold error messages

    const handleSubmit = async (e) => {
      e.preventDefault();
      const email = e.target.email.value;
      const password = e.target.password.value;
  
      // Perform login logic here (e.g., call an API route)
      console.log({ email, password });
  
   try {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    //console.log("Response:",await response.json());
  
    const data = await response.json();
    setError( data.message);
    if (response.ok) {
  console.log('Login successful') 
      localStorage.setItem('token', data.token);
       // Save token in localStorage
    router.push('/'); // Redirect to profile page

   }
  } catch (error) {
    console.log("Error during signup:", data.message);

    if (error.response) {
      // Server responded with a non-2xx status code
      setError(error.response.data.message || "An error occurred during login.");
    } else {  
      // Network error or other issues
      setError("Response: " + error.message || "An error occurred during login."); 
    }
  }
    } ;
  
    return (
      <div className="min-h-screen flex items-center justify-center sec2">
        <div className="sec4 p-8 rounded-lg shadow-md w-full max-w-md space-y-6">
          {/* Header */}
          <h2 className="text-2xl font-bold text-center text-gray-800">
            User Login
          </h2>
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
                placeholder="Enter your password"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                required
              />
            </div>
              <div>
              <input type="checkbox" required name="terms" id="terms" />
              <label htmlFor="terms" className="ml-2 text-sm text-gray-600">
                <button onClick={() => router.push("/pages/terms")} className="hover:text-blue-600">
              I agree to the Terms & Privacy
            </button>
              </label>
            </div>
            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Login
            </button>
          </form>
  
          {/* Additional Links */}
          <div className="flex items-center justify-between text-sm text-gray-600">
            <button onClick={() => router.push("/pages/users/forgot-password")} className="hover:text-blue-600">
              Forgot Password?
            </button>
            <button onClick={() => router.push("/pages/users/singup")} className="hover:text-blue-600">
              Create an Account

            </button>
          </div>
        </div>
      </div>
    );
  }