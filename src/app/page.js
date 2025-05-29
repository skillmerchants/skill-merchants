import Image from "next/image";

import Hero from "@app/Component/Hero";
import WhyChooseUs from "@app/Component/WhyChooseUs";
import About from "@app/Component/About";
import Nav from "@app/Component/Nav";
import Ads from "@app/Component/Ads";
import Tutors from "@app/Component/Tutors";
import Jobs from "./Component/Jobs";
import Contact from "./Component/Contact";
import Footer from "./Component/Footer";
export default function Page() {
  return (
    <div className="flex flex-col font-roboto text-center items-center justify-center bg-[rgba(222, 246, 250, 0.993)]">
        <Nav />
        <Hero /> 
        <WhyChooseUs /> 
        <Ads />
        <About />
        <Tutors />
        <Jobs />
        <Contact />
        <Footer />
    </div>
  );
}