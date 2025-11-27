// /components/Category.jsx
"use client";
import { ArrowRight, ArrowUpRight, Grid, Layers, Tag } from "lucide-react";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Category() {
    const [counts, setCounts] = useState({});

    useEffect(() => {
        async function fetchCounts() {
            const res = await fetch("/api/categories", { cache: "no-store" });
            const data = await res.json();

            // Convert array → object: { Tech: 1, Lifestyle: 0, ... }
            const mapped = {};
            data.forEach(item => {
                mapped[item.category] = item.count;
            });

            setCounts(mapped);
        }
        fetchCounts();
    }, []);

    const categories = ['Tech', 'Lifestyle', 'Health', 'Business', 'Education', 'Travel'];

    return (
        <section className="py-16 bg-white">
            <div className="max-w-5xl mx-auto px-4">
                <h1 className="flex items-center justify-center gap-4 text-4xl font-semibold text-gray-900 mb-2">
                    {/* <Grid className="w-6 h-6 text-gray-600" /> */}
                    Browse by Category
                    <Layers className="w-6 h-6 text-gray-600" />
                </h1>
                <p className="text-center text-gray-600 mb-8">
                    Select a category to see more related content
                </p>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-4">
                    {categories.map((cat) => (
                        <Link
                            href={`/blogs/category/${cat.toLowerCase()}`} key={cat}
                            className="group overflow-hidden mr-1 px-6 py-4 bg-[#F2F3E8] shadow-md transition-all duration-300 border-2 border-[#F2F3E8] opacity-90 hover:border-2   hover:border-[#E7E8DD]  "
                        >
                            <div className="flex  items-center justify-between">
                                {/* LEFT SIDE: Category + Count */}
                                <span className="text-lg font-semibold text-black">
                                    {cat} <span className="text-black text-base">({counts[cat] ?? 0})</span>
                                </span>

                                {/* RIGHT SIDE: Arrow */}
                                <ArrowRight className="text-black/60 transition-all duration-300 group-hover:text-black group-hover:translate-x-1" />
                            </div>
                        </Link>

                    ))}
                </div>

                <div className="flex justify-center mt-4">
                    <Link
                        href="/blogs"
                        className=" group  inline-flex items-center justify-center  mt-4 font-semibold text-black  relative w-fit"
                    >
                        <span>All Categories</span>

                        {/* Underline */}
                        <span
                            className="  absolute left-0 -bottom-0.5 h-0.5 w-full bg-[#E7E8DD]  scale-x-0 group-hover:scale-x-100   origin-left transition-transform duration-300 "
                        ></span>

                        {/* Icons Wrapper */}
                        <span className="relative w-4 h-4 ml-1 inline-block">

                            {/* Initial Icon (ArrowUpRight) */}
                            <ArrowUpRight
                                className="  absolute inset-0 w-4 h-4  transition-all duration-300  opacity-100 translate-y-0   group-hover:opacity-0 group-hover:-translate-y-1"
                            />

                            {/* Hover Icon (ArrowRight) */}
                            <ArrowRight
                                className="  absolute inset-0 w-4 h-4  transition-all duration-300  opacity-0 translate-y-1   group-hover:opacity-100 group-hover:translate-y-0"
                            />
                        </span>
                    </Link>
                </div>

            </div>
        </section>
    );
}
