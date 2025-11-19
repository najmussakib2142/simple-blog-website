import Link from "next/link";
import Image from "next/image";

export default function BlogCard({ blog }) {
    return (
        <div className="bg-white rounded-xl shadow-md hover:shadow-xl hover:scale-[1.01] transition-all duration-300 overflow-hidden">

            {blog.imageUrl && (
                <div className="relative h-48 w-full">
                    <Image
                        src={blog.imageUrl}
                        alt={blog.title}
                        fill
                        className="object-cover"
                    />
                </div>
            )}

            <div className="px-6 py-5">
                <h3 className="text-xl font-semibold text-blue-900 line-clamp-1 mb-2">
                    {blog.title}
                </h3>

                <p className="text-gray-700 line-clamp-2 mb-3">
                    {blog.description}
                </p>

                <p className="text-sm text-gray-500 mb-4">
                    {new Date(blog.createdAt).toLocaleDateString()}
                </p>

                <Link
                    href={`/blogs/${blog._id}`}
                    className="px-4 py-2 border border-blue-900 text-blue-900 rounded-md text-sm hover:bg-blue-900 hover:text-white transition"
                >
                    Read More
                </Link>
            </div>
        </div>
    );
}
