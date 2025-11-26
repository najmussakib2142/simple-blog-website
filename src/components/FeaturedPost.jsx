"use client";

import Link from "next/link";
import Image from "next/image";
import { Clock, ArrowRight, CornerUpRight } from "lucide-react";
import { motion, useCycle, useAnimate } from "framer-motion"; // ✨ Added useCycle and useAnimate here
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
    return blogs?.[0] ?? null;
  } catch (e) {
    console.error("Error fetching featured post:", e);
    return null;
  }
}

// ----------------------------------------------------------------------
// ⚡️ STAGGERED HOVER TITLE COMPONENT (Defined before FeaturedPost)
// ----------------------------------------------------------------------

const INITIAL_COLOR = '#111827'; // Tailwind 'gray-900'
const HOVER_COLOR = '#4f46e5'; // Tailwind 'indigo-600' (Using one color for a clear stagger effect)

const StaggeredHoverTitle = ({ title, postLink }) => {
  const characters = (title || '').split('');
  
  const [scope, animate] = useAnimate();
  // Using a simple state to track if an animation is currently running
  const [isAnimating, setIsAnimating] = useState(false); 

  const runAnimation = async (direction) => {
    if (isAnimating) return; // Prevent animation stacking
    setIsAnimating(true);
    
    const targetColor = direction === 'hover' ? HOVER_COLOR : INITIAL_COLOR;
    
    // Determine the sequence: forward for hover, reverse for unhover
    const indices = Array.from({ length: characters.length }, (_, i) => i);
    const order = direction === 'hover' ? indices : indices.slice().reverse();

    const sequence = order.map((index, sequenceIndex) => {
      const charId = `#char-${index}`;
      // Staggered delay (0.02s per character)
      const delay = sequenceIndex * 0.02; 
      
      return [
        charId, 
        { color: targetColor }, 
        { duration: 0.3, delay: delay, ease: "easeInOut" }
      ];
    });

    await animate(sequence);
    setIsAnimating(false);
  };
  
  const handleMouseEnter = () => runAnimation('hover');
  const handleMouseLeave = () => runAnimation('unhover');

  return (
    <h2 className="text-4xl md:text-5xl font-extrabold leading-tight">
      <Link
        href={postLink}
        className="block"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        ref={scope} 
      >
        {characters.map((char, index) => (
          <motion.span
            key={index}
            id={`char-${index}`}
            style={{ color: INITIAL_COLOR }} 
            className="inline-block transition-colors duration-300" // Fallback transition
          >
            {char === ' ' ? '\u00A0' : char}
          </motion.span>
        ))}
      </Link>
    </h2>
  );
};


// ----------------------------------------------------------------------
// 🚀 FEATURED POST MAIN COMPONENT
// ----------------------------------------------------------------------

export default function FeaturedPost() {
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchLatestPost().then(data => {
        setBlog(data);
        setLoading(false);
      });
    }, 300); // 300ms minimum loading time

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    // 💀 SKELETON LOADER STATE (Omitted for brevity)
    return (
      <section className="py-16 md:py-24 bg-white overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* ... Skeleton Content */}
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
                className="w-full h-auto object-cover aspect-[7/5]"
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

            {/* 🔥 INTEGRATE THE NEW STAGGERED TITLE HERE 🔥 */}
            <StaggeredHoverTitle 
                title={blog.title} 
                postLink={postLink} 
            />
            
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