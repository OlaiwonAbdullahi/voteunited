import type { Metadata, Viewport } from "next";
import { Montserrat, Roboto } from "next/font/google";
import "./globals.css";
import LayoutClient from "./layoutClient";
import { Toaster } from "react-hot-toast";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["400", "500", "600", "700"],
});

const roboto = Roboto({
  subsets: ["latin"],
  variable: "--font-roboto",
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "Vote United",
    template: "%s | Vote United",
  },
  metadataBase: new URL("https://www.voteunited.com"),
  description:
    "Vote United — Empowering citizens to make informed political choices. Track politicians, view stats, and engage in the democratic process.",
  keywords: [
    "Vote United",
    "Politics",
    "Voting",
    "Elections",
    "Democracy",
    "Politician Tracking",
    "Civic Engagement",
    "Nigeria",
  ],
  authors: [{ name: "Vote United Team" }],
  creator: "Vote United",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.voteunited.com",
    title: "Vote United",
    description: "Empowering citizens to make informed political choices.",
    siteName: "Vote United",
    images: [
      {
        url: "/logo.jpg",
        width: 1200,
        height: 630,
        alt: "Vote United Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Vote United",
    description: "Empowering citizens to make informed political choices.",
    images: ["/logo.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/logo.jpg" />
      </head>
      <body
        className={`${montserrat.variable} ${roboto.variable} font-sans antialiased`}
      >
        <LayoutClient>
          {children}
          <Toaster position="top-right" />
        </LayoutClient>
      </body>
    </html>
  );
}
