import Link from "next/link";
import { Twitter, Youtube, Linkedin, Feather } from "lucide-react"; 

export default function Footer() {
    const currentYear = new Date().getFullYear();

    const socialLinks = [
        { icon: Twitter, href: "#", label: "Twitter" },
        { icon: Youtube, href: "#", label: "YouTube" },
        { icon: Linkedin, href: "#", label: "LinkedIn" },
    ];

    return (
        // 1. Cleaner Background: bg-white with a subtle top border
        <footer className="w-full bg-white/90 text-gray-900 border-t-2 border-indigo-100">
            <div className="max-w-6xl mx-auto px-6 md:px-8 pt-12 pb-4 md:pb-8">

                {/* 2. MAIN GRID: Brand Info & Links */}
                <div className="grid grid-cols-2 gap-8 md:grid-cols-4 pt-6 lg:grid-cols-12 md:gap-y-12">

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

                    {/* Link Columns (Space-x-2 added for subtle hover separation) */}
                    {/* Explore Links */}
                    <div className="col-span-1 md:col-span-1 lg:col-span-2">
                        <h4 className="font-bold text-gray-900 mb-4 uppercase text-sm tracking-wider">Explore</h4>
                        <ul className="space-y-3 text-base">
                            <li><Link href="/blogs" className="text-gray-600 hover:text-indigo-700 transition-colors">All Blogs</Link></li>
                            <li><Link href="create" className="text-gray-600 hover:text-indigo-700 transition-colors">Start Writing</Link></li>
                            <li><Link href="/about" className="text-gray-600 hover:text-indigo-700 transition-colors">About Us</Link></li>
                        </ul>
                    </div>

                    {/* Legal & Resources */}
                    <div className="col-span-1 md:col-span-1 lg:col-span-2">
                        <h4 className="font-bold text-gray-900 mb-4 uppercase text-sm tracking-wider">Resources</h4>
                        <ul className="space-y-3 text-base">
                            <li><a href="#" className="text-gray-600 hover:text-indigo-700 transition-colors">Contact Support</a></li>
                            <li><a href="#" className="text-gray-600 hover:text-indigo-700 transition-colors">Privacy Policy</a></li>
                            <li><a href="#" className="text-gray-600 hover:text-indigo-700 transition-colors">Terms of Service</a></li>
                        </ul>
                    </div>

                    {/* Social Media (Modern Icon Style) */}
                    <div className="col-span-2 md:col-span-2 lg:col-span-4">
                        <h4 className="font-bold text-gray-900 mb-4 uppercase text-sm tracking-wider">Connect</h4>
                        <div className="flex items-center gap-3"> {/* Tightened gap */}
                            {socialLinks.map((link) => (
                                <a
                                    key={link.label}
                                    href={link.href}
                                    // 3. New Modern Icon Style: text-gray-400 to text-indigo-700 on hover, no background/border
                                    className="text-gray-400 hover:text-indigo-700 transition"
                                    aria-label={`Follow on ${link.label}`}
                                >
                                    <link.icon className="w-6 h-6" /> {/* Slightly larger icons */}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                {/* COPYRIGHT: Simple and Clean */}
                <div className="md:pt-8 md:mt-8 pt-6 mt-6 border-t border-gray-200 flex flex-col sm:flex-row justify-between items-center">
                    <p className="text-sm text-gray-500 order-2 sm:order-1 mt-4 sm:mt-0">
                        &copy; {currentYear} SimpleBlog. All rights reserved.
                    </p>
                    {/* Removed placeholder bottom links */}
                </div>
            </div>
        </footer>
    );
}