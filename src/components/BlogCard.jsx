"use client";

// components/BlogCard.jsx (No significant changes needed, but keeping it here for context)
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CalendarDays, Clock, SquareUserRound } from "lucide-react";
import { motion } from "framer-motion";
import { useAuth } from "@/context/AuthContext";


export default function BlogCard({ blog }) {
    const postLink = `/blogs/${blog._id}`;
    const words = blog.title.split(" ");
    const mid = Math.ceil(words.length / 2);
    const line1 = words.slice(0, mid).join(" ");
    const line2 = words.slice(mid).join(" ");

    const formattedDate = new Date(blog.createdAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });

    return (
        <Link href={postLink} className="group block h-full">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="bg-white  shadow-lg border border-gray-100  hover:border-indigo-100 transition-all duration-300 overflow-hidden h-full flex flex-col">

                {blog.imageUrl && (

                    <div
                        className="relative aspect-[16/10] w-full">
                        <Image
                            src={blog.imageUrl}
                            alt={blog.title}
                            fill
                            sizes="(max-width: 768px) 100vw, 33vw"
                            className="object-cover transition-transform duration-500 group-hover:scale-[1.05]"
                        />
                    </div>
                )}

                <div className="px-6 py-6 flex flex-col justify-between grow">
                    <div className="flex justify-between items-center mb-2">
                        <p className="text-sm  inline-flex  font-medium text-gray-500">
                            <CalendarDays className="w-4 h-4 mr-2" />{formattedDate}
                        </p>
                        <p className="text-sm  inline-flex  font-medium text-gray-500">
                            <Clock className="w-4 h-4 mr-2" /> {blog.readingTime || "02 min read"}
                        </p>
                    </div>
                    <div>

                        {/* <h3 className="text-xl font-bold mb-2 text-gray-900">
                            <span className="relative inline-block">
                                {line1}
                                <span className="absolute left-0 -bottom-1 h-0.5 w-full bg-gray-900  scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300 delay-0"></span>
                            </span>
                            <br />
                            <span className="relative inline-block">
                                {line2}
                                <span className="absolute left-0 -bottom-1 h-0.5 w-full bg-gray-900   scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300 delay-200"></span>
                            </span>

                        </h3> */}

                        <h3 className="text-xl font-bold mb-2 text-gray-900 leading-snug line-clamp-2 relative">
                            <span className="relative">
                                {blog.title}
                                <span
                                    className="absolute left-0 -bottom-1 h-0.5 w-full bg-gray-900
                 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300"
                                />
                            </span>
                        </h3>


                        <p className="text-gray-600 text-base  mb-4">
                            {blog.description}
                        </p>
                    </div>

                    <div className="flex justify-between items-center pt-2">
                        {/* <p className="text-sm  inline-flex  font-medium text-gray-500">
                            <CalendarDays className="w-4 h-4 mr-2" />{formattedDate}
                        </p> */}

                    </div>
                    <div className="flex justify-between items-center">
                        <div className="flex justify-between items-center">
                            <div className="w-full md:w-10 h-10 relative shrink-0 rounded-lg overflow-hidden">
                                <Image
                                    src={blog.authorImage || 'https://i.ibb.co/Mkf1wBdJ/jack-finnigan-rri-AI0nhcbc-unsplash.jpg'}
                                    alt={blog.title}
                                    fill
                                    className="object-cover"
                                    sizes="160px"
                                />
                            </div>
                            <div className="flex flex-col ml-2">
                                <span className="text-sm text-gray-500">Written by</span>
                                <span className="text-sm text-gray-900">{blog.author || "Guest Contributor"}</span>
                            </div>
                        </div>
                        <div>
                            <div className="group inline-flex items-center mt-4 text-black/80 font-semibold relative w-fit">
                                Read More
                                <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
                                <span
                                    className="  absolute left-0 -bottom-0.5 h-0.5 w-full bg-black/80  scale-x-0 group-hover:scale-x-100   origin-left transition-transform duration-300 "
                                ></span>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </Link>
    );
}