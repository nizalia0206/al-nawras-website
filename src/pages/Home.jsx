import Hero from "../components/Hero";
import About from "../components/About";
import SystemsShowcase from "../components/SystemsShowcase";
import Industries from "../components/Industries";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <SystemsShowcase id="systems" />
      <Industries id="industries" />
    </>
  );
}
