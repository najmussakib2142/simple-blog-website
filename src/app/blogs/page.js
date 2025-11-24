import Link from "next/link";
import BlogCard from "@/components/BlogCard";
import BlogsClient from "./BlogsClient";

// fetch blogs from API
async function getBlogs(page = 1) {
    try {
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
        const res = await fetch(`${baseUrl}/api/blogs?page=${page}&limit=6`, {
            cache: "no-store",
        });

        if (!res.ok) {
            console.error("Failed to fetch blogs", res.statusText);
            return { blogs: [], totalPages: 1, currentPage: 1 };
        }

        const data = await res.json();

        // Make sure the data has the expected structure
        return {
            blogs: data.blogs || data || [], // fallback if API returns just an array
            totalPages: data.totalPages || 1,
            currentPage: data.currentPage || page,
        };
    } catch (error) {
        console.error("Error fetching blogs:", error);
        return { blogs: [], totalPages: 1, currentPage: page };
    }
}

export default async function BlogsPage({ searchParams }) {
    const page = Number(searchParams?.page) || 1;
    const { blogs, totalPages, currentPage } = await getBlogs(page);

    // console.log("Server", blogs, totalPages, currentPage); // should show proper array and numbers now

    return (
        <BlogsClient
            blogs={blogs}
            totalPages={totalPages}
            currentPage={currentPage}
        />
    );
}
