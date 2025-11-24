import BlogForm from "@/components/BlogForm";

export const metadata = {
  title: "Create Blog | Simple Blog",
  description: "Create a new blog post"
};

export default function CreateBlogPage() {
  
  return (
    <div className="bg-white min-h-screen py-12">
      <div className="max-w-3xl mx-auto px-6">
        <div className="mb-10 text-center ">
          <p className="text-indigo-700 font-semibold uppercase text-sm tracking-wide">New Post</p>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mt-2">Write Your Story</h1>
          <p className="text-lg text-gray-600 mt-3">Share your thoughts and ideas with the world</p>
        </div>
        <BlogForm />
      </div>
    </div>
  );
}
