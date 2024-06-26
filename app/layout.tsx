
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import Footer from "./_component/Footer";
import BackgroundHome from "./_component/BackgroundHome";
import BackgroundTv from "./_component/BackgroundTv";
import Navbar from "./_component/Navbar";
import DataProvider from "@/context/dataContext";

const inter = Poppins({weight: "400", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Netflix || Chill Movie",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
  <SessionProvider>
      <html lang="en">
        <body className={`bg-black h-screen text-white ${inter.className}`}>
          <DataProvider>
              <Navbar />
              {children}
              <Footer />
          </DataProvider>
        </body>
      </html> 
    </SessionProvider>
  );
}
