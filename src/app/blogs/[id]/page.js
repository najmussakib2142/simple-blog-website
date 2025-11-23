import Image from "next/image";
import Link from "next/link";
import DeleteButton from "@/components/DeleteButton";
import { ArrowLeft } from "lucide-react";
import EditBlogModal from "@/components/EditBlogModal";

// fetch a single blog by id (server-side)
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
      <div className="min-h-[60vh] flex items-center justify-center px-6">
        <div className="max-w-2xl text-center">
          <h1 className="text-3xl font-bold mb-4">Blog Not Found</h1>
          <p className="text-gray-600 mb-6">Sorry, the blog you&apos;re looking for doesn&apos;t exist or may have been removed.</p>
          <Link
            href="/blogs"
            className="inline-flex items-center px-5 py-2 bg-indigo-700 text-white rounded-lg hover:bg-indigo-700 transition"
          >
            <ArrowLeft className="w-4 h-4 mr-2" /> {/* Lucide arrow icon */}
            Back to All Blogs
          </Link>
        </div>
      </div>
    );
  }

  return (
    <article className="bg-white">
      <div className="max-w-3xl mx-auto px-6 py-12">
        <div className="mb-6">
          <Link href="/blogs" className="inline-flex items-center text-sm text-gray-600 hover:underline">
            ← Back to All Blogs
          </Link>
        </div>

        <header className="mb-8">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-3 text-gray-900">{blog.title}</h1>
          {blog.description && <p className="text-gray-600 text-lg mb-3">{blog.description}</p>}
          <p className="text-sm text-gray-500">Published on {new Date(blog.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</p>
        </header>

        {blog.imageUrl && (
          <div className="mb-8 rounded-xl overflow-hidden shadow-lg relative h-80">
            <Image src={blog.imageUrl} alt={blog.title} fill className="object-cover" />
          </div>
        )}

        <div className="prose prose-lg max-w-none mb-8">
          <div className="whitespace-pre-wrap text-gray-700 leading-relaxed">{blog.content}</div>
        </div>

        <footer className="pt-6 border-t">
          <div className="flex items-center justify-between gap-4">
            <Link href="/blogs" className="inline-flex items-center px-4 py-2 bg-indigo-700 text-white rounded-lg hover:bg-indigo-700 transition">
              <ArrowLeft className="w-4 h-4 mr-2" /> {/* Lucide arrow icon */}
              Back to All Blogs
            </Link>

            <EditBlogModal blog={blog} id={id} />

            <DeleteButton id={id} />
          </div>
        </footer>
      </div>
    </article>
  );
}
