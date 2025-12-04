// components/TrendingTopics.jsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function TrendingTopics({ onClose }) {
    const [counts, setCounts] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchCounts() {
            try {
                const res = await fetch("/api/categories", { cache: "no-store" });
                const data = await res.json();

                const mapped = {};
                data.forEach((item) => {
                    mapped[item.category] = item.count;
                });

                setCounts(mapped);
            } catch (err) {
                console.error("Category fetch failed:", err);
            } finally {
                setLoading(false);
            }
        }

        fetchCounts();
    }, []);

    const categories = ["Tech", "Lifestyle", "Health", "Business", "Education", "Travel"];

    if (loading) {
        return <p className="text-gray-500">Loading trending topics...</p>;
    }

    return (
        <div className="flex flex-wrap gap-3">
            {categories.map((cat) => (
                <Link
                    key={cat}
                    href={`/blogs/category/${cat.toLowerCase()}`}
                    onClick={onClose}
                    className="group flex items-center gap-2 px-4 py-2 rounded-sm bg-white text-sm font-medium text-gray-800 hover:text-black  transition"
                >
                    <span>{cat}</span>
                    <span className="text-xs opacity-70 group-hover:opacity-100">
                        ({counts[cat] ?? 0})
                    </span>
                </Link>
            ))}
        </div>
    );
}
