// /admin/blogs/page.js
import connectDB from "@/lib/mongodb";
import Blog from "@/models/Blog";
import Link from "next/link";
import { Pencil, PlusCircle, Newspaper } from 'lucide-react'; // Trash2 is now in the client component
import DeleteButton from "@/components/DeleteButton";
import BlogActions from "@/components/BlogActions";

export default async function AdminBlogs() {
    await connectDB();
    // Fetch blogs and ensure they are serialized for Next.js (converting MongoDB object to plain JS object)
    const blogs = JSON.parse(JSON.stringify(await Blog.find().sort({ createdAt: -1 }).lean()));

    // Tailwind Classes (keep these, they are just strings)
    const primaryButtonClass = "flex items-center space-x-2 px-4 py-2 bg-gray-900 text-white font-semibold rounded-lg shadow-md hover:bg-gray-700 transition duration-150";
    const editLinkClass = "text-gray-900 hover:text-gray-700 transition duration-150";
    const tableHeaderClass = "p-4 text-left text-sm font-semibold uppercase tracking-wider text-gray-500";
    const tableCellClass = "p-4 text-gray-800 text-sm";

    return (
        <div className="space-y-8">
            {/* Header and Add Button (Unchanged) */}
            <div className="flex justify-between items-center border-b pb-4 border-gray-200">
                <h1 className="text-3xl font-extrabold text-gray-900">Manage Blogs ({blogs.length})</h1>
                <Link
                    href="/create"
                    className={primaryButtonClass}
                >
                    <PlusCircle className="w-5 h-5" />
                    <span>Create New Blog</span>
                </Link>
            </div>

            {/* Blogs Table (Updated Action Column) */}
            {blogs.length > 0 ? (
                <div className="overflow-x-auto bg-white shadow-xl rounded-xl border border-gray-100">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className={tableHeaderClass}>#</th>
                                <th className={tableHeaderClass}>Title</th>
                                <th className={tableHeaderClass}>Author</th>
                                <th className={tableHeaderClass + " hidden sm:table-cell"}>Status</th>
                                <th className={tableHeaderClass + " text-right"}>Actions</th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-gray-100">
                            {blogs.map((blog, index) => (
                                <tr key={blog._id} className="hover:bg-gray-50 transition duration-100">
                                    <td className={tableCellClass + " font-medium"}>{index+1}</td>

                                    <td className={tableCellClass + " font-medium"}>{blog.title}</td>
                                    <td className={tableCellClass + " whitespace-nowrap"}>{blog.author || "N/A"}</td>
                                    <td className={tableCellClass + " hidden sm:table-cell"}>
                                        {/* Status Badge Example (Unchanged) */}
                                        <span className={`px-3 py-1 text-xs font-medium rounded-full ${blog.status === 'Published'
                                            ? 'bg-green-100 text-green-800'
                                            : 'bg-yellow-100 text-yellow-800'
                                            }`}>
                                            {blog.status || 'Draft'}
                                        </span>
                                    </td>
                                    <td className={tableCellClass + " whitespace-nowrap text-right"}>
                                        {/* Edit Link (Unchanged) */}
                                        {/* <Link href={`/admin/blogs/edit/${blog._id}`} className={editLinkClass}>
                                            <Pencil className="w-5 h-5 inline-block mr-1 align-middle" />
                                            <span className="sr-only sm:not-sr-only">Edit</span>
                                        </Link>

                                        <DeleteButton blogId={blog._id} /> */}
                                        <BlogActions blog={blog} id={blog._id} />

                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <div className="text-center p-12 border-2 border-dashed border-gray-300 rounded-xl bg-gray-50">
                    <Newspaper className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">No Blogs Yet</h3>
                    <p className="text-gray-600 mb-6">Start by creating your first blog post now.</p>
                    <Link
                        href="/admin/blogs/create"
                        className={primaryButtonClass.replace('bg-gray-900', 'bg-gray-700')}
                    >
                        <PlusCircle className="w-5 h-5" />
                        <span>Create Blog</span>
                    </Link>
                </div>
            )}
        </div>
    );
}