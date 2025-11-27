import Image from "next/image";
import Link from "next/link";
import BlogActions from "@/components/BlogActions";
import { ArrowLeft } from "lucide-react";

/* -------------------------
   Split Content Helper
-------------------------- */
function splitContent(text) {
  if (!text) return { intro: "", main: "", end: "" };

  const parts = text.split("\n").filter((p) => p.trim() !== "");

  if (parts.length <= 2) {
    return { intro: parts.join("\n\n"), main: "", end: "" };
  }

  return {
    intro: parts[0],
    main: parts.slice(1, -1).join("\n\n"),
    end: parts.slice(-1)[0],
  };
}

/* -------------------------
   Fetch Blog (Server)
-------------------------- */
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

/* -------------------------
   Metadata for SEO
-------------------------- */
export async function generateMetadata({ params }) {
  const { id } = await params;
  const blog = await getBlog(id);
  return {
    title: blog?.title || "Blog Not Found",
    description: blog?.description || "",
  };
}

/* -------------------------
   MAIN COMPONENT
-------------------------- */
export default async function BlogDetails({ params }) {
  const { id } = await params;
  const blog = await getBlog(id);

  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6">
        <div className="max-w-2xl text-center">
          <h1 className="text-3xl font-bold mb-4">Blog Not Found</h1>
          <p className="text-gray-600 mb-6">
            The blog you&apos;re looking for doesn’t exist or may have been removed.
          </p>

          <Link
            href="/blogs"
            className="inline-flex items-center px-5 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to All Blogs
          </Link>
        </div>
      </div>
    );
  }

  /* Magazine-style content split */
  const { intro, main, end } = splitContent(blog.content);

  return (
    <article className="bg-white">
      <div className="max-w-5xl mx-auto px-4 md:px-8 py-12">

        {/* Back link */}
        <div className="mb-6">
          <Link
            href="/blogs"
            className="inline-flex items-center text-sm text-gray-600 hover:text-black"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back to All Blogs
          </Link>
        </div>

        {/* Header */}
        <header className="mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-black leading-tight">
            {blog.title}
          </h1>

          {blog.description && (
            <p className="text-gray-700 text-lg mt-3 max-w-3xl">
              {blog.description}
            </p>
          )}

          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mt-5">
            <p>
              {new Date(blog.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>

            {blog.readingTime && (
              <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
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

        {/* Hero Image */}
        {blog.imageUrl && (
          <div className="mb-12 rounded-xl overflow-hidden shadow-sm relative h-96 w-full">
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
          <div className="flex flex-wrap gap-2 mb-12">
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

        {/* --------------------------
            MAGAZINE CONTENT LAYOUT
        --------------------------- */}

        {/* INTRO */}
        {intro && (
          <section className="max-w-3xl mx-auto mb-12">
            <p className="text-xl leading-relaxed text-gray-900 whitespace-pre-wrap">
              {intro}
            </p>
          </section>
        )}

        {/* PULL QUOTE */}
        {main && (
          <div className="max-w-3xl mx-auto my-12 border-l-4 border-black pl-6 py-4">
            <p className="text-xl italic text-gray-700 leading-relaxed whitespace-pre-wrap">
              {main}
            </p>
          </div>
        )}

        {/* FINAL THOUGHTS */}
        {end && (
          <section className="max-w-3xl mx-auto mt-16 mb-20">
            <h3 className="text-2xl font-semibold text-black mb-4">
              Final Thoughts
            </h3>
            <p className="text-lg text-gray-800 leading-relaxed whitespace-pre-wrap">
              {end}
            </p>
          </section>
        )}

        {/* --------------------------
            Author Box
        --------------------------- */}
        <div className="border p-6 rounded-2xl bg-white/60 backdrop-blur-sm mb-16 shadow-[0_2px_10px_rgba(0,0,0,0.04)]">
  <h3 className="font-semibold text-lg text-gray-900 mb-4 tracking-tight">
    Author
  </h3>

  <div className="flex items-center gap-4">
    {/* Avatar */}
    <div className="relative w-16 h-16 rounded-full overflow-hidden shadow-md ring-2 ring-gray-200">
      <Image
        alt={blog.author || "Author"}
        src={
          blog.authorImage ||
          "https://i.ibb.co/Mkf1wBdJ/jack-finnigan-rri-AI0nhcbc-unsplash.jpg"
        }
        fill
        className="object-cover"
      />
    </div>

    {/* Author Details */}
    <div className="flex flex-col">
      <p className="text-gray-900 font-semibold text-base">
        {blog.author || "Unknown Author"}
      </p>

      {blog.authorEmail && (
        <p className="text-gray-500 text-sm mt-0.5">
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
