"use client";

import React, { useState, useEffect } from "react";
import BlogCard from "@/components/BlogCard";
import { motion } from "framer-motion";

// Skeleton Card for loading
const SkeletonCard = ({ withImage = true }) => (
  <div className="border rounded-lg p-4 shadow-sm animate-pulse bg-gray-100">
    {withImage && <div className="w-full h-48 bg-gray-300 rounded mb-4" />}
    <div className="h-6 bg-gray-300 rounded mb-2 w-3/4" />
    <div className="h-4 bg-gray-300 rounded mb-2 w-full" />
    <div className="h-4 bg-gray-300 rounded w-5/6" />
  </div>
);

export default function FeaturedPost() {
  const [featuredPosts, setFeaturedPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch 4 shuffled featured blogs
  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/blogs/featured", { cache: "no-store" });

        if (!res.ok) throw new Error("Failed to load featured posts");

        const data = await res.json();
        setFeaturedPosts(data.data || []);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFeatured();
  }, []);

  // Split the posts for custom layout
  const leftCard = featuredPosts[0];
  const middleCards = featuredPosts.slice(1, 3); // two cards in middle
  const rightCard = featuredPosts[3];

  return (
    <section className="py-20 bg-[#FAFAFA]">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <h2 className="text-4xl font-semibold text-gray-900 mb-10 text-start">
          Featured Posts
        </h2>

        {/* Loading */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <SkeletonCard />
            <div className="flex justify-between flex-col gap-5 md:gap-3">
              <SkeletonCard withImage={false} />
              <SkeletonCard withImage={false} />
            </div>
            <SkeletonCard />
          </div>
        )}

        {/* Error */}
        {error && !loading && (
          <p className="text-center text-red-500">{error}</p>
        )}

        {/* Empty */}
        {!loading && featuredPosts.length === 0 && !error && (
          <p className="text-center text-gray-500">No featured blogs found.</p>
        )}

        {/* Featured Grid */}
        {!loading && featuredPosts.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-4">
            {/* Left Card */}
            {leftCard && <BlogCard key={leftCard._id} blog={leftCard} />}

            {/* Middle Column: two stacked cards without images */}
            {middleCards.length > 0 && (
              <div className="flex flex-col gap-5 md:gap-3">
                {middleCards.map((blog) => (
                  <BlogCard key={blog._id} blog={{ ...blog, imageUrl: null }} />
                ))}
              </div>
            )}

            {/* Right Card */}
            {rightCard && <BlogCard key={rightCard._id} blog={rightCard} />}
          </div>
        )}
      </div>
    </section>
  );
}
