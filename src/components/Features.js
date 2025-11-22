"use client"; // Added this line to enable Framer Motion animation

import { PencilLine, BookOpen, Lock, Smartphone, ArrowRight } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion"; // Import motion

// Define the Features array outside the component for cleaner code
const features = [
    {
        title: "Intuitive Editor",
        description: "Write and publish your content easily with our user-friendly, distraction-free Markdown editor.",
        icon: PencilLine,
        link: "/blogs/create",
    },
    {
        title: "Vast Library",
        description: "Explore a curated collection of articles from various authors and gain new perspectives and insights.",
        icon: BookOpen,
        link: "/blogs",
    },
    {
        title: "Secure Access",
        description: "Robust, secure authentication ensures your account and content are protected at all times.",
        icon: Lock,
        link: "#auth", // Placeholder link
    },
    {
        title: "Any Device, Anywhere",
        description: "A fully responsive, mobile-first design means you can read and write seamlessly on any device.",
        icon: Smartphone,
        link: "#responsive", // Placeholder link
    },
];

// Define container and item variants for staggered animation
const containerVariants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15, // Delay between each child animation
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function Features() {
    return (
        <section className="py-20 md:py-28 bg-white"> 
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* Section Header - Consistent Modern Styling */}
                <div className="text-center mb-16">
                    <p className="text-base font-semibold text-indigo-700 uppercase tracking-widest mb-3">
                        Core Value
                    </p>
                    <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-snug">
                        Built for Writers & Readers
                    </h2>
                </div>
                
                {/* Features Grid - Framer Motion Container */}
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8" // Increased gap for more breathing room
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.4 }} // Animation plays once when 40% of component is visible
                >
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            variants={itemVariants} // Apply the item animation
                            // Make the card clickable and link to the feature's purpose
                            className="bg-gray-50 p-8 rounded-2xl shadow-xl transition-all duration-300 hover:shadow-2xl hover:bg-white border-b-4 border-transparent hover:border-indigo-600 cursor-pointer"
                        >
                            {/* Icon Container - Clean, modern circle/square design */}
                            <div className="flex items-center justify-center w-14 h-14 mb-5 rounded-full bg-indigo-100/70">
                                {/* Icon color is the accent color */}
                                <feature.icon className="w-7 h-7 text-indigo-600" />
                            </div>
                            
                            <h3 className="text-xl font-bold text-gray-900 mb-3">
                                {feature.title}
                            </h3>
                            
                            <p className="text-gray-600 text-base">
                                {feature.description}
                            </p>
                            
                            {/* Hidden link for better accessibility (optional) */}
                            <Link href={feature.link} className="sr-only">
                                Learn more about {feature.title}
                            </Link>
                        </motion.div>
                    ))}
                </motion.div>
                
                {/* Optional CTA/Footer - Consistent Link Styling */}
                <div className="text-center mt-20 pt-10 border-t border-gray-200">
                    <p className="text-xl text-gray-700 mb-4">
                        Ready to join our community?
                    </p>
                    <Link 
                        href="#" 
                        className="inline-flex items-center text-lg font-semibold text-indigo-700 hover:text-indigo-900 transition underline-offset-5 hover:underline"
                    >
                        Create your free account today 
                        <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                </div>

            </div>
        </section>
    );
}