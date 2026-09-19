import Hero from "../components/Hero";
import About from "../components/About";
import Industries from "../components/Industries";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Industries id="industries" />
    </>
  );
}
