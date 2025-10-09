"use client"
// import { Link } from 'react-router-dom';
import { useState } from "react";
import { FaBars, FaTimes,  } from "react-icons/fa";
import { useRouter } from "next/navigation";
import Image from "next/image";
const Nav = () => {
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
        <nav className="fixed  top-0 left-0 right-0 z-50">
            <div className="md:hidden flex justify-between sec p-1 align-items-lg-center">
                <div className="flex items-center gap-3 mx-2 ">
                   <img className="rounded-full w-25 h-15" src="/images/logo.png" alt="" />
                    <h2 className="text-black font-[700]">Skill Merchants</h2>
                </div>
                <div className=" hidden text-center items-center text-black gap-8 mx-18 font-[500] text-[12px] my-2">
                    <div className="hover:bg-blue-50 hover:text-black p-2 rounded-full text-center items-center">
                        <button onClick={() => router.push("/pages/users/dashboard")}><p className='text-black'>Dashboard</p> </button>
                    </div>
                    <div className="hover:bg-blue-50 hover:text-black p-2 rounded-full text-center items-center">
                        <button onClick={() => router.push("#mentors")}><p className='text-black'>Mentors</p></button>
                    </div>
                    <div className="hover:bg-blue-50 hover:text-black p-2 rounded-full text-center items-center">
                        <button onClick={() => router.push("#job")}><p className='text-black'>Jobs</p></button>
                    </div>
                    <div className="hover:bg-blue-50 hover:text-black p-2 rounded-full text-center items-center">
                    <button onClick={() => router.push("/pages/services")}><p className='text-black'>Services</p></button>                    </div>
                    <div className="hover:bg-blue-50 hover:text-black p-2 rounded-full text-center items-center">
                    <button onClick={() => router.push("/pages/pricing")}><p className='text-black'>Pricing</p></button>                    </div>
                    <div className="hover:bg-blue-50 hover:text-black p-2 rounded-full text-center items-center">
                    <button onClick={() => router.push("/#contact")}><p className='text-black'>Contact</p></button>                    </div>
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
                className="md:hidden  hidden sec rounded-bl-3xl border-2 text-right sec4 space-y-5 text-black 
                gap-8 border-t-1 pb-5 ml-[50%]  font-[500] text-[12px]"
            >
                <div className="text-black active:bg-blue-600 text-xl pr-5">
                <button onClick={() => router.push("/pages/users/dashboard")}><p className='text-black'>Dashboard</p> </button>               </div>
                <div className="text-black active:bg-blue-600 text-xl pr-5">
                <button onClick={() => router.push("#mentors")}><p className='text-black  active:bg-blue-600'>Mentors</p></button>                </div>
                <div className="text-black active:bg-blue-600 text-xl pr-5">
                <button onClick={() => router.push("#job")}><p className='text-black active:bg-blue-600'>Jobs</p></button>                </div>
                <div className="text-black active:bg-blue-600 text-xl pr-5">
                    <button onClick={() => router.push("/pages/services")}><p className='text-black active:bg-blue-600'>Services</p></button>
                </div>
                <div className="text-black active:bg-blue-600 text-xl pr-5">
                    <button onClick={() => router.push("/pages/pricing")}><p className='text-black active:bg-blue-600'>Pricing</p></button>
                </div>
                <div className="text-black active:bg-blue-600 text-xl pr-5">
                    <button onClick={() => router.push("/#contact")}><p className='text-black active:bg-blue-600'>Contact</p></button>
                </div>
            </div>
        </nav>
    );
};

export default Nav;  