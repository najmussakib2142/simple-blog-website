import Hero from "../components/Hero";
import Features from "../components/Features";
import BlogPreview from "@/components/BlogPreview";
import Author from "@/components/Author";
import FeaturedPost from "@/components/FeaturedPost";
import Category from "@/components/Category";
import AuthorsSection from "@/components/AuthorsSection";

export default function Home() {
  return (
    <main className="">
      <Hero />
      {/* <AsFeaturedIn /> */}
      <FeaturedPost />
      <AuthorsSection />
      <Category />
      <BlogPreview />
      <Features />
      {/* <Categories></Categories> */}
      <Author />
      {/* <CTA></CTA> */}
    </main>
  );
}