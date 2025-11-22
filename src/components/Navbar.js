"use client";
import Link from "next/link";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import Swal from "sweetalert2";
import { User } from 'lucide-react';

export default function Navbar() {
    const { user, logout } = useAuth(); // logout comes from AuthContext
    const [isOpen, setOpen] = useState(false);
    const closeMobileMenu = () => setOpen(false);
    const currentPath = usePathname();
    const router = useRouter();

    const handleLogout = async () => {
        // Show confirmation dialog
        const result = await Swal.fire({
            title: "Are you sure?",
            text: "You will be logged out of your account.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
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

    const baseStyle = "text-sm font-medium transition-colors";
    const activeStyle = "text-blue-900 border-b-2 border-blue-900 pb-1";
    const inactiveStyle = "text-gray-700 hover:text-blue-900";

    const mobileBaseStyle =
        "block p-2 text-base font-medium rounded-md transition-colors";
    const mobileActiveStyle = "bg-indigo-50 text-indigo-700";
    const mobileInactiveStyle =
        "text-gray-700 hover:bg-gray-50 hover:text-blue-900";

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
        <header className="w-full fixed top-0 left-0 right-0 z-50 
                bg-transparent backdrop-blur-lg 
                border-b border-white/20 text-gray-900  shadow-sm">
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
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            ) : (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                </svg>
                            )}
                        </button>

                        <Link
                            href="/"
                            className="text-xl md:text-2xl font-extrabold tracking-tight text-blue-900"
                        >
                            SimpleBlog
                        </Link>
                    </div>

                    {/* Center: nav links */}
                    <nav
                        className="hidden lg:flex items-center lg:space-x-8 h-full"
                        aria-label="Primary"
                    >
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
                            <Link
                                href="/create"
                                className={getDesktopLinkClasses("/create")}
                            >
                                Create
                            </Link>
                        )}
                    </nav>

                    {/* Right: auth */}
                    <div className="flex items-center gap-4">
                        {!user ? (
                            <div className="flex items-center gap-3">
                                <Link
                                    href="/auth/login"
                                    className="px-4 py-1.5 text-sm font-medium rounded-lg shadow-md transition transform hover:scale-[1.03] active:scale-[0.97] focus:outline-none  focus:ring-gray-300 focus:ring-opacity-50   bg-white text-gray-700 border border-gray-300 hover:bg-gray-50  hidden sm:block"
                                >
                                    Login
                                </Link>
                                <Link
                                    href="/auth/register"
                                    className="md:px-4 px-4 py-1.5 border border-blue-900 bg-blue-900 text-white text-sm md:text-md font-medium rounded-md md:rounded-lg shadow-md hover:bg-indigo-700 hover:border-indigo-700 transition transform hover:scale-[1.03] active:scale-[0.97] focus:outline-none  focus:ring-blue-500 focus:ring-opacity-50"
                                >
                                    Register
                                </Link>
                            </div>
                        ) : (
                            <div className="flex items-center gap-4">
                                <div className="flex  items-center gap-x-2 text-sm font-medium text-gray-700">
                                    <User className="h-4 w-4 border md:border-none border-blue-900 rounded-full text-blue-900" aria-hidden="true" />
                                    <span>Hi, {user?.displayName || user?.email}</span>
                                </div>

                                <button
                                    onClick={handleLogout}
                                    className="px-4 py-1.5 text-md font-medium rounded-lg shadow-md transition transform hover:scale-[1.03] active:scale-[0.97] focus:outline-none  focus:ring-gray-300 focus:ring-opacity-50   bg-white text-gray-700 border border-gray-300 hover:bg-gray-50  hidden sm:block"
                                >
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>
                </div>


                {/* Mobile Menu */}
                {isOpen && (

                    <nav
                        className="lg:hidden mt-2 space-y-2 pb-3 border-t border-gray-200"
                        aria-label="Mobile Primary"
                    >
                        

                        <Link
                            onClick={closeMobileMenu}
                            href="/"
                            className={getMobileLinkClasses("/")}
                        >
                            Home
                        </Link>
                        <Link
                            onClick={closeMobileMenu}
                            href="/about"
                            className={getMobileLinkClasses("/about")}
                        >
                            About
                        </Link>
                        <Link
                            onClick={closeMobileMenu}
                            href="/blogs"
                            className={getMobileLinkClasses("/blogs")}
                        >
                            Blogs
                        </Link>
                        {user && (
                            <Link
                                onClick={closeMobileMenu}
                                href="/create"
                                className={getMobileLinkClasses("/create")}
                            >
                                Create
                            </Link>
                        )}

                        {!user && (
                            <Link
                                onClick={closeMobileMenu}
                                href="/auth/login"
                                className={getMobileLinkClasses("/auth/login") + " text-white  max-w-1/4 text-center bg-blue-900 hover:bg-indigo-700 hover:text-white"}
                            >
                                Login
                            </Link>
                        )}

                        {/* 🌟 NEW: Mobile Logout Button 🌟 */}
                        {user && (
                            <button
                                onClick={() => {
                                    handleLogout(); // Execute the logout logic
                                    closeMobileMenu(); // Close the menu immediately after initiating logout
                                }}
                                // Uses the base style, but modifies color to red for visual distinction
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
