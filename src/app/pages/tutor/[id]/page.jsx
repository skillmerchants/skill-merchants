"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { use } from "react";

const MentorDetails = ({ params }) => {
  const [mentor, setMentor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [bookingForm, setBookingForm] = useState({
    userName: "",
    userEmail: "",
    phoneNumber: "",
    appointmentTime: "",
    durationMonths: "",
    paymentMethod: "",
    paymentProof: null,
    notes: "",
  });
  const [bookingError, setBookingError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  // Unwrap params using React.use
  const resolvedParams = use(params);
  const mentorId = resolvedParams.id;

  // Fetch mentor details
  useEffect(() => {
    const fetchMentor = async () => {
      try {
        console.log("Fetching mentor with ID:", mentorId);
        const response = await fetch(`/api/mentor/${mentorId}`);
        if (!response.ok) throw new Error("Failed to fetch mentor details");
        const result = await response.json();
        setMentor(result.data || result); // Handle { data: {...} } or direct object
        setLoading(false);
      } catch (error) {
        console.error("Error fetching mentor:", error);
        setError("Failed to load mentor details");
        setLoading(false);
      }
    };
    fetchMentor();
  }, [mentorId]);

  // Handle form input changes
  const handleBookingChange = (e) => {
    const { name, value, files } = e.target;
    setBookingForm((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  // Handle booking submission
  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    setBookingError(null);
    setIsSubmitting(true);

    // Client-side validation
    if (!bookingForm.userEmail.includes("@")) {
      setBookingError("Please enter a valid email");
      setIsSubmitting(false);
      return;
    }
    if (!bookingForm.phoneNumber.match(/^\+?\d{10,15}$/)) {
      setBookingError("Please enter a valid phone number (10-15 digits)");
      setIsSubmitting(false);
      return;
    }
    if (bookingForm.durationMonths <= 0) {
      setBookingError("Duration must be at least 1 month");
      setIsSubmitting(false);
      return;
    }

    try {
      const formData = new FormData();
      formData.append("mentorId", mentor._id);
      formData.append("mentorName", mentor.name);
      formData.append("userName", bookingForm.userName);
      formData.append("userEmail", bookingForm.userEmail);
      formData.append("phoneNumber", bookingForm.phoneNumber);
      formData.append("appointmentTime", bookingForm.appointmentTime);
      formData.append("durationMonths", bookingForm.durationMonths);
      formData.append("paymentMethod", bookingForm.paymentMethod);
      if (bookingForm.paymentProof) {
        formData.append("paymentProof", bookingForm.paymentProof);
      }
      formData.append("notes", bookingForm.notes);

      const response = await fetch("/api/booking", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      if (response.status === 401 || response.status === 403) {
        router.push('/pages/users/login');
        return;
      }
        // throw new Error(result.message || "Failed to book appointment");

      alert("Appointment booked successfully! Check your email for confirmation.");
      setBookingForm({
        userName: "",
        userEmail: "",
        phoneNumber: "",
        appointmentTime: "",
        durationMonths: "",
        paymentMethod: "",
        paymentProof: null,
        notes: "",
      });
      router.push('/pages/users/dashboard');
    } catch (error) {
      setBookingError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
       <div className="mx-auto  w-full  sec3 h-full overflow-hidden ">
      <div className=" flex items-center p-[20px] text-white relative rounded-t-xl">

  
      </div>
      <div className="flex  p-8 justify-center items-center min-h-screen">
        <div className="text-center space-y-6">
          <div className="w-24 h-24 border-4 border-t-blue-500 border-gray-700 rounded-full animate-spin mx-auto" />
          <div className="text-blue-500 font-semibold text-4xl opacity-90 animate-fadeIn">
            Almost There...
          </div>
          <div className="text-[#9e9e9e] text-sm opacity-80 animate-fadeIn">
            <p>We're getting everything ready for you...</p>
            <p>Sit tight for just a moment.</p>
          </div>
        </div>
      </div>
     
    </div>
    );
  }

  if (error || !mentor) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500">{error || "Mentor not found"}</p>
        <Link
          href="/mentors"
          className="mt-4 inline-block px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
        >
          Back to Mentors
        </Link>
      </div>
    );
  }

  return (
    <div className="sec3 py-32 px-4 sm:px-6 lg:px-8 min-h-screen">
      <div className="container mx-auto max-w-4xl">
        <nav className="fixed align-items-center top-0 left-0 right-0 z-50">
            <div className="flex justify-between sec p-1 align-items-lg-center">
                <div className="flex items-center gap-3 mx-9 my-2">
                   <img className="rounded-full w-10 h-10" src="https://images.seeklogo.com/logo-png/17/2/sm-supermalls-logo-png_seeklogo-176299.png" alt="" />
                    <h2 className="text-black font-[700]">Skill Merchants</h2>
                </div>
                          <button
            onClick={() => router.back()}
            className="m1-4 inline-block text-indigo-600 hover:text-indigo-700 font-semibold"
          >
            ← Back to All Mentors
          </button>
            </div> 
          </nav>        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
            {mentor.name}
          </h1>
          <h2 className="text-xl font-semibold text-gray-700 mt-2">
            {mentor.course} Mentor
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600 leading-relaxed">
            Connect with {mentor.name} for personalized guidance in {mentor.course}. Book a one-on-one appointment to gain expert insights tailored to your goals.
          </p> 

        </div>

        {/* Mentor Details and Booking Form */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Mentor Details */}
          <div className="sec4 rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Mentor Details</h3>
            <div className="space-y-4">
              <p className="text-gray-600">
                <span className="font-semibold">Course:</span> {mentor.course}
              </p>
              <p className="text-gray-600">
                <span className="font-semibold">Experience:</span> {mentor.experience} years
              </p>
              {/* <p className="text-gray-600">
                <span className="font-semibold">Service Duration:</span>{" "}
                {new Date(mentor.duration).toLocaleDateString()}
              </p> */}
              <p className="text-gray-600">
                <span className="font-semibold">Location:</span> {mentor.location}
              </p>
              <p className="text-gray-600">
                <span className="font-semibold">Salary:</span> NGN{mentor.salary} per month
              </p>
              <p className="text-gray-600">
                <span className="font-semibold">Availability:</span>{" "}
                <span className={mentor.availability ? "text-green-600" : "text-red-600"}>
                  {mentor.availability ? "Available" : "Not Available"}
                </span>
              </p>
              <p className="text-gray-600">
                <span className="font-semibold">Description:</span> {mentor.description}
              </p>
            </div>
          </div>

          {/* Booking Form */}
          <div className="sec4 rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Book an Appointment</h3>
            {mentor.availability ? (
              <form onSubmit={handleBookingSubmit} className="space-y-4">
                <div>
                  <label
                    htmlFor="userName"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="userName"
                    name="userName"
                    value={bookingForm.userName}
                    onChange={handleBookingChange}
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="Enter your name"
                  />
                </div>
                <div>
                  <label
                    htmlFor="userEmail"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Your Email
                  </label>
                  <input
                    type="email"
                    id="userEmail"
                    name="userEmail"
                    value={bookingForm.userEmail}
                    onChange={handleBookingChange}
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="Enter your email"
                  />
                </div>
                <div>
                  <label
                    htmlFor="phoneNumber"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phoneNumber"
                    name="phoneNumber"
                    value={bookingForm.phoneNumber}
                    onChange={handleBookingChange}
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="Enter your phone number"
                  />

 
                </div>
                <div className="hidden">
                  <label
                    htmlFor="appointmentTime"
                    className="block text-sm font-medium text-gray-700"
                  >

                    Appointment Time
                  </label>
                  <input
                    type="time"
                    id="appointmentTime"
                    name="appointmentTime"
                    value={{20:57 }|| bookingForm.appointmentTime}
                    onChange={handleBookingChange}
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                <div className="hidden">
                  <label
                    htmlFor="durationMonths"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Duration (Months)
                  </label>
                  <input
                    type="number"
                    id="durationMonths"
                    name="durationMonths"
                    value={1 || bookingForm.durationMonths}
                    onChange={handleBookingChange}
                    required
                    min="1"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="Enter number of months"
                  />
                </div>
                <div className="border-t pt-4">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Payment Details</h3>
                  <p>
                    <strong>Bank Name:</strong> Opay
                  </p>
                  <p>
                    <strong>Account Number:</strong>{" "}
                    <span
                      className="cursor-pointer text-indigo-600 hover:underline"
                      onClick={() => {
                        navigator.clipboard.writeText("9075557245");
                        alert("Account number copied to clipboard!");
                      }}
                    >
                      9075557245
                    </span>
                  </p>
                  <p>
                    <strong>Account Name:</strong> EBUBE ROSE OPUTA
                  </p>
                  <p>
                    <strong>Amount:</strong> NGN
                    {bookingForm.durationMonths
                      ? (mentor.salary * bookingForm.durationMonths).toFixed(2)
                      : mentor.salary.toFixed(2)}{" "}
                    ({bookingForm.durationMonths || 1} month
                    {bookingForm.durationMonths !== "1" ? "s" : ""})
                  </p>
                </div>
                <div>
                  <label
                    htmlFor="paymentMethod"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Payment Method
                  </label>
                  <select
                    id="paymentMethod"
                    name="paymentMethod"
                    value={bookingForm.paymentMethod}
                    onChange={handleBookingChange}
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  >
                    <option value="">Select a payment method</option>
                    <option value="bankTransfer">Bank Transfer</option>
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="paymentProof"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Upload Payment Proof
                  </label>
                  <input
                    type="file"
                    id="paymentProof"
                    name="paymentProof"
                    accept="image/*"
                    onChange={handleBookingChange}
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label
                    htmlFor="notes"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Additional Notes (Optional)
                  </label>
                  <textarea
                    id="notes"
                    name="notes"
                    value={bookingForm.notes}
                    onChange={handleBookingChange}
                    rows="3"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="Any specific topics or questions?"
                  />
                </div>
                {bookingError && <p className="text-sm text-red-600">{bookingError}</p>}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full px-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors duration-200 ${
                    isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  {isSubmitting ? "Booking..." : "Confirm Booking"}
                </button>
              </form>
            ) : (
              <p className="text-red-600">
                This mentor is currently unavailable for bookings.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MentorDetails;