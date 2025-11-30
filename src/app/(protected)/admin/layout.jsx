"use client";

import Link from "next/link";
// 1. Import usePathname from next/navigation
import { usePathname } from 'next/navigation'; 
import AdminGuard from "@/components/AdminGuard";
import { HomeIcon, NewspaperIcon, UsersIcon, TagIcon, Cog6ToothIcon, ArrowLeftEndOnRectangleIcon } from '@heroicons/react/24/outline';
import { useAuth } from "@/context/AuthContext";
import Swal from "sweetalert2";

// The adminNavItems logic is already correct for checking activity
const adminNavItems = [
    { name: 'Dashboard', href: '/admin', icon: HomeIcon, isActive: (pathname) => pathname === '/admin' },
    { name: 'Blogs', href: '/admin/blogs', icon: NewspaperIcon, isActive: (pathname) => pathname.startsWith('/admin/blogs') },
    { name: 'Users', href: '/admin/users', icon: UsersIcon, isActive: (pathname) => pathname.startsWith('/admin/users') },
    { name: 'Categories', href: '/admin/categories', icon: TagIcon, isActive: (pathname) => pathname.startsWith('/admin/categories') },
];



export default function AdminLayout({ children }) {
    // 2. Use the hook to get the current path
    const pathname = usePathname(); 
    const { logout } = useAuth();

    const handleLogout = async () => {
        // ... (handleLogout function remains the same)
        const result = await Swal.fire({
            title: "Are you sure?",
            text: "You will be logged out of your account.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#000000",
            cancelButtonColor: "#6b7280",

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
                // NOTE: router.push is not defined in this scope, you'll need to import 'useRouter' if you intend to push to '/' after logout.
                // Assuming you have 'useRouter' imported: router.push("/");
            } catch (err) {
                Swal.fire("Error", err.message, "error");
            }
        }
    };


    return (
        <section className="flex min-h-screen -mt-14 bg-gray-50">
            <AdminGuard>
                {/* Sidebar */}
                <aside className="sticky top-0 w-64 h-screen flex flex-col bg-white border-r border-gray-200 shadow-xl overflow-y-auto">

                    {/* Logo/Brand */}
                    <Link
                        href="/"
                        className="flex items-center justify-center h-20 px-6 border-b border-gray-200 text-3xl font-extrabold tracking-tight text-gray-900 group relative group"
                    >
                        SimpleBlog
                        <span
                            className="absolute left-0 -bottom-1 h-[2px] w-0 bg-black transition-all duration-300 group-hover:w-full"
                        ></span>
                    </Link>

                    {/* Navigation */}
                    <div className="flex-1 p-4 space-y-2">
                        <h2 className="text-xs uppercase font-bold text-gray-400 px-3 pt-2 pb-1">
                            Main Menu
                        </h2>
                        <nav className="flex flex-col gap-1">
                            {adminNavItems.map((item) => {
                                // 3. The isActive check now uses the actual current pathname
                                const active = item.isActive(pathname); 
                                return (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        className={`
                                            flex items-center space-x-3 px-3 py-2.5 rounded-lg text-base font-medium transition duration-150 ease-in-out
                                            ${active
                                                ? 'bg-gray-900 text-white shadow-md'
                                                : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                                            }
                                        `}
                                    >
                                        <item.icon className="w-5 h-5" />
                                        <span>{item.name}</span>
                                    </Link>
                                );
                            })}
                        </nav>
                    </div>

                    {/* Footer/Settings */}
                    <div className="p-4 border-t border-gray-200">
                        <Link
                            href="/admin/settings" // Added a path for Settings
                            className="flex items-center space-x-3 px-3 py-2.5 rounded-lg text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition duration-150 ease-in-out font-medium"
                        >
                            <Cog6ToothIcon className="w-5 h-5" />
                            <span>Settings</span>
                        </Link>
                        {/* Example Logout Button/Link */}
                        <button
                            onClick={handleLogout}
                            className="w-full flex items-center space-x-3 px-3 py-2.5 mt-2 rounded-lg text-red-600 hover:bg-red-50 transition duration-150 ease-in-out font-medium"
                        >
                            <ArrowLeftEndOnRectangleIcon className="w-5 h-5" />
                            <span>Logout</span>
                        </button>
                    </div>
                </aside>

                {/* Main Content Area */}
                <main className="flex-1 p-8 overflow-y-auto">
                    {children}
                </main>
            </AdminGuard>
        </section>
    );
}

// NOTE: You may also need to import useRouter from 'next/navigation' if you want to use router.push in handleLogout.
// import { usePathname, useRouter } from 'next/navigation';