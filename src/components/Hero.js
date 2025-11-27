"use client";

import Link from "next/link";
import { ArrowDown, ArrowRight, Feather, Sparkles } from "lucide-react";
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
    <section className="relative md:py-20 pt-10 md:pt-8 h-[50dvh] md:min-h-screen 
      bg-white bg-cover bg-center overflow-hidden flex items-center justify-center">

      {/* Dynamic background shapes */}
      <div className="absolute inset-0">
        <div className="absolute -top-40 -right-40 w-96 h-96 
          bg-gradient-to-tr from-indigo-200/30 via-purple-200/20 to-pink-200/10 
          rounded-full blur-3xl animate-pulse-slow rotate-[30deg]"></div>
        <div className="absolute -bottom-32 -left-32 w-80 h-80 
          bg-gradient-to-br from-purple-100/20 via-pink-100/20 to-indigo-50/10 
          rounded-full blur-3xl animate-pulse-slow rotate-[-20deg]"></div>

        {/* Floating accent dots */}
        <div className="absolute top-10 left-1/4 w-3 h-3 bg-white/20 rounded-full blur-sm animate-pulse-slow"></div>
        <div className="absolute bottom-20 right-1/3 w-4 h-4 bg-white/30 rounded-full blur-sm animate-pulse-slow delay-200"></div>
      </div>

      {/* Main content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 text-center">

        {/* Badge */}
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center text-xs sm:text-sm font-medium 
            text-gray-900 bg-white/60 backdrop-blur-md 
            border border-gray-200 rounded-full px-5 py-2 shadow-md mb-6"
        >
          <Feather className="w-4 h-4 mr-2 text-gray-800" />
          The Modern Blog
        </motion.p>

        {/* Hero Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-black leading-tight mb-6"
        >
          <span className="text-3xl md:text-5xl font-extrabold">
            Ideas Worth Sharing.
          </span>

          <span className="block text-transparent bg-clip-text 
      bg-gradient-to-r from-gray-800 via-gray-700 to-gray-900 mt-2">
            Write. Read. Inspire.
          </span>
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="text-md sm:text-xl text-gray-700 max-w-2xl mx-auto mb-12 leading-relaxed"
        >
          Discover thoughtful stories, insightful articles, and a clean reading experience—crafted for creators and thinkers.
        </motion.p>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute -bottom-6 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <ArrowDown className="w-6 h-6 text-gray-500" />
        </motion.div>

      </div>
    </section>


    //     <section className="relative md:py-20 pt-10 md:pt-8 h-[50dvh] md:min-h-screen 
    //     bg-gradient-to-b from-black via-[#0a0a0a] to-[#111] 
    //     bg-cover bg-center overflow-hidden flex items-center justify-center">

    //   {/* Modern soft blur shapes */}
    //   <div className="absolute inset-0">
    //     <div className="absolute -top-32 -right-32 w-96 h-96 
    //       bg-white/5 rounded-full blur-3xl"></div>
    //     <div className="absolute -bottom-24 -left-24 w-72 h-72 
    //       bg-white/5 rounded-full blur-3xl"></div>
    //   </div>

    //   <div className="relative z-10 max-w-6xl mx-auto px-4 text-center">

    //     {/* Badge */}
    //     <div className="relative inline-block">

    //       <motion.p
    //         initial={{ opacity: 0, y: -10 }}
    //         animate={{ opacity: 1, y: 0 }}
    //         transition={{ duration: 0.5 }}
    //         className="inline-flex items-center text-xs sm:text-sm font-medium 
    //                    text-gray-100 bg-white/10 backdrop-blur-md 
    //                    border border-white/20 rounded-full px-4 py-1.5 shadow-sm"
    //       >
    //         <Feather className="w-4 h-4 mr-2 text-white" />
    //         The Modern Blog
    //       </motion.p>

    //       <motion.h1
    //         initial={{ opacity: 0, y: 20 }}
    //         animate={{ opacity: 1, y: 0 }}
    //         transition={{ duration: 0.7 }}
    //         className="text-4xl sm:text-6xl md:text-7xl font-extrabold 
    //                    text-white leading-tight mb-6"
    //       >
    //         <span className="text-3xl md:text-5xl font-extrabold
    //                text-transparent bg-clip-text bg-gradient-to-r
    //                from-white via-gray-300 to-white">
    //           Ideas Worth Sharing.
    //         </span>
    //         <span className="block text-gray-300 mt-2">
    //           Write. Read. Inspire.
    //         </span>
    //       </motion.h1>
    //     </div>

    //     {/* Description */}
    //     <motion.p
    //       initial={{ opacity: 0 }}
    //       animate={{ opacity: 1 }}
    //       transition={{ duration: 0.7, delay: 0.2 }}
    //       className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto mb-12 leading-relaxed"
    //     >
    //       Discover thoughtful stories, insightful articles, and a clean reading experience—crafted for creators and thinkers.
    //     </motion.p>

    //   </div>
    // </section>

  );
}
