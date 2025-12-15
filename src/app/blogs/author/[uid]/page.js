import BlogCard from "@/components/BlogCard";
import connectDB from "@/lib/mongodb";
import Blog from "@/models/Blog";

export default async function AuthorBlogsPage({ params }) {
    const { uid } = await params;

    // Connect to MongoDB
    await connectDB();

    // Fetch blogs by this author
    const blogs = await Blog.find({ authorUid: uid, status: "published" })
        .sort({ createdAt: -1 })
        .lean();

    if (!blogs || blogs.length === 0) {
        return (
            <p className="text-center py-10 text-gray-500">
                No blogs found for this author.
            </p>
        );
    }

    return (
        <section className="min-h-screen max-w-6xl mx-auto px-4 md:px-8 py-12">
            {/* Page Heading */}
            <header className="mb-10 ">
                <h1 className="text-3xl md:text-4xl font-semibold text-gray-700">
                    Blogs by <span className="text-gray-900">{blogs[0].author || "Unknown Author"}</span>
                </h1>
                <p className="mt-2 text-gray-500 text-sm md:text-base">
                    {blogs.length} {blogs.length === 1 ? "post" : "posts"} published
                </p>
            </header>

            {/* Blog Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {blogs.map((blog) => (
                    <div
                        key={blog._id}
                        className="transition-transform duration-200 hover:scale-105"
                    >
                        <BlogCard blog={blog} />
                    </div>
                ))}
            </div>
        </section>
    );
}
