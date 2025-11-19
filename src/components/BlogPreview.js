import Link from "next/link";
import BlogCard from "./BlogCard";

async function getLatestBlogs() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    const res = await fetch(`${baseUrl}/api/blogs`, {
      cache: "no-store",
    });
    if (!res.ok) return [];
    const blogs = await res.json();
    // Return only the first 3 blogs
    return blogs.slice(0, 3);
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return [];
  }
}

export default async function BlogPreview() {
  const blogs = await getLatestBlogs();

  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-sm font-semibold text-indigo-600 uppercase tracking-wider mb-2">Latest</p>
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900">Blog Posts</h2>
        </div>

        {blogs.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">No blogs yet. Start writing and publish your first post.</p>
            <Link
              href="/blogs/create"
              className="inline-block mt-6 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
            >
              Create a Post
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
      </div>
    </section>
  );
}
