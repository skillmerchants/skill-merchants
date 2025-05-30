"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function UserSignup() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [termsAgreed, setTermsAgreed] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState({
    score: 0,
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    special: false,
  });

  // Password strength checker
  useEffect(() => {
    const checkPasswordStrength = (pwd) => {
      const checks = {
        length: pwd.length >= 8,
        uppercase: /[A-Z]/.test(pwd),
        lowercase: /[a-z]/.test(pwd),
        number: /[0-9]/.test(pwd),
        special: /[!@#$%^&*(),.?":{}|<>]/.test(pwd),
      };
      const score = Object.values(checks).filter(Boolean).length;
      setPasswordStrength({ score, ...checks });
    };

    if (password) {
      checkPasswordStrength(password);
    } else {
      setPasswordStrength({
        score: 0,
        length: false,
        uppercase: false,
        lowercase: false,
        number: false,
        special: false,
      });
    }
  }, [password]);

  const handleSubmit = async (e) => {      
    setLoading(true);
    e.preventDefault();
    setMessage(null);
    setError(null);

    // Validate password strength
    if (passwordStrength.score < 4) {
      setError("Password is too weak. Please meet all requirements.");
      return;
    }

    // Validate terms agreement
    if (!termsAgreed) {
      setError("You must agree to the Terms & Privacy.");
      return;
    }

    try {
      const response = await axios.post("/api/auth/signup", {
        email,
        password,
      });
      setLoading(false);
      setMessage(response.data.message || "Signup successful! Redirecting to login...");
      setEmail("");
      setPassword("");
      setTermsAgreed(false);

      router.push("/pages/users/login");
      
    } catch (error) {
      console.error("Error during signup:", error);
      setError(
        error.response?.data?.message ||
          "An error occurred during signup. Please try again."
      );
    }
  };

  // Strength meter label and color
  const getStrengthLabel = () => {
    switch (passwordStrength.score) {
      case 0:
      case 1:
        return { label: "Weak", color: "bg-red-500" };
      case 2:
      case 3:
        return { label: "Medium", color: "bg-yellow-500" };
      case 4:
      case 5:
        return { label: "Strong", color: "bg-green-500" };
      default:
        return { label: "", color: "" };
    }
  };

  const strength = getStrengthLabel();
if (loading ) {
    return (
       <div className="mx-auto  w-full  sec3 h-full overflow-hidden ">

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

  return (
    <div className="min-h-screen flex items-center justify-center sec3">
      <nav className="fixed top-0 left-0 right-0 z-50 sec2 shadow">
        <div className="flex justify-between items-center px-4 py-2 max-w-7xl mx-auto">
          <div className="flex items-center gap-3">
            <img
              className="rounded-full w-10 h-10"
              src="https://images.seeklogo.com/logo-png/17/2/sm-supermalls-logo-png_seeklogo-176299.png"
              alt="Skill Merchants Logo"
            />
            <h2 className="text-black font-bold text-lg">Skill Merchants</h2>
          </div>
        </div>
      </nav>

      <div className="sec4 p-8 rounded-xl shadow-lg w-full max-w-md space-y-6 mt-16">
        <h2 className="text-2xl font-bold text-center text-gray-800">User Signup</h2>

        {/* Success/Error Messages */}
        {message && (
          <p className="text-green-600 text-sm text-center">{message}</p>
        )}
        {error && (
          <p className="text-red-500 text-sm text-center">{error}</p>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email Input */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>

          {/* Password Input */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
            {/* Password Strength Meter */}
            {password && (
              <div className="mt-2">
                <div className="flex items-center gap-2">
                  <div
                    className={`h-2 w-1/3 rounded ${
                      strength.label ? strength.color : "bg-gray-300"
                    }`}
                  ></div>
                  <span className="text-sm text-gray-600">
                    {strength.label || "Enter a password"}
                  </span>
                </div>
                <ul className="mt-2 text-sm text-gray-600 space-y-1">
                  <li className={passwordStrength.length ? "text-green-600" : ""}>
                    {passwordStrength.length ? "✓" : "✗"} At least 8 characters
                  </li>
                  <li className={passwordStrength.uppercase ? "text-green-600" : ""}>
                    {passwordStrength.uppercase ? "✓" : "✗"} At least one uppercase letter
                  </li>
                  <li className={passwordStrength.lowercase ? "text-green-600" : ""}>
                    {passwordStrength.lowercase ? "✓" : "✗"} At least one lowercase letter
                  </li>
                  <li className={passwordStrength.number ? "text-green-600" : ""}>
                    {passwordStrength.number ? "✓" : "✗"} At least one number
                  </li>
                  <li className={passwordStrength.special ? "text-green-600" : ""}>
                    {passwordStrength.special ? "✓" : "✗"} At least one special character
                  </li>
                </ul>
              </div>
            )}
          </div>

          {/* Terms Checkbox */}
          <div className="flex items-center">
            <input
              type="checkbox"
              id="terms"
              name="terms"
              checked={termsAgreed}
              onChange={(e) => setTermsAgreed(e.target.checked)}
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <label
              htmlFor="terms"
              className="ml-2 text-sm text-gray-600"
            >
              I agree to the{" "}
              <span
                onClick={() => router.push("/pages/terms")}
                className="text-indigo-600 hover:text-indigo-700 cursor-pointer"
              >
                Terms & Privacy
              </span>
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={passwordStrength.score < 4 || !termsAgreed}
            className={`w-full py-2 px-4 rounded-md text-sm font-medium text-white ${
              passwordStrength.score < 4 || !termsAgreed
                ? "bg-indigo-400 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-700 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            }`}
          >
            Signup
          </button>
        </form>

        {/* Login Navigation */}
        <div className="text-center text-sm text-gray-600">
          Already have an account?{" "}
          <span
            onClick={() => router.push("/pages/users/login")}
            className="text-indigo-600 hover:text-indigo-700 cursor-pointer"
          >
            Login here
          </span>
        </div>
      </div>
    </div>
  );
}