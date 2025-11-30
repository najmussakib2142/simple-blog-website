import { Send, Mail, ArrowUpRight } from "lucide-react";

export default function CTA() {
    return (
        // Section with background image + subtle gradient overlay
        <section className="relative py-16 bg-cover bg-center"
           >

            {/* Overlay gradient for better readability */}
            <div className="absolute inset-0 "></div>

            <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-8">

                {/* Text Content */}
                <div className="text-center md:text-left">
                    <h3 className="text-4xl md:text-4xl  text-[#0A101A] font-semibold mb-2 leading-tight flex items-center justify-center  md:justify-start gap-2">
                        {/* <Mail className="w-8 h-8 text-black-400" /> */}
                        Get Our Best Content <br/> Delivered
                    </h3>
                    <p className="text-black/70 text-lg max-w-lg">
                        Sign up for the SimpleBlog newsletter. Receive a weekly digest of our latest articles, insights, and expert tips—straight to your inbox.
                    </p>
                </div>

                {/* Newsletter Form */}
                <div className="w-full max-w-sm">
                    <form className="flex gap-2 flex-col">
                        <input
                            type="name"
                            placeholder="Full Name"
                            className="w-full bg-white/70 p-4 border border-[#CBCBCB] text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-1  transition shadow-lg"
                            required
                        />
                        <input
                            type="email"
                            placeholder="Your Email Address"
                            className="w-full bg-white/70 p-4 border border-[#CBCBCB] text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-1  transition shadow-lg"
                            required
                        />
                        <button type="submit" className="w-full inline-flex items-center justify-between bg-gray-50 p-4 text-start border border-[#CBCBCB] hover:text-white hover:border-[#0A101A]   font-semibold text-gray-900 hover:bg-[#0A101A]  transition transform hover:scale-[1.01] duration-300 shadow-lg"
                            >
                            <span>Subscribe Now </span>
                            <ArrowUpRight className="mr-5" />
                        </button>
                        {/* <button
                            type="submit"
                            className="p-4 flex items-center justify-center bg-amber-400 rounded-xl font-bold text-gray-900 hover:bg-amber-300 hover:scale-105 transition transform duration-300 shadow-lg"
                            aria-label="Subscribe Now"
                        >
                            <Send className="w-6 h-6" />
                        </button> */}
                    </form>
                </div>

            </div>
        </section>
    );
}
