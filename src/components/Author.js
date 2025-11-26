"use client";

import Image from "next/image";
import Link from "next/link";
import { Twitter, Github, Globe, Linkedin } from "lucide-react";
import { useState, useEffect } from "react";
import { motion } from "framer-motion"; // Import motion for content reveal

// Social links data
const socialLinks = [
  { icon: Linkedin, href: "https://www.linkedin.com/in/sm-najmus-sakib/", label: "LinkedIn" },
  { icon: Github, href: "https://github.com/najmussakib2142", label: "GitHub" },
  { icon: Globe, href: "https://my-portfolio-sm-sakib.vercel.app/", label: "Website" },
];

// Final data structure (moved to the bottom for cleaner useEffect)
const finalAuthorData = {
  name: "Najmus Sakib",
  bio1: "Hey! I’m a curious developer who builds projects like SimpleBlog while drinking too much coffee and Googling error messages.",
  bio2: "I enjoy turning ideas into web apps with Next.js and Tailwind—sometimes on the first try, sometimes after 27 attempts. Thanks for visiting!",
  imageUrl:
    "https://i.ibb.co/ZpZPQYSy/069d1959-fdae-47ad-850f-ae8cbe77281c-1-all-3365.jpg",
};

const AuthorSkeleton = () => (
  <div className="bg-gray-50 p-8 md:p-12 rounded-xl shadow-xl flex flex-col md:flex-row items-center gap-8 animate-pulse">

    {/* Skeleton Image Placeholder */}
    <div className="shrink-0 w-full md:w-1/3">
      <div className="bg-gray-200 rounded-lg w-full aspect-square border border-gray-300"></div>
    </div>

    {/* Skeleton Content Placeholder */}
    <div className="grow md:pl-8 w-full">
      {/* Badge */}
      <div className="h-4 bg-gray-200 rounded-full w-20 mb-4"></div>

      {/* Name */}
      <div className="h-10 bg-gray-300 rounded-lg w-2/3 mb-6"></div>

      {/* Bio Line 1 */}
      <div className="h-5 bg-gray-200 rounded-md w-full mb-3"></div>

      {/* Bio Line 2 */}
      <div className="h-5 bg-gray-200 rounded-md w-11/12 mb-6"></div>

      {/* Social Links Placeholder */}
      <div className="flex gap-3 pt-2">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="w-10 h-10 bg-gray-200 rounded-lg"></div>
        ))}
      </div>
    </div>
  </div>
);

const AuthorContent = ({ data }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="bg-white p-8 md:p-12 rounded-2xl shadow-xl flex flex-col md:flex-row items-center gap-8 border border-indigo-50/50" // Enhanced styling
  >
    {/* Image */}
    <div className="shrink-0 w-full md:w-1/3 max-w-xs md:max-w-none">
      <Image
        src={data.imageUrl}
        alt={`${data.name} profile`}
        className="rounded-xl shadow-lg border-4 border-indigo-50 object-cover w-full aspect-square transition-transform duration-500 hover:scale-[1.02]" // Enhanced border/shadow
        width={300}
        height={300}
        priority
      />
    </div>

    {/* Content */}
    <div className="grow md:pl-8">
      <p className="text-base font-semibold text-indigo-700 uppercase tracking-widest mb-2">
        Creator
      </p>
      <h2 className="text-4xl md:text-5xl text-gray-900 font-extrabold mb-4 leading-snug">
        {data.name}
      </h2>
      <p className="text-lg text-gray-700 leading-relaxed mb-4">
        {data.bio1}
      </p>
      <p className="text-lg text-gray-700 leading-relaxed mb-6">
        {data.bio2}
      </p>

      {/* Social Links - Consistent Modern Styling */}
      <div className="flex gap-4 pt-2">
        {socialLinks.map((link) => (
          <Link
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Follow on ${link.label}`}
            className="p-3 rounded-full bg-indigo-100 hover:bg-indigo-700 text-indigo-600 hover:text-white transition shadow-md"
          >
            <link.icon className="w-6 h-6" />
          </Link>
        ))}
      </div>
    </div>
  </motion.div>
);


export default function Author() {
  const [author, setAuthor] = useState(null);
  const [loading, setLoading] = useState(true);

  // Simulate fetching dynamic data
  useEffect(() => {
    const timer = setTimeout(() => {
      setAuthor(finalAuthorData);
      setLoading(false); // Set loading to false after data is loaded
    }, 1500); // simulate 1.5s API delay

    return () => clearTimeout(timer);
  }, []);

  // 💀 SKELETON LOADER COMPONENT


  // 📝 ACTUAL CONTENT RENDER


  return (
    <section className="py-20 md:py-28 bg-[#F2F3E8]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-base font-semibold text-indigo-700 uppercase tracking-widest mb-3">
            About the Author
          </p>
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-snug">
            Meet the Creator
          </h2>
        </div>

        {/* Conditional Render: Skeleton or Content */}
        {loading ? (
          <AuthorSkeleton />
        ) : (
          <AuthorContent data={author} />
        )}
      </div>
    </section>
  );
}