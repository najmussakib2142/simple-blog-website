"use client";
import Link from "next/link";

export default function Navbar({ user, logout }) {
    return (
        <header className="w-full bg-white text-gray-900 sticky top-0 z-50 border-b border-gray-200">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Left: brand + mobile menu button */}
                    <div className="flex items-center gap-4">
                        <button className="lg:hidden p-2 rounded-md hover:bg-gray-100" aria-label="Open menu">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>

                        <Link href="/" className="text-lg font-extrabold">SimpleBlog</Link>
                    </div>

                    {/* Center: nav links (hidden on small) */}
                    <nav className="hidden lg:flex lg:space-x-8" aria-label="Primary">
                        <Link href="/" className="text-sm font-medium text-gray-700 hover:text-indigo-600 transition-colors">Home</Link>
                        <Link href="/about" className="text-sm font-medium text-gray-700 hover:text-indigo-600 transition-colors">About</Link>
                        <Link href="/blogs" className="text-sm font-medium text-gray-700 hover:text-indigo-600 transition-colors">Blogs</Link>
                        <Link href="/blogs/create" className="text-sm font-medium text-gray-700 hover:text-indigo-600 transition-colors">Create</Link>
                    </nav>

                    {/* Right: auth */}
                    <div className="flex items-center gap-4">
                        {!user ? (
                            <div className="flex items-center gap-3">
                                <Link href="/auth/login" className="text-sm font-medium text-gray-700 hover:text-indigo-600 transition-colors">Login</Link>
                                <Link href="/auth/register" className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors">Register</Link>
                            </div>
                        ) : (
                            <div className="flex items-center gap-4">
                                <span className="text-sm font-medium text-gray-700">Hi, {user?.name}</span>
                                <button onClick={logout} className="text-sm font-medium text-gray-700 hover:text-indigo-600 transition-colors">Logout</button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
}
