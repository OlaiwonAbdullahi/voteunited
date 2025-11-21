"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-primary/20 fontroboto bg-white text-[#0A3161] backdrop-blur">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 font-mont">
            <Image src="/flag.png" alt="flag" width={24} height={34} />
            <span className=" text-xl font-bold text-primary sm:inline">
              Vote United
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden gap-1 md:flex ">
            <Button variant="ghost" asChild className="text-base">
              <Link href="/about">About</Link>
            </Button>
            <Button variant="ghost" asChild className="text-base">
              <Link href="/politicians">Politicians</Link>
            </Button>
            <Button variant="ghost" asChild className="text-base">
              <Link href="/polling-station">Polling Station</Link>
            </Button>
            <Button variant="ghost" asChild className="text-base ">
              <Link href="/bills">Bills</Link>
            </Button>
            <Button variant="ghost" asChild className="text-base">
              <Link href="/vote">Vote</Link>
            </Button>
            <Button variant="ghost" asChild className="text-base">
              <Link href="/resources">Resources</Link>
            </Button>
          </nav>

          {/* Auth Buttons */}
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              className="hidden sm:inline-flex gap-2 text-base bg-transparent shadow-none rounded-none border-primary"
              asChild
            >
              <Link href="/login">Sign In</Link>
            </Button>
            <Button
              className="hidden sm:inline-flex gap-2 text-base shadow-none rounded-none"
              asChild
            >
              <Link href="/signup">Create Account</Link>
            </Button>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <nav className="border-t border-border py-4 md:hidden space-y-2">
            <Button variant="ghost" className="w-full justify-start" asChild>
              <Link href="/about">About</Link>
            </Button>
            <Button variant="ghost" className="w-full justify-start" asChild>
              <Link href="/politicians">Politicians</Link>
            </Button>
            <Button variant="ghost" className="w-full justify-start" asChild>
              <Link href="/polling-station">Polling Station</Link>
            </Button>
            <Button variant="ghost" className="w-full justify-start" asChild>
              <Link href="/bills">Bills</Link>
            </Button>

            <Button variant="ghost" className="w-full justify-start" asChild>
              <Link href="/vote">Vote</Link>
            </Button>
            <Button variant="ghost" className="w-full justify-start" asChild>
              <Link href="/resources">Resources</Link>
            </Button>
            <div className="flex flex-col gap-2 pt-2 border-t border-border">
              <Button
                variant="outline"
                className="w-full bg-transparent"
                asChild
              >
                <Link href="/login">Sign In</Link>
              </Button>
              <Button className="w-full" asChild>
                <Link href="/signup">Create Account</Link>
              </Button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
