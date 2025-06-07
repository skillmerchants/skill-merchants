"use client"
import React from 'react';

const About = () => {
    return (
        <div className='flex flex-wrap justify-center w-full items-center gap-5 p-10 sec2 text-black'>   
            <div className='max-w-[350px] rounded-tr-4xl rounded-bl-4xl sec flex bg-fuchsia-50 flex-col border-l-1 border-b-1 text-left border-black p-5 m-5'>
              <h2 className='font-bold'>About Us</h2>
              <p>
                    Skill Merchants is a leading online platform that connects individuals with the skills they need to succeed in today's competitive job market. Our vision is to empower learners by providing access to high-quality training, resources, and job opportunities. We believe that everyone deserves the chance to learn, grow, and thrive in their careers.
              </p>
            </div>
            <div className='max-w-[350px] rounded-tr-4xl rounded-bl-4xl sec flex bg-fuchsia-50 flex-col border-l-1 border-b-1 text-left border-black p-5 m-5'>
              <h2 className='font-bold'>Our mission</h2>
              <p>
                  To create a global ecosystem where skills meet opportunity, we're passionate about empowering individuals to grow, learn and thrive by connecting them to the right training, jobs, and networks. By bringing together learners, educators, and employers, we aim to bridge the skills gap and drive economic growth for individuals and communities.
              </p>
            </div>
            <div className='max-w-[350px] rounded-tr-4xl rounded-bl-4xl sec flex bg-fuchsia-50 flex-col border-l-1 border-b-1 text-left border-black p-5 m-5'>
              <h2 className='font-bold'>Join Us</h2>
              <p>
                    Join us on our journey to transform the way people learn and work. Whether you're a learner seeking new skills, an educator looking to share your knowledge, or an employer searching for top talent, Skill Merchants is here to support you every step of the way. let's build a world where skills and opportunities are accessible and potential is limitless.
              </p>
            </div>

        </div>
    );
};

export default About;
