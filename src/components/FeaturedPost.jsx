"use client";

import Link from "next/link";
import Image from "next/image";
import { Clock, ArrowRight, CornerUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

// Helper function for clearer date formatting
function formatPostDate(dateString) {
  if (!dateString) return 'Date Unavailable';
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
}

async function fetchLatestPost() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  try {
    // const res = await fetch(`${baseUrl}/api/blogs`, { next: { revalidate: 3600 } });
    const res = await fetch(`/api/blogs`, { next: { revalidate: 3600 } });
    if (!res.ok) throw new Error(`Failed to fetch data: ${res.status}`);
    const blogs = await res.json();
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
    fetchLatestPost().then(data => {
      setBlog(data);
      setLoading(false);
    });
  }, []);

  if (loading) {
    // Skeleton Loader
    return (
      <section className="py-16 md:py-24 bg-white overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="animate-pulse bg-gray-200 h-80 w-full rounded-2xl"></div>
            <div className="space-y-5">
              <div className="animate-pulse bg-gray-200 h-6 w-40 rounded-full"></div>
              <div className="animate-pulse bg-gray-200 h-10 w-full rounded-md"></div>
              <div className="animate-pulse bg-gray-200 h-6 w-3/4 rounded-md"></div>
              <div className="animate-pulse bg-gray-200 h-6 w-1/2 rounded-md"></div>
              <div className="animate-pulse bg-gray-200 h-10 w-48 rounded-xl mt-4"></div>
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
                className="w-full h-auto object-cover"
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
              <Link href={postLink} className="hover:text-blue-900 transition">
                {blog.title}
              </Link>
            </h2>

            <p className="text-lg text-gray-600 max-w-xl line-clamp-3">
              {blog.description}
            </p>

            {/* Metadata */}
            <div className="flex items-center text-sm text-gray-500 pt-2">
              <Clock className="w-4 h-4 mr-2 text-indigo-500" />
              Published on {formatPostDate(blog.createdAt)}
            </div>

            {/* CTA */}
            <Link
              href={postLink}
              className="inline-flex items-center mt-6 px-8 py-3 bg-blue-900 text-white text-lg font-medium rounded-xl shadow-lg hover:bg-indigo-700 transition transform hover:scale-[1.02] active:scale-[0.98]"
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
