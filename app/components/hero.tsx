import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import React from "react";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center px-6 md:px-12 lg:px-[85px] py-16 lg:py-[70px] text-white overflow-hidden fontroboto">
      <div className="absolute inset-0 -z-30">
        <video
          src="https://res.cloudinary.com/du7ljfa63/video/upload/v1763183840/voting_aosvdm.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      <div className="relative z-10 max-w-4xl space-y-6 text-center md:text-left mx-auto md:mx-0">
        <h1 className="text-4xl font-bold text-white tracking-tight  fontmont sm:text-5xl lg:text-6xl">
          Empowering<span className="text-primary"> Every Citizen</span>. <br />
          to Make Their Vote <span className="text-secondary">Count.</span>
        </h1>

        <p className="text-lg text-gray-200 leading-relaxed">
          Stay informed, choose wisely, and let your voice be heard.{" "}
        </p>

        <div className="flex flex-col gap-3 sm:flex-row fontroboto">
          <Button size="lg" asChild className=" shadow-none rounded-none">
            <Link href="/vote" className="gap-2">
              Get Started
              <ArrowRight size={18} />
            </Link>
          </Button>
          <Button
            size="lg"
            variant="outline"
            asChild
            className=" shadow-none rounded-none border-primary bg-transparent"
          >
            <Link href="/politicians">Explore Politicians</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
