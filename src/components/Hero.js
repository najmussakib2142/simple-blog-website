export default function Hero() {
  return (
    <section className=" text-white min-h-[80vh]  flex flex-col justify-center items-center text-center px-4">
      <h1 className="text-5xl md:text-6xl font-extrabold mb-6">
        Welcome to Simple Blog
      </h1>
      <p className="text-lg md:text-xl mb-8 max-w-2xl">
        Explore amazing blogs, share your thoughts, and connect with fellow readers. Start your blogging journey today!
      </p>
      <a
        href="/blogs"
        className="btn btn-primary btn-lg shadow-lg hover:scale-105 transition-transform duration-300"
      >
        Explore Blogs
      </a>
    </section>
  );
}
