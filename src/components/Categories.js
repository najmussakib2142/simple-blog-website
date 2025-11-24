import { Zap, Code, Layout, TrendingUp } from "lucide-react";

// Dummy data for the categories
const categories = [
    { name: "Web Development", icon: Code, href: "/category/web-dev", color: "text-blue-500" },
    { name: "Productivity Tips", icon: Zap, href: "/category/productivity", color: "text-amber-500" },
    { name: "Design & UX", icon: Layout, href: "/category/design", color: "text-green-500" },
    { name: "Business & Growth", icon: TrendingUp, href: "/category/business", color: "text-red-500" },
];

export default function Categories() {
    return (
        <section className="py-16 bg-gray-50">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                
                {/* Section Header */}
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                    Explore Content By Topic
                </h2>
                <p className="text-lg text-gray-600 mb-10">
                    Find exactly what you&apos;re looking for across our core knowledge areas.
                </p>

                {/* Categories Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {categories.map((category) => (
                        <a
                            key={category.name}
                            href={category.href}
                            // Styled as a card with hover effect
                            className="flex flex-col items-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition duration-300 transform hover:-translate-y-1 border border-gray-100"
                        >
                            <div className={`p-3 rounded-full bg-opacity-10 ${category.color} bg-current mb-4`}>
                                {/* Dynamically rendering the Lucide icon */}
                                <category.icon className="w-8 h-8" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900">
                                {category.name}
                            </h3>
                            <p className="text-sm text-gray-500 mt-1">
                                View all posts in this category
                            </p>
                        </a>
                    ))}
                </div>
            </div>
        </section>
    );
}