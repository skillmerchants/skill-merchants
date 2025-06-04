"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Dashboard() {
  const [bookings, setBookings] = useState([]);
  const [mentors, setMentors] = useState({}); // Store mentors by ID
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [noBookings, setNoBookings] = useState(false); // New state for empty bookings
  const router = useRouter();

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetch("/api/booking/user", { credentials: "include" });
        if (response.status === 401 || response.status === 403) {
          router.push("/pages/users/login");
          return;
        }
        if (!response.ok) throw new Error("Failed to fetch bookings");
        const result = await response.json();

        if (!result.data || result.data.length === 0) {
          setBookings([]);
          setNoBookings(true);
          setLoading(false);
          return;
        }

        setBookings(result.data);
        setNoBookings(false);

        // Extract unique mentor IDs
        const mentorIds = [...new Set(result.data.map((booking) => booking.mentorId))];
        if (mentorIds.length > 0) {
          await fetchMentors(mentorIds);
        }
      } catch (error) {
        console.error("Error fetching bookings:", error);
        setError("Failed to load bookings");
        setBookings([]);
        setNoBookings(true);
      } finally {
        setLoading(false);
      }
    };

    const fetchMentors = async (mentorIds) => {
      try {
        const mentorPromises = mentorIds.map(async (id) => {
          const response = await fetch(`/api/mentor/${id}`, { credentials: "include" });
          if (!response.ok) throw new Error(`Failed to fetch mentor ${id}`);
          const result = await response.json();
          return { id, data: result.data || result };
        });

        const mentorResults = await Promise.all(mentorPromises);
        const mentorsData = mentorResults.reduce((acc, { id, data }) => {
          acc[id] = data;
          return acc;
        }, {});
        setMentors(mentorsData);
      } catch (error) {
        console.error("Error fetching mentors:", error);
        setError("Failed to load mentor details");
      }
    };

    fetchBookings();
  }, [router]);


  if (error) {
    return (
      <div className="text-center sec2 py-12">
        <p className="text-red-600 mb-4">{error}</p>
        <div className="space-x-4">
          <button
            onClick={() => {
              setLoading(true);
              setError(null);
              fetchBookings();
            }}
            className="inline-block px-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Retry
          </button>
          <Link
            href="/#mentors"
            className="inline-block px-4 py-2 bg-gray-200 text-gray-800 font-semibold rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
          >
            Browse Mentors
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="sec1 py-32 px-4 sm:px-6 lg:px-8 min-h-screen">
              <nav className="fixed  top-0 left-0 right-0 z-50">
            <div className="flex justify-between sec p-1 align-items-lg-center">
                <div className="flex items-center gap-3 mx-9 my-2">
                   <img className="rounded-full w-10 h-10" src="https://images.seeklogo.com/logo-png/17/2/sm-supermalls-logo-png_seeklogo-176299.png" alt="" />
                    <h2 className="text-black font-[700]">Skill Merchants</h2>
                </div>
                          <button
             onClick={() => router.push("/#mentors")}
            className="mt-1 inline-block text-indigo-600 hover:text-indigo-700 font-semibold"
          >
            ← Back to All Mentors
          </button>
            </div> 
          </nav>
      <div className="container mx-auto max-w-5xl">
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
            Your Bookings
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600 leading-relaxed">
            View all your booked appointments with mentors, including payment status.
          </p>
          {/* <Link
            href="/#mentors"
            className="mt-4 inline-block px-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Browse Mentors
          </Link> */}
        </div>

        {noBookings ? (
          <div className="text-center py-8">
            <p className="text-gray-600 text-lg mb-4">You haven't booked any appointments yet.</p>
            <Link
              href="/#mentors"
              className="inline-block px-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Book a Mentor
            </Link>
          </div>
        ) : (
          <div className="sec4 rounded-xl shadow-lg p-6">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-400">
                <thead className="">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Mentor
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Course
                    </th>
                    {/* <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date & Time
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Duration
                    </th> */}
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Payment Status
                    </th>
                  </tr>
                </thead>
                <tbody className=" divide-y divide-gray-400">
                  {bookings.map((booking) => {
                    const mentor = mentors[booking.mentorId] || {};
                    return (
                      <tr key={booking._id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {booking.mentorName || mentor.name || "N/A"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {mentor.course || "N/A"}
                        </td>
                        {/* <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {booking.appointmentTime || "N/A"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {booking.durationMonths
                            ? `${booking.durationMonths} month${
                                booking.durationMonths !== 1 ? "s" : ""
                              }`
                            : "N/A"}
                        </td> */}
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          $
                          {(
                            mentor.amount ||
                            (booking.durationMonths || 0) * (mentor.salary || 0) ||
                            0
                          ).toFixed(2)}
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