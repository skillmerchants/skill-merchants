"use client";

import { useState, useEffect } from "react";
import { useRouter, } from "next/navigation";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    setLoading(true);

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({  password }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to reset password");
      }

      setMessage("Password reset successfully. You can now log in.");
      setPassword("");
      setConfirmPassword("");
      router.push("/pages/users/login");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="sec3 py-12 px-4 sm:px-6 lg:px-8 min-h-screen flex items-center justify-center">
              <nav className="fixed  top-0 left-0 right-0 z-50">
            <div className="flex justify-between sec p-1 align-items-lg-center">
                <div className="flex items-center gap-3 mx-15 my-2">
                   <img className="rounded-full w-10 h-10" src="https://images.seeklogo.com/logo-png/17/2/sm-supermalls-logo-png_seeklogo-176299.png" alt="" />
                    <h2 className="text-black font-[700]">Skill Merchants</h2>
                </div>
            </div> 
          </nav>
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
            Reset Password
          </h1>
          <p className="mt-4 text-lg text-gray-600 leading-relaxed">
            Enter a new password for your account.
          </p>
        </div>

        <div className="sec4 rounded-xl shadow-lg p-6">
          {message && (
            <p className="text-green-600 text-center mb-4">{message}</p>
          )}
          {error && (
            <p className="text-red-600 text-center mb-4">{error}</p>
          )}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                New Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="••••••••"
              />
            </div>
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={loading }
              className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                loading 
                  ? "bg-indigo-400 cursor-not-allowed"
                  : "bg-indigo-600 hover:bg-indigo-700"
              } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
            >
              {loading ? "Resetting..." : "Reset Password"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <button onClick={() => router.push("/pages/users/login")}
              className="text-indigo-600 hover:text-indigo-700 font-semibold"
            >
              Back to Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}