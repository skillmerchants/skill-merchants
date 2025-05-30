"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
export default function UploadAdForm() {
  const [adDetails, setAdDetails] = useState({ title: "", description: "", link: "" });
  const [image, setImage] = useState(null);
  const [video, setVideo] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Create FormData
    const formData = new FormData();
    formData.append("title", adDetails.title);
    formData.append("description", adDetails.description);
    formData.append("link", adDetails.link);
    if (image) formData.append("image", image);
    if (video) formData.append("video", video);
    console.log("FormData submitted:", formData.key);

    // Debug FormData
    for (const [key, value] of formData.entries()) {
      console.log(`FormData ${key}:`, value);
    }
    
    try {
      const response = await axios.post("/api/post", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setAdDetails({ title: "", description: "", link: "" });
      setImage(null);
      setVideo(null);
      document.getElementById("image").value = "";
      document.getElementById("video").value = "";
      if (response.status === 200) {
        setSuccess("Ad created successfully");
      } else {
        setError(response.data.message || "Failed to upload ad");
      }
    } catch (error) {
      console.error("Error uploading ad:", error);
      setError(error.response?.data?.message || "An error occurred while uploading the ad");
    }
  };

  return (
    <div className=" py-30 sec3 px-5 ">
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
   <div className="sec4 max-w-4xl py-5 mx-auto border border-gray-500 rounded-md shadow-sm ">
       <h2 className="text-2xl font-bold text-center mb-6">Upload an Ad</h2>
      {error && <p className="text-blue-500 mb-4">{error}</p>}
      {success && <p className="text-green-500 mb-4">{success}</p>}
      <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-4 p-6 ">
        <div>
          <label htmlFor="title" className="block text-sm font-medium">Title</label>
          <input
            type="text"
            id="title"
            placeholder="Enter ad title"
            value={adDetails.title}
            onChange={(e) => setAdDetails({ ...adDetails, title: e.target.value })}
            required
             className="mt-1 block w-full px-3 py-2 border border-gray-500 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium">Description</label>
          <textarea
            id="description"
            placeholder="Enter ad description"
            value={adDetails.description}
            onChange={(e) => setAdDetails({ ...adDetails, description: e.target.value })}
            required
            rows="3"
             className="mt-1 block w-full px-3 py-2 border border-gray-500 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label htmlFor="link" className="block text-sm font-medium">Link</label>
          <input
            type="url"
            id="link"
            placeholder="Enter ad link"
            value={adDetails.link}
            onChange={(e) => setAdDetails({ ...adDetails, link: e.target.value })}
            required
             className="mt-1 block w-full px-3 py-2 border border-gray-500 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label htmlFor="image" className="block text-sm font-medium">Image</label>
          <input
            type="file"

            id="image"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            required
             className="mt-1 block  w-full px-3 py-2 border border-gray-500 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label htmlFor="video" className="block text-sm font-medium">Video</label>
          <input
            type="file"
            id="video"
            accept="video/*"
            onChange={(e) => setVideo(e.target.files[0])}
            required
             className="mt-1 block w-full px-3 py-2 border placeholder:text-blue-500 border-gray-500 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <button type="submit"  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          Upload Ad
        </button>
      </form>
   </div>
    </div>
  );
}