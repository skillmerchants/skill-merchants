"use client"
// import { Link } from 'react-router-dom';
import React, { useState } from "react";
import { FaBars, FaTimes,  } from "react-icons/fa";
import { useRouter } from 'next/navigation';


const AdminNav = () => {
    const router = useRouter();
        const [isOpen, setIsOpen] = useState(false);
      
        const toggleMenu = () => {
          setIsOpen(!isOpen);
          const nav = document.getElementById('nav');
          if (nav.classList.contains('hidden')) {
              nav.classList.remove('hidden');
          } else {
              nav.classList.add('hidden');
          }
        };
    return (
        <nav className="fixed top-0 left-0 right-0 z-50">
            <div className="flex justify-between sec1 p-1 align-items-lg-center">
                <div className="flex items-center gap-3 mx-15 my-2">
                   <img className="rounded-full w-10 h-10" src="https://images.seeklogo.com/logo-png/17/2/sm-supermalls-logo-png_seeklogo-176299.png" alt="" />
                    <h2 className="text-black font-[700]">Skill Merchants</h2>
                </div>
                <div className="md:flex hidden text-center items-center text-black gap-8 mx-18 font-[500] text-[12px] my-2">
                    <div className="black hover:text-black p-2 rounded-full text-center items-center">
                        <button onClick={() => router.push("/pages/admin/dashboard/jobs")}><p className=' hover:border-2 border-white hover:bg-white  text-black px-3 rounded-full '>Job</p></button>
                    </div>
                    <div className="black hover:text-black p-2 rounded-full text-center items-center">
                        <button onClick={() => router.push("/pages/admin/dashboard/mentor")}><p className=' hover:border-2 border-white hover:bg-white  text-black px-3 rounded-full '>Mentor</p></button>
                    </div>
                    <div className="black hover:text-black p-2 rounded-full text-center items-center">
                        <button onClick={() => router.push("/pages/admin/dashboard/ads")}><p className=' hover:border-2 border-white hover:bg-white  text-black px-3 rounded-full '>Ads</p></button>
                    </div>
                    <div className="black hover:text-black p-2 rounded-full text-center items-center">
                        <button onClick={() => router.push("/pages/admin/dashboard/bookings")}><p className=' hover:border-2 border-white hover:bg-white  text-black px-3 rounded-full '>Bookings</p></button>
                    </div>
                    <div className="black hover:text-black p-2 rounded-full text-center items-center">
                        <button onClick={() => router.push("/pages/services")}><p className=' hover:border-2 border-white hover:bg-white  text-black px-3 rounded-full'>Services</p></button>
                    </div>
                    <div className="black hover:text-black p-2 rounded-full text-center items-center">
                        <button onClick={() => router.push("/pages/pricing")}><p className=' hover:border-2 border-white hover:bg-white  text-black px-3 rounded-full'>Pricing</p></button>
                    </div>
                    <div className="black hover:text-black p-2 rounded-full text-center items-center">
                        <button onClick={() => router.push("/#contact")}><p className=' hover:border-2 border-white hover:bg-white  text-black px-3 rounded-full'>Contact</p></button>
                    </div>
                </div>
                <button className="md:hidden" onClick={toggleMenu}>
          {isOpen ? (
            <FaTimes className="text-2xl text-black mr-2" />
          ) : (
            <FaBars className="text-2xl text-black mr-2" />
          )}
        </button>
            </div>
            <div
                id="nav"
                className="md:hidden hidden text-right sec4 space-y-5 text-black 
                gap-8 border-1 pb-5 ml-[50%] rounded-bl-lg font-[500] text-[12px]"
            >
                <div className="text-black text-xl pr-5">
                    <button onClick={() => router.push("/pages/admin/dashboard/jobs")}><p className='text-black'>Job</p></button>
                </div>
                <div className="text-black text-xl pr-5">
                    <button onClick={() => router.push("/pages/admin/dashboard/mentor")}><p className='text-black'>Mentor</p></button>
                </div>
                <div className="text-black text-xl pr-5">
                    <button onClick={() => router.push("/pages/admin/dashboard/ads")}><p className='text-black'>Ads</p></button>
                </div>
                <div className="text-black text-xl pr-5">
                    <button onClick={() => router.push("/pages/services")}><p className='text-black'>Services</p></button>
                </div>
                <div className="text-black text-xl pr-5">
                    <button onClick={() => router.push("/pages/pricing")}><p className='text-black'>Pricing</p></button>
                </div>
                <div className="text-black text-xl pr-5">
                    <button onClick={() => router.push("/#contact")}><p className='text-black'>Contact</p></button>
                </div>
            </div>
        </nav>
    );
};

export default AdminNav;  