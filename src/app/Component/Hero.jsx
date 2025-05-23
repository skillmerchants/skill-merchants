"use client"
import React from 'react';
import { FaArrowDown } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
const Hero = () => {
    const router = useRouter();
    return (
        <section className="h-screen sec text-blue-950 w-full  md:flex-row flex-col flex  justify-center items-center bg-cover bg-center relative">
            <div className="z-10 mb-15 ">
                <h1 className=" font-bold text-2xl md:text-5xl">The Ecosystem for <span className="text-blue-500">Skill</span> Collaboration</h1>
                <p className="py-10">
                    Breaking Boundaries and Building Solutions
                </p>
                <div className="flex space-x-4 w-full justify-center text-center">
                    <button onClick={() => router.push("#mentors")} className="bg-blue-50 hover:bg-blue-200 flex text-blue-950 hover:border hover:border-white px-4 py-2 rounded-full space-x-2">Get Started <span className='pl-2'><FaArrowDown /></span></button>
                    <button onClick={() => router.push("/pages/services")} className="bg-blue-200 hover:border hover:border-white hover:bg-blue-50 text-blue-950 px-4 py-2 rounded-full">Learn More</button>
                </div>
                
            </div>
            <div className="  animate-pulse"><img src="https://media.mktg.workday.com/is/image/workday/illustration-shape-scene-man-walk-graph-FoW-1?fmt=png-alpha&wid=1000" alt="" /></div>

        </section>
    );
};

export default Hero;