import type { Metadata } from "next";
import Link from "next/link";
import { Geist, Geist_Mono, Press_Start_2P } from "next/font/google";
import "./globals.css";
import Navbar from "@/app/components/Navbar"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const pressStart = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Technical FC",
  description: "Football scouting platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${pressStart.className} antialiased bg-zinc-50 text-black dark:bg-black dark:text-white`}
      >
        <div className="min-h-screen">
        <Navbar />
          <main className="mx-auto max-w-6xl px-6 py-8">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}