"use client";

import Image from "next/image";
import Link from "next/link";
import { Twitter, Github, Globe } from "lucide-react";
import { useState, useEffect } from "react";

// Social links data
const socialLinks = [
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Github, href: "#", label: "GitHub" },
  { icon: Globe, href: "#", label: "Website" },
];

// Placeholder data (used while "loading")
const placeholderAuthor = {
  name: "Loading…",
  bio1: "Please wait while author info loads.",
  bio2: "Fetching details from the server…",
  imageUrl: "https://i.ibb.co/C3VQkxxy/harry-pappas-xyaui-SBWRFs-unsplash.jpg",
};

export default function Author() {
  const [author, setAuthor] = useState(null);

  // Simulate fetching dynamic data
  useEffect(() => {
    const timer = setTimeout(() => {
      setAuthor({
        name: "John Doe",
        bio1:
          "Hi! I’m the creator of SimpleBlog — a beginner-friendly platform built with Next.js, Tailwind CSS, and MongoDB.",
        bio2:
          "I love building modern web apps and teaching others through open-source projects. Thanks for stopping by!",
        imageUrl:
          "https://i.ibb.co/C3VQkxxy/harry-pappas-xyaui-SBWRFs-unsplash.jpg",
      });
    }, 1500); // simulate 1.5s API delay

    return () => clearTimeout(timer);
  }, []);

  const data = author || placeholderAuthor;

  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-sm font-semibold text-indigo-600 uppercase tracking-wider mb-2">About</p>
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-8">Meet the Creator</h2>
        </div>

        <div className="bg-gray-50 p-8 md:p-12 rounded-xl shadow-sm flex flex-col md:flex-row items-center gap-8">
          
          {/* Image */}
          <div className="shrink-0 w-full md:w-1/3">
            <Image
              src={data.imageUrl}
              alt={`${data.name} profile`}
              className="rounded-lg shadow-md border border-gray-200 object-cover w-full aspect-square"
              width={300}
              height={300}
              priority
            />
          </div>

          {/* Content */}
          <div className="grow md:pl-8">
            <p className="text-sm font-semibold text-indigo-600 uppercase tracking-wider mb-2">About</p>
            <h2 className="text-4xl md:text-5xl text-gray-900 font-extrabold mb-4">
              {data.name}
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              {data.bio1}
            </p>
            <p className="text-gray-600 leading-relaxed mb-6">
              {data.bio2}
            </p>

            {/* Social Links */}
            <div className="flex gap-3 pt-2">
              {socialLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Follow on ${link.label}`}
                  className="p-2 rounded-lg bg-indigo-100 hover:bg-indigo-600 text-indigo-600 hover:text-white transition"
                >
                  <link.icon className="w-5 h-5" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
