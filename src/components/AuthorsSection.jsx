"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ArrowUpRight, PenLine } from "lucide-react";

export default function AuthorsSection() {
    const [authors, setAuthors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAuthors = async () => {
            try {
                const res = await fetch("/api/authors");
                const data = await res.json();

                // Check if data is an array
                if (!Array.isArray(data)) {
                    throw new Error(data.error || "Invalid data from server");
                }

                setAuthors(data);
            } catch (err) {
                console.error("Error fetching authors:", err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchAuthors();
    }, []);

    const renderSkeleton = () => (
        <div className="py-16 max-w-6xl mx-auto px-4 md:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 3 }).map((_, i) => (
                    <div
                        key={i}
                        className="group text-center shadow-sm rounded-xl overflow-hidden animate-pulse"
                    >
                        <div className="flex items-center gap-4 p-4 bg-[#F2F3E8] border-2 border-[#F2F3E8] opacity-90 rounded-xl">
                            <div className="w-23 h-23  bg-gray-300" />
                            <div className="flex-1 space-y-3 text-left">
                                <div className="h-5 w-32 bg-gray-300 rounded" />
                                <div className="h-4 w-20 bg-gray-300 rounded" />
                                <div className="h-4 w-40 bg-gray-300 rounded mt-2" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    if (loading) return <section className="">{renderSkeleton()}</section>;

    if (error) {
        return (
            <section className="py-16 text-center text-red-500 bg-gray-50">
                Error: {error}
            </section>
        );
    }

    if (!Array.isArray(authors) || authors.length === 0) {
        return (
            <section className="py-16 text-center text-gray-500 bg-gray-50">
                No authors found.
            </section>
        );
    }

    return (
        <section className="py-16 max-w-6xl mx-auto px-4 md:px-8">
            <div className="flex justify-between items-center mb-10">
                <h2 className="text-4xl font-semibold text-gray-900">Top Authors</h2>

                <div className="flex justify-center mt-4">
                    <Link
                        href="/blogs"
                        className="group inline-flex items-center justify-center mt-4 font-semibold text-black relative w-fit"
                    >
                        <span className="font-medium text-lg">All Authors</span>
                        <span className="absolute left-0 -bottom-0.5 h-0.5 w-full bg-black scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300"></span>
                        <span className="relative w-5 h-5 ml-1 inline-block">
                            <ArrowUpRight className="absolute inset-0 w-5 h-5 transition-all duration-300 opacity-100 translate-y-0 group-hover:opacity-0 group-hover:-translate-y-1" />
                            <ArrowRight className="absolute inset-0 w-5 h-5 transition-all duration-300 opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0" />
                        </span>
                    </Link>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {authors.map((author) => (
                    <Link key={author._id} href={`/blogs/author/${author._id}`}>
                        <div className="group text-center shadow-sm hover:shadow-md transition-shadow duration-300">
                            <div className="flex items-center gap-4 p-4 bg-[#F2F3E8] shadow-md transition-all duration-300 border-2 border-[#F2F3E8] opacity-90 hover:border-2 hover:border-[#E7E8DD] shadow-sm hover:shadow-md transition">
                                <div className="w-23 h-23 overflow-hidden relative">
                                    <Image
                                        src={author.authorImage || "/default-avatar.png"}
                                        alt={author.authorName}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <div className="text-start">
                                    <h3 className="font-semibold text-xl text-black">{author.authorName}</h3>
                                    <p className="text-black/90">{author.role || "Author"}</p>
                                    <p className="text-md text-gray-900 mt-2 inline-flex items-center">
                                        <PenLine className="w-4 h-4 mr-2" />{" "}
                                        <span className="text-black font-semibold mr-0.5">
                                            {author.totalBlogs.toString().padStart(2, "0")}
                                        </span>{" "}
                                        <span>Published posts</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
}
