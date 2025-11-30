"use client";

import { usePathname } from "next/navigation";
import Navbar from "./components/navbar";
import Footer from "./components/footer";

export default function LayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const hidePaths = ["/auth"];
  const pathname = usePathname();

  const hideNavbar = hidePaths.includes(pathname);
  return (
    <>
      {!hideNavbar && <Navbar />}
      {children}
      {!hideNavbar && <Footer />}
    </>
  );
}
