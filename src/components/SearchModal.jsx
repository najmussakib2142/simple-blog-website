// components/SearchModal.jsx
import { X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import TrendingTopics from "./TrendingTopics";
import { AnimatePresence, motion } from "framer-motion";

async function fetchLatestBlogs() {
    try {
        const res = await fetch(`/api/blogs`, { cache: "no-store" });
        if (!res.ok) throw new Error(`Failed to fetch: ${res.status}`);

        const result = await res.json();
        const blogs = result.blogs || []; // <-- use blogs, not data

        // Convert createdAt to ISO string
        const formattedBlogs = blogs.map(blog => ({
            ...blog,
            createdAt: blog.createdAt ? new Date(blog.createdAt).toISOString() : null
        }));

        const sorted = formattedBlogs.sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );

        return sorted.slice(0, 4);
    } catch (error) {
        console.error("Error fetching blogs:", error);
        return [];
    }
}





// SKELETON LOADER

function BlogSkeleton() {
    return (
        <div className="flex gap-4 p-3 animate-pulse">
            <div className="w-20 h-20 bg-gray-300 rounded-md" />
            <div className="flex-1 space-y-2">
                <div className="h-3 w-24 bg-gray-300 rounded" />
                <div className="h-4 w-full bg-gray-300 rounded" />
            </div>
        </div>
    );
}

export default function SearchModal({ show, onClose, initialQuery }) {
    const [query, setQuery] = useState(initialQuery || "");
    const [searchResults, setSearchResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const router = useRouter();

    /* ----------------------------------------
   ✅ LOAD LATEST BLOGS ON OPEN
  ----------------------------------------- */
    useEffect(() => {
        if (!show) return;

        let isMounted = true;

        const loadBlogs = async () => {
            try {
                setIsLoading(true);
                const data = await fetchLatestBlogs();
                if (isMounted) setSearchResults(data);
            } finally {
                if (isMounted) setIsLoading(false);
            }
        };

        loadBlogs();

        return () => {
            isMounted = false;
        };
    }, [show]);

    const handleSearch = (e) => {
        e.preventDefault();
        if (!query.trim()) return;
        router.push(`/blogs?search=${query}`);
        onClose();
    };

    if (!show) return null;

    return (
        <AnimatePresence>
            {show && (
                <>
                    {/* ✅ PREMIUM BACKDROP */}
                    <motion.div
                        onClick={onClose}
                        className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    />

                    {/* ✅ CINEMATIC SLIDE PANEL */}
                    <motion.div
                        className="
              fixed top-0 left-0 z-[70] h-full
              w-full sm:w-[85vw] lg:w-[75vw] max-w-4xl
              bg-[#F2F3E8] shadow-2xl
              origin-left
            "
                        initial={{
                            x: "-100%",
                            scale: 0.96,
                            filter: "blur(6px)",
                        }}
                        animate={{
                            x: 0,
                            scale: 1,
                            filter: "blur(0px)",
                        }}
                        exit={{
                            x: "-100%",
                            scale: 0.96,
                            filter: "blur(6px)",
                        }}
                        transition={{
                            type: "spring",
                            stiffness: 90,   // lower = smoother
                            damping: 18,     // higher = less bounce
                            mass: 0.9,
                        }}
                    >
                        <div className="p-6 sm:p-8">

                            {/* ✅ HEADER */}
                            <div className="flex items-center justify-between mb-8 border-b border-gray-300 pb-3">
                                <form onSubmit={handleSearch} className="flex-1 mr-4">
                                    <input
                                        type="search"
                                        placeholder="Type your search blog..."
                                        className="w-full text-gray-800 text-lg sm:text-xl md:text-2xl font-light bg-transparent pl-2 focus:outline-none placeholder-gray-400"
                                        value={query}
                                        onChange={(e) => setQuery(e.target.value)}
                                        autoFocus
                                    />
                                </form>

                                <button
                                    onClick={onClose}
                                    className="p-2 rounded-full hover:bg-black/10 transition"
                                >
                                    <X className="w-7 h-7 sm:w-8 sm:h-8 text-gray-700" />
                                </button>
                            </div>

                            {/* ✅ CONTENT */}
                            <div className="grid gap-10 md:grid-cols-2 ">

                                {/* LEFT */}
                                <div className=" flex flex-col h-[80vh] overflow-y-auto pb-10">
                                    <h3 className="text-lg sm:text-xl font-semibold mb-6 text-gray-800 border-b border-gray-200 pb-2">
                                        Recent Posts
                                    </h3>

                                    <div className="">
                                        {isLoading ? (
                                            <div className="space-y-4">
                                                {[1, 2, 3, 4].map((i) => (
                                                    <BlogSkeleton key={i} />
                                                ))}
                                            </div>
                                        ) : (
                                            <div className="space-y-4 ">
                                                {searchResults.map((blog) => (
                                                    <Link
                                                        href={`/blogs/${blog._id}`}
                                                        key={blog._id}
                                                        onClick={onClose}
                                                        className="flex gap-4 p-3 rounded-xl hover:bg-black/5 transition group"
                                                    >
                                                        <div className="w-16 h-16 sm:w-20 sm:h-20 relative rounded-lg overflow-hidden bg-gray-200 flex-shrink-0">
                                                            <Image
                                                                src={blog.imageUrl || "/placeholder.jpg"}
                                                                alt={blog.title}
                                                                fill
                                                                className="object-cover"
                                                            />
                                                        </div>

                                                        <div className="flex flex-col justify-center">
                                                            <span className="text-xs uppercase tracking-wide text-gray-600">
                                                                {blog.category || "Uncategorized"}
                                                            </span>

                                                            <h4 className="text-sm sm:text-base font-semibold text-gray-900 group-hover:underline leading-snug mt-1">
                                                                {blog.title}
                                                            </h4>
                                                        </div>
                                                    </Link>
                                                ))}

                                                {!isLoading && searchResults.length === 0 && (
                                                    <p className="text-gray-500">No recent posts found.</p>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* RIGHT */}
                                <div>
                                    <h3 className="text-lg sm:text-xl font-semibold mb-6 text-gray-800 border-b border-gray-200 pb-2">
                                        Popular Topics
                                    </h3>
                                    <TrendingTopics onClose={onClose} />
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
