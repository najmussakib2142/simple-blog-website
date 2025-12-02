"use client";
import Link from "next/link";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import Swal from "sweetalert2";
import { PenTool, Search, User } from 'lucide-react';
import Image from "next/image";

export default function Navbar() {
    const { user, loading, logout } = useAuth();
    const [isOpen, setOpen] = useState(false);
    const closeMobileMenu = () => setOpen(false);
    const currentPath = usePathname();
    const [showSearch, setShowSearch] = useState(false);
    const [query, setQuery] = useState("");
    const router = useRouter();


    const handleSearch = (e) => {
        e.preventDefault();
        router.push(`/blogs?search=${query}`);
        setShowSearch(false);
    };

    const handleLogout = async () => {
        // Show confirmation dialog
        const result = await Swal.fire({
            title: "Are you sure?",
            text: "You will be logged out of your account.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#000000",
            cancelButtonColor: "#6b7280", // gray-500


            confirmButtonText: "Yes, logout",
        });

        if (result.isConfirmed) {
            try {
                await logout();
                await Swal.fire({
                    title: "Logged out!",
                    text: "You have been successfully logged out.",
                    icon: "success",
                    timer: 2000, // auto close after 2 seconds
                    showConfirmButton: false,
                });
                router.push("/");
            } catch (err) {
                Swal.fire("Error", err.message, "error");
            }
        }
    };

    const baseStyle = "text-sm font-medium transition-colors duration-200";
    const activeStyle =
        "text-transparent bg-clip-text bg-gradient-to-r from-black via-gray-800 to-black border-b-2 border-black pb-1";
    const inactiveStyle =
        "text-black hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-black hover:via-gray-800 hover:to-black";

    // Mobile nav links
    const mobileBaseStyle =
        "block p-2 text-base font-medium rounded-md transition-colors duration-200";
    const mobileActiveStyle =
        "bg-black/10 text-black font-semibold"; // subtle black glow background for active
    const mobileInactiveStyle =
        "text-black hover:bg-black/5 hover:text-black/80";

    const getDesktopLinkClasses = (href) => {
        const isActive =
            href === "/" ? currentPath === "/" : currentPath.startsWith(href);
        return `${baseStyle} ${isActive ? activeStyle : inactiveStyle}`;
    };

    const getMobileLinkClasses = (href) => {
        const isActive =
            href === "/" ? currentPath === "/" : currentPath.startsWith(href);
        return `${mobileBaseStyle} ${isActive ? mobileActiveStyle : mobileInactiveStyle}`;
    };



    return (
        <header className="w-full fixed top-0 left-0 right-0 z-50           bg-white/70 backdrop-blur-lg border-b border-gray-200   text-black shadow-sm">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-14">

                    {/* Left: brand + mobile menu button */}
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => setOpen(!isOpen)}
                            className="lg:hidden p-2 rounded-md hover:bg-gray-100 transition-colors"
                            aria-label={isOpen ? "Close menu" : "Open menu"}
                        >
                            {isOpen ? (
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            )}
                        </button>

                        <Link
                            href="/"
                            className="relative text-xl md:text-2xl font-extrabold tracking-tight text-black group"
                        >
                            SimpleBlog
                            <span
                                className="absolute left-0 -bottom-1 h-[2px] w-0 bg-black transition-all duration-300 group-hover:w-full"
                            ></span>
                        </Link>

                    </div>

                    {/* Center: nav links */}
                    <nav className="hidden lg:flex items-center lg:space-x-8 h-full" aria-label="Primary">
                        <Link href="/" className={getDesktopLinkClasses("/")}>
                            Home
                        </Link>
                        <Link href="/about" className={getDesktopLinkClasses("/about")}>
                            About
                        </Link>
                        <Link href="/blogs" className={getDesktopLinkClasses("/blogs")}>
                            Blogs
                        </Link>
                        {user && (
                            <Link href="/create" className={getDesktopLinkClasses("/create")}>
                                Create
                            </Link>
                        )}
                        {!loading && user?.role === "admin" && (
                            <Link href="/admin" className={getDesktopLinkClasses("/admin")}>
                                Admin Dashboard
                            </Link>
                        )}
                    </nav>

                    {/* Right: auth */}
                    <div className="flex items-center gap-4">
                        {/* <div>
                            <button
                                onClick={() => setShowSearch(!showSearch)}
                                className="p-2 hover:bg-gray-100 rounded-md"
                            >
                                <Search className="w-5 h-5" />
                            </button>

                            {showSearch && (
                                <form
                                    onSubmit={handleSearch}
                                    className="absolute top-14 right-4 bg-white border shadow-lg p-2 rounded-lg flex"
                                >
                                    <input
                                        type="text"
                                        placeholder="Search blogs..."
                                        className="border p-2 rounded-md w-48"
                                        value={query}
                                        onChange={(e) => setQuery(e.target.value)}
                                    />
                                </form>
                            )}
                        </div> */}

                        <div className="flex items-center space-x-2">
                            {/* Toggle button */}
                            <button
                                onClick={() => setShowSearch(!showSearch)}
                                className="p-2 hover:bg-gray-100 rounded-md"
                            >
                                <Search className="w-5 h-5" />
                            </button>

                            {/* Search field inline in navbar */}
                            {showSearch && (
                                <form onSubmit={handleSearch} className="flex items-center">
                                    <input
                                        type="text"
                                        placeholder="Search blogs..."
                                        className="border p-1 rounded-md w-48"
                                        value={query}
                                        onChange={(e) => setQuery(e.target.value)}
                                    />
                                </form>
                            )}
                        </div>


                        {!user ? (
                            <div className="flex items-center gap-3">
                                <Link
                                    href="/auth/login"
                                    className="px-4 py-1.5 text-sm font-medium rounded-lg shadow-md transition transform hover:scale-[1.03] active:scale-[0.97] border-gray-400 text-black hover:bg-gray-100 bg-white  border  hidden sm:block"
                                >
                                    Login
                                </Link>
                                <Link
                                    href="/auth/register"
                                    className="md:px-4 px-4 py-1.5 bg-linear-to-r from-gray-800 to-black hover:from-gray-700 hover:to-gray-900    text-white text-sm md:text-md font-medium rounded-md md:rounded-lg shadow-md  transition transform hover:scale-[1.03] active:scale-[0.97] focus:outline-none focus:ring-black focus:ring-opacity-50"
                                >
                                    Register
                                </Link>
                            </div>
                        ) : (
                            <div className="flex items-center gap-4">
                                <div className="flex items-center gap-x-2 text-sm font-medium text-black">
                                    {user?.photoURL ? (
                                        <Image
                                            src={user.photoURL}
                                            alt="User Avatar"
                                            width={32}
                                            height={32}
                                            className="h-8 w-8 rounded-full object-cover border border-black"
                                        />
                                    ) : (
                                        <User className="h-8 w-8 border border-black rounded-full text-black" aria-hidden="true" />
                                    )}
                                    {/* <span>Hi, {user?.displayName || user?.email}</span> */}
                                </div>

                                <button
                                    onClick={handleLogout}
                                    className="px-4 py-1.5 text-md font-medium rounded-lg shadow-md transition transform hover:scale-[1.03] active:scale-[0.97] bg-white text-black border border-gray-300 hover:bg-gray-50 hidden sm:block"
                                >
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Mobile Menu */}
                {isOpen && (
                    <nav className="lg:hidden mt-2 space-y-2 pb-3 border-t border-gray-200" aria-label="Mobile Primary">
                        <Link onClick={closeMobileMenu} href="/" className={getMobileLinkClasses("/")}>
                            Home
                        </Link>
                        <Link onClick={closeMobileMenu} href="/about" className={getMobileLinkClasses("/about")}>
                            About
                        </Link>
                        <Link onClick={closeMobileMenu} href="/blogs" className={getMobileLinkClasses("/blogs")}>
                            Blogs
                        </Link>
                        {user && (
                            <Link onClick={closeMobileMenu} href="/create" className={getMobileLinkClasses("/create")}>
                                Create
                            </Link>
                        )}
                        {!loading && user?.role === "admin" && (
                            <Link href="/admin" className={getMobileLinkClasses("/admin")}>
                                Admin Dashboard
                            </Link>
                        )}

                        {!user && (
                            <Link
                                onClick={closeMobileMenu}
                                href="/auth/login"
                                className={getMobileLinkClasses("/auth/login") + " text-white bg-black hover:bg-gray-900 w-full text-center"}
                            >
                                Login
                            </Link>
                        )}

                        {user && (
                            <button
                                onClick={() => {
                                    handleLogout();
                                    closeMobileMenu();
                                }}
                                className={`${mobileBaseStyle} text-red-600 hover:bg-red-50 hover:text-red-700 w-full text-left`}
                            >
                                Logout
                            </button>
                        )}
                    </nav>
                )}
            </div>
        </header>

    );
}
