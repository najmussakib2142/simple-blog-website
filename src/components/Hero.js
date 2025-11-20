"use client";

import Link from "next/link";
import { ArrowRight, Feather } from "lucide-react";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative py-24 md:py-32 bg-gray-50 overflow-hidden">
      {/* Background gradient with blur for depth */}
      <div className="absolute inset-0 bg-linear-to-tr from-indigo-50/50 to-white/50 blur-3xl opacity-50 pointer-events-none"></div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge / Label */}
        <motion.p 
          initial={{ opacity: 0, y: -10 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.5 }}
          className="inline-flex items-center text-sm font-semibold text-indigo-700 bg-indigo-100 rounded-full px-4 py-1 mb-4 uppercase tracking-widest shadow-md"
        >
          <Feather className="w-4 h-4 mr-2" />
          SimpleBlog
        </motion.p>

        {/* Hero Heading */}
        <motion.h1 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.7 }}
          className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-gray-900 leading-tight mb-4"
        >
          <span className="block text-transparent bg-clip-text bg-linear-to-r from-indigo-600 to-purple-600">
            Write. Read. Share.
          </span>
        </motion.h1>

        {/* Description */}
        <motion.p 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-xl text-gray-600 max-w-3xl mx-auto mb-10"
        >
          A minimal blogging platform focused on writing and reading — <strong>simple, fast, and content-first</strong>. Your words, amplified.
        </motion.p>

        {/* Action Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex flex-col sm:flex-row justify-center gap-4"
        >
          <Link 
            href="/blogs" 
            className="inline-flex  items-center justify-center px-8 py-3 bg-indigo-600 text-white text-lg font-medium rounded-xl shadow-lg hover:bg-indigo-700 transition transform hover:scale-[1.03] active:scale-[0.97] focus:outline-none focus:ring-4 focus:ring-indigo-500 focus:ring-opacity-50"
          >
            Explore Articles
            <ArrowRight className="w-5 h-5 ml-2" />
          </Link>

          <Link 
            href="/blogs/create" 
            className="inline-flex items-center justify-center px-8 py-3 text-lg font-medium text-gray-700 border border-gray-300 bg-white rounded-xl shadow-md hover:bg-gray-100 transition transform hover:-translate-y-0.5"
          >
            Start Writing
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
