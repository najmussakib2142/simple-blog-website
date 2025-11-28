// "use client";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { AuthProvider } from "@/context/AuthContext";
// import NavbarWrapper from "@/components/NavbarWrapper";
import FooterWrapper from "@/components/FooterWrapper";
import NavbarWrapper from "@/components/NavbarWrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Simple Blog Website",
   icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
  },
  description: "A simple blog website built with Next.js and Tailwind CSS",
};

export default function RootLayout({ children }) {

  return (
    <html lang="en">
      
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased `}>
        <AuthProvider>
          {/* <Navbar /> */}
          <NavbarWrapper />
          <main className="bg-[#FAFAFA] pt-14">{children}</main>
          <FooterWrapper />
        </AuthProvider>
      </body>
    </html>
  );
}
