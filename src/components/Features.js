import { PencilLine, BookOpen, Lock, Smartphone } from "lucide-react"; // Import professional icons
import Link from "next/link";

// Define the Features array outside the component for cleaner code
const features = [
    {
        title: "Intuitive Editor",
        description: "Write and publish your content easily with our user-friendly, distraction-free Markdown editor.",
        icon: PencilLine, // Use the imported Lucide component
    },
    {
        title: "Vast Library",
        description: "Explore a curated collection of articles from various authors and gain new perspectives and insights.",
        icon: BookOpen,
    },
    {
        title: "Secure Access",
        description: "Robust, secure authentication ensures your account and content are protected at all times.",
        icon: Lock,
    },
    {
        title: "Any Device, Anywhere",
        description: "A fully responsive, mobile-first design means you can read and write seamlessly on any device.",
        icon: Smartphone,
    },
];

export default function Features() {
    return (
        <section className="py-20 bg-gray-50">
            <div className="max-w-6xl mx-auto px-6">
                
                {/* Section Header */}
                <div className="text-center mb-16">
                    <p className="text-sm font-semibold text-indigo-600 uppercase tracking-wider mb-2">Features</p>
                    <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900">Why Choose SimpleBlog?</h2>
                </div>
                
                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm transition-all duration-300 hover:shadow-md hover:border-indigo-300 group"
                        >
                            {/* Icon Container */}
                            <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-lg bg-indigo-100 group-hover:bg-indigo-600 transition duration-300">
                                <feature.icon className="w-6 h-6 text-indigo-600 group-hover:text-white transition duration-300" />
                            </div>
                            
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                {feature.title}
                            </h3>
                            
                            <p className="text-gray-600 text-sm">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
                
                {/* Optional CTA/Footer */}
                <div className="text-center mt-16 pt-8 border-t border-gray-100">
                    <p className="text-gray-500">Ready to start your blogging journey?</p>
                    <Link href="/blogs/create" className="text-indigo-600 font-medium hover:text-indigo-700 transition">
                        Start writing in seconds →
                    </Link>
                </div>

            </div>
        </section>
    );
}