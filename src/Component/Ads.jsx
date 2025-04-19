import React, { useEffect, useState } from 'react';

const Ads = () => {
    const [ads, setAds] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAds = async () => {
            try {
                const response = await fetch('/api/ads'); // Replace with your API endpoint
                if (!response.ok) {
                    throw new Error('Failed to fetch ads');
                }
                const data = await response.json();
                setAds(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching ads:', error);
                setError('Failed to fetch ads');
                setLoading(false);
            }
        };

        fetchAds();
    }, []);

    const handleMouseEnter = (event) => {
        const video = event.currentTarget.querySelector('video');
        const img = event.currentTarget.querySelector('img');

        if (video) {
            video.style.display = 'block'; // Show video
            video.play();
        }
        if (img) {
            img.style.display = 'none'; // Hide image
        }
    };

    const handleMouseLeave = (event) => {
        const video = event.currentTarget.querySelector('video');
        const img = event.currentTarget.querySelector('img');

        if (video) {
            video.style.display = 'none'; // Hide video
            video.pause();
            video.currentTime = 0;
        }
        if (img) {
            img.style.display = 'block'; // Show image
        }
    };

    if (loading) return <p className="text-center text-gray-600">Loading...</p>;
    if (error) return <p className="text-center text-red-500">{error}</p>;

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
            {ads.map((ad) => (
                <div
                    key={ad.id}
                    className="relative bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                    {/* Image */}
                    {ad.img && (
                        <img
                            src={ad.img}
                            alt="Ad"
                            className="w-full h-48 object-cover"
                        />
                    )}

                    {/* Video (hidden by default) */}
                    {ad.video && (
                        <video
                            className="w-full h-48 object-cover absolute top-0 left-0 transition-opacity duration-300 opacity-0"
                            muted
                            loop
                        >
                            <source src={ad.video} type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    )}

                    {/* Link */}
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
            ))}
        </div>
    );
};

export default Ads;