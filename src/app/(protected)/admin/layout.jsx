"use client";

import Link from "next/link";
import { useState } from 'react'; // Only need useState now
import { usePathname } from 'next/navigation';
import AdminGuard from "@/components/AdminGuard";
import {
    HomeIcon,
    NewspaperIcon,
    UsersIcon,
    TagIcon,
    Cog6ToothIcon,
    ArrowLeftEndOnRectangleIcon,
    Bars3Icon,
    XMarkIcon
} from '@heroicons/react/24/outline';
import { useAuth } from "@/context/AuthContext";
import Swal from "sweetalert2";

const adminNavItems = [
    { name: 'Dashboard', href: '/admin', icon: HomeIcon, isActive: (pathname) => pathname === '/admin' },
    { name: 'Blogs', href: '/admin/blogs', icon: NewspaperIcon, isActive: (pathname) => pathname.startsWith('/admin/blogs') },
    { name: 'Users', href: '/admin/users', icon: UsersIcon, isActive: (pathname) => pathname.startsWith('/admin/users') },
    { name: 'Categories', href: '/admin/categories', icon: TagIcon, isActive: (pathname) => pathname.startsWith('/admin/categories') },
];

// Helper function to get the current page title (for the mobile header)
const getCurrentTitle = (pathname) => {
    // Check if the current path exactly matches a known item
    const currentItem = adminNavItems.find(item => item.href === pathname);
    if (currentItem) return currentItem.name;

    // Check for nested paths (e.g., /admin/blogs/new or /admin/users/123)
    const matchingItem = adminNavItems.find(item => item.isActive(pathname));
    if (matchingItem) {
        // If it's a known nested path, use the main category name (e.g., "Blogs")
        return matchingItem.name;
    }

    // Default or catch-all title
    return 'Admin Panel';
};


export default function AdminLayout({ children }) {
    const pathname = usePathname();
    const { logout } = useAuth();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    // FIX: Recommended close-on-click logic (removed the performance-hitting useEffect)
    const handleNavigation = () => {
        // Close the sidebar when any navigation link is clicked
        setIsSidebarOpen(false);
    };

    const handleLogout = async () => {
        // ... (handleLogout function remains the same)
        // ... (logout logic)

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
            } catch (err) {
                Swal.fire("Error", err.message, "error");
            }
        }
    };


    return (
        <section className="flex min-h-screen lg:-mt-14  bg-gray-50">
            <AdminGuard>

                {/* 1. Mobile Fixed Header Bar (New) */}
                <header className="lg:hidden fixed top-0 left-0 right-0 h-14 mb-9 bg-white border-b border-gray-200 z-40 flex items-center justify-between px-4 shadow-sm">
                    {/* Menu Button */}
                    <button
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        className="p-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-900 rounded-md"
                    >
                        {isSidebarOpen ? (
                            <XMarkIcon className="w-6 h-6" />
                        ) : (
                            <Bars3Icon className="w-6 h-6" />
                        )}
                    </button>
                    {/* Page Title */}
                    <h1 className="text-xl font-semibold text-gray-900 truncate flex-1 text-center pr-10">
                        {getCurrentTitle(pathname)}
                    </h1>
                </header>

                {/* 2. Sidebar (Layout remains the same, but positioning is relative to the new header) */}
                <aside
                    className={`
                        fixed lg:sticky top-0 
                        h-screen flex flex-col bg-white border-r border-gray-200 shadow-xl overflow-y-auto z-50
                        transition-transform duration-300 ease-in-out
                        ${isSidebarOpen ? 'translate-x-0 w-64' : '-translate-x-full w-64'} 
                        lg:translate-x-0 lg:w-64
                    `}
                >
                    <div className="flex  items-center justify-between h-16 lg:h-21 px-4 border-b border-gray-200">
                        {/* Brand Link - Visible on ALL screens inside the sidebar */}
                        <Link
                            href="/"
                            onClick={handleNavigation} // Ensure clicking brand on mobile closes sidebar
                            className="text-2xl lg:text-3xl font-bold tracking-tight text-gray-900 group relative group"
                        >
                            SimpleBlog
                            <span
                                className="absolute left-0 -bottom-1 h-[2px] w-0 bg-black transition-all duration-300 group-hover:w-full"
                            ></span>
                        </Link>

                        {/* Close Button (XMarkIcon) - Only visible on small screens when sidebar is open */}
                        <button
                            onClick={() => setIsSidebarOpen(false)} // Always set to close
                            className="p-2 text-gray-700 lg:hidden focus:outline-none focus:ring-2 focus:ring-gray-900 rounded-md"
                        >
                            {/* We only need XMarkIcon here, as Bars3Icon is no longer in the sidebar */}
                            <XMarkIcon className="w-6 h-6" />
                        </button>
                    </div>
                    {/* Logo/Brand (Now hidden on mobile when sidebar is out, or you could keep it) */}


                    {/* Navigation */}
                    <div className="flex-1  space-y-2 ">
                        {/* <Link
                            href="/"
                            className=" flex items-center justify-center h-15 px-6 border-b border-gray-200 text-2xl font-bold tracking-tight text-gray-900 group relative group"
                        >
                            SimpleBlog
                            <span
                                className="absolute left-0 -bottom-1 h-[2px] w-0 bg-black transition-all duration-300 group-hover:w-full"
                            ></span>
                        </Link> */}
                        {/* Added pt-16 to shift content below the logo/header area inside the sidebar when mobile view is active */}
                        <h2 className="text-xs uppercase font-bold text-gray-400 px-3 pt-2 pb-1">
                            Main Menu
                        </h2>
                        <nav className="flex flex-col gap-1">
                            {adminNavItems.map((item) => {
                                const active = item.isActive(pathname);
                                return (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        onClick={handleNavigation} // Calls the close-sidebar handler
                                        className={`
                                            flex items-center space-x-3 px-3 py-2.5 text-base font-medium transition duration-150 ease-in-out
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

                    {/* Footer/Settings (remains the same) */}
                    <div className="p-4 border-t border-gray-200">
                        <Link
                            href="/admin/settings"
                            onClick={handleNavigation} // Calls the close-sidebar handler
                            className="flex items-center space-x-3 px-3 py-2.5 rounded-lg text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition duration-150 ease-in-out font-medium"
                        >
                            <Cog6ToothIcon className="w-5 h-5" />
                            <span>Settings</span>
                        </Link>
                        <button
                            onClick={handleLogout}
                            className="w-full flex items-center space-x-3 px-3 py-2.5 mt-2 rounded-lg text-red-600 hover:bg-red-50 transition duration-150 ease-in-out font-medium"
                        >
                            <ArrowLeftEndOnRectangleIcon className="w-5 h-5" />
                            <span>Logout</span>
                        </button>
                    </div>
                </aside>

                {/* 3. Main Content Area */}
                {/* Adjusted padding: pt-14 on small screens to push content below the fixed header */}
                <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto pt-14 lg:pt-8">
                    {children}
                </main>

                {/* 4. Overlay for Mobile */}
                {isSidebarOpen && (
                    <div
                        className="fixed inset-0 bg-white/30 backdrop-blur-sm z-40 lg:hidden" // <--- NEW CLASSES                        onClick={handleNavigation} // Use the navigation handler to close it
                    ></div>
                )}
            </AdminGuard>
        </section>
    );
}