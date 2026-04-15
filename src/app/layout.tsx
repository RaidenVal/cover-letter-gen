import type { Metadata } from "next";
import { Newsreader } from "next/font/google";
import Navigation from "@/components/Navigation";
import "./globals.css";

const newsreader = Newsreader({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-newsreader",
});

export const metadata: Metadata = {
  title: "Cover Letter Generator",
  description:
    "Generate tailored cover letters by matching your work stories to job descriptions",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${newsreader.variable} h-full`}>
      <body className="min-h-full flex flex-col font-serif">
        <Navigation />
        <main className="flex-1">{children}</main>
      </body>
    </html>
  );
}
