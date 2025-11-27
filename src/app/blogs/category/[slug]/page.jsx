// /app/blogs/category/[slug]/page.jsx
import BlogCard from "@/components/BlogCard";
import { getBlogsByCategory } from "@/lib/blogs";

export default async function CategoryPage(props) {
    const params = await props.params; // unwrap the promise
    const category = params.slug;

    const blogs = await getBlogsByCategory(category);

    return (
        <section className="py-16   bg-[#F2F3E8]">

            {/* Category Heading */}
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className=" mb-12  gap-4">
                    {/* <p className="inline-block items-end text-xs sm:text-sm font-semibold text-gray-700 uppercase tracking-wide   rounded-full mb-3">
                        Category
                    </p> */}

                    <h1 className="text-3xl sm:text-4xl md:text-4xl font-bold text-black">
                        <span className="text-xl text-gray-800">Showing posts from:{" "}</span> <br />
                        <span className=" text-black">

                            {category.charAt(0).toUpperCase() + category.slice(1)}
                        </span>
                    </h1>
                </div>

                {/* Blog Grid */}
                {blogs.length === 0 ? (
                    <div className="flex flex-col items-center justify-center mt-20">
                        <p className="text-gray-500 text-lg mb-4">No blogs found in this category.</p>
                        <p className="text-gray-400 text-sm">Try exploring other categories or check back later.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {blogs.map((blog) => (
                            <div
                                key={blog._id}
                                className="transition-transform transform hover:-translate-y-1 hover:shadow-lg duration-300"
                            >
                                <BlogCard blog={blog} />
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}

