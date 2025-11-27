import About from "./components/about";
import Hero from "./components/hero";

const Page = () => {
  return (
    <div className="space-y-12">
      <Hero />
      {/*
      <Partners />
      */}
      <About />
    </div>
  );
};

export default Page;
