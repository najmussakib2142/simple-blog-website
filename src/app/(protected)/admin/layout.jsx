"use client";

import Link from "next/link";
import AdminGuard from "@/components/AdminGuard";

export default function AdminLayout({ children }) {
    return (
        // <html lang="en">
        <section className="flex min-h-screen -mt-14 bg-gray-100 text-gray-900 border-r border-gray-200">
            <AdminGuard>
                <aside className="w-64 bg-white shadow-md p-6 text-gray-900 border-r border-gray-200">
                    {/* Logo */}
                    <Link
                        href="/"
                        className="block mb-8 text-2xl font-extrabold tracking-tight text-gray-900 group relative w-fit"
                    >
                        SimpleBlog
                        <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-gray-900 transition-all duration-300 group-hover:w-full"></span>
                    </Link>

                    {/* Section Title */}
                    <h2 className="text-lg  font-semibold mb-4 text-gray-700">
                        Admin Dashboard
                    </h2>

                    {/* Navigation */}
                    <nav className="flex flex-col gap-2">
                        <Link
                            href="/admin"
                            className="px-2 py-2 rounded hover:bg-gray-100 hover:text-blue-600 transition"
                        >
                            Dashboard
                        </Link>

                        <Link
                            href="/admin/blogs"
                            className="px-2 py-2 rounded hover:bg-gray-100 hover:text-blue-600 transition"
                        >
                            Blogs
                        </Link>

                        <Link
                            href="/admin/users"
                            className="px-2 py-2 rounded hover:bg-gray-100 hover:text-blue-600 transition"
                        >
                            Users
                        </Link>

                        <Link
                            href="/admin/categories"
                            className="px-2 py-2 rounded hover:bg-gray-100 hover:text-blue-600 transition"
                        >
                            Categories
                        </Link>
                    </nav>
                </aside>

                <main className="flex-1 p-6 bg-white text-gray-900">
                    {children}
                </main>
            </AdminGuard>
        </section>
        // </html>
    );
}
