"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AdminBookings() {
  const [bookings, setBookings] = useState([]);
  const [mentors, setMentors] = useState({}); // Store mentors by ID
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetch("/api/booking");
        if (response.status === 401) {
          router.push("/pages/users/login");
          return;
        }
        if (!response.ok) throw new Error("Failed to fetch bookings");
        const result = await response.json();
        console.log(result);
        setBookings(result.data || []);
        // Extract unique mentor IDs
        const mentorIds = [
          ...new Set(result.data.map((booking) => booking.mentorId)),
        ];
 
        await fetchMentors(mentorIds);
      } catch (error) {
        console.error("Error fetching bookings:", error);
        setError("Failed to load bookings");
      } finally {
        setLoading(false);
      }
    };

    const fetchMentors = async (mentorIds) => {
      try {
        const mentorPromises = mentorIds.map(async (id) => {
          const response = await fetch(`/api/mentor/${id}`);
          if (!response.ok) throw new Error(`Failed to fetch mentor ${id}`);
          const result = await response.json();
          return { id, data: result.data || result };
        });

        const mentorResults = await Promise.all(mentorPromises);
        const mentorsData = mentorResults.reduce((acc, { id, data }) => {
          acc[id] = data;
          return acc;
        }, {});
        console.log(mentorResults);
        setMentors(mentorsData);
      } catch (error) {
        console.error("Error fetching mentors:", error);
        setError("Failed to load mentor details");
      }
    };

    fetchBookings();
  }, [router]);

  const updateStatus = async (bookingId, status) => {
    try {
      const response = await fetch(`/api/booking/${bookingId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
        credentials: "include",
      });
      if (!response.ok) throw new Error("Failed to update status");
      const result = await response.json();
      setBookings((prev) =>
        prev.map((b) =>
          b._id === bookingId ? { ...b, paymentStatus: result.data.paymentStatus } : b
        )
      );
      alert("Payment status updated successfully");
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Failed to update payment status");
    }
  };

  if (loading) {
    
    return (
       <div className="mx-auto  w-full sec3 h-full overflow-hidden ">
      
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

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600">{error}</p>
        <button
          
          className="mt-4 inline-block px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
              onClick={() => router.push('/pages/admin/login')}

        >
          Sign In
        </button>
      </div>
    );
  }

  return (
    <div className="sec3 py-30 px-4 sm:px-6 lg:px-8 min-h-screen">
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
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
            Admin: All Bookings
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600 leading-relaxed">
            Manage all bookings and approve payments.
          </p>

        </div>

        {bookings.length === 0 ? (
          <p className="text-center text-gray-600 text-lg">No bookings found.</p>
        ) : (
          <div className="sec4 rounded-xl shadow-lg p-6">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      User
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Mentor
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Course
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date & Time
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Duration
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Payment Proof
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    {/* <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Action
                    </th> */}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {bookings.map((booking) => {
                    const mentor = mentors[booking.mentorId] || {};
                    return (
                      <tr key={booking._id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {booking.userName || "N/A"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {booking.mentorName || mentor.name || "N/A"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {mentor.course || "N/A"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {booking.appointmentTime || "N/A"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {booking.durationMonths
                            ? `${booking.durationMonths} month${
                                booking.durationMonths !== 1 ? "s" : ""
                              }`
                            : "N/A"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          $
                          {(
                            mentor.amount ||
                            (booking.durationMonths || 0) * (mentor.salary || 0) ||
                            0
                          ).toFixed(2)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                            <button
                              onClick={() => router.push(`/pages/admin/dashboard/bookings/${booking._id}`)}
                              className="text-indigo-600 hover:text-indigo-800"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              View more
                            </button>
                         
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <span
                            className={
                              booking.paymentStatus === "confirmed"
                                ? "text-green-600"
                                : "text-yellow-600"
                            }
                          >
                            {booking.paymentStatus
                              ? booking.paymentStatus.charAt(0).toUpperCase() +
                                booking.paymentStatus.slice(1)
                              : "N/A"}
                          </span>
                        </td>
                        {/* <td className="px-6 py-4 whitespace-nowrap text-sm">
                          {booking.paymentStatus === "pending" ? (
                            <button
                              onClick={() => updateStatus(booking._id, "confirmed")}
                              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            >
                              Confirm Payment
                            </button>
                          ) : (
                            <span className="text-gray-500">Confirmed</span>
                          )}
                        </td> */}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}