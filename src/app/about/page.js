import Link from "next/link";

export default function AboutPage() {
    return (
        <div className="bg-white">
            {/* Hero Section */}
            <section className="py-32 px-6 md:px-8 max-w-6xl mx-auto text-center">
                <div className="space-y-6">
                    <p className="text-indigo-600 font-semibold uppercase text-sm tracking-wider">About SimpleBlog</p>
                    <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight">
                        Share your ideas with the world
                    </h1>
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
                        SimpleBlog is a modern, clean blogging platform built with Next.js, Tailwind CSS, and MongoDB. Write, publish, and share your thoughts effortlessly.
                    </p>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-20 px-6 md:px-8  bg-gray-50">
                <div className="max-w-6xl mx-auto">
                    <div className="flex items-center justify-between  gap-12">
                        <div className="flex-1">
                            <p className="text-indigo-600 font-semibold uppercase text-sm tracking-wider mb-4">Why SimpleBlog?</p>
                            <h2 className="text-3xl font-extrabold  text-gray-900 mb-6">Designed for writers</h2>
                            <ul className="space-y-4">
                                <li className="flex gap-3">
                                    <span className="text-indigo-600 font-bold text-lg shrink-0">✓</span>
                                    <div>
                                        <p className="font-semibold text-gray-900">Clean Interface</p>
                                        <p className="text-gray-600 text-sm">Intuitive design focused on your content</p>
                                    </div>
                                </li>
                                <li className="flex gap-3">
                                    <span className="text-indigo-600 font-bold text-lg shrink-0">✓</span>
                                    <div>
                                        <p className="font-semibold text-gray-900">Lightning Fast</p>
                                        <p className="text-gray-600 text-sm">Built on Next.js for optimal performance</p>
                                    </div>
                                </li>
                                <li className="flex gap-3">
                                    <span className="text-indigo-600 font-bold text-lg shrink-0">✓</span>
                                    <div>
                                        <p className="font-semibold text-gray-900">Easy to Deploy</p>
                                        <p className="text-gray-600 text-sm">Deploy anywhere in minutes</p>
                                    </div>
                                </li>
                            </ul>
                        </div>

                        <div className="flex-1">
                            <p className="text-indigo-600 font-semibold uppercase text-sm tracking-wider mb-4">Tech Stack</p>
                            <h2 className="text-3xl font-extrabold text-gray-900 mb-6">Built for the modern web</h2>
                            <ul className="space-y-4">
                                <li className="flex gap-3">
                                    <span className="text-indigo-600 font-bold text-lg shrink-0">⚡</span>
                                    <div>
                                        <p className="font-semibold text-gray-900">Next.js 16</p>
                                        <p className="text-gray-600 text-sm">Server and client components for blazing-fast performance and SEO</p>
                                    </div>
                                </li>
                                <li className="flex gap-3">
                                    <span className="text-indigo-600 font-bold text-lg shrink-0">🎨</span>
                                    <div>
                                        <p className="font-semibold text-gray-900">Tailwind CSS</p>
                                        <p className="text-gray-600 text-sm">Beautiful, responsive design that looks great on all devices</p>
                                    </div>
                                </li>
                                <li className="flex gap-3">
                                    <span className="text-indigo-600 font-bold text-lg shrink-0">📊</span>
                                    <div>
                                        <p className="font-semibold text-gray-900">MongoDB</p>
                                        <p className="text-gray-600 text-sm">Flexible database that grows with your content needs</p>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 px-6 md:px-8 max-w-6xl mx-auto text-center">
                <div className="space-y-8">
                    <div>
                        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">Ready to start?</h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Join our community of writers and start sharing your stories today.
                        </p>
                    </div>
                    <div className="flex flex-wrap gap-4 justify-center">
                        <Link href="/blogs" className="inline-flex items-center px-8 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors shadow-md">
                            Explore Blogs
                        </Link>
                        <Link href="/blogs/create" className="inline-flex items-center px-8 py-3 border border-gray-300 text-gray-900 font-medium rounded-lg hover:bg-gray-50 transition-colors">
                            Write Your First Post
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
