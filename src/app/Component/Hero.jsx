"use client"
import React from 'react';
// import { FaArrowDown } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import Image from "next/image";
const Hero = () => {
    const router = useRouter();
    return (
      <div>
        <div className="min-h-screen bg-[#21dbdb] font-['Inter'] antialiased">
          {/* Main container */}
          <div className='relative w-full hidden md:block max-w-[1440px] mx-auto min-h-screen  bg-[#21dbdb] overflow-visible'>
            {/* Background rectangle */}
            <div className='absolute w-[1440px] h-[700px] bg-[#21dbdb]' />

            {/* Background vector/image */}
            <img
              className='absolute top-[132px] left-1/2 -translate-x-1/2 w-[1229px] h-[549px] object-cover'
              src='/images/bg.png'
              alt='background'
            />

            {/* Navigation bar */}
            <div className='absolute top-[32px] left-1/2 -translate-x-1/2 w-[817px] h-[59px] bg-white/70 rounded-[20px]' />

            {/* Navigation links */}
            <p className="absolute top-[45px] left-1/2 -translate-x-1/2 w-[804px] text-center font-['Inter'] font-normal text-[#1b0ced] text-[24px]">
              <button onClick={() => router.push("/pages/users/dashboard")}>
                <p className='px-4 hover:border-2 border-blue-600 rounded-md hover:bg-blue-800 hover:text-white'>
                  Dashboard
                </p>{" "}
              </button>{" "}
              <button onClick={() => router.push("#mentors")}>
                <p className='px-4  hover:border-2 border-blue-600 rounded-md hover:bg-blue-800 hover:text-white active:bg-blue-600'>
                  Mentors
                </p>
              </button>{" "}
              <button onClick={() => router.push("#job")}>
                <p className='px-4 hover:border-2 border-blue-600 rounded-md hover:bg-blue-800 hover:text-white active:bg-blue-600'>
                  Jobs
                </p>
              </button>{" "}
              <button onClick={() => router.push("/pages/services")}>
                <p className='px-4 hover:border-2 border-blue-600 rounded-md hover:bg-blue-800 hover:text-white active:bg-blue-600'>
                  Services
                </p>
              </button>
              <button onClick={() => router.push("/pages/pricing")}>
                <p className='px-4 hover:border-2 border-blue-600 rounded-md hover:bg-blue-800 hover:text-white active:bg-blue-600'>
                  Pricing
                </p>
              </button>
              <button onClick={() => router.push("/#contact")}>
                <p className='px-4 hover:border-2 border-blue-600 rounded-md hover:bg-blue-800 hover:text-white active:bg-blue-600'>
                  Contact
                </p>
              </button>
            </p>

            {/* Logo */}
            <img
              className='absolute top-[125px] left-[360px] w-[78px] h-[75px] object-cover'
              src='/images/logo.png'
              alt='logo'
            />
            <div className='absolute top-32 left-1/2  -translate-x-1/2 text-center font-bold text-blue-900 text-4xl md:text-6xl'>
              Skill merchants
            </div>
            {/* Main title */}
            <div className="absolute top-[290px] left-[184px] w-[1042px] font-['Hammersmith_One'] font-normal text-[#c6f2ff] text-[96px] leading-none">
              The Ecosystem for Skill Collaboration
            </div>

            {/* Subtitle */}
            <p className="absolute top-[597px] left-[694px] w-[490px] font-['Hammersmith_One'] font-normal text-white text-[32px] leading-none">
              Breaking Boundaries and Building Solutions
            </p>

            {/* CTA Buttons container */}
            <div className='absolute top-[608px] left-[49px] flex'>
              {/* Get Started button */}
              <button
                onClick={() => router.push("#mentors")}
                className='flex items-center justify-center w-[203px] h-[69px] bg-[#271ad6] rounded-l-[30px] hover:bg-[#1f15c0] transition-colors'>
                <span className="font-['Hammersmith_One'] font-normal text-white text-[24px]">
                  Get Started
                </span>
              </button>

              {/* Learn More button */}
              <button
                onClick={() => router.push("/pages/services")}
                className='flex items-center justify-center w-[193px] h-[69px] bg-[#dbfbff9c] rounded-r-[30px] hover:bg-[#dbfbff] transition-colors'>
                <span className="font-['Hammersmith_One'] font-normal text-[#4125c0] text-[24px]">
                  Learn More
                </span>
              </button>
            </div>
          </div>
        </div>
        <section className='h-screen sec text-blue-950 w-full md:hidden flex-col flex  justify-center items-center bg-cover bg-center relative'>
          <div className='z-10 mb-15 '>
            <h1 className=' font-bold text-2xl md:text-5xl'>
              The Ecosystem for <span className='text-blue-500'>Skill</span>{" "}
              Collaboration
            </h1>
            <p className='py-10'>Breaking Boundaries and Building Solutions</p>
            <div className='flex space-x-4 w-full justify-center text-center'>
              <button
                onClick={() => router.push("#mentors")}
                className='bg-blue-50 hover:bg-blue-200 flex text-blue-950 hover:border hover:border-white px-4 py-2 rounded-full space-x-2'>
                Get Started{" "}
                <span className='pl-2'>
                  <FaArrowDown />
                </span>
              </button>
              <button
                onClick={() => router.push("/pages/services")}
                className='bg-blue-200 hover:border hover:border-white hover:bg-blue-50 text-blue-950 px-4 py-2 rounded-full'>
                Learn More
              </button>
            </div>
          </div>
          <div className='  animate-pulse'>
            <img
              src='https://media.mktg.workday.com/is/image/workday/illustration-shape-scene-man-walk-graph-FoW-1?fmt=png-alpha&wid=1000'
              alt=''
            />
          </div>
        </section>
      </div>
    );
};

export default Hero;