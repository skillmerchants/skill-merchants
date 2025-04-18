import { Link } from 'react-router-dom';
import React, { useState } from "react";
import { FaBars, FaTimes,  } from "react-icons/fa";

const Nav = () => {
    
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
                        <Link to="/"><p className='text-white'>Home</p></Link>
                    </div>
                    <div className="black hover:text-white p-2 rounded-md text-center items-center">
                        <Link to="about"><p className='text-white'>About</p></Link>
                    </div>
                    <div className="black hover:text-white p-2 rounded-md text-center items-center">
                        <Link to="opportunities"><p className='text-white'>Opportunities</p></Link>
                    </div>
                    <div className="black hover:text-white p-2 rounded-md text-center items-center">
                        <Link to="#services"><p className='text-white'>Services</p></Link>
                    </div>
                    <div className="black hover:text-white p-2 rounded-md text-center items-center">
                        <Link to="pricing"><p className='text-white'>Pricing</p></Link>
                    </div>
                    <div className="black hover:text-white p-2 rounded-md text-center items-center">
                        <Link to="contact"><p className='text-white'>Contact</p></Link>
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
                    <Link to="/"><p className='text-white'>Home</p></Link>
                </div>
                <div className="text-white text-xl pr-5">
                    <Link to="about"><p className='text-white'>About</p></Link>
                </div>
                <div className="text-white text-xl pr-5">
                    <Link to="opportunities"><p className='text-white'>Opportunities</p></Link>
                </div>
                <div className="text-white text-xl pr-5">
                    <Link to="#services"><p className='text-white'>Services</p></Link>
                </div>
                <div className="text-white text-xl pr-5">
                    <Link to="pricing"><p className='text-white'>Pricing</p></Link>
                </div>
                <div className="text-white text-xl pr-5">
                    <Link to="Contact"><p className='text-white'>Contact</p></Link>
                </div>
            </div>
        </nav>
    );
};

export default Nav;  