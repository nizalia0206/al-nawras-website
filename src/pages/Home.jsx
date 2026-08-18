import Hero from "../components/Hero";
import Industries from "../components/Industries";
import ServicesGrid from "../components/ServicesGrid";
import About from "../components/About";
import Brands from "../components/Brands";
import Projects from "../components/Projects";
import Testimonial from "../components/Testimonial";
import AskAI from "../components/AskAI";
import WhatsAppButton from "../components/WhatsAppButton";

export default function Home() {
  return (
    <>
      <Hero />
      <Industries id="industries" />
      <ServicesGrid id="systems" />
      <About />
      <Brands />
      <Projects />
      <Testimonial />
      <AskAI />
      <WhatsAppButton />
    </>
  );
}
