"use client";
import Link from "next/link";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { ArrowLeft, ChevronDown, Search, X } from 'lucide-react'; // Removed unused PenTool and User
import Image from "next/image";
import DrawOutlineButton from "./DrawOutlineButton"; // Assuming this component exists
import SearchModal from "./SearchModal";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/context/AuthContext";

export default function Navbar() {
    const { user, loading, logout } = useAuth();
    const [isOpen, setOpen] = useState(false);
    const closeMobileMenu = () => setOpen(false);
    const currentPath = usePathname();
    const [showSearch, setShowSearch] = useState(false);
    const [query, setQuery] = useState("");
    const router = useRouter();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const handleSearch = (e) => {
        e.preventDefault();
        router.push(`/blogs?search=${query}`);
        setShowSearch(false);
    };

    const handleLinkClick = () => {
        setIsDropdownOpen(false);
    };

    const handleSelectAction = (e) => {
        const value = e.target.value;

        if (!value) return;

        // if (value === "LOGOUT_ACTION") {
        //     console.log("Logging out...");
        //     return;
        // }
        router.push(value);
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
                    timer: 2000,
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
        "block p-2 text-base font-medium rounded-sm transition-colors duration-200";
    const mobileActiveStyle =
        "bg-black/10 text-black font-semibold";
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
        <> {/* Use React Fragment to allow the Modal to be a sibling of <header> */}
            <header className="w-full fixed top-0 left-0 right-0 z-50 bg-white/70 backdrop-blur-lg border-b border-gray-200 text-black shadow-sm">
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
                                className="relative text-xl md:text-2xl font-bold tracking-tight text-transparent bg-clip-text bg-linear-to-r from-gray-800 to-black group"
                            >
                                SimpleBlog
                                <span
                                    className="absolute left-0 -bottom-1 h-[2px] w-0 bg-black transition-all duration-300 group-hover:w-full"
                                ></span>
                            </Link>

                        </div>

                        {/* Center: nav links */}
                        <nav className="hidden lg:flex items-center lg:space-x-8 h-full" aria-label="Primary">
                            <Link href="/" className={getDesktopLinkClasses("/")}>Home</Link>
                            <Link href="/about" className={getDesktopLinkClasses("/about")}>About</Link>
                            <Link href="/blogs" className={getDesktopLinkClasses("/blogs")}>Blogs</Link>
                            {user && (<Link href="/create" className={getDesktopLinkClasses("/create")}>Create</Link>)}
                            {!loading && user?.role === "admin" && (<Link href="/admin" className={getDesktopLinkClasses("/admin")}>Dashboard</Link>)}

                            {/* 🔽 Hover Dropdown on "Profile" */}
                            {user && (
                                <div
                                    className="relative"
                                    onMouseEnter={() => setIsDropdownOpen(true)}
                                    onMouseLeave={() => setIsDropdownOpen(false)}
                                >
                                    <button
                                        className={`${getDesktopLinkClasses("/profile")} cursor-pointer`}
                                    >
                                        <span className="inline-flex items-center">Profile  <ChevronDown className="w-4 h-4 ml-1" /></span>
                                    </button>

                                    <AnimatePresence>
                                        {isDropdownOpen && (
                                            <motion.div
                                                initial={{ opacity: 0, y: -10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -10 }}
                                                transition={{ duration: 0.2 }}
                                                className="absolute space-y-2 right-0 left-0 flex flex-col text-center p-1 mt-4 w-36 bg-white border border-gray-200 shadow-lg rounded-sm z-10"
                                            >
                                                <Link
                                                    href="/profile"
                                                    // className={getDesktopLinkClasses("/profile")}
                                                    className="block text-sm font-medium transition-colors duration-200 px-4 py-1 hover:bg-gray-100"
                                                >
                                                    My Profile
                                                </Link>
                                                <Link
                                                    href="/posts"
                                                    // className={getDesktopLinkClasses("/posts")}
                                                    className="block text-sm font-medium transition-colors duration-200  px-4 py-1 hover:bg-gray-100"
                                                >
                                                    My Posts
                                                </Link>
                                                <Link
                                                    href="/bookmarks"
                                                    // className={getDesktopLinkClasses("/bookmarks")}
                                                    className="block text-sm font-medium transition-colors duration-200 px-4 py-1 hover:bg-gray-100"
                                                >
                                                    Bookmarks
                                                </Link>
                                                <Link
                                                    href="/likes"
                                                    // className={getDesktopLinkClasses("/bookmarks")}
                                                    className="block text-sm font-medium transition-colors duration-200 px-4 py-1 hover:bg-gray-100"
                                                >
                                                    Activity Log
                                                </Link>

                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            )}
                        </nav>

                        {/* Right: auth */}
                        <div className="flex items-center shrink-0 gap-4">

                            {/* mobile search */}
                            {/* <div className="block md:hidden">
                                <button
                                    onClick={() => setShowSearch(!showSearch)}
                                    className="p-2 hover:bg-gray-100 rounded-sm"
                                >
                                    <Search className="w-5 h-5" />
                                </button>

                                {showSearch && (
                                    <div className="fixed inset-0 bg-white z-50 px-2 py-2">
                                        <form onSubmit={handleSearch} className="flex items-center gap-2">
                                            <button
                                                type="button"
                                                onClick={() => setShowSearch(false)}
                                                className="p-1"
                                            >
                                                <ArrowLeft className="w-6 h-6" />
                                            </button>

                                            <input
                                                type="search"
                                                placeholder="Search blogs..."
                                                className=" p-2 w-full text-lg focus:outline-none"
                                                value={query}
                                                onChange={(e) => setQuery(e.target.value)}
                                                autoFocus
                                                enterKeyHint="search"
                                            />
                                        </form>
                                    </div>
                                )}
                            </div> */}

                            {/* large screen search toggle button */}
                            <div className="flex items-center space-x-2">
                                <button
                                    onClick={() => setShowSearch(!showSearch)}
                                    className="p-2 hover:bg-gray-100 rounded-sm"
                                >
                                    <Search className="w-5 h-5" />
                                </button>
                                {/* The full-screen modal content for large screens is moved outside the header */}
                            </div>

                            {/* Auth/User Dropdown */}
                            {!user ? (
                                <div className="flex items-center gap-3">
                                    <Link
                                        href="/auth/login"
                                        className=" text-sm font-medium transition transform hover:border-white border border-gray-300 text-black hidden sm:block"
                                    >
                                        <DrawOutlineButton>
                                            <span className="flex items-center space-x-1">
                                                <span>Login</span>
                                            </span>
                                        </DrawOutlineButton>
                                    </Link>

                                    <Link
                                        href="/auth/register"
                                        className="px-4 py-2 sm:py-2 md:py-2 lg:py-2 bg-linear-to-r from-gray-800 to-black hover:from-gray-700 hover:to-gray-900 text-white text-sm md:text-md font-medium shadow-md transition transform hover:scale-[1.03] active:scale-[0.97]"
                                    >
                                        Register
                                    </Link>
                                </div>
                            ) : (
                                <div className="flex items-center gap-4">
                                    <div className="relative">
                                        <button
                                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                            className="h-8 w-8 rounded-full overflow-hidden focus:outline-none cursor-pointer"
                                            aria-expanded={isDropdownOpen}
                                            aria-controls="user-menu-dropdown"
                                        >
                                            <Image
                                                src={user.photoURL}
                                                alt="User Avatar"
                                                width={32}
                                                height={32}
                                                className="h-8 w-8 rounded-full object-cover border border-black"
                                            />
                                        </button>


                                    </div>

                                    <div
                                        className="text-md font-medium shadow-md transition transform hover:scale-[1.03] active:scale-[0.97] bg-white text-black border border-gray-300 hover:bg-gray-50 hidden sm:block"
                                    >
                                        <DrawOutlineButton onClick={handleLogout}>
                                            <span className="flex items-center space-x-1">
                                                <span>Logout</span>
                                            </span>
                                        </DrawOutlineButton>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Mobile Menu */}
                    {/* Mobile Menu */}


                </div>
            </header>

            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Backdrop with blur */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.25 }}
                            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
                            onClick={closeMobileMenu}
                        />

                        {/* Sliding Panel from left */}
                        <motion.nav
                            initial={{ x: "-100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "-100%" }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            className="fixed h-full top-0 space-y-1 left-0 h-full w-72 bg-white shadow-xl z-50 px-4 py-4 flex flex-col"
                        >
                            <div className="flex gap-3 pb-3 items-center border-b border-gray-300 mb-4">
                                <button
                                    onClick={closeMobileMenu}
                                    className="rounded-md text-gray-800 hover:text-black"
                                >
                                    <X className="w-6 h-6" />
                                </button>
                                <Link
                                    href="/"
                                    className="text-xl md:text-2xl font-bold tracking-tight text-transparent bg-clip-text bg-linear-to-r from-gray-800 to-black"
                                >
                                    SimpleBlog
                                </Link>
                            </div>

                            {/* Menu Links */}
                            <div className="flex-1 flex flex-col justify-between">
                                <div className="flex flex-col space-y-2">
                                    <Link onClick={closeMobileMenu} href="/" className={getMobileLinkClasses("/")}>Home</Link>
                                    <Link onClick={closeMobileMenu} href="/about" className={getMobileLinkClasses("/about")}>About</Link>
                                    <Link onClick={closeMobileMenu} href="/blogs" className={getMobileLinkClasses("/blogs")}>Blogs</Link>
                                    {user && <Link onClick={closeMobileMenu} href="/create" className={getMobileLinkClasses("/create")}>Create</Link>}
                                    {!loading && user?.role === "admin" && <Link onClick={closeMobileMenu} href="/admin" className={getMobileLinkClasses("/admin")}>Admin Dashboard</Link>}
                                    {user && <Link onClick={closeMobileMenu} href="/profile" className={getMobileLinkClasses("/profile")}>My Profile</Link>}
                                    {user && <Link onClick={closeMobileMenu} href="/posts" className={getMobileLinkClasses("/posts")}>My Posts</Link>}
                                    {user && <Link onClick={closeMobileMenu} href="/bookmarks" className={getMobileLinkClasses("/bookmarks")}>Bookmarks</Link>}
                                    {user && <Link onClick={closeMobileMenu} href="/likes" className={getMobileLinkClasses("/likes")}>Activity Log</Link>}
                                </div>

                                {/* Bottom Login/Logout */}
                                <div className="flex flex-col space-y-2">
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
                                            className={`${mobileBaseStyle} bg-red-600 text-center text-white hover:bg-red-700 w-full `}
                                        >
                                            Logout
                                        </button>
                                    )}
                                </div>
                            </div>

                        </motion.nav>
                    </>
                )}
            </AnimatePresence>


            {/* 🎯 FULL-SCREEN SEARCH ASIDE (MD AND UP) - PLACED OUTSIDE <header> */}
            <SearchModal
                show={showSearch} // Pass the state to control visibility
                onClose={() => setShowSearch(false)} // Pass the function to close the modal
                initialQuery={query} // Pass the current query if you want to maintain state
            />
        </>
    );
}