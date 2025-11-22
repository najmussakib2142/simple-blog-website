import Link from "next/link";
import { Twitter, Youtube, Linkedin, Feather, Send } from "lucide-react"; // Import Lucide icons

export default function Footer() {
    // Current year for the copyright notice
    const currentYear = new Date().getFullYear();

    // Define social links data using Lucide icons
    const socialLinks = [
        { icon: Twitter, href: "#", label: "Twitter" },
        { icon: Youtube, href: "#", label: "YouTube" },
        { icon: Linkedin, href: "#", label: "LinkedIn" },
    ];

    return (
        <footer className="w-full bg-cover bg-center
          bg-[url('https://i.ibb.co.com/sJ3fr1kL/15207024-8.jpg')] text-gray-900 border-t border-gray-200">
            {/* 1. TOP SECTION: Prominent CTA / Newsletter Sign-up */}
            <div className=" text-white bg-indigo-700 py-12">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="text-center md:text-left">
                        <h3 className="text-3xl font-bold mb-2 leading-snug">
                            Never Miss an Article.
                        </h3>
                        <p className="text-indigo-200 text-lg">
                            Get the best of SimpleBlog delivered straight to your inbox.
                        </p>
                    </div>

                    {/* Placeholder for Newsletter Form */}
                    <div className="w-full max-w-sm">
                        <form className="flex gap-2">
                            <input
                                type="email"
                                placeholder="Your email address"
                                className="w-full bg-white/90 p-3 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-300"
                                required
                            />
                            <button
                                type="submit"
                                className="p-3 bg-indigo-500 rounded-xl hover:bg-indigo-400 transition"
                                aria-label="Subscribe"
                            >
                                <Send className="w-6 h-6" />
                            </button>
                        </form>
                    </div>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-4 md:pb-8">

                {/* 2. MAIN GRID: Brand Info & Links */}
                <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-12 md:gap-y-12 ">

                    {/* Column 1: Brand Info */}
                    <div className="col-span-2 lg:col-span-4 pr-8">
                        <Link href="/" className="inline-flex items-center text-3xl font-extrabold tracking-tight text-indigo-700 mb-4">
                            <Feather className="w-7 h-7 mr-2" />
                            SimpleBlog
                        </Link>
                        <p className="text-base text-gray-600 leading-relaxed max-w-sm">
                            A simple platform for sharing ideas and stories. Built with Next.js and Tailwind CSS.
                        </p>
                    </div>

                    {/* Column 2: Explore Links */}
                    <div className="col-span-1 md:col-span-1 lg:col-span-2">
                        <h4 className="font-bold text-gray-900 mb-4 uppercase text-sm tracking-wider">Explore</h4>
                        <ul className="space-y-3 text-base">
                            <li><Link href="/blogs" className="text-gray-600 hover:text-indigo-700 transition-colors">All Blogs</Link></li>
                            <li><Link href="create" className="text-gray-600 hover:text-indigo-700 transition-colors">Start Writing</Link></li>
                            <li><Link href="/about" className="text-gray-600 hover:text-indigo-700 transition-colors">About Us</Link></li>
                        </ul>
                    </div>

                    {/* Column 3: Legal & Resources */}
                    <div className="col-span-1 md:col-span-1 lg:col-span-2">
                        <h4 className="font-bold text-gray-900 mb-4 uppercase text-sm tracking-wider">Resources</h4>
                        <ul className="space-y-3 text-base">
                            <li><a href="#" className="text-gray-600 hover:text-indigo-700 transition-colors">Contact Support</a></li>
                            <li><a href="#" className="text-gray-600 hover:text-indigo-700 transition-colors">Privacy Policy</a></li>
                            <li><a href="#" className="text-gray-600 hover:text-indigo-700 transition-colors">Terms of Service</a></li>
                        </ul>
                    </div>

                    {/* Column 4: Social Media (Modern Icon Style) */}
                    <div className="col-span-2 md:col-span-2 lg:col-span-4">
                        <h4 className="font-bold text-gray-900 mb-4 uppercase text-sm tracking-wider">Connect</h4>
                        <div className="flex items-center gap-4">
                            {socialLinks.map((link) => (
                                <a
                                    key={link.label}
                                    href={link.href}
                                    className="p-3 rounded-full bg-white border border-gray-200 text-gray-600 hover:bg-indigo-700 hover:text-white transition shadow-sm"
                                    aria-label={`Follow on ${link.label}`}
                                >
                                    <link.icon className="w-5 h-5" />
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                {/* 3. COPYRIGHT: Simple and Clean */}
                <div className="md:pt-8 md:mt-8 pt-6 mt-6 border-t border-gray-200 flex flex-col sm:flex-row justify-between items-center">
                    <p className="text-sm text-gray-500 order-2 sm:order-1 mt-4 sm:mt-0">
                        &copy; {currentYear} SimpleBlog. All rights reserved.
                    </p>
                    <div className="text-sm text-gray-500 space-x-4 order-1 sm:order-2">
                        {/* Optional: Quick links at the bottom */}
                    </div>
                </div>
            </div>
        </footer>
    );
}