import Link from "next/link";

export default function Footer() {
    return (
        <footer className="w-full bg-white text-gray-900 border-t border-gray-200">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-1 md:grid-cols-3 gap-12">
                <div>
                    <h3 className="text-lg font-extrabold text-gray-900 mb-4">SimpleBlog</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">A simple blog platform for sharing ideas and stories. Built with Next.js and MongoDB.</p>
                </div>

                <div className="flex gap-8 justify-between md:justify-center">
                    <div>
                        <h4 className="font-semibold text-gray-900 mb-4">Explore</h4>
                        <ul className="space-y-2 text-sm">
                            <li><Link href="/blogs" className="text-gray-600 hover:text-indigo-600 transition-colors">All Blogs</Link></li>
                            <li><Link href="/blogs/create" className="text-gray-600 hover:text-indigo-600 transition-colors">Create</Link></li>
                            <li><Link href="/about" className="text-gray-600 hover:text-indigo-600 transition-colors">About</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold text-gray-900 mb-4">Company</h4>
                        <ul className="space-y-2 text-sm">
                            <li><a href="#" className="text-gray-600 hover:text-indigo-600 transition-colors">Contact</a></li>
                            <li><a href="#" className="text-gray-600 hover:text-indigo-600 transition-colors">Privacy</a></li>
                        </ul>
                    </div>
                </div>

                <div className="text-right md:text-left">
                    <h4 className="font-semibold text-gray-900 mb-4">Follow</h4>
                    <div className="flex items-center justify-end md:justify-start gap-4">
                        <a href="#" className="text-gray-600 hover:text-indigo-600 transition-colors" aria-label="Twitter">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" className="fill-current"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path></svg>
                        </a>
                        <a href="#" className="text-gray-600 hover:text-indigo-600 transition-colors" aria-label="YouTube">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" className="fill-current"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path></svg>
                        </a>
                        <a href="#" className="text-gray-600 hover:text-indigo-600 transition-colors" aria-label="LinkedIn">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" className="fill-current"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path></svg>
                        </a>
                    </div>
                    <p className="text-sm text-gray-600 mt-4">© {new Date().getFullYear()} SimpleBlog. All rights reserved.</p>
                </div>
            </div>
        </footer>
    )
}