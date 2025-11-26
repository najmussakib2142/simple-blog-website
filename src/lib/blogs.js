// /lib/blogs.js
// import connectDB from "./db";
import Blog from "@/models/Blog";
import connectDB from "./mongodb";

export async function getBlogsByCategory(category) {
    await connectDB();

    // Match category exactly or case-insensitive
    const blogs = await Blog.find({
        category: { $regex: new RegExp(`^${category}$`, "i") }
    })
    .sort({ createdAt: -1 })
    .lean();

    // Serialize for client component
    return blogs.map(blog => ({
        ...blog,
        _id: blog._id.toString(),
        createdAt: blog.createdAt.toISOString(),
        updatedAt: blog.updatedAt.toISOString(),
    }));
}
