// components/BlogPreview.jsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CalendarDays, Clock, FileText, RefreshCcw } from "lucide-react";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import DrawOutlineButton from "./DrawOutlineButton";

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

    // Sort by createdAt descending
    const sorted = blogs.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    // Take the first 3
    return sorted.slice(0, 3);
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

  // const formattedDate = new Date(blogs.createdAt).toLocaleDateString('en-US', {
  //   year: 'numeric',
  //   month: 'short',
  //   day: 'numeric'
  // });

  return (
    <section className="py-16 md:pt-24 md:pb-16 bg-[#FAFAFA]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-base font-semibold text-gray-900 uppercase tracking-widest mb-3 flex items-center justify-center gap-3">
            <RefreshCcw className="w-5 h-5 text-gray-500" />
            Fresh Content
            {/* <FileText className="w-5 h-5 text-gray-500" /> */}
          </p>
          <h2 className="text-4xl md:text-4xl font-semibold text-black leading-snug">
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
          <div className="text-center py-16 bg-[#FAFAFA] rounded-2xl shadow-xl">
            <p className="text-xl text-gray-500 mb-6">
              No articles found. Be the first to publish a post!
            </p>
            <Link
              href="/blogs/create"
              className="inline-flex items-center mt-2 px-8 py-3 bg-gradient-to-r from-gray-800 to-black hover:from-gray-700 hover:to-gray-900  rounded-xl font-semibold transition"
            >
              Start Writing Today
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </div>
        ) : (
          <>
            {/* Blog List with Images */}
            <div className="space-y-8">
              {blogs.map((blog, index) => (
                <Link href={`/blogs/${blog._id}`} key={blog._id} className="block">
                  <motion.div
                    key={blog._id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-[#F2F3E8]/60 py-4 px-5 border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col md:flex-row gap-6 "
                  >
                    {/* Image */}
                    {blog.imageUrl && (
                      <div className="w-full md:w-40 h-40 relative shrink-0 rounded-sm overflow-hidden">
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

                        <div className="group inline-block">
                          <h3 className=" text-2xl md:text-3xl font-semibold text-gray-900  group-hover:text-gray-900 transition relative w-fit">
                            {blog.title}
                            <span className="  absolute left-0 -bottom-1 h-0.5 w-full bg-gray-900  scale-x-0 group-hover:scale-x-100   origin-left transition-transform duration-300"></span>
                          </h3>
                        </div>



                        <div className="flex justify-start gap-10 items-center mt-3">
                          <p className="text-sm  inline-flex  font-medium text-gray-500">
                            <CalendarDays className="w-4 h-4 mr-2" /><span>{new Date(blog.createdAt).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "short",
                              day: "numeric"
                            })}</span>
                          </p>
                          <p className="text-sm  inline-flex  font-medium text-gray-500">
                            <Clock className="w-4 h-4 mr-2" /> {blog.readingTime || "02 min read"}
                          </p>
                        </div>

                        {/* Excerpt */}
                        <p className="text-gray-700 mt-2 leading-relaxed">
                          {blog.excerpt || (blog.content?.slice(0, 115) + "...")}
                        </p>
                      </div>


                      <div className="flex justify-between items-center">

                        <div className="flex pt-2 gap-2">
                          <span className=" font-medium text-sm  text-gray-500">Written by:</span>
                          <span className=" font-medium text-sm  text-gray-700">{blog.author || "Guest Contributor"}</span>
                        </div>
                      </div>

                      <Link
                        href={`/blogs/${blog._id}`}
                        className="group inline-flex items-center mt-2 text-gray-800 font-semibold relative w-fit"
                      >
                        Read More

                        {/* Underline */}
                        <span
                          className="  absolute left-0 -bottom-0.5 h-0.5 w-full bg-gray-800  scale-x-0 group-hover:scale-x-100   origin-left transition-transform duration-300 "
                        ></span>

                        <ArrowRight className="w-4 h-4 ml-1" />
                      </Link>

                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>

            {/* View All Button */}
            <div className="text-center mt-16">
              {/* <Link
                href="/blogs"
                className="inline-flex items-center px-8 py-3 text-lg font-semibold text-black border-2 border-gray-300 bg-white rounded-xl shadow-md hover:bg-gray-50 transition duration-300"
              >
                View All Posts
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link> */}
              <Link
                href="/blogs"
                className="inline-flex  border border-gray-300 hover:border-white  items-center text-lg font-semibold text-black transition duration-300"
              >
                {/* Remove the outer <div className="flex items-center"> */}
                <DrawOutlineButton>
                  {/* ADD A FLEX CONTAINER AROUND THE CONTENT YOU ARE PASSING */}
                  <span className="flex items-center space-x-1">
                    <span>View All Posts</span>
                    <ArrowRight className="w-5 h-5" />
                  </span>
                </DrawOutlineButton>
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
