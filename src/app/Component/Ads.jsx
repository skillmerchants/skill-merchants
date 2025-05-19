"use client";

import React, { useEffect, useState } from "react";

const Ads = () => {
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAds = async () => {
      try {
        const response = await fetch("/api/post"); // Correct endpoint
        if (!response.ok) {
          throw new Error("Failed to fetch ads");
        }
        const result = await response.json();
       if (response.status === 401 || response.status === 403) {
        router.push('/pages/users/login');
        return;
      }
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
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
  {/* Heading and Description */}
  <div className="text-center mb-12" id="ads">
    <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
      Explore Our Advertisements
    </h1>
    <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600 leading-relaxed">
      Discover a curated selection of promotions and offers from our partners. Browse through engaging ads to find products, services, and opportunities that spark your interest.
    </p>
  </div>

  {/* Ads Grid */}
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
    </div>
  );
};

export default Ads;