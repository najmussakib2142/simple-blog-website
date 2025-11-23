import Hero from "../components/Hero";
import Features from "../components/Features";
import BlogPreview from "@/components/BlogPreview";
import Author from "@/components/Author";
import FeaturedPost from "@/components/FeaturedPost";
import CTA from "@/components/CTA";

export default function Home() {
  return (
    <main>
      <Hero />
      <FeaturedPost />
      <BlogPreview />
      <Features />
      <Author />
      <CTA></CTA>
    </main>
  );
}