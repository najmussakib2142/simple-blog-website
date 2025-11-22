// components/BlogCard.jsx (No significant changes needed, but keeping it here for context)
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export default function BlogCard({ blog }) {
    const postLink = `/blogs/${blog._id}`;
    
    const formattedDate = new Date(blog.createdAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });

    return (
        <Link href={postLink} className="group block h-full">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-2xl hover:border-indigo-200 transition-all duration-300 overflow-hidden h-full flex flex-col">

                {blog.imageUrl && (
                    <div className="relative aspect-[16/10] w-full">
                        <Image
                            src={blog.imageUrl}
                            alt={blog.title}
                            fill
                            sizes="(max-width: 768px) 100vw, 33vw"
                            className="object-cover transition-transform duration-500 group-hover:scale-[1.05]"
                        />
                    </div>
                )}

                <div className="px-6 py-6 flex flex-col justify-between flex-grow">
                    <div>
                        <h3 className="text-xl font-bold text-gray-900 line-clamp-2 mb-2 group-hover:text-indigo-700 transition duration-300">
                            {blog.title}
                        </h3>

                        <p className="text-gray-600 text-base line-clamp-3 mb-4">
                            {blog.description}
                        </p>
                    </div>

                    <div className="flex justify-between items-center pt-2">
                        <p className="text-sm font-medium text-gray-500">
                            {formattedDate}
                        </p>

                        <span
                            className="inline-flex items-center text-indigo-600 font-semibold text-sm transition group-hover:text-indigo-700"
                        >
                            Read More
                            <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
                        </span>
                    </div>
                </div>
            </div>
        </Link>
    );
}