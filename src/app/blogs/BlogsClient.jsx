"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import BlogCard from "@/components/BlogCard";
import { useEffect, useState } from "react";
import { Archive, ArrowLeft, ArrowRight, FileText } from "lucide-react";

export default function BlogsClient({ blogs, totalPages, currentPage }) {
    const { user } = useAuth();

    const [blogList, setBlogList] = useState(blogs);
    const [page, setPage] = useState(currentPage || 1);
    const [pages, setPages] = useState(totalPages || 1);

    // If logged in → go create page, else go to login with redirect
    const writePostHref = user ? "/create" : "/auth/login?redirect=/create";

    useEffect(() => {
        async function fetchPage(p) {
            const res = await fetch(`/api/blogs?page=${p}&limit=6`);
            const data = await res.json();

            setBlogList(data.blogs);
            setPages(data.totalPages);
            setPage(data.currentPage); // if your API returns currentPage
        }

        fetchPage(page); // use state variable
    }, [page]);

    return (
        <div className="bg-[#F2F3E8]">
            {/* Hero Section */}
            <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
                <div className="space-y-4">
                    <div className="">
                        <p className="text-black pb-2 font-semibold uppercase text-md tracking-wide flex items-center gap-3">
                            All Posts
                            <Archive className="w-5 h-5 text-gray-600" />
                            {/* <FileText className="w-5 h-5 text-gray-600" /> */}
                        </p>
                        <h1 className="text-4xl md:text-5xl font-bold text-black">
                            Explore All Blogs
                        </h1>
                    </div>                    <p className="text-lg text-gray-600 max-w-2xl">
                        Discover stories, tutorials, and ideas from our community of writers.
                    </p>
                </div>

                {/* Write a Post Button */}
                {/* <div className="mt-8 flex gap-3">
                    <Link
                        href={writePostHref}
                        className="inline-flex items-center px-6 py-3 bg-black/90 text-white font-medium rounded-lg hover:bg-black/90 transition-colors"
                    >
                        Write a Post
                    </Link>
                </div> */}
                <div className="mt-8">
                    <Link
                        href={writePostHref}
                        className="inline-flex items-center px-6 py-3 text-lg font-medium text-black border-2 border-gray-300 bg-gray-50 rounded-xl shadow-md hover:bg-white transition duration-300"
                    >
                        Write a Post
                        <ArrowRight className="w-5 h-5 ml-2" />
                    </Link>
                </div>
            </section>

            {/* Blogs Grid */}
            <section className="px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto pb-20">
                {blogList.length === 0 ? (
                    <div className="text-center py-16">
                        <p className="text-gray-600 text-lg mb-6">No blogs yet. Be the first to share your story!</p>
                        <Link
                            href={writePostHref}
                            className="inline-flex items-center px-6 py-3 bg-black  text-white font-medium rounded-lg hover:bg-black/90 transition-colors"
                        >
                            Create Your First Post
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {blogList.map((blog) => (
                            <div key={blog._id} className="transform  transition">
                                <BlogCard blog={blog} />
                            </div>
                        ))}
                    </div>
                )}

                {/* Pagination */}
                <div className="flex justify-center mt-12 space-x-2"> {/* Increased margin and used space-x for spacing */}
                    {/* Previous Button */}
                    <button
                        onClick={() => setPage(page - 1)}
                        disabled={page === 1}
                        className="flex items-center justify-center p-3 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
                        aria-label="Previous Page"
                    >
                        <ArrowLeft className="w-4 h-4 mr-1" />
                        Previous
                    </button>

                    {/* Page Number Buttons */}
                    <div className="flex items-center space-x-2">
                        {[...Array(pages)].map((_, i) => (
                            <button
                                key={i + 1}
                                onClick={() => setPage(i + 1)}
                                className={`w-10 h-10 flex items-center justify-center text-sm font-medium rounded-lg transition duration-150 
                    ${page === i + 1
                                        // Active state: Solid Black background
                                        ? "bg-black/90 text-white shadow-md"
                                        // Inactive state: White background, gray text, hover effect
                                        : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 hover:text-grayS-700"
                                    }`}
                                aria-current={page === i + 1 ? "page" : undefined}
                            >
                                {i + 1}
                            </button>
                        ))}
                    </div>

                    {/* Next Button */}
                    <button
                        onClick={() => setPage(page + 1)}
                        disabled={page === pages}
                        className="flex items-center justify-center p-3 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
                        aria-label="Next Page"
                    >
                        Next
                        <ArrowRight className="w-4 h-4 ml-1" />
                    </button>
                </div>
            </section>



        </div>
    );
}

