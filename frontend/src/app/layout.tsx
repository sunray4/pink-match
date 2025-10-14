import type { Metadata } from "next";
import { Cormorant_Garamond, Instrument_Sans } from "next/font/google";
import "./globals.css";
import Link from "next/dist/client/link";
import Image from "next/image";

const cormorantGaramond = Cormorant_Garamond({
  variable: "--font-cormorant-garamond",
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["400", "700"],
  display: "swap",
});

const instrumentSans = Instrument_Sans({
  variable: "--font-instrument-sans",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "PinkMatch - No Pink Tax",
  description: "Find fairer alternatives to products with pink tax markup",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${cormorantGaramond.variable} ${instrumentSans.variable} antialiased`}
      >
        <nav className="flex flex-row justify-between mx-40 mt-7 sm:text-lg">
          <Link href="/" className="">Home</Link>
          <Link href="/#how-it-works" className="">How It Works</Link>
          <Link href="/#why" className="">Why</Link>
        </nav>
        <div className="relative mt-3 mb-8 mx-14 h-2">
          <Image alt="line" src="/line.svg" fill />
        </div>
        {children}
      </body>
    </html>
  );
}
