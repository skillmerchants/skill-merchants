"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { use } from "react";

export default function BookingDetails({params}) {
  const [booking, setBooking] = useState(null);
  const [mentor, setMentor] = useState({});
  const [paymentProofUrl, setPaymentProofUrl] = useState(null); // State for image URL
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();
 const resolvedParams = use(params);
 const bookingId = resolvedParams.id;

//   const { bookingId } = useParams(); // Get bookingId from URL
 console.log(bookingId);
  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const response = await fetch(`/api/booking/${bookingId}`);
        if (response.status === 401) {
          router.push("/pages/users/login");
          return;
        }
        if (!response.ok) throw new Error("Failed to fetch booking");
        const result = await response.json();
        setBooking(result.data || null);
        if (result.data?.mentorId) {
          await fetchMentor(result.data.mentorId);
        }
        if (result.data?.paymentProofFileId) {
          await fetchPaymentProof(result.data.paymentProofFileId);
        }
      } catch (error) {
        console.error("Error fetching booking:", error);
        setError("Failed to load booking details");
      } finally {
        setLoading(false);
      }
    };

    const fetchMentor = async (mentorId) => {
      try {
        const response = await fetch(`/api/mentor/${mentorId}`);
        if (!response.ok) throw new Error(`Failed to fetch mentor ${mentorId}`);
        const result = await response.json();
        setMentor(result.data || result);
      } catch (error) {
        console.error("Error fetching mentor:", error);
        setError("Failed to load mentor details");
      }
    };

    const fetchPaymentProof = async (fileId) => {
      try {
        const response = await fetch(`/api/booking/proof/${fileId}`);
        if (!response.ok) throw new Error("Failed to fetch payment proof");
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        setPaymentProofUrl(url);
      } catch (error) {
        console.error("Error fetching payment proof:", error);
        setPaymentProofUrl(null); // Fallback to null if image fetch fails
      }
    };

    if (bookingId) {
      fetchBooking();
    } else {
      setError("No booking ID provided");
      setLoading(false);
    }

    // Cleanup URL object to prevent memory leaks
    return () => {
      if (paymentProofUrl) {
        URL.revokeObjectURL(paymentProofUrl);
      }
    };
  }, [bookingId, router]);

    const updateStatus = async (bookingId, status , link , userEmail , userName , mentorName , course) => {
        console.log( link , userEmail , userName , mentorName , course);

    try {
      const response = await fetch(`/api/booking/${bookingId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status , link , userEmail , userName , mentorName , course}),
        credentials: "include",
      });
      if (!response.ok) throw new Error("Failed to update status");


      const result = await response.json();
       setBooking((prev) =>
         prev
           ? { ...prev, paymentStatus: result.data.paymentStatus }
           : prev
       );
      alert("Payment status updated successfully");
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Failed to update payment status");
    }
  };


  if (loading) {
    return <p className="text-center text-gray-600 py-12">Loading...</p>;
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600">{error}</p>
        <button
          onClick={() => router.back()}
          className="mt-4 inline-block px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
        >
          Back to Bookings
        </button>
      </div>
    );
  }

  if (!booking) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">Booking not found.</p>
        <button
          onClick={() => router.push("/pages/admin/dashboard/bookings")}
          className="mt-4 inline-block px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
        >
          Back to Bookings
        </button>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 py-12 px-4 sm:px-6 lg:px-8 min-h-screen">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
            Booking Details
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600 leading-relaxed">
            View details for this booking.
          </p>
          <button
          onClick={() => router.push("/pages/admin/dashboard/bookings")}
            className="mt-4 inline-block text-indigo-600 hover:text-indigo-700 font-semibold"
          >
            ← Back to All Bookings
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">User Information</h2>
              <p className="mt-2 text-gray-600">
                <strong>Name:</strong> {booking.userName || "N/A"}
              </p>
              <p className="mt-2 text-gray-600">
                <strong>Email:</strong> {booking.userEmail || "N/A"}
              </p>
              <p className="mt-2 text-gray-600">
                <strong>Phone:</strong> {booking.phoneNumber || "N/A"}
              </p>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Mentor Information</h2>
              <p className="mt-2 text-gray-600">
                <strong>Name:</strong> {booking.mentorName || mentor.name || "N/A"}
              </p>
              <p className="mt-2 text-gray-600">
                <strong>Course:</strong> {mentor.course || "N/A"}
              </p>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Booking Details</h2>
              <p className="mt-2 text-gray-600">
                <strong>Date & Time:</strong> {booking.appointmentTime || "N/A"}
              </p>
              <p className="mt-2 text-gray-600">
                <strong>Duration:</strong>{" "}
                {booking.durationMonths
                  ? `${booking.durationMonths} month${booking.durationMonths !== 1 ? "s" : ""}`
                  : "N/A"}
              </p>
              <p className="mt-2 text-gray-600">
                <strong>Amount:</strong>{" "}
                $
                {(mentor.amount ||
                  (booking.durationMonths || 0) * (mentor.salary || 0) ||
                  0
                ).toFixed(2)}
              </p>
              <p className="mt-2 text-gray-600">
                <strong>Payment Method:</strong> {booking.paymentMethod || "N/A"}
              </p>
              <p className="mt-2 text-gray-600">
                
                <strong>Payment Status:</strong>{" "}
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
              </p>
              <p className="mt-2 ">
                {booking.paymentStatus === "pending" ? (
                            <button
                              onClick={() => updateStatus(booking._id, "confirmed" , mentor.link , booking.userEmail ,booking.userName ,booking.mentorName , mentor.course)}
                              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            >
                              Confirm Payment
                            </button>
                          ) : (
                            <span className="text-gray-500">Confirmed</span>
                          )}
              </p>
              <p className="mt-2 text-gray-600">
                <strong>Notes:</strong> {booking.notes || "None"}
              </p>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Payment Proof</h2>
              <div className="mt-2">
                {booking.paymentProofFileId && paymentProofUrl ? (
                  <img
                    src={paymentProofUrl}
                    alt="Payment Proof"
                    className="max-w-full h-auto rounded-lg shadow-md"
                    onError={() => setPaymentProofUrl(null)} // Fallback if image fails
                  />
                ) : booking.paymentProofFileId ? (
                  <p className="text-gray-600">
                    Unable to display payment proof.{" "}
                    <a
                      href={`/api/booking/proof/${booking.paymentProofFileId}`}
                      className="text-indigo-600 hover:text-indigo-800"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Download file
                    </a>
                  </p>
                ) : (
                  <p className="text-gray-600">No payment proof uploaded</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}