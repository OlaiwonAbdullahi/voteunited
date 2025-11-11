"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-border fontroboto">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 md:gap-8 items-center">
          {/* Left Content */}
          <div className="space-y-6">
            <h1 className="text-4xl font-bold tracking-tight text-foreground fontmont sm:text-5xl lg:text-6xl">
              Empowering<span className="text-primary"> Every Citizen</span>.{" "}
              <br />
              to Make Their Vote <span className="text-secondary">Count.</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Stay informed, choose wisely, and let your voice be heard.{" "}
            </p>
            <div className="flex flex-col gap-3 sm:flex-row fontroboto">
              <Button size="lg" asChild>
                <Link href="/signup" className="gap-2">
                  Get Started
                  <ArrowRight size={18} />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/politicians">Explore Politicians</Link>
              </Button>
            </div>
          </div>

          {/* Right Visual */}
          <div className=" h-80 rounded-xl border border-border  flex items-center justify-center">
            <img
              src="/flag.png"
              alt="flag"
              width={24}
              height={34}
              className=" h-full w-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
