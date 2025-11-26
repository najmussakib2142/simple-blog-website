// /app/blogs/category/[slug]/page.js

import BlogCard from "@/components/BlogCard";
import { getBlogsByCategory } from "@/lib/blogs"; // your DB fetch function

export default async function CategoryPage({ params }) {
    
    const category = params.slug; // just assign directly
    const blogs = await getBlogsByCategory(category);
    return (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogs.map(blog => (
                <BlogCard key={blog._id} blog={blog} />
            ))}
        </div>
    );
}
