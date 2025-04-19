import Nav from "../Component/Nav";
import Hero from "../Component/Hero";
import WhyChooseUs from "../Component/WhyChooseUs";
import Ads from "../Component/Ads";
import About from "../Component/About";
export default function Home() {
  return (
    <div>
        <Nav />
        <Hero /> 
        <WhyChooseUs /> 
        <Ads />
        <About />
    </div>
  );
}