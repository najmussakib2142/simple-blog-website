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
        <section className="py-10 min-h-screen max-w-6xl mx-auto px-4">
            <h1 className="text-2xl text-black font-bold mb-8 ">
                Blogs by {blogs[0].author || "Unknown Author"}
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {blogs.map((blog) => (
                    <BlogCard key={blog._id} blog={blog} />
                ))}
            </div>
        </section>
    );
}
