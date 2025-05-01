"use client"
import React from 'react';

const Hero = () => {
    return (
        <section className="h-screen text-white w-full p-5 flex flex-col justify-center items-center bg-cover bg-center relative" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDJ8fG1lbnxlbnwwfHx8fDE2OTI3NTY5MjA&ixlib=rb-4.0.3&q=80&w=1080')" }}>
            <div className="absolute inset-0 bg-black opacity-50 z-0"></div>
            <div className="z-10  ">
                <h1 className=" font-bold md:text-5xl">The Ecosystem for <span className="text-blue-300">Skill</span> Collaboration</h1>
                <p className="py-10">
                    Breaking Boundaries and Building Solutions
                </p>
                <p><button className="font-bold">How it Works</button></p>
            </div>
        </section>
    );
};

export default Hero;