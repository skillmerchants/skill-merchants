"use client"
// import { Link } from 'react-router-dom';
import Link from "next/link";
import React, { useState } from "react";
import { FaBars, FaTimes,  } from "react-icons/fa";
import { usePathname } from 'next/navigation';
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
            <div className="flex justify-between bg-black p-1 align-items-lg-center">
                <div className="flex items-center gap-3 mx-15 my-2">
                   
                    <h2 className="text-white font-[700]">Skill Merchants</h2>
                </div>
                <div className="md:flex hidden text-center items-center text-white gap-8 mx-18 font-[500] text-[12px] my-2">
                    <div className="black hover:text-white p-2 rounded-md text-center items-center">
                        <button onClick={() => router.push("/pages/admin/dashboard/jobs")}><p className=' hover:border-2 border-white text-white px-3 rounded-md '>Job</p></button>
                    </div>
                    <div className="black hover:text-white p-2 rounded-md text-center items-center">
                        <button onClick={() => router.push("/pages/admin/dashboard/mentor")}><p className=' hover:border-2 border-white text-white px-3 rounded-md '>Mentor</p></button>
                    </div>
                    <div className="black hover:text-white p-2 rounded-md text-center items-center">
                        <button onClick={() => router.push("/pages/admin/dashboard/ads")}><p className=' hover:border-2 border-white text-white px-3 rounded-md '>Ads</p></button>
                    </div>
                    <div className="black hover:text-white p-2 rounded-md text-center items-center">
                        <button onClick={() => router.push("/pages/admin/dashboard/bookings")}><p className=' hover:border-2 border-white text-white px-3 rounded-md '>Bookings</p></button>
                    </div>
                    <div className="black hover:text-white p-2 rounded-md text-center items-center">
                        <button onClick={() => router.push("/pages/services")}><p className='text-white'>Services</p></button>
                    </div>
                    <div className="black hover:text-white p-2 rounded-md text-center items-center">
                        <button onClick={() => router.push("/pages/pricing")}><p className='text-white'>Pricing</p></button>
                    </div>
                    <div className="black hover:text-white p-2 rounded-md text-center items-center">
                        <button onClick={() => router.push("/pages/contact")}><p className='text-white'>Contact</p></button>
                    </div>
                </div>
                <button className="md:hidden" onClick={toggleMenu}>
          {isOpen ? (
            <FaTimes className="text-2xl" />
          ) : (
            <FaBars className="text-2xl" />
          )}
        </button>
            </div>
            <div
                id="nav"
                className="md:hidden hidden text-right bg-black space-y-5 text-white 
                gap-8 border-t-1 pb-5 ml-[50%]  font-[500] text-[12px]"
            >
                <div className="text-white text-xl pr-5">
                    <button onClick={() => router.push("/pages/admin/dashboard/jobs")}><p className='text-white'>Job</p></button>
                </div>
                <div className="text-white text-xl pr-5">
                    <button onClick={() => router.push("/pages/admin/dashboard/mentor")}><p className='text-white'>Mentor</p></button>
                </div>
                <div className="text-white text-xl pr-5">
                    <button onClick={() => router.push("/pages/admin/dashboard/ads")}><p className='text-white'>Ads</p></button>
                </div>
                <div className="text-white text-xl pr-5">
                    <button onClick={() => router.push("/pages/services")}><p className='text-white'>Services</p></button>
                </div>
                <div className="text-white text-xl pr-5">
                    <button onClick={() => router.push("/pages/pricing")}><p className='text-white'>Pricing</p></button>
                </div>
                <div className="text-white text-xl pr-5">
                    <button onClick={() => router.push("/pages/contact")}><p className='text-white'>Contact</p></button>
                </div>
            </div>
        </nav>
    );
};

export default AdminNav;  