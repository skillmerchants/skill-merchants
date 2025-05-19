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
    <div className=" p-6 bg-white ">
            <div className="flex justify-between mb-8">
       
        <button
          onClick={() => router.back()}
          className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200"
        >
        ← Go back to Ad
      </button>

      </div>
      <h2 className="text-2xl font-bold text-center mb-6">Upload an Ad</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {success && <p className="text-green-500 mb-4">{success}</p>}
      <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium">Title</label>
          <input
            type="text"
            id="title"
            value={adDetails.title}
            onChange={(e) => setAdDetails({ ...adDetails, title: e.target.value })}
            required
            className="mt-1 w-full p-2 border rounded-md"
          />
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium">Description</label>
          <textarea
            id="description"
            value={adDetails.description}
            onChange={(e) => setAdDetails({ ...adDetails, description: e.target.value })}
            required
            rows="3"
            className="mt-1 w-full p-2 border rounded-md"
          />
        </div>
        <div>
          <label htmlFor="link" className="block text-sm font-medium">Link</label>
          <input
            type="url"
            id="link"
            value={adDetails.link}
            onChange={(e) => setAdDetails({ ...adDetails, link: e.target.value })}
            required
            className="mt-1 w-full p-2 border rounded-md"
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
            className="mt-1 w-full"
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
            className="mt-1 w-full"
          />
        </div>
        <button type="submit" className="w-full">
          Upload Ad
        </button>
      </form>
    </div>
  );
}