import React from 'react';
import { useState, useEffect } from 'react';

const WhyChooseUs = () => {
    const [ads, setAds] = useState([]);

useEffect(() => {
    fetch('https://api.example.com/ads')
        .then(response => response.json())
        .then(data => setAds(data))
        .catch(error => console.error('Error fetching ads:', error));
}, []);
    return (
        <section className="bg-sky-200 p-5 gap-10 text-black flex flex-wrap justify-center items-center">
            <div className='max-w-[300px] flex flex-col'> <h2> Ads </h2> <img src={ads} alt="Ads image" /></div>
            <div> 
                <h3>Why Choose Us</h3> 
                <div className='flex flex-wrap md:flex-row gap-5 justify-center items-center'>
                <div className='max-w-[300px] flex flex-col'>
                    <p>Bridging Gaps</p>
                    <p>WE close skill gaps, connect talent with opportunity, and fuel economic growth for individuals and communities.</p>
                </div>
                <div className='max-w-[300px] flex flex-col'>
                    <p>Creating Shared Value</p>
                    <p>We amplify small businesses, integrate learning, apprenticeships, and job access</p>
                </div>
                </div>
            </div>
            <div className='max-w-[300px] flex flex-col'> <h2> Ads </h2> <img src={ads} alt="Ads image" /></div>
        </section>
    );
};

export default WhyChooseUs;