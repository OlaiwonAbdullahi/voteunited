import About from "./components/about";
import Hero from "./components/hero";
import Manifesto from "./components/manifesto";

const Page = () => {
  return (
    <div className="space-y-12">
      <Hero />
      <About />
      <Manifesto />
      {/*
      <Partners />
      */}
    </div>
  );
};

export default Page;
