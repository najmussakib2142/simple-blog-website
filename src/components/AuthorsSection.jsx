"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Linkedin, Twitter } from "lucide-react";

export default function AuthorsSection() {
    const [authors, setAuthors] = useState([]);
    const [loading, setLoading] = useState(true);

    const socialLinks = [
        { icon: Twitter, href: "#", label: "Twitter" },
        { icon: Linkedin, href: "#", label: "LinkedIn" },
    ];

    useEffect(() => {
        const fetchAuthors = async () => {
            try {
                const res = await fetch("/api/authors");
                const data = await res.json();
                setAuthors(data);
            } catch (error) {
                console.error("Error fetching authors:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchAuthors();
    }, []);

    const renderSkeleton = () => (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
                <div
                    key={i}
                    className="bg-gray-100 animate-pulse rounded-2xl p-6 flex flex-col items-center gap-4"
                >
                    <div className="w-28 h-28 rounded-full bg-gray-200" />
                    <div className="h-4 w-24 bg-gray-200 rounded" />
                    <div className="h-3 w-16 bg-gray-200 rounded" />
                    <div className="flex gap-3 mt-2">
                        <div className="w-4 h-4 bg-gray-200 rounded-full" />
                        <div className="w-4 h-4 bg-gray-200 rounded-full" />
                    </div>
                    <div className="h-4 w-28 bg-gray-200 rounded mt-3" />
                </div>
            ))}
        </div>
    );

    if (loading) {
        return (
            <section className="py-16 max-w-3xl mx-auto px-4">
                {renderSkeleton()}
            </section>
        );
    }

    if (authors.length === 0) {
        return (
            <section className="py-16 text-center text-gray-500 bg-gray-50">
                No authors found.
            </section>
        );
    }

    return (
        <section className="py-16 max-w-3xl mx-auto px-4">
            <h2 className="text-4xl font-semibold text-gray-900 mb-2 text-center text-gray-900 mb-12">
                Our Featured Authors
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {authors.map((author) => (
                    <Link key={author._id} href={`/blogs/author/${author._id}`}>
                        <div className="group text-center bg-[#F2F3E8]/50 rounded-2xl p-6 shadow-sm hover:shadow-lg transition-shadow duration-300 border border-gray-100 hover:border-gray-200">

                            <div className="w-28 h-28 mx-auto rounded-full overflow-hidden relative shadow-sm">
                                <Image
                                    src={author.authorImage || "/default-avatar.png"}
                                    alt={author.authorName}
                                    fill
                                    className="object-cover"
                                />
                            </div>

                            <h3 className="mt-4 text-lg font-semibold text-gray-900 text-center group-hover:text-black transition-colors">
                                {author.authorName}
                            </h3>

                            <p className="text-center text-sm text-gray-500 mt-1">
                                {author.totalBlogs} Article{author.totalBlogs !== 1 ? "s" : ""}
                            </p>

                            <div className="flex justify-center items-center gap-4 mt-2">
                                {socialLinks.map((link) => (
                                    <a
                                        key={link.label}
                                        href={link.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-gray-400 hover:text-black transition"
                                        aria-label={`Follow on ${link.label}`}
                                    >
                                        <link.icon className="w-5 h-5" />
                                    </a>
                                ))}
                            </div>

                            <div className="group inline-flex items-center justify-center mt-4 text-black/80 font-semibold relative w-fit">
                                View Profile
                                <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
                                <span
                                    className="absolute left-0 -bottom-0.5 h-0.5 bg-black/80 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300"
                                    style={{ width: "100%" }}
                                ></span>
                            </div>

                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
}
