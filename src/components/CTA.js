import { Send } from "lucide-react";

export default function CTA() {

    return (
        <section className=" text-white bg-indigo-700 py-12">
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
        </section>
    )
}