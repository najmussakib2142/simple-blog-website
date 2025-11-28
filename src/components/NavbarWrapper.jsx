"use client";
import { usePathname } from "next/navigation";
import Footer from "./Footer";
import Navbar from "./Navbar";

export default function NavbarWrapper() {
  const pathname = usePathname();
//   if (pathname.startsWith("/auth")) return null;
  if (pathname.startsWith("/admin")) return null;
  return <Navbar />;
}
