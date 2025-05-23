"use client"
import React from 'react';

const WhyChooseUs = () => {

    return (
        <section className=" pt-5 w-full sec2 text-black flex flex-wrap justify-center  items-center">
            <div className="w-full   flex flex-col justify-center  "> 
                <h1 className='font-bold md:text-3xl underline'>Why Choose Us</h1> 
                <div className='flex flex-wrap w-full  md:flex-row  justify-around '>
                <div className='max-w-[300px]  sec1 rounded-bl-4xl rounded-tr-4xl shadow-2xl flex flex-col-reverse border-l-1 border-b-1 text-left border-black p-5 m-5'> 
                    
                    <div className=' w-50% '>
                        <p className='font-semibold text-2xl py-5'>Bridging Gaps</p>
                    <p>WE close skill gaps, connect talent with opportunity, and fuel economic growth for individuals and communities.</p>
                    </div>
                    <div>
                        <img className='w-100%  h-50' src="https://assets.td.org/m/f7bce0bc420c3a4/webimage-Bridging-Current-and-Future-Skills-Gaps.png" alt="" />
                    </div>
                </div>
                <div className='max-w-[300px] sec1 rounded-bl-4xl rounded-tr-4xl flex shadow-2xl flex-col border-l-1 border-b-1 text-left border-black p-5 m-5'> 

                    <div>
                        <img className='w-100%  h-50' src="https://svaerm.com/wp-content/uploads/2021/09/creating-shared-value-porter-kramer.jpg" alt="" />
                    </div>
                    <div>
                        <p className='font-semibold py-5'>Creating Shared Value</p>
                    <p>We amplify small businesses, integrate learning, apprenticeships, and job access</p>
                    </div>
                </div>
                </div>
            </div>
        </section>
    );
};

export default WhyChooseUs;