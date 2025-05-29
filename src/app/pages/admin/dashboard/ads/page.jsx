"use client";

import React, { useEffect, useState , useRef  } from "react";
import { useRouter } from "next/navigation";
const Ads = () => {
    const [ads, setAds] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [totalAds, setTotalAds] = useState(0); // Store total ads from API
    const itemsPerPage = 6;
    const [deletingId, setDeletingId] = useState(null); // State for delete operation
    const router = useRouter();
    const videoRefs = useRef({});
  
    useEffect(() => {
      const fetchAds = async () => {
        try {
          const response = await fetch(
            `$/api/post?limit=${itemsPerPage}&skip=${
              (page - 1) * itemsPerPage
            }`,
            {
              method: "GET",
              cache: "no-store",
            }
          );
  
          if (!response.ok) {
            if (response.status === 401 || response.status === 403) {
              router.push("/pages/admin/login");
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
  
      if (video && video.readyState >= 2) {
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


if (loading && page === 1) {
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

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-gray-200">
        <div className="text-center">
          <p className="text-lg text-red-500 font-medium">{error}</p>
          <button
            onClick={() => {
              setLoading(true);
              setError(null);
              setPage(1);
            }}
            className="mt-4 px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors duration-300"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen sec3 py-30 px-4 sm:px-6 lg:px-8">
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
                  <button
          onClick={() => router.push("/pages/admin/dashboard/adsPost")}
          className="my-2 inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200"
        >
        Post Ads
      </button>
            </div> 
          </nav>
      <div className="container mx-auto">
        <div className="text-center mb-12" id="ads">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 tracking-tight">
            Discover Our Curated Advertisements
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600 leading-relaxed">
            Explore a premium selection of promotions and offers from our trusted partners.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedAds.length === 0 ? (
            <p className="col-span-full text-center text-gray-600 text-lg font-medium">
              No advertisements available at the moment.
            </p>
          ) : (
            displayedAds.map((ad) => (
              <div
                key={ad._id}
                className="relative sec4 rounded-2xl shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
                onMouseEnter={(e) => handleMouseEnter(ad._id, e)}
                onMouseLeave={(e) => handleMouseLeave(ad._id, e)}
              >
                <div className="relative w-full h-64">
                  {ad.image && (
                    <img
                      src={`/api/post/${ad.image}`}
                      alt={ad.title || "Advertisement"}
                      className="w-full h-full object-cover transition-opacity duration-300"
                      style={{ opacity: 1 }}
                      onError={() => console.error(`Failed to load image for ad ${ad._id}`)}
                    />
                  )}
                  {ad.video && (
                    <video
                      ref={(el) => (videoRefs.current[ad._id] = el)}
                      className="w-full h-full object-cover absolute top-0 left-0 transition-opacity duration-300"
                      style={{ opacity: 0 }}
                      muted
                      loop
                      preload="auto"
                      onLoadedData={() => console.log(`Video loaded for ad ${ad._id}`)}
                      onError={() => console.error(`Failed to load video for ad ${ad._id}`)}
                    >
                      <source
                        src={`/api/post/${ad.video}`}
                        type="video/mp4"
                      />
                      Your browser does not support the video tag.
                    </video>
                  )}
                </div>
                <div className="p-6 space-y-3">
                  <h3 className="text-xl font-bold text-gray-900 truncate">{ad.title}</h3>
                  <p className="text-gray-600 line-clamp-3">{ad.description}</p>
                  {ad.link && (
                    <a
                      href={ad.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className=" text-center px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors duration-300"
                    >
                      Visit Now
                    </a>
                    
                  )}
                  <button
                    onClick={() => handleDelete(ad._id)}
                    disabled={deletingId === ad._id}
                    className="px-6 py-3 mx-7 bg-red-600 text-white rounded-lg hover:bg-red-700 focus:outline-none"
                  >
                    {deletingId === ad._id ? "Deleting..." : "Delete"}
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {hasMore && (
          <div className="mt-12 flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6">
            <button
              onClick={() => setPage((prev) => prev + 1)}
              disabled={loading}
              className={`px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors duration-300 ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {loading ? (
                <span className="flex items-center">
                  <svg
                    className="w-5 h-5 animate-spin mr-2 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8h8a8 8 0 01-16 0z"
                    />
                  </svg>
                  Loading...
                </span>
              ) : (
                "Load More"
              )}
            </button>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                disabled={page === 1 || loading}
                className={`px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors duration-200 ${
                  page === 1 || loading ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                Previous
              </button>
              <span className="text-gray-600 font-medium">Page {page}</span>
              <button
                onClick={() => setPage((prev) => prev + 1)}
                disabled={!hasMore || loading}
                className={`px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors duration-200 ${
                  !hasMore || loading ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
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








