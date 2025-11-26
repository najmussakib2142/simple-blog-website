// /app/blogs/category/[slug]/page.jsx
import BlogCard from "@/components/BlogCard";
import { getBlogsByCategory } from "@/lib/blogs";

export default async function CategoryPage(props) {
    const params = await props.params; // unwrap the promise
    const category = params.slug;

    const blogs = await getBlogsByCategory(category);

    return (
        <section className="max-w-6xl min-h-screen mx-auto px-4 py-16">
            <h1 className="text-3xl  text-black font-bold mb-6">
                Showing results for: {category}
            </h1>

            {blogs.length === 0 ? (
                <p className="text-gray-600">No blogs found in this category.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {blogs.map((blog) => (
                        <BlogCard key={blog._id} blog={blog} />
                    ))}
                </div>
            )}
        </section>
    );
}

