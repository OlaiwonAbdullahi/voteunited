import React from "react";
import Values from "./values";
import Image from "next/image";

const About = () => {
  return (
    <div>
      <div className="fontroboto">
        <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8 space-y-12">
          <div className=" max-w-5xl mx-auto flex flex-col md:flex-row gap-8 items-center">
            <div className=" flex flex-col gap-4">
              <h2 className="text-2xl md:text-3xl font-mont font-bold text-primary dark:text-white">
                What is VoteUnited?
              </h2>
              <div className=" space-y-4">
                <p className="text-lg text-slate-600 fontroboto dark:text-slate-400 max-w-2xl mx-auto ">
                  Vote United is a civic–engagement initiative dedicated to
                  empowering citizens, strengthening democracy, and inspiring
                  informed participation in elections at all levels. We believe
                  that every voice matters, every vote counts, and united
                  communities can build a stronger future.
                </p>
                <p className="text-lg text-slate-600 fontroboto dark:text-slate-400 max-w-2xl mx-auto ">
                  Our mission is to make voter education accessible, promote
                  transparency in the electoral process, and encourage citizens
                  to actively shape the policies that impact their lives.
                  Through community outreach, digital tools, and educational
                  resources, Vote United connects people to the information they
                  need to make confident voting decisions.
                </p>
                <p className="text-lg text-slate-600 fontroboto dark:text-slate-400 max-w-2xl mx-auto ">
                  Whether you are a first-time voter, a community leader, or
                  simply someone passionate about civic life, Vote United is
                  here to support and amplify your voice.
                </p>
              </div>
            </div>
            <div className="">
              <Image
                src="/flag.png"
                alt="voteunited"
                width={500}
                height={500}
                className="w-full h-[400px] object-cover "
              />
            </div>
          </div>
          <div className="">
            <Values />
          </div>
        </main>
      </div>
    </div>
  );
};

export default About;
