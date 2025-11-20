"use client";
import Link from "next/link";
import { useState } from "react";
// 1. Import usePathname from Next.js
import { usePathname } from 'next/navigation';

export default function Navbar({ user, logout }) {
    const [isOpen, setOpen] = useState(false);
    const closeMobileMenu = () => setOpen(false);

    // 2. Get the current path
    const currentPath = usePathname();

    // Define base and active styles
    const baseStyle = "text-sm font-medium transition-colors";
    const activeStyle = "text-indigo-600 border-b-2 border-indigo-600 pb-1"; // Desktop Active Style
    const inactiveStyle = "text-gray-700 hover:text-indigo-600";

    // Define mobile base and active styles
    const mobileBaseStyle = "block p-2 text-base font-medium rounded-md transition-colors";
    const mobileActiveStyle = "bg-indigo-50 text-indigo-700"; // Mobile Active Style
    const mobileInactiveStyle = "text-gray-700 hover:bg-gray-50 hover:text-indigo-600";

    // Function to generate the correct class name for desktop links
    const getDesktopLinkClasses = (href) => {
        // Special case for the root path ('/') to ensure '/blogs' is not active on '/'
        const isActive = href === '/' ? currentPath === '/' : currentPath.startsWith(href);

        return `${baseStyle} ${isActive ? activeStyle : inactiveStyle}`;
    };

    // Function to generate the correct class name for mobile links
    const getMobileLinkClasses = (href) => {
        const isActive = href === '/' ? currentPath === '/' : currentPath.startsWith(href);

        return `${mobileBaseStyle} ${isActive ? mobileActiveStyle : mobileInactiveStyle}`;
    };

    return (
        <header className="w-full bg-white text-gray-900 sticky top-0 z-50 border-b border-gray-200 shadow-sm">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Left: brand + mobile menu button */}
                    <div className="flex items-center gap-4">
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

                        <Link href="/" className="text-xl font-extrabold tracking-tight text-indigo-600">
                            SimpleBlog
                        </Link>
                    </div>

                    {/* Center: nav links (hidden on small) */}
                    <nav className="hidden lg:flex items-center lg:space-x-8 h-full" aria-label="Primary">
                        <Link href="/" className={getDesktopLinkClasses("/")}>Home</Link>
                        <Link href="/about" className={getDesktopLinkClasses("/about")}>About</Link>
                        <Link href="/blogs" className={getDesktopLinkClasses("/blogs")}>Blogs</Link>
                        {user && (
                            <Link href="/blogs/create" className={getDesktopLinkClasses("/blogs/create")}>Create</Link>
                        )}
                    </nav>

                    {/* Right: auth */}
                    <div className="flex items-center gap-4">
                        {!user ? (
                            <div className="flex items-center gap-3">
                                <Link href="/auth/login" className="text-sm font-medium text-gray-700 hover:text-indigo-600 transition-colors hidden sm:block">Login</Link>
                                <Link href="/auth/register" className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors shadow-md">Register</Link>
                            </div>
                        ) : (
                            <div className="flex items-center gap-4">
                                <span className="text-sm font-medium text-gray-700 hidden sm:block">Hi, **{user?.name}**</span>
                                <button
                                    onClick={logout}
                                    className="px-3 py-1 border border-gray-300 text-sm font-medium rounded-lg text-gray-700 hover:text-indigo-600 hover:border-indigo-600 transition-colors"
                                >
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>
                </div>
                {/* Mobile Menu (conditionally rendered) */}
                {
                    isOpen && (
                        <nav className="lg:hidden mt-2 space-y-2 pb-3 border-t border-gray-200" aria-label="Mobile Primary">
                            <Link onClick={closeMobileMenu} href="/" className={getMobileLinkClasses("/")}>Home</Link>
                            <Link onClick={closeMobileMenu} href="/about" className={getMobileLinkClasses("/about")}>About</Link>
                            <Link onClick={closeMobileMenu} href="/blogs" className={getMobileLinkClasses("/blogs")}>Blogs</Link>
                            <Link onClick={closeMobileMenu} href="/blogs/create" className={getMobileLinkClasses("/blogs/create")}>Create</Link>
                            {/* {user && (
                                <Link onClick={closeMobileMenu} href="/blogs/create" className={getMobileLinkClasses("/blogs/create")}>Create</Link>
                            )} */}
                            {/* Auth links for mobile, if not logged in */}
                            {!user && (
                                <Link onClick={closeMobileMenu} href="/auth/login" className={getMobileLinkClasses("/auth/login")}>Login</Link>
                            )}
                        </nav>
                    )
                }
            </div>
        </header>
    );
}