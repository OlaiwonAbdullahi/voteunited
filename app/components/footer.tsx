"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Twitter, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-white fontroboto">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-4">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2">
              <Image src="/logo.jpg" alt="logo" width={100} height={100} />
            </Link>
            <p className="mt-3 text-sm text-muted-foreground max-w-xs">
              Empowering citizens to make informed political choices.
            </p>
            <div className="mt-3 text-sm text-muted-foreground max-w-xs flex flex-col">
              <div className="">Contact info:</div>
              <div className=" flex flex-col">
                <a href="mailto:info@voteunited.com" className=" text-black">
                  info@voteunited.com
                </a>
                <span>or </span>
                <a href="mailto:sales@voteunited.com" className=" text-black">
                  sales@voteunited.com
                </a>
              </div>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-sm uppercase tracking-wide text-foreground fontmont mb-3">
              Explore
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/politicians" className="hover:text-primary">
                  Politicians
                </Link>
              </li>

              <li>
                <Link href="/vote" className="hover:text-primary">
                  Vote
                </Link>
              </li>
              <li>
                <Link href="/resources" className="hover:text-primary">
                  Resources
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-sm uppercase tracking-wide text-foreground fontmont mb-3">
              Company
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/privacy" className="hover:text-primary">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-primary">
                  Terms of Use
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-sm uppercase tracking-wide text-foreground fontmont mb-3">
              Stay Informed
            </h4>
            <p className="text-sm text-muted-foreground mb-3">
              Get weekly updates on candidates and voting resources.
            </p>
            <div className="flex items-center gap-2">
              <div className="flex gap-3 text-muted-foreground">
                <Link
                  href="https://x.com/voteunitednews"
                  aria-label="Twitter"
                  className="hover:text-primary"
                >
                  <Twitter size={18} />
                </Link>

                <Link
                  href="mailto:info@voteunited.com"
                  aria-label="Email"
                  className="hover:text-primary"
                >
                  <Mail size={18} />
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-border pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Vote United. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-primary">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-primary">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
