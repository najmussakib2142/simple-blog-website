import Link from "next/link";

export default function AboutPage() {
    return (
        <div className="bg-[#F2F3E8]/60 min-h-screen flex flex-col items-center justify-center overflow-hidden">
            {/* Hero Section */}
            <section className="py-20 sm:py-28 md:py-32 px-6 md:px-8 max-w-6xl mx-auto text-center">
                <div className="space-y-6">
                    <p className="text-black font-semibold uppercase text-sm tracking-wider">
                        About SimpleBlog
                    </p>
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight">
                        Share your ideas with the world
                    </h1>
                    <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
                        SimpleBlog is a modern, clean blogging platform built with Next.js,
                        Tailwind CSS, and MongoDB. Write, publish, and share your thoughts
                        effortlessly.
                    </p>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-16 bg-white sm:py-20 px-7 md:px-14  w-full">
                <div className="max-w-6xl mx-auto grid md:grid-cols-2 md:place-items-center gap-12 md:gap-20 items-start">
                    {/* Why SimpleBlog */}
                    <div>
                        <p className="text-black font-semibold uppercase text-sm tracking-wider mb-4">
                            Why SimpleBlog?
                        </p>
                        <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-6">
                            Designed for writers
                        </h2>
                        <ul className="space-y-4">
                            {[
                                {
                                    title: "Clean Interface",
                                    desc: "Intuitive design focused on your content",
                                    icon: "✓",
                                },
                                {
                                    title: "Lightning Fast",
                                    desc: "Built on Next.js for optimal performance",
                                    icon: "✓",
                                },
                                {
                                    title: "Easy to Deploy",
                                    desc: "Deploy anywhere in minutes",
                                    icon: "✓",
                                },
                            ].map((item, i) => (
                                <li key={i} className="flex gap-3">
                                    <span className="text-black font-bold text-lg shrink-0">
                                        {item.icon}
                                    </span>
                                    <div>
                                        <p className="font-semibold text-gray-900">{item.title}</p>
                                        <p className="text-gray-600 text-sm">{item.desc}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Tech Stack */}
                    <div>
                        <p className="text-black font-semibold uppercase text-sm tracking-wider mb-4">
                            Tech Stack
                        </p>
                        <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-6">
                            Built for the modern web
                        </h2>
                        <ul className="space-y-4">
                            {[
                                {
                                    title: "Next.js 16",
                                    desc: "Server and client components for blazing-fast performance and SEO",
                                    icon: "⚡",
                                },
                                {
                                    title: "Tailwind CSS",
                                    desc: "Beautiful, responsive design that looks great on all devices",
                                    icon: "🎨",
                                },
                                {
                                    title: "MongoDB",
                                    desc: "Flexible database that grows with your content needs",
                                    icon: "📊",
                                },
                            ].map((item, i) => (
                                <li key={i} className="flex gap-3">
                                    <span className="text-black font-bold text-lg shrink-0">
                                        {item.icon}
                                    </span>
                                    <div>
                                        <p className="font-semibold text-gray-900">{item.title}</p>
                                        <p className="text-gray-600 text-sm">{item.desc}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 bg-[#F2F3E8]/60 sm:py-20 px-6 md:px-8 max-w-6xl mx-auto text-center">
                <div className="space-y-8">
                    <div>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
                            Ready to start?
                        </h2>
                        <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
                            Join our community of writers and start sharing your stories today.
                        </p>
                    </div>
                    <div className="flex flex-wrap gap-4 justify-center">
                        <Link
                            href="/blogs"
                            className="inline-flex items-center px-6 sm:px-8 py-3 bg-black/90 text-white font-medium rounded-lg hover:bg-black transition-colors shadow-md"
                        >
                            Explore Blogs
                        </Link>
                        <Link
                            href="/blogs/create"
                            className="inline-flex items-center px-6 sm:px-8 py-3 border border-gray-300 text-gray-900 font-medium rounded-lg hover:bg-gray-50 transition-colors"
                        >
                            Write Your First Post
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
