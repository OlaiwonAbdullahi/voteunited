"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, LogOut, User, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error("Failed to parse user data", e);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    router.push("/");
    router.refresh();
  };

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
          <nav className="hidden gap-1 lg:flex ">
            <Button variant="ghost" asChild className="text-base">
              <Link href="/politicians">Politicians</Link>
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

          {/* Auth Buttons & Mobile Toggle */}
          <div className="flex items-center gap-2 flex-row-reverse fontroboto">
            {user ? (
              <div className="flex items-center gap-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="relative h-10 w-10 rounded-full"
                    >
                      <Avatar className="h-10 w-10">
                        <AvatarImage
                          src={
                            user.avatar ||
                            `https://api.dicebear.com/9.x/glass/svg?seed=${user.name}`
                          }
                          alt={user.name || "User"}
                        />
                        <AvatarFallback>
                          {user.name ? user.name.charAt(0).toUpperCase() : "U"}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    className="w-56 fontroboto"
                    align="end"
                    forceMount
                  >
                    <DropdownMenuItem className="font-medium">
                      <User className="mr-1 h-4 w-4" />
                      <span>{user.name}</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="font-medium">
                      <Mail className="mr-1 h-4 w-4" />
                      <span>{user.email.slice(0, 20)}...</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={handleLogout}
                      className="text-red-500"
                    >
                      <LogOut className="mr-1 h-4 w-4" />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <Button
                className="hidden lg:inline-flex gap-2 text-base shadow-none rounded-none"
                asChild
              >
                <Link href="/auth">Sign up / Log in</Link>
              </Button>
            )}

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <nav className="border-t border-border py-4 lg:hidden space-y-2">
            <Button variant="ghost" className="w-full justify-start" asChild>
              <Link href="/politicians">Politicians</Link>
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
              {!user && (
                <Button className="w-full" asChild>
                  <Link href="/auth">Sign up / Log in</Link>
                </Button>
              )}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
