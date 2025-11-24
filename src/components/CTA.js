import { Send, Mail } from "lucide-react";

export default function CTA() {
    return (
        // Section with background image + subtle gradient overlay
        <section className="relative py-16 bg-cover bg-center" style={{ backgroundImage: "url('https://i.ibb.co.com/rGpDp72F/2147878447.webp')" }}>
            
            {/* Overlay gradient for better readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-black/60"></div>

            <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-8">
                
                {/* Text Content */}
                <div className="text-center md:text-left">
                    <h3 className="text-4xl text-white font-extrabold mb-3 leading-tight flex items-center justify-center md:justify-start gap-2">
                        <Mail className="w-8 h-8 text-amber-400" />
                        Get Our Best Content Delivered
                    </h3>
                    <p className="text-indigo-100 text-xl max-w-lg">
                        Sign up for the SimpleBlog newsletter. Receive a weekly digest of our latest articles, insights, and expert tips—straight to your inbox.
                    </p>
                </div>

                {/* Newsletter Form */}
                <div className="w-full max-w-sm">
                    <form className="flex gap-2">
                        <input
                            type="email"
                            placeholder="Enter your email to subscribe"
                            className="w-full bg-white p-4 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-amber-300 transition shadow-lg"
                            required
                        />
                        <button
                            type="submit"
                            className="p-4 flex items-center justify-center bg-amber-400 rounded-xl font-bold text-gray-900 hover:bg-amber-300 hover:scale-105 transition transform duration-300 shadow-lg"
                            aria-label="Subscribe Now"
                        >
                            <Send className="w-6 h-6" />
                        </button>
                    </form>
                </div>

            </div>
        </section>
    );
}
