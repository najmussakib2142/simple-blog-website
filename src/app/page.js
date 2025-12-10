import Hero from "../components/Hero";
import Features from "../components/Features";
import BlogPreview from "@/components/BlogPreview";
import Author from "@/components/Author";
import FeaturedPost from "@/components/FeaturedPost";
import Category from "@/components/Category";
import AuthorsSection from "@/components/AuthorsSection";
// import HeroWarningMessage from "@/components/HeroWarningMessage";

export default function Home() {

  return (

    <main className="">


      {/* <div className=" text-gray-500  bg-white px-6 py-1 flex justify-between items-center">
        <p className="text-xs max-w-6xl mx-auto px-8">

          <strong>This website is currently under development.</strong> You may experience some minor issues.

          🔐 <strong>We are actively working on improving security and stability.</strong>

          ✨ Thank you for your patience — exciting updates are on the way!
        </p>

      </div> */}

      <Hero />
      {/* <HeroWarningMessage /> */}
      {/* <AsFeaturedIn /> */}
      <FeaturedPost />
      <Category />
      <BlogPreview />
      <AuthorsSection />
      <Features />
      {/* <Categories></Categories> */}
      <Author />
      {/* <CTA></CTA> */}
    </main>
  );
}