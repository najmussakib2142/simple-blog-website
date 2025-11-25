"use client";

import Link from "next/link";
import Image from "next/image";
import { Clock, ArrowRight, CornerUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

// Helper function for clearer date formatting
function formatPostDate(dateString) {
  if (!dateString) return 'Date Unavailable';
  // Use a cleaner format
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
}

async function fetchLatestPost() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  try {
    // Using relative path for client-side fetch, assuming the API route is accessible
    const res = await fetch(`/api/blogs`, { next: { revalidate: 3600 } });
    if (!res.ok) throw new Error(`Failed to fetch data: ${res.status}`);
    const blogs = await res.json();
    // Simulate a network delay for better visualization of the skeleton
    // await new Promise(resolve => setTimeout(resolve, 1500)); 
    return blogs?.[0] ?? null;
  } catch (e) {
    console.error("Error fetching featured post:", e);
    return null;
  }
}

export default function FeaturedPost() {
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Add a minimum delay to prevent flickering on very fast connections
    const timer = setTimeout(() => {
      fetchLatestPost().then(data => {
        setBlog(data);
        setLoading(false);
      });
    }, 300); // 300ms minimum loading time

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    // 💀 SKELETON LOADER STATE (Modern and Structured)
    return (
      <section className="py-16 md:py-24 bg-white overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

            {/* Skeleton Image Placeholder */}
            <div className="order-1 lg:order-2">
              <div className="animate-pulse bg-gray-200 aspect-[7/5] w-full rounded-2xl shadow-lg"></div>
            </div>

            {/* Skeleton Content Placeholder */}
            <div className="order-2 lg:order-1 space-y-5">

              {/* Badge */}
              <div className="animate-pulse bg-gray-200 h-6 w-32 rounded-full mb-3"></div>

              {/* Title (Multiple lines to simulate the large heading) */}
              <div className="space-y-3">
                <div className="animate-pulse bg-gray-200 h-10 w-full rounded-lg"></div>
                <div className="animate-pulse bg-gray-200 h-10 w-11/12 rounded-lg"></div>
              </div>

              {/* Description (Multiple lines) */}
              <div className="pt-2 space-y-2">
                <div className="animate-pulse bg-gray-200 h-5 w-full rounded-md"></div>
                <div className="animate-pulse bg-gray-200 h-5 w-11/12 rounded-md"></div>
                <div className="animate-pulse bg-gray-200 h-5 w-3/4 rounded-md"></div>
              </div>

              {/* Metadata */}
              <div className="animate-pulse bg-gray-200 h-5 w-48 rounded-md pt-2"></div>

              {/* CTA Button */}
              <div className="animate-pulse bg-gray-300 h-12 w-56 rounded-xl mt-6"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (!blog) {
    return (
      <section className="py-12 bg-gray-50 text-center">
        <p className="text-gray-500">No featured posts available right now.</p>
      </section>
    );
  }

  // 📝 ACTUAL CONTENT RENDERING
  const imageUrl = blog.imageUrl || '/placeholder-image.jpg';
  const postLink = `/blogs/${blog._id}`;

  return (
    <section className="py-16 md:py-24 bg-white overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="order-1 lg:order-2 shadow-xl rounded-2xl overflow-hidden transform hover:scale-[1.01] transition duration-300 ease-in-out"
          >
            <Link href={postLink} aria-label={`Read ${blog.title}`}>
              <Image
                src={imageUrl}
                alt={`Featured Image for: ${blog.title}`}
                width={700}
                height={450}
                className="w-full h-auto object-cover aspect-[7/5]" // Added aspect ratio for consistency
                placeholder="blur"
                blurDataURL="/placeholder-blur.jpg"
                priority
              />
            </Link>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="order-2 lg:order-1 space-y-5"
          >
            <p className="inline-flex items-center text-sm font-semibold text-indigo-700 bg-indigo-100 rounded-full px-3 py-1 uppercase tracking-widest shadow-sm">
              <CornerUpRight className="w-4 h-4 mr-2" />
              Featured Article
            </p>

            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
              <Link href={postLink} className="hover:text-indigo-700 transition">
                {blog.title}
              </Link>
            </h2>

            {/* <Link href={postLink} className="group inline-block">
              <h3 className=" text-4xl md:text-5xl font-extrabold text-gray-900  group-hover:text-gray-900 transition relative w-fit">
                {blog.title}
                <span className="  absolute left-0 -bottom-1 h-0.5 w-full bg-gray-900  scale-x-0 group-hover:scale-x-100   origin-left transition-transform duration-300"></span>
              </h3>
            </Link> */}

            <p className="text-lg text-gray-600 max-w-xl line-clamp-3">
              {blog.description}
            </p>

            {/* Metadata */}
            <div className="flex items-center text-sm text-gray-500 pt-2">
              <Clock className="w-4 h-4 mr-2 text-indigo-500" />
              Published on {formatPostDate(blog.createdAt)}
            </div>

            {/* CTA - Using the indigo style from the previous section for consistency */}
            <Link
              href={postLink}
              className="inline-flex items-center mt-6 px-8 py-3 bg-indigo-700 text-white text-lg font-medium rounded-xl shadow-lg hover:bg-indigo-600 transition transform hover:scale-[1.02] active:scale-[0.98]"
            >
              Continue Reading
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}