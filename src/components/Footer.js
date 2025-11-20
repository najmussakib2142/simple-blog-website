import Link from "next/link";

export default function Footer() {
    // Current year for the copyright notice
    const currentYear = new Date().getFullYear();

    return (
        <footer className="w-full bg-white text-gray-900 border-t border-gray-200">
            <div className="max-w-6xl mx-auto px-7 md:px-6 lg:px-8 pt-12 pb-4 md:pb-8">
                {/* Main Content Grid */}
                <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-12 md:gap-y-12">
                    {/* Column 1: Brand Info */}
                    <div className="col-span-2 lg:col-span-4 pr-8">
                        <Link href="/" className="text-xl font-extrabold tracking-tight text-indigo-600 mb-4 inline-block">
                            SimpleBlog
                        </Link>
                        <p className="text-sm text-gray-600 leading-relaxed max-w-sm">
                            A simple platform for sharing ideas and stories. Built with Next.js and Tailwind CSS.
                        </p>
                    </div>

                    {/* Column 2: Explore Links */}
                    <div className="col-span-1 md:col-span-1 lg:col-span-2">
                        <h4 className="font-semibold text-gray-900 mb-4">Explore</h4>
                        <ul className="space-y-3 text-sm">
                            <li><Link href="/blogs" className="text-gray-600 hover:text-indigo-600 transition-colors">All Blogs</Link></li>
                            <li><Link href="/blogs/create" className="text-gray-600 hover:text-indigo-600 transition-colors">Create</Link></li>
                            <li><Link href="/about" className="text-gray-600 hover:text-indigo-600 transition-colors">About</Link></li>
                        </ul>
                    </div>

                    {/* Column 3: Company Links */}
                    <div className="col-span-1 md:col-span-1 lg:col-span-2">
                        <h4 className="font-semibold text-gray-900 mb-4">Company</h4>
                        <ul className="space-y-3 text-sm">
                            <li><a href="#" className="text-gray-600 hover:text-indigo-600 transition-colors">Contact Us</a></li>
                            <li><a href="#" className="text-gray-600 hover:text-indigo-600 transition-colors">Privacy Policy</a></li>
                            <li><a href="#" className="text-gray-600 hover:text-indigo-600 transition-colors">Terms of Service</a></li>
                        </ul>
                    </div>
                    
                    {/* Column 4: Social Media */}
                    <div className="col-span-2 md:col-span-4 lg:col-span-4 mt-2 md:mt-0">
                        <h4 className="font-semibold text-gray-900 mb-4">Connect</h4>
                        <div className="flex items-center gap-4">
                            {/* Twitter/X */}
                            <a href="#" className="text-gray-600 hover:text-indigo-600 transition-colors" aria-label="Twitter">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" className="fill-current"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path></svg>
                            </a>
                            {/* YouTube */}
                            <a href="#" className="text-gray-600 hover:text-indigo-600 transition-colors" aria-label="YouTube">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" className="fill-current"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path></svg>
                            </a>
                            {/* LinkedIn */}
                            <a href="#" className="text-gray-600 hover:text-indigo-600 transition-colors" aria-label="LinkedIn">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" className="fill-current"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path></svg>
                            </a>
                        </div>
                    </div>
                </div>

                {/* Separator and Copyright */}
                <div className="md:pt-8 md:mt-8 pt-6 mt-6 border-t border-gray-100 flex flex-col sm:flex-row justify-between items-center">
                    <p className="text-sm text-gray-500 order-2 sm:order-1 mt-4 sm:mt-0">
                        &copy; {currentYear} SimpleBlog. All rights reserved.
                    </p>
                    <div className="text-sm text-gray-500 space-x-4 order-1 sm:order-2">
                        {/* Optional: Add quick policy links here */}
                        {/* <a href="#" className="hover:text-indigo-600 transition-colors">Cookie Settings</a> */}
                    </div>
                </div>
            </div>
        </footer>
    );
}