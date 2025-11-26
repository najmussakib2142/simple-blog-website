"use client";

import Link from "next/link";
import { ArrowRight, Feather, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

const SparkSVG = () => (
  <motion.svg
    // Positioning and size relative to the inline-block wrapper around the h1
    className="absolute -top-10 -right-16 w-16 h-16 pointer-events-none"
    viewBox="0 0 50 50"

    // Animate container opacity for a smooth entry
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.5, delay: 0.7 }}
  >
    {/* First line: Rotate ~45 degrees */}
    <motion.line
      x1="25" y1="25" x2="45" y2="5"
      stroke="#B45309" // Custom Gold/Tan Color
      strokeWidth="3"
      strokeLinecap="round"

      // Animate the line drawing effect (simulating pathLength)
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    />
    {/* Second line: Rotate ~-45 degrees (staggered slightly) */}
    <motion.line
      x1="25" y1="25" x2="45" y2="45"
      stroke="#B45309"
      strokeWidth="3"
      strokeLinecap="round"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
    />
  </motion.svg>
);

export default function Hero() {



  return (
    <section className="relative  md:py-20 pt-10 md:pt-8   h-[50dvh] md:min-h-screen  bg-[#FAFAFA]
    bg-cover bg-center  overflow-hidden flex items-center justify-center">

      {/* Modern soft blur shapes */}
      <div className="absolute inset-0">
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-indigo-100/30 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-blue-100/30 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 text-center">

        {/* Badge */}
        <div className="relative inline-block">

          {/* ✨ SPARK GRAPHIC ADDED HERE ✨ */}
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center text-xs sm:text-sm font-medium 
                     text-indigo-700 bg-white/60 backdrop-blur-md 
                     border border-indigo-200/40 rounded-full px-4 py-1.5  shadow-sm"
          >
            <Feather className="w-4 h-4 mr-2" />
            The Modern Blog
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-gray-900 leading-tight mb-6"
          >
            <span className="text-3xl  md:text-5xl font-extrabold
                 text-transparent bg-clip-text bg-gradient-to-r
                 from-indigo-700 via-blue-600 to-indigo-600">
              Ideas Worth Sharing.
            </span>
            <span className="block text-gray-800 mt-2">
              Write. Read. Inspire.
            </span>
          </motion.h1>
        </div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto mb-12 leading-relaxed"
        >
          Discover thoughtful stories, insightful articles, and a clean reading experience—crafted for creators and thinkers.
        </motion.p>

        {/* CTA Buttons */}
        {/* <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex flex-col sm:flex-row justify-center gap-4"
        >
          <Link
            href="/blogs"
            className="inline-flex items-center justify-center px-8 py-3 bg-indigo-700 text-white text-base sm:text-lg font-semibold rounded-lg shadow-lg hover:bg-indigo-600 transition duration-300 hover:scale-[1.02]"
          >
            Explore Articles
            <ArrowRight className="w-5 h-5 ml-2" />
          </Link>

          <Link
            href="/create"
            className="inline-flex items-center justify-center px-8 py-3 text-base sm:text-lg font-semibold text-indigo-700 border border-indigo-200 bg-white rounded-lg shadow-sm hover:bg-indigo-50 transition duration-300"
          >
            Start Writing
          </Link>
        </motion.div> */}
      </div>
    </section>
  );
}
