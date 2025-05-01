"use client"
import React from 'react';

const WhyChooseUs = () => {

    return (
        <section className="bg-cyan-100 w-full p-5 gap-15 text-black flex flex-wrap justify-center  items-center">
            <div> 
                <h3 className='font-bold underline'>Why Choose Us</h3> 
                <div className='flex flex-wrap md:flex-row gap-0 justify-left items-center'>
                <div className='max-w-[300px] flex shadow-2xl flex-col border-l-1 border-b-1 text-left border-black p-5 m-5'> 
                    <p className='font-semibold pb-5'>Bridging Gaps</p>
                    <p>WE close skill gaps, connect talent with opportunity, and fuel economic growth for individuals and communities.</p>
                </div>
                <div className='max-w-[300px] flex shadow-2xl flex-col border-l-1 border-b-1 text-left border-black p-5 m-5'> 
                    <p className='font-semibold pb-5'>Creating Shared Value</p>
                    <p>We amplify small businesses, integrate learning, apprenticeships, and job access</p>
                </div>
                </div>
            </div>
        </section>
    );
};

export default WhyChooseUs;