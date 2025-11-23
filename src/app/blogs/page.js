import Link from "next/link";
import BlogCard from "@/components/BlogCard";

// fetch blogs from API
async function getBlogs() {
    try {
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
        const res = await fetch(`${baseUrl}/api/blogs`, {
            cache: "no-store", // always fetch fresh data
        });

        if (!res.ok) return [];
        return res.json();
    } catch (error) {
        console.error("Error fetching blogs:", error);
        return [];
    }
}

export default async function BlogsPage() {
    const blogs = await getBlogs();

    return (
        <div className="bg-white">
            {/* Hero Section */}
            <section className="py-16 px-6 md:px-16 max-w-6xl mx-auto">
                <div className="space-y-4">
                    <p className="text-indigo-700 font-semibold uppercase text-sm tracking-wide">All Posts</p>
                    <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900">Explore All Blogs</h1>
                    <p className="text-lg text-gray-600 max-w-2xl">Discover stories, tutorials, and ideas from our community of writers.</p>
                </div>

                <div className="mt-8 flex gap-3">
                    <Link 
                        href="/blogs/create" 
                        className="inline-flex items-center px-6 py-3 bg-indigo-700 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors"
                    >
                        Write a Post
                    </Link>
                </div>
            </section>

            {/* Blogs Grid */}
            <section className="px-6 md:px-16 max-w-6xl mx-auto pb-20">
                {blogs.length === 0 ? (
                    <div className="text-center py-16">
                        <p className="text-gray-600 text-lg mb-6">No blogs yet. Be the first to share your story!</p>
                        <Link 
                            href="/blogs/create"
                            className="inline-flex items-center px-6 py-3 bg-indigo-700  text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors"
                        >
                            Create Your First Post
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {blogs.map((blog) => (
                            <div key={blog._id} className="transform hover:-translate-y-1 transition">
                                <BlogCard blog={blog} />
                            </div>
                        ))}
                    </div>
                )}
            </section>
        </div>
    );
}
