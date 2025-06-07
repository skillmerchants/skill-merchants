"use client"
import React from 'react';
import Link from "next/link";
import { useRouter } from 'next/navigation';
import {  FaInstagram ,FaFacebook , FaTwitter ,FaArrowRight ,FaPhone ,FaEnvelope , FaTiktok ,FaWhatsapp} from 'react-icons/fa';

const Footer = () => {
    const router = useRouter();
    return (
        <footer className="bg-[#060b4e] min-w-screen text-white py-10 font-inter">
            <div>
                <div className="flex justify-center items-center gap-20 m-10 flex-wrap">
                    <div>
                        <h1 className="font-bold text-2xl my-5">Skill Merchants</h1>
                        <p>Empowering careers through</p>
                        <p>expert-led online education in</p>
                        <p>technology and development.</p>
                    </div>
                    <div>
                        <h2 className="font-bold text-xl my-5">Quick Links</h2>
                        <p><button className="hover:underline" onClick={() => router.push("/pages/services")}>About Us</button></p>
                        <p><button className="hover:underline" onClick={() => router.push("/pages/users/dashboard")}>Dashboard</button></p>
                        <p><button className="hover:underline" onClick={() => router.push("/pages/pricing")}>pricing</button></p>
                        <p><button className="hover:underline" onClick={() => router.push("#contacts")}>Contacts</button></p>
                    </div>
                    <div>
                        <h2 className="font-bold text-xl my-5">Contact Us</h2>
                        <div className="flex my-3 gap-5">
                        <FaEnvelope />
                            <p>skillmerchants@gmail.com</p>
                        </div>
                        <div className="flex my-3 gap-5">
                            <FaPhone />
                            <p>+ (234) 8105669301</p>
                        </div>
                    </div>
                    <div>
                        <h2 className="font-bold text-xl my-5">Follow Us</h2>
                        <div className="flex justify-between gap-3">
                           <Link className='font-extrabold text-2xl hover:text-emerald-300' target="_blank" href="https://www.facebook.com/share/1Bfexep3vm/"><FaFacebook /></Link>
                           <Link className='font-extrabold text-2xl hover:text-emerald-300' target="_blank" href="https://x.com/skillmerchantsc?s=11"><FaTwitter /></Link>
                           <Link className='font-extrabold text-2xl hover:text-emerald-300' target="_blank" href="https://www.instagram.com/skillmerchants?igsh=a3Z1b2VxNGM3bTU4&utm_source=qr">
                          <FaInstagram /></Link>
                           <Link className='font-extrabold text-2xl hover:text-emerald-300' target="_blank" href="https://www.tiktok.com/@skill.merchants?_t=ZM-8wjdPpQGgSM"><FaTiktok /></Link>
                           <Link className='font-extrabold text-2xl hover:text-emerald-300' target="_blank" href="https://wa.me/2348105669301"><FaWhatsapp /></Link>
                        </div>
                        <div className="mt-10">
                            <h1>Newsletter</h1>
                            <div className="flex rounded-sm">
                                <input
                                    type="email"
                                    className="placeholder:p-2 rounded-l-sm bg-white text-black p-2 placeholder:text-gray-700"
                                    name="email"
                                    placeholder="your email"
                                    id=""
                                />
                                <div className='bg-[#008D27] h-10 w-10 rounded-r-sm flex justify-center items-center'> Send<FaArrowRight /></div>

                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex justify-center">
                    <p>©2025 Skill Merchants Global Network. All rights reserved</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
