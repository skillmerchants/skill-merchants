"use client";

import React, { useEffect, useState } from "react";

const Ads = () => {
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deletingId, setDeletingId] = useState(null); // State for delete operation

  useEffect(() => {
    const fetchAds = async () => {
      try {
        const response = await fetch("/api/post"); // Correct endpoint
        if (!response.ok) {
          throw new Error("Failed to fetch ads");
        }
        const result = await response.json();
        console.log("API response:", result); // Debug response
        // Extract the 'data' array from response
        setAds(Array.isArray(result.data) ? result.data : []);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching ads:", error);
        setError("Failed to fetch ads");
        setLoading(false);
      }
    };

    fetchAds();
  }, []);


  // Handle ads deletion
  const handleDelete = async (_id) => {
    setDeletingId(_id);

    try {
      const response = await fetch(`/api/post/${_id}`, { method: "DELETE" });

      if (!response.ok) {
        throw new Error("Failed to delete ads");
      }

      // Update jobs state to remove the deleted job
      setAds((prevAds) => prevAds.filter((ads) => ads._id !== _id));
    } catch (err) {
      console.error("Error deleting ads:", err);
      setError(err.message || "Failed to delete ads");
    } finally {
      setDeletingId(null);
    }
  };


  const handleMouseEnter = (event) => {
    const video = event.currentTarget.querySelector("video");
    const img = event.currentTarget.querySelector("img");

    if (video) {
      video.style.opacity = "1"; // Show video
      video.play();
    }
    if (img) {
      img.style.opacity = "0"; // Hide image
    }
  };

  const handleMouseLeave = (event) => {
    const video = event.currentTarget.querySelector("video");
    const img = event.currentTarget.querySelector("img");

    if (video) {
      video.style.opacity = "0"; // Hide video
      video.pause();
      video.currentTime = 0;
    }
    if (img) {
      img.style.opacity = "1"; // Show image
    }
  };

  if (loading) return <p className="text-center text-gray-600">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  console.log("ads:", ads);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {ads.length === 0 ? (
        <p className="text-center text-gray-600">No ads found.</p>
      ) : (
        ads.map((ad) => (
          <div
            key={ad._id} // Use _id from MongoDB
            className="relative bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {/* Image */}
            {ad.image && (
              <img
                src={`/api/post/${ad.image}`} // Use /api/files/[id] endpoint
                alt={ad.title || "Ad"}
                className="w-full h-48 object-cover transition-opacity duration-300"
                style={{ opacity: 1 }}
              />
            )}

            {/* Video (hidden by default) */}
            {ad.video && (
              <video
                className="w-full h-48 object-cover absolute top-0 left-0 transition-opacity duration-300"
                style={{ opacity: 0 }}
                muted
                loop
              >
                <source src={`/api/post/${ad.video}`} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            )}

            {/* Ad Details */}
            <div className="p-4">
              <h3 className="text-lg font-semibold">{ad.title}</h3>
              <p className="text-gray-600">{ad.description}</p>
              <p className="text-sm text-gray-500 mt-4">{  (new Date(ad.createdAt).toDateString()) }</p>
              <button
                onClick={() => handleDelete(ad._id)}
                disabled={deletingId === ad._id}
                className="px-4 py-2 mx-7 bg-red-600 text-white rounded hover:bg-red-700 focus:outline-none"
              >
                {deletingId === ad._id ? "Deleting..." : "Delete"}
              </button>
              {ad.link && (
                <a
                  href={ad.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-center mt-4 px-4 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 transition-colors"
                >
                  Visit
                </a>
                
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Ads;