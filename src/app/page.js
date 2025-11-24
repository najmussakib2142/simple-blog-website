import Hero from "../components/Hero";
import Features from "../components/Features";
import BlogPreview from "@/components/BlogPreview";
import Author from "@/components/Author";
import FeaturedPost from "@/components/FeaturedPost";
import CTA from "@/components/CTA";
import Categories from "@/components/Categories";
// import AsFeaturedIn from "@/components/AsFeaturedIn";

export default function Home() {
  return (
    <main>
      <Hero />
      {/* <AsFeaturedIn /> */}
      <FeaturedPost />
      <BlogPreview />
      <Features />
      {/* <Categories></Categories> */}
      <Author />
      <CTA></CTA>
    </main>
  );
}