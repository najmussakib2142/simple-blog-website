"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import BlogCard from "@/components/BlogCard";
import { ArrowRight, BookMarked } from "lucide-react";
import Link from "next/link";
import DrawOutlineButton from "@/components/DrawOutlineButton";

// Define a simple loading spinner for better UX
const LoadingSpinner = () => (
    <div className="flex justify-center items-center py-20">
        <svg className="animate-spin h-8 w-8 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
    </div>
);

export default function BookmarksPage() {
    const { user } = useAuth();
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user?.uid) return;

        const fetchBookmarks = async () => {
            try {
                const res = await fetch("/api/bookmarks/all", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ uid: user.uid }),
                });

                const data = await res.json();

                if (data.success) {
                    setBlogs(data.bookmarks);
                }
            } catch (error) {
                console.error("Failed to load bookmarks", error);
            } finally {
                setLoading(false);
            }
        };

        fetchBookmarks();
    }, [user?.uid]);

    // --- LOADING STATE ---
    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <LoadingSpinner />
            </div>
        );
    }

    return (
        // Changed bg-[#F2F3E8] to a modern, softer bg-gray-50
        <section className="min-h-screen bg-[#F2F3E8] pb-20">
            {/* 1. Enhanced Header Section */}
            <div className=" border-b border-gray-300 pt-12 pb-6 mb-10 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
                    <h1 className="text-4xl md:text-5xl font-semibold text-gray-900 tracking-tight">
                        <span className="inline-flex ">My Library <BookMarked className="w-8 h-8 ml-3" /></span>
                    </h1>
                    <p className="mt-3 text-lg text-gray-500">
                        List of saved articles.
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">

                {/* --- Content Display --- */}
                {blogs.length === 0 ? (
                    // 2. Upgraded Empty State
                    <div className="bg-white rounded-2xl p-12 text-center border border-dashed border-gray-300 shadow-md transition-all duration-300 hover:shadow-lg">
                        <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-indigo-100">
                            {/* Placeholder for an empty state icon (e.g., a bookmark icon) */}
                            <svg className="h-6 w-6 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" /></svg>
                        </div>
                        <h3 className="mt-4 text-xl font-semibold text-gray-900">
                            Nothing saved here yet!
                        </h3>
                        <p className="mt-1 text-base text-gray-500">
                            Find interesting articles and click the bookmark icon to save them.
                        </p>

                        <Link
                            href="/blogs"
                            className="inline-flex mt-4  border border-gray-300 hover:border-white  items-center text-lg font-semibold text-black transition duration-300"
                        >
                            {/* Remove the outer <div className="flex items-center"> */}
                            <DrawOutlineButton>
                                {/* ADD A FLEX CONTAINER AROUND THE CONTENT YOU ARE PASSING */}
                                <span className="flex items-center space-x-1">
                                    <span>View All Blogs</span>
                                    <ArrowRight className="w-5 h-5" />
                                </span>
                            </DrawOutlineButton>
                        </Link>
                    </div>
                ) : (
                    // 3. Enhanced Grid Layout
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {blogs.map((blog) => (
                            // <BlogCard
                            //     key={blog._id}
                            //     blog={blog}
                            //     isAuthorView={false} 
                            // />
                            <BlogCard key={blog._id} blog={{ ...blog, imageUrl: null }} />

                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}