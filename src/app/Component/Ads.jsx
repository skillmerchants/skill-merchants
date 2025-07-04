// app/pages/ads/page.jsx
"use client";

import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";

const Ads = () => {
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [totalAds, setTotalAds] = useState(0); // Store total ads from API
  const itemsPerPage = 6;
  const router = useRouter();
  const videoRefs = useRef({});

  useEffect(() => {
    const fetchAds = async () => {
      try {
        const response = await fetch(
          `/api/post?limit=${itemsPerPage}&skip=${(page - 1) * itemsPerPage}`,
          {
            method: "GET",
            cache: "no-store",
          }
        );

        if (!response.ok) {
          if (response.status === 401 || response.status === 403) {
            router.push("/pages/users/login");
            return;
          }
          throw new Error("Failed to fetch ads");
        }

        const result = await response.json();
        console.log("API response:", result);
        const newAds = Array.isArray(result.data) ? result.data : [];
        setAds((prev) => (page === 1 ? newAds : [...prev, ...newAds]));
        setTotalAds(result.total || 0);
        setHasMore((page - 1) * itemsPerPage + newAds.length < result.total); // Check if more data exists
        setLoading(false);
      } catch (error) {
        console.error("Error fetching ads:", error);
        setError("Failed to load advertisements. Please try again later.");
        setLoading(false);
      }
    };

    fetchAds();
  }, [page, router]);

  const handleMouseEnter = (adId, event) => {
    const video = videoRefs.current[adId];
    const img = event.currentTarget.querySelector("img");

    if (video || video.readyState >= 2) {
      video.style.opacity = "1";
      video.play().catch((err) => console.error("Video play error:", err));
    }
    if (img) {
      img.style.opacity = "0";
    }
  };

  const handleMouseLeave = (adId, event) => {
    const video = videoRefs.current[adId];
    const img = event.currentTarget.querySelector("img");

    if (video) {
      video.style.opacity = "0";
      video.pause();
      video.currentTime = 0;
    }
    if (img) {
      img.style.opacity = "1";
    }
  };

  // Client-side limiting (optional fallback)
  const displayedAds = ads.slice(0, itemsPerPage * page);

  if (loading && page === 1) {
    return (
      <div className='min-h-screen w-full flex items-center justify-center sec'>
        <div className='flex items-center space-x-2'>
          <svg
            className='w-6 h-6 animate-spin text-indigo-600'
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'>
            <circle
              className='opacity-25'
              cx='12'
              cy='12'
              r='10'
              stroke='currentColor'
              strokeWidth='4'
            />
            <path
              className='opacity-75'
              fill='currentColor'
              d='M4 12a8 8 0 018-8v8h8a8 8 0 01-16 0z'
            />
          </svg>
          <p className='text-lg text-gray-600 font-medium'>
            Loading advertisements...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className='min-h-screen w-full flex items-center justify-center sec'>
        <div className='text-center'>
          <p className='text-lg text-red-500 font-medium'>{error}</p>
          <button
            onClick={() => {
              setLoading(true);
              setError(null);
              setPage(1);
            }}
            className='mt-4 px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors duration-300'>
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen w-full sec py-12 px-4 sm:px-6 lg:px-8'>
      <div className='container mx-auto'>
        <div className='text-center mb-12' id='ads'>
          <h1 className='text-3xl sm:text-5xl font-extrabold text-gray-900 tracking-tight'>
            Discover Our Curated Advertisements
          </h1>
          <p className='mt-4 max-w-2xl mx-auto text-lg text-gray-600 leading-relaxed'>
            Explore a premium selection of promotions and offers from our
            trusted partners.
          </p>
        </div>

        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8'>
          {displayedAds.length === 0 ? (
            <p className='col-span-full text-center text-gray-600 text-lg font-medium'>
              No advertisements available at the moment.
            </p>
          ) : (
            displayedAds.map((ad) => (
              <div
                key={ad._id}
                className='relative sec rounded-2xl shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1'
                onClick={(e) => handleMouseEnter(ad._id, e)}
                onMouseLeave={(e) => handleMouseLeave(ad._id, e)}>
                <div className='relative w-full h-64'>
                  {ad.image && (
                    <img
                      src={`/api/post/${ad.image}`}
                      alt={ad.title || "Advertisement"}
                      className='w-full h-full object-cover transition-opacity duration-300'
                      style={{ opacity: 0 }}
                      onError={() =>
                        console.error(`Failed to load image for ad ${ad._id}`)
                      }
                    />
                  )}
                  {ad.video && (
                    <video
                      ref={(el) => (videoRefs.current[ad._id] = el)}
                      className='w-full h-full object-cover absolute top-0 left-0 transition-opacity duration-300'
                      style={{ opacity: 1 }}
                      autoPlay='false'
                      loop
                      preload='auto'
                      onLoadedData={() =>
                        console.log(`Video loaded for ad ${ad._id}`)
                      }
                      onError={() =>
                        console.error(`Failed to load video for ad ${ad._id}`)
                      }>
                      <source src={`/api/post/${ad.video}`} type='video/mp4' />
                      Your browser does not support the video tag.
                    </video>
                  )}
                </div>
                <div className='p-6 space-y-3'>
                  <h3 className='text-xl font-bold text-gray-900 truncate'>
                    {ad.title}
                  </h3>
                  <p className='text-gray-600 line-clamp-3'>{ad.description}</p>
                  {ad.link && (
                    <a
                      href={ad.link}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='block text-center px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors duration-300'>
                      Visit Now
                    </a>
                  )}
                </div>
              </div>
            ))
          )}
        </div>

        {hasMore && (
          <div className='mt-12 flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6'>
            <button
              onClick={() => setPage((prev) => prev + 1)}
              disabled={loading}
              className={`px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors duration-300 ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}>
              {loading ? (
                <span className='flex items-center'>
                  <svg
                    className='w-5 h-5 animate-spin mr-2 text-white'
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'>
                    <circle
                      className='opacity-25'
                      cx='12'
                      cy='12'
                      r='10'
                      stroke='currentColor'
                      strokeWidth='4'
                    />
                    <path
                      className='opacity-75'
                      fill='currentColor'
                      d='M4 12a8 8 0 018-8v8h8a8 8 0 01-16 0z'
                    />
                  </svg>
                  Loading...
                </span>
              ) : (
                "Load More"
              )}
            </button>
            <div className='flex items-center space-x-3'>
              <button
                onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                disabled={page === 1 || loading}
                className={`px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors duration-200 ${
                  page === 1 || loading ? "opacity-50 cursor-not-allowed" : ""
                }`}>
                Previous
              </button>
              <span className='text-gray-600 font-medium'>Page {page}</span>
              <button
                onClick={() => setPage((prev) => prev + 1)}
                disabled={!hasMore || loading}
                className={`px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors duration-200 ${
                  !hasMore || loading ? "opacity-50 cursor-not-allowed" : ""
                }`}>
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Ads;
