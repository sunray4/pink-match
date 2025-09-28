import type { Metadata } from "next";
import { Cormorant_Garamond, Instrument_Sans } from "next/font/google";
import "./globals.css";

const cormorantGaramond = Cormorant_Garamond({
  variable: "--font-cormorant-garamond",
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["400", "700"],
});

const instrumentSans = Instrument_Sans({
  variable: "--font-instrument-sans",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
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
        {children}
      </body>
    </html>
  );
}
