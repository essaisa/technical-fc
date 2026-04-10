import type { Metadata } from "next";
import Link from "next/link";
import { Geist, Geist_Mono, Press_Start_2P } from "next/font/google";
import "./globals.css";

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
          <nav className="border-b bg-white dark:bg-zinc-900">
            <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
              <Link href="/" className="text-xl font-bold">
                Technical FC
              </Link>

              <div className="flex gap-6 text-sm">
                <Link href="/">Dashboard</Link>
                <Link href="/players">Players</Link>
                <Link href="/compare">Compare</Link>
                <Link href="/search">Search</Link>
                <Link href="/shortlist">Shortlist</Link>
              </div>
            </div>
          </nav>

          <main className="mx-auto max-w-6xl px-6 py-8">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}