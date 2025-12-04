"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import BlogCard from "@/components/BlogCard";
import { Archive, ArrowLeft, ArrowRight } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import DrawOutlineButton from "@/components/DrawOutlineButton";

export default function BlogsClient() {
    const { user } = useAuth();
    const router = useRouter();

    const [blogs, setBlogs] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [searchText, setSearchText] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const [loading, setLoading] = useState(false);

    const writePostHref = user ? "/create" : "/auth/login?redirect=/create";
    const searchParams = useSearchParams();


    useEffect(() => {
        const pageFromUrl = Number(searchParams.get("page")) || 1;
        const searchFromUrl = searchParams.get("search") || "";
        const categoryFromUrl = searchParams.get("category") || "";

        setPage(pageFromUrl);
        setSearchText(searchFromUrl);
        setSelectedCategory(categoryFromUrl);
    }, [searchParams]);

    // Fetch blogs when page, search, or category changes
    useEffect(() => {
        async function fetchBlogs() {
            setLoading(true);
            try {
                const params = new URLSearchParams({
                    page,
                    limit: 6,
                    search: searchText,
                    category: selectedCategory,
                });
                const url = `/api/blogs?${params.toString()}`;
                const res = await fetch(url, { cache: "no-store" });

                if (!res.ok) {
                    setBlogs([]);
                    setTotalPages(1);
                    return;
                }

                const data = await res.json();
                setBlogs(data.blogs || []);
                setTotalPages(data.totalPages || 1);
            } catch (err) {
                console.error(err);
                setBlogs([]);
                setTotalPages(1);
            } finally {
                setLoading(false);
            }
        }

        fetchBlogs();
    }, [page, searchText, selectedCategory]);

    // Handle filter button click
    const handleFilter = () => {
        setPage(1);
        const params = new URLSearchParams();
        if (searchText) params.set("search", searchText);
        if (selectedCategory) params.set("category", selectedCategory);
        params.set("page", "1");

        router.push(`/blogs?${params.toString()}`);
    };

    // Pagination
    const goToPage = (newPage) => {
        const params = new URLSearchParams();
        if (searchText) params.set("search", searchText);
        if (selectedCategory) params.set("category", selectedCategory);
        params.set("page", newPage);

        router.push(`/blogs?${params.toString()}`);
    };

    return (
        <div className="bg-[#F2F3E8]">
            {/* Hero */}
            <section className="pt-16 pb-8 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
                <div className="space-y-4">
                    <p className="text-black pb-2 font-semibold uppercase text-md tracking-wide flex items-center gap-3">
                        All Posts <Archive className="w-5 h-5 text-gray-600" />
                    </p>
                    <h1 className="text-4xl md:text-5xl font-bold text-black">Explore All Blogs</h1>
                    <p className="text-lg text-gray-600 max-w-2xl">
                        Discover stories, tutorials, and ideas from our community of writers.
                    </p>
                </div>

                {/* <div className="mt-8">
                    <Link
                        href={writePostHref}
                        className="inline-flex items-center px-6 py-3 text-lg font-medium border-gray-400 text-black hover:bg-gray-100 border-2 bg-gray-50 rounded-xl shadow-md transition duration-300"
                    >
                        Write a Post <ArrowRight className="w-5 h-5 ml-2" />
                    </Link>
                </div> */}

                <Link
                    href={writePostHref}
                    className="inline-flex mt-6 bg-gray-50 items-center text-lg font-medium border border-gray-300 text-black hover:border-gray-50  transition duration-300"
                >
                    {/* Remove the outer <div className="flex items-center"> */}
                    <DrawOutlineButton>
                        {/* ADD A FLEX CONTAINER AROUND THE CONTENT YOU ARE PASSING */}
                        <span className="flex text-black items-center space-x-1">
                            <span>Write a Post</span>
                            <ArrowRight className="w-5 h-5" />
                        </span>
                    </DrawOutlineButton>
                </Link>

                {/* Filters */}
                {/* <div className="flex justify-between items-center"> */}
                <div className="grid grid-cols-12 items-stretch gap-4 mt-6">
                    <input
                        type="text"
                        placeholder="Search blogs..."
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        // className="input input-bordered w-full"
                        className="w-full py-3 col-span-8 px-4  border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-black/40 focus:border-transparent bg-white text-gray-900 placeholder-gray-500"

                    />
                    <select
                        // className="select select-bordered"
                        className=" px-4 py-3 col-span-4  border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-black/40 focus:border-transparent bg-white text-gray-900"

                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                    >
                        <option value="">All Categories</option>
                        <option value="Tech">Tech</option>
                        <option value="Lifestyle">Lifestyle</option>
                        <option value="Health">Health</option>
                        <option value="Business">Business</option>
                        <option value="Education">Education</option>
                        <option value="Travel">Travel</option>
                    </select>

                    {/* <button
                        className="text-white rounded-lg text-md font-medium   bg-gray-950   col-span-1 "
                        onClick={handleFilter}>
                        Filter
                    </button> */}

                </div>

                {/* </div> */}
            </section>

            {/* Blogs */}
            <section className="px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto pb-20">
                {(searchText || selectedCategory) && blogs.length > 0 && (
                    <p className="text-gray-700 mb-4">
                        Showing results for{" "}
                        {searchText && <span className="font-semibold">&quot;{searchText}&quot;</span>}
                        {searchText && selectedCategory && " in "}
                        {selectedCategory && <span className="font-semibold">{selectedCategory}</span>}
                    </p>
                )}

                {loading ? (
                    <p className="text-center text-gray-600 py-16">Loading blogs...</p>
                ) : blogs.length === 0 ? (
                    <div className="text-center py-16">
                        <p className="text-gray-600 text-lg mb-4">
                            No blogs found for{" "}
                            {searchText && <span className="font-semibold">&quot;{searchText}&quot;</span>}
                            {selectedCategory && <span> in {selectedCategory}</span>}.
                        </p>
                        <p className="text-gray-500 mb-6">
                            Try changing your search or selecting a different category.
                        </p>
                        <Link
                            href={writePostHref}
                            className="inline-flex items-center px-6 py-3 bg-black text-white font-medium rounded-lg hover:bg-black/90 transition-colors"
                        >
                            Write Your Blog
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {blogs.map((blog) => (
                            <BlogCard key={blog._id} blog={blog} />
                        ))}
                    </div>
                )}

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="flex justify-center mt-12 space-x-2">
                        <button
                            onClick={() => goToPage(page - 1)}
                            disabled={page === 1}
                            className="flex items-center justify-center p-3 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <ArrowLeft className="w-4 h-4 mr-1" />
                            Previous
                        </button>

                        {[...Array(totalPages)].map((_, i) => (
                            <button
                                key={i + 1}
                                onClick={() => goToPage(i + 1)}
                                className={`w-10 h-10 flex items-center justify-center text-sm font-medium rounded-lg transition duration-150 ${page === i + 1 ? "bg-black/90 text-white shadow-md" : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
                                    }`}
                            >
                                {i + 1}
                            </button>
                        ))}

                        <button
                            onClick={() => goToPage(page + 1)}
                            disabled={page === totalPages}
                            className="flex items-center justify-center p-3 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Next <ArrowRight className="w-4 h-4 ml-1" />
                        </button>
                    </div>
                )}
            </section>
        </div>
    );
}
