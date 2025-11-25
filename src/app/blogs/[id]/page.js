import Image from "next/image";
import Link from "next/link";
import BlogActions from "@/components/BlogActions";
import { ArrowLeft } from "lucide-react";

// Fetch blog (server)
async function getBlog(id) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    const res = await fetch(`${baseUrl}/api/blogs/${id}`, { cache: "no-store" });
    if (!res.ok) return null;
    return res.json();
  } catch (e) {
    console.error("Error fetching blog:", e);
    return null;
  }
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const blog = await getBlog(id);
  return {
    title: blog?.title || "Blog Not Found",
    description: blog?.description || "",
  };
}

export default async function BlogDetails({ params }) {
  const { id } = await params;
  const blog = await getBlog(id);

  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6">
        <div className="max-w-2xl text-center">
          <h1 className="text-3xl font-bold mb-4">Blog Not Found</h1>
          <p className="text-gray-600 mb-6">
            Sorry, the blog you&apos;re looking for doesn&apos;t exist or may have been removed.
          </p>
          <Link
            href="/blogs"
            className="inline-flex items-center px-5 py-2 bg-indigo-700 text-white rounded-lg hover:bg-indigo-800 transition"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to All Blogs
          </Link>
        </div>
      </div>
    );
  }

  return (
    <article className="bg-white">
      <div className="max-w-5xl mx-auto px-4 md:px-8 py-12">

        {/* Back link */}
        <div className="mb-6">
          <Link
            href="/blogs"
            className="inline-flex items-center text-sm text-gray-600 hover:text-indigo-700 hover:underline"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back to All Blogs
          </Link>
        </div>

        {/* Header */}
        <header className="mb-10">
          <h1 className="text-4xl font-bold text-gray-900 leading-tight">
            {blog.title}
          </h1>

          {blog.description && (
            <p className="text-gray-700 text-lg mt-2">{blog.description}</p>
          )}

          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mt-4">
            <p>
              Published on{" "}
              {new Date(blog.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>

            {blog.readingTime && (
              <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs">
                {blog.readingTime}
              </span>
            )}

            {blog.category && (
              <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
                {blog.category}
              </span>
            )}
          </div>
        </header>

        {/* Image */}
        {blog.imageUrl && (
          <div className="mb-10 rounded-xl overflow-hidden shadow-lg relative h-80 w-full">
            <Image
              src={blog.imageUrl}
              alt={blog.title}
              fill
              priority
              className="object-cover"
            />
          </div>
        )}

        {/* Tags */}
        {blog.tags?.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {blog.tags.map((tag, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-gray-200 text-gray-700 rounded-full text-xs"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Content */}
        <div className="prose prose-lg max-w-none text-gray-800 leading-relaxed mb-12">
          <p className="whitespace-pre-wrap">{blog.content}</p>
        </div>

        {/* Author Box */}
        <div className="border p-5 rounded-2xl bg-gray-50 mb-12 shadow-sm hover:shadow-md transition-shadow duration-300">
          <h3 className="font-semibold text-lg text-gray-700 mb-2">Author</h3>
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 relative  overflow-hidden bg-gray-200 border-2 border-indigo-300 shadow-sm">
              <Image
                alt={blog.author || "Author Avatar"}
                src={
                  blog.authorImage ||
                  "https://i.ibb.co/Mkf1wBdJ/jack-finnigan-rri-AI0nhcbc-unsplash.jpg"
                }
                fill
                className="object-cover"
              />
            </div>
            <div className="flex flex-col justify-center">
              <p className="text-gray-900 font-medium text-sm sm:text-base">
                {blog.author || "Unknown Author"}
              </p>
              {blog.authorEmail && (
                <p className="text-gray-500 text-xs sm:text-sm truncate max-w-xs">
                  {blog.authorEmail}
                </p>
              )}
            </div>
          </div>
        </div>


        {/* Actions */}
        <footer className="pt-6 border-t">
          <div className="flex items-center justify-end">
            <BlogActions blog={blog} id={id} />
          </div>
        </footer>
      </div>
    </article>
  );
}
