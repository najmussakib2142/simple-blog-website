import Link from "next/link";
import { Twitter, Youtube, Linkedin, Feather } from "lucide-react";
import CTA from "./CTA";

export default function Footer() {
    const currentYear = new Date().getFullYear();

    const socialLinks = [
        { icon: Twitter, href: "#", label: "Twitter" },
        { icon: Youtube, href: "#", label: "YouTube" },
        { icon: Linkedin, href: "#", label: "LinkedIn" },
    ];

    return (
        // 1. Cleaner Background: bg-white with a subtle top border
        <footer className="bg-cover border-t-2 border-[#F2F3E8] bg-center bg-no-repeat"
            style={{ backgroundImage: "url('/bg-6.jpg')" }} >
            <CTA />
            <div className="w-full bg-gray-100/90 pb-4 text-gray-900 border-t-2 border-[#F2F3E8]">
                <div className="max-w-6xl mx-auto px-6 md:px-8 pt-4 pb-4 md:pb-4">

                    {/* 2. MAIN GRID: Brand Info & Links */}
                    <div className=" pt-2 flex flex-col-reverse md:flex-row md:items-center justify-between ">

                        {/* Column 1: Brand Info */}
                        <div className="col-span-2 lg:col-span-4 pr-8">
                            {/* <Link href="/" className="inline-flex items-center text-3xl font-extrabold tracking-tight text-indigo-700 2">
                                <Feather className="w-7 h-7 mr-2" />
                                SimpleBlog
                            </Link> */}
                            <div className="flex items-center justify-center md:justify-start">
                                <p className="text-base text-center md:pb-1 md:text-start pt-1 text-gray-600 leading-relaxed max-w-sm">
                                    A simple platform for sharing ideas and stories.
                                </p>
                            </div>
                            <div className="border-t border-gray-200 flex flex-col  sm:flex-row justify-start items-center">
                                <p className="text-sm pt-1 text-gray-500 order-2 sm:order-1 mt-4 sm:mt-0">
                                    &copy; {currentYear} SimpleBlog. All rights reserved.
                                </p>
                                {/* Removed placeholder bottom links */}
                            </div>

                        </div>


                        <div className=" md:pr-63 flex  justify-center pb-1 md:pb-0 gap-8">
                            <div>
                                <Link href="/privacy-policy"
                                    className="text-gray-600 pb-0.5 group relative " >
                                    Privacy Policy
                                    <span
                                        className="  absolute left-0 -bottom-0.5 h-0.5 w-full bg-gray-600  scale-x-0 group-hover:scale-x-100   origin-left transition-transform duration-300 "
                                    ></span>
                                </Link>
                            </div>
                            <div>
                                <Link href="/terms-of-service"
                                    className="text-gray-600 pb-0.5 group relative " >
                                    Terms of Service
                                    <span
                                        className="  absolute left-0 -bottom-0.5 h-0.5 w-full bg-gray-600  scale-x-0 group-hover:scale-x-100   origin-left transition-transform duration-300 "
                                    ></span>
                                </Link>
                            </div>

                            {/* <a href="#" className="text-gray-600 ">Terms of Service</a> */}

                        </div>

                        {/* Social Media (Modern Icon Style) */}
                        <div className=" pr-2 flex flex-row md:flex-col justify-center md:justify-start pb-2 gap-6 md:gap-2 items-center  md:pb-0  ">
                            <h4 className="font-semibold text-gray-900   text-md tracking-wider">Connect</h4>
                            <div className="flex  items-center gap-3"> {/* Tightened gap */}
                                {socialLinks.map((link) => (
                                    <a
                                        key={link.label}
                                        href={link.href}
                                        // 3. New Modern Icon Style: text-gray-400 to text-indigo-700 on hover, no background/border
                                        className="text-gray-400 hover:text-black transition"
                                        aria-label={`Follow on ${link.label}`}
                                    >
                                        <link.icon className="w-4 h-4" /> {/* Slightly larger icons */}
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* COPYRIGHT: Simple and Clean */}
                    {/* <div className="pt-2 border-t border-gray-200 flex flex-col  sm:flex-row justify-center items-center">
                        <p className="text-sm  text-gray-500 order-2 sm:order-1  sm:mt-0">
                            &copy; {currentYear} SimpleBlog. All rights reserved.
                        </p>
                    </div> */}
                </div>
            </div>
        </footer>
    );
}