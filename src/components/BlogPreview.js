// components/BlogPreview.jsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

// Skeleton with image
const BlogListSkeleton = () => (
  <div className="bg-white rounded-2xl border border-gray-200 p-6 md:p-8 flex flex-col md:flex-row gap-6 animate-pulse">
    <div className="bg-gray-200 w-full md:w-40 h-32 rounded-lg"></div>
    <div className="flex-1 space-y-4">
      <div className="h-6 bg-gray-200 rounded-md w-3/4"></div>
      <div className="h-4 bg-gray-200 rounded-md w-full"></div>
      <div className="h-4 bg-gray-200 rounded-md w-5/6"></div>
      <div className="h-4 bg-gray-200 rounded-md w-1/4"></div>
    </div>
  </div>
);

async function fetchLatestBlogs() {
  try {
    const res = await fetch(`/api/blogs`, { cache: "no-store" });
    if (!res.ok) throw new Error(`Failed to fetch: ${res.status}`);
    const blogs = await res.json();
    return blogs.slice(0, 3);
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return [];
  }
}

export default function BlogPreview() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchLatestBlogs().then(data => {
        setBlogs(data);
        setLoading(false);
      });
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="py-20 md:py-28 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-base font-semibold text-indigo-700 uppercase tracking-widest mb-3">
            Fresh Content
          </p>
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-snug">
            Our Latest Articles
          </h2>
        </div>

        {loading ? (
          <div className="space-y-10">
            {[...Array(3)].map((_, i) => (
              <BlogListSkeleton key={i} />
            ))}
          </div>
        ) : blogs.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl shadow-xl">
            <p className="text-xl text-gray-500 mb-6">
              No articles found. Be the first to publish a post!
            </p>
            <Link
              href="/blogs/create"
              className="inline-flex items-center mt-2 px-8 py-3 bg-indigo-700 text-white rounded-xl font-semibold hover:bg-indigo-600 transition"
            >
              Start Writing Today
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </div>
        ) : (
          <>
            {/* Blog List with Images */}
            <div className="space-y-10">
              {blogs.map((blog, index) => (
                <motion.div
                  key={blog._id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white p-6 md:p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col md:flex-row gap-6 group cursor-pointer"
                >
                  {/* Image */}
                  {blog.imageUrl && (
                    <div className="w-full md:w-40 h-40 relative shrink-0 rounded-lg overflow-hidden">
                      <Image
                        src={blog.imageUrl}
                        alt={blog.title}
                        fill
                        className="object-cover"
                        sizes="160px"
                      />


                    </div>
                  )}

                  {/* Text Content */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      {/* Title */}
                      <Link href={`/blogs/${blog._id}`}>
                        <h3 className="text-2xl md:text-3xl font-bold text-gray-900 group-hover:text-indigo-700 transition">
                          {blog.title}
                        </h3>
                      </Link>

                      {/* Meta Info */}
                      <div className="flex items-center gap-4 text-gray-500 text-sm mt-2">
                        <span className="font-medium">{blog.author || "Guest Contributor"}</span>
                        <span>•</span>
                        <span>{new Date(blog.createdAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric"
                        })}</span>                      </div>

                      {/* Excerpt */}
                      <p className="text-gray-600 mt-3 leading-relaxed">
                        {blog.excerpt || (blog.content?.slice(0, 120) + "...")}
                      </p>
                    </div>

                    {/* Read More */}
                    <Link
                      href={`/blogs/${blog._id}`}
                      className="inline-flex items-center mt-4 text-indigo-700 font-semibold hover:underline"
                    >
                      Read More
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* View All Button */}
            <div className="text-center mt-16">
              <Link
                href="/blogs"
                className="inline-flex items-center px-8 py-3 text-lg font-semibold text-indigo-700 border-2 border-indigo-200 bg-white rounded-xl shadow-md hover:bg-indigo-50 transition duration-300"
              >
                View All Posts
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
