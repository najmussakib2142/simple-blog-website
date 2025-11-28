import connectDB from "@/lib/mongodb";
import Blog from "@/models/Blog";
import Link from "next/link";

export default async function AdminBlogs() {
    await connectDB();
    const blogs = await Blog.find().sort({ createdAt: -1 }).lean();

    return (
        <>
            <h1 className="text-2xl font-bold mb-6">Manage Blogs</h1>

            <table className="w-full bg-white shadow rounded">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="p-3 text-left">Title</th>
                        <th className="p-3 text-left">Author</th>
                        <th className="p-3 text-left">Status</th>
                        <th className="p-3 text-left">Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {blogs.map((blog) => (
                        <tr key={blog._id} className="border-t">
                            <td className="p-3">{blog.title}</td>
                            <td className="p-3">{blog.author}</td>
                            <td className="p-3">{blog.status}</td>
                            <td className="p-3">
                                <Link href={`/admin/blogs/edit/${blog._id}`} className="text-blue-600 mr-2">
                                    Edit
                                </Link>
                                <button className="text-red-600">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
}
